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
    `In a hurry? Call us on ${siteConfig.phone} and you will get one of us, not a call centre.`,
    "",
    "Or simply reply to this email — it comes straight to us.",
    "",
    `— The ${siteConfig.name} team`,
    siteConfig.region,
    siteUrl,
    "",
  ].join("\n");
}

/*
 * Brand palette, mirrored from `app/globals.css`. Email cannot reference the
 * Tailwind tokens, so these are the one place the hex values are repeated —
 * change them here if the site's palette moves.
 */
const C = {
  base: "#ffffff",
  baseSoft: "#f7f6f2",
  ink: "#141414",
  inkSoft: "#5a5a5a",
  inkMuted: "#a5a49c",
  accent: "#ddc52b",
  line: "#e8e6df",
} as const;

/*
 * Michroma and DM Sans cannot be relied on: Gmail strips @font-face outright
 * and Outlook renders through Word. The brand reads through the palette, the
 * ink header, the accent rule and the letter-spaced mono labels instead — and
 * mono is the one part of the type system that survives everywhere, since
 * every platform ships a monospace face.
 */
const SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO =
  "ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace";

/** Letter-spaced uppercase mono label — the site's section eyebrow. */
function eyebrow(text: string, color: string = C.inkSoft): string {
  return `<p style="margin:0;font-family:${MONO};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${color};">${escapeHtml(text)}</p>`;
}

/** The short accent rule that sits under every eyebrow on the site. */
function accentRule(topMargin = 10): string {
  return `<div style="width:28px;height:2px;background:${C.accent};margin:${topMargin}px 0 0 0;font-size:0;line-height:0;">&nbsp;</div>`;
}

/**
 * The acknowledgement, styled to match the site.
 *
 * Tables and inline styles throughout, and no images of any kind: Gmail strips
 * inline SVG and blocks `data:` URIs, and remote images are hidden by default
 * in most clients, so the hexagon motif cannot survive the trip. Rounded
 * corners degrade to square in Outlook on Windows, which is the intended
 * fallback rather than a bug.
 */
function renderAckHtml(submission: ContactInput): string {
  const row = (label: string, value: string) =>
    `<tr>` +
    `<td style="padding:7px 18px 7px 0;font-family:${SANS};font-size:13px;line-height:1.5;color:${C.inkSoft};vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>` +
    `<td style="padding:7px 0;font-family:${SANS};font-size:14px;line-height:1.5;color:${C.ink};font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>` +
    `</tr>`;

  return [
    `<div style="margin:0;padding:32px 12px;background:${C.baseSoft};">`,

    // Preheader: the grey line of text clients show beside the subject.
    `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">We have your enquiry and will come back to you within one business day.</div>`,

    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="600" style="width:100%;max-width:600px;margin:0 auto;border-collapse:separate;">`,
    `<tr><td style="background:${C.base};border:1px solid ${C.line};border-radius:16px;">`,

    // Ink header — the site's dark inset band.
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;">`,
    `<tr><td style="background:${C.ink};padding:30px 32px;border-radius:15px 15px 0 0;">`,
    eyebrow(siteConfig.name, C.base),
    accentRule(12),
    `<p style="margin:16px 0 0 0;font-family:${MONO};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${C.inkMuted};">${escapeHtml(siteConfig.region)}</p>`,
    `</td></tr>`,
    `</table>`,

    // Body.
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">`,
    `<tr><td style="padding:36px 32px 8px 32px;">`,
    `<h1 style="margin:0 0 14px 0;font-family:${SANS};font-size:23px;line-height:1.3;font-weight:600;color:${C.ink};">Thanks, ${escapeHtml(greetingName(submission.name))} &mdash; we have your enquiry.</h1>`,
    `<p style="margin:0 0 28px 0;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.inkSoft};">One of us will come back to you shortly, usually within one business day. Here is what came through.</p>`,
    `</td></tr>`,

    // Summary panel, on the site's soft surface.
    `<tr><td style="padding:0 32px;">`,
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${C.baseSoft};border:1px solid ${C.line};border-radius:14px;border-collapse:separate;">`,
    `<tr><td style="padding:24px;">`,
    eyebrow("Your enquiry"),
    accentRule(),
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 0 0;">`,
    row("Business", submission.businessName),
    row("City", submission.city),
    row("Interested in", submission.plan),
    `</table>`,
    `<div style="height:1px;background:${C.line};margin:20px 0;font-size:0;line-height:0;">&nbsp;</div>`,
    eyebrow("Your message"),
    `<p style="margin:12px 0 0 0;font-family:${SANS};font-size:14px;line-height:1.7;color:${C.inkSoft};white-space:pre-wrap;">${escapeHtml(submission.message)}</p>`,
    `</td></tr></table>`,
    `</td></tr>`,

    // Call to action — a real pill button, not a styled link.
    `<tr><td style="padding:30px 32px 0 32px;">`,
    `<p style="margin:0 0 18px 0;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.ink};">In a hurry? Call us and you will get one of us, not a call centre.</p>`,
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>`,
    `<td align="center" bgcolor="${C.accent}" style="border-radius:999px;">`,
    `<a href="${siteConfig.phoneHref}" style="display:inline-block;padding:14px 28px;font-family:${MONO};font-size:13px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;color:${C.ink};text-decoration:none;border-radius:999px;">${escapeHtml(siteConfig.phone)}</a>`,
    `</td></tr></table>`,
    `<p style="margin:18px 0 0 0;font-family:${SANS};font-size:14px;line-height:1.65;color:${C.inkSoft};">Or simply reply to this email &mdash; it comes straight to us.</p>`,
    `</td></tr>`,

    // Footer.
    `<tr><td style="padding:32px 32px 30px 32px;">`,
    `<div style="height:1px;background:${C.line};margin:0 0 22px 0;font-size:0;line-height:0;">&nbsp;</div>`,
    eyebrow(siteConfig.name),
    `<p style="margin:12px 0 0 0;font-family:${SANS};font-size:13px;line-height:1.7;color:${C.inkSoft};">${escapeHtml(siteConfig.region)}<br>`,
    `<a href="${siteUrl}" style="color:${C.inkSoft};text-decoration:underline;">${escapeHtml(siteUrl.replace(/^https?:\/\/(www\.)?/, ""))}</a></p>`,
    `</td></tr>`,
    `</table>`,

    `</td></tr>`,
    `</table>`,
    `</div>`,
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
