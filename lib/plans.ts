/**
 * The three Lively Cash programs. Figures here are contractual — polish the
 * prose if you like, but do not change the numbers without sign-off.
 */

export type PlanCost = {
  label: string;
  value: string;
  note?: string;
};

export type Plan = {
  slug: string;
  name: string;
  shortName: string;
  /** One-line positioning used on the home page plan grid. */
  summary: string;
  /** Longer pitch used at the top of the plan's card on /plans. */
  intro: string;
  profitLevel: string;
  bestFor: string;
  features: string[];
  costs: PlanCost[];
  recommended?: boolean;
};

export const plans: Plan[] = [
  {
    slug: "atm-purchase-program",
    name: "ATM Purchase Program",
    shortName: "Purchase",
    summary:
      "Own the machine outright and keep the largest share of every surcharge.",
    intro:
      "This program generates the highest profit for your business, but has the highest up-front cost. You buy the ATM, you load it, and the surcharge revenue is yours apart from a fixed per-transaction fee.",
    profitLevel: "Highest profit",
    bestFor: "Operators who want maximum revenue and are ready to invest.",
    features: [
      "Location purchases and owns the ATM outright",
      "Location supplies and loads the ATM with cash",
      "Location pays for supplies and parts",
      "Lively Cash installs the ATM and connects you to our processing network",
      "Lively Cash provides maintenance calls upon request",
      "Location provides $0.50 (per transaction) of the surcharge profits to Lively Cash if you choose to pay for the processing and wireless communication costs separately — or $0.65 per transaction covers monthly processing and wireless communication costs (the easier option)",
    ],
    costs: [
      {
        label: "ATM",
        value: "Wholesale pricing, no upcharge or hidden fees",
        note: "Includes shipping and installation",
      },
      {
        label: "DPL (wireless communication device)",
        value: "Wholesale pricing + $15 monthly communication fee",
        note: "Free if you connect to your local internet",
      },
      { label: "Shipping and installation", value: "FREE" },
    ],
  },
  {
    slug: "atm-combo-program",
    name: "ATM Combo Program",
    shortName: "Combo",
    summary: "Load the machine with your own cash without buying the hardware.",
    intro:
      "Great if you'd like to load the ATM with your own cash without owning the machine. Medium profits — Lively Cash owns the ATM and provides maintenance, parts, and processing.",
    profitLevel: "Medium profit",
    bestFor:
      "Businesses with cash on hand that want revenue share with no capital outlay.",
    features: [
      "Lively Cash owns, provides, and installs the ATM",
      "Location loads the ATM with cash",
      "Supplies and parts provided by Lively Cash",
      "Lively Cash provides maintenance calls upon request",
      "Surcharge profits are determined based on average usage of the ATM — please inquire for further details. Connecting to your existing internet increases your share by 5%.",
    ],
    costs: [
      { label: "ATM", value: "FREE" },
      { label: "DPL", value: "FREE", note: "See above" },
      { label: "Shipping & installation", value: "FREE" },
    ],
  },
  {
    slug: "turnkey-atm-placement-program",
    name: "Turnkey ATM Placement Program",
    shortName: "Turnkey",
    summary:
      "Completely hands-off — we supply, stock, monitor and maintain everything.",
    intro:
      "Best for a hands-off approach — we take care of everything, and we collect most of the proceeds from the ATM. Surcharge sharing breakdown provided upon request.",
    profitLevel: "Zero effort",
    bestFor:
      "Locations that want the customer convenience and foot traffic without any of the work.",
    features: [
      "Free ATM, installation & setup — no out-of-pocket cost to you",
      "24/7 monitoring & full maintenance — we handle everything",
      "Wireless connection — the machine runs on its own secure network (no use of your internet)",
      "No responsibility on your end — you don't need to lift a finger",
      "Weekly cash stocking — so your customers never walk away empty-handed",
      "Secured installation — the ATM is professionally bolted and secured for safety and security",
      "Surcharge profits are determined based on average usage of the ATM — please inquire for further details.",
    ],
    costs: [
      { label: "ATM, installation & setup", value: "FREE" },
      { label: "Monitoring & maintenance", value: "Included" },
      { label: "Wireless connection", value: "Included" },
    ],
    recommended: true,
  },
];

/**
 * Mobile ATM service — deliberately NOT a member of `plans`.
 *
 * The three programs above are one decision on a single axis: how involved
 * the location wants to be, ordered highest profit to zero effort. A mobile
 * ATM is a different product — a machine hired for the length of an event,
 * with a flat drop fee and no surcharge share — so it is not a fourth option
 * in that comparison. Keeping it out of the array also keeps the home page
 * and /why-us grids at three columns, and the "three programs" wording in the
 * Terms and Privacy pages accurate.
 *
 * It is typed as a `Plan` so it renders through the same `PlanDetailCard`,
 * with identical styling and structure.
 */
export const mobileAtmPlan: Plan = {
  slug: "mobile-atm-service",
  name: "Mobile ATM Service",
  shortName: "Mobile",
  summary: "A stocked ATM delivered to your event, set up and ready to run.",
  intro:
    "For festivals, farmers markets, fairs and private events. We deliver the machine, set it up on site, supply all the cash for the event, and collect everything afterwards.",
  profitLevel: "Event service",
  bestFor:
    "Event organisers, festivals, farmers markets and seasonal venues that need cash access for a few days rather than year-round.",
  features: [
    "We deliver the ATM to your venue and set it up on site",
    "All cash for the event is supplied by Lively Cash",
    "Service and support for the duration of the event",
    "Collection and removal once the event ends",
  ],
  costs: [
    {
      label: "Drop fee",
      value: "$499",
      note: "Varies with the size and duration of the event",
    },
  ],
};

export const recommendedPlan = plans.find((plan) => plan.recommended)!;

/** AML requirements that apply to Programs 1 and 2 only. */
export const amlOnboarding = {
  title: "AML onboarding",
  applies: "Applies to the ATM Purchase Program and the ATM Combo Program",
  intro:
    "Both programs require AML onboarding to our processing network. We'll need:",
  requirements: [
    "Full Name",
    "Email Address",
    "Phone Number",
    "Photo ID of all directors",
    "Certified Company Void Cheque (stamped by your bank)",
    "Articles of Incorporation",
  ],
  outro: "Training on how to maintain and load the ATM with cash is provided.",
} as const;

export const plansClosingLine =
  "If you are interested in any of these programs or would like to discuss possible alterations, please let us know and we'd be happy to help!";

/** Plan options offered in the contact form's "Plan of interest" select. */
export const planInterestOptions = [
  ...plans.map((plan) => plan.name),
  "Not sure yet",
] as const;
