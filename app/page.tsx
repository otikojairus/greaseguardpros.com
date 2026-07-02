import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, CITY_PAGES, PHONE_DISPLAY, PHONE_E164, SERVICE_HUBS, toPath, cityFromTargetArea } from "@/lib/site-data";
import { HOME_FAQS } from "@/lib/page-content";
import { detectServiceFamily } from "@/lib/page-content";
import { homeLocalBusinessSchema, faqSchema } from "@/lib/seo-helpers";
import { SITE_IMAGES, getServicePhoto } from "@/lib/images";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { CtaBanner } from "@/components/cta-banner";
import { PhoneIcon, ShieldIcon, ClockIcon, MapPinIcon, CheckCircleIcon, ArrowRightIcon, ServiceIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <main className="pulse-main">
      <JsonLd data={[homeLocalBusinessSchema(), faqSchema(HOME_FAQS)]} />

      <section className="pulse-hero">
        <div className="pulse-wrap pulse-hero-grid">
          <div className="pulse-hero-copy">
            <p className="pulse-kicker">Canada&apos;s commercial kitchen cleaning experts</p>
            <h1>Keep your kitchen safe, compliant, and running smoothly.</h1>
            <p className="pulse-lead">
              Grease traps backing up? Hood overdue for cleaning? Drain lines moving slow? Grease Guard Pros helps
              restaurants, hotels, and property managers across Canada solve grease and drainage problems before they
              shut you down. One call connects you with certified crews who show up prepared, work around your schedule,
              and leave your systems clean and documented.
            </p>
            <div className="pulse-actions">
              <a className="pulse-call" href={`tel:${PHONE_E164}`}>
                <PhoneIcon size={18} />
                Call {PHONE_DISPLAY}
              </a>
              <Link className="pulse-btn" href="/services">
                View All Services
              </Link>
            </div>
            <div className="pulse-badge-row">
              <span className="pulse-badge">Grease trap pumping</span>
              <span className="pulse-badge">NFPA 96 hood cleaning</span>
              <span className="pulse-badge">Hydro jetting</span>
              <span className="pulse-badge">Catch basin service</span>
            </div>
          </div>

          <aside className="pulse-hero-showcase">
            <div className="pulse-hero-image-panel">
              <Image
                src={SITE_IMAGES.hero.src}
                alt={SITE_IMAGES.hero.alt}
                width={640}
                height={480}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="pulse-hero-stats-row">
              <div className="pulse-hero-stat-pill">
                <strong>Same-day</strong>
                <span>emergency response</span>
              </div>
              <div className="pulse-hero-stat-pill">
                <strong>59 cities</strong>
                <span>across Canada</span>
              </div>
              <div className="pulse-hero-stat-pill">
                <strong>NFPA 96</strong>
                <span>certified hood cleaning</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="pulse-trust-band">
        <div className="pulse-wrap pulse-trust-wrap">
          <div className="pulse-trust-list">
            <article className="pulse-trust-item">
              <div className="pulse-trust-icon"><ShieldIcon size={18} /></div>
              <div>
                <strong>Fire code compliant</strong>
                <span>NFPA 96 hood and exhaust cleaning that passes inspection.</span>
              </div>
            </article>
            <article className="pulse-trust-item">
              <div className="pulse-trust-icon"><ClockIcon size={18} /></div>
              <div>
                <strong>Same-day available</strong>
                <span>Emergency grease trap and drain service when you cannot wait.</span>
              </div>
            </article>
            <article className="pulse-trust-item">
              <div className="pulse-trust-icon"><CheckCircleIcon size={18} /></div>
              <div>
                <strong>Documented every visit</strong>
                <span>Service records for health inspectors and insurance.</span>
              </div>
            </article>
            <article className="pulse-trust-item">
              <div className="pulse-trust-icon"><MapPinIcon size={18} /></div>
              <div>
                <strong>Nationwide coverage</strong>
                <span>Local crews in 59 cities from Toronto to Vancouver.</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="pulse-section">
        <div className="pulse-wrap">
          <div className="pulse-section-header">
            <h2>How it works</h2>
            <p className="pulse-lead">From your first call to a clean system — here is what to expect.</p>
          </div>
          <div className="pulse-grid pulse-grid-2 pulse-process">
            <article className="pulse-card pulse-step">
              <h3>Call and describe the issue</h3>
              <p>Tell us your property type, what is happening, and where you are. We match you with the right crew and equipment.</p>
            </article>
            <article className="pulse-card pulse-step">
              <h3>We confirm timing and access</h3>
              <p>Before arrival, we confirm your schedule, access points, and any special requirements for your kitchen or property.</p>
            </article>
            <article className="pulse-card pulse-step">
              <h3>Certified technicians do the work</h3>
              <p>Our crews complete the cleaning, pumping, or jetting safely and thoroughly — around your operating hours.</p>
            </article>
            <article className="pulse-card pulse-step">
              <h3>You get a clear service record</h3>
              <p>We document what was done, flag anything needing follow-up, and help you plan the next service date.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="pulse-section pulse-section-alt">
        <div className="pulse-wrap">
          <div className="pulse-section-header">
            <h2>Our services</h2>
            <p className="pulse-lead">Everything your commercial kitchen and property needs to stay clean and compliant.</p>
          </div>
          <div className="pulse-grid pulse-grid-3">
            {SERVICE_HUBS.slice(0, 9).map((page) => {
              const family = detectServiceFamily(page);
              const photo = getServicePhoto(family);
              return (
                <Link className="pulse-card pulse-service-card" key={page.pageSlug} href={toPath(page.pageSlug)}>
                  <Image
                    className="pulse-service-card-img"
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={180}
                    loading="lazy"
                  />
                  <div className="pulse-service-card-body">
                    <div className="pulse-benefit-icon" style={{ marginBottom: "0.6rem" }}>
                      <ServiceIcon family={family} size={22} />
                    </div>
                    <h3>{page.pageTitle.replace(/\s*\|.*/, "")}</h3>
                    <p>Trusted crews for restaurants, plazas, and commercial properties.</p>
                    <span className="pulse-service-card-link">
                      Learn more <ArrowRightIcon size={16} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />

      <section className="pulse-section" id="coverage">
        <div className="pulse-wrap">
          <div className="pulse-section-header">
            <h2>Service areas across Canada</h2>
            <p className="pulse-lead">Local crews in major cities — click your city for service details and scheduling.</p>
          </div>
          <div className="pulse-grid pulse-grid-4">
            {CITY_PAGES.slice(0, 24).map((page) => (
              <Link className="pulse-chip" key={page.pageSlug} href={toPath(page.pageSlug)}>
                {cityFromTargetArea(page.targetArea)}
              </Link>
            ))}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Link className="pulse-btn pulse-btn-light" href="/services">
              View all cities and services
            </Link>
          </div>
        </div>
      </section>

      <section className="pulse-section pulse-section-alt">
        <div className="pulse-wrap">
          <div className="pulse-section-header">
            <h2>Helpful guides</h2>
            <p className="pulse-lead">Practical advice for restaurant owners and property managers.</p>
          </div>
          <div className="pulse-grid pulse-grid-2">
            {BLOG_POSTS.map((page) => (
              <Link className="pulse-card" key={page.pageSlug} href={toPath(page.pageSlug)}>
                <p className="pulse-card-eyebrow">Guide</p>
                <h3>{page.pageTitle}</h3>
                <p>Practical tips to help you make the right maintenance decision before problems escalate.</p>
                <span className="pulse-service-card-link">
                  Read guide <ArrowRightIcon size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pulse-section">
        <div className="pulse-wrap">
          <FaqSection faqs={HOME_FAQS} />
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Grease Trap, Hood & Drain Cleaning | Grease Guard Pros",
  description: "Commercial grease trap cleaning, hood cleaning, catch basin service, and hydro jetting across Canada. Same-day available. Call 1-888-328-8990.",
  alternates: { canonical: "/" },
};
