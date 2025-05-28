// Professional lyrics character counter
document.addEventListener("DOMContentLoaded", () => {
  const lyricsTextarea = document.getElementById("lyrics")
  const lyricsCount = document.querySelector(".lyrics-count")

  if (lyricsTextarea && lyricsCount) {
    function updateCharCount() {
      const count = lyricsTextarea.value.length
      lyricsCount.textContent = `${count.toLocaleString()} characters`

      // Change color based on length
      if (count > 2000) {
        lyricsCount.style.color = "#ff6b35"
      } else if (count > 1000) {
        lyricsCount.style.color = "#ffa500"
      } else {
        lyricsCount.style.color = "#b3b3b3"
      }
    }

    lyricsTextarea.addEventListener("input", updateCharCount)
    updateCharCount() // Initial count
  }

})