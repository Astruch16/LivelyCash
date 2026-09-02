import { z } from "zod";

import { planInterestOptions } from "@/lib/plans";
import { cityNav } from "@/lib/site";

export const cityOptions: readonly string[] = [
  ...cityNav.map((city) => city.label),
  "Other",
];

export const planOptions: readonly string[] = [...planInterestOptions];

/**
 * Shared by the client form and the route handler so both sides enforce the
 * exact same rules — the client copy is a convenience, the server copy is the
 * one that counts.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name is too long."),
  businessName: z
    .string()
    .trim()
    .min(2, "Please enter your business name.")
    .max(150, "That business name is too long."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a phone number we can reach you on.")
    .max(30, "That phone number is too long.")
    .regex(
      /^[\d\s()+.-]+$/,
      "Phone numbers can only contain digits and + ( ) - . characters.",
    ),
  city: z.enum(cityOptions, { message: "Please choose a city." }),
  plan: z.enum(planOptions, { message: "Please choose a plan of interest." }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little about your location.")
    .max(2000, "Please keep your message under 2000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Name of the hidden honeypot input. Humans never fill this in. */
export const HONEYPOT_FIELD = "companyWebsite";

export type ContactFieldErrors = Partial<
  Record<keyof ContactInput, string[] | undefined>
>;

export type ContactApiResponse = {
  ok: boolean;
  message: string;
  fieldErrors?: ContactFieldErrors;
};
