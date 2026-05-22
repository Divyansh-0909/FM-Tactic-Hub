import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");
            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch {
            // Corrupt storage — clear it
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        } finally {
            setLoading(false);
        }
    }, []);

    /** Persist a successful login/signup response */
    function saveAuth(newToken, newUser) {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    }

    /** Wipe auth state (logout) */
    function clearAuth() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, saveAuth, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}