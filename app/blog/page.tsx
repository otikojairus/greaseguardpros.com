import Link from "next/link";
import { Metadata } from "next";
import { BLOG_POSTS, PHONE_DISPLAY, PHONE_E164, SITE_NAME, absoluteUrl, toPath } from "@/lib/site-data";
import { breadcrumbSchema } from "@/lib/seo-helpers";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { ArrowRightIcon } from "@/components/icons";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/blog" },
];

export const metadata: Metadata = {
  title: "Commercial Kitchen Guides & Tips | Grease Guard Pros",
  description: "Practical guides on grease trap cleaning, hood maintenance, catch basin care, and hydro jetting for restaurant owners and property managers.",
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    title: `Guides & Tips | ${SITE_NAME}`,
    description: "Helpful commercial kitchen maintenance guides.",
    url: absoluteUrl("/blog"),
  },
};

export default function BlogIndexPage() {
  return (
    <main className="pulse-main pulse-section">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="pulse-wrap">
        <Breadcrumbs items={crumbs} />

        <p className="pulse-kicker">Guides & Tips</p>
        <h1>Practical advice for restaurant owners and property managers</h1>
        <p className="pulse-lead">
          Running a commercial kitchen means making smart maintenance decisions before small problems become expensive
          emergencies. These guides cover the questions we hear most often — how often to clean a grease trap, what hydro
          jetting actually does, when hood cleaning is overdue, and how to prepare your kitchen for a service visit. Read
          up, then call us when you are ready to schedule.
        </p>

        <div className="pulse-grid pulse-grid-2" style={{ marginTop: "2rem" }}>
          {BLOG_POSTS.map((post, index) => (
            <Link
              key={post.pageSlug}
              href={toPath(post.pageSlug)}
              className={`pulse-card ${index % 2 === 0 ? "pulse-card-accent" : ""}`}
            >
              <p className="pulse-card-eyebrow">Guide</p>
              <h2>{post.pageTitle}</h2>
              <p>Practical tips to help you make the right maintenance decision before problems escalate.</p>
              <span className="pulse-service-card-link">
                Read guide <ArrowRightIcon size={16} />
              </span>
            </Link>
          ))}
        </div>

        <section className="pulse-detail">
          <h2>Have a question not covered here?</h2>
          <p className="pulse-lead">
            Our team answers calls from restaurant owners and property managers every day. If you are dealing with a grease
            trap backup, hood cleaning deadline, or slow drain, call us directly.
          </p>
          <a className="pulse-call" href={`tel:${PHONE_E164}`} style={{ marginTop: "1rem" }}>
            Call {PHONE_DISPLAY}
          </a>
        </section>
      </div>
      <CtaBanner headline="Need help right now?" subtext="Call for same-day grease trap, hood, or drain service." />
    </main>
  );
}
