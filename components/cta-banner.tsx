import { PHONE_DISPLAY } from "@/lib/site-data";
import { PhoneIcon } from "./icons";

type CtaBannerProps = {
  headline?: string;
  subtext?: string;
};

export function CtaBanner({
  headline = "Ready to get your kitchen or property back on track?",
  subtext = "Call now — same-day service available in most areas.",
}: CtaBannerProps) {
  return (
    <section className="pulse-cta-banner">
      <div className="pulse-wrap pulse-cta-banner-inner">
        <div className="pulse-cta-banner-copy">
          <h2>{headline}</h2>
          <p>{subtext}</p>
        </div>
        <a className="pulse-call pulse-cta-banner-btn" href={`tel:${PHONE_DISPLAY.replace(/[^0-9]/g, "")}`}>
          <PhoneIcon size={18} />
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  );
}
