type ServiceFamily =
  | "hood"
  | "grease-trap"
  | "catch-basin"
  | "hydro-jetting"
  | "lift-station"
  | "commercial-kitchen"
  | "kitchen-exhaust";

/**
 * Verified Unsplash photo IDs (HTTP 200 as of 2026-07).
 * Format: timestamp-uuid without the "photo-" prefix.
 */
const PHOTOS = {
  hero: "1556911220-e15b29be8c8f",
  hood: "1642979430180-e676c2235ce2",
  kitchenExhaust: "1517248135467-4c7edcad34c4",
  commercialKitchen: "1414235077428-338989a2e8c0",
  greaseTrap: "1560179707-f14e90ef3623",
  catchBasin: "1560518883-ce09059eeffa",
  hydroJetting: "1504307651254-35680f356dfd",
  liftStation: "1558618666-fcd25c85cd64",
  cleaning: "1581578731548-c64695cc6952",
  restaurant: "1556910103-1c02745aae4d",
  team: "1621905252507-b35492cc74b4",
} as const;

export function unsplashUrl(photoId: string, width = 800) {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(width),
    q: "80",
    ixlib: "rb-4.0.3",
  });
  return `https://images.unsplash.com/photo-${photoId}?${params.toString()}`;
}

export const SITE_IMAGES = {
  hero: {
    src: unsplashUrl(PHOTOS.hero, 1200),
    alt: "Professional commercial kitchen with stainless steel exhaust hood",
  },
  trust: {
    src: unsplashUrl(PHOTOS.team, 600),
    alt: "Commercial cleaning technician at work",
  },
} as const;

export const SERVICE_PHOTOS: Record<ServiceFamily, { src: string; alt: string }> = {
  hood: {
    src: unsplashUrl(PHOTOS.hood, 800),
    alt: "Commercial kitchen exhaust hood mounted above a stove",
  },
  "grease-trap": {
    src: unsplashUrl(PHOTOS.greaseTrap, 800),
    alt: "Plumber servicing commercial kitchen plumbing and grease lines",
  },
  "catch-basin": {
    src: unsplashUrl(PHOTOS.catchBasin, 800),
    alt: "Commercial property parking lot and storm drainage area",
  },
  "hydro-jetting": {
    src: unsplashUrl(PHOTOS.hydroJetting, 800),
    alt: "Industrial high-pressure water jetting equipment on site",
  },
  "lift-station": {
    src: unsplashUrl(PHOTOS.liftStation, 800),
    alt: "Commercial wastewater pipes and lift station maintenance",
  },
  "commercial-kitchen": {
    src: unsplashUrl(PHOTOS.commercialKitchen, 800),
    alt: "Clean commercial restaurant kitchen after deep cleaning",
  },
  "kitchen-exhaust": {
    src: unsplashUrl(PHOTOS.kitchenExhaust, 800),
    alt: "Restaurant kitchen with commercial exhaust ventilation system",
  },
};

export function getServicePhoto(family: string) {
  return SERVICE_PHOTOS[family as ServiceFamily] ?? SERVICE_PHOTOS["grease-trap"];
}

/** All image URLs used on the site — useful for validation scripts. */
export function allImageUrls() {
  return [
    SITE_IMAGES.hero.src,
    SITE_IMAGES.trust.src,
    ...Object.values(SERVICE_PHOTOS).map((p) => p.src),
  ];
}
