import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Landing() {

  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("access");
  if (!token) return;

  fetch("http://127.0.0.1:8000/api/auth/verify_token/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error("Invalid token");
      return;
    })
    .then(data => {
      // console.log("User already logged in");
      
      navigate("/author/dashboard");
    })
    .catch(() => {
      localStorage.removeItem("access");
    });

}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="text-sm text-gray-500">Conference Portal</div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-900">
            Conference Management System
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Submit papers, assign reviewers fairly, and run double-blind peer review with
            conflict-of-interest checks.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-xl bg-gray-900 px-5 py-3 text-white text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl border px-5 py-3 text-gray-900 text-sm font-medium"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">Deadlines</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Submission Deadline: 10 Feb 2026</li>
              <li>Review Deadline: 01 Mar 2026</li>
              <li>Decision Announcement: 10 Mar 2026</li>
            </ul>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">Call for Papers</div>
            <p className="mt-3 text-sm text-gray-600">
              We invite submissions in AI/ML, Security, AR/VR, Systems, and Data Science.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">Fair Assignment</div>
            <p className="mt-3 text-sm text-gray-600">
              Automatic reviewer matching with COI rules and load balancing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
