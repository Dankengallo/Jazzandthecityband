# Website 1.0 Cleanup Notes

## Fixed
- Corrected invalid homepage HTML caused by an unmatched closing paragraph tag.
- Restored the missing click-to-load Vimeo JavaScript on the homepage.
- Ensured the hero video receives a source only on desktop-sized screens.
- Removed automatic homepage audio loading; music now loads only after pressing Play Music.
- Removed duplicate and obsolete mobile hero CSS rules.
- Removed duplicate Google Fonts connections from the Listen page.
- Added `defer` to shared JavaScript files.
- Moved homepage-only and music-player JavaScript into dedicated files.
- Moved Listen-page player styles into `assets/css/music.css`.
- Added explicit image dimensions to reduce layout shifts.
- Replaced inline layout styles with reusable CSS classes.
- Updated the sitemap modification dates.
- Updated the README to match the current website.

## Removed
- Unused experimental CSS for releases, tour listings, placeholder art, and old galleries.
- Unused high-resolution PNG files: `band-trio.png` and `saxophone.png`.
- Unused mobile hero video: `hero mobile.mp4`.
- `.DS_Store` and unnecessary `.gitkeep` files.
- Old mobile hero autoplay code and duplicated video-hiding patches.

## Preserved
- All six public pages and their visible copy.
- Current navigation, colors, typography, layouts, reviews, gallery, Formspree form, SEO metadata, schema, sitemap, robots file, CNAME, and Google verification file.
- Desktop hero video.
- Full Vimeo players on the Listen page.

## Validation performed
- All HTML files parse without structural errors.
- All JSON-LD blocks parse as valid JSON.
- All local links and asset references resolve to existing files.
- All JavaScript files pass syntax checks.
- All retained media files are referenced by the website.
