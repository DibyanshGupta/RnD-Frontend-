import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setRole } from "../data/mockDb";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // TEMP / MOCK:
    // role will be decided by backend or stored user data later
    const role = "author"; // default role for now

    setRole(role);

    const map = {
      author: "/author/dashboard",
      reviewer: "/reviewer/dashboard",
      admin: "/admin/dashboard",
    };

    navigate(map[role]);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Login</h2>
        <p className="mt-1 text-sm text-gray-600">
          Enter your credentials to continue.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              required
            />
          </div>

          <button className="w-full rounded-xl bg-gray-900 px-4 py-2 text-white font-medium">
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link className="text-gray-900 font-medium" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
