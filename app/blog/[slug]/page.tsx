import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, PHONE_DISPLAY, PHONE_E164, SITE_NAME, absoluteUrl } from "@/lib/site-data";
import { breadcrumbSchema, faqSchema } from "@/lib/seo-helpers";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSection } from "@/components/faq-section";
import { CtaBanner } from "@/components/cta-banner";
import type { FaqItem } from "@/lib/page-content";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;

function getBlogPost(slug: string) {
  return (
    BLOG_POSTS.find((post) => {
      const segment = post.pageSlug.replace(/^\/+/, "").replace(/^blog\//, "");
      return segment === slug;
    }) ?? null
  );
}

const BLOG_FAQS: Record<string, FaqItem[]> = {
  "how-often-should-a-grease-trap-be-cleaned": [
    { question: "How often should a commercial grease trap be cleaned?", answer: "Most commercial kitchens need grease trap pumping every 1–3 months. High-volume restaurants and those with heavy frying may need monthly service. Your local wastewater authority may also set minimum frequencies." },
    { question: "What happens if I skip a grease trap cleaning?", answer: "FOG (fats, oils, grease) accumulates until the trap overflows into your drain lines and kitchen. This causes backups, odours, health violations, and potential forced closure." },
    { question: "Can I clean a grease trap myself?", answer: "DIY grease trap cleaning is not recommended for commercial kitchens. Proper pumping requires equipment, disposal compliance, and documentation that professional crews provide." },
  ],
  "catch-basin-cleaning-signs": [
    { question: "What are the signs a catch basin needs cleaning?", answer: "Standing water in your parking lot after light rain, slow drainage during storms, visible debris at the grate, and foul odours from drains are all warning signs." },
    { question: "How often should catch basins be cleaned?", answer: "Commercial properties should clean catch basins at least twice a year — before spring runoff and before winter. High-traffic lots may need quarterly service." },
    { question: "Can a clogged catch basin damage my parking lot?", answer: "Yes. Standing water accelerates pavement deterioration, creates slip hazards, and can cause foundation moisture problems in adjacent buildings." },
  ],
  "hydro-jetting-vs-snaking": [
    { question: "Is hydro jetting better than snaking?", answer: "For grease-heavy commercial drain lines, yes. Snaking punches a hole through a blockage while jetting scours the entire pipe wall, providing longer-lasting results." },
    { question: "When should I choose snaking over jetting?", answer: "Snaking is appropriate for simple, soft blockages close to a fixture. Jetting is better for recurring slow drains, grease buildup, and longer pipe runs." },
    { question: "Does hydro jetting damage pipes?", answer: "Professional technicians adjust pressure based on pipe material and condition. For standard commercial drain lines, jetting is safe and more effective than mechanical methods." },
  ],
  "why-hood-cleaning-matters": [
    { question: "Why is hood cleaning required by law?", answer: "NFPA 96 and local fire codes require regular commercial hood cleaning because grease-laden exhaust systems are a leading cause of restaurant fires." },
    { question: "How often do restaurants need hood cleaning?", answer: "Most restaurants need hood cleaning every 1–3 months depending on cooking volume. Solid fuel cooking and high-volume operations may need monthly service." },
    { question: "What happens if I fail a hood inspection?", answer: "Failed inspections can result in fines, insurance issues, and forced closure until the hood system is professionally cleaned and documented." },
  ],
  "grease-trap-installation-vs-repair": [
    { question: "When should I replace instead of repair a grease trap?", answer: "Replace when the trap body is cracked, corroded, undersized for your kitchen volume, or when repair costs exceed 50% of replacement cost." },
    { question: "How long does a grease trap installation take?", answer: "Most commercial installations take 1–2 days depending on plumbing complexity, trap size, and permit requirements." },
    { question: "Do I need a permit for grease trap installation?", answer: "Most municipalities require permits for new grease trap installations. We handle permitting where required." },
  ],
  "preparing-commercial-kitchen-for-service": [
    { question: "How should I prepare my kitchen for a hood cleaning visit?", answer: "Clear access to the hood and roof, turn off cooking equipment, cover nearby food prep surfaces, and ensure technicians can reach the exhaust fan." },
    { question: "Do I need to close my restaurant during service?", answer: "Most hood and grease trap services are scheduled before opening or after closing. Your kitchen can typically reopen the same day." },
    { question: "What should I tell the technician before they arrive?", answer: "Share your hood type, last cleaning date, any access issues, and whether you have had recent problems like odours or reduced airflow." },
  ],
};

function buildArticleBody(slug: string, post: { pageTitle: string; primaryKeyword: string }) {
  const bodies: Record<string, { intro: string; sections: { h2: string; paragraphs: string[] }[] }> = {
    "how-often-should-a-grease-trap-be-cleaned": {
      intro: "If you run a commercial kitchen, your grease trap is working harder than you think — every plate washed and every fryer drained sends fats, oils, and grease into that box under your sink or behind your building. Ignore it long enough and you will know: slow drains, bad smells, and eventually a backup that stops your kitchen cold.",
      sections: [
        { h2: "The short answer", paragraphs: ["Most commercial kitchens need grease trap pumping every 1–3 months. High-volume restaurants, especially those with heavy frying, often need monthly service. Your local wastewater authority may set a minimum frequency — and they will ask for your service records during inspections."] },
        { h2: "Signs your trap is overdue", paragraphs: ["Slow floor drains, gurgling sounds, grease odours near the dish pit, and water pooling near the trap are all red flags. If you cannot remember the last time your trap was pumped, it is overdue.", "Do not wait for an overflow. A full grease trap sends FOG straight into your drain lines and the municipal sewer — that is when fines and forced closures happen."] },
        { h2: "Setting a schedule that works", paragraphs: ["Track your pumping dates and compare them to your kitchen volume. A quiet café may go 90 days between pumpings. A busy fried chicken restaurant may need service every 30 days.", "Call Grease Guard Pros to set up a recurring schedule. We document every visit so you are always inspection-ready."] },
      ],
    },
    "catch-basin-cleaning-signs": {
      intro: "Catch basins sit quietly under your parking lot grates until the first heavy rain — then you find out whether they have been maintained. A clogged catch basin means standing water, pavement damage, and liability from slip hazards. Here is how to spot the warning signs before the next storm.",
      sections: [
        { h2: "Standing water after light rain", paragraphs: ["If water pools in your lot after a light shower, the catch basin is not draining. Sediment, leaves, and debris have filled the basin and restricted flow.", "This is the most obvious sign and the easiest to fix — but only if you act before the next major storm."] },
        { h2: "Odours and visible debris", paragraphs: ["Foul smells from parking lot drains and visible trash or sediment at the grate opening mean the basin needs attention. Grease from parked vehicles and restaurant runoff accelerates buildup.", "Regular vacuum cleaning removes sediment before it hardens and becomes harder to clear."] },
        { h2: "When to call for service", paragraphs: ["Schedule catch basin cleaning at least twice a year — before spring runoff and before winter freeze. Properties with heavy tree cover or high traffic may need quarterly service.", "Grease Guard Pros cleans commercial catch basins and connected storm drains across Canada. Call us before the next storm, not after."] },
      ],
    },
    "hydro-jetting-vs-snaking": {
      intro: "When a commercial drain slows down, most people reach for a snake. But snaking and hydro jetting solve different problems — and for grease-heavy kitchen lines, the difference matters. Here is when each method makes sense and why jetting often wins for restaurants.",
      sections: [
        { h2: "What snaking does", paragraphs: ["A drain snake (auger) punches a hole through a blockage. It is fast, affordable, and works well for simple clogs near a fixture — like a wad of food waste in a floor drain.", "But snaking does not clean the pipe walls. Grease and scale remain, which means the slow drain comes back within weeks."] },
        { h2: "What hydro jetting does", paragraphs: ["Hydro jetting uses high-pressure water to scour the entire inside of the pipe. It removes grease, scale, roots, and debris from the full pipe diameter — not just a narrow path through the middle.", "For commercial kitchen drain lines that accumulate grease with every service period, jetting provides results that last months instead of weeks."] },
        { h2: "Which one do you need?", paragraphs: ["Choose snaking for a one-time, simple blockage close to a drain. Choose jetting for recurring slow drains, grease buildup, or preventive maintenance on kitchen lines.", "Grease Guard Pros provides commercial hydro jetting across Canada. Call us to assess your lines and recommend the right approach."] },
      ],
    },
    "why-hood-cleaning-matters": {
      intro: "Your kitchen hood does more than vent smoke — it collects grease vapour with every cooking cycle. Over weeks and months, that grease coats the hood, ductwork, and exhaust fan. Without regular professional cleaning, that buildup becomes a fire hazard and an inspection failure waiting to happen.",
      sections: [
        { h2: "The fire risk is real", paragraphs: ["Grease-laden exhaust systems are one of the leading causes of commercial kitchen fires in Canada. Grease ignites at relatively low temperatures, and once a fire enters the ductwork, it spreads fast.", "NFPA 96 exists because of this risk. Regular hood cleaning is not optional — it is a fire safety requirement."] },
        { h2: "Inspection and insurance consequences", paragraphs: ["Fire marshals, health inspectors, and insurance companies all ask for hood cleaning records. Missing documentation can mean fines, policy issues, or forced closure until the system is cleaned.", "Professional cleaning includes dated reports covering the hood, ducts, fan, and filters — exactly what inspectors expect."] },
        { h2: "How often you need service", paragraphs: ["Most restaurants need hood cleaning every 1–3 months. High-volume kitchens and those using solid fuels may need monthly service.", "Grease Guard Pros provides NFPA 96-compliant hood cleaning across Canada. We schedule around your hours and document every visit."] },
      ],
    },
    "grease-trap-installation-vs-repair": {
      intro: "When a grease trap starts failing, the question is not just how to fix it — it is whether fixing it makes financial sense. A corroded, undersized, or cracked trap will keep costing you money until you address the root problem. Here is how to decide between repair and replacement.",
      sections: [
        { h2: "When repair makes sense", paragraphs: ["Minor plumbing issues around a sound trap body — a stuck valve, a clogged inlet, a worn gasket — are worth repairing. If the trap itself is structurally sound and properly sized, fix the peripheral problem and move on."] },
        { h2: "When replacement is the better call", paragraphs: ["Replace the trap if the body is cracked, corroded, or undersized for your current kitchen volume. If repair costs exceed half the replacement cost, replacement is the smarter long-term investment.", "An undersized trap will overflow no matter how often you pump it. Sizing it correctly during replacement prevents years of recurring problems."] },
        { h2: "Planning an installation", paragraphs: ["Trap sizing depends on fixture count, kitchen volume, and local code. Permits may be required depending on your municipality.", "Grease Guard Pros handles commercial grease trap installation across Canada. Call us for a site assessment and clear quote before you commit."] },
      ],
    },
    "preparing-commercial-kitchen-for-service": {
      intro: "A smooth service visit saves time and money — for you and for the crew. Whether you are scheduling hood cleaning, grease trap pumping, or hydro jetting, a little preparation goes a long way. Here is what to do before the technicians arrive.",
      sections: [
        { h2: "Clear access paths", paragraphs: ["Make sure technicians can reach the hood, roof exhaust fan, grease trap, and any exterior access points without moving heavy equipment. Locked roof hatches and blocked trap lids are the most common delays.", "If your trap is outdoors, clear snow, debris, and parked vehicles from the access area."] },
        { h2: "Protect food prep areas", paragraphs: ["Cover nearby food prep surfaces and move open food away from the work zone. Hood cleaning in particular can dislodge grease particles — keeping prep areas covered protects your product.", "Turn off cooking equipment before the crew arrives. Hot surfaces and active cooking create safety hazards during exhaust work."] },
        { h2: "Share useful information", paragraphs: ["Tell the technician your hood type, last cleaning date, trap size, and any recent problems — odours, slow drains, reduced airflow. This helps them prepare the right equipment and work efficiently.", "Grease Guard Pros crews arrive prepared, but the more you share upfront, the faster the job gets done."] },
      ],
    },
  };

  return bodies[slug] ?? {
    intro: `This guide covers ${post.primaryKeyword} — practical information for restaurant owners and property managers who need to make informed maintenance decisions.`,
    sections: [
      { h2: "What you need to know", paragraphs: [`Understanding ${post.primaryKeyword} helps you avoid costly emergencies and keep your kitchen or property running smoothly.`, "Call Grease Guard Pros if you need professional help — we serve commercial properties across Canada."] },
    ],
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.pageSlug.replace(/^\/+/, "").replace(/^blog\//, "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Page Not Found" };

  const desc = `Learn about ${post.primaryKeyword} — practical tips for restaurant owners and property managers. Call Grease Guard Pros for professional service.`;

  return {
    title: `${post.pageTitle} | Grease Guard Pros`,
    description: desc.slice(0, 160),
    alternates: { canonical: absoluteUrl(`/blog/${slug}`) },
    openGraph: {
      title: `${post.pageTitle} | ${SITE_NAME}`,
      description: desc.slice(0, 160),
      url: absoluteUrl(`/blog/${slug}`),
      type: "article",
      siteName: SITE_NAME,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const body = buildArticleBody(slug, post);
  const faqs = BLOG_FAQS[slug] ?? [];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/blog" },
    { name: post.pageTitle, path: `/blog/${slug}` },
  ];

  const schemas = [breadcrumbSchema(crumbs), ...(faqs.length > 0 ? [faqSchema(faqs)] : [])];

  return (
    <main className="pulse-main pulse-section">
      <JsonLd data={schemas} />
      <article className="pulse-wrap">
        <Breadcrumbs items={crumbs} />

        <p className="pulse-kicker">Guide</p>
        <h1>{post.pageTitle}</h1>
        <p className="pulse-lead">{body.intro}</p>

        {body.sections.map((section) => (
          <section className="pulse-detail" key={section.h2}>
            <h2>{section.h2}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </section>
        ))}

        {faqs.length > 0 && <FaqSection faqs={faqs} />}

        <section className="pulse-actions" style={{ marginTop: "2rem" }}>
          <a className="pulse-call" href={`tel:${PHONE_E164}`}>
            Call {PHONE_DISPLAY}
          </a>
          <Link className="pulse-btn" href="/blog">
            Back to Guides
          </Link>
        </section>
      </article>
      <CtaBanner />
    </main>
  );
}
