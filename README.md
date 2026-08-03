# Jazz & The City Band Website

Static website for Jazz & The City Band, hosted with GitHub Pages at `jazzandthecityband.com`.

## Pages
- `index.html` — homepage
- `music.html` — audio player and live performance videos
- `gallery.html` — performance and event photos
- `about.html` — band biography
- `reviews.html` — client testimonials and Google review links
- `contact.html` — booking inquiry form

## Shared assets
- `assets/css/styles.css` — site-wide design and responsive layout
- `assets/css/music.css` — audio-player styles used only on the Listen page
- `assets/js/main.js` — navigation, reveal effects, and floating inquiry button
- `assets/js/home.js` — desktop hero video, homepage audio control, and click-to-load Vimeo previews
- `assets/js/music-player.js` — custom audio-player behavior

## Publishing
Upload all files and folders to the repository root. In GitHub, open **Settings → Pages** and deploy from the `main` branch and `/root` folder.

## Performance notes
- The hero video loads only on screens wider than 800px.
- Homepage Vimeo players load only after a visitor clicks a preview.
- Homepage music loads only after a visitor presses **Play Music**.
- Images use local WebP files and explicit dimensions.

## Forms and verification
- Contact form submissions are handled by Formspree.
- `google10eadae210f5dfbc.html` is required for Google Search Console verification.
- `sitemap.xml` and `robots.txt` should remain in the repository root.
