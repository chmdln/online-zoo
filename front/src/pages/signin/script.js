import { renderHeader } from "../../components/header/header.js";
import { renderFooter } from "../../components/footer/footer.js";


const BASE_PATH = window.location.hostname === '127.0.0.1' ? '' : '/online-zoo';

const header = document.getElementById('header');
const footer = document.getElementById('footer');
header.innerHTML = renderHeader();
footer.innerHTML = renderFooter();
const form = document.querySelector(".signin-form");
const signInBtn = document.querySelector("button[type='submit']");

const login = document.getElementById("login");
const password = document.getElementById("password");
const signInError = document.querySelector(".signin-error.error-message");
const inputs = [login, password]; 

const loginRegex = /^[A-Za-z][A-Za-z]{2,}$/;
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
        showError(login, "Login must be at least 3 characters long and contain English letters only.");
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

function updateButtonState(isValid) {
    signInBtn.disabled = !isValid;
}

async function signin(userData) {
    try {
        const response = await fetch(
            "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            }
        );

        const resp = await response.json();
        if (!response.ok) {
            signInError.textContent = resp.error || "Login failed. Please, try again.";
            return;
        }

        signInError.textContent = resp.message || "Login successful!";
        signInError.style.color = "#00A092";
        
        localStorage.setItem("user", JSON.stringify({
            username: resp.data.user.login,
            name: resp.data.user.name,
            email: resp.data.user.email
        }))

        // fetch isDonor and merge before redirect
        console.log("resp.data.user.login", resp.data.user.login);
        const chatUser = await getChatUser(resp.data.user.login);
        console.log("chatUser", chatUser);
        if (chatUser) {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            savedUser.isDonor = chatUser.isDonor;
            localStorage.setItem('user', JSON.stringify(savedUser));
        }
        
        setTimeout(() => {
            window.location.href = "../../";
        }, 1500);

    } catch (err) {
        console.error(err);
        signInError.textContent = err.error || "Server error. Please try again.";
    }
}

async function getChatUser(username) {
    try { 
        const response = await fetch(`http://localhost:3000/user/${username}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }
        );

        const resp = await response.json();
        if (!response.ok) {
            console.error(resp.error);
            return;
        }
        return resp
    } catch (err) {
        console.error(err);
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", () => {
        clearError(input); 
        signInError.textContent = "";
    });

    input.addEventListener("blur", () => {
        switch (input.id) {
            case "login":
                validateLogin();
                break;
            case "password":
                validatePassword();
                break;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    header.innerHTML = renderHeader();

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

form.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const isValid =
        validateLogin() &&
        validatePassword(); 
    
    updateButtonState(isValid);
    if (!isValid) return;

    const userData = {
        login: login.value,
        password: password.value
    };

    await signin(userData);
    signInBtn.disabled = false;
    form.reset();
});
