import React from "react";
import StatsCard from "../../components/StatsCard";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { getPapers } from "../../data/mockDb";
import { Link } from "react-router-dom";

export default function AuthorDashboard() {
  const papers = getPapers();
  const total = papers.length;
  const underReview = papers.filter((p) => p.status === "Under Review").length;
  const accepted = papers.filter((p) => p.status === "Accepted").length;
  const rejected = papers.filter((p) => p.status === "Rejected").length;

  const latest = papers.slice(0, 5);

  const columns = [
    { key: "id", header: "Paper ID" },
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
          to={`/author/submissions/${r.id}`}
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Submissions" value={total} />
        <StatsCard label="Under Review" value={underReview} />
        <StatsCard label="Accepted" value={accepted} />
        <StatsCard label="Rejected" value={rejected} />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Latest Submissions</h3>
          <Link
            to="/author/submissions"
            className="rounded-xl border px-4 py-2 text-sm"
          >
            View All
          </Link>
        </div>
        <DataTable columns={columns} rows={latest} rowKey="id" />
      </div>
    </div>
  );
}