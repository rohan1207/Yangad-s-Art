import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(phone, password);
      const dest = location.state?.from?.pathname || "/";
      navigate(dest, { replace: true });
    } catch (err) {
      // Check for user not found error (customize this if your backend uses a different message)
      if (
        err.message &&
        (err.message.toLowerCase().includes("user not found") ||
          err.message.toLowerCase().includes("no user"))
      ) {
        setError("User not found. Please sign up below.");
      } else {
        setError(err.message || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50/20 py-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
            {error.toLowerCase().includes("user not found") && (
              <div className="mt-2">
                <Link
                  to="/signup"
                  state={location.state ? location.state : { from: location }}
                  className="inline-block bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        )}
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button className="w-full bg-amber-600 text-white py-2 rounded">
          Login
        </button>
        <p className="text-sm text-center">
          New user?{" "}
          <Link
            to="/signup"
            state={location.state ? location.state : { from: location }}
            className="text-amber-600"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;
