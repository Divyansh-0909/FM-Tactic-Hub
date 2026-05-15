import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function OAuthCallback() {
    const { saveAuth } = useAuth();
    const navigate = useNavigate();
    const hasRun = useRef(false); // To counter strictMode running OAuthCallback effect to run twice in development which causes failure in Google authentication

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");
        const id = params.get("id");
        const username = params.get("username");
        const email = params.get("email");

        if (token) {
            saveAuth(token, { id, username, email });
            navigate("/", { replace: true });
        } else {
            navigate("/log-in?error=oauth_failed", {
                replace: true
            });
        }
    }, [saveAuth, navigate]);

    return <p>Signing you in...</p>;
}

export default OAuthCallback;