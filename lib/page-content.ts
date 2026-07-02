import type { SeoPage } from "./site-data";
import { SEO_PAGES, cityFromTargetArea } from "./site-data";
import { getLocationFacts } from "./city-facts";
import { SERVICE_PHOTOS } from "./images";

export type ServiceFamily =
  | "hood"
  | "grease-trap"
  | "catch-basin"
  | "hydro-jetting"
  | "lift-station"
  | "commercial-kitchen"
  | "kitchen-exhaust";

export type FaqItem = { question: string; answer: string };

export type PageContent = {
  h1: string;
  intro: string;
  benefits: { title: string; description: string }[];
  processSteps: { title: string; description: string }[];
  faqs: FaqItem[];
  metaTitle: string;
  metaDescription: string;
  serviceImage: string;
  serviceImageAlt: string;
};

const PILLAR_SLUGS: Record<ServiceFamily, string> = {
  hood: "/hood-cleaning-services",
  "grease-trap": "/grease-trap-cleaning",
  "catch-basin": "/catch-basin-cleaning",
  "hydro-jetting": "/hydro-jetting-services",
  "lift-station": "/lift-station-sump-pit-cleaning",
  "commercial-kitchen": "/commercial-kitchen-cleaning",
  "kitchen-exhaust": "/kitchen-exhaust-cleaning",
};

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], slug: string, offset = 0): T {
  return arr[(hashSlug(slug) + offset) % arr.length];
}

export function detectServiceFamily(page: SeoPage): ServiceFamily {
  const slug = page.pageSlug.toLowerCase();
  const kw = page.primaryKeyword.toLowerCase();

  if (slug.includes("hood-fan") || kw.includes("hood fan") || kw.includes("exhaust fan")) return "hood";
  if (slug.includes("kitchen-exhaust") || kw.includes("kitchen exhaust")) return "kitchen-exhaust";
  if (slug.includes("commercial-kitchen") || kw.includes("commercial kitchen cleaning")) return "commercial-kitchen";
  if (slug.includes("grease-trap-install") || kw.includes("grease trap install")) return "grease-trap";
  if (slug.includes("grease-trap") || kw.includes("grease trap")) return "grease-trap";
  if (slug.includes("catch-basin") || kw.includes("catch basin")) return "catch-basin";
  if (slug.includes("hydro-jetting") || kw.includes("hydro jetting")) return "hydro-jetting";
  if (slug.includes("lift-station") || slug.includes("sump-pit") || kw.includes("lift station")) return "lift-station";
  if (slug.includes("hood") || kw.includes("hood cleaning")) return "hood";

  return "grease-trap";
}

export function getPillarSlug(page: SeoPage): string {
  return PILLAR_SLUGS[detectServiceFamily(page)];
}

export function getPillarPage(page: SeoPage): SeoPage | null {
  const slug = getPillarSlug(page);
  return SEO_PAGES.find((p) => p.pageSlug === slug) ?? null;
}

export function getCityPagesForPillar(pillar: SeoPage, limit = 12): SeoPage[] {
  const family = detectServiceFamily(pillar);
  return SEO_PAGES.filter((p) => p.pageType === "City Service Page" && detectServiceFamily(p) === family).slice(0, limit);
}

export function getCrossLinksInCity(page: SeoPage, limit = 4): SeoPage[] {
  const city = cityFromTargetArea(page.targetArea);
  return SEO_PAGES.filter(
    (p) => p.pageType === "City Service Page" && cityFromTargetArea(p.targetArea) === city && p.pageSlug !== page.pageSlug,
  ).slice(0, limit);
}

export function getEmergencyLinks(page: SeoPage, limit = 5): SeoPage[] {
  const family = detectServiceFamily(page);
  const cities = SEO_PAGES.filter((p) => p.pageType === "City Service Page" && detectServiceFamily(p) === family).slice(0, limit);
  return cities;
}

export function getServiceLabel(family: ServiceFamily): string {
  const labels: Record<ServiceFamily, string> = {
    hood: "Hood cleaning",
    "grease-trap": "Grease trap service",
    "catch-basin": "Catch basin service",
    "hydro-jetting": "Hydro jetting",
    "lift-station": "Lift station service",
    "commercial-kitchen": "Kitchen deep cleaning",
    "kitchen-exhaust": "Kitchen exhaust service",
  };
  return labels[family];
}

