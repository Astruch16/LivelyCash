/**
 * Partner reviews shown under the stat band on the home page. Quotes are
 * verbatim from the businesses — edit the wording only with their sign-off.
 */
export type Testimonial = {
  business: string;
  headline: string;
  quote: string;
  /** Out of five. */
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    business: "Victoria Currency Exchange",
    headline: "Great ATM services!",
    quote:
      "Working with Aaron and Sarah’s ATM service has been a fantastic experience. Their professionalism, reliability, and dedication to customer service are exceptional. They are always prompt and efficient, ensuring our needs are met. We highly recommend their ATM service to anyone in need of dependable and top-notch support.",
    rating: 5,
  },
  {
    business: "Infusion VR Arcade",
    headline: "Great addition to our business",
    quote:
      "We couldn’t be happier with the service Aaron and Sarah provide at our VR Arcade. Their ATM machine has been incredibly convenient for our customers, enhancing their overall experience. The setup process was seamless, and they were always available to support us whenever needed. Our guests appreciate the easy access to cash, and it’s been a great addition to our business. We highly recommend Aaron and Sarah for their professionalism, reliability, and outstanding customer service.",
    rating: 5,
  },
  {
    business: "Moss Street Market",
    headline: "Saved the vendors lots of CC fees",
    quote:
      "Lively Cash ATMs provided Moss Street Market with ATMs for our customers during our 2024 season. Aaron and Sarah were always prompt and communicative, and their ATMs were reliable and worked well. We could not have been more pleased with their service.",
    rating: 5,
  },
];
