import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "./api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);


  async function handleLogin(e) {

    e.preventDefault();

    try {

      const res = await api.post("/api/auth/login/", {
        email,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/author/dashboard");

    }
    catch (err) {

      console.error(err);

    }

  }


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6">
          Login
        </h2>


        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}

          <div>

            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              className="mt-1 w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>



          {/* Password */}

          <div>

            <label className="text-sm font-medium">
              Password
            </label>


            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full border rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />


              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
              >

                {showPassword ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}

              </button>

            </div>

          </div>



          {/* Button */}

          <button className="w-full py-3 rounded-xl text-white font-semibold
          bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90">

            Login

          </button>


        </form>



        <p className="mt-5 text-sm text-center">

          Don’t have an account?

          <Link to="/register" className="text-indigo-600 font-medium ml-1">

            Register

          </Link>

        </p>



      </div>

    </div>

  );

}