/** City name only — for same-service location links on pillar pages. */
export function getCityLinkLabel(page: SeoPage): string {
  return cityFromTargetArea(page.targetArea);
}

/** Service type without city — for cross-service links when the city is already on the page. */
export function getCrossLinkLabel(page: SeoPage): string {
  return getServiceLabel(detectServiceFamily(page));
}

function buildH1(page: SeoPage): string {
  const city = cityFromTargetArea(page.targetArea);
  const family = detectServiceFamily(page);

  if (page.pageType === "City Service Page") {
    const labels: Record<ServiceFamily, string> = {
      hood: `Professional Hood Cleaning in ${city}`,
      "grease-trap": `Grease Trap Cleaning in ${city}`,
      "catch-basin": `Catch Basin Cleaning in ${city}`,
      "hydro-jetting": `Hydro Jetting Services in ${city}`,
      "lift-station": `Lift Station Cleaning in ${city}`,
      "commercial-kitchen": `Commercial Kitchen Cleaning in ${city}`,
      "kitchen-exhaust": `Kitchen Exhaust Cleaning in ${city}`,
    };
    return labels[family];
  }

  if (page.pageType === "Near Me Page") {
    const labels: Record<ServiceFamily, string> = {
      hood: "Same-Day Hood Cleaning Near You",
      "grease-trap": "Grease Trap Cleaning Near You — Fast Response",
      "catch-basin": "Catch Basin Cleaning Near You",
      "hydro-jetting": "Hydro Jetting Near You — Same-Day Available",
      "lift-station": "Lift Station Cleaning Near You",
      "commercial-kitchen": "Commercial Kitchen Cleaning Near You",
      "kitchen-exhaust": "Kitchen Exhaust Cleaning Near You",
    };
    return labels[family];
  }

  if (page.pageType === "Cost Guide") {
    if (family === "hydro-jetting") return "How Much Does Hydro Jetting Cost in Canada?";
    if (family === "grease-trap") return "Grease Trap Installation Cost — What to Expect";
    return `What Does ${page.primaryKeyword} Cost?`;
  }

  return page.pageTitle.replace(/\s*\|.*/, "");
}

