import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Landing() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("access");

    if (!token) return;

    fetch("http://127.0.0.1:8000/api/auth/verify_token/", {

      headers: {
        Authorization: `Bearer ${token}`
      }

    })
      .then(res => {

        if (!res.ok) throw new Error();

        navigate("/author/dashboard");

      })
      .catch(() => {});

  }, [navigate]);


  return (

<div className="min-h-screen flex flex-col bg-gray-100">



{/* HERO */}

<div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">

<div className="max-w-7xl mx-auto px-6 py-32 text-center">


<div className="text-sm uppercase text-indigo-200">

International Conference

</div>



<h1 className="text-5xl font-bold mt-4 leading-tight">

Artificial Intelligence & Data Systems

</h1>


<div className="mt-2 text-indigo-200 text-lg">

ICAIDS 2026

</div>



<p className="mt-6 max-w-2xl mx-auto text-indigo-100">

Premier global forum for researchers and professionals to present

cutting-edge innovations in AI, Systems, and Data Science.

</p>



{/* BADGES */}

<div className="flex justify-center gap-4 mt-6">

<div className="bg-white/20 px-4 py-1 rounded-full text-sm">

📍 Kolkata

</div>

<div className="bg-white/20 px-4 py-1 rounded-full text-sm">

🗓 Feb 20-22, 2026

</div>

</div>



{/* BUTTONS */}

<div className="flex justify-center gap-4 mt-8">

<Link
to="/login"
className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-medium hover:shadow-lg transition"
>

Login

</Link>


<Link
to="/register"
className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-indigo-700 transition"
>

Register

</Link>

</div>


</div>

</div>



{/* MAIN CONTENT */}

<div className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">



<div className="grid md:grid-cols-2 gap-8">


<div className="bg-white p-8 rounded-2xl shadow hover:shadow-md transition w-full">

<h2 className="font-semibold text-lg mb-4">

Important Dates

</h2>


<div className="space-y-2 text-gray-600">

<div>Paper Submission: Feb 10, 2026</div>

<div>Review Notification: Mar 1, 2026</div>

<div>Camera Ready: Mar 10, 2026</div>

<div>Conference: Feb 20-22, 2026</div>

</div>

</div>



<div className="bg-white p-8 rounded-2xl shadow hover:shadow-md transition w-full">

<h2 className="font-semibold text-lg mb-4">

Review Model

</h2>


<div className="space-y-2 text-gray-600">

<div>Double blind review</div>

<div>Expert reviewer assignment</div>

<div>Bias free process</div>

<div>Minimum 2 reviewers</div>

</div>

</div>



</div>



<div className="bg-white p-8 rounded-2xl shadow hover:shadow-md transition mt-10 w-full">

<h2 className="font-semibold text-lg mb-4">

Call for Papers

</h2>



<div className="grid md:grid-cols-2 gap-4 text-gray-600">

<div>Artificial Intelligence</div>

<div>Machine Learning</div>

<div>Computer Vision</div>

<div>Cyber Security</div>

<div>Cloud Computing</div>

<div>Data Science</div>

</div>


</div>


</div>



{/* FOOTER */}

<div className="text-center text-gray-500 text-sm py-6 border-t">

© ICAIDS 2026 · Department of Computer Science

<div>

Contact: icads2026@conference.org

</div>

</div>



</div>

);

}
