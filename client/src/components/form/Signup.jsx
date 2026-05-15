import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';
import Form from "./Form";
import { useAuth } from "../../context/AuthContext";
import * as api from "../../lib/api";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { saveAuth } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        setLoading(true);
        setError(null);

        try {
            const data = await api.signup(username, email, password, confirmPassword);

            if (data.error) {
                setError(data.error);
                // Server echoes back email/username so controlled inputs stay in sync
                if (data.email !== undefined) setEmail(data.email);
                if (data.username !== undefined) setUsername(data.username);
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
        if (field === "username") setUsername(value);
    }

    return (
        <div className="signup-main">
            <div className="account-form">
                <h1>CREATE ACCOUNT</h1>
                <p>Join FM Tactic Hub today. Read threads. Download tactics.</p>
                <Form
                    prop={{
                        type: "Signup",
                        values: { email, username },
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

export default Signup;