function buildIntro(page: SeoPage): string {
  const city = cityFromTargetArea(page.targetArea);
  const family = detectServiceFamily(page);
  const slug = page.pageSlug;

  if (page.pageType === "City Service Page") {
    const locationFacts = getLocationFacts(city);
    const intros = [
      `Running a restaurant or managing a commercial property in ${city} means grease buildup and drainage problems are never far away. ${locationFacts[0]} When your maintenance schedule falls behind, you risk health inspections, fire hazards, and costly emergency callouts. Grease Guard Pros sends certified crews who know ${city}'s commercial kitchens and property layouts — so you get thorough cleaning without shutting down operations longer than necessary. We handle access coordination, post-service documentation, and scheduling that works around your busiest hours. Whether you operate near ${locationFacts[1] ? "local landmarks" : "downtown"} or in suburban plazas, one call gets a qualified team on the way.`,
      `If you manage a commercial kitchen or facility in ${city}, you already know that regular professional service is not optional — it is a compliance and safety requirement. ${locationFacts[0]} Grease Guard Pros has been helping ${city} restaurants, plazas, and property teams keep their systems clean and inspection-ready. Our technicians arrive with the right equipment for your setup, explain what they find, and leave you with a clear record of what was done. No jargon, no upselling — just honest work from a team that understands the pressure you are under to keep the kitchen running.`,
      `${city} property managers and restaurant owners trust Grease Guard Pros when problems cannot wait. ${locationFacts[1]} We understand that a backed-up grease trap or clogged drain line does not just smell bad — it shuts down service, angers tenants, and creates liability. Our ${city} crews respond quickly, work safely around your staff and customers, and restore your systems so you can get back to business. From single-location restaurants to multi-unit plazas, we scale our approach to match your property.`,
    ];
    return pick(intros, slug);
  }

  if (page.pageType === "Near Me Page") {
    const intros = [
      `When grease traps overflow, hoods get caked with buildup, or drains stop moving, you need help now — not next week. Grease Guard Pros connects you with certified commercial cleaning crews across Canada who can respond the same day in most markets. Tell us what is happening, where you are, and what type of property you manage. We route your call to the nearest available team with the right truck and equipment for the job. No hold music, no runaround — just a straight answer on timing and what to expect when the crew arrives.`,
      `Urgent kitchen or drainage problems usually mean something is already wrong. Maybe the kitchen smells off, water is pooling in the parking lot, or your last cleaning was longer ago than you want to admit. Grease Guard Pros makes it simple: call us, describe the situation, and we dispatch a commercial cleaning crew to your location. Our teams carry pumping equipment, jetting rigs, and hood cleaning tools — so whether it is an emergency or a long-overdue scheduled visit, we show up prepared.`,
      `You should not have to dig through directories or wait days for a callback when your commercial kitchen or property has a grease or drainage problem. Grease Guard Pros specializes in fast dispatch across Canada. We work with restaurants, food courts, hotels, plazas, and facility managers who need reliable same-day or next-day service. One phone call is all it takes to get a qualified crew heading your way.`,
    ];
    return pick(intros, slug);
  }

  if (page.pageType === "Cost Guide") {
    if (family === "hydro-jetting") {
      return `Hydro jetting is one of the most effective ways to clear stubborn grease, scale, and debris from commercial drain lines — but the price varies more than most property managers expect. Line length, access difficulty, blockage severity, and whether the work is scheduled or emergency all affect your final bill. This guide breaks down what hydro jetting actually costs across Canada, what is included in a typical service call, and how to avoid paying for work you do not need. Whether you are budgeting for preventive maintenance or dealing with a backup right now, understanding the pricing factors helps you make a confident decision.`;
    }
    return `Planning a grease trap installation or replacement is a significant investment for any commercial kitchen. The cost depends on trap size, plumbing complexity, local code requirements, and whether you need a full replacement or a new install in a renovated space. This guide walks you through the main pricing factors across Canada, what a fair quote looks like, and when repair makes more sense than replacement. Use it to budget accurately and ask the right questions before you commit.`;
  }

  const pillarIntros: Record<ServiceFamily, string[]> = {
    hood: [
      `Grease buildup inside your kitchen exhaust hood is one of the leading causes of restaurant fires in Canada. Regular hood cleaning is not just a box to check for your fire marshal inspection — it protects your staff, your customers, and your business. Grease Guard Pros provides NFPA 96-compliant hood and exhaust cleaning for restaurants, hotels, food courts, and commercial kitchens nationwide. Our certified technicians clean hoods, ducts, fans, and filters to the standard your insurer and local authority expect. We work around your service hours, document every visit, and help you stay ahead of compliance deadlines.`,
      `Your kitchen hood works harder than almost any piece of equipment in your restaurant — and it collects grease with every service period. Without professional hood cleaning, that buildup becomes a fire hazard and an air quality problem. Grease Guard Pros delivers thorough commercial hood cleaning that covers the hood canopy, ductwork, exhaust fan, and grease filters. We serve single-location restaurants, chains, hotels, and institutional kitchens across Canada with scheduling that fits your operations.`,
    ],
    "grease-trap": [
      `A neglected grease trap does not just smell bad — it backs up into your kitchen, triggers health violations, and can shut you down during peak hours. Grease Guard Pros provides professional grease trap cleaning and pumping for commercial kitchens across Canada. Our crews remove accumulated fats, oils, and grease (FOG) before they clog your lines or overflow into your workspace. We handle traps of all sizes, from under-sink interceptors to large in-ground units, and we document every service for your compliance records.`,
      `Every commercial kitchen in Canada needs a grease trap that actually works — and that means regular professional cleaning, not just hoping for the best. Grease Guard Pros pumps, cleans, and inspects grease traps and interceptors for restaurants, food courts, hotels, and institutional kitchens. We help you stay compliant with local wastewater regulations, avoid costly emergency backups, and keep your kitchen running smoothly through your busiest seasons.`,
    ],
    "catch-basin": [
      `Parking lot catch basins and storm drains are easy to forget until water starts pooling after the first heavy rain — or worse, sewage backs up into your property. Grease Guard Pros cleans commercial catch basins, storm drains, and sump pits for plazas, restaurants, warehouses, and multi-tenant properties across Canada. Our crews remove sediment, debris, and grease buildup that restrict flow and cause flooding. Regular catch basin maintenance protects your pavement, prevents liability from standing water, and keeps your property drainage system working year-round.`,
      `When catch basins clog, your parking lot floods, your tenants complain, and your liability exposure goes up. Grease Guard Pros provides professional catch basin cleaning for commercial properties nationwide — from single-restaurant lots to large retail plazas. We vacuum out sediment and debris, inspect grates and inlet structures, and restore proper drainage before the next storm hits.`,
    ],
    "hydro-jetting": [
      `Snaking a drain line clears a path — hydro jetting clears the line. High-pressure water jetting scours grease, scale, roots, and debris from commercial drain and sewer pipes, restoring full flow without chemicals or pipe damage. Grease Guard Pros provides professional hydro jetting for restaurants, plazas, warehouses, and facilities across Canada. Whether you are dealing with a slow drain, a recurring backup, or planning preventive maintenance, our jetting crews have the equipment and experience to get your lines moving again.`,
      `Commercial drain lines take abuse — grease, food waste, soap, and sediment build up over months until flow slows to a trickle. Hydro jetting is the most thorough way to restore those lines without excavation. Grease Guard Pros uses high-pressure jetting equipment sized for commercial applications, from kitchen drain lines to main sewer laterals. We serve restaurants, property managers, and facility teams who need reliable drain cleaning that actually lasts.`,
    ],
    "lift-station": [
      `Lift stations and sump pits are out of sight until they fail — and when they do, the backup is immediate and expensive. Grease Guard Pros provides lift station cleaning, sump pit pumping, and wet well maintenance for commercial properties, plazas, and facilities across Canada. Our crews remove sludge, grease, and debris that reduce pump efficiency and cause premature equipment failure. Regular maintenance extends pump life, prevents emergency overflows, and keeps your property's wastewater system reliable.`,
    ],
    "commercial-kitchen": [
      `A clean commercial kitchen is not just about appearances — it is about food safety, fire prevention, and passing inspections without stress. Grease Guard Pros provides deep cleaning for commercial kitchens, covering hood systems, floors, walls, equipment surrounds, and hard-to-reach areas that daily cleaning misses. We work with restaurants, hotels, food courts, and institutional kitchens across Canada, scheduling around your service hours so the work gets done without disrupting your operations.`,
    ],
    "kitchen-exhaust": [
      `Your kitchen exhaust system moves heat, smoke, and grease vapour out of your workspace every day — and over time, that grease coats every surface inside the ductwork. Grease Guard Pros provides complete kitchen exhaust cleaning, including hoods, ducts, fans, and filters, to NFPA 96 standards. We help restaurants, hotels, and commercial kitchens across Canada stay fire-safe and inspection-ready with documented, thorough cleaning on a schedule that works for you.`,
    ],
  };

  return pick(pillarIntros[family] ?? pillarIntros["grease-trap"], slug);
}

