const tracks = [
  {
    title: 'Not So Bluesy After All',
    file: 'assets/audio/Not so bluesy after all.mp3'
  },
  {
    title: 'On the Street Where You Live',
    file: 'assets/audio/On the street where you live.mp3'
  },
  {
    title: 'The Man I Love',
    file: 'assets/audio/The man I love.mp3'
  }
];

const audio = document.getElementById('audio');
const playButton = document.getElementById('play-button');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const trackTitle = document.getElementById('track-title');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlistButtons = document.querySelectorAll('.playlist-button');

let currentTrackIndex = 0;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

function updatePlayButton() {
  const isPlaying = !audio.paused;
  playButton.textContent = isPlaying ? 'Ⅱ' : '▶';
  playButton.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
}

function updateProgressFill() {
  if (!audio.duration) {
    progress.style.setProperty('--fill', '0%');
    return;
  }

  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent;
  progress.style.setProperty('--fill', `${progressPercent}%`);
}

function loadTrack(index, shouldPlay = false) {
  currentTrackIndex = index;
  const track = tracks[currentTrackIndex];
  audio.src = track.file;
  trackTitle.textContent = track.title;

  playlistButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === currentTrackIndex;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-current', isActive ? 'true' : 'false');
  });

  progress.value = 0;
  progress.style.setProperty('--fill', '0%');
  currentTime.textContent = '0:00';
  duration.textContent = '0:00';

  if (shouldPlay) {
    audio.play().catch(updatePlayButton);
  }
}

function playPreviousTrack() {
  loadTrack((currentTrackIndex - 1 + tracks.length) % tracks.length, true);
}

function playNextTrack() {
  loadTrack((currentTrackIndex + 1) % tracks.length, true);
}

playButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

previousButton.addEventListener('click', playPreviousTrack);
nextButton.addEventListener('click', playNextTrack);

playlistButtons.forEach((button) => {
  button.addEventListener('click', () => {
    loadTrack(Number(button.dataset.index), true);
  });
});

audio.addEventListener('play', updatePlayButton);
audio.addEventListener('pause', updatePlayButton);
audio.addEventListener('loadedmetadata', () => {
  duration.textContent = formatTime(audio.duration);
  updateProgressFill();
});
audio.addEventListener('timeupdate', () => {
  currentTime.textContent = formatTime(audio.currentTime);
  updateProgressFill();
});
audio.addEventListener('ended', playNextTrack);

progress.addEventListener('input', () => {
  const progressPercent = Number(progress.value);
  progress.style.setProperty('--fill', `${progressPercent}%`);
  if (audio.duration) {
    audio.currentTime = (progressPercent / 100) * audio.duration;
  }
});

volume.addEventListener('input', () => {
  const volumeValue = Number(volume.value);
  audio.volume = volumeValue;
  volume.style.setProperty('--fill', `${volumeValue * 100}%`);
});

audio.volume = Number(volume.value);
volume.style.setProperty('--fill', `${Number(volume.value) * 100}%`);
progress.style.setProperty('--fill', '0%');
loadTrack(0);
