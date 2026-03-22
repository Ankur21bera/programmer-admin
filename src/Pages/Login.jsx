
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { setAdminLogin } from '../Redux/authSlice';
import { setMentorLogin } from '../Redux/mentorSlice';
import toast from 'react-hot-toast';

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [role,setRole] = useState("admin"); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async(e)=>{
    e.preventDefault();

    try {

      // ADMIN LOGIN
      if(role === "admin"){

        const {data} = await axios.post(
          `${backendUrl}/api/admin/admin-login`,
          {email,password}
        )

        if(data.success){

          dispatch(setAdminLogin(data.token));

          toast.success("Admin Login Successful");

          navigate("/");

        } else{

          toast.error("Invalid Admin");

        }

      }

      // MENTOR LOGIN
      if(role === "mentor"){

        const {data} = await axios.post(
          `${backendUrl}/api/mentor/mentor-login`,
          {email,password}
        )

        if(data.success){

          dispatch(setMentorLogin(data.token));

          toast.success("Mentor Login Successful");

          navigate("/mentor-dashboard");

        } else{

          toast.error("Invalid Mentor");

        }

      }

    } catch (error) {

      toast.error(error.response?.data?.message || "Something went wrong")

    }

  }

  return (

    <form className='min-h-screen flex items-center bg-gray-100' onSubmit={onSubmitHandler}>

     <div className='flex flex-col gap-4 m-auto p-8 w-[350px] bg-white rounded-xl shadow-lg'>

      <h2 className='text-2xl font-bold text-center'>Login</h2>

      {/* Toggle Login Type */}

      <div className='flex justify-center gap-4 text-sm'>

        <span
          onClick={()=>setRole("admin")}
          className={`cursor-pointer ${role==="admin" ? "text-blue-600 font-semibold" : ""}`}
        >
          Admin Login
        </span>

        <span
          onClick={()=>setRole("mentor")}
          className={`cursor-pointer ${role==="mentor" ? "text-blue-600 font-semibold" : ""}`}
        >
          Mentor Login
        </span>

      </div>

      <div>

        <label>Email</label>

        <input
          type="email"
          className='w-full p-2 border border-gray-300 rounded-md'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

      </div>

      <div>

        <label>Password</label>

        <input
          type="password"
          className='w-full p-2 border border-gray-300 rounded-md'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

      </div>

      <button
        type='submit'
        className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer'
      >
        {role === "admin" ? "Admin Login" : "Mentor Login"}
      </button>

     </div>

    </form>

  )
}

export default Login;