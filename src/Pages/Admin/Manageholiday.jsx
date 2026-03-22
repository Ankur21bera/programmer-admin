import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addHoliday, deleteHoliday, getHolidays } from "../../Redux/courseSlice";
import toast from "react-hot-toast";

const Manageholiday = () => {

  const dispatch = useDispatch();
  const { holidays } = useSelector((state) => state.course);

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [reason, setReason] = useState("");

  useEffect(() => {
    dispatch(getHolidays());
  }, [dispatch]);

  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  const daysInMonth = new Date(year, currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, currentMonth.getMonth(), 1).getDay();

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, currentMonth.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    const prev = new Date(year, currentMonth.getMonth() - 1, 1);

    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prev);
    }
  };

  const formatDate = (day) => {
    const month = currentMonth.getMonth() + 1;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  };

  const isPastDate = (day) => {
    const date = new Date(year, currentMonth.getMonth(), day);
    return date < new Date(today.setHours(0, 0, 0, 0));
  };

  const isHoliday = (date) => {
  if (!Array.isArray(holidays)) return null;

  return holidays.find((h) => h && h.date === date);
};
 
  const handleAddHoliday = (date) => {
    if (!reason) return alert("Enter holiday reason");

    dispatch(
      addHoliday({
        date,
        reason,
      })
    );

    setReason("");
  };

  const handleDeleteHoliday = (id) => {
    dispatch(deleteHoliday(id));
    toast.success("Holiday Removed Successfully")
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          {monthName} {year}
        </h2>

        <div className="flex gap-3">

          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg border hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg border hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>

        </div>
      </div>

      {/* HOLIDAY REASON */}

      <input
        type="text"
        placeholder="Enter holiday reason..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="border rounded-lg px-3 py-2 mb-6 w-full"
      />

      {/* DAYS */}

      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day)=>(
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* CALENDAR GRID */}

      <div className="grid grid-cols-7 gap-2">

        {[...Array(firstDay)].map((_,i)=>(
          <div key={i}></div>
        ))}

        {[...Array(daysInMonth)].map((_,i)=>{

          const day = i + 1;
          const date = formatDate(day);
          const holiday = isHoliday(date);
          const past = isPastDate(day);

          return(
            <div
              key={day}
              onClick={() => !past && !holiday && handleAddHoliday(date)}
              className={`relative p-4 h-[85px] rounded-xl border flex flex-col justify-between

              ${past ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
              ${holiday ? "bg-red-100 border-red-400" : "bg-gray-50 hover:bg-gray-100 cursor-pointer"}
              
              `}
            >

              <span className="font-semibold">{day}</span>

              {holiday && (
                <div className="flex justify-between items-center">

                  <span className="text-xs text-red-600 truncate">
                    {holiday.reason}
                  </span>

                  <button
                    onClick={(e)=>{
                      e.stopPropagation();
                      handleDeleteHoliday(holiday._id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={14}/>
                  </button>

                </div>
              )}

            </div>
          )

        })}

      </div>

    </div>
  );
};

export default Manageholiday;