document.addEventListener("DOMContentLoaded", () => {
  // Toggle password visibility (keep this)
  const togglePassword = document.querySelector(".toggle-password")
  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const passwordInput = document.getElementById("password")
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)

      const eyeIcon = this.querySelector("i")
      eyeIcon.classList.toggle("fa-eye")
      eyeIcon.classList.toggle("fa-eye-slash")
    })
  }

  // Show "Logging in..." on submit but DO NOT prevent default form submission
  const loginForm = document.querySelector(".login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", function () {
      const submitButton = this.querySelector(".btn-login")
      if (submitButton) {
        submitButton.textContent = "Logging in..."
        submitButton.disabled = true
      }
      // NO e.preventDefault() here - form submits naturally to Django backend
    })
  }
})

