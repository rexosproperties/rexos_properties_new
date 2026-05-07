import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function section(title, paragraph, bullets) {
  const list = bullets
    .map((b) => `<li>${b}</li>`)
    .join("");
  return `<h2>${title}</h2><p>${paragraph}</p><ul>${list}</ul>`;
}

const posts = [
  {
    slug: "behind-the-scenes",
    title: "Behind the Scenes: A Day at Rex'o's Properties",
    excerpt:
      "An inside look at how we vet, present, and support every property — from inspection to post-purchase care.",
    imageUrl: "/assets/images/blog-1.png",
    published: true,
    content: [
      `<p>At Rex'o's Properties, our work goes far beyond listing properties. Every interaction, every recommendation, and every deal is backed by a dedicated process built around your best interest. Here's a look inside how we operate to deliver results you can trust.</p>`,
      section(
        "1. Early Site Inspection & Quality Control",
        "Every property we present goes through a rigorous inspection process before it ever reaches a client. Our team evaluates structural integrity, finishing quality, location advantages, and developer credibility.",
        [
          "On-site physical inspection of every listing",
          "Structural and finishing quality checks",
          "Developer background and track record review",
          "Location and infrastructure assessment",
        ],
      ),
      section(
        "2. Personalized Property Search",
        "We don't believe in a one-size-fits-all approach. Every client gets a tailored property search based on their specific needs, budget, and lifestyle preferences.",
        [
          "In-depth client needs assessment",
          "Budget-aligned property shortlisting",
          "Lifestyle and location preference matching",
          "Regular updates as new listings become available",
        ],
      ),
      section(
        "3. Smart Data-Driven Investment Guidance",
        "Our team leverages current market data and local expertise to guide clients toward properties that offer the best value and long-term returns.",
        [
          "Real-time market trend analysis",
          "ROI projections for investment properties",
          "Area growth and infrastructure development insights",
          "Comparative pricing and value assessment",
        ],
      ),
      section(
        "4. Verified & Secure Recommendations",
        "Every property we recommend comes with verified documentation and legal clarity. We ensure our clients are protected at every stage of the transaction.",
        [
          "Title document verification",
          "Land registry search confirmation",
          "Legal due diligence on all listings",
          "Encumbrance and dispute checks",
        ],
      ),
      section(
        "5. Professional Property Presentation",
        "We present properties in the best possible light — with high-quality photography, detailed property descriptions, and immersive virtual tours where available.",
        [
          "High-quality photography and videography",
          "Detailed property listings and descriptions",
          "Virtual tour options for remote clients",
          "Staged property showings for maximum impact",
        ],
      ),
      section(
        "6. Consistent Support From Start To Finish",
        "Our relationship with clients doesn't end at the point of sale. We provide continuous support through documentation, payment processing, and post-purchase follow-up.",
        [
          "End-to-end transaction management",
          "Payment plan coordination",
          "Documentation and legal processing support",
          "Post-purchase follow-up and client care",
        ],
      ),
    ].join(""),
  },
  {
    slug: "lekki-phase-1-desirable",
    title: "Why Lekki Phase 1 Remains Lagos' Most Desirable Address",
    excerpt:
      "Decades after its development, Lekki Phase 1 still sets the benchmark for prime Lagos real estate. Here's why.",
    imageUrl: "/assets/images/blog-3.png",
    published: true,
    content: [
      `<p>Decades after its development, Lekki Phase 1 continues to hold its position as Lagos' most sought-after residential and commercial address. Despite the rapid expansion of newer estates along the Lekki-Epe corridor, Lekki Phase 1 remains the benchmark by which every other Lagos neighbourhood is measured.</p>`,
      section(
        "1. Prime Location & Accessibility",
        "Lekki Phase 1 sits at the heart of Lagos Island's most dynamic corridor — with seamless access to Victoria Island, Ikoyi, and the wider Lekki-Epe Expressway.",
        [
          "Minutes from Victoria Island and Ikoyi business districts",
          "Direct access to the Lekki-Epe Expressway",
          "Close proximity to major commercial hubs and markets",
          "Well-maintained internal road network",
          "Easy access to the Third Mainland Bridge and Lagos Island",
        ],
      ),
      section(
        "2. Established Infrastructure & Amenities",
        "Unlike emerging neighbourhoods that are still developing, Lekki Phase 1 boasts decades of established infrastructure — from reliable utilities to world-class recreational and commercial facilities.",
        [
          "Top-rated international and private schools",
          "World-class hospitals and medical facilities",
          "High-end shopping malls, restaurants, and entertainment",
          "Reputable banks and financial institutions",
          "Fitness centres, hotels, and recreational parks",
        ],
      ),
      section(
        "3. Strong & Consistent Property Appreciation",
        "Property values in Lekki Phase 1 have demonstrated consistent appreciation over the years, making it one of Nigeria's most reliable real estate investment zones.",
        [
          "Consistent year-on-year property value growth",
          "High demand from both local and diaspora buyers",
          "Strong rental income potential across all property types",
          "Low vacancy rates across residential and commercial units",
        ],
      ),
      section(
        "4. Prestige & Social Status",
        "A Lekki Phase 1 address carries significant social and professional weight in Lagos. It signals success, stability, and belonging to a community of Lagos' most influential residents.",
        [
          "Home to executives, entrepreneurs, and diplomats",
          "Prestigious address recognised across Nigeria and internationally",
          "High-profile neighbours and a well-organised community",
          "Gated estates and secured compounds across the area",
        ],
      ),
      section(
        "5. Thriving Commercial Activity",
        "Lekki Phase 1 is not just residential — it is a thriving commercial zone. From corporate offices to retail outlets, the area supports a vibrant mixed-use economy.",
        [
          "Dense concentration of corporate offices and co-working spaces",
          "High foot traffic supporting retail and hospitality businesses",
          "Growing tech and creative industry presence",
          "Strong short-let and serviced apartment market",
        ],
      ),
      section(
        "6. Why Investors Continue to Choose Lekki Phase 1",
        "Seasoned real estate investors understand that Lekki Phase 1 is not just a place to own property — it is a strategic asset.",
        [
          "Proven long-term capital appreciation track record",
          "High rental yields relative to purchase price",
          "Ease of resale due to strong buyer demand",
          "Suitable for owner-occupiers and investors alike",
          "Backed by strong infrastructure and government investment",
        ],
      ),
    ].join(""),
  },
  {
    slug: "property-titles-nigeria",
    title:
      "Understanding Property Titles in Nigeria: C of O vs. Deed of Assignment",
    excerpt:
      "Knowing the difference between a Certificate of Occupancy and a Deed of Assignment can save you from costly mistakes.",
    imageUrl: "/assets/images/blog-2.png",
    published: true,
    content: [
      `<p>When buying property in Nigeria, one of the most important things to understand is the type of title document attached to the land or building. Two of the most common documents you will encounter are the Certificate of Occupancy (C of O) and the Deed of Assignment.</p>`,
      section(
        "What is A Certificate Of Occupancy (C Of O)?",
        "A Certificate of Occupancy (C of O) is an official document issued by the State Government that confirms the right to occupy and use a piece of land for a specified period — typically 99 years.",
        [
          "Issued by the State Government",
          "Confirms legal ownership of the land",
          "Valid for up to 99 years",
          "Required for mortgages and bank financing",
          "Highest form of land title in Nigeria",
        ],
      ),
      section(
        "What Is A Deed Of Assignment?",
        "A Deed of Assignment is a legal document that transfers ownership of a property from one person (or entity) to another. It is essentially the contract that records the sale and transfer of property rights.",
        [
          "Records the transfer of ownership between parties",
          "Must be signed by both buyer and seller",
          "Needs to be stamped and registered at the Land Registry",
          "Does not replace a C of O",
          "Common in distressed sales and private transactions",
        ],
      ),
      section(
        "Do You Need Both?",
        "In many cases, yes. The Deed of Assignment confirms the transfer of ownership to you, while the C of O confirms the legal title of the land itself.",
        [
          "The Deed of Assignment confirms the transfer of ownership to you",
          "The C of O confirms the legal title of the land itself",
          "Having both provides maximum protection",
          "Always verify the C of O with the State Government before buying",
        ],
      ),
      section(
        "Why This Matters Before You Buy",
        "Before investing in any property in Nigeria, always verify documents and engage qualified professionals.",
        [
          "Request and verify the title documents",
          "Engage a qualified property lawyer",
          "Conduct a search at the Land Registry",
          "Confirm there are no encumbrances or disputes on the land",
          "Work with reputable developers like Rex'o's Properties",
        ],
      ),
    ].join(""),
  },
  {
    slug: "right-property-long-term-value",
    title: "How to Choose the Right Property for Long Term Value",
    excerpt:
      "Six factors that determine whether a property holds, gains, or loses value over the long run.",
    imageUrl: "/assets/images/blog-4.png",
    published: true,
    content: [
      `<p>Buying property for long-term value requires more than just finding a place that looks good today. It demands strategic thinking, market awareness, and careful evaluation of factors that will determine how well your investment performs over time.</p>`,
      section(
        "1. Location Still Matters Most",
        "The age-old rule still holds true — location is the single most important factor in property value. A property in the right location will always appreciate, regardless of market fluctuations.",
        [
          "Proximity to business districts and commercial hubs",
          "Access to quality schools, hospitals, and amenities",
          "Road network and ease of commute",
          "Security and neighbourhood reputation",
          "Future development plans for the area",
        ],
      ),
      section(
        "2. Check Future Development Potential",
        "Buying in an area that is set for growth can multiply your returns significantly. Look beyond what the area looks like today and focus on what it is becoming.",
        [
          "Government infrastructure projects in the pipeline",
          "New road constructions and bridges planned nearby",
          "Commercial developments entering the area",
          "Population growth trends in the neighbourhood",
        ],
      ),
      section(
        "3. Verify Property Documentation",
        "No matter how attractive a property looks, its long-term value is only as strong as its legal foundation. Always verify all documentation before committing.",
        [
          "Confirm a valid Certificate of Occupancy (C of O)",
          "Conduct a search at the Land Registry",
          "Ensure there are no encumbrances or disputes",
          "Work with a qualified property lawyer",
        ],
      ),
      section(
        "4. Consider Rental & Resale Value",
        "A good long-term property investment should generate income while you hold it and appreciate when you decide to sell.",
        [
          "Research current rental rates in the area",
          "Compare similar property resale prices",
          "Assess tenant demand in the neighbourhood",
          "Factor in maintenance costs against rental income",
        ],
      ),
      section(
        "5. Evaluate Infrastructure & Amenities",
        "Properties with strong surrounding infrastructure consistently outperform those in poorly serviced areas.",
        [
          "Reliable power supply and water availability",
          "Good road access and drainage systems",
          "Proximity to shopping centres and recreation",
          "Quality of estate management and security",
        ],
      ),
      section(
        "6. Work With The Right Real Estate Experts",
        "Having the right team in your corner makes all the difference. A reputable real estate company brings market knowledge, verified listings, and professional guidance.",
        [
          "Partner with developers with a proven track record",
          "Get independent legal and financial advice",
          "Work with agents who have deep local market knowledge",
          "Ensure full transparency on pricing and documentation",
          "Choose companies like Rex'o's Properties with verified listings",
        ],
      ),
    ].join(""),
  },
];

for (const p of posts) {
  await prisma.blogPost.upsert({
    where: { slug: p.slug },
    update: {
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      imageUrl: p.imageUrl,
      published: p.published,
    },
    create: p,
  });
  console.log(`✓ ${p.slug}`);
}

console.log(`\nSeeded ${posts.length} blog posts.`);
await prisma.$disconnect();
