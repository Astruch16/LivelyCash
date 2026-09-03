import { Resend } from "resend";

import { type ContactInput } from "@/lib/contact-schema";
import { siteConfig, siteUrl } from "@/lib/site";

/**
 * Contact-form delivery, over Resend.
 *
 * Three environment variables, all read lazily so a missing key is a runtime
 * configuration problem rather than a build failure:
 *
 * - `RESEND_API_KEY`     — from resend.com/api-keys
 * - `CONTACT_TO_EMAIL`   — the inbox enquiries land in
 * - `CONTACT_FROM_EMAIL` — the sender. Resend will only accept an address on a
 *   domain verified in the account, with the single exception of
 *   `onboarding@resend.dev`, which can only deliver to the account owner's own
 *   address. Keeping it in the environment means moving from the sandbox
 *   sender to a real one is a config change, not a deploy.
 */

const FROM_FALLBACK = "onboarding@resend.dev";

type EmailConfig = {
  apiKey: string;
  to: string;
  from: string;
};

/**
 * Reads and validates the mail configuration.
 *
 * Returns null rather than throwing when the API key or destination is absent,
 * so the caller can decide what an unconfigured deployment should do.
 */
function readConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || FROM_FALLBACK;

  if (!apiKey || !to) return null;

  return { apiKey, to, from };
}

export function isEmailConfigured(): boolean {
  return readConfig() !== null;
}

/** Field order for the notification body — how you'd want to read an enquiry. */
const FIELDS: { label: string; key: keyof ContactInput }[] = [
  { label: "Name", key: "name" },
  { label: "Business", key: "businessName" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "City", key: "city" },
  { label: "Plan of interest", key: "plan" },
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderText(submission: ContactInput): string {
  const rows = FIELDS.map(
    ({ label, key }) => `${label}: ${submission[key]}`,
  ).join("\n");

  return `New enquiry from the ${siteConfig.name} website\n\n${rows}\n\nMessage:\n${submission.message}\n`;
}

/**
 * Deliberately plain markup. Mail clients strip most CSS, and this is an
 * internal notification rather than a designed message — legibility in Gmail,
 * Outlook and a phone's mail app matters more than matching the site.
 */
function renderHtml(submission: ContactInput): string {
  const rows = FIELDS.map(
    ({ label, key }) =>
      `<tr><td style="padding:4px 16px 4px 0;color:#5a5a5a;">${label}</td><td style="padding:4px 0;"><strong>${escapeHtml(submission[key])}</strong></td></tr>`,
  ).join("");

  return [
    '<div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#141414;">',
    `<p>New enquiry from the ${escapeHtml(siteConfig.name)} website.</p>`,
    `<table cellpadding="0" cellspacing="0">${rows}</table>`,
    "<p><strong>Message</strong></p>",
    `<p style="white-space:pre-wrap;">${escapeHtml(submission.message)}</p>`,
    "</div>",
  ].join("");
}

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; reason: "unconfigured" | "provider"; detail?: string };

/**
 * Sends one enquiry notification.
 *
 * `replyTo` is the enquirer, so hitting reply in the inbox answers the
 * customer directly. The `from` address stays on a verified domain — putting
 * the customer's address there would be sender spoofing, and SPF and DMARC
 * would send the message to spam.
 */
export async function sendEnquiryEmail(
  submission: ContactInput,
): Promise<SendResult> {
  const config = readConfig();
  if (!config) return { ok: false, reason: "unconfigured" };

  const resend = new Resend(config.apiKey);

  // The SDK reports API failures in the resolved value; network faults still
  // throw, so both paths need handling.
  try {
    const { data, error } = await resend.emails.send({
      from: config.from,
      to: config.to,
      replyTo: submission.email,
      subject: `New enquiry — ${submission.businessName} (${submission.city})`,
      text: renderText(submission),
      html: renderHtml(submission),
    });

    if (error) {
      return { ok: false, reason: "provider", detail: error.message };
    }

    return { ok: true, id: data?.id ?? "unknown" };
  } catch (cause) {
    return {
      ok: false,
      reason: "provider",
      detail:
        cause instanceof Error ? cause.message : "Unknown transport error",
    };
  }
}

/* ------------------------------------------------------------------------ *
 * Acknowledgement to the enquirer
 * ------------------------------------------------------------------------ */

/** First name only, for the greeting. Falls back to a neutral opener. */
function greetingName(fullName: string): string {
  const first = fullName.trim().split(/\s+/)[0];
  return first && first.length <= 40 ? first : "there";
}

