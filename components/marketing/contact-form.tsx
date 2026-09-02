"use client";

import { useId, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";

import { z } from "zod";

import { CtaButton } from "@/components/marketing/cta-button";
import { DisplayHeading } from "@/components/marketing/section";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  cityOptions,
  contactSchema,
  HONEYPOT_FIELD,
  planOptions,
  type ContactApiResponse,
  type ContactFieldErrors,
} from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type FieldName =
  "name" | "businessName" | "email" | "phone" | "city" | "plan" | "message";

const emptyForm: Record<FieldName, string> = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  city: "",
  plan: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Presentation only — hairline border, large radius, accent focus ring backed
 * by an ink border so the indicator still clears 3:1 against white. Shared by
 * the inputs, the textarea and the select triggers so they cannot drift apart.
 */
const fieldClass =
  "h-12 rounded-xl border-line bg-white px-4 text-base transition-colors focus-visible:border-ink focus-visible:ring-3 focus-visible:ring-accent/50 md:text-sm";

const labelClass =
  "font-mono text-[0.625rem] font-medium tracking-[0.2em] text-ink-soft uppercase";

export function ContactForm() {
  const searchParams = useSearchParams();
  const formId = useId();

  // Deep links from the plans page (`/contact?plan=…`) preselect the program.
  const planFromQuery = searchParams.get("plan");
  const initialPlan =
    planFromQuery && planOptions.includes(planFromQuery) ? planFromQuery : "";

  const [values, setValues] = useState({ ...emptyForm, plan: initialPlan });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formMessage, setFormMessage] = useState("");

  const fieldId = (field: FieldName) => `${formId}-${field}`;
  const errorId = (field: FieldName) => `${formId}-${field}-error`;

  function setField(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
  }

  function describedBy(field: FieldName, hintId?: string) {
    const ids = [hintId, errors[field] ? errorId(field) : undefined].filter(
      Boolean,
    );
    return ids.length ? ids.join(" ") : undefined;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Client-side validation using exactly the schema the server enforces.
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = z.flattenError(parsed.error)
        .fieldErrors as ContactFieldErrors;
      setErrors(fieldErrors);
      setStatus("error");
      setFormMessage("Please check the highlighted fields and try again.");

      const firstInvalid = (Object.keys(values) as FieldName[]).find(
        (field) => fieldErrors[field]?.length,
      );
      if (firstInvalid) {
        document.getElementById(fieldId(firstInvalid))?.focus();
      }
      return;
    }

    setErrors({});
    setStatus("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          [HONEYPOT_FIELD]: honeypot,
        }),
      });

      const result = (await response.json()) as ContactApiResponse;

      if (!response.ok || !result.ok) {
        setStatus("error");
        setErrors(result.fieldErrors ?? {});
        setFormMessage(
          result.message ??
            "Something went wrong sending your message. Please try again.",
        );
        return;
      }

      setStatus("success");
      setFormMessage(result.message);
      setValues({ ...emptyForm });
    } catch {
      setStatus("error");
      setFormMessage(
        `We couldn't reach the server. Please try again, or call us on ${siteConfig.phone}.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-5 rounded-3xl border border-accent/60 bg-accent-soft p-8"
      >
        <span
          aria-hidden="true"
          className="flex size-12 items-center justify-center rounded-full bg-accent text-ink"
        >
          <CheckCircle2Icon className="size-6" />
        </span>
        <DisplayHeading as="h2" size="minor" className="text-ink">
          Message sent
        </DisplayHeading>
        <p className="text-ink-soft">
          {formMessage} We usually reply within one business day. If it&rsquo;s
          urgent, call{" "}
          <a
            href={siteConfig.phoneHref}
            className="font-medium text-ink underline underline-offset-4"
          >
            {siteConfig.phone}
          </a>
          .
        </p>
        <CtaButton
          type="button"
          variant="ghost"
          size="md"
          onClick={() => {
            setStatus("idle");
            setFormMessage("");
          }}
        >
          Send another message
        </CtaButton>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {status === "error" && formMessage ? (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-destructive/40 bg-destructive/8 px-4 py-3.5 text-sm text-destructive"
        >
          <AlertCircleIcon
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0"
          />
          {formMessage}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Your name"
          field="name"
          fieldId={fieldId("name")}
          errorId={errorId("name")}
          errors={errors}
        >
          <Input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            placeholder="Jordan Reyes"
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            disabled={isSubmitting}
            className={fieldClass}
          />
        </Field>

        <Field
          label="Business name"
          field="businessName"
          fieldId={fieldId("businessName")}
          errorId={errorId("businessName")}
          errors={errors}
        >
          <Input
            id={fieldId("businessName")}
            name="businessName"
            autoComplete="organization"
            placeholder="Fraser Valley Bakehouse"
            value={values.businessName}
            onChange={(event) => setField("businessName", event.target.value)}
            aria-invalid={Boolean(errors.businessName)}
            aria-describedby={describedBy("businessName")}
            disabled={isSubmitting}
            className={fieldClass}
          />
        </Field>

        <Field
          label="Email"
          field="email"
          fieldId={fieldId("email")}
          errorId={errorId("email")}
          errors={errors}
        >
          <Input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@yourbusiness.ca"
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            disabled={isSubmitting}
            className={fieldClass}
          />
        </Field>

        <Field
          label="Phone"
          field="phone"
          fieldId={fieldId("phone")}
          errorId={errorId("phone")}
          errors={errors}
        >
          <Input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(604) 555-0142"
            value={values.phone}
            onChange={(event) => setField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            disabled={isSubmitting}
            className={fieldClass}
          />
        </Field>

        <Field
          label="City"
          field="city"
          fieldId={fieldId("city")}
          errorId={errorId("city")}
          errors={errors}
        >
          <Select
            value={values.city}
            onValueChange={(value) => setField("city", value)}
            disabled={isSubmitting}
          >
            <SelectTrigger
              id={fieldId("city")}
              className={cn(fieldClass, "w-full")}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={describedBy("city")}
            >
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-line">
              <SelectGroup>
                {cityOptions.map((city) => (
                  <SelectItem
                    key={city}
                    value={city}
                    className="cursor-pointer"
                  >
                    {city}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field
          label="Plan of interest"
          field="plan"
          fieldId={fieldId("plan")}
          errorId={errorId("plan")}
          errors={errors}
        >
          <Select
            value={values.plan}
            onValueChange={(value) => setField("plan", value)}
            disabled={isSubmitting}
          >
            <SelectTrigger
              id={fieldId("plan")}
              className={cn(fieldClass, "w-full")}
              aria-invalid={Boolean(errors.plan)}
              aria-describedby={describedBy("plan")}
            >
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-line">
              <SelectGroup>
                {planOptions.map((plan) => (
                  <SelectItem
                    key={plan}
                    value={plan}
                    className="cursor-pointer"
                  >
                    {plan}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <Field
        label="Message"
        field="message"
        fieldId={fieldId("message")}
        errorId={errorId("message")}
        errors={errors}
        hint="Tell us about your location — type of business, rough foot traffic, and whether you already have a machine."
        hintId={`${formId}-message-hint`}
      >
        <Textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          placeholder="We run a corner store on Yale Road, open seven days, and customers keep asking where the nearest bank machine is…"
          value={values.message}
          onChange={(event) => setField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", `${formId}-message-hint`)}
          disabled={isSubmitting}
          className={cn(fieldClass, "h-auto min-h-36 py-3.5")}
        />
      </Field>

      {/* Honeypot — visually and programmatically hidden from real visitors. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor={`${formId}-${HONEYPOT_FIELD}`}>
          Leave this field empty
        </label>
        <input
          id={`${formId}-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <CtaButton
          type="submit"
          variant="dark"
          disabled={isSubmitting}
          className="w-full justify-between sm:w-auto"
          icon={
            isSubmitting ? (
              <Loader2Icon aria-hidden="true" className="size-4 animate-spin" />
            ) : undefined
          }
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </CtaButton>
        <p className="text-sm text-ink-soft">
          We reply within one business day. No spam, ever.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  field,
  fieldId,
  errorId,
  errors,
  hint,
  hintId,
  children,
}: {
  label: string;
  field: FieldName;
  fieldId: string;
  errorId: string;
  errors: ContactFieldErrors;
  hint?: string;
  hintId?: string;
  children: ReactNode;
}) {
  const error = errors[field]?.[0];

  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={fieldId} className={labelClass}>
        {label}
      </Label>
      {hint ? (
        <p id={hintId} className="text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
