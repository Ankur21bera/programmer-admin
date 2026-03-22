import { BookPlus, LayoutDashboard, ListOrdered, User, X,Calendar, BookUser } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {

  const { isAdminLoggedIn } = useSelector((state) => state.auth);
  const {isMentorLoggedIn} = useSelector((state)=>state.mentor);


  if (!isAdminLoggedIn && !isMentorLoggedIn) return null;

  const adminLinks = [
    { name: "Dashboard", to: "/admin-dashboard", icon: LayoutDashboard },
    { name: "Booking-Details", to: "/all-enrollment", icon: User },
    { name: "Add Course", to: "/add-course", icon: BookPlus },
    { name: "Course List", to: "/course-list", icon: ListOrdered },
    { name:"Manage Holidays",to:"/manage-holiday",icon: Calendar },
    { name: "Course Cancel List",to:"/cancel-list",icon:User},
    {name:"Enquiry",to:"/all-enquiries",icon:User}
  ];

 const mentorLinks = [
    { name: "Dashboard", to: "/mentor-dashboard", icon: LayoutDashboard },
    { name: "Students", to: "/student-enrollment", icon: User },
    { name: "Profile", to: "/mentor-profile", icon: User },
    {name:"Booking-Details",to:"/user-booking",icon:BookUser}
  ];

  const links = isAdminLoggedIn ? adminLinks:mentorLinks

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-[1600px] w-64 bg-white border-r shadow-sm z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <h2 className="font-semibold">
            {isAdminLoggedIn?"Admin Panel":"Mentor Panel"}
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <ul className="mt-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 transition-all ${
                    isActive
                      ? "bg-blue-50 border-r-4 border-blue-600 text-blue-600"
                      : "hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </ul>

      </div>
    </>
  );
};

export default Sidebar;