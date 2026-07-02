export type CityFact = {
  population: string;
  climate: string;
  neighbourhoods: string[];
  landmarks: string[];
};

export const CITY_FACTS: Record<string, CityFact> = {
  Toronto: {
    population: "2.9 million",
    climate: "humid continental with cold winters and warm summers",
    neighbourhoods: ["Liberty Village", "Leslieville", "Scarborough Town Centre", "North York"],
    landmarks: ["CN Tower", "Distillery District", "St. Lawrence Market"],
  },
  Mississauga: {
    population: "720,000",
    climate: "lake-effect winters and hot, humid summers near Lake Ontario",
    neighbourhoods: ["Port Credit", "Streetsville", "Erin Mills", "Cooksville"],
    landmarks: ["Square One", "Port Credit harbour", "Mississauga Celebration Square"],
  },
  Scarborough: {
    population: "630,000",
    climate: "moderate winters with heavier snowfall than downtown Toronto",
    neighbourhoods: ["Agincourt", "Malvern", "Birch Cliff", "Rouge"],
    landmarks: ["Scarborough Bluffs", "Toronto Zoo", "Scarborough Town Centre"],
  },
  Markham: {
    population: "340,000",
    climate: "cold winters and warm summers typical of the GTA",
    neighbourhoods: ["Unionville", "Thornhill", "Milliken", "Cornell"],
    landmarks: ["Markham Main Street", "Pacific Mall", "Toogood Pond"],
  },
  Brampton: {
    population: "650,000",
    climate: "continental climate with significant winter freeze-thaw cycles",
    neighbourhoods: ["Bramalea", "Heart Lake", "Mount Pleasant", "Downtown Brampton"],
    landmarks: ["Gage Park", "Rose Theatre", "Brampton City Hall"],
  },
  Etobicoke: {
    population: "365,000",
    climate: "milder winters near Lake Ontario with lake-effect moisture",
    neighbourhoods: ["Islington", "The Kingsway", "Rexdale", "Long Branch"],
    landmarks: ["Humber Bay Park", "Sherway Gardens", "Old Mill"],
  },
  "North York": {
    population: "670,000",
    climate: "cold winters with urban heat-island effects in dense commercial zones",
    neighbourhoods: ["Yonge and Finch", "Don Mills", "Willowdale", "Downsview"],
    landmarks: ["Mel Lastman Square", "Fairview Mall", "Edwards Gardens"],
  },
  Vaughan: {
    population: "320,000",
    climate: "GTA continental climate with heavy spring runoff",
    neighbourhoods: ["Maple", "Woodbridge", "Kleinburg", "Concord"],
    landmarks: ["Canada's Wonderland", "Vaughan Mills", "Kortright Centre"],
  },
  Oakville: {
    population: "215,000",
    climate: "moderated by Lake Ontario with significant spring thaw drainage",
    neighbourhoods: ["Bronte", "Downtown Oakville", "Glen Abbey", "Kerr Village"],
    landmarks: ["Oakville Harbour", "Bronte Creek", "Oakville Place"],
  },
  Ottawa: {
    population: "1 million",
    climate: "cold winters with heavy snowmelt and spring flooding risk",
    neighbourhoods: ["ByWard Market", "Kanata", "Orleans", "Westboro"],
    landmarks: ["Parliament Hill", "Rideau Canal", "ByWard Market"],
  },
  Hamilton: {
    population: "580,000",
    climate: "humid near the escarpment with significant industrial runoff",
    neighbourhoods: ["Downtown Hamilton", "Ancaster", "Stoney Creek", "Dundas"],
    landmarks: ["Hamilton Harbour", "Dundas Peak", "African Lion Safari area"],
  },
  London: {
    population: "420,000",
    climate: "humid continental with spring flooding along the Thames River",
    neighbourhoods: ["Old East Village", "Byron", "Masonville", "Downtown London"],
    landmarks: ["Victoria Park", "Budweiser Gardens", "Thames Valley Parkway"],
  },
  Calgary: {
    population: "1.3 million",
    climate: "dry prairie climate with chinook winds and rapid temperature swings",
    neighbourhoods: ["Beltline", "Kensington", "Inglewood", "Mahogany"],
    landmarks: ["Calgary Tower", "Stephen Avenue", "Stampede Park"],
  },
  Edmonton: {
    population: "1 million",
    climate: "cold winters with deep frost and spring thaw drainage challenges",
    neighbourhoods: ["Old Strathcona", "Whyte Avenue", "West Edmonton", "Downtown"],
    landmarks: ["West Edmonton Mall", "River Valley", "Alberta Legislature"],
  },
  Vancouver: {
    population: "675,000",
    climate: "mild, wet winters and dry summers with heavy rainfall runoff",
    neighbourhoods: ["Gastown", "Kitsilano", "Commercial Drive", "Yaletown"],
    landmarks: ["Stanley Park", "Granville Island", "Canada Place"],
  },
  Winnipeg: {
    population: "750,000",
    climate: "extreme cold winters with deep frost and spring flooding",
    neighbourhoods: ["Exchange District", "St. Boniface", "Osborne Village", "The Forks"],
    landmarks: ["The Forks", "Assiniboine Park", "Canadian Museum for Human Rights"],
  },
  Montreal: {
    population: "1.8 million",
    climate: "cold winters with heavy snow and spring melt drainage demands",
    neighbourhoods: ["Old Montreal", "Plateau Mont-Royal", "Griffintown", "Verdun"],
    landmarks: ["Old Port", "Mount Royal", "Jean-Talon Market"],
  },
  Saskatoon: {
    population: "280,000",
    climate: "prairie continental with cold winters and dry summers",
    neighbourhoods: ["Riversdale", "Nutana", "Stonebridge", "Downtown"],
    landmarks: ["South Saskatchewan River", "Wanuskewin", "Broadway Avenue"],
  },
  Kingston: {
    population: "135,000",
    climate: "moderated by Lake Ontario and the St. Lawrence with spring runoff",
    neighbourhoods: ["Downtown Kingston", "Kingston East", "West End", "Portsmouth"],
    landmarks: ["Kingston Penitentiary area", "Market Square", "Fort Henry"],
  },
  Burlington: {
    population: "190,000",
    climate: "lake-moderated with significant spring thaw along the waterfront",
    neighbourhoods: ["Aldershot", "Brant Hills", "Downtown Burlington", "Appleby"],
    landmarks: ["Spencer Smith Park", "Burlington Beach", "Royal Botanical Gardens"],
  },
  Barrie: {
    population: "155,000",
    climate: "snowbelt winters with heavy spring melt from Kempenfelt Bay",
    neighbourhoods: ["Downtown Barrie", "Allandale", "Holly", "Painswick"],
    landmarks: ["Kempenfelt Bay", "Barrie Waterfront", "MacLaren Art Centre"],
  },
  Kitchener: {
    population: "260,000",
    climate: "continental with cold winters and significant spring runoff",
    neighbourhoods: ["Downtown Kitchener", "Victoria Park", "Stanley Park", "Forest Heights"],
    landmarks: ["Victoria Park", "Kitchener Market", "Grand River"],
  },
  Victoria: {
    population: "95,000",
    climate: "mildest in Canada with wet winters and dry summers",
    neighbourhoods: ["James Bay", "Fernwood", "Oak Bay", "Downtown"],
    landmarks: ["Inner Harbour", "Butchart Gardens area", "Parliament Buildings"],
  },
  Surrey: {
    population: "580,000",
    climate: "mild, rainy winters with significant storm drain demand",
    neighbourhoods: ["Whalley", "Newton", "Guildford", "Cloverdale"],
    landmarks: ["Bear Creek Park", "Guildford Town Centre", "Crescent Beach"],
  },
  Kelowna: {
    population: "145,000",
    climate: "semi-arid with hot summers and irrigation-heavy commercial zones",
    neighbourhoods: ["Downtown Kelowna", "Rutland", "Glenmore", "Mission"],
    landmarks: ["Okanagan Lake", "Prospera Place", "Knox Mountain"],
  },
  Laval: {
    population: "440,000",
    climate: "cold Quebec winters with spring melt and heavy drainage loads",
    neighbourhoods: ["Chomedey", "Vimont", "Duvernay", "Pont-Viau"],
    landmarks: ["Centropolis", "Rivière des Prairies", "Cosmodôme"],
  },
  Airdrie: {
    population: "80,000",
    climate: "prairie climate with chinook winds and rapid freeze-thaw cycles",
    neighbourhoods: ["Downtown Airdrie", "Kings Heights", "Ravenswood", "Bayside"],
    landmarks: ["Nose Creek Park", "Airdrie Festival of Lights area"],
  },
  Brandon: {
    population: "50,000",
    climate: "prairie continental with cold winters and spring flooding risk",
    neighbourhoods: ["Downtown Brandon", "Green Acres", "Riverheights", "Kirkcaldy"],
    landmarks: ["Assiniboine River", "Brandon University area", "Keystone Centre"],
  },
  Coquitlam: {
    population: "150,000",
    climate: "wet Pacific Northwest winters with heavy rainfall runoff",
    neighbourhoods: ["Burquitlam", "Maillardville", "Westwood Plateau", "Austin Heights"],
    landmarks: ["Town Centre Park", "Coquitlam Centre", "Minnekhada Regional Park"],
  },
  "White Rock": {
    population: "22,000",
    climate: "mild coastal climate with significant winter rainfall",
    neighbourhoods: ["West Beach", "East Beach", "Uptown White Rock"],
    landmarks: ["White Rock Pier", "Memorial Park", "Semiahmoo Bay"],
  },
  Newmarket: {
    population: "90,000",
    climate: "GTA continental with cold winters and spring thaw drainage",
    neighbourhoods: ["Downtown Newmarket", "Stonehaven", "Glenway", "Gorham-College"],
    landmarks: ["Main Street Newmarket", "Fairy Lake", "Upper Canada Mall"],
  },
  Cambridge: {
    population: "140,000",
    climate: "continental with Grand River flooding risk in spring",
    neighbourhoods: ["Galt", "Preston", "Hespeler", "Blair"],
    landmarks: ["Grand River", "Cambridge City Hall", "Riverside Park"],
  },
  Napanee: {
    population: "17,000",
    climate: "eastern Ontario continental with spring runoff along the Napanee River",
    neighbourhoods: ["Downtown Napanee", "East Side", "Riverview"],
    landmarks: ["Napanee River", "Springside Park"],
  },
  Gananoque: {
    population: "5,200",
    climate: "St. Lawrence River moderated with spring flooding risk",
    neighbourhoods: ["Downtown Gananoque", "Stone Street area"],
    landmarks: ["Thousand Islands", "Gananoque River", "Confederation Park"],
  },
  Brockville: {
    population: "22,000",
    climate: "St. Lawrence moderated with cold winters and spring melt",
    neighbourhoods: ["Downtown Brockville", "North End", "East End"],
    landmarks: ["Brockville Railway Tunnel", "St. Lawrence River", "Blockhouse Island"],
  },
  Elgin: {
    population: "3,500",
    climate: "eastern Ontario rural climate with spring agricultural runoff",
    neighbourhoods: ["Downtown Elgin", "Portland area"],
    landmarks: ["Rideau Canal corridor", "Elgin community centre area"],
  },
};

export function getCityFacts(city: string): CityFact | null {
  return CITY_FACTS[city] ?? null;
}

export function getLocationFacts(city: string): string[] {
  const facts = getCityFacts(city);
  if (!facts) {
    return [
      `${city} has a growing commercial restaurant and property management sector that depends on reliable grease and drainage maintenance.`,
      `Local climate patterns in ${city} create seasonal drainage challenges that make proactive cleaning schedules especially important.`,
    ];
  }

  const hood = facts.neighbourhoods[0];
  const landmark = facts.landmarks[0];
  const secondHood = facts.neighbourhoods[1] ?? facts.neighbourhoods[0];

  return [
    `With a population of ${facts.population}, ${city} has a dense commercial kitchen and property management sector — especially around ${hood} and ${secondHood}.`,
    `${city}'s ${facts.climate} creates seasonal grease and drainage challenges, particularly near landmarks like ${landmark}.`,
  ];
}
