// Music Single Page Functionality with Enhanced Visualizer
let isPlaying = false
let currentTime = 0
let duration = 0
let volume = 0.7
let isMuted = false

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  initializeAudioPlayer()
  initializeVisualizer()
  loadMusicData()
  setupEventListeners()
})

// Initialize visualizer
function initializeVisualizer() {
  const visualizer = document.querySelector(".music-visualizer")
  const artworkContainer = document.querySelector(".artwork-container")

  // Add interaction effects
  artworkContainer.addEventListener("mouseenter", () => {
    visualizer.style.animationPlayState = "running"
  })

  artworkContainer.addEventListener("mouseleave", () => {
    if (!isPlaying) {
      visualizer.style.animationPlayState = "paused"
    }
  })
}

// Initialize audio player
function initializeAudioPlayer() {
  const audio = document.getElementById("main-audio")
  const progressFill = document.querySelector(".progress-fill")
  const progressHandle = document.querySelector(".progress-handle")
  const currentTimeSpan = document.querySelector(".time-current")
  const totalTimeSpan = document.querySelector(".time-total")

  // Set initial volume
  audio.volume = volume

  // Update duration when metadata loads
  audio.addEventListener("loadedmetadata", () => {
    duration = audio.duration
    totalTimeSpan.textContent = formatTime(duration)
  })

  // Update progress during playback
  audio.addEventListener("timeupdate", () => {
    currentTime = audio.currentTime
    const progress = (currentTime / duration) * 100

    progressFill.style.width = `${progress}%`
    progressHandle.style.left = `${progress}%`
    currentTimeSpan.textContent = formatTime(currentTime)

    // Update visualizer based on audio
    updateVisualizerWithAudio()
  })

  // Handle audio end
  audio.addEventListener("ended", () => {
    isPlaying = false
    updatePlayButtons()
    updateVisualizerState()
  })
}

// Update visualizer based on audio playback
function updateVisualizerWithAudio() {
  if (!isPlaying) return

  const artworkContainer = document.querySelector(".artwork-container")
  const bars = document.querySelectorAll(".bar")
  const waves = document.querySelectorAll(".wave")

  // Simulate audio frequency data (in real app, you'd use Web Audio API)
  bars.forEach((bar, index) => {
    const randomHeight = Math.random() * 80 + 20
    bar.style.setProperty("--height", `${randomHeight}%`)
  })

  // Add playing class for enhanced animations
  artworkContainer.classList.add("playing")
}

// Update visualizer state
function updateVisualizerState() {
  const artworkContainer = document.querySelector(".artwork-container")

  if (isPlaying) {
    artworkContainer.classList.add("playing")
  } else {
    artworkContainer.classList.remove("playing")
  }
}

// Load music data (ready for backend integration)
function loadMusicData() {
  // This function would typically fetch data from your Django backend
  // For now, we'll use the data attributes from the HTML

  const musicData = {
    id: document.querySelector("[data-music-id]")?.getAttribute("data-music-id"),
    title: document.querySelector("[data-title]")?.getAttribute("data-title"),
    artist: document.querySelector("[data-artist]")?.getAttribute("data-artist"),
    genre: document.querySelector("[data-genre]")?.getAttribute("data-genre"),
    album: document.querySelector("[data-album]")?.getAttribute("data-album"),
    description: document.querySelector("[data-description]")?.getAttribute("data-description"),
    tags: document.querySelector("[data-tags]")?.getAttribute("data-tags"),
    uploadedAt: document.querySelector("[data-uploaded]")?.getAttribute("data-uploaded"),
    duration: document.querySelector("[data-duration]")?.getAttribute("data-duration"),
    quality: document.querySelector("[data-quality]")?.getAttribute("data-quality"),
    plays: document.querySelector("[data-plays]")?.getAttribute("data-plays"),
    likes: document.querySelector("[data-likes]")?.getAttribute("data-likes"),
    downloads: document.querySelector("[data-downloads]")?.getAttribute("data-downloads"),
    postedBy: document.querySelector("[data-posted-by]")?.getAttribute("data-posted-by"),
    audioSrc: document.querySelector("[data-src]")?.getAttribute("data-src"),
    downloadUrl: document.querySelector("[data-download-url]")?.getAttribute("data-download-url"),
    liked: document.querySelector("[data-liked]")?.getAttribute("data-liked") === "true",
    verified: document.querySelector("[data-verified]")?.getAttribute("data-verified") === "true",
    hasLyrics: document.querySelector("[data-has-lyrics]")?.getAttribute("data-has-lyrics") === "true",
  }

  console.log("Music data loaded:", musicData)
  return musicData
}

// Setup event listeners
function setupEventListeners() {
  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return

    switch (e.code) {
      case "Space":
        e.preventDefault()
        togglePlay()
        break
      case "ArrowLeft":
        e.preventDefault()
        seekRelative(-10)
        break
      case "ArrowRight":
        e.preventDefault()
        seekRelative(10)
        break
      case "ArrowUp":
        e.preventDefault()
        adjustVolume(0.1)
        break
      case "ArrowDown":
        e.preventDefault()
        adjustVolume(-0.1)
        break
    }
  })
}

// Audio player controls
function toggleMainPlay() {
  togglePlay()
}

function togglePlay() {
  const audio = document.getElementById("main-audio")

  if (isPlaying) {
    audio.pause()
    isPlaying = false
  } else {
    audio.play()
    isPlaying = true
  }

  updatePlayButtons()
  updateVisualizerState()
}