function buildBenefits(page: SeoPage): { title: string; description: string }[] {
  const family = detectServiceFamily(page);
  const city = cityFromTargetArea(page.targetArea);

  const allBenefits: Record<ServiceFamily, { title: string; description: string }[]> = {
    hood: [
      { title: "Fire code compliance", description: "NFPA 96-compliant cleaning that satisfies fire marshals and insurance requirements." },
      { title: "Works around your hours", description: "We schedule before open or after close so your kitchen keeps serving." },
      { title: "Full system coverage", description: "Hood, ducts, fan, and filters — not just the visible surfaces." },
      { title: "Documented service records", description: "Every visit logged with dates and scope for your compliance files." },
    ],
    "grease-trap": [
      { title: "Prevents kitchen backups", description: "Regular pumping stops grease overflow before it reaches your floor drains." },
      { title: "Compliance documentation", description: "Service records that satisfy health inspectors and wastewater authorities." },
      { title: "All trap sizes", description: "From under-sink interceptors to large in-ground commercial units." },
      { title: "Emergency response", description: "Same-day pumping available when a trap is full and your kitchen cannot wait." },
    ],
    "catch-basin": [
      { title: "Stops parking lot flooding", description: "Clear basins move stormwater away from your pavement and building." },
      { title: "Reduces liability", description: "Standing water creates slip hazards and property damage — we prevent both." },
      { title: "Pre-storm readiness", description: "Seasonal cleaning before heavy rain keeps drainage systems flowing." },
      { title: "Multi-unit properties", description: "We handle plazas and commercial lots with multiple catch basins." },
    ],
    "hydro-jetting": [
      { title: "Clears what snaking cannot", description: "High-pressure water scours grease and scale from pipe walls completely." },
      { title: "No harsh chemicals", description: "Water pressure does the work — safe for your pipes and the environment." },
      { title: "Longer-lasting results", description: "Full pipe cleaning means fewer repeat callouts than mechanical snaking." },
      { title: "Commercial-grade equipment", description: "Jetting rigs sized for restaurant and facility drain lines." },
    ],
    "lift-station": [
      { title: "Extends pump life", description: "Removing sludge and grease reduces wear on pumps and floats." },
      { title: "Prevents emergency overflows", description: "Scheduled cleaning catches problems before they become backups." },
      { title: "Wet well expertise", description: "Our crews are trained for confined-space sump and lift station work." },
      { title: "Property-wide coverage", description: "We maintain lift stations for plazas, warehouses, and multi-tenant sites." },
    ],
    "commercial-kitchen": [
      { title: "Beyond daily cleaning", description: "We reach grease buildup in ducts, behind equipment, and on surfaces daily staff cannot access." },
      { title: "Inspection-ready results", description: "Deep cleaning that helps you pass health and fire inspections confidently." },
      { title: "Flexible scheduling", description: "Before service, after close, or during slow periods — your call." },
      { title: "Food-safe methods", description: "Cleaning products and procedures appropriate for active food prep areas." },
    ],
    "kitchen-exhaust": [
      { title: "Complete duct cleaning", description: "We clean the full exhaust path from hood to rooftop fan." },
      { title: "Fire safety focused", description: "Grease removal that directly reduces kitchen fire risk." },
      { title: "Certified technicians", description: "Trained to NFPA 96 standards with proper access and safety equipment." },
      { title: "Filter service included", description: "Grease filters cleaned or replaced as part of every visit." },
    ],
  };

  const benefits = allBenefits[family];
  const offset = hashSlug(page.pageSlug) % 2;
  const selected = [...benefits.slice(offset), ...benefits.slice(0, offset)].slice(0, 4);

  if (page.pageType === "City Service Page") {
    selected[0] = {
      title: `Local ${city} crews`,
      description: `Technicians who know ${city} commercial properties and can navigate access quickly.`,
    };
  }

  return selected;
}

