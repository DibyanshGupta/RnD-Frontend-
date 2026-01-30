import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [academic_position, setAcademic_position] = useState("");
  const [research_interests, setResearch_interests] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ================= Password Rules ================= */
  const passwordRules = {
    length: password.length >= 10,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordRules).every(Boolean);

  const passwordsMatch =
    password.length === 0 || confirmPassword.length === 0
      ? true
      : password === confirmPassword;

  const canSubmit = isPasswordStrong && passwordsMatch;

  /* ================= Submit ================= */
  async function handleRegister(e) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      const payload = {
        name,
        email,
        password,
        institution,
        department,
        academic_position,
        research_interests: research_interests
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
      };

      const res = await api.post("/api/auth/register/", payload);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/author/dashboard");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl border bg-white p-6 shadow-sm">
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`mt-1 w-full rounded-xl border px-3 py-2 pr-10 ${
                  !isPasswordStrong && password.length > 0
                    ? "border-red-500"
                    : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {password.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs">
                <li className={passwordRules.length ? "text-green-600" : "text-red-600"}>
                  • At least 10 characters
                </li>
                <li className={passwordRules.upper ? "text-green-600" : "text-red-600"}>
                  • One uppercase letter
                </li>
                <li className={passwordRules.lower ? "text-green-600" : "text-red-600"}>
                  • One lowercase letter
                </li>
                <li className={passwordRules.number ? "text-green-600" : "text-red-600"}>
                  • One number
                </li>
                <li className={passwordRules.special ? "text-green-600" : "text-red-600"}>
                  • One special character
                </li>
              </ul>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`mt-1 w-full rounded-xl border px-3 py-2 pr-10 ${
                  !passwordsMatch ? "border-red-500" : ""
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 text-sm text-gray-500"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {!passwordsMatch && (
              <p className="mt-1 text-xs text-red-600">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Institution */}
          <div>
            <label className="text-sm font-medium text-gray-700">Institution</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="text-sm font-medium text-gray-700">Department</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>

          {/* Academic Position */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Academic Position
            </label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={academic_position}
              onChange={(e) => setAcademic_position(e.target.value)}
              required
            />
          </div>

          {/* Research Interests */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Research Interests
            </label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={research_interests}
              onChange={(e) => setResearch_interests(e.target.value)}
              placeholder="AI, Databases, AR/VR"
              required
            />
          </div>

          {/* Submit */}
          <button
            disabled={!canSubmit}
            className="w-full rounded-xl bg-gray-900 px-4 py-2 text-white font-medium disabled:opacity-50"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="text-gray-900 font-medium" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
