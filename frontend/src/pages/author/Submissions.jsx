import React, { useEffect, useMemo, useState } from "react";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AuthorSubmissions() {
  const [papers, setPapers] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  // ✅ Fetch papers from backend
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/papers/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });

        setPapers(res.data.papers);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      }
    };

    fetchSubmissions();
  }, []);

  // ✅ Filter papers by search + status
  const filtered = useMemo(() => {
    return papers.filter((p) => {
      // Search match (title or paperID)
      const matchesQ =
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        String(p.paperID).includes(q);

      // Status match
      const matchesStatus =
        status === "All"
          ? true
          : p.status === status.toLowerCase().replace(" ", "_");

      return matchesQ && matchesStatus;
    });
  }, [papers, q, status]);

  // ✅ Table columns
  const columns = [
    { key: "paperID", header: "Paper ID" },
    { key: "title", header: "Title" },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "action",
      header: "Action",
      render: (r) => (
        <Link
          className="text-gray-900 font-medium"
          to={`/author/submissions/${r.paperID}`}
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">My Submissions</h2>

        <div className="flex gap-2">
          {/* Search */}
          <input
            className="w-full sm:w-64 rounded-xl border px-3 py-2 text-sm"
            placeholder="Search by title or ID"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          {/* Status Filter */}
          <select
            className="rounded-xl border px-3 py-2 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>submitted</option>
            <option>under_review</option>
            <option>accepted</option>
            <option>rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} rows={filtered} rowKey="paperID" />
    </div>
  );
}
