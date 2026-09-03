import { Resend } from "resend";

import { type ContactInput } from "@/lib/contact-schema";
import { siteConfig, siteUrl } from "@/lib/site";

/**
 * Contact-form delivery, over Resend.
 *
 * Two messages go out per submission: a notification to the business, and an
 * acknowledgement to the enquirer. Both are built from the shared shell below
 * so they read as one pair rather than two unrelated emails.
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

/* ------------------------------------------------------------------------ *
 * Shared presentation
 *
 * Three constraints shape everything below, and all three are load-bearing:
 *
 * 1. Michroma and DM Sans cannot be used. Gmail strips `@font-face` outright
 *    and Outlook renders HTML through Word. The brand reads through the
 *    palette, the ink header, the accent rules and the letter-spaced mono
 *    labels instead — mono being the one part of the type system that
 *    survives everywhere, since every platform ships a monospace face.
 *
 * 2. No images, including the hexagon motif. Gmail strips inline SVG and
 *    blocks `data:` URIs, and remote images are hidden by default in most
 *    clients, so anything drawn as an image would simply be missing.
 *
 * 3. Tables and inline styles throughout. Rounded corners degrade to square
 *    in Outlook on Windows, which is the intended fallback, not a defect.
 * ------------------------------------------------------------------------ */

/**
 * Brand palette, mirrored from `app/globals.css`. Email cannot reference the
 * Tailwind tokens, so this is the one place the hex values are repeated —
 * change them here together if the site's palette moves.
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

const SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO =
  "ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Letter-spaced uppercase mono label — the site's section eyebrow. */
function eyebrow(text: string, color: string = C.inkSoft): string {
  return `<p style="margin:0;font-family:${MONO};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${color};">${escapeHtml(text)}</p>`;
}

/** The short accent rule that sits under every eyebrow on the site. */
function accentRule(topMargin = 10): string {
  return `<div style="width:28px;height:2px;background:${C.accent};margin:${topMargin}px 0 0 0;font-size:0;line-height:0;">&nbsp;</div>`;
}

function hairline(margin = "20px 0"): string {
  return `<div style="height:1px;background:${C.line};margin:${margin};font-size:0;line-height:0;">&nbsp;</div>`;
}

/**
 * One label/value pair. `href` turns the value into a link, which is what
 * makes an address or phone number one tap on a phone.
 */
function detailRow(label: string, value: string, href?: string): string {
  const shown = escapeHtml(value);
  const cell = href
    ? `<a href="${href}" style="color:${C.ink};text-decoration:underline;">${shown}</a>`
    : shown;

  return (
    `<tr>` +
    `<td style="padding:7px 18px 7px 0;font-family:${SANS};font-size:13px;line-height:1.5;color:${C.inkSoft};vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>` +
    `<td style="padding:7px 0;font-family:${SANS};font-size:14px;line-height:1.5;color:${C.ink};font-weight:600;vertical-align:top;">${cell}</td>` +
    `</tr>`
  );
}

/** The soft-surface card the site uses to group related detail. */
function panel(inner: string): string {
  return (
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${C.baseSoft};border:1px solid ${C.line};border-radius:14px;border-collapse:separate;">` +
    `<tr><td style="padding:24px;">${inner}</td></tr></table>`
  );
}

/** Accent pill, built as a table so it survives Outlook. */
function pillButton(href: string, label: string): string {
  return (
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>` +
    `<td align="center" bgcolor="${C.accent}" style="border-radius:999px;">` +
    `<a href="${href}" style="display:inline-block;padding:14px 28px;font-family:${MONO};font-size:13px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;color:${C.ink};text-decoration:none;border-radius:999px;">${escapeHtml(label)}</a>` +
    `</td></tr></table>`
  );
}

/**
 * The frame both emails share: soft page, white card, ink header band with
 * the wordmark and accent rule, and a footer. Keeping it in one place is what
 * guarantees the notification and the acknowledgement stay a matched pair.
 */
function shell(opts: {
  /** The grey line clients show beside the subject in the inbox list. */
  preheader: string;
  /** Mono line under the accent rule in the ink header. */
  kicker: string;
  body: string;
  footerNote: string;
}): string {
  return [
    `<div style="margin:0;padding:32px 12px;background:${C.baseSoft};">`,
    `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(opts.preheader)}</div>`,

    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" width="600" style="width:100%;max-width:600px;margin:0 auto;border-collapse:separate;">`,
    `<tr><td style="background:${C.base};border:1px solid ${C.line};border-radius:16px;">`,

    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;">`,
    `<tr><td style="background:${C.ink};padding:30px 32px;border-radius:15px 15px 0 0;">`,
    eyebrow(siteConfig.name, C.base),
    accentRule(12),
    `<p style="margin:16px 0 0 0;font-family:${MONO};font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${C.inkMuted};">${escapeHtml(opts.kicker)}</p>`,
    `</td></tr></table>`,

    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">`,
    opts.body,
    `<tr><td style="padding:32px 32px 30px 32px;">`,
    hairline("0 0 22px 0"),
    eyebrow(siteConfig.name),
    `<p style="margin:12px 0 0 0;font-family:${SANS};font-size:13px;line-height:1.7;color:${C.inkSoft};">${escapeHtml(opts.footerNote)}<br>`,
    `<a href="${siteUrl}" style="color:${C.inkSoft};text-decoration:underline;">${escapeHtml(siteUrl.replace(/^https?:\/\/(www\.)?/, ""))}</a></p>`,
    `</td></tr>`,
    `</table>`,

    `</td></tr></table>`,
    `</div>`,
  ].join("");
}