function buildProcess(page: SeoPage): { title: string; description: string }[] {
  return [
    { title: "Tell us what is happening", description: "Call us with your property type, symptoms, and location. We match you with the right crew and equipment." },
    { title: "We confirm timing and access", description: "Before we arrive, we confirm your schedule, access points, and any special requirements for your property." },
    { title: "On-site service", description: "Our certified technicians complete the cleaning, pumping, or jetting work safely and thoroughly." },
    { title: "You get a clear record", description: "We document what was done, flag anything that needs follow-up, and help you plan the next service date." },
  ];
}

function buildFaqs(page: SeoPage): FaqItem[] {
  const city = cityFromTargetArea(page.targetArea);
  const family = detectServiceFamily(page);
  const slug = page.pageSlug;

  const baseFaqs: Record<ServiceFamily, FaqItem[]> = {
    hood: [
      { question: "How often should a commercial hood be cleaned?", answer: "Most restaurants need hood cleaning every 1–3 months depending on cooking volume and menu type. High-volume kitchens and those using solid fuels may need monthly service. We help you set a schedule based on your actual usage." },
      { question: "Will hood cleaning shut down my kitchen?", answer: "We schedule around your service hours — typically before you open or after you close. Most hood cleanings take 2–4 hours and your kitchen can reopen the same day." },
      { question: "Do you provide documentation for fire inspections?", answer: "Yes. Every service includes a dated report covering hood, duct, fan, and filter cleaning. This satisfies NFPA 96 requirements and most local fire marshal inspections." },
      { question: "What is included in a hood cleaning service?", answer: "We clean the hood canopy, interior ductwork, exhaust fan, and grease filters. We also inspect access panels and flag any damage or code issues we find." },
    ],
    "grease-trap": [
      { question: "How often should a grease trap be cleaned?", answer: "Most commercial kitchens need grease trap pumping every 1–3 months. High-volume restaurants may need monthly service. We recommend setting a schedule before problems start, not after a backup." },
      { question: "What happens if my grease trap overflows?", answer: "Overflow means FOG is bypassing the trap into your drain lines and possibly the municipal sewer. Stop using kitchen drains, call us immediately, and we will pump the trap and assess the lines." },
      { question: "Do you handle both indoor and outdoor grease traps?", answer: "Yes. We pump and clean under-sink interceptors, in-ground grease traps, and large outdoor interceptors for commercial kitchens and food processing facilities." },
      { question: "Is grease trap cleaning required by law?", answer: "Yes. Municipal wastewater bylaws across Canada require commercial kitchens to maintain grease traps and keep service records. Neglect can result in fines and forced closure." },
    ],
    "catch-basin": [
      { question: "How often should catch basins be cleaned?", answer: "Commercial properties should clean catch basins at least twice a year — before spring runoff and before winter freeze. High-traffic lots or properties with heavy tree cover may need quarterly service." },
      { question: "What causes catch basins to clog?", answer: "Sediment, leaves, trash, and grease from parking lots accumulate in catch basins over time. Without regular cleaning, flow restricts and water pools during storms." },
      { question: "Can you clean catch basins without closing the parking lot?", answer: "In most cases, yes. We work around traffic flow and can section off individual basins while keeping the lot partially open." },
      { question: "Do you service storm drains connected to catch basins?", answer: "Yes. We clean the full drainage path from grate to outlet, including connected storm drain lines where accessible." },
    ],
    "hydro-jetting": [
      { question: "What is the difference between hydro jetting and snaking?", answer: "Snaking punches a hole through a blockage. Hydro jetting scours the entire pipe wall with high-pressure water, removing grease, scale, and debris for a longer-lasting clear." },
      { question: "Is hydro jetting safe for old pipes?", answer: "Our technicians assess pipe condition before jetting and adjust pressure accordingly. For most commercial drain lines, jetting is safe and more effective than mechanical methods." },
      { question: "How long does hydro jetting take?", answer: "Most commercial jetting jobs take 1–3 hours depending on line length and blockage severity. We give you a time estimate before starting." },
      { question: "How often should drain lines be jetted?", answer: "Restaurants and food service properties benefit from annual preventive jetting. Properties with recurring slow drains should jet every 6–12 months." },
    ],
    "lift-station": [
      { question: "How often should a lift station be cleaned?", answer: "Most commercial lift stations need cleaning every 6–12 months. Properties with heavy grease loading may need quarterly service." },
      { question: "What happens if a lift station fails?", answer: "Pump failure or float malfunction causes immediate backup. Regular cleaning prevents sludge buildup that strains pumps and causes premature failure." },
      { question: "Do you pump and clean wet wells?", answer: "Yes. We vacuum sludge and debris from wet wells, inspect floats and pumps, and restore proper operation." },
    ],
    "commercial-kitchen": [
      { question: "How is deep cleaning different from daily kitchen cleaning?", answer: "Daily cleaning handles surfaces and floors. Deep cleaning reaches hood ducts, behind equipment, grease buildup on walls, and areas that accumulate contamination over months." },
      { question: "How often should a commercial kitchen be deep cleaned?", answer: "Most kitchens benefit from quarterly deep cleaning. High-volume operations may need monthly service in addition to regular hood and trap maintenance." },
      { question: "Do you work while the kitchen is closed?", answer: "Yes. We schedule during closed hours or slow periods to avoid disrupting food preparation and service." },
    ],
    "kitchen-exhaust": [
      { question: "Is kitchen exhaust cleaning the same as hood cleaning?", answer: "Hood cleaning covers the hood and connected ductwork. Full exhaust cleaning includes the entire path from hood to rooftop fan, which is required for NFPA 96 compliance." },
      { question: "How do I know if my exhaust system needs cleaning?", answer: "Visible grease on hood surfaces, reduced airflow, unusual odours, or exceeding your scheduled cleaning interval all signal it is time for service." },
      { question: "Can dirty exhaust ducts cause a fire?", answer: "Yes. Grease-laden ductwork is a leading cause of commercial kitchen fires. Regular exhaust cleaning is the most effective prevention." },
    ],
  };

  let faqs = [...(baseFaqs[family] ?? baseFaqs["grease-trap"])];

  if (page.pageType === "City Service Page") {
    faqs = [
      {
        question: `Do you offer same-day service in ${city}?`,
        answer: `Yes. We prioritize emergency and same-day requests in ${city}. Call us with your address and situation, and we will confirm the earliest available crew.`,
      },
      ...faqs,
    ];
  }

  if (page.pageType === "Near Me Page") {
    faqs = [
      {
        question: "How quickly can you get a crew to my location?",
        answer: "In most Canadian markets, we can dispatch a crew the same day for urgent grease trap, hood, or drain issues. Call us and we will confirm availability for your area.",
      },
      ...faqs,
    ];
  }

  if (page.pageType === "Cost Guide") {
    faqs = [
      { question: "What is the average cost of hydro jetting in Canada?", answer: "Commercial hydro jetting typically ranges from $300–$800 per service call depending on line length, access, and blockage severity. Emergency and after-hours calls cost more." },
      { question: "What factors affect hydro jetting price?", answer: "Line length, pipe diameter, blockage type, access difficulty, and whether the work is scheduled or emergency all affect pricing. We provide a clear quote before starting." },
      { question: "Is preventive jetting cheaper than emergency service?", answer: "Yes. Scheduled preventive jetting avoids emergency rates and prevents the property damage that backups cause." },
      { question: "Do you charge for estimates?", answer: "We provide pricing over the phone for most standard jobs. On-site assessments for complex situations may include a service call fee that is applied to the work if you proceed." },
    ];
    if (family === "grease-trap") {
      faqs = [
        { question: "How much does grease trap installation cost in Canada?", answer: "Commercial grease trap installation typically ranges from $1,500–$5,000+ depending on trap size, plumbing complexity, and local code requirements." },
        { question: "Is it cheaper to repair or replace a grease trap?", answer: "If the trap body is cracked, corroded, or undersized for your kitchen volume, replacement is more cost-effective long-term. Minor plumbing repairs around a sound trap are worth fixing." },
        { question: "What size grease trap does my kitchen need?", answer: "Trap sizing depends on fixture count, kitchen volume, and local code. We assess your setup and recommend the right size before quoting installation." },
        { question: "Does installation price include permits?", answer: "Permit requirements vary by municipality. We handle permitting where required and include those costs in your quote upfront." },
      ];
    }
  }

  const offset = hashSlug(slug) % 2;
  return [...faqs.slice(offset), ...faqs.slice(0, offset)].slice(0, 4);
}

