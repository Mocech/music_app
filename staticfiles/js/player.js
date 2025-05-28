

let isPlaying = false;
let isMuted = false;
let volume = 0.7;
let duration = 0;

document.addEventListener("DOMContentLoaded", () => {
  initPlayer();
  setupEventListeners();
});

function initPlayer() {
  const audio = document.getElementById("main-audio");
  const trackInfo = document.querySelector(".track-info");

  // Set audio src from data-url attribute
  if (trackInfo && trackInfo.dataset.url) {
    audio.src = trackInfo.dataset.url;
  }

  audio.volume = volume;

  // When metadata is loaded, update duration display
  audio.addEventListener("loadedmetadata", () => {
    duration = audio.duration;
    const totalTimeSpan = document.querySelector(".time-total");
    if (totalTimeSpan) {
      totalTimeSpan.textContent = formatTime(duration);
    }
  });

  // Update progress bar and current time as audio plays
  audio.addEventListener("timeupdate", () => {
    const currentTimeSpan = document.querySelector(".time-current");
    const progressFill = document.querySelector(".progress-fill");
    const progressHandle = document.querySelector(".progress-handle");

    if (!duration) return;

    const currentTime = audio.currentTime;
    const progressPercent = (currentTime / duration) * 100;

    if (progressFill) progressFill.style.width = `${progressPercent}%`;
    if (progressHandle) progressHandle.style.left = `${progressPercent}%`;
    if (currentTimeSpan) currentTimeSpan.textContent = formatTime(currentTime);
  });

  audio.addEventListener("ended", () => {
    isPlaying = false;
    updatePlayPauseIcon();
  });
}

function setupEventListeners() {
  // Play/pause button
  const playPauseBtn = document.querySelector(".play-pause-btn");
  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", togglePlay);
  }

  // Previous and next buttons (placeholders for now)
  const prevBtn = document.querySelector("button[onclick='previousTrack()']");
  if (prevBtn) prevBtn.addEventListener("click", previousTrack);

  const nextBtn = document.querySelector("button[onclick='nextTrack()']");
  if (nextBtn) nextBtn.addEventListener("click", nextTrack);

  // Progress bar seek
  const progressBar = document.querySelector(".progress-bar");
  if (progressBar) {
    progressBar.addEventListener("click", seekTo);
  }

  // Volume mute/unmute button
  const muteBtn = document.querySelector(".volume-section > button.control-btn");
  if (muteBtn) {
    muteBtn.addEventListener("click", toggleMute);
  }

  // Volume bar adjustment
  const volumeBar = document.querySelector(".volume-bar");
  if (volumeBar) {
    volumeBar.addEventListener("click", setVolume);
  }
}

// Play or pause audio
function togglePlay() {
  const audio = document.getElementById("main-audio");
  if (!audio) return;

  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }
  updatePlayPauseIcon();
}

// Update play/pause icon
function updatePlayPauseIcon() {
  const icon = document.querySelector(".play-pause-btn i");
  if (!icon) return;
  icon.className = isPlaying ? "fas fa-pause" : "fas fa-play";
}

// Seek audio to position clicked on progress bar
function seekTo(event) {
  const progressBar = event.currentTarget;
  const audio = document.getElementById("main-audio");
  if (!audio || !duration) return;

  const rect = progressBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const seekPercent = clickX / rect.width;

  audio.currentTime = seekPercent * duration;
}

// Previous track placeholder
function previousTrack() {
  console.log("Previous track functionality to be implemented.");
}

// Next track placeholder
function nextTrack() {
  console.log("Next track functionality to be implemented.");
}

// Toggle mute/unmute
function toggleMute() {
  const audio = document.getElementById("main-audio");
  const volumeIcon = document.querySelector(".volume-section button.control-btn i");
  if (!audio || !volumeIcon) return;

  if (isMuted) {
    audio.volume = volume;
    isMuted = false;
    volumeIcon.className = "fas fa-volume-up";
  } else {
    audio.volume = 0;
    isMuted = true;
    volumeIcon.className = "fas fa-volume-mute";
  }
  updateVolumeFill();
}

// Set volume based on click position in volume bar
function setVolume(event) {
  const volumeBar = event.currentTarget;
  const audio = document.getElementById("main-audio");
  if (!audio || !volumeBar) return;

  const rect = volumeBar.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  let newVolume = clickX / rect.width;
  newVolume = Math.min(Math.max(newVolume, 0), 1);

  audio.volume = newVolume;
  volume = newVolume;
  isMuted = newVolume === 0;

  updateVolumeFill();
}

// Update volume bar fill and icon
function updateVolumeFill() {
  const volumeFill = document.querySelector(".volume-fill");
  const volumeIcon = document.querySelector(".volume-section button.control-btn i");
  if (!volumeFill || !volumeIcon) return;

  volumeFill.style.width = `${volume * 100}%`;

  if (isMuted || volume === 0) {
    volumeIcon.className = "fas fa-volume-mute";
  } else if (volume < 0.5) {
    volumeIcon.className = "fas fa-volume-down";
  } else {
    volumeIcon.className = "fas fa-volume-up";
  }
}

// Utility: format seconds to mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
