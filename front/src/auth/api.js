import { getToken } from "./auth.js";

export async function apiRequest(url, options = {}) {

    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };
    
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(url, {
        ...options,
        headers
    });
    return response.json();
}