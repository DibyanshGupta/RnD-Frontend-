import React from "react";
import { useParams, Link } from "react-router-dom";
import { getPaperById } from "../../data/mockDb";
import StatusBadge from "../../components/StatusBadge";

export default function SubmissionDetails() {
  const { paperId } = useParams();
  const paper = getPaperById(paperId);

  if (!paper) {
    return (
      <div className="rounded-2xl border bg-white p-6">Paper not found.</div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Paper ID: {paper.id}</div>
          <h2 className="text-xl font-semibold">{paper.title}</h2>
        </div>
        <StatusBadge status={paper.status} />
      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="text-sm font-medium text-gray-700">Abstract</div>
        <p className="mt-2 text-sm text-gray-700">{paper.abstract}</p>

        <div className="mt-4 text-sm font-medium text-gray-700">Keywords</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {paper.keywords.map((k) => (
            <span key={k} className="rounded-full bg-gray-100 px-3 py-1 text-xs">
              {k}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white">
            Download PDF (mock)
          </button>
          <Link to="/author/submissions" className="rounded-xl border px-4 py-2 text-sm">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
