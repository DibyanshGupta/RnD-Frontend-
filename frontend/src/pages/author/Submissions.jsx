import React, { useEffect, useMemo, useState } from "react";
import DataTable from "../../components/DataTable";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";
import api from "../api";

export default function AuthorSubmissions() {

  const [papers, setPapers] = useState([]);

  const [q, setQ] = useState("");

  const [status, setStatus] = useState("All");



  useEffect(() => {

    const fetchSubmissions = async () => {

      try {

        const res = await api.get("/api/papers/");

        setPapers(res.data.papers || []);

      }

      catch (err) {

        console.error(err);

      }

    };

    fetchSubmissions();

  }, []);



  const filtered = useMemo(() => {

    return papers.filter((p) => {

      const matchesQ =

        p.title.toLowerCase().includes(q.toLowerCase()) ||

        String(p.id).includes(q);



      const matchesStatus =

        status === "All"

          ? true

          : p.status === status;



      return matchesQ && matchesStatus;

    });

  }, [papers, q, status]);



  const columns = [

    {

      key: "id",

      header: "Paper ID",

    },



    {

      key: "title",

      header: "Title",

    },



    {

      key: "status",

      header: "Status",

      render: (r) => (

        <StatusBadge status={r.status} />

      ),

    },



    {

      key: "action",

      header: "Action",

      render: (r) => (

        <Link

          to={`/author/submissions/${r.id}`}

          className="
            text-blue-600
            font-semibold
            hover:underline
          "

        >

          View

        </Link>

      ),

    },

  ];



  return (

    <div className="max-w-6xl mx-auto">



      {/* NEW OUTER CARD — THIS IS THE VISIBLE CHANGE */}

      <div className="
        bg-white
        border border-slate-200
        shadow-lg
        rounded-2xl
        p-8
      ">



        {/* Header */}

        <div className="
          flex
          justify-between
          items-center
          mb-6
        ">


          <div>

            <h1 className="
              text-3xl
              font-bold
              text-slate-900
            ">

              My Submissions

            </h1>


            <p className="
              text-slate-500
              mt-1
            ">

              View and manage your research papers

            </p>

          </div>



          <div className="flex gap-3">


            <input

              value={q}

              onChange={(e) => setQ(e.target.value)}

              placeholder="Search papers"

              className="
                border
                rounded-lg
                px-4
                py-2
                focus:ring-2
                focus:ring-blue-500
                outline-none
              "

            />



            <select

              value={status}

              onChange={(e) => setStatus(e.target.value)}

              className="
                border
                rounded-lg
                px-4
                py-2
              "

            >

              <option value="All">

                All

              </option>

              <option value="submitted">

                Submitted

              </option>

              <option value="under_review">

                Under Review

              </option>

              <option value="accepted">

                Accepted

              </option>

              <option value="rejected">

                Rejected

              </option>

            </select>


          </div>


        </div>



        {/* Table */}

        <DataTable

          columns={columns}

          rows={filtered}

          rowKey="id"

        />


      </div>


    </div>

  );

}
