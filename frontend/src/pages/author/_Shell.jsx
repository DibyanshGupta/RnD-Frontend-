import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export function DashboardShell({ role, title, children }) {

  const [open, setOpen] = useState(false);

  return (

    <div className="
      h-screen
      flex
      flex-col
      bg-gradient-to-br
      from-slate-100
      to-slate-200
    ">

      {/* Navbar */}
      <Navbar
        title={title}
        onMenuClick={() => setOpen(true)}
      />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="w-72 flex-shrink-0">

          <Sidebar
            role={role}
            open={open}
            onClose={() => setOpen(false)}
          />

        </div>

        {/* Main */}
        <main className="
          flex-1
          overflow-y-auto
          p-8
        ">

          <div className="
            max-w-6xl
            mx-auto
            space-y-8
          ">

            {children}

          </div>

        </main>

      </div>

    </div>

  );

}
