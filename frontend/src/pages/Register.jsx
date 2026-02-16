import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api";

/* ===== Institute List ===== */
const INSTITUTES = [
  "IIT Bombay",
  "IIT Delhi",
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Madras",
  "IISc Bangalore",
  "NIT Trichy",
  "NIT Surathkal",
  "NIT Warangal",
  "IIIT Hyderabad",
  "Jadavpur University",
  "University of Calcutta",
  "IEM Kolkata",
  "BITS Pilani",
  "Other",
];

/* ===== Research Interests ===== */
const INTERESTS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Databases",
  "Distributed Systems",
  "Computer Networks",
  "Cyber Security",
  "AR/VR",
  "Human Computer Interaction",
  "Software Engineering",
  "Data Mining",
];

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [institution, setInstitution] = useState("");
  const [otherInstitution, setOtherInstitution] = useState("");

  const [department, setDepartment] = useState("");
  const [academic_position, setAcademic_position] = useState("");

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestInput, setInterestInput] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ===== Password Rules ===== */
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

  const canSubmit =
    isPasswordStrong &&
    passwordsMatch &&
    selectedInterests.length > 0 &&
    (institution !== "Other" || otherInstitution.trim().length > 0);

  /* ===== Research Interest Helpers ===== */
  function addInterest(value) {
    if (!value || selectedInterests.includes(value)) return;
    setSelectedInterests([...selectedInterests, value]);
  }

  function removeInterest(value) {
    setSelectedInterests(selectedInterests.filter((i) => i !== value));
  }

  /* ===== Submit ===== */
  async function handleRegister(e) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      const payload = {
        name,
        email,
        password,
        institution:
          institution === "Other" ? otherInstitution : institution,
        department,
        academic_position,
        research_interests: selectedInterests,
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
                className="absolute inset-y-0 right-3 text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👀"}
              </button>
            </div>

            {password.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs">
                {Object.entries(passwordRules).map(([k, v]) => (
                  <li key={k} className={v ? "text-green-600" : "text-red-600"}>
                    • {k}
                  </li>
                ))}
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
                className="absolute inset-y-0 right-3 text-sm"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "🙈" : "👀"}
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
            <select
              className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            >
              <option value="">Select your institute</option>
              {INSTITUTES.map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
            </select>

            {institution === "Other" && (
              <input
                className="mt-2 w-full rounded-xl border px-3 py-2"
                placeholder="Enter your institute name"
                value={otherInstitution}
                onChange={(e) => setOtherInstitution(e.target.value)}
                required
              />
            )}
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

            <select
              className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
              onChange={(e) => {
                addInterest(e.target.value);
                e.target.value = "";
              }}
            >
              <option value="">Select an interest</option>
              {INTERESTS.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>

            <input
              className="mt-2 w-full rounded-xl border px-3 py-2"
              placeholder="Add custom interest and press Enter"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInterest(interestInput.trim());
                  setInterestInput("");
                }
              }}
            />

            <div className="mt-2 flex flex-wrap gap-2">
              {selectedInterests.map((i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1 text-sm"
                >
                  {i}
                  <button
                    type="button"
                    onClick={() => removeInterest(i)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
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
