# Mohammad Darvish on Iran's environment

A searchable, bilingual (Persian/English) archive of Mohammad Darvish's statements about Iran's environment, taken from interviews and podcasts on YouTube. Every quote links to the exact moment in its video.

Live site: served by GitHub Pages from the `main` branch root.

## How quotes are made

1. Download the video's YouTube Persian captions and transcribe the audio with Whisper.
2. Extract Darvish's own statements (not the host's), lightly cleaned of filler but never reworded, translate them to English and tag them by topic.
3. Where the captions and Whisper disagree on a number or name, a person checks it by listening. A random 1-in-10 sample of the rest is also checked.
4. Political statements are left out unless they carry essential environmental information.

## Data

- `data/entries.json`: published quotes (`id`, `video_id`, `start_seconds`, `quote_fa`, `quote_en`, `topics`).
- `data/videos.json`: source videos (`id`, `title_fa`, `channel`, `upload_date`).
- `data/places.json`: the places quotes can refer to (`id`, `en`, `fa`, `kind`, `provinces` as province codes, and `lat`/`lon` for anything smaller than a province). Province-wide places have no coordinates and only shade the map.
- `data/iran-provinces.json`: province outlines for the map, already projected to SVG paths. Built from the MIT-licensed [iran-geojson](https://www.npmjs.com/package/iran-geojson) package; it rarely needs to change.

### Tagging a new quote for the map and figures

Each entry in `entries.json` also carries three optional fields. A quote without them still appears in the list; it just stays off the map and the figures strip.

- `places`: ids from `places.json`. Tag a place only when the quote says something concrete about it (Hoor al-Azim's reed beds burning, the Fasa–Jahrom subsidence). Leave out passing mentions, such as a candidate's hometown or a budget comparison with Kashan. Add a new place to `places.json` when needed; `provinces` uses the codes in `iran-provinces.json` (for example `IR10` is Khuzestan).
- `scope`: one of `local` (a single site or village), `regional` (a province or a few), `national` (Iran as a whole) or `international` (Iran and other countries). Quotes tagged `national` or `international` are listed under "Whole of Iran" and "Iran and its neighbours" beside the map.
- `figures`: the quote's headline numbers, each as `{value_en, value_fa, label_en, label_fa, kind}`. `kind` is `claim` (Darvish's own figure), `target` (a government plan or goal he quotes) or `study` (a study he cites). Write `value_fa` with Persian digits. Add `"featured": true` to the few figures that should show in the highlights; the rest appear under "All figures".

Figures are shown as Darvish states them, not as verified statistics, and the site says so. If two quotes give different numbers for the same thing, keep both as spoken.

Spotted a mistake? Please open an issue with the quote id.
