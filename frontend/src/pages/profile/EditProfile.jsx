import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getProfile, setProfile } from "../../data/mockDb";

export default function EditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    institution: "",
    department: "",
    academic_position: "",
    research_interests: "",
  });

  useEffect(() => {
    // const data = getProfile();
    // if (data) setProfile(data);
  }, []);

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // updateProfile(profile);
    alert("Profile updated successfully");
    navigate(-1); // go back
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl rounded-3xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Edit Profile</h2>
        <p className="mt-1 text-sm text-gray-600">
          Update your academic and professional details.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="rounded-xl border px-3 py-2"
            required
          />

          <input
            name="email"
            value={profile.email}
            disabled
            placeholder="sample@example.com"
            className="rounded-xl border px-3 py-2 bg-gray-100"
          />

          <input
            name="institution"
            value={profile.institution}
            onChange={handleChange}
            placeholder="Institution"
            className="rounded-xl border px-3 py-2"
          />

          <input
            name="department"
            value={profile.department}
            onChange={handleChange}
            placeholder="Department"
            className="rounded-xl border px-3 py-2"
          />

          <input
            name="academic_position"
            value={profile.academic_position}
            onChange={handleChange}
            placeholder="Academic Position"
            className="rounded-xl border px-3 py-2"
          />

          <input
            name="research_interests"
            value={profile.research_interests}
            onChange={handleChange}
            placeholder="Research Interests (comma separated)"
            className="rounded-xl border px-3 py-2 md:col-span-2"
          />

          <button className="md:col-span-2 rounded-xl bg-gray-900 px-4 py-2 text-white">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
