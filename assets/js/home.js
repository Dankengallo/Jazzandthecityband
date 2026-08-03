const heroVideo = document.querySelector('.hero-video');
const desktopMedia = window.matchMedia('(min-width: 801px)');

function updateHeroVideo() {
  if (!heroVideo) return;

  if (desktopMedia.matches) {
    if (!heroVideo.src) {
      heroVideo.src = heroVideo.dataset.desktopSrc;
      heroVideo.load();
      heroVideo.play().catch(() => {
        // Autoplay can be blocked by browser or power-saving settings.
      });
    }
  } else if (heroVideo.src) {
    heroVideo.pause();
    heroVideo.removeAttribute('src');
    heroVideo.load();
  }
}

updateHeroVideo();

if (desktopMedia.addEventListener) {
  desktopMedia.addEventListener('change', updateHeroVideo);
} else {
  desktopMedia.addListener(updateHeroVideo);
}

const heroAudio = document.querySelector('#hero-audio');
const heroMusicButton = document.querySelector('.hero-music-button');

function updateHeroMusicButton() {
  if (!heroAudio || !heroMusicButton) return;
  const isPlaying = !heroAudio.paused;
  heroMusicButton.textContent = isPlaying ? 'Pause Music' : 'Play Music';
  heroMusicButton.setAttribute('aria-pressed', String(isPlaying));
}

if (heroAudio && heroMusicButton) {
  heroAudio.volume = 0.5;
  heroMusicButton.addEventListener('click', () => {
    if (heroAudio.paused) {
      heroAudio.play().catch(updateHeroMusicButton);
    } else {
      heroAudio.pause();
    }
  });
  heroAudio.addEventListener('play', updateHeroMusicButton);
  heroAudio.addEventListener('pause', updateHeroMusicButton);
  updateHeroMusicButton();
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('.video-placeholder-button');
  if (!button) return;

  const card = button.closest('.video-placeholder');
  const videoId = card?.dataset.vimeoId;
  if (!card || !videoId) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  iframe.title = card.dataset.videoTitle || 'Jazz & The City Band performance';
  iframe.allow = 'autoplay; fullscreen; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.loading = 'eager';

  card.replaceChildren(iframe);
});
