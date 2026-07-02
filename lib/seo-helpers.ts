import type { SeoPage } from "./site-data";
import { PHONE_E164, SITE_NAME, absoluteUrl, cityFromTargetArea } from "./site-data";
import type { FaqItem } from "./page-content";
import { detectServiceFamily } from "./page-content";

export type BreadcrumbItem = { name: string; path: string };

export function buildBreadcrumbs(page: SeoPage): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ name: "Home", path: "/" }];

  if (page.pageType === "City Service Page") {
    crumbs.push({ name: "Services", path: "/services" });
    const city = cityFromTargetArea(page.targetArea);
    crumbs.push({ name: city, path: page.pageSlug });
    return crumbs;
  }

  if (page.pageType === "Near Me Page" || page.pageType === "Cost Guide") {
    crumbs.push({ name: "Services", path: "/services" });
    crumbs.push({ name: page.pageTitle.replace(/\s*\|.*/, ""), path: page.pageSlug });
    return crumbs;
  }

  crumbs.push({ name: "Services", path: "/services" });
  crumbs.push({ name: page.pageTitle.replace(/\s*\|.*/, ""), path: page.pageSlug });
  return crumbs;
}

export function breadcrumbSchema(crumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function localBusinessSchema(page: SeoPage) {
  const city = cityFromTargetArea(page.targetArea);
  const family = detectServiceFamily(page);

  const serviceNames: Record<string, string> = {
    hood: "Commercial Hood Cleaning",
    "grease-trap": "Grease Trap Cleaning",
    "catch-basin": "Catch Basin Cleaning",
    "hydro-jetting": "Hydro Jetting",
    "lift-station": "Lift Station Cleaning",
    "commercial-kitchen": "Commercial Kitchen Cleaning",
    "kitchen-exhaust": "Kitchen Exhaust Cleaning",
  };

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: absoluteUrl(page.pageSlug),
    telephone: PHONE_E164,
    areaServed: { "@type": "City", name: city },
    description: `${serviceNames[family] ?? "Commercial cleaning"} in ${city}`,
    serviceType: serviceNames[family] ?? "Commercial cleaning",
  };
}

export function serviceSchema(page: SeoPage) {
  const family = detectServiceFamily(page);
  const serviceNames: Record<string, string> = {
    hood: "Commercial Hood Cleaning",
    "grease-trap": "Grease Trap Cleaning",
    "catch-basin": "Catch Basin Cleaning",
    "hydro-jetting": "Hydro Jetting",
    "lift-station": "Lift Station Cleaning",
    "commercial-kitchen": "Commercial Kitchen Cleaning",
    "kitchen-exhaust": "Kitchen Exhaust Cleaning",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceNames[family] ?? page.primaryKeyword,
    provider: { "@type": "LocalBusiness", name: SITE_NAME, telephone: PHONE_E164 },
    areaServed: page.pageType === "City Service Page" ? cityFromTargetArea(page.targetArea) : "Canada",
    url: absoluteUrl(page.pageSlug),
  };
}

export function homeLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    telephone: PHONE_E164,
    areaServed: "Canada",
    description: "Commercial grease trap cleaning, hood cleaning, catch basin maintenance, and hydro jetting services.",
    serviceType: ["Grease trap cleaning", "Hood cleaning", "Catch basin cleaning", "Hydro jetting"],
  };
}
