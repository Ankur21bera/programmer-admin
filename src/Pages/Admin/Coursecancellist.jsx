import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCancelledBookings } from '../../Redux/courseSlice';

const Coursecancellist = () => {
    const dispatch = useDispatch();
    const {cancelledBookings = [],loading} = useSelector((state)=>state.course);
    useEffect(()=>{
        dispatch(getCancelledBookings());
    },[dispatch])

    const formatDate = (date) => {
        if(!date) return "N/A";
        return new Date(date).toLocaleDateString("en-IN",{
            day:"numeric",
            month:"short",
            year:"numeric"
        })
    }

    if(loading){
        return(
            <div className='flex justify-center items-center h-[300px]'>
             <p className='text-lg font-semibold'>Loading Cancelled Bookings...</p>
            </div>
        )
    }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
     <div className='flex items-center justify-between mb-6'>
      <h1 className='text-2xl font-bold text-gray-800'>Cancelled Course Bookings</h1>
      <span className='bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium'>
        {cancelledBookings.length} Cancelled
      </span>
     </div>
     {cancelledBookings.length === 0 && (
        <div className='text-center text-gray-500 py-20'>
            No Cancelled Bookings Found
        </div>
     )}
     {cancelledBookings.length > 0  && (
        <div className='bg-white rounded-xl shadow'>
         <table className='w-full text-sm text-left'>
          <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Mentor</th>
                <th className="px-6 py-3">Slot</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
                {cancelledBookings.map((booking)=>(
                    <tr className='border-b hover:bg-gray-50' key={booking._id}>
                     <td className='px-6 py-4'>
                      <div>
                       <p className="font-semibold">
                        {booking.userId?.name || "N/A"}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {booking.userId?.email}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {booking.userId?.phone}
                      </p>
                      </div>
                     </td>
                     <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                       {booking.courseData?.image && (
                        <img className='w-12 h-12 rounded object-cover' src={booking.courseData.image} alt="" />
                       )}
                       <p className='font-medium'>
                        {booking.courseId?.title || "N/A"}
                       </p>
                      </div>
                     </td>
                     <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                       {booking.courseData?.mentor?.image && (
                        <img className='w-10 h-10 rounded-full' src={booking.courseData.mentor.image} alt="" />
                       )}
                      </div>
                      <p className='font-medium'>
                        {booking.courseData?.mentor?.name}
                      </p>
                      <p className='text-xs text-green-500'>
                        {booking.courseData?.mentor?.email}
                      </p>
                     </td>
                     <td className="px-6 py-4">
                    <p>{formatDate(booking.slotDate)}</p>
                    <p className="text-xs text-gray-500">
                      {booking.slotTime}
                    </p>
                  </td>
                  <td className='px-6 py-4'>
                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.payment ? "bg-green-100 text-gray-600":"bg-yellow-100 text-yellow-600"}`}>
                     {booking.payment?"Paid":"Pending"}
                   </span>
                  </td>
                   <td className="px-6 py-4">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                      Cancelled
                    </span>
                  </td>
                    </tr>
                ))}
            </tbody>
         </table>
        </div>
     )}
    </div>
  )
}

export default Coursecancellist