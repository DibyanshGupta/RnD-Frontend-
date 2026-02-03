import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export default function EditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    institution: "",
    department: "",
    academic_position: "",
  });

  const [otherInstitution, setOtherInstitution] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestInput, setInterestInput] = useState("");

  /* ===== Load profile (mock / API later) ===== */
  useEffect(() => {
    // Example mock data (replace with API later)
    const mockProfile = {
      name: "John Doe",
      email: "john@example.com",
      institution: "IIT Delhi",
      department: "Computer Science",
      academic_position: "PhD Scholar",
      research_interests: ["Machine Learning", "Databases"],
    };

    setProfile(mockProfile);
    setSelectedInterests(mockProfile.research_interests || []);
  }, []);

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function addInterest(value) {
    if (!value || selectedInterests.includes(value)) return;
    setSelectedInterests([...selectedInterests, value]);
  }

  function removeInterest(value) {
    setSelectedInterests(selectedInterests.filter((i) => i !== value));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedProfile = {
      ...profile,
      institution:
        profile.institution === "Other"
          ? otherInstitution
          : profile.institution,
      research_interests: selectedInterests,
    };

    console.log("Updated Profile:", updatedProfile);
    alert("Profile updated successfully");
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">Edit Profile</h2>
        <p className="mt-1 text-sm text-gray-600">
          Keep your academic details up to date.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              value={profile.email}
              disabled
              className="mt-1 w-full rounded-xl border px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Institution */}
          <div>
            <label className="text-sm font-medium text-gray-700">Institution</label>
            <select
              name="institution"
              value={profile.institution}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-3 py-2 bg-white"
              required
            >
              <option value="">Select institute</option>
              {INSTITUTES.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>

            {profile.institution === "Other" && (
              <input
                className="mt-2 w-full rounded-xl border px-3 py-2"
                placeholder="Enter institute name"
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
              name="department"
              value={profile.department}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            />
          </div>

          {/* Academic Position */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Academic Position
            </label>
            <input
              name="academic_position"
              value={profile.academic_position}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-3 py-2"
            />
          </div>

          {/* Research Interests */}
          <div className="md:col-span-2">
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

            <div className="mt-3 flex flex-wrap gap-2">
              {selectedInterests.map((i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1 text-sm"
                >
                  {i}
                  <button type="button" onClick={() => removeInterest(i)}>
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Save */}
          <div className="md:col-span-2 flex justify-end">
            <button className="rounded-xl bg-gray-900 px-6 py-2 text-white">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
