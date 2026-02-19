import React from "react";

export default function Statscard({
  label,
  value,
  color = "blue",
}) {

  const colors = {

    blue: "bg-blue-600",
    yellow: "bg-yellow-500",
    green: "bg-green-600",
    red: "bg-red-600",

  };

  return (

    <div className="
      bg-white
      p-6
      rounded-xl
      shadow-md
      hover:shadow-lg
      transition
    ">

      {/* Accent */}

      <div className={`
        h-1.5
        w-10
        rounded-full
        mb-4
        ${colors[color]}
      `}></div>


      <p className="text-sm text-slate-500">
        {label}
      </p>


      <p className="text-4xl font-bold text-slate-900">
        {value}
      </p>


    </div>

  );

}
