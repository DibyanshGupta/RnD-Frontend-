import React from "react";
import { NavLink } from "react-router-dom";

function Item({ to, label }) {

  return (

    <NavLink

      to={to}

      className={({ isActive }) =>

        `block px-4 py-2 rounded-lg text-sm font-medium transition

        ${

          isActive

            ? "bg-blue-600 text-white"

            : "text-slate-300 hover:bg-slate-800"

        }`

      }

    >

      {label}

    </NavLink>

  );

}


export default function Sidebar({ role }) {

  const menus = {

    author: [

      { to: "/author/dashboard", label: "Dashboard" },

      { to: "/author/submit", label: "Submit Paper" },

      { to: "/author/submissions", label: "My Submissions" },

    ],

  };


  return (

    <aside className="
      h-full
      bg-slate-900
      text-white
      p-5
    ">


      <div className="mb-6">

        <div className="text-xs text-slate-400">
          MENU
        </div>

        <div className="text-lg font-semibold">
          {role?.toUpperCase()}
        </div>

      </div>


      <div className="space-y-2">

        {(menus[role] || []).map((m) => (

          <Item key={m.to} {...m} />

        ))}

      </div>


    </aside>

  );

}
