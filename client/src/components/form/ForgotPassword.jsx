import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { useAuth } from "../../context/AuthContext";
import * as api from "../../lib/api";
import { useRef } from "react";
import './Form.css';
import closeIcon from "../../assets/Images/close.svg";
import eyeOpenIcon from "../../assets/Images/eye-outline.svg";
import eyeCloseIcon from "../../assets/Images/eye-off-outline.svg";
import googleIcon from "../../assets/Images/Google__G__logo.svg.webp";
import alertIcon from "../../assets/Images//alert-rhombus.svg";
import { Link } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { saveAuth } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const password = e.target.password.value;

        setLoading(true);
        setError(null);

        try {
            const data = await api.login(email, password);

            if (data.error) {
                setError(data.error);
                // Server echoes back the email so controlled input stays in sync
                if (data.email !== undefined) setEmail(data.email);
            } else {
                saveAuth(data.token, data.user);
                navigate("/");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(field, value) {
        if (field === "email") setEmail(value);
    }

    return (
        <div className="login-main">
            <div className="account-form">
                <h1>
                    FORGOT YOUR PASSWORD? <br />
                    RESET IT NOW. <br />
                </h1>
                <h2>Enter your email. Click on the link to reset password.</h2>
                <form onSubmit={} noValidate>
                    <fieldset>
                        <label htmlFor="email"><h4>EMAIL</h4></label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="xyz@example.com"
                            value={email}
                            onChange={(e) => onChange("email", e.target.value)}
                            required
                        />
                    </fieldset>

                    {prop.error && (
                        <div className="error-message">
                            <img src={alertIcon} alt="alert" />
                            <p>{error}</p>
                        </div>
                    )}

                    <fieldset className="buttons">
                        <div className="access-buttons">
                            <>
                                <button type="submit" disabled={loading}>
                                    {loading ? "Sending…" : "Send reset link"}
                                </button>
                            </>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;