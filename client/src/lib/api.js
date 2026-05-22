const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send cookies (needed for Google OAuth session)
        body: JSON.stringify(body),
    });

    // Surface HTTP-level errors (500, 401, etc.) as a consistent shape
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { error: data.error || `Server error (${res.status})` };
    }

    return res.json();
}

/**
 * POST /log-in
 * Success: { message, token, user: { id, username, email } }
 * Failure: { error, email? }
 */
export function login(email, password) {
    return request("/log-in", { email, password });
}

/**
 * POST /sign-up
 * Success: { message, token, user: { id, username, email } }
 * Failure: { error, email?, username? }
 */
export function signup(username, email, password, confirmPassword) {
    return request("/sign-up", { username, email, password, confirmPassword });
}

/**
 * POST /log-out
 * Success: { message }
 */
export function logout() {
    return request("/log-out", {});
}