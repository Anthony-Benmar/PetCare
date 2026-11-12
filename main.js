// Motion reproduce las animaciones de entrada del sitio original; CSS e IntersectionObserver son el respaldo.
let motion;
try {
  motion = await import("https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm");
} catch (error) {
  console.error("No se pudo cargar Motion; se usará la animación alternativa del navegador.", error);
}

// Recursos compartidos por las plantillas: el vídeo es local y las imágenes siguen en Framer.
const MEDIA = {
  logo: "https://framerusercontent.com/images/hk2wPtf8dfU2EnmrNTDC74XOjg.svg?width=227&height=54",
  heroVideo: "./assets/hero.mp4",
  heroPoster: "https://framerusercontent.com/assets/oAYIBNiBZJP02UIDm8H6cRrLk.jpg",
  pets: [
    "https://framerusercontent.com/images/T62Q8QazbWc50SMrCLvA5p5CRrs.jpg?width=500&height=500",
    "https://framerusercontent.com/images/bgRIwJrrDAy3T9SLVmBQinzc.jpg?width=500&height=500",
    "https://framerusercontent.com/images/cpkgXVvouZS8T9r2FyNyw54pYwE.jpg?width=500&height=500",
    "https://framerusercontent.com/images/njuMPu2q9qO5bP9Axvqq0ilNss.jpg?width=500&height=500",
    "https://framerusercontent.com/images/4US8VNrzVSJlhPf95hYYAgMEpNc.jpg?width=500&height=500",
    "https://framerusercontent.com/images/7r1Mf8b5c5uOqeCFoX33L62Rc.jpg?width=500&height=500",
  ],
  services: [
    "https://framerusercontent.com/images/5LQ98iFY6yPcoPlIzcqViZNxVQ.jpg?width=500&height=500",
    "https://framerusercontent.com/images/JTXqTrRBfX4h3qFjmL7ApeAyoUM.jpg?width=500&height=500",
    "https://framerusercontent.com/images/AUgL7hiMYbsj2s2k1Y0qLVl1Y.jpg?width=500&height=500",
    "https://framerusercontent.com/images/4kiC3MYMqmpagAJGGyHvjxDucc.jpg?width=600&height=1024",
    "https://framerusercontent.com/images/0XdGlagSfW4OfK9LYNQqVlhdzJQ.jpg?width=1000&height=1000",
    "https://framerusercontent.com/images/xxh9VX3T5WxPg2RlsMSHhiO3mEI.jpg?width=1000&height=1000",
  ],
  gallery: [
    "https://framerusercontent.com/images/4kiC3MYMqmpagAJGGyHvjxDucc.jpg?width=600&height=1024",
    "https://framerusercontent.com/images/0XdGlagSfW4OfK9LYNQqVlhdzJQ.jpg?width=1000&height=1000",
    "https://framerusercontent.com/images/xxh9VX3T5WxPg2RlsMSHhiO3mEI.jpg?width=1000&height=1000",
    "https://framerusercontent.com/images/xIsvafb7sXW6KXHH6LS9LhqdOM.jpg?width=1000&height=1000",
    "https://framerusercontent.com/images/I7HirGw4GcH63C35cHNywuJ8.jpg?width=1000&height=1000",
  ],
  about: "https://framerusercontent.com/images/nDSgGCY7FJV5vXZ3v2TASxixic.jpg?width=700&height=818",
  clinic: "https://framerusercontent.com/images/3PviDXmaouc3actdCVawWpjiuY.jpg?width=1000&height=667",
  cta: "https://framerusercontent.com/images/sh3UQIk0B0p3jBZUf7ZTVnWxE.jpg?width=1920&height=1080",
  people: [
    "https://framerusercontent.com/images/B6PGmttzjop1VMqVPEipIsLba4.jpg?width=100&height=100",
    "https://framerusercontent.com/images/kQDOxPrklfNVl2Vu8fRPtIRwMI.jpg?width=100&height=100",
    "https://framerusercontent.com/images/Ti2OEsoAKZmTZOHam7FWDZH7nY.jpg?width=100&height=100",
    "https://framerusercontent.com/images/mgImb60c8BG4oxy9P9kk9pWVc.jpg?width=100&height=100",
    "https://framerusercontent.com/images/ylwQSgC0jer5KxgUt1YfRHPuqgQ.jpg?width=100&height=100",
    "https://framerusercontent.com/images/NQjS7XYGQHMGZDGPf26YQJkWZ5w.jpg?width=100&height=100",
    "https://framerusercontent.com/images/lXdkFVIW2bquMSsFsc004Gped0.jpg?width=100&height=100",
    "https://framerusercontent.com/images/floD7gJ4zY3KCoNT3Am9UbHuVn8.jpg?width=100&height=100",
    "https://framerusercontent.com/images/xJIg3p1DOPEmC8GxTC41pn1s.jpg?width=100&height=100",
    "https://framerusercontent.com/images/unBxapJg2517jzMreG3kZXNpyEM.jpg?width=100&height=100",
  ],
};

