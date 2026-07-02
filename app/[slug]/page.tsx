import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PHONE_DISPLAY, PHONE_E164, SEO_PAGES, SITE_NAME, absoluteUrl, bySlug, cityFromTargetArea, toPath } from "@/lib/site-data";
import {
  buildPageContent,
  detectServiceFamily,
  getPillarPage,
  getCityPagesForPillar,
  getCrossLinksInCity,
  getEmergencyLinks,
  getCityLinkLabel,
  getCrossLinkLabel,
} from "@/lib/page-content";
import { getLocationFacts } from "@/lib/city-facts";
import { buildBreadcrumbs, breadcrumbSchema, faqSchema, localBusinessSchema, serviceSchema } from "@/lib/seo-helpers";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection } from "@/components/faq-section";
import { CtaBanner } from "@/components/cta-banner";
import { PhoneIcon, CheckCircleIcon, ServiceIcon } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;

export async function generateStaticParams() {
  return SEO_PAGES
    .map((page) => page.pageSlug.replace(/^\//, ""))
    .filter((slug) => !slug.includes("/"))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = bySlug(slug);
  if (!page) return { title: "Page Not Found" };

  const content = buildPageContent(page);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: absoluteUrl(page.pageSlug) },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: absoluteUrl(page.pageSlug),
      type: "website",
      siteName: SITE_NAME,
    },
  };
}

export default async function DynamicSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = bySlug(slug);
  if (!page) notFound();

  const content = buildPageContent(page);
  const city = cityFromTargetArea(page.targetArea);
  const family = detectServiceFamily(page);
  const crumbs = buildBreadcrumbs(page);
  const pillar = getPillarPage(page);
  const cityPagesForPillar = pillar && page.pageType === "Service Pillar" ? getCityPagesForPillar(pillar, 12) : [];
  const crossLinks = page.pageType === "City Service Page" ? getCrossLinksInCity(page, 4) : [];
  const emergencyLinks = ["Near Me Page", "Cost Guide"].includes(page.pageType) ? getEmergencyLinks(page, 5) : [];
  const locationFacts = page.pageType === "City Service Page" ? getLocationFacts(city) : [];

  const schemas = [
    breadcrumbSchema(crumbs),
    faqSchema(content.faqs),
    serviceSchema(page),
    ...(page.pageType === "City Service Page" ? [localBusinessSchema(page)] : []),
  ];

  return (
    <main className="pulse-main pulse-section">
      <JsonLd data={schemas} />
      <div className="pulse-wrap">
        <Breadcrumbs items={crumbs} />

        <section className="pulse-page-hero">
          <div>
            <p className="pulse-kicker">
              {page.pageType === "City Service Page" ? `${city} service` : page.pageType.replace(" Page", "")}
            </p>
            <h1>{content.h1}</h1>
            <p className="pulse-lead">{content.intro}</p>
            <div className="pulse-actions">
              <a className="pulse-call" href={`tel:${PHONE_E164}`}>
                <PhoneIcon size={18} />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <aside>
            <div className="pulse-page-hero-visual">
              <Image
                src={content.serviceImage}
                alt={content.serviceImageAlt}
                width={480}
                height={360}
                priority
              />
            </div>
          </aside>
        </section>

        {locationFacts.length > 0 && (
          <section className="pulse-detail">
            <h2>What {city} property owners should know</h2>
            <div className="pulse-location-facts">
              {locationFacts.map((fact) => (
                <div className="pulse-location-fact" key={fact}>
                  <CheckCircleIcon size={18} />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="pulse-detail">
          <h2>Why choose Grease Guard Pros</h2>
          <div className="pulse-grid pulse-grid-2">
            {content.benefits.map((benefit) => (
              <article className="pulse-card pulse-benefit-card" key={benefit.title}>
                <div className="pulse-benefit-icon">
                  <ServiceIcon family={family} size={22} />
                </div>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pulse-detail">
          <h2>What to expect</h2>
          <div className="pulse-grid pulse-grid-2 pulse-process">
            {content.processSteps.map((step) => (
              <article className="pulse-card pulse-step" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        {pillar && page.pageType === "City Service Page" && (
          <section className="pulse-detail">
            <h2>Canada-wide service</h2>
            <p className="pulse-lead">
              Looking for service beyond {city}? Visit our national service page for full details on scope, compliance, and scheduling.
            </p>
            <Link className="pulse-link-chip" href={toPath(pillar.pageSlug)}>
              {pillar.pageTitle.replace(/\s*\|.*/, "")} — Canada-wide
            </Link>
          </section>
        )}

        {cityPagesForPillar.length > 0 && (
          <section className="pulse-detail">
            <h2>Cities we serve</h2>
            <p className="pulse-lead">Find local crews in your area — select your city for scheduling and details.</p>
            <div className="pulse-link-grid">
              {cityPagesForPillar.map((cityPage) => (
                <Link className="pulse-link-chip" key={cityPage.pageSlug} href={toPath(cityPage.pageSlug)}>
                  {getCityLinkLabel(cityPage)}
                </Link>
              ))}
            </div>
          </section>
        )}

        {crossLinks.length > 0 && (
          <section className="pulse-detail">
            <h2>Other services in {city}</h2>
            <p className="pulse-lead">Property managers often combine these services — explore related options in {city}.</p>
            <div className="pulse-link-grid">
              {crossLinks.map((link) => (
                <Link className="pulse-link-chip" key={link.pageSlug} href={toPath(link.pageSlug)}>
                  {getCrossLinkLabel(link)}
                </Link>
              ))}
            </div>
          </section>
        )}

        {emergencyLinks.length > 0 && (
          <section className="pulse-detail">
            <h2>Local service areas</h2>
            <p className="pulse-lead">We serve these cities — select your location for local details and scheduling.</p>
            <div className="pulse-link-grid">
              {emergencyLinks.map((link) => (
                <Link className="pulse-link-chip" key={link.pageSlug} href={toPath(link.pageSlug)}>
                  {getCityLinkLabel(link)}
                </Link>
              ))}
            </div>
            {pillar && (
              <div style={{ marginTop: "1rem" }}>
                <Link className="pulse-link-chip" href={toPath(pillar.pageSlug)}>
                  {pillar.pageTitle.replace(/\s*\|.*/, "")} — national service
                </Link>
              </div>
            )}
          </section>
        )}

        <FaqSection faqs={content.faqs} />
      </div>

      <CtaBanner
        headline={page.pageType === "City Service Page" ? `Need a crew in ${city} today?` : "Ready to schedule service?"}
        subtext="Call now — same-day response available in most areas."
      />
    </main>
  );
}
