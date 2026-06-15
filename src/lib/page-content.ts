import { prisma } from "./prisma";

// ─── Types ───────────────────────────────────────────
export interface HomeContent {
  hero: {
    headline: string;
    cardTitle: string;
    cardText: string;
    cardCta: string;
  };
  services: { title: string; description: string }[];
  milestones: {
    heading: string;
    description: string;
    stats: { target: number; suffix: string; label: string }[];
  };
  faq: {
    heading: string;
    description: string;
    items: { question: string; answer: string }[];
  };
}

export interface AboutContent {
  bannerHeading: string;
  intro: string[];
  vision: string;
  mission: string;
  teamHeading: string;
  teamSubtext: string;
}

// ─── Defaults (mirror the original hardcoded copy) ───
export const homeDefaults: HomeContent = {
  hero: {
    headline: "Building Premium Luxury Homes In Lagos",
    cardTitle: "Luxury Homes & Real Estate Development in Lagos",
    cardText:
      "Experience unparalleled luxury living in Lagos. Our team of skilled architects, builders, realtors, and interior designers has created something extraordinary just for you.",
    cardCta: "Explore Our Portfolio",
  },
  services: [
    {
      title: "Property Investment",
      description:
        "Master-planned property development with modern amenities.",
    },
    {
      title: "Property Sale",
      description:
        "Discover luxury homes for sale in Lekki and prime investment opportunities.",
    },
    {
      title: "Property Development",
      description:
        "End-to-end property development in Nigeria, from concept to handover.",
    },
  ],
  milestones: {
    heading: "Milestones we're honored to have achieved",
    description:
      "These aren't just our milestones, they're yours too. Every home delivered, every client served, and every community created reflects our shared commitment to quality real estate. Together, we've built something extraordinary.",
    stats: [
      { target: 33, suffix: "+", label: "Successful Project Done" },
      { target: 7, suffix: "+", label: "Projects" },
      { target: 700, suffix: "+", label: "Delightful Clients" },
      { target: 8, suffix: "+", label: "Locations" },
    ],
  },
  faq: {
    heading: "FAQ",
    description:
      "Find quick answers to common questions about buying, selling, and investing in property with Rex'o's.",
    items: [
      {
        question: "What's the buying process?",
        answer:
          "Our buying process is straightforward. Start by browsing our properties, schedule a tour, and our team will guide you through documentation, payment plans, and handover.",
      },
      {
        question: "How much deposit do I need?",
        answer:
          "Deposit requirements vary by property. Typically, we require an initial deposit of 30-50% with flexible payment plans available for the balance.",
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Yes, we offer flexible payment plans tailored to your financial situation. Plans range from 6 to 24 months depending on the property.",
      },
      {
        question: "Can I customize my property?",
        answer:
          "Absolutely! We offer customization options during the construction phase. Our interior design team will work with you to create your dream home.",
      },
    ],
  },
};

export const aboutDefaults: AboutContent = {
  bannerHeading: "Building Distinction Since 2019",
  intro: [
    "Established in 2019, Rex'o's Properties is defined by a commitment to refined living and enduring quality. Since inception, the company has delivered a portfolio of premium residential properties distinguished by thoughtful design and meticulous execution.",
    "Our approach is deliberate and disciplined. From site selection to architectural detailing, every element is carefully considered to ensure cohesion, elegance, and functionality. We believe that true quality lies in precision: in balanced proportions, enduring materials, and spaces designed for contemporary living.",
    "At Rex'o's Properties, excellence is not overstated, it is embedded. Each development reflects our dedication to creating residences of integrity, comfort, and quiet distinction.",
    "At Rex'o's Properties, our greatest achievement is the satisfaction of every client we serve. From first-time homebuyers taking their most important financial step, to seasoned investors expanding their portfolio — we are committed to delivering excellence at every stage of the journey.",
  ],
  vision:
    "To become Nigeria's most trusted real estate partner, transforming the property landscape and home at a time.",
  mission:
    "To provide accessible, quality real estate solutions while maintaining the highest standards of trust and professionalism.",
  teamHeading: "Meet Our Team",
  teamSubtext:
    "Real people. Real expertise. Real results—and a commitment to your success.",
};

// ─── Deep merge: stored values win, defaults fill any gaps ───
function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function merge<T>(def: T, stored: unknown): T {
  if (Array.isArray(def)) {
    return (Array.isArray(stored) ? stored : def) as T;
  }
  if (isPlainObject(def)) {
    const out: Record<string, unknown> = { ...(def as Record<string, unknown>) };
    const s = isPlainObject(stored) ? stored : {};
    for (const k of Object.keys(out)) {
      if (k in s) out[k] = merge(out[k], s[k]);
    }
    return out as T;
  }
  return (stored === undefined ? def : stored) as T;
}

async function readPage<T>(page: string, defaults: T): Promise<T> {
  try {
    const row = await prisma.pageContent.findUnique({
      where: { page_section_key: { page, section: "content", key: "data" } },
    });
    if (!row) return defaults;
    return merge(defaults, JSON.parse(row.value));
  } catch {
    return defaults;
  }
}

export function getHomeContent(): Promise<HomeContent> {
  return readPage("home", homeDefaults);
}

export function getAboutContent(): Promise<AboutContent> {
  return readPage("about", aboutDefaults);
}
