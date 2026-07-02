import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { CITY_PAGES, SERVICE_HUBS, SITE_NAME, absoluteUrl, cityFromTargetArea, toPath } from "@/lib/site-data";
import { SERVICES_FAQS, detectServiceFamily } from "@/lib/page-content";
import { getServicePhoto } from "@/lib/images";
import { breadcrumbSchema, faqSchema } from "@/lib/seo-helpers";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { CtaBanner } from "@/components/cta-banner";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ServiceIcon, ArrowRightIcon } from "@/components/icons";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export const metadata: Metadata = {
  title: "Commercial Cleaning Services | Grease Guard Pros",
  description: "Grease trap cleaning, hood cleaning, catch basin service, hydro jetting, and more across Canada. Find your service and call for same-day help.",
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    title: `Commercial Cleaning Services | ${SITE_NAME}`,
    description: "Full service directory for commercial kitchens and properties across Canada.",
    url: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <main className="pulse-main pulse-section">
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(SERVICES_FAQS)]} />
      <div className="pulse-wrap">
        <Breadcrumbs items={crumbs} />

        <p className="pulse-kicker">Our Services</p>
        <h1>Commercial cleaning services for kitchens and properties</h1>
        <p className="pulse-lead">
          Whether you run a busy restaurant, manage a commercial plaza, or oversee a multi-tenant property, Grease Guard Pros
          has the right service for your grease and drainage needs. From routine grease trap pumping to emergency hydro jetting,
          our certified crews work across Canada with scheduling that fits your operations. Pick a service below or call us
          and we will route you to the right team.
        </p>

        <section className="pulse-grid pulse-grid-3" style={{ marginTop: "2rem" }}>
          {SERVICE_HUBS.map((page) => {
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
                  <h2>{page.pageTitle.replace(/\s*\|.*/, "")}</h2>
                  <p>Trusted crews for commercial kitchens and properties.</p>
                  <span className="pulse-service-card-link">
                    View service <ArrowRightIcon size={16} />
                  </span>
                </div>
              </Link>
            );
          })}
        </section>

        <section className="pulse-detail">
          <h2>Not sure which service you need?</h2>
          <ul className="pulse-list-check">
            <li>Grease trap backing up or overdue for pumping? Start with <Link href="/grease-trap-cleaning">grease trap cleaning</Link>.</li>
            <li>Hood greasy, kitchen smoky, or inspection coming up? See our <Link href="/hood-cleaning-services">hood cleaning services</Link>.</li>
            <li>Parking lot flooding or storm drain slow? Try <Link href="/catch-basin-cleaning">catch basin cleaning</Link>.</li>
            <li>Drain line blocked or moving slow? <Link href="/hydro-jetting-services">Hydro jetting</Link> clears what snaking cannot.</li>
          </ul>
        </section>

        <section className="pulse-detail">
          <h2>Service areas</h2>
          <p className="pulse-lead">We serve commercial properties in cities across Canada. Select your city for local service details.</p>
          <div className="pulse-grid pulse-grid-4">
            {CITY_PAGES.map((page) => (
              <Link className="pulse-chip" key={page.pageSlug} href={toPath(page.pageSlug)}>
                {cityFromTargetArea(page.targetArea)}
              </Link>
            ))}
          </div>
        </section>

        <FaqSection faqs={SERVICES_FAQS} />
      </div>
      <CtaBanner />
    </main>
  );
}
