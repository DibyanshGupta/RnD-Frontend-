import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ title }) {

  const navigate = useNavigate();

  const access = localStorage.getItem("access");


  return (

    <div className="
      bg-white
      shadow-md
      px-6
      py-4
      flex
      justify-between
      items-center
    ">


      <div>

        <div className="text-sm text-slate-500">

          Conference Portal

        </div>

        <div className="text-xl font-bold text-slate-900">

          {title}

        </div>

      </div>



      <button

        onClick={() => navigate("/login")}

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

        {access ? "Logout" : "Login"}

      </button>


    </div>

  );

}
