// Función para mostrar mensajes (error o success) de forma accesible
function showMessage(message, isError = true) {
    const messageDiv = document.getElementById("message");
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.style.color = isError ? "red" : "green";
        messageDiv.style.display = "block";
        setTimeout(() => { messageDiv.style.display = "none"; }, 5000);
    } else {
        console.error("Elemento 'message' no encontrado en HTML.");
    }
}

// Función para obtener usuarios de localStorage
function getUsers() {
    try {
        return JSON.parse(localStorage.getItem("users")) || [];
    } catch (e) {
        console.error("Error al acceder a localStorage:", e);
        return [];
    }
}

// Función para guardar usuarios en localStorage
function saveUsers(users) {
    try {
        localStorage.setItem("users", JSON.stringify(users));
    } catch (e) {
        console.error("Error al guardar en localStorage:", e);
    }
}

// Función LOGIN
function login(email, password) {
    console.log("Ejecutando login con:", email, password); // Debug
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
        showMessage("Completa todos los campos.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        showMessage("Ingresa un correo electrónico válido.");
        return;
    }

    // Buscar usuario en localStorage
    const users = getUsers();
    const user = users.find(u => u.email === trimmedEmail && u.password === trimmedPassword);
    if (!user) {
        showMessage("Correo o contraseña incorrectos.");
        return;
    }

    // Éxito: Guardar sesión y redirigir
    localStorage.setItem("currentUser", JSON.stringify(user));
    showMessage("Inicio de sesión exitoso. Redirigiendo...", false);
    setTimeout(() => {
        window.location.href = "index.html"; // Asegúrate de que index.html exista
    }, 2000);
}

// Función REGISTER
function register(email, password) {
    console.log("Ejecutando register con:", email, password); // Debug
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
        showMessage("Completa todos los campos.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        showMessage("Ingresa un correo electrónico válido.");
        return;
    }

    if (trimmedPassword.length < 6) {
        showMessage("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    // Verificar si ya existe
    const users = getUsers();
    const existingUser = users.find(u => u.email === trimmedEmail);
    if (existingUser) {
        showMessage("Este correo electrónico ya está registrado.");
        return;
    }

    // Agregar nuevo usuario
    const newUser = { email: trimmedEmail, password: trimmedPassword };
    users.push(newUser);
    saveUsers(users);

    // Éxito: Redirigir a index.html
    showMessage("Cuenta registrada exitosamente. Redirigiendo...", false);
    setTimeout(() => {
        window.location.href = "index.html"; // Asegúrate de que index.html exista
    }, 2000);
}

// Detectar página y configurar eventos
document.addEventListener("DOMContentLoaded", () => {
    console.log("JS cargado y DOM listo. Pathname:", window.location.pathname);
    const isLoginPage = window.location.pathname.includes("login.html");
    const isRegisterPage = window.location.pathname.includes("register.html");

    if (isLoginPage) {
        console.log("Detectada página de login");
        // Elementos para login
        const form = document.querySelector(".login-form");
        const emailInput = document.getElementById("emailLogin");
        const passwordInput = document.getElementById("passwordLogin");
        const registerLink = document.getElementById("register-link");

        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                console.log("Evento submit en login");
                const submitBtn = form.querySelector("button[type='submit']");
                if (submitBtn) submitBtn.disabled = true;
                login(emailInput.value, passwordInput.value);
                setTimeout(() => { if (submitBtn) submitBtn.disabled = false; }, 1000);
            });
        } else {
            console.error("Formulario de login no encontrado");
        }

        if (registerLink) {
            registerLink.addEventListener("click", () => {
                window.location.href = "register.html";
            });
        }

    } else if (isRegisterPage) {
        console.log("Detectada página de register");
        // Elementos para register
        const form = document.querySelector(".login-form");
        const emailInput = document.getElementById("emailRegister");
        const passwordInput = document.getElementById("passwordRegister");
        const loginLink = document.getElementById("login-link");

        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                console.log("Evento submit en register");
                const submitBtn = form.querySelector("button[type='submit']");
                if (submitBtn) submitBtn.disabled = true;
                register(emailInput.value, passwordInput.value);
                setTimeout(() => { if (submitBtn) submitBtn.disabled = false; }, 1000);
            });
        } else {
            console.error("Formulario de register no encontrado");
        }

        if (loginLink) {
            loginLink.addEventListener("click", () => {
                window.location.href = "login.html";
            });
        }
    } else {
        console.log("Página no reconocida:", window.location.pathname);
    }
});