import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [academic_position, setAcademic_position] = useState("");
  const [research_interests, setResearch_interests] = useState([]);
  

  function handleRegister(e) {
  e.preventDefault();

  const payload = {
    email: email,
    password: password,
    name: name,
    institution: institution,
    department: department,
    academic_position: academic_position,
    research_interests: research_interests
  };

  fetch("http://127.0.0.1:8000/api/auth/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
      }
      return res.json();
    })
    .then((data) => {
      console.log("Registration successful:", data);
      navigate("/login");
    })
    .catch((err) => {
      console.error("Registration error:", err);
      // optionally show error message in UI
    });
}


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Register</h2>
        <p className="mt-1 text-sm text-gray-600">Create a new account (mock).</p>

        <form className="mt-6 space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

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

          <div>
            <label className="text-sm font-medium text-gray-700">Role</label>
            {/* <select
              className="mt-1 w-full rounded-xl border px-3 py-2"
              // value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="author">Author</option>
              <option value="reviewer">Reviewer</option>
              <option value="admin">Admin</option>
            </select> */}
          </div>

          <button className="w-full rounded-xl bg-gray-900 px-4 py-2 text-white font-medium">
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