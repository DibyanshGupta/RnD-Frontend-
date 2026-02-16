import React, { useState } from "react";
import api from "../api";
import axios from "axios";

export default function SubmitPaper() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [subject_area, setSubjectArea] = useState("");
  const [pdf, setPdf] = useState(null);
  const [msg, setMsg] = useState("");

  // ✅ Authors State (name + institute only)
  const [authors, setAuthors] = useState([
    { name: "", institute: "" },
  ]);

  // Update author field
  function handleAuthorChange(index, field, value) {
    const updated = [...authors];
    updated[index][field] = value;
    setAuthors(updated);
  }

  // Add co-author
  function addAuthor() {
    setAuthors([...authors, { name: "", institute: "" }]);
  }

  // Remove co-author
  function removeAuthor(index) {
    setAuthors(authors.filter((_, i) => i !== index));
  }

  // Submit handler
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!pdf) {
        alert("Please select a PDF first.");
        return;
      }

      // ✅ Validate authors
      for (const a of authors) {
        if (!a.name || !a.institute) {
          alert("Please fill name and institute for all authors.");
          return;
        }
      }

      /* ============================
         Step 1: Get ImageKit Upload Auth
      ============================ */
      const authRes = await api.get("/api/files/upload_auth/");
      const { token, signature, expire, publicKey } = authRes.data;

      /* ============================
         Step 2: Upload PDF to ImageKit
      ============================ */
      const formData = new FormData();
      formData.append("file", pdf);
      formData.append("fileName", pdf.name);
      formData.append("token", token);
      formData.append("signature", signature);
      formData.append("expire", expire);
      formData.append("publicKey", publicKey);
      formData.append("folder", "/Research_Papers");

      const uploadRes = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData
      );

      const pdf_url = uploadRes.data.url;

      /* ============================
         Step 3: Submit Paper Data
      ============================ */

      // ✅ Convert keywords string → array
      const keywordsArray = keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      // ✅ Submit to Django (authors only name + institute)
      await api.post("/api/papers/create/", {
        title,
        abstract,
        keywords: keywordsArray,
        subject_area,
        pdf_url,
        authors, // ✅ Perfect match with backend serializer
      });

      setMsg("✅ Paper submitted successfully!");

      // Reset form
      setTitle("");
      setAbstract("");
      setKeywords("");
      setSubjectArea("");
      setPdf(null);
      setAuthors([{ name: "", institute: "" }]);

    } catch (err) {
      console.error("Submission error:", err.response?.data || err);
      alert("Upload failed. Check console.");
    }
  }

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Submit Paper</h2>

      {msg && (
        <div className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-800">
          {msg}
        </div>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Abstract */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Abstract
          </label>
          <textarea
            className="mt-1 w-full rounded-xl border px-3 py-2"
            rows={4}
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            required
          />
        </div>

        {/* Authors */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Authors
          </label>

          <div className="mt-2 space-y-3">
            {authors.map((author, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center"
              >
                {/* Author Name */}
                <input
                  className="md:col-span-2 rounded-xl border px-3 py-2"
                  placeholder="Author Name"
                  value={author.name}
                  onChange={(e) =>
                    handleAuthorChange(index, "name", e.target.value)
                  }
                  required
                />

                {/* Author Institute */}
                <input
                  className="md:col-span-2 rounded-xl border px-3 py-2"
                  placeholder="Author Institute"
                  value={author.institute}
                  onChange={(e) =>
                    handleAuthorChange(index, "institute", e.target.value)
                  }
                  required
                />

                {/* Remove Button */}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="rounded-xl border px-3 py-2 text-sm text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addAuthor}
            className="mt-3 rounded-xl border px-4 py-2 text-sm"
          >
            + Add Co-Author
          </button>
        </div>

        {/* Keywords */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Keywords
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="AI, Databases, AR"
            required
          />
        </div>

        {/* Subject Area */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Subject Area
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            value={subject_area}
            onChange={(e) => setSubjectArea(e.target.value)}
            required
          />
        </div>

        {/* PDF Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            PDF Upload
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files?.[0] || null)}
          />
        </div>

        {/* Submit */}
        <button
          disabled={!pdf}
          className="rounded-xl bg-gray-900 px-5 py-2 text-white text-sm font-medium disabled:opacity-50"
        >
          Submit Paper
        </button>
      </form>
    </div>
  );
}