function buildMetaTitle(page: SeoPage): string {
  const city = cityFromTargetArea(page.targetArea);
  const brand = "Grease Guard Pros";

  if (page.pageType === "City Service Page") {
    const titles: Record<ServiceFamily, string> = {
      hood: `Hood Cleaning ${city} | ${brand}`,
      "grease-trap": `Grease Trap Cleaning ${city} | ${brand}`,
      "catch-basin": `Catch Basin Cleaning ${city} | ${brand}`,
      "hydro-jetting": `Hydro Jetting ${city} | ${brand}`,
      "lift-station": `Lift Station Cleaning ${city} | ${brand}`,
      "commercial-kitchen": `Kitchen Cleaning ${city} | ${brand}`,
      "kitchen-exhaust": `Exhaust Cleaning ${city} | ${brand}`,
    };
    return titles[detectServiceFamily(page)];
  }

  if (page.pageType === "Near Me Page") {
    return `${page.pageTitle.replace(/\s*\|.*/, "")} | ${brand}`.slice(0, 60);
  }

  if (page.pageType === "Cost Guide") {
    return `${page.pageTitle.replace(/\s*\|.*/, "")} | ${brand}`.slice(0, 60);
  }

  return `${page.pageTitle.replace(/\s*\|.*/, "")} | ${brand}`.slice(0, 60);
}