// Estos datos alimentan tanto las tarjetas como las páginas de detalle de cada servicio.
const serviceData = [
  {
    slug: "wellness-exams",
    name: "Wellness Exams",
    summary: "Thoughtful nose-to-tail checkups for every stage of your pet's life.",
    description: "Comprehensive nose-to-tail wellness exams that help prevent illness, track changes early, and keep your pet healthy at every life stage.",
    price: "$55",
    image: MEDIA.services[0],
    overview: [
      "Regular checkups help us understand what is normal for your pet and spot small changes early. Every visit includes time to talk through your questions and your pet's everyday routine.",
      "We'll build practical next steps around age, health history and lifestyle, so preventive care feels personal rather than one-size-fits-all.",
    ],
    included: [
      ["Full body check", "A nose-to-tail review of eyes, ears, teeth, skin, heart, lungs, joints and weight."],
      ["Health history", "A conversation about appetite, behavior, exercise, medications and home routines."],
      ["Preventive screening", "Age-appropriate checks and tests are recommended when they add value."],
      ["Nutrition guidance", "Clear advice on food, treats, weight goals and feeding habits."],
      ["Vaccine planning", "We review due dates and lifestyle risks to keep protection up to date."],
      ["Wellness roadmap", "Leave with next steps for follow-ups and the timing of the next visit."],
    ],
  },
  {
    slug: "vaccinations",
    name: "Vaccinations",
    summary: "Core and lifestyle vaccines with clear guidance on boosters and protection.",
    description: "Core and lifestyle vaccinations with clear guidance on boosters, travel requirements, and year-round disease protection.",
    price: "$35",
    image: MEDIA.services[1],
    overview: [
      "Vaccines help protect pets from preventable diseases. We tailor a schedule to age, health, travel and everyday activities.",
      "Before each vaccine, our team checks how your pet is doing and explains what is recommended, when boosters are due and what to watch for afterward.",
    ],
    included: [
      ["Risk assessment", "We consider travel, boarding, outdoor time and local health risks."],
      ["Core protection", "Essential vaccines are reviewed and updated for your pet."],
      ["Lifestyle boosters", "Additional protection is discussed only when it fits your pet's routine."],
      ["Gentle visit", "Calm handling helps nervous pets feel supported."],
      ["After-care advice", "We explain expected responses and when to call the clinic."],
      ["Booster schedule", "You leave with clear dates and reminders for future doses."],
    ],
  },
  {
    slug: "dental-care",
    name: "Dental Care",
    summary: "Cleanings, oral exams and after-care to keep your pet comfortable.",
    description: "Professional dental cleanings, oral exams, X-rays, and extractions designed to protect your pet's comfort and long-term health.",
    price: "$280",
    image: MEDIA.services[2],
    overview: [
      "Healthy teeth and gums support your pet's comfort and overall wellbeing. Dental visits can include professional cleaning, oral exams and imaging when needed.",
      "We'll explain what we find and share practical home-care guidance to help protect your pet's smile between visits.",
    ],
    included: [
      ["Oral exam", "We assess teeth, gums, bite, odor and visible signs of discomfort."],
      ["Anesthesia monitoring", "Your pet is watched closely throughout the procedure."],
      ["Professional cleaning", "Plaque and tartar are removed and teeth are polished."],
      ["Dental imaging", "X-rays can reveal concerns below the gum line."],
      ["Treatment choices", "We explain findings and discuss any recommended treatment."],
      ["Home care routine", "Get approachable brushing and follow-up recommendations."],
    ],
  },
  {
    slug: "surgery",
    name: "Surgery",
    summary: "Attentive routine and soft-tissue procedures with careful recovery support.",
    description: "Safe, attentive veterinary surgery for routine and soft-tissue procedures, with careful monitoring and clear recovery guidance.",
    price: "$220",
    image: MEDIA.services[3],
    overview: [
      "Our veterinary team supports routine and soft-tissue procedures with careful preparation, modern equipment and attentive monitoring.",
      "Comfort remains a priority before and after surgery. We provide clear recovery instructions and follow-up support for the days at home.",
    ],
    included: [
      ["Surgical consult", "Talk through the procedure, benefits, recovery and questions."],
      ["Safety screening", "Pre-surgical checks help us plan care for your pet."],
      ["Careful procedure", "Clean protocols and close monitoring support each treatment."],
      ["Pain control", "Comfort measures are planned around the procedure."],
      ["Recovery monitoring", "We check comfort and readiness before your pet goes home."],
      ["Post-op support", "Receive medication, activity and incision-care guidance."],
    ],
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    summary: "In-house testing and imaging to help guide clear treatment decisions.",
    description: "In-house diagnostics, bloodwork, imaging, and lab testing that help identify problems quickly and guide confident treatment.",
    price: "$95",
    image: MEDIA.services[4],
    overview: [
      "Our in-house laboratory and diagnostic tools help the team understand symptoms and choose appropriate next steps without unnecessary delays.",
      "We review results with you in clear language and explain what they mean for your pet's care.",
    ],
    included: [
      ["Symptom review", "We discuss when changes began and what you have noticed."],
      ["Focused exam", "A targeted exam helps select the most useful tests."],
      ["Lab testing", "Blood and other samples can help clarify health concerns."],
      ["Digital imaging", "Imaging may help assess injuries or internal changes."],
      ["Result explanation", "Your veterinarian talks through findings and questions."],
      ["Treatment direction", "Get a practical plan for treatment or monitoring."],
    ],
  },
  {
    slug: "emergency-care",
    name: "Emergency Care",
    summary: "Prompt assessment for sudden illness, injury or worrying symptoms.",
    description: "Urgent veterinary care for sudden illness, injuries, pain, and concerning symptoms when your pet needs fast assessment and treatment.",
    price: "$120",
    image: MEDIA.services[5],
    overview: [
      "When illness or injury happens unexpectedly, our team assesses urgent cases promptly and begins appropriate care.",
      "We keep you informed about your pet's condition and the available options. If specialist care is needed, we help coordinate the next step.",
    ],
    included: [
      ["Urgent triage", "Pets with severe symptoms are assessed as quickly as possible."],
      ["Stabilization", "Initial support is chosen for your pet's immediate needs."],
      ["Emergency diagnostics", "Focused tests help clarify urgent concerns."],
      ["Treatment options", "We explain choices and priorities in plain language."],
      ["Referral support", "If needed, we coordinate records and transfer details."],
      ["Home instructions", "Get medication guidance and signs to monitor."],
    ],
  },
];

