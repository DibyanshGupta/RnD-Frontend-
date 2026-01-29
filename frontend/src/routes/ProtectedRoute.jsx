import React from "react";
import { Navigate } from "react-router-dom";
import { getRole } from "../data/mockDb";


export default function ProtectedRoute({ allowedRoles, children }) {
const role = getRole();
if (!role) return <Navigate to="/login" replace />;
if (allowedRoles && !allowedRoles.includes(role)) {
// redirect to their own dashboard
const map = {
author: "/author/dashboard",
reviewer: "/reviewer/dashboard",
admin: "/admin/dashboard",
};
return <Navigate to={map[role] || "/"} replace />;
}
return children;
}