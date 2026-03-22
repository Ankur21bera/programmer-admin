import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMentorBookings,
  updateBookingStatus,
} from "../../Redux/mentorSlice";
import { Badge, Button } from "flowbite-react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  CreditCard,
} from "lucide-react";

const Bookingdetail = () => {
  const dispatch = useDispatch();
  const { mentorBookings, loading } = useSelector((state) => state.mentor);

  useEffect(() => {
    dispatch(fetchMentorBookings());
  }, [dispatch]);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time) => time?.toLowerCase();

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const year = dob.split("-")[2] || dob.split("-")[0];
    return new Date().getFullYear() - year;
  };

  if (loading) {
    return <div className="p-10 text-center font-semibold">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-10">
      <h2 className="text-3xl font-bold mb-10">Your Booking</h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mentorBookings.map((item, index) => {
          const user = item.userData;
          const course = item.courseData;

          return (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col"
            >
              {/* Course Header */}

              <div className="relative">
                <img src={course?.image} className="h-40 w-full object-cover" />

                <div className="absolute top-3 right-3">
                  {item.status === "completed" && (
                    <Badge color="success" icon={CheckCircle}>
                      Completed
                    </Badge>
                  )}

                  {item.status === "rejected" && (
                    <Badge color="failure" icon={XCircle}>
                      Rejected
                    </Badge>
                  )}

                  {item.status === "pending" && (
                    <Badge color="warning" icon={Clock}>
                      Pending
                    </Badge>
                  )}
                </div>

                {/* User Avatar */}

                <img
                  src={user?.image}
                  className="absolute -bottom-6 left-4 w-12 h-12 rounded-full border-4 border-white object-cover"
                />
              </div>

              {/* Card Body */}

              <div className="p-4 pt-8 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-1">{course?.title}</h3>

                <p className="text-xs text-gray-500 mb-3">
                  Duration : {course?.duration}
                </p>

                {/* User Info */}

                <div className="text-sm text-gray-600 space-y-1 mb-4">
                  <p className="font-medium">{user?.name}</p>

                  <p className="text-xs text-gray-500">{user?.email}</p>

                  <p className="text-xs">
                    Age : {calculateAge(user?.dob)} | {user?.gender}
                  </p>

                  <p className="text-xs">{user?.qualification}</p>
                </div>

                {/* Slot */}

                <div className="border-t pt-3 text-sm text-gray-600 space-y-1">
                  <p className="flex items-center gap-2">
                    <Calendar size={14} /> {formatDate(item.slotDate)}
                  </p>

                  <p>Time : {formatTime(item.slotTime)}</p>
                </div>

                {/* Payment */}

                <div className="flex justify-between items-center mt-3 text-sm">
                  <p className="flex items-center gap-2">
                    <CreditCard size={14} /> {item.paymentMode}
                  </p>

                  <Badge color={item.payment ? "success" : "warning"}>
                    {item.payment ? "Paid" : "Pending"}
                  </Badge>
                </div>

             

                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-bold text-indigo-600">
                    ₹{course?.price}
                  </p>

                  <p className="text-xs text-gray-400">#{index + 1}</p>
                </div>

               

                <div className="flex gap-2 mt-4">
                  <Button
                    size="xs"
                    className="w-full bg-red-500 text-white cursor-pointer"
                    onClick={() =>
                      dispatch(updateBookingStatus(item._id, "reject"))
                    }
                  >
                    Reject
                  </Button>

                  <Button
                    size="xs"
                    color="success"
                    className="w-full bg-green-500 text-white cursor-pointer"
                    onClick={() =>
                      dispatch(updateBookingStatus(item._id, "complete"))
                    }
                  >
                    Complete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookingdetail;
