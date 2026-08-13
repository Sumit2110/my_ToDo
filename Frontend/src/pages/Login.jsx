import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/auth/login", {
                email,
                password,
            });

            console.log("LOGIN RESPONSE:", response.data);

          
            localStorage.setItem(
                "token",
                response.data.token
            );

           
            if (response.data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }

           
            navigate("/dashboard");

        } catch (error) {
            console.error("LOGIN ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please check your credentials."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

             

                <div className="login-logo">
                    <div className="login-logo-icon">
                        ✓
                    </div>

                    <span>
                        TaskFlow
                    </span>
                </div>


               

                <div className="login-heading">

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Login to your Todo account
                    </p>

                </div>


               

                {error && (
                    <div className="login-error">
                        {error}
                    </div>
                )}


               

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >

                    <div className="login-input-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>


                    <div className="login-input-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>


                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>


             

                <div className="register-link">

                    Don't have an account?

                    <Link to="/register">
                        Create an account
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;
