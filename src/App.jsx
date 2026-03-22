import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Login from "./Pages/Login";

import Admindashboard from "./Pages/Admin/Admindashboard";
import Allenrollment from "./Pages/Admin/Allenrollment";
import Addcourse from "./Pages/Admin/Addcourse";
import Courselist from "./Pages/Admin/Courselist";
import Mentordashboard from "./Pages/Mentor/Mentordashboard";
import Mentorallenrollment from "./Pages/Mentor/Mentorallenrollment";
import MentorProfile from "./Pages/Mentor/MentorProfile";
import Manageholiday from "./Pages/Admin/Manageholiday";
import Coursecancellist from "./Pages/Admin/Coursecancellist";
import Enquiries from "./Pages/Admin/Enquiries";
import Bookingdetail from "./Pages/Mentor/Bookingdetail";


 export const backendUrl = "https://programmer-backend.vercel.app";

const App = () => {
  const { isAdminLoggedIn } = useSelector((state) => state.auth);
  const {isMentorLoggedIn} = useSelector((state)=>state.mentor);
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = isAdminLoggedIn || isMentorLoggedIn

  return (
    <div className="bg-[#f8f9fd] min-h-screen">
      <Toaster />

      {isLoggedIn ? (
        <>
          <Navbar setIsOpen={setIsOpen} />

          <div className="flex">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="flex-1 p-6">
              <Routes>
                {isAdminLoggedIn && (
                  <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/admin-dashboard" element={<Admindashboard />} />
                <Route path="/all-enrollment" element={<Allenrollment />} />
                <Route path="/add-course" element={<Addcourse />} />
                <Route path="/course-list" element={<Courselist />} />
                <Route path="/manage-holiday" element={<Manageholiday/>}/>
                <Route path="/cancel-list" element={<Coursecancellist/>}/>
                <Route path="/all-enquiries" element={<Enquiries/>}/>
                </>
                )}
                {isMentorLoggedIn && (
                  <>
                <Route path="/" element={<Navigate to="/mentor-dashboard" />} />
                <Route path="/mentor-dashboard" element={<Mentordashboard/>}/>
                <Route path="/student-enrollment" element={<Mentorallenrollment/>}/>
                <Route path="/mentor-profile" element={<MentorProfile/>}/>
                <Route path="/user-booking" element={<Bookingdetail/>}/>
                </>
                )}
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;