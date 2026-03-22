import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMentorDashboard } from "../../Redux/mentorSlice";

import { Users, CheckCircle, Clock, XCircle } from "lucide-react";

const Mentordashboard = () => {
  const dispatch = useDispatch();

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      const data = await dispatch(fetchMentorDashboard());

      if (data) {
        setDashboard(data);
      }
    };

    loadDashboard();
  }, [dispatch]);

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-10">Mentor Dashboard</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Bookings</p>

              <h3 className="text-3xl font-bold mt-1">
                {dashboard?.totalBookings || 0}
              </h3>
            </div>

            <Users size={36} />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Completed</p>

              <h3 className="text-3xl font-bold mt-1">
                {dashboard?.completed || 0}
              </h3>
            </div>

            <CheckCircle size={36} />
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Pending</p>

              <h3 className="text-3xl font-bold mt-1">
                {dashboard?.pending || 0}
              </h3>
            </div>

            <Clock size={36} />
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Rejected</p>

              <h3 className="text-3xl font-bold mt-1">
                {dashboard?.rejected || 0}
              </h3>
            </div>

            <XCircle size={36} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentordashboard;
