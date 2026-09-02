/**
 * Businesses running a Lively Cash machine, listed on the home page.
 *
 * TODO(launch): confirm each of these has agreed to be named publicly before
 * this goes live — the list puts their name on a marketing page.
 */
export type Partner = {
  name: string;
  /** One of our five service areas; rendered as the chip's second line. */
  city: string;
};

export const partners: Partner[] = [
  { name: "Lami Cuts", city: "Chilliwack" },
  { name: "Lolly N' Pop", city: "Harrison" },
  { name: "Young St. Market", city: "Chilliwack" },
  { name: "Luxe Nightclub", city: "Chilliwack" },
  { name: "Mountainview Brewing Co.", city: "Hope" },
  { name: "Chillibowl Lanes & Pool Hall", city: "Chilliwack" },
  { name: "Chilliwack Curling Club", city: "Chilliwack" },
  { name: "Unsworth Market", city: "Chilliwack" },
  { name: "Vape Escape", city: "Abbotsford" },
];
