// Browse page functionality
let currentView = "grid"

// View switching functionality
function switchView(view) {
  currentView = view
  const container = document.getElementById("music-container")
  const viewButtons = document.querySelectorAll(".view-btn")

  // Update container class
  container.className = `music-container ${view}-view`

  // Update active button
  viewButtons.forEach((btn) => btn.classList.remove("active"))
  event.target.closest(".view-btn").classList.add("active")

  // Save preference to localStorage
  localStorage.setItem("preferredView", view)

  // Add transition effect
  container.style.opacity = "0.7"
  setTimeout(() => {
    container.style.opacity = "1"
  }, 200)
}

// Load saved view preference
function loadViewPreference() {
  const savedView = localStorage.getItem("preferredView")
  if (savedView && savedView !== currentView) {
    const viewButton = document.querySelector(`.view-btn[onclick="switchView('${savedView}')"]`)
    if (viewButton) {
      viewButton.click()
    }
  }
}

// Music filtering functionality
function filterMusic() {
  const searchInput = document.getElementById("search-input").value.toLowerCase()
  const genreFilter = document.getElementById("genre-filter").value.toLowerCase()
  const musicCards = document.querySelectorAll(".music-card")

  let visibleCount = 0

  musicCards.forEach((card) => {
    const title = card.getAttribute("data-title").toLowerCase()
    const artist = card.getAttribute("data-artist").toLowerCase()
    const genre = card.getAttribute("data-genre").toLowerCase()

    const matchesSearch = title.includes(searchInput) || artist.includes(searchInput)
    const matchesGenre = !genreFilter || genre === genreFilter

    if (matchesSearch && matchesGenre) {
      card.style.display = "block"
      visibleCount++
    } else {
      card.style.display = "none"
    }
  })

  // Show/hide no results message
  showNoResults(visibleCount === 0)
}

// Music sorting functionality
function sortMusic() {
  const sortValue = document.getElementById("sort-filter").value
  const container = document.getElementById("music-container")
  const cards = Array.from(container.querySelectorAll(".music-card"))

  cards.sort((a, b) => {
    switch (sortValue) {
      case "title":
        return a.getAttribute("data-title").localeCompare(b.getAttribute("data-title"))
      case "artist":
        return a.getAttribute("data-artist").localeCompare(b.getAttribute("data-artist"))
      case "popular":
        // Sort by play count (extract number from stats)
        const aPlays = Number.parseInt(a.querySelector(".music-stats span").textContent.replace(/[^\d]/g, ""))
        const bPlays = Number.parseInt(b.querySelector(".music-stats span").textContent.replace(/[^\d]/g, ""))
        return bPlays - aPlays
      case "recent":
      default:
        // Keep original order for recent
        return 0
    }
  })

  // Re-append sorted cards
  cards.forEach((card) => container.appendChild(card))
}

// Show/hide no results message
function showNoResults(show) {
  let noResultsDiv = document.querySelector(".no-results")

  if (show && !noResultsDiv) {
    noResultsDiv = document.createElement("div")
    noResultsDiv.className = "no-results"
    noResultsDiv.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>No music found</h3>
            <p>Try adjusting your search or filters</p>
        `
    document.getElementById("music-container").appendChild(noResultsDiv)
  } else if (!show && noResultsDiv) {
    noResultsDiv.remove()
  }
}

// Play/pause functionality
function togglePlay(button) {
  const icon = button.querySelector("i")
  const audio = button.closest(".music-card").querySelector("audio")

  // Stop all other playing tracks
  document.querySelectorAll(".music-card audio").forEach((otherAudio) => {
    if (otherAudio !== audio && !otherAudio.paused) {
      otherAudio.pause()
      otherAudio.currentTime = 0
      const otherButton = otherAudio.closest(".music-card").querySelector(".play-btn i")
      otherButton.className = "fas fa-play"
    }
  })

  // Toggle current track
  if (audio.paused) {
    audio.play()
    icon.className = "fas fa-pause"
    button.style.backgroundColor = "#1ed760"
  } else {
    audio.pause()
    icon.className = "fas fa-play"
    button.style.backgroundColor = "#1db954"
  }
}

// Load more music functionality
function loadMoreMusic() {
  const button = document.querySelector(".load-more .btn")
  button.textContent = "Loading..."
  button.disabled = true

  // Simulate loading delay
  setTimeout(() => {
    button.textContent = "Load More"
    button.disabled = false
    // Here you would typically load more music from your API
    console.log("Loading more music...")
  }, 1500)
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  loadViewPreference()

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "1":
          e.preventDefault()
          switchView("grid")
          break
        case "2":
          e.preventDefault()
          switchView("list")
          break
      }
    }
  })
})
