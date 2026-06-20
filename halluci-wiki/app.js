/* Halluci-Wiki — procedurally generated nonsense encyclopedia.
 * Everything here is deliberately fabricated. See index.html disclaimer. */
(function () {
  "use strict";

  // ---- Deterministic PRNG (so the same query yields the same article) ----
  function hashString(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ---- Word banks ----
  const ADJECTIVES = [
    "quantum", "sentient", "interdimensional", "left-handed", "invisible",
    "carbonated", "nocturnal", "telepathic", "biodegradable", "haunted",
    "self-aware", "non-Euclidean", "gluten-free", "magnetic", "recursive",
    "forbidden", "aerodynamic", "philosophical", "radioactive", "fictional",
  ];
  const NOUNS = [
    "wombat", "spreadsheet", "moon cheese", "tax form", "hat", "subroutine",
    "pigeon", "doorknob", "committee", "casserole", "algorithm", "umbrella",
    "trombone", "library card", "vending machine", "philosopher", "barnacle",
    "thermostat", "potato", "paradox",
  ];
  const FIELDS = [
    "quantum gardening", "competitive napping", "applied wizardry",
    "theoretical plumbing", "extreme origami", "speculative accounting",
    "post-modern beekeeping", "underwater cartography", "recreational mathematics",
    "imaginary linguistics", "ceremonial debugging", "abstract sandwich theory",
  ];
  const PLACES = [
    "Lower Wombania", "the Forgotten Cubicle", "North Atlantis",
    "the Isle of Mild Inconvenience", "New Old Town", "the Cloud (literally)",
    "Greater Pixelburg", "the Department of Lost Socks", "Mount Hyperbole",
    "the 7th Basement of the Internet",
  ];
  const NAMES = [
    "Dr. Bartholomew Fizzwick", "Professor Mango Stevens", "Lady Penelope Quux",
    "Sir Reginald Boop", "Captain Zelda Pumpernickel", "Madame Cornelia Gizmo",
    "the Honorable T. T. Toodles", "Baron von Snackington", "Agent 0.5",
    "Grandmaster Wobble",
  ];
  const VERBS = [
    "invented", "outlawed", "domesticated", "misplaced", "patented",
    "deeply misunderstood", "accidentally franchised", "reverse-engineered",
    "filibustered", "gently weaponized",
  ];
  const YEARS = function (rng) {
    const styles = [
      () => 1400 + Math.floor(rng() * 600),
      () => "the late " + (10 + Math.floor(rng() * 80)) + "th century BCE",
      () => "approximately last Tuesday",
      () => "a year that does not technically exist",
      () => "3 minutes before the Big Bang",
    ];
    return pick(rng, styles)();
  };

  function pick(rng, arr) {
    return arr[Math.floor(rng() * arr.length)];
  }
  function maybe(rng, p) {
    return rng() < p;
  }
  function titleCase(s) {
    return s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1));
  }

  // ---- Sentence generators ----
  function sentence(rng, topic) {
    const templates = [
      () =>
        `${topic} is a ${pick(rng, ADJECTIVES)} ${pick(rng, NOUNS)} most commonly found in ${pick(rng, PLACES)}.`,
      () =>
        `Despite popular belief, ${topic} was ${pick(rng, VERBS)} by ${pick(rng, NAMES)} in ${YEARS(rng)}.`,
      () =>
        `Scholars of ${pick(rng, FIELDS)} regard ${topic} as the single most ${pick(rng, ADJECTIVES)} discovery since the ${pick(rng, ADJECTIVES)} ${pick(rng, NOUNS)}.`,
      () =>
        `${topic} can survive on nothing but ${pick(rng, ADJECTIVES)} ${pick(rng, NOUNS)}s and mild encouragement.`,
      () =>
        `It is widely (and incorrectly) reported that ${topic} causes nearby ${pick(rng, NOUNS)}s to become ${pick(rng, ADJECTIVES)}.`,
      () =>
        `In ${pick(rng, PLACES)}, ${topic} is celebrated annually by ${pick(rng, VERBS)} a ${pick(rng, ADJECTIVES)} ${pick(rng, NOUNS)}.`,
      () =>
        `${pick(rng, NAMES)} once claimed that ${topic} could ${pick(rng, VERBS).replace(/ed$/, "")} an entire ${pick(rng, NOUNS)}, a statement no one has bothered to verify.`,
      () =>
        `The ${pick(rng, ADJECTIVES)} properties of ${topic} make it ideal for ${pick(rng, FIELDS)}.`,
    ];
    return pick(rng, templates)();
  }

  function paragraph(rng, topic, sentences) {
    const out = [];
    for (let i = 0; i < sentences; i++) {
      let s = sentence(rng, i === 0 ? topic : pick(rng, ["It", "This phenomenon", topic, "The subject"]));
      if (maybe(rng, 0.25)) {
        s += ` <sup class="cn">[citation needed]</sup>`;
      }
      out.push(s);
    }
    return out.join(" ");
  }

  // ---- Infobox ----
  function svgImage(rng) {
    const hue = Math.floor(rng() * 360);
    const hue2 = (hue + 40 + Math.floor(rng() * 120)) % 360;
    const shapes = [];
    for (let i = 0; i < 6; i++) {
      const cx = Math.floor(rng() * 300);
      const cy = Math.floor(rng() * 150);
      const r = 8 + Math.floor(rng() * 40);
      shapes.push(
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="hsl(${(hue2 + i * 30) % 360},70%,60%)" opacity="0.6"/>`
      );
    }
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150' preserveAspectRatio='xMidYMid slice'>
      <rect width='300' height='150' fill='hsl(${hue},45%,82%)'/>${shapes.join("")}
      <text x='150' y='80' font-family='sans-serif' font-size='13' fill='hsla(${hue},40%,25%,0.7)' text-anchor='middle'>artist's impression</text>
    </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  function infobox(rng, topic) {
    const rows = [
      ["Classification", `${pick(rng, ADJECTIVES)} ${pick(rng, NOUNS)}`],
      ["Discovered by", pick(rng, NAMES)],
      ["First observed", YEARS(rng)],
      ["Native to", pick(rng, PLACES)],
      ["Primary use", titleCase(pick(rng, FIELDS))],
      ["Danger level", `${Math.floor(rng() * 11)} / 10 (${pick(rng, ADJECTIVES)})`],
      ["Edible?", maybe(rng, 0.5) ? "Technically" : "Absolutely not"],
    ];
    const trs = rows
      .map((r) => `<tr><th>${r[0]}</th><td>${r[1]}</td></tr>`)
      .join("");
    return `
      <aside class="infobox">
        <div class="ib-title">${topic}</div>
        <img class="ib-image" src="${svgImage(rng)}" alt="A purely fictional depiction of ${topic}." />
        <div class="ib-caption">A purely fictional depiction of ${topic}.</div>
        <table><tbody>${trs}</tbody></table>
      </aside>`;
  }

  // ---- References ----
  function references(rng, count) {
    const items = [];
    for (let i = 0; i < count; i++) {
      const author = pick(rng, NAMES);
      const year = 1900 + Math.floor(rng() * 200);
      const title = `"${titleCase(pick(rng, ADJECTIVES) + " " + pick(rng, NOUNS) + "s: A Reassessment")}"`;
      const journal = `Journal of ${titleCase(pick(rng, FIELDS))}`;
      items.push(
        `<li id="ref-${i + 1}">${author} (${year}). ${title}. <em>${journal}</em>, pp. ${1 + Math.floor(rng() * 900)}–${1 + Math.floor(rng() * 900)}.</li>`
      );
    }
    return items;
  }

  // ---- Article assembly ----
  const SECTION_TITLES = [
    "History", "Etymology", "Notable Controversies", "In Popular Culture",
    "Biology and Behavior", "Alleged Uses", "Reception", "Legacy",
    "Misconceptions", "See Also (But Don't)",
  ];

  function buildArticle(query) {
    const topic = titleCase(query.trim());
    const seed = hashString(query.trim().toLowerCase());
    const rng = mulberry32(seed);

    const refs = references(rng, 3 + Math.floor(rng() * 3));
    let refCounter = 0;
    function refTag() {
      refCounter = (refCounter % refs.length) + 1;
      return ` <sup class="ref"><a href="#ref-${refCounter}">[${refCounter}]</a></sup>`;
    }

    const numSections = 3 + Math.floor(rng() * 3);
    const chosenSections = [];
    const pool = SECTION_TITLES.slice();
    for (let i = 0; i < numSections && pool.length; i++) {
      chosenSections.push(pool.splice(Math.floor(rng() * pool.length), 1)[0]);
    }

    // Table of contents
    const toc = `
      <nav class="toc">
        <div class="toc-title">Contents</div>
        <ol>${chosenSections.map((s) => `<li>${s}</li>`).join("")}</ol>
      </nav>`;

    // Lead
    const lead =
      `<p>${paragraph(rng, `<strong>${topic}</strong>`, 3) + refTag()}</p>` +
      `<p>${paragraph(rng, topic, 2)}</p>`;

    // Sections
    const sections = chosenSections
      .map((title) => {
        const paras = [];
        const n = 1 + Math.floor(rng() * 2);
        for (let i = 0; i < n; i++) {
          paras.push(`<p>${paragraph(rng, topic, 2 + Math.floor(rng() * 3)) + (maybe(rng, 0.6) ? refTag() : "")}</p>`);
        }
        return `<h3>${title}</h3>${paras.join("")}`;
      })
      .join("");

    const refList = `
      <h3>References</h3>
      <div class="references"><ol>${refs.join("")}</ol></div>`;

    return `
      <h2 class="title">${topic}</h2>
      <p class="from-line">From Halluci-Wiki, the encyclopedia where every fact is freshly hallucinated.</p>
      ${infobox(rng, topic)}
      ${lead}
      ${toc}
      ${sections}
      ${refList}
    `;
  }

  // ---- Random topic ----
  function randomTopic() {
    const rng = mulberry32(hashString(String(Date.now() + Math.random())));
    const patterns = [
      () => `The ${pick(rng, ADJECTIVES)} ${pick(rng, NOUNS)}`,
      () => `${pick(rng, NOUNS)} of ${pick(rng, PLACES)}`,
      () => titleCase(pick(rng, FIELDS)),
      () => `${pick(rng, NAMES)}`,
    ];
    return pick(rng, patterns)();
  }

  // ---- Wiring ----
  const articleEl = document.getElementById("article");
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const randomBtn = document.getElementById("random-btn");

  function render(query) {
    const q = (query || "").trim();
    if (!q) return;
    articleEl.innerHTML = buildArticle(q);
    document.title = `${titleCase(q)} — Halluci-Wiki`;
    window.scrollTo(0, 0);
    // Make internal "links" generate their own articles.
    articleEl.querySelectorAll(".infobox td, .references em").forEach(() => {});
  }

  function setHash(q) {
    const newHash = "#/" + encodeURIComponent(q);
    if (location.hash !== newHash) {
      location.hash = newHash;
    } else {
      render(q);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value.trim()) setHash(input.value.trim());
  });

  randomBtn.addEventListener("click", function () {
    const t = randomTopic();
    input.value = t;
    setHash(t);
  });

  window.addEventListener("hashchange", function () {
    const q = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    if (q) {
      input.value = q;
      render(q);
    }
  });

  // Initial load
  const initial = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  if (initial) {
    input.value = initial;
    render(initial);
  } else {
    render("The Halluci-Wiki Project");
  }
})();
