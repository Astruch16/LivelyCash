/**
 * Manufacturer specifications for the Hyosung Halo II (MX2600SE), the only
 * machine Lively Cash deploys.
 *
 * These are hardware facts, not marketing copy — the surrounding page sells
 * the benefits, this sells nothing. Optional items are marked as optional
 * because that is what they are: do not quietly promote one to standard.
 */
export type SpecEntry = {
  text: string;
  /** Sub-points belonging to the entry above them. */
  detail?: string[];
};

export type SpecGroup = {
  label: string;
  entries: SpecEntry[];
};

export const haloIiSpecs: SpecGroup[] = [
  {
    label: "System platform",
    entries: [{ text: "Microsoft Windows CE 6.0" }],
  },
  {
    label: "Screen display",
    entries: [{ text: "10.1-inch TFT LCD" }],
  },
  {
    label: "Card reader",
    entries: [{ text: "EMV dip-type card reader" }],
  },
  {
    label: "Cash dispenser",
    entries: [
      { text: "1,000-note drawer" },
      { text: "1,000-note removable cassette" },
      {
        text: "2,000-note removable cassette",
        detail: ["Upgradable to two cassettes, for up to 4,000-note capacity"],
      },
    ],
  },
  {
    label: "Input type",
    entries: [
      { text: "8 function keys" },
      { text: "ADA compliant" },
      { text: "PCI compliant EPP" },
      { text: "RKT (optional)" },
    ],
  },
  {
    label: "Communication",
    entries: [
      { text: "TCP/IP" },
      { text: "Dial-up" },
      { text: "DPL (Wireless Internet Modem)" },
    ],
  },
  {
    label: "Security",
    entries: [
      { text: "UL291 business hours safe" },
      { text: "Electric lock" },
      { text: "Cencon or S&G lock (optional)" },
    ],
  },
  {
    label: "Printers",
    entries: [
      { text: 'Thermal line 3" receipt printer' },
      { text: "Electronic journal" },
    ],
  },
  {
    label: "Power supply",
    entries: [{ text: "AC 110–240V, 50–60 Hz" }],
  },
  {
    label: "Operating environment",
    entries: [
      { text: "Temperature: 0°C – 40°C" },
      { text: "Humidity: 20% – 85%" },
    ],
  },
  {
    label: "Dimensions",
    entries: [
      { text: 'Height: 54.2" (1,377 mm)' },
      { text: 'Width: 15.7" (399 mm)' },
      { text: 'Depth: 23.4" (594 mm)' },
      { text: "Weight: 265 lbs (120 kg)" },
    ],
  },
  {
    label: "Additional features",
    entries: [
      { text: "EPP indicator" },
      { text: "Lead-through indicator" },
      { text: "Earphone jack" },
      { text: "Digital receipt" },
      {
        text: "Six languages",
        detail: ["English, French, Spanish, Japanese, Chinese, Korean"],
      },
      {
        text: "Enhanced Standard 1 emulation",
        detail: [
          "Dynamic Currency Conversion (DCC)",
          "Donation transactions",
          "Decimal point percentage surcharge",
        ],
      },
      { text: "TLS protocol communication" },
    ],
  },
];
