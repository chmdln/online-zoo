import { saveToken } from "../../auth/auth.js";
import { renderHeader } from "../../components/header/header.js";
import { renderFooter } from "../../components/footer/footer.js";
import { API_URL } from "../../config.js";

const BASE_PATH = window.location.hostname === '127.0.0.1' ? '' : '/online-zoo';
const header = document.getElementById('header');
const footer = document.getElementById('footer');
header.innerHTML = renderHeader();
footer.innerHTML = renderFooter();

const form = document.querySelector(".signup-form");
const registerBtn = document.querySelector("button[type='submit']");

const login = document.getElementById("login");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const userName = document.getElementById("name");
const email = document.getElementById("email");
const inputs = [login, password, confirmPassword, userName, email];
const signupError = document.querySelector(".signup-error.error-message");

const loginRegex = /^[A-Za-z][A-Za-z]{2,}$/;
const nameRegex = /^[A-Za-z]{3,}$/;
const passwordRegex = /^(?=.*[^A-Za-z0-9]).{6,}$/;

function showError(input, message) {
    input.classList.add("error");
    const errGroup = input.parentElement;
    const error = errGroup.querySelector(".error-message");
    if (error) error.textContent = message;

    if (input.value) {
        errGroup.classList.add("error");
        const errIcon = errGroup.querySelector(".error-icon");
        if (errIcon) errIcon.classList.add("active");
    }
}

function clearError(input) {
    if (input.classList.contains("error")) {
        input.classList.remove("error");
        const errGroup = input.parentElement;
        const error = errGroup.querySelector(".error-message");
        if (error) error.textContent = "";
        
        if (input.value) {
            input.value = "";
            errGroup.classList.remove("error");
            const errIcon = errGroup.querySelector(".error-icon");
            if (errIcon) errIcon.classList.remove("active");
        } 
    } 
}

function validateLogin() {
    if (!login.value) {
        showError(login, "Login is required");
        return false;
    }
    if (!loginRegex.test(login.value)) {
        showError(login, "Login must be at least 3 characters and English letters only.");
        return false;
    }
    return true;
}

function validatePassword() {
    if (!password.value) {
        showError(password, "Password is required");
        return false;
    }
    if (!passwordRegex.test(password.value)) {
        showError(password, "Password must be at least 6 characters and contain at least 1 special character.");
        return false;
    }
    return true;
}

function validateConfirmPassword() {
    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "Passwords do not match");
        return false;
    }
    return true;
}

function validateName() {
    if (!userName.value) {
        showError(userName, "Name is required");
        return false;
    }
    const userNameCleaned = userName.value.split(" ").join("");
    if (!nameRegex.test(userNameCleaned)) {
        showError(userName, "Name must be at least 3 characters long and English letters only.");
        return false;
    }
    return true;
}

function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value) {
        showError(email, "Email is required");
        return false;
    }
    if (!emailRegex.test(email.value)) {
        showError(email, "Please enter a valid email address.");
        return false;
    }
    return true;
}

function updateButtonState(isValid) {
    registerBtn.disabled = !isValid;
}

async function signup(userData) {
    try {
        const response = await fetch(
            "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/auth/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            }
        );

        const resp = await response.json();
        if (!response.ok) {
            signupError.textContent = resp.error || "Registration failed. Please, try again.";
            return;
        }

        const token = resp.data.access_token;
        saveToken(token);
        signupError.textContent = resp.message || "Registration successful!";
        signupError.style.color = "#00A092";

        setTimeout(() => {
            window.location.href = "../signin/";
        }, 1500);

    } catch (err) {
        console.error(err);
        signupError.textContent = err.error || "Server error. Please try again.";
    }
}

async function createChatUser() {
    try {
        const response = await fetch(`${API_URL}/user/signup`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: userName.value,
                    username: login.value,
                    email: email.value
                })
            }
        );

        const resp = await response.json();
        if (!response.ok) {
            console.error(resp.error);
            return;
        }
    } catch (err) {
        console.error(err);
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", () => {
        clearError(input); 
        signupError.textContent = "";
    });

    input.addEventListener("blur", () => {
        switch (input.id) {
            case "login":
                validateLogin();
                break;
            case "password":
                validatePassword();
                break;
            case "confirm-password":
                validateConfirmPassword();
                break;
            case "name":
                validateName();
                break;
            case "email":
                validateEmail();
                break;
        }
    });
});

form.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const isValid =
        validateLogin() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validateName() &&
        validateEmail();
    
    updateButtonState(isValid);
    if (!isValid) return;

    const userData = {
        login: login.value,
        password: password.value,
        name: userName.value,
        email: email.value
    };

    await signup(userData);
    await createChatUser(); 
    form.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    header.addEventListener('click', (e) => {
    if (e.target.closest('.user-icon')) {
        const popup = document.querySelector('.user-popup');
        popup.classList.toggle('active');
    }

    if (e.target.closest('.sign-in-btn')) {
        window.location.href = `${BASE_PATH}/pages/signin/`;
    } 

    if (e.target.closest('.sign-up-btn')) {
        window.location.href = `${BASE_PATH}/pages/signup/`;
    }

    if (e.target.closest('.sign-out-btn')) {
        localStorage.removeItem('user');
        header.innerHTML = renderHeader();
    }
}); 
});
