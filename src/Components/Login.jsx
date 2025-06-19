import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideImage from "../assets/Images/slide1.jpg";
import { AuthContext } from "../Auth/authContext.jsx";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        
        if (loggedInUser?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row w-full min-h-screen bg-[var(--Treasureana---Geocaching-App-11)]">
      {/* Login Form Section */}
      <div className="w-1/2 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2 text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display">
              Welcome Back
            </h2>
            <p className="text-[var(--Treasureana---Geocaching-App-9)] font-Funnel_Display">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--Treasureana---Geocaching-App-8)] mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--Treasureana---Geocaching-App-8)] mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-Funnel_Display">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[var(--Treasureana---Geocaching-App-8)] focus:ring-[var(--Treasureana---Geocaching-App-8)] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-[var(--Treasureana---Geocaching-App-8)] hover:text-[var(--Treasureana---Geocaching-App-9)]"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-[var(--Treasureana---Geocaching-App-8)] hover:bg-[var(--Treasureana---Geocaching-App-9)] text-white font-Funnel_Display_Medium tracking-wide font-medium rounded-lg transition duration-200 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="text-center text-sm text-[var(--Treasureana---Geocaching-App-8)] font-Funnel_Display">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-[var(--Treasureana---Geocaching-App-8)] hover:text-[var(--Treasureana---Geocaching-App-9)]"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative w-1/2 min-h-screen">
        <img
          src={SideImage}
          alt="Restaurant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="flex flex-col relative z-10 gap-10 items-center justify-center h-full">
          <h1 className="font-Pacifico text-5xl text-[var(--Treasureana---Geocaching-App-6)] text-center px-8">
            The Ceylon Curry Club
          </h1>
          <p className="font-Funnel_Display text-[var(--Treasureana---Geocaching-App-6)] text-lg text-center px-12">
            To keep connected with us please login with your personal information
            using your email address and password
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;