function updatePlayButtons() {
  const mainPlayBtn = document.querySelector(".main-play-btn i")
  const playerPlayBtn = document.querySelector(".play-pause-btn i")

  const iconClass = isPlaying ? "fas fa-pause" : "fas fa-play"

  if (mainPlayBtn) mainPlayBtn.className = iconClass
  if (playerPlayBtn) playerPlayBtn.className = iconClass
}

function previousTrack() {
  // Implement previous track functionality
  console.log("Previous track")
}

function nextTrack() {
  // Implement next track functionality
  console.log("Next track")
}

function seekTo(event) {
  const progressBar = event.currentTarget
  const rect = progressBar.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width
  const audio = document.getElementById("main-audio")

  audio.currentTime = percentage * duration
}

function seekRelative(seconds) {
  const audio = document.getElementById("main-audio")
  audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds))
}

function toggleMute() {
  const audio = document.getElementById("main-audio")
  const volumeIcon = document.querySelector(".volume-section .control-btn i")

  if (isMuted) {
    audio.volume = volume
    isMuted = false
    volumeIcon.className = "fas fa-volume-up"
  } else {
    audio.volume = 0
    isMuted = true
    volumeIcon.className = "fas fa-volume-mute"
  }

  updateVolumeBar()
}

function setVolume(event) {
  const volumeBar = event.currentTarget
  const rect = volumeBar.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width

  volume = Math.max(0, Math.min(1, percentage))
  const audio = document.getElementById("main-audio")
  audio.volume = volume
  isMuted = false

  updateVolumeBar()
}

function adjustVolume(delta) {
  volume = Math.max(0, Math.min(1, volume + delta))
  const audio = document.getElementById("main-audio")
  audio.volume = volume
  isMuted = false

  updateVolumeBar()
}

function updateVolumeBar() {
  const volumeFill = document.querySelector(".volume-fill")
  const volumeIcon = document.querySelector(".volume-section .control-btn i")

  volumeFill.style.width = `${volume * 100}%`

  if (isMuted || volume === 0) {
    volumeIcon.className = "fas fa-volume-mute"
  } else if (volume < 0.5) {
    volumeIcon.className = "fas fa-volume-down"
  } else {
    volumeIcon.className = "fas fa-volume-up"
  }
}

// User interactions
function toggleLike() {
  const likeBtn = document.querySelector(".action-buttons .btn-primary")
  const likeIcon = likeBtn.querySelector("i")
  const likeText = likeBtn.querySelector("span")
  const isLiked = likeBtn.getAttribute("data-liked") === "true"

  if (isLiked) {
    likeIcon.className = "fas fa-heart"
    likeText.textContent = "Like"
    likeBtn.setAttribute("data-liked", "false")
    likeBtn.classList.remove("liked")
  } else {
    likeIcon.className = "fas fa-heart"
    likeText.textContent = "Liked"
    likeBtn.setAttribute("data-liked", "true")
    likeBtn.classList.add("liked")
  }

  // Here you would send the like/unlike request to your Django backend
  const musicId = document.querySelector("[data-music-id]").getAttribute("data-music-id")
  console.log(`${isLiked ? "Unliking" : "Liking"} music ID: ${musicId}`)
}

function downloadTrack() {
  const downloadUrl = document.querySelector("[data-download-url]").getAttribute("data-download-url")
  const musicTitle = document.querySelector("[data-title]").getAttribute("data-title")

  // Create download link
  const link = document.createElement("a")
  link.href = downloadUrl
  link.download = `${musicTitle}.mp3`
  link.click()

  // Track download analytics
  console.log("Track downloaded:", musicTitle)
}

function addToPlaylist() {
  // Implement add to playlist functionality
  console.log("Add to playlist")
  // This would open a playlist selection modal
}

function shareTrack() {
  const modal = document.getElementById("share-modal")
  modal.style.display = "block"
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.style.display = "none"
}

function copyLink() {
  const linkInput = document.querySelector(".link-container input")
  linkInput.select()
  document.execCommand("copy")

  // Show feedback
  const button = document.querySelector(".link-container button")
  const originalText = button.innerHTML
  button.innerHTML = '<i class="fas fa-check"></i>'
  setTimeout(() => {
    button.innerHTML = originalText
  }, 2000)
}

// Lyrics functionality
function toggleLyricsSync() {
  console.log("Toggle lyrics sync")
  // Implement lyrics synchronization with audio
}

function copyLyrics() {
  const lyricsContent = document.querySelector(".lyrics-content").textContent
  navigator.clipboard.writeText(lyricsContent).then(() => {
    console.log("Lyrics copied to clipboard")
  })
}

// Utility functions
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("share-modal")
  if (event.target === modal) {
    modal.style.display = "none"
  }
})

// API functions for backend integration
async function fetchMusicData(musicId) {
  try {
    const response = await fetch(`/api/music/${musicId}/`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching music data:", error)
    return null
  }
}

async function updatePlayCount(musicId) {
  try {
    await fetch(`/api/music/${musicId}/play/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    })
  } catch (error) {
    console.error("Error updating play count:", error)
  }
}

async function toggleLikeAPI(musicId) {
  try {
    const response = await fetch(`/api/music/${musicId}/like/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error toggling like:", error)
    return null
  }
}

// CSRF token helper for Django
function getCookie(name) {
  let cookieValue = null
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}