const blogData = [
  {
    slug: "five-signs-your-dog-s-teeth-need-a-vet",
    category: "Wellness",
    date: "Jul 15, 2026",
    title: "Five signs your dog's teeth need a vet",
    excerpt: "Bad breath is rarely just bad breath. Learn what changes may be worth a dental check.",
    image: MEDIA.services[2],
    sections: [
      ["Notice changes in breath and eating", "Persistent odor, slower meals, dropping food or avoiding crunchy treats can all be clues that your dog is uncomfortable."],
      ["Check the gums and teeth", "Red or swollen gums and yellow-brown buildup are worth discussing with your veterinarian. Dogs can hide mouth pain, so small changes in behavior matter too."],
      ["Build a simple dental routine", "Regular brushing, vet-approved chews and routine dental checks can help. If a change lasts for several days, arrange a visit rather than waiting for symptoms to worsen."],
    ],
  },
  {
    slug: "what-complete-balanced-really-means",
    category: "Nutrition",
    date: "Jul 14, 2026",
    title: 'What "complete & balanced" really means',
    excerpt: "A quick guide to reading pet food labels with more confidence.",
    image: MEDIA.pets[1],
    sections: [
      ["What the label means", "A complete diet is intended to provide the nutrients a pet needs when fed as directed. The right choice depends on age, health and daily activity."],
      ["Read beyond the marketing", "Look for a food suited to your pet's life stage and review the feeding directions. Portion needs vary with weight, breed, activity and health."],
      ["Make changes gradually", "A sudden food change can upset digestion. When switching, transition slowly over about a week and ask your vet for advice if your pet has symptoms or special needs."],
    ],
  },
  {
    slug: "helping-an-anxious-cat-settle-in",
    category: "Behavior",
    date: "Jul 12, 2026",
    title: "Helping an anxious cat settle in",
    excerpt: "Small changes at home can help a nervous cat feel safer.",
    image: MEDIA.pets[1],
    sections: [
      ["Learn your cat's signals", "Hiding, appetite changes, extra grooming or litter-box changes can be signs that something feels stressful."],
      ["Offer a quiet retreat", "Set up a calm spot with a bed, water, litter and familiar toys. Let your cat explore at their own pace rather than forcing interaction."],
      ["Keep routines gentle and steady", "Consistent feeding and play times can help. Introduce new people, pets or spaces gradually, and speak with your veterinarian if concerns persist."],
    ],
  },
  {
    slug: "how-often-does-my-pet-really-need-a-checkup",
    category: "Wellness",
    date: "Jul 12, 2026",
    title: "How often does my pet really need a checkup?",
    excerpt: "A simple age-by-age guide to preventive wellness visits.",
    image: MEDIA.gallery[3],
    sections: [
      ["Young pets", "Puppies and kittens grow quickly and often need several early visits for exams, vaccines and weight checks."],
      ["Adult and senior pets", "Many healthy adults benefit from an annual exam. Older pets may need more frequent check-ins depending on their health and your veterinarian's advice."],
      ["When to book sooner", "Changes in appetite, thirst, weight, energy or bathroom habits can be worth a call. Bring medication details and notes about anything new to the appointment."],
    ],
  },
  {
    slug: "keeping-paws-safe-in-summer-heat",
    category: "Seasonal",
    date: "Jul 11, 2026",
    title: "Keeping paws safe in summer heat",
    excerpt: "Help your pet stay comfortable when temperatures rise.",
    image: MEDIA.gallery[4],
    sections: [
      ["Recognize heat stress", "Heavy panting, weakness, drooling or vomiting can be serious. Move your pet to a cooler place and contact a veterinarian if you are concerned."],
      ["Plan safer outdoor time", "Offer fresh water and shade, choose cooler hours for walks and avoid hot pavement. Never leave a pet in a parked car."],
      ["Think beyond summer", "Each season brings different risks. Keep preventive care and daily routines steady, and ask your vet about concerns specific to your pet."],
    ],
  },
  {
    slug: "the-calm-car-ride-travel-without-the-stress",
    category: "Behavior",
    date: "Jul 11, 2026",
    title: "The calm car ride: travel without the stress",
    excerpt: "Build confidence with gradual, positive travel practice.",
    image: MEDIA.gallery[1],
    sections: [
      ["Start with short practice", "Let your pet explore a parked car first, then build up to short trips. Calm rewards help create a more positive association."],
      ["Make the ride secure", "Use an appropriate carrier or restraint and bring familiar items such as a blanket, water and a favorite toy."],
      ["Know when to ask for help", "Drooling, vomiting or persistent distress can have different causes. Talk to your veterinarian before a long trip if your pet struggles with travel."],
    ],
  },
];

const plans = [
  {
    name: "Puppy & Kitten",
    tagline: "For the first big year.",
    monthly: 29,
    yearly: 25,
    features: ["Unlimited nurse visits", "Full core vaccine series", "Microchip & registration", "Spay / neuter discount", "2 wellness exams"],
  },
  {
    name: "Adult Wellness",
    tagline: "A steady plan for every year.",
    monthly: 39,
    yearly: 33,
    featured: true,
    features: ["Two annual exams", "Full core vaccine series", "Yearly dental check", "Bloodwork & screening", "10% off procedures"],
  },
  {
    name: "Senior Care",
    tagline: "Extra attention, gentle pace.",
    monthly: 49,
    yearly: 42,
    features: ["Quarterly check-ins", "Full bloodwork panels", "Joint & mobility support", "Priority booking", "15% off procedures"],
  },
];

const priceRows = [
  ["Wellness exam", "Most-booked first visit", "Nose-to-tail check, weight, dental & coat review, plus a care plan.", "30 min", "Free re-check in 7 days", "$55"],
  ["Core vaccination", "Per shot", "Vaccine, mini health check and lifestyle risk review.", "15 min", "Up to 3-year cover", "$35"],
  ["Microchip & ID", "One-time", "Quick implant plus lifetime national database registration.", "15 min", "Lifetime registry", "$45"],
  ["Dental cleaning", "Under anesthesia", "Full scale, polish, charting and extractions if needed.", "60–90 min", "12-month aftercare", "$280"],
  ["Spay / neuter", "Day surgery", "Procedure, pain relief, monitoring and recovery nursing.", "Half day", "Free suture removal", "$220"],
  ["Diagnostic bloodwork", "In-house lab", "Full panel run on-site with same-day results and a vet call.", "20 min", "Vet call included", "$95"],
  ["Emergency consult", "Same-day urgent", "Priority triage and assessment when something can't wait.", "Varies", "Seen within 15 min", "$120"],
];

const homeFaqs = [
  ["Do you handle emergencies?", "Yes. Call our 24/7 emergency line at (555) 014-2200 so our team can guide you to the right next step."],
  ["Which animals do you treat?", "Our team cares for dogs, cats, rabbits, birds, reptiles and small pets. Contact us if you have a question about a specific animal."],
  ["How do I book a first visit?", "Use the booking form or call (555) 014-2200. New patients can request a relaxed first appointment."],
  ["Do you take pet insurance?", "We can provide the visit details and paperwork you need to submit to your insurer. Coverage depends on your policy."],
  ["What should I bring to the first appointment?", "Bring any vaccination records, a list of medicines and notes about changes you've noticed. A favorite treat can help your pet feel at ease."],
];

function routeLink(path, label, className = "") {
  return `<a class="${className}" data-route href="#${path}">${label}</a>`;
}

// Helpers HTML reutilizables para navegación, encabezados, pie y tarjetas.
function eyebrow(text, light = false) {
  return `<p class="eyebrow${light ? " eyebrow--light" : ""}">${text}</p>`;
}

function header(hero = false) {
  const nav = [
    ["/service", "Services"],
    ["/pricing", "Plans"],
    ["/blog", "Blog"],
    ["/about", "About"],
    ["/contact", "Contact"],
  ];

  return `
    <header class="site-header${hero ? " site-header--hero" : ""}">
      <div class="header-shell">
        ${routeLink("/", `<img src="${MEDIA.logo}" alt="PetCare" width="166" height="40">`, "brand")}
        <nav class="main-nav" id="main-navigation" aria-label="Main navigation">
          ${nav.map(([path, label]) => routeLink(path, label)).join("")}
        </nav>
        ${routeLink("/contact", "Book a visit", "button nav-book")}
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-navigation">
          <span></span><span></span>
        </button>
      </div>
    </header>`;
}

