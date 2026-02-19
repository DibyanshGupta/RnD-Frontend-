import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StatusBadge from "../../components/StatusBadge";

export default function SubmissionDetails() {

  const { paperId } = useParams();

  const [paper, setPaper] = useState(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchPaper = async () => {

      try {

        const res = await axios.get(

          `http://127.0.0.1:8000/api/papers/${paperId}/`,

          {

            headers: {

              Authorization: `Bearer ${localStorage.getItem("access")}`,

            },

          }

        );

        setPaper(res.data);

      }

      catch (err) {

        console.error(err);

        if (err.response?.status === 401) {

          localStorage.clear();

          window.location.href = "/login";

        }

      }

      finally {

        setLoading(false);

      }

    };

    fetchPaper();

  }, [paperId]);



  // Loading

  if (loading) {

    return (

      <div className="max-w-4xl mx-auto">

        <div className="
          bg-white
          rounded-xl
          shadow-md
          border
          p-6
        ">

          Loading paper details...

        </div>

      </div>

    );

  }



  // Not found

  if (!paper) {

    return (

      <div className="max-w-4xl mx-auto">

        <div className="
          bg-white
          rounded-xl
          shadow-md
          border
          p-6
        ">

          Paper not found.

        </div>

      </div>

    );

  }



  return (

    <div className="max-w-4xl mx-auto space-y-6">



      {/* Header Card */}

      <div className="
        bg-white
        rounded-xl
        shadow-md
        border border-slate-200
        p-6
      ">


        <div className="
          flex
          justify-between
          items-start
        ">


          <div>

            <p className="
              text-sm
              text-slate-500
            ">

              Paper ID: {paper.paperID}

            </p>


            <h1 className="
              text-2xl
              font-bold
              text-slate-900
              mt-1
            ">

              {paper.title}

            </h1>


          </div>



          <StatusBadge status={paper.status} />


        </div>


      </div>



      {/* Details Card */}

      <div className="
        bg-white
        rounded-xl
        shadow-md
        border border-slate-200
        p-6
      ">


        {/* Abstract */}

        <div>

          <h3 className="
            text-sm
            font-semibold
            text-slate-700
          ">

            Abstract

          </h3>


          <p className="
            mt-2
            text-slate-600
            leading-relaxed
          ">

            {paper.abstract}

          </p>


        </div>



        {/* Keywords */}

        <div className="mt-6">

          <h3 className="
            text-sm
            font-semibold
            text-slate-700
          ">

            Keywords

          </h3>


          <div className="
            mt-3
            flex
            flex-wrap
            gap-2
          ">


            {paper.keywords?.map((k, index) => (

              <span

                key={index}

                className="
                  bg-slate-100
                  text-slate-700
                  px-3
                  py-1
                  rounded-full
                  text-xs
                "

              >

                {k}

              </span>

            ))}


          </div>


        </div>



        {/* Buttons */}

        <div className="
          mt-8
          flex
          gap-3
        ">


          <a

            href={paper.pdf_url}

            target="_blank"

            rel="noreferrer"

            className="
              bg-blue-600
              text-white
              px-5
              py-2
              rounded-lg
              hover:bg-blue-700
              transition
            "

          >

            View PDF

          </a>



          <Link

            to="/author/submissions"

            className="
              border
              border-slate-300
              px-5
              py-2
              rounded-lg
              hover:bg-slate-100
            "

          >

            Back

          </Link>


        </div>


      </div>


    </div>

  );

}
