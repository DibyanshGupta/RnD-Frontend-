import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./api";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const INSTITUTES = [
  "IIT Bombay","IIT Delhi","IIT Kanpur","IIT Kharagpur","IIT Madras",
  "IISc Bangalore","NIT Trichy","NIT Surathkal","NIT Warangal",
  "IIIT Hyderabad","Jadavpur University","University of Calcutta",
  "IEM Kolkata","BITS Pilani","Other",
];

const INTERESTS = [
  "Artificial Intelligence","Machine Learning","Computer Vision",
  "Natural Language Processing","Databases","Distributed Systems",
  "Computer Networks","Cyber Security","AR/VR",
  "Human Computer Interaction","Software Engineering","Data Mining",
];

export default function Register() {

  const navigate = useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");

  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");

  const [institution,setInstitution]=useState("");
  const [otherInstitution,setOtherInstitution]=useState("");

  const [department,setDepartment]=useState("");
  const [academic_position,setAcademic_position]=useState("");

  const [selectedInterests,setSelectedInterests]=useState([]);
  const [interestInput,setInterestInput]=useState("");

  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);



  const passwordRules={
    length: password.length>=10,
    upper:/[A-Z]/.test(password),
    lower:/[a-z]/.test(password),
    number:/[0-9]/.test(password),
    special:/[^A-Za-z0-9]/.test(password),
  };

  const isPasswordStrong=Object.values(passwordRules).every(Boolean);

  const passwordsMatch=
    password.length===0||confirmPassword.length===0
      ? true
      : password===confirmPassword;


  const canSubmit=
    isPasswordStrong &&
    passwordsMatch &&
    selectedInterests.length>0 &&
    (institution!=="Other"||otherInstitution.trim().length>0);



  function addInterest(value){

    if(!value||selectedInterests.includes(value)) return;

    setSelectedInterests([...selectedInterests,value]);

  }


  function removeInterest(value){

    setSelectedInterests(selectedInterests.filter(i=>i!==value));

  }



  async function handleRegister(e){

    e.preventDefault();

    if(!canSubmit) return;

    try{

      const payload={

        name,
        email,
        password,
        institution:institution==="Other"?otherInstitution:institution,
        department,
        academic_position,
        research_interests:selectedInterests,

      };

      const res=await api.post("/api/auth/register/",payload);

      localStorage.setItem("access",res.data.access);
      localStorage.setItem("refresh",res.data.refresh);

      navigate("/author/dashboard");

    }
    catch(err){

      console.error(err);

    }

  }



  const inputStyle="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none";



  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">

      <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg p-8">


        <h2 className="text-2xl font-bold mb-6 text-center">

          Create Account

        </h2>



        <form className="space-y-5" onSubmit={handleRegister}>



{/* Name */}

<div>

<label className="text-sm font-medium">Name</label>

<input
className={inputStyle}
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

</div>




{/* Email */}

<div>

<label>Email</label>

<input
type="email"
className={inputStyle}
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

</div>




{/* Password */}

<div>

<label>Password</label>

<div className="relative">

<input
type={showPassword?"text":"password"}
className={`${inputStyle} pr-12`}
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>


<button
type="button"
className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
onClick={()=>setShowPassword(!showPassword)}
>

{showPassword?<FaEyeSlash/>:<FaEye/>}

</button>

</div>

</div>




{/* Confirm */}

<div>

<label>Confirm Password</label>

<div className="relative">

<input
type={showConfirmPassword?"text":"password"}
className={`${inputStyle} pr-12`}
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
required
/>

<button
type="button"
className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
>

{showConfirmPassword?<FaEyeSlash/>:<FaEye/>}

</button>

</div>

</div>




{/* Institution */}

<div>

<label>Institution</label>

<select
className={inputStyle}
value={institution}
onChange={(e)=>setInstitution(e.target.value)}
required
>

<option value="">Select institute</option>

{INSTITUTES.map(inst=>(

<option key={inst}>{inst}</option>

))}

</select>

</div>




{/* Department */}

<div>

<label>Department</label>

<input
className={inputStyle}
value={department}
onChange={(e)=>setDepartment(e.target.value)}
required
/>

</div>




{/* Position */}

<div>

<label>Academic Position</label>

<input
className={inputStyle}
value={academic_position}
onChange={(e)=>setAcademic_position(e.target.value)}
required
/>

</div>




{/* Interests */}

<div>

<label>Research Interests</label>

<select
className={inputStyle}
onChange={(e)=>{

addInterest(e.target.value);

}}
>

<option>Select interest</option>

{INTERESTS.map(i=>(

<option key={i}>{i}</option>

))}

</select>



<input
className={inputStyle}
placeholder="Custom interest"
value={interestInput}
onChange={(e)=>setInterestInput(e.target.value)}
onKeyDown={(e)=>{

if(e.key==="Enter"){

e.preventDefault();

addInterest(interestInput);

setInterestInput("");

}

}}
/>




<div className="flex flex-wrap gap-2 mt-3">

{selectedInterests.map(i=>(

<span
key={i}
className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
>

{i}

<button type="button" onClick={()=>removeInterest(i)}>✕</button>

</span>

))}

</div>


</div>




{/* Submit */}

<button
disabled={!canSubmit}
className="w-full py-3 rounded-xl text-white font-semibold
bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 disabled:opacity-50"
>

Register

</button>



</form>




<p className="text-center mt-6">

Already have account?

<Link to="/login" className="text-indigo-600 ml-1 font-medium">

Login

</Link>

</p>



</div>

</div>

);

}
