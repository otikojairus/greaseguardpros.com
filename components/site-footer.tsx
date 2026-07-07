import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, CITY_PAGES, PHONE_DISPLAY, PHONE_E164, SERVICE_HUBS, SITE_NAME, cityFromTargetArea, toPath } from "@/lib/site-data";
import { PhoneIcon } from "./icons";

export function SiteFooter() {
  const popularCities = CITY_PAGES.filter(
    (page, index, allPages) =>
      allPages.findIndex((candidate) => cityFromTargetArea(candidate.targetArea) === cityFromTargetArea(page.targetArea)) === index,
  ).slice(0, 6);

  return (
    <footer className="pulse-footer">
      <div className="pulse-wrap pulse-footer-grid">
        <div>
          <div className="pulse-footer-brand">
            <Image src="/logo.svg" alt="Grease Guard Pros logo" width={32} height={32} className="pulse-brand-mark" />
            <p className="pulse-footer-title">{SITE_NAME}</p>
          </div>
          <p className="pulse-muted">
            Professional grease trap cleaning, hood cleaning, catch basin service, and hydro jetting for restaurants,
            hotels, and commercial properties across Canada.
          </p>
          <a className="pulse-call pulse-call-footer" href={`tel:${PHONE_E164}`}>
            <PhoneIcon size={16} />
            Call {PHONE_DISPLAY}
          </a>
        </div>
        <div>
          <p className="pulse-footer-title">Services</p>
          <div className="pulse-col-links">
            {SERVICE_HUBS.slice(0, 6).map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)}>
                {page.pageTitle.replace(/\s*\|.*/, "")}
              </Link>
            ))}
            <Link href="/services">View all services</Link>
          </div>
        </div>
        <div>
          <p className="pulse-footer-title">Popular Cities</p>
          <div className="pulse-col-links">
            {popularCities.map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)}>
                {cityFromTargetArea(page.targetArea)}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="pulse-footer-title">Guides</p>
          <div className="pulse-col-links">
            {BLOG_POSTS.slice(0, 4).map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)}>
                {page.pageTitle}
              </Link>
            ))}
            <Link href="/blog">All guides</Link>
          </div>
        </div>
      </div>
      <div className="pulse-wrap" style={{ paddingBottom: "1.5rem" }}>
        <p className="pulse-muted" style={{ fontSize: "0.8rem", textAlign: "center" }}>
          &copy; {new Date().getFullYear()} {SITE_NAME}. Commercial grease and drain cleaning across Canada.
        </p>
      </div>
    </footer>
  );
}
