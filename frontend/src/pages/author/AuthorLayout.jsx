import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardShell } from "./_Shell";

export default function AuthorLayout() {

  return (

    <DashboardShell role="author" title="Author Dashboard">

      {/* Main content background wrapper */}

      <div className="
        bg-slate-100
        min-h-screen
        p-6
      ">

        <Outlet />

      </div>

    </DashboardShell>

  );

}