function footer() {
  return `
    <footer class="footer">
      <div class="paw-pattern" aria-hidden="true"></div>
      <div class="footer-shell">
        <div class="footer-brand">
          <p class="footer-tagline">Gentle, modern veterinary care for the animals you love most.</p>
          <a class="youtube-link" href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <span class="youtube-play" aria-hidden="true">▶</span>
            <span>Watch us on YouTube<small>Pet care tips &amp; clinic tours</small></span>
          </a>
          <div class="social-row" aria-label="Social links">
            <a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noreferrer">f</a>
            <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noreferrer">◎</a>
            <a href="https://www.youtube.com/" aria-label="YouTube" target="_blank" rel="noreferrer">▶</a>
          </div>
        </div>
        <div class="footer-column">
          <h3>Clinic</h3>
          <nav class="footer-nav" aria-label="Footer navigation">
            ${routeLink("/", "Home")}
            ${routeLink("/service", "Services")}
            ${routeLink("/pricing", "Plans")}
            ${routeLink("/about", "About")}
            ${routeLink("/blog", "Blog")}
            ${routeLink("/contact", "Contact")}
          </nav>
        </div>
        <div class="footer-column">
          <h3>Visit</h3>
          <p>14 Marigold Lane<br>Mon–Sat · 8–7</p>
          <a href="mailto:hello@petcare.com">hello@petcare.com</a>
          <p class="footer-credit">Designed by Webestica<br>Powered by Framer</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 PetCare Veterinary Clinic</span>
        <span>Care that knows their name.</span>
      </div>
    </footer>
    <div class="template-badge" aria-label="Template credits">
      <a href="https://framer.link/PetCare" target="_blank" rel="noreferrer">Get it for FREE&nbsp; ▣</a>
      <a href="https://www.framer.com/" target="_blank" rel="noreferrer">◩&nbsp; Made in Framer</a>
    </div>`;
}

function petCards() {
  const categories = [
    ["Dogs", "Puppies to seniors"],
    ["Cats", "Indoor & outdoor"],
    ["Rabbits", "Routine & dental"],
    ["Birds", "Avian wellness"],
    ["Reptiles", "Exotic specialists"],
    ["Small pets", "Guinea pigs & more"],
  ];
  return categories.map(([name, text], index) => `
    <article class="category-card reveal">
      <img src="${MEDIA.pets[index]}" alt="${name}" loading="lazy">
      <h3>${name}</h3>
      <p>${text}</p>
    </article>`).join("");
}

function serviceCards(items = serviceData.slice(0, 3)) {
  return items.map((service, index) => `
    <a class="service-card reveal" data-route href="#/service/${service.slug}">
      <img src="${service.image || MEDIA.services[index % MEDIA.services.length]}" alt="${service.name}" loading="lazy">
      <span class="service-card-label">${service.name}<span aria-hidden="true">↗</span></span>
    </a>`).join("");
}

function tableRows(rows = priceRows) {
  return rows.map(([name, sub, description, time, guarantee, price]) => `
    <tr>
      <td class="service-name">${name}<small>${sub}</small></td>
      <td>${description}</td>
      <td>${time}</td>
      <td>${guarantee}</td>
      <td>${price}</td>
    </tr>`).join("");
}

function pricingCards() {
  return plans.map((plan) => `
    <article class="plan-card${plan.featured ? " plan-card--featured" : ""} reveal">
      ${plan.featured ? eyebrow("★ Most popular", true) : ""}
      <h3>${plan.name}</h3>
      <p>${plan.tagline}</p>
      <div class="plan-price">$<span data-monthly="${plan.monthly}" data-yearly="${plan.yearly}">${plan.monthly}</span><small>/mo</small></div>
      <p class="muted-copy">billed <span data-billing-label>monthly</span>, cancel anytime</p>
      <ul>${plan.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
      ${routeLink("/contact", `Choose ${plan.name}`, "button button--outline")}
    </article>`).join("");
}

function faqItems(items) {
  return items.map(([question, answer]) => `
    <details>
      <summary>${question}</summary>
      <p>${answer}</p>
    </details>`).join("");
}

