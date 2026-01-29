import React, { useState } from "react";
import { addPaper } from "../../data/mockDb";

export default function SubmitPaper() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [pdf, setPdf] = useState(null);
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addPaper({
      title,
      abstract,
      keywordsCsv: keywords,
      pdfName: pdf?.name,
    });
    setMsg("Paper submitted successfully (mock)!");
    setTitle("");
    setAbstract("");
    setKeywords("");
    setPdf(null);
  }

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Submit Paper</h2>
      <p className="mt-1 text-sm text-gray-600">
        Upload your paper details (mock upload).
      </p>

      {msg && (
        <div className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-800">
          {msg}
        </div>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

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

        <div>
          <label className="text-sm font-medium text-gray-700">Keywords</label>
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. peer review, COI, matching"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">PDF Upload</label>
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files?.[0] || null)}
          />
          <p className="mt-1 text-xs text-gray-500">Mock upload only.</p>
        </div>

        <button className="rounded-xl bg-gray-900 px-5 py-2 text-white text-sm font-medium">
          Submit
        </button>
      </form>
    </div>
  );
}