function buildMetaDescription(page: SeoPage): string {
  const city = cityFromTargetArea(page.targetArea);
  const family = detectServiceFamily(page);

  if (page.pageType === "City Service Page") {
    const descs: Record<ServiceFamily, string> = {
      hood: `Professional hood cleaning in ${city}. NFPA 96 certified, same-day available. Call Grease Guard Pros for a free quote today.`,
      "grease-trap": `Grease trap cleaning and pumping in ${city}. Prevent backups and stay compliant. Call Grease Guard Pros — same-day service available.`,
      "catch-basin": `Catch basin cleaning in ${city} for parking lots and commercial properties. Prevent flooding — call Grease Guard Pros today.`,
      "hydro-jetting": `Hydro jetting services in ${city}. Clear stubborn drain blockages fast. Call Grease Guard Pros for same-day commercial jetting.`,
      "lift-station": `Lift station and sump pit cleaning in ${city}. Prevent pump failure and backups. Call Grease Guard Pros today.`,
      "commercial-kitchen": `Commercial kitchen deep cleaning in ${city}. Inspection-ready results. Call Grease Guard Pros to schedule service.`,
      "kitchen-exhaust": `Kitchen exhaust cleaning in ${city}. NFPA 96 compliant duct and hood service. Call Grease Guard Pros today.`,
    };
    return descs[family].slice(0, 160);
  }

  if (page.pageType === "Near Me Page") {
    return "Grease Guard Pros dispatches certified crews same-day across Canada. Call now for fast commercial cleaning service.".slice(0, 160);
  }

  if (page.pageType === "Cost Guide") {
    if (family === "hydro-jetting") {
      return "How much does hydro jetting cost in Canada? Pricing factors, typical ranges, and tips to avoid overpaying. Call Grease Guard Pros for a quote.";
    }
    return "Grease trap installation costs in Canada — sizing, pricing factors, and when to replace vs repair. Call Grease Guard Pros for a free estimate.";
  }

  const pillarDescs: Record<ServiceFamily, string> = {
    hood: "NFPA 96 certified commercial hood cleaning across Canada. Restaurants, hotels, and kitchens. Schedule service or call for same-day response.",
    "grease-trap": "Professional grease trap cleaning and pumping for commercial kitchens across Canada. Stay compliant and prevent backups. Call today.",
    "catch-basin": "Commercial catch basin and storm drain cleaning across Canada. Prevent parking lot flooding. Call Grease Guard Pros to schedule.",
    "hydro-jetting": "High-pressure hydro jetting for commercial drains and sewers across Canada. Clear stubborn blockages. Call for same-day service.",
    "lift-station": "Lift station and sump pit cleaning for commercial properties across Canada. Prevent pump failure. Call Grease Guard Pros today.",
    "commercial-kitchen": "Deep commercial kitchen cleaning across Canada. Hood, floors, equipment, and hard-to-reach areas. Call to schedule service.",
    "kitchen-exhaust": "Complete kitchen exhaust and duct cleaning across Canada. NFPA 96 compliant. Call Grease Guard Pros to book your service.",
  };

  return pillarDescs[family].slice(0, 160);
}