// Cada plantilla compone una ruta completa reutilizando los datos y bloques anteriores.
function homePage() {
  const testimonials = [
    ["Kind, gentle care from a team we completely trust.", "Sarah & Bella", "Golden Retriever"],
    ["Professional advice and compassionate care every time.", "Daniel & Luna", "Labrador Retriever"],
    ["Exceptional care with clear communication throughout.", "Michael & Willow", "British Shorthair"],
  ];

  return `
    ${header(true)}
    <main>
      <section class="hero">
        <video class="hero-media" autoplay muted loop playsinline poster="${MEDIA.heroPoster}" aria-hidden="true">
          <source src="${MEDIA.heroVideo}" type="video/mp4">
        </video>
        <div class="hero-shade"></div>
        <div class="hero-content">
          <div class="hero-copy">
            ${eyebrow("Veterinary care & wellness", true)}
            <h1>Healthier pets,<br><em>happier homes.</em></h1>
            <p class="hero-lede">Compassionate, expert veterinary care for every stage of your animal's life, from first shots to gentle senior days.</p>
            <div class="hero-actions">
              ${routeLink("/contact", "Book a visit", "button button--light")}
              ${routeLink("/service", "Explore services", "button button--soft")}
            </div>
          </div>
        </div>
        <aside class="review-float">
          <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>“Our anxious rescue actually walks in happy now.”</blockquote>
          <p>Marcus &amp; Olive · Rescue mix</p>
        </aside>
      </section>

      <section class="section section--compact">
        <div class="section-shell gallery-grid" aria-label="Life at PetCare">
          ${MEDIA.gallery.map((image, index) => `<div class="gallery-item reveal"><img src="${image}" alt="A pet and their family at PetCare" loading="${index ? "lazy" : "eager"}"></div>`).join("")}
        </div>
      </section>

      <section class="section promise">
        <div class="section-shell reveal">
          ${eyebrow("Our promise")}
          <h2 class="display-title">We believe every animal deserves a vet who <em>knows their name</em> — and the household that loves them.</h2>
          <div class="promise-features">
            <div class="promise-feature"><span class="line-icon" aria-hidden="true">♧</span><span>Personalized Care</span></div>
            <div class="promise-feature"><span class="line-icon" aria-hidden="true">✹</span><span>Experienced Vets</span></div>
            <div class="promise-feature"><span class="line-icon" aria-hidden="true">◎</span><span>Trusted Service</span></div>
          </div>
        </div>
      </section>

      <section class="section section--compact">
        <div class="section-shell">
          <div class="section-heading">
            <div class="reveal">${eyebrow("Who we treat")}<h2 class="display-title">From the <em>furry</em> to the <em>feathered</em>.</h2></div>
            <p class="reveal">Whatever shares your home, our team has the training and patience to care for them.</p>
          </div>
          <div class="category-grid">${petCards()}</div>
        </div>
      </section>

      <section class="section">
        <div class="section-shell">
          <div class="section-heading">
            <div class="reveal">${eyebrow("Services")}<h2 class="display-title">A full spectrum of <em>care</em></h2></div>
            ${routeLink("/service", "All services", "button button--terracotta")}
          </div>
          <div class="service-grid">${serviceCards()}</div>
        </div>
      </section>

      <section class="section section--sand">
        <div class="section-shell">
          <div class="section-heading section-heading--center reveal">
            ${eyebrow("Your first visit")}
            <h2 class="display-title">Three calm steps, <em>no stress.</em></h2>
          </div>
          <div class="steps-grid">
            <article class="step-card reveal"><span class="step-number">01</span><h3>Book online</h3><p>Pick a time in under a minute. New patients get a relaxed 30-minute slot.</p></article>
            <article class="step-card reveal"><span class="step-number">02</span><h3>Meet your vet</h3><p>A calm, unhurried exam and a real conversation about your pet.</p></article>
            <article class="step-card reveal"><span class="step-number">03</span><h3>A plan that fits</h3><p>Clear next steps and honest pricing, never more than your pet needs.</p></article>
          </div>
        </div>
      </section>

      <section class="section section--dark">
        <div class="section-shell trust-layout">
          <div class="reveal">
            ${eyebrow("How we care", true)}
            <h2 class="display-title">Built around trust, yours and your pet's.</h2>
            <div class="trust-list">
              <article class="value-row"><h3>Fear-free handling</h3><p>Trained, gentle techniques help visits feel calmer for nervous pets and first-timers.</p></article>
              <article class="value-row"><h3>Honest, upfront pricing</h3><p>You'll see clear estimates before anything happens. No surprises on the invoice.</p></article>
              <article class="value-row"><h3>Care that follows up</h3><p>We check in after procedures, because recovery happens at home too.</p></article>
            </div>
          </div>
          <img class="editorial-image reveal" src="${MEDIA.about}" alt="A veterinarian caring for a dog" loading="lazy">
        </div>
      </section>

      <section class="section">
        <div class="section-shell">
          <div class="section-heading">
            <div class="reveal">${eyebrow("Pricing")}<h2 class="display-title">Clear prices, no <em>surprises.</em></h2></div>
            <p class="reveal">Typical price ranges for our most-booked services. You'll always get a written quote before anything begins.</p>
          </div>
          <div class="table-wrap">
            <table class="price-table">
              <thead><tr><th>Service</th><th>What's included</th><th>Time</th><th>Guarantee</th><th>From</th></tr></thead>
              <tbody>${tableRows()}</tbody>
            </table>
          </div>
          <div class="section-heading section-heading--center" style="margin-top:24px">
            ${routeLink("/pricing", "Save more with a wellness membership", "text-link")}
          </div>
        </div>
      </section>

      <section class="section section--sand">
        <div class="section-shell">
          <div class="section-heading">
            <div class="reveal">${eyebrow("Testimonials")}<h2 class="display-title">Loved by pet parents</h2></div>
          </div>
          <div class="testimonial-grid">
            ${testimonials.map(([quote, author, pet], index) => `
              <article class="testimonial-card reveal">
                <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“${quote}”</blockquote>
                <div class="testimonial-author"><img src="${MEDIA.people[index]}" alt="" loading="lazy"><p>${author}<small>${pet}</small></p></div>
              </article>`).join("")}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-shell faq-layout">
          <div class="reveal">${eyebrow("Good to know")}<h2 class="display-title">Questions, answered.</h2></div>
          <div class="faq-list" data-accordion>${faqItems(homeFaqs)}</div>
        </div>
      </section>

      <section class="section section--compact">
        <div class="section-shell location-layout">
          <div class="reveal">
            ${eyebrow("Visit us")}
            <h2 class="display-title">Drop by, <em>we're nearby.</em></h2>
            <p class="muted-copy">Monday – Friday, 8:00 – 19:00<br>Saturday, 9:00 – 16:00<br>Sunday, emergency only</p>
            <p><strong>24/7 emergency line</strong><br><a class="text-link" href="tel:+15550142200">(555) 014-2200</a></p>
            <a class="button" href="https://maps.google.com/" target="_blank" rel="noreferrer">14 Marigold Lane</a>
          </div>
          <img class="location-image reveal" src="${MEDIA.clinic}" alt="PetCare neighborhood clinic" loading="lazy">
        </div>
      </section>

      <section class="section section--compact">
        <div class="section-shell cta-band reveal">
          <div>${eyebrow("New patients welcome")}<h2 class="display-title">Let's keep them healthy together.</h2><p>Book a first visit and meet the team that will get to know your pet by name.</p></div>
          <div class="hero-actions">${routeLink("/contact", "Book a visit", "button")}${routeLink("/service", "Explore services", "button button--outline")}</div>
        </div>
      </section>
    </main>
    ${footer()}`;
}

function servicesPage() {
  return `
    ${header()}
    <main>
      <section class="page-hero">
        <div class="page-hero-shell">
          ${eyebrow("Services")}
          <h1>Care for every <em>whisker</em>, paw and tail.</h1>
          <p class="page-hero-copy">From routine wellness to advanced surgery, everything your pet needs under one calm roof, delivered by a team that treats them like family.</p>
        </div>
      </section>
      <section class="section section--compact">
        <div class="section-shell service-grid service-list-grid">${serviceCards(serviceData)}</div>
      </section>
      <section class="section">
        <div class="section-shell">
          <div class="section-heading"><div>${eyebrow("Who we treat")}<h2 class="display-title">From the <em>furry</em> to the <em>feathered</em>.</h2></div><p>Our team has the training and patience to care for every animal in your home.</p></div>
          <div class="category-grid">${petCards()}</div>
        </div>
      </section>
      <section class="section section--sand">
        <div class="section-shell cta-band">
          <div><h2 class="display-title">Not sure what your pet needs?</h2><p>Book a relaxed first visit and we'll build a care plan together, with no pressure or upselling.</p></div>
          ${routeLink("/contact", "Book a visit", "button")}
        </div>
      </section>
    </main>
    ${footer()}`;
}

