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
      <div className="w-full max-w-xl rounded-3xl border bg-white p-6 shadow-sm">
        {/* <h2 className="text-2xl font-semibold">Register</h2> */}

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
            <label className="text-sm font-medium text-gray-700">Institution</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Department</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div><div>
            <label className="text-sm font-medium text-gray-700">Academic Position</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={academic_position}
              onChange={(e) => setAcademic_position(e.target.value)}
              required
            />
          </div><div>
            <label className="text-sm font-medium text-gray-700">Research Interests</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={research_interests}
              onChange={(e) => setResearch_interests(e.target.value)}
              placeholder="put comma separated values like 'Algorithms, Database, Statistics'"
              required
            />
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