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
      lede: "گفته‌های محمد درویش در گفت‌وگوها، پادکست‌ها، نوشته‌ها و کانال تلگرامش درباره آب، خاک، هوا و حیات وحش ایران. هر نقل‌قول به منبع اصلی‌اش لینک شده است؛ نقل‌قول‌های ویدیویی به لحظه دقیقشان.",
      searchLabel: "جست‌وجو",
      searchPh: "جست‌وجو: فرونشست، ریزگرد، کارون…",
      foot: "متن ویدیوها از زیرنویس خودکار و رونویسی Whisper استخراج و با شنیدن ویدیو بازبینی شده‌اند؛ نقل‌قول‌های نوشتاری عیناً از متن اصلی برداشته شده‌اند. اگر اشتباهی دیدید، لطفاً در مخزن گیت‌هاب گزارش دهید.",
      all: "همه", allVideos: "همه منابع", count: n => fmtNum(n, "fa") + " نقل‌قول",
      none: "نقل‌قولی با این جست‌وجو پیدا نشد.", other: "ترجمه انگلیسی", watch: "تماشا از", read: "خواندن در",
      srcType: { telegram: "تلگرام", website: "وب‌سایت", newspaper: "روزنامه" }, noteType: { slip: "احتمالاً لغزش در متن اصلی", explain: "توضیح" }, alsoIn: "همین حرف در گفت‌وگوهای دیگر",
      mapTitle: "از کجا حرف می‌زند",
      mapNote: n => "بر اساس " + fmtNum(n, "fa") + " منبعی (گفت‌وگو، نوشته یا کانال) که تا امروز بررسی شده؛ پس نقشه نشان می‌دهد این منابع به کجا پرداخته‌اند، نه تصویر کاملی از مشکلات ایران. روی استان یا نقطه بزنید تا نقل‌قول‌هایش بیاید.",
      mapLabel: "نقشه استان‌های ایران و جاهایی که درویش از آن‌ها حرف می‌زند",
      national: "کل ایران", international: "ایران و همسایگان",
      figTitle: "به روایت اعداد",
      figNote: "اعداد همان‌طور که درویش در گفت‌وگوها و نوشته‌هایش گفته آمده‌اند و مستقل بررسی نشده‌اند. رنگ نشان می‌دهد هر عدد از تخریب می‌گوید، از بازگشت، یا زمینه و هدفی را نشان می‌دهد.",
      figMore: n => "همه " + fmtNum(n, "fa") + " عدد", figLess: "فقط برجسته‌ها",
      kind: { target: "هدف دولت", study: "پژوهش استنادشده" }, readQuote: "خواندن نقل‌قول",
      tone: { loss: "تخریب و از دست رفتن", neutral: "زمینه و اهداف", recovery: "بازگشت و راه‌حل" },
      clear: "حذف فیلتر",
      builtBy: "ساخته Claude برای آگاهی از محیط زیست ایران · درباره این سایت",
      aboutTitle: "درباره این سایت",
      aboutBody: "این آرشیو را Claude، دستیار هوش مصنوعی ساخت شرکت Anthropic، ساخته است. هدف آن افزایش آگاهی درباره وضعیت محیط زیست ایران است: گفته‌های عمومی محمد درویش، یکی از شناخته‌شده‌ترین صداهای محیط زیست ایران، را در یک جا جمع می‌کند تا بتوان آن‌ها را جست‌وجو کرد و با منبع اصلی سنجید. این سایت وابسته به محمد درویش نیست. رونویسی و ترجمه نقل‌قول‌ها کار Claude است و یک نفر آن‌ها را بازبینی نمونه‌ای کرده؛ هر نقل‌قول به منبع اصلی‌اش (و نقل‌قول‌های ویدیویی به لحظه دقیقشان) لینک شده تا خودتان بتوانید آن را بررسی کنید."
    },
    en: {
      eyebrow: "Quote archive",
      title: "Mohammad Darvish on Iran's environment",
      lede: "What Mohammad Darvish has said in interviews, podcasts, his writing and his Telegram channel about Iran's water, soil, air and wildlife. Every quote links to its original source, and video quotes to the exact moment.",
      searchLabel: "Search",
      searchPh: "Search: subsidence, dust, Karun…",
      foot: "Quotes were extracted from YouTube's automatic captions and a Whisper transcript, then checked by listening to the video. Written quotes are copied word for word from the original text. Translations are ours. If you spot a mistake, please report it on the GitHub repository.",
      all: "All", allVideos: "All sources", count: n => n + (n === 1 ? " quote" : " quotes"),
      none: "No quotes match this search.", other: "Original Persian", watch: "Watch from", read: "Read on",
      srcType: { telegram: "Telegram", website: "Website", newspaper: "Newspaper" }, noteType: { slip: "Likely slip in the original", explain: "Note" }, alsoIn: "He makes the same point in",
      mapTitle: "Where he's talking about",
      mapNote: n => "Based on the " + n + " sources (interviews, articles and his channel) covered so far, so the map shows what those sources covered, not a full picture of Iran's problems. Tap a province or a dot to see its quotes.",
      mapLabel: "Map of Iran's provinces and the places Darvish talks about",
      national: "Whole of Iran", international: "Iran and its neighbours",
      figTitle: "By the numbers",
      figNote: "Figures as Darvish states them in interviews and in writing; they are not independently checked. Colour shows whether a figure describes damage, recovery, or context and targets.",
      figMore: n => "All " + n + " figures", figLess: "Highlights only",
      kind: { target: "Government target", study: "Cited study" }, readQuote: "Read the quote",
      tone: { loss: "Damage and loss", neutral: "Context and targets", recovery: "Recovery and solutions" },
      clear: "Clear filter",
      builtBy: "Built by Claude to raise awareness of Iran's environment · About this site",
      aboutTitle: "About this site",
      aboutBody: "This archive was built by Claude, an AI assistant made by Anthropic. Its goal is to raise awareness of Iran's environmental conditions by gathering what Mohammad Darvish, one of Iran's best-known environmental voices, has said in public, so it can be searched and checked against the original sources. The site is not affiliated with Mohammad Darvish. Claude transcribed and translated the quotes and a person spot-checked them; every quote links to its original source (video quotes to the exact moment) so you can verify it yourself."
    }
  };

  let lang = "fa", topic = "all", video = "all", q = "", where = null, allFigs = false;
  let entries = [], videos = {}, places = {}, geo = null;
  const $ = id => document.getElementById(id);

  function fmtNum(n, l) { return l === "fa" ? String(n).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]) : String(n); }
  // Video quotes carry video_id; written quotes (Telegram, website, newspaper) carry source_id, url and date.
  function srcOf(e) { return e.source_id || e.video_id; }
  function dateOf(e) { return e.date || (videos[srcOf(e)] || {}).upload_date || ""; }
  // Persian dates show in the Iranian calendar, English ones as "26 Aug 2026".
  function fmtDate(d) {
    const dt = new Date(d + "T12:00:00Z");
    try { return dt.toLocaleDateString(lang === "fa" ? "fa-IR" : "en-GB", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }); }
    catch (_) { return d; }
  }
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
    buildTopics(); buildVideos(); buildExplore(); render();
  }

  // `where` filters the list: {type: "province"|"place"|"scope", id}.
  function provincesOf(e) { return new Set((e.places || []).flatMap(id => (places[id] || {}).provinces || [])); }
  function matchesWhere(e) {
    if (!where) return true;
    if (where.type === "scope") return e.scope === where.id;
    if (where.type === "place") return (e.places || []).includes(where.id);
    return provincesOf(e).has(where.id);
  }
  function whereLabel(w) {
    if (w.type === "scope") return I18N[lang][w.id];
    if (w.type === "place") return (places[w.id] || {})[lang] || w.id;
    return ((geo && geo.provinces.find(p => p.id === w.id)) || {})[lang] || w.id;
  }
  function setWhere(w) {
    where = w && where && w.type === where.type && w.id === where.id ? null : w;
    buildExplore(); render();
    if (where) $("list").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function svg(tag, attrs, ...kids) {
    const n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [k, v] of Object.entries(attrs || {})) n.setAttribute(k, v);
    kids.forEach(k => n.append(k));
    return n;
  }

  function buildExplore() {
    if (!geo) return;
    const t = I18N[lang];
    $("explore").hidden = false;
    $("map-note").textContent = t.mapNote(Object.keys(videos).length);
    $("map-label").textContent = t.mapLabel;

    const count = {}, placeCount = {};
    entries.forEach(e => {
      provincesOf(e).forEach(p => { count[p] = (count[p] || 0) + 1; });
      (e.places || []).forEach(p => { placeCount[p] = (placeCount[p] || 0) + 1; });
    });
    const level = n => !n ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 6 ? 3 : 4;
    const pr = geo.projection;
    const xy = (lat, lon) => [(lon - pr.lon0) * pr.k * pr.cos, (pr.lat0 - lat) * pr.k];

    const map = $("map");
    map.setAttribute("viewBox", "0 0 " + geo.width + " " + geo.height);
    [...map.querySelectorAll("g")].forEach(g => g.remove());
    const gp = svg("g", { class: "provs" }), gd = svg("g", { class: "dots" });
    geo.provinces.forEach(p => {
      const n = count[p.id] || 0;
      const sel = where && where.type === "province" && where.id === p.id;
      const path = svg("path", { d: p.d, class: "l" + level(n) + (sel ? " sel" : "") + (n ? " has" : "") },
        svg("title", {}, p[lang] + (n ? " · " + t.count(n) : "")));
      if (n) path.addEventListener("click", () => setWhere({ type: "province", id: p.id }));
      gp.append(path);
    });
    // SVG paints in document order, so move the selected province last or its neighbours hide half its outline.
    const selPath = gp.querySelector(".sel");
    if (selPath) gp.append(selPath);
    Object.values(places).filter(p => p.lat != null && placeCount[p.id]).forEach(p => {
      const [x, y] = xy(p.lat, p.lon);
      const sel = where && where.type === "place" && where.id === p.id;
      const c = svg("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: 3 + Math.min(placeCount[p.id], 4), class: sel ? "sel" : "" },
        svg("title", {}, p[lang] + " · " + t.count(placeCount[p.id])));
      c.addEventListener("click", ev => { ev.stopPropagation(); setWhere({ type: "place", id: p.id }); });
      gd.append(c);
    });
    map.append(gp, gd);

    // The button list is the keyboard and small-screen way into the same filter.
    const box = $("where"); box.replaceChildren();
    const btn = (w, label, n) => {
      const on = where && where.type === w.type && where.id === w.id;
      const b = el("button", { type: "button", "aria-pressed": String(!!on) },
        el("span", { text: label }), el("span", { class: "n", text: fmtNum(n, lang) }));
      b.addEventListener("click", () => setWhere(w));
      box.append(b);
    };
    ["national", "international"].forEach(s => {
      const n = entries.filter(e => e.scope === s).length;
      if (n) btn({ type: "scope", id: s }, t[s], n);
    });
    geo.provinces.filter(p => count[p.id]).sort((a, b) => count[b.id] - count[a.id] || a[lang].localeCompare(b[lang], lang))
      .forEach(p => btn({ type: "province", id: p.id }, p[lang], count[p.id]));

    // Colour says which way a figure points (damage, recovery, or neutral context/targets), not how bad it is.
    const TONES = ["loss", "neutral", "recovery"];
    const figs = entries.flatMap(e => (e.figures || []).map(f => ({ f, e })))
      .sort((a, b) => TONES.indexOf(a.f.tone || "neutral") - TONES.indexOf(b.f.tone || "neutral"));
    const shown = allFigs ? figs : figs.filter(x => x.f.featured);
    $("fig-legend").replaceChildren(...TONES.map(k => el("span", { class: "tone-" + k, text: t.tone[k] })));
    const fb = $("figs"); fb.classList.toggle("all", allFigs);
    const pct = x => Math.max(1.5, Math.min(100, x * 100)).toFixed(1) + "%";
    const bars = f => {
      if (f.share != null) return el("span", { class: "bars", "aria-hidden": "true" },
        el("span", { class: "track" }, el("span", { class: "fill", style: "width:" + pct(f.share) })));
      if (!f.compare) return null;
      const max = Math.max(...f.compare.map(c => c.value));
      return el("span", { class: "bars", "aria-hidden": "true" }, ...f.compare.map((c, i) =>
        el("span", { class: "bar" + (i ? " now" : "") },
          el("span", { class: "bl", text: c["label_" + lang] }),
          el("span", { class: "track" }, el("span", { class: "fill", style: "width:" + pct(c.value / max) })))));
    };
    fb.replaceChildren(...shown.map(({ f, e }) => {
      const tone = f.tone || "neutral";
      const b = el("button", { type: "button", class: "fig tone-" + tone, "aria-label": t.tone[tone] + ". " + t.readQuote + ": " + f["value_" + lang] + " " + f["label_" + lang] },
        el("span", { class: "val", text: f["value_" + lang] }),
        el("span", { class: "lbl", text: f["label_" + lang] }),
        bars(f),
        f.kind !== "claim" && t.kind[f.kind] ? el("span", { class: "kind", text: t.kind[f.kind] }) : null);
      b.addEventListener("click", () => focusEntry(e.id));
      return b;
    }));
    const more = $("figs-more");
    more.hidden = figs.length === shown.length && !allFigs;
    more.textContent = allFigs ? t.figLess : t.figMore(figs.length);
  }

  function focusEntry(id) {
    topic = "all"; video = "all"; where = null; q = ""; $("q").value = ""; $("video").value = "all";
    buildTopics(); buildExplore(); render();
    const card = document.getElementById("q-" + id);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.classList.remove("flash"); void card.offsetWidth; card.classList.add("flash");
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

  // Editor's notes sit under the quote. A "slip" note also marks its fragment (mark_fa / mark_en) inside the quote,
  // which stays exactly as written; the number links the fragment to its note.
  function quoteText(e, l, terms) {
    const frag = document.createDocumentFragment();
    const marks = (e.notes || []).map((n, i) => ({ text: n["mark_" + l], i })).filter(m => m.text && e["quote_" + l].includes(m.text));
    let rest = e["quote_" + l];
    marks.sort((a, b) => rest.indexOf(a.text) - rest.indexOf(b.text)).forEach(m => {
      const at = rest.indexOf(m.text);
      if (at < 0) return;
      frag.append(highlight(rest.slice(0, at), terms),
        el("span", { class: "slip" }, highlight(m.text, terms)),
        el("a", { class: "slip-n", href: "#n-" + e.id + "-" + m.i, text: fmtNum(m.i + 1, l) }));
      rest = rest.slice(at + m.text.length);
    });
    frag.append(highlight(rest, terms));
    return frag;
  }
  function notesBox(e, t, dir) {
    const ns = (e.notes || []).filter(n => n[lang]);
    if (!ns.length) return null;
    return el("div", { class: "cnotes" }, ...e.notes.map((n, i) => n[lang] ? el("aside", { class: "cnote is-" + (n.type || "explain"), id: "n-" + e.id + "-" + i, lang, dir },
      el("span", { class: "cnote-h" }, n["mark_" + lang] || n.mark_fa ? el("span", { class: "cnote-n", text: fmtNum(i + 1, lang) }) : null, t.noteType[n.type || "explain"]),
      el("span", { text: n[lang] })) : null));
  }

  // A merged quote lists its other appearances in `sources`; the main one stays in video_id/start_seconds.
  const videosOf = e => [srcOf(e), ...(e.sources || []).map(s => s.video_id)];
  const watchUrl = (id, sec) => "https://www.youtube.com/watch?v=" + encodeURIComponent(id) + "&t=" + Math.floor(sec) + "s";
  const srcLabel = v => (v.title_fa || "") + (v.channel ? " · " + v.channel : "") + (v.upload_date ? " · " + v.upload_date.slice(0, 4) : "");

  function render() {
    const t = I18N[lang];
    const terms = q.trim().split(/\s+/).filter(Boolean);
    const nterms = terms.map(norm);
    const list = entries.filter(e =>
      (topic === "all" || (e.topics || []).includes(topic)) &&
      (video === "all" || videosOf(e).includes(video)) && matchesWhere(e) &&
      (!nterms.length || nterms.every(w => e._idx.includes(w))));
    $("count").textContent = t.count(list.length);
    const aw = $("active-where");
    aw.hidden = !where;
    if (where) { aw.textContent = "📍 " + whereLabel(where) + " ✕"; aw.setAttribute("aria-label", t.clear + ": " + whereLabel(where)); }
    const box = $("list");
    if (!list.length) { box.replaceChildren(el("p", { class: "empty", text: t.none })); return; }
    const other = lang === "fa" ? "en" : "fa";
    box.replaceChildren(...list.map(e => {
      const v = videos[srcOf(e)] || {};
      const written = !!e.source_id, kind = t.srcType[v.type] || "";
      const url = written ? e.url : watchUrl(e.video_id, e.start_seconds);
      const link = written
        ? el("a", { class: "ts", href: url, target: "_blank", rel: "noopener", "aria-label": t.read + " " + kind, text: "↗ " + kind + (e.date ? " · " + fmtDate(e.date) : "") })
        : el("a", { class: "ts", href: url, target: "_blank", rel: "noopener", "aria-label": t.watch + " " + fmtTime(e.start_seconds), text: "▶ " + fmtTime(e.start_seconds) });
      const pl = (e.places || []).map(id => places[id]).filter(Boolean);
      const dir = lang === "fa" ? "rtl" : "ltr";
      return el("article", { class: "card", id: "q-" + e.id },
        el("p", { class: "quote " + lang, lang, dir: lang === "fa" ? "rtl" : "ltr" }, quoteText(e, lang, terms)),
        el("details", null,
          el("summary", { text: t.other }),
          el("p", { class: "alt " + other, lang: other, dir: other === "fa" ? "rtl" : "ltr" }, quoteText(e, other, terms))),
        notesBox(e, t, dir),
        el("div", { class: "meta" },
          link,
          el("span", { class: "src", lang: "fa", text: written ? (e.title_fa ? e.title_fa + " · " : "") + (v.channel || v.title_fa || "") : srcLabel(v) }),
          ...(e.topics || []).map(k => el("span", { class: "chip", text: (TOPICS[k] || { [lang]: k })[lang] }))),
        (e.sources || []).length ? el("div", { class: "also" },
          el("span", { class: "also-h", text: t.alsoIn }),
          ...e.sources.map(s => el("div", { class: "also-row" },
            el("a", { class: "ts", href: watchUrl(s.video_id, s.start_seconds), target: "_blank", rel: "noopener", "aria-label": t.watch + " " + fmtTime(s.start_seconds), text: "▶ " + fmtTime(s.start_seconds) }),
            el("span", { class: "src", lang: "fa", text: srcLabel(videos[s.video_id] || {}) }),
            s["note_" + lang] ? el("span", { class: "also-note", lang, dir, text: s["note_" + lang] }) : null))) : null,
        pl.length ? el("div", { class: "places" }, ...pl.map(p => {
          const b = el("button", { type: "button", class: "place", text: "📍 " + p[lang] });
          b.addEventListener("click", () => setWhere({ type: "place", id: p.id }));
          return b;
        })) : null);
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
  $("active-where").addEventListener("click", () => setWhere(null));
  $("figs-more").addEventListener("click", () => { allFigs = !allFigs; buildExplore(); });

  try { const s = localStorage.getItem("lang"); if (s === "en" || s === "fa") lang = s; } catch (_) {}

  // The map files are optional: if they fail to load, the quote list still works.
  const optional = url => fetch(url).then(r => r.ok ? r.json() : null).catch(() => null);
  Promise.all([fetch("data/entries.json").then(r => r.json()), fetch("data/videos.json").then(r => r.json()),
    optional("data/places.json"), optional("data/iran-provinces.json"), optional("data/written_sources.json")])
    .then(([es, vs, ps, g, ws]) => {
      vs.concat(ws || []).forEach(v => { videos[v.id] = v; });
      (ps || []).forEach(p => { places[p.id] = p; });
      geo = ps && g ? g : null;
      entries = es.map(e => Object.assign(e, { _idx: norm([e.quote_fa, e.quote_en, ...(e.notes || []).flatMap(n => [n.fa, n.en])].filter(Boolean).join(" ")) }))
        .sort((a, b) => {
          if (a.video_id && a.video_id === b.video_id) return a.start_seconds - b.start_seconds;
          const da = dateOf(a), db = dateOf(b);
          return da === db ? 0 : da < db ? 1 : -1; // newest first
        });
      applyLang();
    })
    .catch(() => { $("list").replaceChildren(el("p", { class: "empty", text: "Could not load the quotes. / بارگذاری نقل‌قول‌ها ممکن نشد." })); });
})();