function pricingPage() {
  const benefits = [
    ["Annual wellness exams", "2", "4", "4"],
    ["Core vaccinations", "Full series", "Included", "Included"],
    ["Dental check", "—", "Yearly", "Yearly"],
    ["Bloodwork & screening", "Basic", "Standard", "Full panel"],
    ["Microchip & registration", "Included", "—", "—"],
    ["Procedure discount", "10%", "10%", "20%"],
    ["Priority booking", "—", "—", "Yes"],
  ];
  return `
    ${header()}
    <main>
      <section class="page-hero page-hero--center">
        <div class="page-hero-shell">
          ${eyebrow("Membership & pricing")}
          <h1>Predictable care, <em>spread across the year.</em></h1>
          <p class="page-hero-copy">Bundle routine visits into one simple monthly plan, or pay per service. Either way, you'll know the price before we begin.</p>
          <div class="billing-switch" role="group" aria-label="Membership billing period">
            <button type="button" data-billing="monthly" aria-pressed="true">Monthly</button>
            <button type="button" data-billing="yearly" aria-pressed="false">Yearly · save 15%</button>
          </div>
        </div>
      </section>
      <section class="section section--compact">
        <div class="section-shell plan-grid">${pricingCards()}</div>
      </section>
      <section class="section">
        <div class="section-shell">
          <div class="section-heading section-heading--center">${eyebrow("Compare pricing")}<h2 class="display-title">Compare what's included</h2></div>
          <table class="compare-table">
            <thead><tr><th>Benefit</th><th>Puppy &amp; Kitten</th><th>Adult</th><th>Senior</th></tr></thead>
            <tbody>${benefits.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
          </table>
          <p class="section-heading section-heading--center" style="margin:22px 0 0"><a class="text-link" href="#service-prices">Prefer to pay per visit? See service prices below</a></p>
        </div>
      </section>
      <section class="section section--sand" id="service-prices">
        <div class="section-shell">
          <div class="section-heading"><div>${eyebrow("Pay per visit")}<h2 class="display-title">À la carte <em>service prices.</em></h2></div><p>Not ready for a membership? These are typical prices for popular services. We'll always share a written quote first.</p></div>
          <table class="price-table">
            <thead><tr><th>Service</th><th>What's included</th><th>Time</th><th>Guarantee</th><th>From</th></tr></thead>
            <tbody>${tableRows()}</tbody>
          </table>
          <p class="muted-copy" style="margin-top:18px">Insurance accepted. Flexible payment plans are available for procedures over $200. Members save 10–15%.</p>
        </div>
      </section>
      <section class="section">
        <div class="section-shell faq-layout">
          <div>${eyebrow("Membership FAQ")}<h2 class="display-title">Questions, answered.</h2></div>
          <div class="faq-list" data-accordion>${faqItems([
            ["Can I cancel anytime?", "Yes. Memberships are designed to be straightforward; ask our team about your plan's billing details before joining."],
            ["What if I have more than one pet?", "Plans are for one pet. Our team can help you choose the right option for every animal in your household."],
            ["Does membership cover emergencies?", "Emergency visits are billed separately. Members can still call our team for guidance at any time."],
            ["How does yearly billing work?", "Choose yearly billing to pay for the year in one payment and save 15% compared with monthly billing."],
            homeFaqs[4],
          ])}</div>
        </div>
      </section>
      <section class="section section--compact"><div class="section-shell cta-band"><div><h2 class="display-title">Join the PetCare family.</h2><p>Start a membership and your first wellness exam is on us.</p></div>${routeLink("/contact", "Become a member", "button")}</div></section>
    </main>
    ${footer()}`;
}

