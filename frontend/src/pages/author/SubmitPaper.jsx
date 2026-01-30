import React, { useState } from "react";
import api from "../api";
import axios from "axios";

export default function SubmitPaper() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [subject_area,setSubjectArea]=useState("");
  const [pdf, setPdf] = useState(null);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!pdf) {
        alert("Please select a PDF first.");
        return;
      }
      const authRes = await api.get("/api/files/upload_auth/");
      const { token, signature, expire, publicKey } = authRes.data;
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
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // console.log(percent + "% uploaded");
          },
        }
      );

      // console.log("Upload Success:", uploadRes.data);
      const pdf_url = uploadRes.data.url;
      await api.post("/api/papers/create/", {
        title,
        abstract,
        keywords,
        subject_area,
        pdf_url,
      });
      setMsg("Paper submitted successfully!");
      setTitle("");
      setAbstract("");
      setSubjectArea("");
      setKeywords("");
      setPdf(null);
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
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Subject Area</label>
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            value={subject_area}
            onChange={(e) => setSubjectArea(e.target.value)}
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
        </div>

        <button
          disabled={!pdf}
          className="rounded-xl bg-gray-900 px-5 py-2 text-white text-sm font-medium disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
