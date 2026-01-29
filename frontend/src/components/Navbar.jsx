import React from "react";
import { useNavigate } from "react-router-dom";
import { clearRole, getRole } from "../data/mockDb";

export default function Navbar({ title, onMenuClick }) {
  const navigate = useNavigate();
  const role = getRole();

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden rounded-lg border px-3 py-2 text-sm"
          onClick={onMenuClick}
        >
          Menu
        </button>
        <div>
          <div className="text-sm text-gray-500">Conference Portal</div>
          <div className="text-lg font-semibold text-gray-900">{title}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {role && (
          <span className="hidden sm:inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
            Role: {role}
          </span>
        )}
        {role ? (
          <button
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
            onClick={() => {
              clearRole();
              navigate("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