function renderAckText(submission: ContactInput): string {
  return [
    `Hi ${greetingName(submission.name)},`,
    "",
    `Thanks for getting in touch with ${siteConfig.name}. We have your enquiry and one of us will come back to you shortly — usually within one business day.`,
    "",
    "Here is what you sent us:",
    "",
    `Business: ${submission.businessName}`,
    `City: ${submission.city}`,
    `Plan of interest: ${submission.plan}`,
    "",
    "Your message:",
    submission.message,
    "",
    `If it is urgent, call us on ${siteConfig.phone} and you will get one of us, not a call centre.`,
    "",
    `— The ${siteConfig.name} team`,
    siteConfig.region,
    siteUrl,
    "",
  ].join("\n");
}

/**
 * Table layout and inline styles throughout: mail clients strip <style>
 * blocks, ignore flexbox and grid, and Outlook renders through Word. No
 * external images either, so nothing depends on the recipient loading remote
 * content.
 */
function renderAckHtml(submission: ContactInput): string {
  const detail = (label: string, value: string) =>
    `<tr><td style="padding:3px 16px 3px 0;color:#5a5a5a;font-size:14px;">${escapeHtml(label)}</td>` +
    `<td style="padding:3px 0;font-size:14px;color:#141414;"><strong>${escapeHtml(value)}</strong></td></tr>`;

  return [
    '<div style="margin:0;padding:24px 12px;background:#f7f6f2;">',
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="width:100%;max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8e6df;border-radius:12px;">',
    '<tr><td style="padding:32px 32px 8px 32px;font-family:system-ui,-apple-system,Segoe UI,sans-serif;">',
    `<p style="margin:0 0 4px 0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#5a5a5a;">${escapeHtml(siteConfig.name)}</p>`,
    '<div style="width:32px;height:2px;background:#ddc52b;margin:0 0 20px 0;"></div>',
    `<p style="margin:0 0 16px 0;font-size:20px;line-height:1.3;color:#141414;">Thanks, ${escapeHtml(greetingName(submission.name))} — we have your enquiry.</p>`,
    '<p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#5a5a5a;">One of us will come back to you shortly, usually within one business day.</p>',
    '<p style="margin:0 0 8px 0;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#5a5a5a;">What you sent us</p>',
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px 0;">',
    detail("Business", submission.businessName),
    detail("City", submission.city),
    detail("Plan of interest", submission.plan),
    "</table>",
    `<div style="border-left:2px solid #e8e6df;padding:2px 0 2px 14px;margin:0 0 24px 0;"><p style="margin:0;font-size:14px;line-height:1.6;color:#5a5a5a;white-space:pre-wrap;">${escapeHtml(submission.message)}</p></div>`,
    `<p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#141414;">If it is urgent, call us on <a href="${siteConfig.phoneHref}" style="color:#141414;">${escapeHtml(siteConfig.phone)}</a> — you will get one of us, not a call centre.</p>`,
    "</td></tr>",
    `<tr><td style="padding:0 32px 32px 32px;border-top:1px solid #e8e6df;font-family:system-ui,-apple-system,Segoe UI,sans-serif;">`,
    `<p style="margin:20px 0 0 0;font-size:13px;line-height:1.6;color:#5a5a5a;">${escapeHtml(siteConfig.name)} &middot; ${escapeHtml(siteConfig.region)}<br>`,
    `<a href="${siteUrl}" style="color:#5a5a5a;">${escapeHtml(siteUrl.replace(/^https?:\/\//, ""))}</a></p>`,
    "</td></tr>",
    "</table>",
    "</div>",
  ].join("");
}

/**
 * Confirms receipt to the person who filled in the form.
 *
 * `replyTo` is the business inbox, so a reply to this message reaches Lively
 * Cash rather than the no-reply sending address. The `from` address cannot be
 * the Gmail account: Resend only sends from a domain verified in the account,
 * and no third party can be authorised to send as `gmail.com`.
 *
 * A failure here is logged by the caller but must not fail the request — the
 * enquiry has already reached the business, which is the part that matters.
 */
export async function sendAcknowledgementEmail(
  submission: ContactInput,
): Promise<SendResult> {
  const config = readConfig();
  if (!config) return { ok: false, reason: "unconfigured" };

  const resend = new Resend(config.apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: config.from,
      to: submission.email,
      replyTo: config.to,
      subject: `Thanks for getting in touch — ${siteConfig.name}`,
      text: renderAckText(submission),
      html: renderAckHtml(submission),
    });

    if (error) return { ok: false, reason: "provider", detail: error.message };
    return { ok: true, id: data?.id ?? "unknown" };
  } catch (cause) {
    return {
      ok: false,
      reason: "provider",
      detail:
        cause instanceof Error ? cause.message : "Unknown transport error",
    };
  }
}