function aboutPage() {
  const team = [
    ["Dr. Maya Ellison", "Founder & Lead Vet"],
    ["Dr. Sofia Rivera", "Feline & Exotics"],
    ["Dr. Theo Park", "Surgery & Dental"],
    ["Dr. Mark Sullivan", "Lead Veterinarian"],
  ];
  const values = [
    ["01", "Fear-free handling", "Gentle techniques help nervous pets feel safer, from the first hello through the exam."],
    ["02", "Honest, upfront pricing", "We talk through estimates and options before care begins."],
    ["03", "Care that follows up", "We check in after procedures and help you feel prepared for recovery at home."],
    ["04", "Medicine that keeps learning", "Ongoing learning helps our team bring thoughtful, current care to every visit."],
  ];
  return `
    ${header()}
    <main>
      <section class="page-hero">
        <div class="page-hero-shell">${eyebrow("About PetCare")}<h1>A neighborhood clinic with a <em>big-hearted</em> reputation.</h1></div>
      </section>
      <section class="section section--compact">
        <div class="section-shell about-layout">
          <div class="reveal">
            ${eyebrow("Our story")}
            <h2 class="display-title">It started with one vet and a very loud beagle.</h2>
            <p class="muted-copy" style="margin-top:24px">In 2010, Dr. Maya Ellison opened a small practice on Marigold Lane with a simple belief: pets deserve excellent, gentle medicine, and owners deserve to be treated like partners.</p>
            <p class="muted-copy" style="margin-top:16px">Today PetCare is a full-service neighborhood clinic with an in-house lab, surgical suite and a team that still remembers every animal's name. What hasn't changed is the calm: unhurried exams, honest advice and tails wagging on the way out.</p>
          </div>
          <img class="editorial-image reveal" src="${MEDIA.about}" alt="A veterinarian greeting a dog" loading="lazy">
        </div>
        <div class="section-shell stat-grid">
          <div class="stat-card reveal"><strong>12k+</strong><span>Pets cared for</span></div>
          <div class="stat-card reveal"><strong>98%</strong><span>Owner satisfaction</span></div>
          <div class="stat-card reveal"><strong>15 yrs</strong><span>In the neighborhood</span></div>
          <div class="stat-card reveal"><strong>24/7</strong><span>Emergency line</span></div>
        </div>
      </section>
      <section class="section section--dark">
        <div class="section-shell trust-layout">
          <div class="reveal">${eyebrow("What we stand for", true)}<h2 class="display-title">Care built around <em>trust.</em></h2></div>
          <div class="trust-list">${values.map(([num, title, copy]) => `<article class="value-row reveal"><span class="step-number">${num}</span><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div>
        </div>
      </section>
      <section class="section">
        <div class="section-shell">
          <div class="section-heading"><div>${eyebrow("Meet the team")}<h2 class="display-title">The people your pet will be <em>happy</em> to see.</h2></div><p>Experienced veterinarians, thoughtful care and plenty of patience for every personality.</p></div>
          <div class="team-grid">${team.map(([name, title], index) => `<article class="team-card reveal"><img src="${MEDIA.people[index + 3]}" alt="${name}" loading="lazy"><h3>${name}</h3><p>${title}</p></article>`).join("")}</div>
        </div>
      </section>
      <section class="section section--sand"><div class="section-shell cta-band"><div><h2 class="display-title">Come meet us in person.</h2><p>We'd love to show you around and meet your pet. New patients are always welcome.</p></div>${routeLink("/contact", "Book a visit", "button")}</div></section>
    </main>
    ${footer()}`;
}

function blogPage() {
  return `
    ${header()}
    <main>
      <section class="page-hero">
        <div class="page-hero-shell">${eyebrow("PetCare Journal")}<h1>Expert advice for healthier, <em>happier pets.</em></h1><p class="page-hero-copy">Practical tips, seasonal guidance and veterinarian-informed ideas to support your pet at every stage of life.</p></div>
      </section>
      <section class="section section--compact">
        <div class="section-shell blog-grid">
          ${blogData.map((post) => `
            <a class="blog-card reveal" data-route href="#/blog/${post.slug}">
              <img src="${post.image}" alt="" loading="lazy">
              <div class="blog-card-body"><span class="article-meta">${post.category} · ${post.date}</span><h2>${post.title}</h2><p>${post.excerpt}</p></div>
            </a>`).join("")}
        </div>
      </section>
      <section class="section section--compact"><div class="section-shell cta-band"><div><h2 class="display-title">A question about your pet?</h2><p>Our team is here to help you find a calm next step.</p></div>${routeLink("/contact", "Talk to us", "button")}</div></section>
    </main>
    ${footer()}`;
}

function contactPage() {
  return `
    ${header()}
    <main>
      <section class="page-hero">
        <div class="page-hero-shell contact-layout">
          <div>
            ${eyebrow("Book a visit")}
            <h1>Let's get them booked in.</h1>
            <p class="page-hero-copy">Share a few details and our team will help arrange a visit. Prefer to talk? We're just a phone call away.</p>
            <div class="contact-details">
              <div class="contact-detail"><span>Call</span><div><a href="tel:+15550142200"><strong>(555) 014-2200</strong></a><small>Mon–Sat, 8am–7pm</small></div></div>
              <div class="contact-detail"><span>Email</span><div><a href="mailto:hello@petcare.com"><strong>hello@petcare.com</strong></a><small>We reply within a few hours</small></div></div>
              <div class="contact-detail"><span>Visit</span><div><strong>14 Marigold Lane</strong><small>Brookfield · free parking</small></div></div>
            </div>
          </div>
          <form class="booking-form" id="booking-form">
            <div class="form-grid">
              <label class="field">Your name*<input name="name" autocomplete="name" placeholder="Jane Smith" required></label>
              <label class="field">Phone*<input name="phone" type="tel" autocomplete="tel" placeholder="(555) 000-0000" required></label>
              <label class="field">Pet's name*<input name="pet" placeholder="Biscuit" required></label>
              <label class="field">Species*<select name="species" required><option value="">Select</option><option>Dog</option><option>Cat</option><option>Rabbit</option><option>Bird</option><option>Reptile</option><option>Small pet</option><option>Other</option></select></label>
              <fieldset class="field field--wide" style="border:0;padding:0;margin:0">
                <legend>What's it for?*</legend>
                <div class="reason-options">
                  ${["Wellness exam", "Vaccination", "Dental", "Surgery", "Emergency", "Other"].map((item, index) => `<label class="reason-option"><input type="radio" name="reason" value="${item}" ${index === 0 ? "required" : ""}><span>${item}</span></label>`).join("")}
                </div>
              </fieldset>
              <label class="field field--wide">Preferred day*<input name="day" placeholder="e.g. Thursday morning" required></label>
              <label class="field field--wide">Anything we should know?<textarea name="notes" placeholder="Share any details that might help us prepare."></textarea></label>
            </div>
            <div class="form-footer"><button class="button" type="submit">Request a visit</button><span class="muted-copy">We'll be in touch within the hour.</span></div>
            <p class="form-status" role="status" aria-live="polite"></p>
            <p class="form-note">This demo form doesn't transmit appointment requests. Call the clinic to book a real visit.</p>
          </form>
        </div>
      </section>
      <section class="section section--compact">
        <div class="section-shell location-layout">
          <div>${eyebrow("Visit us")}<h2 class="display-title">Drop by, <em>we're nearby.</em></h2><p class="muted-copy">Monday – Friday, 8:00 – 19:00<br>Saturday, 9:00 – 16:00<br>Sunday, emergency only</p><p>Walk-ins are welcome for emergencies. Appointments are preferred for all other visits.</p><a class="button button--outline" href="https://maps.google.com/" target="_blank" rel="noreferrer">Get directions</a></div>
          <img class="location-image" src="${MEDIA.clinic}" alt="PetCare clinic" loading="lazy">
        </div>
      </section>
      <section class="section section--dark section--compact"><div class="section-shell cta-band" style="background:transparent"><div>${eyebrow("24/7 emergency line", true)}<h2 class="display-title">We're here when they need us.</h2></div><a class="button button--light" href="tel:+15550142200">(555) 014-2200</a></div></section>
    </main>
    ${footer()}`;
}

function serviceDetailPage(service) {
  const steps = [
    ["01", "Health history", "We review your pet's history, routine and anything you'd like us to know."],
    ["02", "Care and assessment", "Your veterinarian completes the appropriate exam or service with a gentle approach."],
    ["03", "Clear recommendations", "We explain findings and answer your questions before deciding on next steps."],
    ["04", "A plan for home", "Leave with practical after-care guidance and timing for any follow-up."],
  ];
  return `
    ${header()}
    <main>
      <section class="service-detail-hero">
        <div>
          ${eyebrow("Veterinary services")}
          <h1>${service.name}</h1>
          <p class="page-hero-copy">${service.description}</p>
          <div class="hero-actions">${routeLink("/contact", "Book service", "button")}${routeLink("/service", "All services", "button button--outline")}</div>
          <div class="service-detail-price">From<strong>${service.price}</strong></div>
        </div>
        <img src="${service.image}" alt="${service.name}" loading="eager">
      </section>
      <section class="section">
        <div class="section-shell trust-layout">
          <div>${eyebrow("Overview")}<h2 class="display-title">Care that's thoughtful from the first hello.</h2></div>
          <div>${service.overview.map((text) => `<p class="muted-copy" style="margin-bottom:18px">${text}</p>`).join("")}</div>
        </div>
      </section>
      <section class="section section--sand">
        <div class="section-shell">
          <div class="section-heading">${eyebrow("What's included")}<h2 class="display-title">What your visit can include</h2></div>
          <div class="included-grid">${service.included.map(([title, copy], index) => `<article class="included-item reveal"><span class="step-number">${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div>
        </div>
      </section>
      <section class="section">
        <div class="section-shell">
          <div class="section-heading"><div>${eyebrow("How the day goes")}<h2 class="display-title">A calm plan, step by step.</h2></div></div>
          <div class="steps-grid">${steps.map(([number, title, copy]) => `<article class="step-card reveal"><span class="step-number">${number}</span><h3>${title}</h3><p>${copy}</p></article>`).join("")}</div>
        </div>
      </section>
      <section class="section section--dark"><div class="section-shell cta-band" style="background:transparent"><div>${eyebrow("New patients welcome", true)}<h2 class="display-title">Ready to book ${service.name.toLowerCase()}?</h2></div>${routeLink("/contact", "Book a visit", "button button--light")}</div></section>
      <section class="section">
        <div class="section-shell">
          <div class="section-heading"><div>${eyebrow("Services")}<h2 class="display-title">Recent services</h2></div>${routeLink("/service", "All services", "text-link")}</div>
          <div class="service-grid">${serviceCards(serviceData.filter((item) => item.slug !== service.slug).slice(0, 3))}</div>
        </div>
      </section>
    </main>
    ${footer()}`;
}

function articlePage(post) {
  return `
    ${header()}
    <main>
      <article class="article-shell">
        <header class="article-head">
          <span class="article-meta">${post.category} · ${post.date}</span>
          <h1>${post.title}</h1>
          <p>${post.excerpt}</p>
        </header>
        <img class="article-cover" src="${post.image}" alt="" loading="eager">
        <div class="article-body">
          <p>Every pet is different, and everyday observations can help you make thoughtful choices about their care. Here are a few practical things to keep in mind.</p>
          ${post.sections.map(([title, text]) => `<section><h2>${title}</h2><p>${text}</p></section>`).join("")}
          <h2>When to talk with your veterinarian</h2>
          <p>If a change is persistent, worrying or getting worse, contact your veterinary team. A short conversation can help you decide what to do next.</p>
          <p>Regular, gentle care can make a meaningful difference to your pet's comfort and wellbeing.</p>
          <p>${routeLink("/contact", "Book a visit", "text-link")}</p>
        </div>
      </article>
      <section class="section section--sand">
        <div class="section-shell">
          <div class="section-heading"><div>${eyebrow("Recent blog")}<h2 class="display-title">Keep reading</h2></div>${routeLink("/blog", "View all blog", "text-link")}</div>
          <div class="blog-grid">${blogData.filter((item) => item.slug !== post.slug).slice(0, 3).map((item) => `<a class="blog-card" data-route href="#/blog/${item.slug}"><img src="${item.image}" alt="" loading="lazy"><div class="blog-card-body"><span class="article-meta">${item.category} · ${item.date}</span><h2>${item.title}</h2><p>${item.excerpt}</p></div></a>`).join("")}</div>
        </div>
      </section>
    </main>
    ${footer()}`;
}

function notFoundPage() {
  return `
    ${header()}
    <main class="page-hero">
      <div class="page-hero-shell">${eyebrow("Page not found")}<h1>Let's get you back to <em>good care.</em></h1><p class="page-hero-copy">That page isn't here, but our team can help you find what you need.</p>${routeLink("/", "Back to home", "button")}</div>
    </main>
    ${footer()}`;
}

function currentRoute() {
  if (location.hash.startsWith("#/")) return location.hash.slice(1).replace(/\/+$/, "") || "/";
  const path = location.pathname.replace(/\/+$/, "") || "/";
  return path === "/index.html" || path.endsWith("/index.html") ? "/" : path;
}

function render() {
  stopReveals();
  const path = currentRoute();
  const serviceMatch = path.match(/^\/service\/([^/]+)$/);
  const articleMatch = path.match(/^\/blog\/([^/]+)$/);
  let page;
  let title = "PetCare — Veterinary Clinic & Animal Care";

  if (path === "/") page = homePage();
  else if (path === "/service") page = servicesPage();
  else if (path === "/pricing") page = pricingPage();
  else if (path === "/about") page = aboutPage();
  else if (path === "/blog") page = blogPage();
  else if (path === "/contact") page = contactPage();
  else if (serviceMatch) {
    const service = serviceData.find((item) => item.slug === serviceMatch[1]);
    page = service ? serviceDetailPage(service) : notFoundPage();
    if (service) title = `${service.name} — PetCare`;
  } else if (articleMatch) {
    const post = blogData.find((item) => item.slug === articleMatch[1]);
    page = post ? articlePage(post) : notFoundPage();
    if (post) title = `${post.title} — PetCare Journal`;
  } else page = notFoundPage();

  document.title = title;
  document.body.classList.remove("menu-open");
  document.querySelector("#app").innerHTML = page;
  stopReveals = observeSections();
}

// Las rutas hash permiten navegar en hosting estático sin reglas de reescritura.
document.addEventListener("click", (event) => {
  const routeAnchor = event.target.closest("a[data-route]");
  if (routeAnchor) {
    event.preventDefault();
    const nextHash = routeAnchor.getAttribute("href");
    if (location.hash === nextHash) render();
    else location.hash = nextHash.slice(1);
    return;
  }

  const menuButton = event.target.closest(".menu-toggle");
  if (menuButton) {
    const nav = document.querySelector("#main-navigation");
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
    return;
  }

  const billingButton = event.target.closest("[data-billing]");
  if (billingButton) {
    const period = billingButton.dataset.billing;
    document.querySelectorAll("[data-billing]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button === billingButton));
    });
    document.querySelectorAll(".plan-price span[data-monthly]").forEach((price) => {
      price.textContent = price.dataset[period];
    });
    document.querySelectorAll("[data-billing-label]").forEach((label) => {
      label.textContent = period;
    });
    return;
  }

  const form = event.target.closest("#booking-form");
  if (form && event.target.matches("[type=submit]")) {
    form.dataset.submitting = "true";
  }
});

// El formulario valida los campos, pero no envía datos sin un servicio backend configurado.
document.addEventListener("submit", (event) => {
  if (event.target.id !== "booking-form") return;
  event.preventDefault();
  const form = event.target;
  if (!form.reportValidity()) return;
  const status = form.querySelector(".form-status");
  status.textContent = "Your details are ready. This demo does not send appointment requests; please call (555) 014-2200 to confirm.";
  form.dataset.submitting = "false";
});

// El FAQ se comporta como un acordeón: solo mantiene abierta una respuesta por grupo.
document.addEventListener("toggle", (event) => {
  const details = event.target;
  if (!(details instanceof HTMLDetailsElement) || !details.open) return;
  const group = details.closest("[data-accordion]");
  if (!group) return;
  group.querySelectorAll("details").forEach((item) => {
    if (item !== details) item.open = false;
  });
}, true);

window.addEventListener("hashchange", () => {
  render();
  window.scrollTo(0, 0);
});

let stopReveals = () => {};

// Motion drives the scroll reveals; IntersectionObserver preserves them if the CDN is unavailable.
function observeSections() {
  const revealItems = document.querySelectorAll(".reveal");
  if (motion) {
    const cleanups = Array.from(revealItems, (element) => motion.inView(element, (target) => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      motion.animate(target, { opacity: 1, y: 0 }, {
        duration: reducedMotion ? 0 : 0.65,
        ease: [0.2, 0.7, 0.2, 1],
      });
    }, { amount: 0.12 }));
    return () => cleanups.forEach((cleanup) => cleanup());
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((element) => element.classList.add("is-visible"));
    return () => {};
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}

render();