/** First name only, for greetings and button labels. */
function firstName(fullName: string): string {
  const first = fullName.trim().split(/\s+/)[0];
  return first && first.length <= 40 ? first : "there";
}

/** Received time in the operator's own timezone — this is a Fraser Valley business. */
function receivedStamp(at: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(at);
}

/* ------------------------------------------------------------------------ *
 * Notification to the business
 * ------------------------------------------------------------------------ */

/** Field order for the plain-text notification — how you'd read an enquiry. */
const FIELDS: { label: string; key: keyof ContactInput }[] = [
  { label: "Name", key: "name" },
  { label: "Business", key: "businessName" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "City", key: "city" },
  { label: "Plan of interest", key: "plan" },
];

function renderText(submission: ContactInput): string {
  const rows = FIELDS.map(
    ({ label, key }) => `${label}: ${submission[key]}`,
  ).join("\n");

  return `New enquiry from the ${siteConfig.name} website\n\n${rows}\n\nMessage:\n${submission.message}\n`;
}

/**
 * Led by the business name rather than a greeting: this is an alert, and the
 * first thing worth knowing is who it came from. The email address and phone
 * number are links, so answering is one tap from a phone.
 */
function renderHtml(
  submission: ContactInput,
  receivedAt: Date = new Date(),
): string {
  const body = [
    `<tr><td style="padding:36px 32px 8px 32px;">`,
    eyebrow("New enquiry"),
    accentRule(),
    `<h1 style="margin:18px 0 6px 0;font-family:${SANS};font-size:23px;line-height:1.3;font-weight:600;color:${C.ink};">${escapeHtml(submission.businessName)}</h1>`,
    `<p style="margin:0 0 28px 0;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.inkSoft};">${escapeHtml(submission.city)} &middot; ${escapeHtml(submission.plan)}</p>`,
    `</td></tr>`,

    `<tr><td style="padding:0 32px;">`,
    panel(
      [
        eyebrow("Contact"),
        accentRule(),
        `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 0 0;">`,
        detailRow("Name", submission.name),
        detailRow("Email", submission.email, `mailto:${submission.email}`),
        detailRow(
          "Phone",
          submission.phone,
          `tel:${submission.phone.replace(/[^\d+]/g, "")}`,
        ),
        `</table>`,
        hairline(),
        eyebrow("Message"),
        `<p style="margin:12px 0 0 0;font-family:${SANS};font-size:14px;line-height:1.7;color:${C.inkSoft};white-space:pre-wrap;">${escapeHtml(submission.message)}</p>`,
      ].join(""),
    ),
    `</td></tr>`,

    `<tr><td style="padding:30px 32px 0 32px;">`,
    pillButton(
      `mailto:${submission.email}`,
      `Reply to ${firstName(submission.name)}`,
    ),
    `<p style="margin:18px 0 0 0;font-family:${SANS};font-size:14px;line-height:1.65;color:${C.inkSoft};">Replying to this email reaches them directly.</p>`,
    `</td></tr>`,
  ].join("");

  return shell({
    preheader: `${submission.businessName} in ${submission.city} — interested in ${submission.plan}.`,
    kicker: `Received ${receivedStamp(receivedAt)}`,
    body,
    footerNote: "Sent by the website contact form.",
  });
}

/* ------------------------------------------------------------------------ *
 * Acknowledgement to the enquirer
 * ------------------------------------------------------------------------ */

function renderAckText(submission: ContactInput): string {
  return [
    `Hi ${firstName(submission.name)},`,
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

function renderAckHtml(submission: ContactInput): string {
  const body = [
    `<tr><td style="padding:36px 32px 8px 32px;">`,
    `<h1 style="margin:0 0 14px 0;font-family:${SANS};font-size:23px;line-height:1.3;font-weight:600;color:${C.ink};">Thanks, ${escapeHtml(firstName(submission.name))} &mdash; we have your enquiry.</h1>`,
    `<p style="margin:0 0 28px 0;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.inkSoft};">One of us will come back to you shortly, usually within one business day. Here is what came through.</p>`,
    `</td></tr>`,

    `<tr><td style="padding:0 32px;">`,
    panel(
      [
        eyebrow("Your enquiry"),
        accentRule(),
        `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:18px 0 0 0;">`,
        detailRow("Business", submission.businessName),
        detailRow("City", submission.city),
        detailRow("Interested in", submission.plan),
        `</table>`,
        hairline(),
        eyebrow("Your message"),
        `<p style="margin:12px 0 0 0;font-family:${SANS};font-size:14px;line-height:1.7;color:${C.inkSoft};white-space:pre-wrap;">${escapeHtml(submission.message)}</p>`,
      ].join(""),
    ),
    `</td></tr>`,

    `<tr><td style="padding:30px 32px 0 32px;">`,
    `<p style="margin:0 0 18px 0;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.ink};">In a hurry? Call us and you will get one of us, not a call centre.</p>`,
    pillButton(siteConfig.phoneHref, siteConfig.phone),
    `<p style="margin:18px 0 0 0;font-family:${SANS};font-size:14px;line-height:1.65;color:${C.inkSoft};">Or simply reply to this email &mdash; it comes straight to us.</p>`,
    `</td></tr>`,
  ].join("");

  return shell({
    preheader:
      "We have your enquiry and will come back to you within one business day.",
    kicker: siteConfig.region,
    body,
    footerNote: siteConfig.region,
  });
}

/* ------------------------------------------------------------------------ *
 * Sending
 * ------------------------------------------------------------------------ */

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
