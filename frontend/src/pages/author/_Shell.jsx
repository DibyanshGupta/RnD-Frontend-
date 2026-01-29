import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export function DashboardShell({ role, title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title={title} onMenuClick={() => setOpen(true)} />
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          <Sidebar role={role} open={open} onClose={() => setOpen(false)} />
          <main className="flex-1 p-6 md:p-8">
            <div className="max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}