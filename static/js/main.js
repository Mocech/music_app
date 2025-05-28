
  function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling; // or find the button element you want to toggle icon on
    
    if (input.type === "password") {
      input.type = "text";
      // Change icon to eye-slash
      button.querySelector('i').classList.remove('fa-eye');
      button.querySelector('i').classList.add('fa-eye-slash');
    } else {
      input.type = "password";
      // Change icon back to eye
      button.querySelector('i').classList.remove('fa-eye-slash');
      button.querySelector('i').classList.add('fa-eye');
    }
  }

