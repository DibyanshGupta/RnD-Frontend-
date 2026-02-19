import React, { useEffect, useState } from "react";
import Statscard from "../../components/Statscard";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AuthorDashboard() {

  const [papers, setPapers] = useState([]);

  const [counts, setCounts] = useState({
    submitted: 0,
    under_review: 0,
    accepted: 0,
    rejected: 0,
  });



  // Fetch dashboard data

  useEffect(() => {

    async function fetchDashboard() {

      try {

        const res = await axios.get(
          "http://127.0.0.1:8000/api/papers/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );

        setPapers(res.data.papers);
        setCounts(res.data.counts);

      }

      catch (err) {

        console.error("Dashboard fetch error:", err);

      }

    }

    fetchDashboard();

  }, []);



  // Latest 5 papers

  const latest = papers.slice(0, 5);



  // Table columns

  const columns = [

    {
      key: "paperID",
      header: "Paper ID",
    },

    {
      key: "title",
      header: "Title",
    },

    {
      key: "status",
      header: "Status",
      render: (row) => (
        <StatusBadge status={row.status} />
      ),
    },

    {
      key: "action",
      header: "Action",
      render: (row) => (

        <Link
          to={`/author/submissions/${row.paperID}`}
          className="
            text-blue-600
            font-medium
            hover:underline
          "
        >
          View
        </Link>

      ),
    },

  ];



  return (

    <div className="
      max-w-6xl
      mx-auto
      space-y-8
    ">


      {/* Welcome Section */}

      <div>

        <h1 className="
          text-3xl
          font-bold
          text-slate-900
        ">
          Welcome back 👋
        </h1>


        <p className="
          text-slate-500
          text-base
          mt-1
        ">
          Track and manage your research submissions
        </p>


      </div>



      {/* Stats Cards */}

      <div className="
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-4
      ">


        <Statscard
          label="Submitted"
          value={papers.length}
          color="blue"
        />


        <Statscard
          label="Under Review"
          value={counts.under_review}
          color="yellow"
        />


        <Statscard
          label="Accepted"
          value={counts.accepted}
          color="green"
        />


        <Statscard
          label="Rejected"
          value={counts.rejected}
          color="red"
        />


      </div>



      {/* Latest Submissions */}

      <div className="
        bg-white
        rounded-xl
        shadow-md
        border border-slate-200
        p-6
      ">


        {/* Header */}

        <div className="
          flex
          justify-between
          items-center
          mb-4
        ">


          <h2 className="
            text-lg
            font-semibold
            text-slate-800
          ">
            Latest Submissions
          </h2>



          <Link
            to="/author/submissions"
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-lg
              text-sm
              hover:bg-blue-700
              transition
            "
          >
            View All
          </Link>


        </div>



        {/* Table */}

        <DataTable
          columns={columns}
          rows={latest}
          rowKey="paperID"
        />


      </div>



    </div>

  );

}
