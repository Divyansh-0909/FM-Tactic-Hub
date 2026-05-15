import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import Form from "./Form";
import { useAuth } from "../../context/AuthContext";
import * as api from "../../lib/api";

function Login() {
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
                    FROM THE DUGOUT. <br />
                    TO YOUR GAME. <br />
                </h1>
                <p>Greatest tactics ever played. Now yours to download.</p>
                <Form
                    prop={{
                        type: "Login",
                        values: { email },
                        onChange: handleChange,
                        onSubmit: handleSubmit,
                        error,
                        loading,
                    }}
                />
            </div>
        </div>
    );
}

export default Login;