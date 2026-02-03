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

  /* ===== Dynamic Authors ===== */
  const [authors, setAuthors] = useState([
    { name: "", email: "" }, // primary author
  ]);

  /* ===== Author Helpers ===== */
  function handleAuthorChange(index, field, value) {
    const updated = [...authors];
    updated[index][field] = value;
    setAuthors(updated);
  }

  function addAuthor() {
    setAuthors([...authors, { name: "", email: "" }]);
  }

  function removeAuthor(index) {
    setAuthors(authors.filter((_, i) => i !== index));
  }

  /* ===== Submit ===== */
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!pdf) {
        alert("Please select a PDF first.");
        return;
      }

      // Validate authors
      for (const a of authors) {
        if (!a.name || !a.email) {
          alert("Please fill name and email for all authors.");
          return;
        }
      }

      /* === Step 1: Get upload auth === */
      const authRes = await api.get("/api/files/upload_auth/");
      const { token, signature, expire, publicKey } = authRes.data;

      /* === Step 2: Upload PDF === */
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

      /* === Step 3: Create paper === */
      await api.post("/api/papers/create/", {
        title,
        abstract,
        keywords,
        subject_area,
        pdf_url,
        authors,
      });

      setMsg("Paper submitted successfully!");

      // reset form
      setTitle("");
      setAbstract("");
      setKeywords("");
      setSubjectArea("");
      setPdf(null);
      setAuthors([{ name: "", email: "" }]);
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
          <label className="text-sm font-medium text-gray-700">Abstract</label>
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
                <input
                  className="md:col-span-2 rounded-xl border px-3 py-2"
                  placeholder="Author Name"
                  value={author.name}
                  onChange={(e) =>
                    handleAuthorChange(index, "name", e.target.value)
                  }
                  required
                />

                <input
                  className="md:col-span-2 rounded-xl border px-3 py-2"
                  placeholder="Author Email"
                  type="email"
                  value={author.email}
                  onChange={(e) =>
                    handleAuthorChange(index, "email", e.target.value)
                  }
                  required
                />

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
          <label className="text-sm font-medium text-gray-700">Keywords</label>
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
