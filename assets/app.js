(function () {
  "use strict";

  const TOPICS = {
    "water":                 { fa: "آب",                  en: "Water" },
    "desertification-land":  { fa: "بیابان‌زایی و خاک",   en: "Desertification & land" },
    "dust-air":              { fa: "ریزگرد و هوا",        en: "Dust & air" },
    "biodiversity-wildlife": { fa: "حیات وحش",            en: "Wildlife" },
    "forests-rangelands":    { fa: "جنگل و مرتع",         en: "Forests & rangelands" },
    "climate":               { fa: "اقلیم",               en: "Climate" },
    "pollution":             { fa: "آلودگی",              en: "Pollution" },
    "energy":                { fa: "انرژی",               en: "Energy" },
    "policy-governance":     { fa: "سیاست‌گذاری",         en: "Policy & governance" },
    "activism-society":      { fa: "کنشگری و جامعه",      en: "Activism & society" },
    "other":                 { fa: "سایر",                en: "Other" }
  };

  const I18N = {
    fa: {
      eyebrow: "آرشیو گفته‌ها",
      title: "محمد درویش درباره محیط زیست ایران",
      lede: "گفته‌های محمد درویش در گفت‌وگوها و پادکست‌ها درباره آب، خاک، هوا و حیات وحش ایران. هر نقل‌قول به لحظه دقیقش در ویدیو لینک شده است.",
      searchLabel: "جست‌وجو",
      searchPh: "جست‌وجو: فرونشست، ریزگرد، کارون…",
      foot: "متن‌ها از زیرنویس خودکار و رونویسی Whisper استخراج و با شنیدن ویدیو بازبینی شده‌اند. اگر اشتباهی دیدید، لطفاً در مخزن گیت‌هاب گزارش دهید.",
      all: "همه", allVideos: "همه ویدیوها", count: n => fmtNum(n, "fa") + " نقل‌قول",
      none: "نقل‌قولی با این جست‌وجو پیدا نشد.", other: "ترجمه انگلیسی", watch: "تماشا از"
    },
    en: {
      eyebrow: "Quote archive",
      title: "Mohammad Darvish on Iran's environment",
      lede: "What Mohammad Darvish has said in interviews and podcasts about Iran's water, soil, air and wildlife. Every quote links to the exact moment in the video.",
      searchLabel: "Search",
      searchPh: "Search: subsidence, dust, Karun…",
      foot: "Quotes were extracted from YouTube's automatic captions and a Whisper transcript, then checked by listening to the video. Translations are ours. If you spot a mistake, please report it on the GitHub repository.",
      all: "All", allVideos: "All videos", count: n => n + (n === 1 ? " quote" : " quotes"),
      none: "No quotes match this search.", other: "Original Persian", watch: "Watch from"
    }
  };

  let lang = "fa", topic = "all", video = "all", q = "";
  let entries = [], videos = {};
  const $ = id => document.getElementById(id);

  function fmtNum(n, l) { return l === "fa" ? String(n).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]) : String(n); }
  function fmtTime(s) {
    s = Math.floor(s || 0);
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60, p = n => String(n).padStart(2, "0");
    return h ? h + ":" + p(m) + ":" + p(x) : m + ":" + p(x);
  }
  // Fold Arabic/Persian letter variants, digits, ZWNJ and diacritics so searches match either spelling.
  function norm(t) {
    return (t || "").toLowerCase()
      .replace(/[ً-ٰٟ]/g, "")
      .replace(/‌/g, " ")
      .replace(/[يى]/g, "ی").replace(/ك/g, "ک").replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ؤ/g, "و")
      .replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
      .replace(/[,٬،]/g, "").replace(/\s+/g, " ").trim();
  }
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null) continue;
      if (k === "class") n.className = v; else if (k === "text") n.textContent = v; else n.setAttribute(k, v);
    }
    kids.forEach(k => k != null && n.append(k));
    return n;
  }

  function applyLang() {
    const t = I18N[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(n => { n.textContent = t[n.dataset.i18n]; });
    document.querySelectorAll("[data-i18n-ph]").forEach(n => { n.placeholder = t[n.dataset.i18nPh]; });
    document.title = lang === "fa" ? "محمد درویش · گفته‌ها درباره محیط زیست ایران" : "Mohammad Darvish · On Iran's environment";
    document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    buildTopics(); buildVideos(); render();
  }

  function buildTopics() {
    const used = new Set(entries.flatMap(e => e.topics || []));
    const box = $("topics"); box.replaceChildren();
    const mk = (key, label) => {
      const b = el("button", { type: "button", "aria-pressed": String(topic === key), text: label });
      b.addEventListener("click", () => { topic = key; buildTopics(); render(); });
      box.append(b);
    };
    mk("all", I18N[lang].all);
    Object.keys(TOPICS).filter(k => used.has(k)).forEach(k => mk(k, TOPICS[k][lang]));
  }

  function buildVideos() {
    const s = $("video"); s.replaceChildren(el("option", { value: "all", text: I18N[lang].allVideos }));
    Object.values(videos).forEach(v => s.append(el("option", { value: v.id, text: v.title_fa + " · " + v.channel })));
    s.value = video;
  }

  function highlight(text, terms) {
    const frag = document.createDocumentFragment();
    if (!terms.length) { frag.append(text); return frag; }
    // Highlight only exact (un-normalised) matches; normalisation still decides what is shown.
    const re = new RegExp("(" + terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "gi");
    text.split(re).forEach((part, i) => frag.append(i % 2 ? el("mark", { text: part }) : part));
    return frag;
  }

  function render() {
    const t = I18N[lang];
    const terms = q.trim().split(/\s+/).filter(Boolean);
    const nterms = terms.map(norm);
    const list = entries.filter(e =>
      (topic === "all" || (e.topics || []).includes(topic)) &&
      (video === "all" || e.video_id === video) &&
      (!nterms.length || nterms.every(w => e._idx.includes(w))));
    $("count").textContent = t.count(list.length);
    const box = $("list");
    if (!list.length) { box.replaceChildren(el("p", { class: "empty", text: t.none })); return; }
    const other = lang === "fa" ? "en" : "fa";
    box.replaceChildren(...list.map(e => {
      const v = videos[e.video_id] || {};
      const url = "https://www.youtube.com/watch?v=" + encodeURIComponent(e.video_id) + "&t=" + Math.floor(e.start_seconds) + "s";
      return el("article", { class: "card" },
        el("p", { class: "quote " + lang, lang, dir: lang === "fa" ? "rtl" : "ltr" }, highlight(e["quote_" + lang], terms)),
        el("details", null,
          el("summary", { text: t.other }),
          el("p", { class: "alt " + other, lang: other, dir: other === "fa" ? "rtl" : "ltr" }, highlight(e["quote_" + other], terms))),
        el("div", { class: "meta" },
          el("a", { class: "ts", href: url, target: "_blank", rel: "noopener", "aria-label": t.watch + " " + fmtTime(e.start_seconds), text: "▶ " + fmtTime(e.start_seconds) }),
          el("span", { class: "src", lang: "fa", text: (v.title_fa || "") + (v.channel ? " · " + v.channel : "") + (v.upload_date ? " · " + v.upload_date.slice(0, 4) : "") }),
          ...(e.topics || []).map(k => el("span", { class: "chip", text: (TOPICS[k] || { [lang]: k })[lang] }))));
    }));
  }

  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    try { localStorage.setItem("lang", lang); } catch (_) {}
    applyLang();
  }));
  let timer;
  $("q").addEventListener("input", ev => { clearTimeout(timer); timer = setTimeout(() => { q = ev.target.value; render(); }, 120); });
  $("video").addEventListener("change", ev => { video = ev.target.value; render(); });

  try { const s = localStorage.getItem("lang"); if (s === "en" || s === "fa") lang = s; } catch (_) {}

  Promise.all([fetch("data/entries.json").then(r => r.json()), fetch("data/videos.json").then(r => r.json())])
    .then(([es, vs]) => {
      vs.forEach(v => { videos[v.id] = v; });
      entries = es.map(e => Object.assign(e, { _idx: norm(e.quote_fa + " " + e.quote_en) }))
        .sort((a, b) => {
          if (a.video_id === b.video_id) return a.start_seconds - b.start_seconds;
          const da = (videos[a.video_id] || {}).upload_date || "", db = (videos[b.video_id] || {}).upload_date || "";
          return da < db ? 1 : -1; // newest video first
        });
      applyLang();
    })
    .catch(() => { $("list").replaceChildren(el("p", { class: "empty", text: "Could not load the quotes. / بارگذاری نقل‌قول‌ها ممکن نشد." })); });
})();
