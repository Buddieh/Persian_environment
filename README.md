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

Spotted a mistake? Please open an issue with the quote id.
