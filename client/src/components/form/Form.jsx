import { useRef } from "react";
import './Form.css';
import closeIcon from "../../assets/Images/close.svg";
import eyeOpenIcon from "../../assets/Images/eye-outline.svg";
import eyeCloseIcon from "../../assets/Images/eye-off-outline.svg";
import googleIcon from "../../assets/Images/Google__G__logo.svg.webp";
import alertIcon from "../../assets/Images//alert-rhombus.svg";
import { Link } from "react-router-dom";

function togglebutton(inputRef, inputImgRef) {
    inputRef.current.type = inputRef.current.type === "password" ? "text" : "password";
    inputImgRef.current.src = inputRef.current.type === "password"
        ? eyeOpenIcon
        : eyeCloseIcon;
}

/**
 * prop shape:
 * {
 *   type:      "Login" | "Signup"
 *   values:    { email: string, username?: string }
 *   onChange:  (field: string, value: string) => void
 *   onSubmit:  (e: SubmitEvent) => void
 *   error:     string | null
 *   loading:   boolean
 * }
 */
function Form({ prop }) {
    const passwordRef = useRef(null);
    const passwordImgRef = useRef(null);
    const confirmpasswordRef = useRef(null);
    const confirmpasswordImgRef = useRef(null);

    const isLogin = prop.type === "Login";

    return (
        <form onSubmit={prop.onSubmit} noValidate>
            <div className="close"><Link to="/"><img src={closeIcon} alt="close" /></Link></div>

            {!isLogin && (
                <fieldset>
                    <label htmlFor="username"><h4>USERNAME</h4></label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="xyz123"
                        value={prop.values.username ?? ""}
                        onChange={(e) => prop.onChange("username", e.target.value)}
                        required
                    />
                </fieldset>
            )}

            <fieldset>
                <label htmlFor="email"><h4>EMAIL</h4></label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="xyz@example.com"
                    value={prop.values.email}
                    onChange={(e) => prop.onChange("email", e.target.value)}
                    required
                />
            </fieldset>

            <fieldset>
                <label htmlFor="password" className="mandatory"> <h4> PASSWORD</h4> {!isLogin && (<p>(Needs uppercase, digit & special character)</p>)}</label>
                <div className="password-wrapper">
                    <input
                        ref={passwordRef}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••••"
                        required
                    />
                    <button
                        type="button"
                        className="toggle"
                        onClick={() => togglebutton(passwordRef, passwordImgRef)}
                    >
                        <img ref={passwordImgRef} src={eyeOpenIcon} alt="see-password" />
                    </button>
                </div>
                {/* {isLogin && (
                    <a href="/forgot-passowrd" className="account-recovery">Forgot password?</a>
                )} */}
            </fieldset>

            {!isLogin && (
                <fieldset>
                    <label htmlFor="confirmPassword"><h4>CONFIRM PASSWORD</h4></label>
                    <div className="password-wrapper">
                        <input
                            ref={confirmpasswordRef}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••••"
                            required
                        />
                        <button
                            type="button"
                            className="toggle"
                            onClick={() => togglebutton(confirmpasswordRef, confirmpasswordImgRef)}
                        >
                            <img ref={confirmpasswordImgRef} src={eyeOpenIcon} alt="see-password" />
                        </button>
                    </div>
                </fieldset>
            )}

            {prop.error && (
                <div className="error-message">
                    <img src={alertIcon} alt="alert" />
                    <p>{prop.error}</p>
                </div>
            )}

            <fieldset className="buttons">
                <div className="access-buttons">
                    {isLogin ? (
                        <>
                            <Link to="/sign-up">Create account</Link>
                            <button type="submit" disabled={prop.loading}>
                                {prop.loading ? "Logging in…" : "Log in"}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/log-in">Log in</Link>
                            <button type="submit" disabled={prop.loading}>
                                {prop.loading ? "Creating account…" : "Sign up"}
                            </button>
                        </>
                    )}
                </div>
                {/* Google OAuth — full-page redirect handled by the server */}
                <a href={`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/login/google`} className="sign-in-google">
                    <img src={googleIcon} alt="google-logo" />
                    {isLogin ? "Continue" : "Sign up"} with Google
                </a>
            </fieldset>
        </form>
    );
}

export default Form;