export function buildPageContent(page: SeoPage): PageContent {
  const family = detectServiceFamily(page);
  const image = SERVICE_PHOTOS[family];

  return {
    h1: buildH1(page),
    intro: buildIntro(page),
    benefits: buildBenefits(page),
    processSteps: buildProcess(page),
    faqs: buildFaqs(page),
    metaTitle: buildMetaTitle(page),
    metaDescription: buildMetaDescription(page),
    serviceImage: image.src,
    serviceImageAlt: image.alt,
  };
}

export const HOME_FAQS: FaqItem[] = [
  {
    question: "What services does Grease Guard Pros provide?",
    answer: "We provide commercial grease trap cleaning and pumping, hood and kitchen exhaust cleaning, catch basin and storm drain cleaning, hydro jetting, lift station maintenance, and grease trap installation across Canada.",
  },
  {
    question: "Do you offer same-day service?",
    answer: "Yes. For urgent grease trap backups, hood cleaning deadlines, and drain emergencies, we dispatch crews the same day in most Canadian markets. Call us and we will confirm availability for your area.",
  },
  {
    question: "What types of properties do you serve?",
    answer: "We serve restaurants, hotels, food courts, commercial plazas, warehouses, institutional kitchens, and multi-tenant properties. If it has a commercial kitchen or grease management system, we can help.",
  },
  {
    question: "How do I schedule service?",
    answer: "Call 1-888-328-8990 with your property type, location, and what you need. We confirm timing, access requirements, and pricing before the crew arrives.",
  },
];

export const SERVICES_FAQS: FaqItem[] = [
  {
    question: "Which service do I need for a slow kitchen drain?",
    answer: "Start with grease trap cleaning if it has been more than 3 months since your last pumping. If the trap is current but the line is still slow, hydro jetting is likely the right next step.",
  },
  {
    question: "How do I know if my hood needs cleaning?",
    answer: "Visible grease on the hood surface, reduced airflow, unusual odours, or approaching your scheduled interval all mean it is time. Most restaurants need hood cleaning every 1–3 months.",
  },
  {
    question: "Can I combine multiple services in one visit?",
    answer: "Yes. Many property managers schedule hood cleaning, grease trap pumping, and catch basin service together to minimize disruption and cost.",
  },
];
