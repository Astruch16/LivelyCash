import { Marquee, MarqueeChip } from "@/components/marketing/marquee";
import { partners } from "@/lib/partners";

export function PartnerMarquee() {
  return (
    <Marquee
      items={partners}
      getKey={(partner) => partner.name}
      label="Businesses running a Lively Cash ATM"
      renderItem={(partner) => (
        <MarqueeChip name={partner.name} detail={partner.city} />
      )}
    />
  );
}
