import { z } from "zod";

import {
  contactSchema,
  HONEYPOT_FIELD,
  type ContactApiResponse,
} from "@/lib/contact-schema";
import {
  getClientIp,
  MAX_REQUESTS,
  memoryRateLimitStore,
  type RateLimitStore,
} from "@/lib/rate-limit";

/**
 * Swap this binding for a Redis-backed store in production — see the TODO in
 * `lib/rate-limit.ts`. Everything below only depends on the interface.
 */
const rateLimiter: RateLimitStore = memoryRateLimitStore;

function json(body: ContactApiResponse, init: ResponseInit = {}) {
  return Response.json(body, init);
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json(
      {
        ok: false,
        message: "We couldn't read that submission. Please try again.",
      },
      { status: 400 },
    );
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  // Honeypot: a bot fills every field it finds, a human never sees this one.
  // Respond with a normal success so the bot has nothing to learn from.
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json({ ok: true, message: "Thanks — we'll be in touch shortly." });
  }

  const ip = getClientIp(request);
  const limit = await rateLimiter.check(`contact:${ip}`);

  if (!limit.success) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((limit.resetAt - Date.now()) / 1000),
    );

    return json(
      {
        ok: false,
        message: `You've sent ${MAX_REQUESTS} messages in a short window. Please wait about ${Math.ceil(
          retryAfterSeconds / 60,
        )} minute(s) and try again — or call us directly if it's urgent.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
          "RateLimit-Limit": String(limit.limit),
          "RateLimit-Remaining": String(limit.remaining),
          "RateLimit-Reset": String(retryAfterSeconds),
        },
      },
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const submission = parsed.data;

  // TODO(email): wire up delivery with Resend.
  //   1. `npm install resend`
  //   2. Add RESEND_API_KEY and CONTACT_TO_EMAIL to the environment.
  //   3. Replace the console.info below with something like:
  //
  //      const resend = new Resend(process.env.RESEND_API_KEY);
  //      await resend.emails.send({
  //        from: "Lively Cash Website <website@livelycashatms.ca>",
  //        to: process.env.CONTACT_TO_EMAIL!,
  //        replyTo: submission.email,
  //        subject: `New enquiry — ${submission.businessName} (${submission.city})`,
  //        text: renderEnquiry(submission),
  //      });
  //
  //   Keep the handler returning 200 only after delivery succeeds, and return
  //   502 with a friendly message if the provider errors.
  console.info("[contact] new enquiry", {
    receivedAt: new Date().toISOString(),
    ip,
    name: submission.name,
    businessName: submission.businessName,
    email: submission.email,
    phone: submission.phone,
    city: submission.city,
    plan: submission.plan,
    message: submission.message,
  });

  return json({
    ok: true,
    message: "Thanks — we'll be in touch shortly.",
  });
}
