document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const passwordInput = document.getElementById("password")
  const strengthMeter = document.querySelector(".strength-meter")
  const strengthText = document.querySelector(".strength-text")
  const strengthSegments = document.querySelectorAll(".strength-segment")

  // Update strength text with color and message
  function updateStrengthText(password, strength, strengthTextElement) {
    if (password.length === 0) {
      strengthTextElement.textContent = "Enter a password"
      strengthTextElement.style.color = "#666"  // neutral gray
      return
    }

    if (password.length < 6) {
      strengthTextElement.textContent = "Too short"
      strengthTextElement.style.color = "#e74c3c"  // red
      return
    }

    const messages = [
      { text: "Very Weak", color: "#e74c3c" },  // red
      { text: "Weak", color: "#e67e22" },       // orange
      { text: "Fair", color: "#f1c40f" },       // yellow
      { text: "Good", color: "#2ecc71" },       // green
      { text: "Strong", color: "#27ae60" },     // dark green
      { text: "Very Strong", color: "#1abc9c" } // turquoise
    ]

    let level = Math.min(Math.max(strength, 0), 5)
    strengthTextElement.textContent = messages[level].text + " password"
    strengthTextElement.style.color = messages[level].color
  }

  // Password input event — update meter and text
  if (passwordInput && strengthMeter) {
    passwordInput.addEventListener("input", function () {
      const password = this.value
      let strength = 0

      if (password.length >= 8) strength++
      if (password.length >= 12) strength++    // Bonus for long password
      if (password.match(/[a-z]/)) strength++
      if (password.match(/[A-Z]/)) strength++
      if (password.match(/[0-9]/)) strength++
      if (password.match(/[^A-Za-z0-9]/)) strength++

      // Normalize strength to max 5
      if (strength > 5) strength = 5

      // Update meter segments
      strengthSegments.forEach((segment, index) => {
        segment.className = "strength-segment"
        if (index < strength) {
          if (strength <= 1) segment.classList.add("very-weak")
          else if (strength === 2) segment.classList.add("weak")
          else if (strength === 3) segment.classList.add("fair")
          else if (strength === 4) segment.classList.add("good")
          else if (strength === 5) segment.classList.add("strong")
        }
      })

      // Update strength text with color and message
      updateStrengthText(password, strength, strengthText)
    })
  }

  // Toggle password visibility
  const togglePassword = document.querySelector(".toggle-password")
  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const passwordInput = document.getElementById("password")
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)

      // Toggle eye icon classes
      const eyeIcon = this.querySelector("i")
      eyeIcon.classList.toggle("fa-eye")
      eyeIcon.classList.toggle("fa-eye-slash")
    })
  }

  // Signup form submit — show loading state but allow real submission
  const signupForm = document.querySelector(".login-form")  // Adjust selector if needed
  if (signupForm) {
    signupForm.addEventListener("submit", function () {
      const submitButton = this.querySelector(".btn-login")
      if (submitButton) {
        submitButton.textContent = "Creating Account..."
        submitButton.disabled = true
      }
      // No preventDefault — form submits to backend
    })
  }
})
