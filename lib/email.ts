import { Resend } from "resend";

import { type ContactInput } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

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
