 const SUPABASE_URL = "https://ubrqudheimrkpkmnfvbq.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVicnF1ZGhlaW1ya3BrbW5mdmJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NDYwNTMsImV4cCI6MjA5NTIyMjA1M30.VyTGGCpL7go2TcoIJcc0Nc5pDq406r90pa2QpCvMu90";

    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const form = document.getElementById("login-form");
    const loginBtn = document.getElementById("login-btn");
    const errorBox = document.getElementById("error-box");
    const successBox = document.getElementById("success-box");
    const passwordInput = document.getElementById("password");
    const passwordToggle = document.getElementById("password-toggle");
    const passwordToggleIcon = document.getElementById("password-toggle-icon");

    function setButtonLoading(isLoading) {
      loginBtn.disabled = isLoading;
      loginBtn.innerHTML = isLoading
        ? '<span>Signing in...</span><i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>'
        : '<span>Login to Dashboard</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
    }

    function showError(message) {
      errorBox.style.display = "block";
      successBox.style.display = "none";
      errorBox.textContent = message;
    }

    function showSuccess(message) {
      successBox.style.display = "block";
      errorBox.style.display = "none";
      successBox.textContent = message;
    }

    async function checkSession() {
      const { data: { session } } = await supabaseClient.auth.getSession();

      if (session) {
        window.location.href = "dashboard.html";
      }
    }

    checkSession();

    passwordToggle.addEventListener("click", function () {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      passwordToggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
      passwordToggleIcon.className = isPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      setButtonLoading(true);
      errorBox.style.display = "none";
      successBox.style.display = "none";

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        showError(error.message);
        setButtonLoading(false);
        return;
      }

      showSuccess("Login successful. Redirecting...");

      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 900);
    });