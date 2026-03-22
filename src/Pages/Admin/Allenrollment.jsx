import React, { useEffect, useState } from "react";
import { Card, Badge, Button, Modal, ModalHeader, ModalBody } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings, getSingleBooking } from "../../Redux/courseSlice";

const Allenrollment = () => {

  const dispatch = useDispatch();

  const { bookings,selectedBooking } = useSelector((state) => state.course);
  const [openModal,setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const handleViewDetail = async (id) => {
  console.log("Booking ID:", id);
  const res = await dispatch(getSingleBooking(id));
  console.log("API Response:", res);
  setOpenModal(true);

}



  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

   const formatTime = (time) => {
    if (!time) return "N/A";
    return time.toLowerCase();
  };


  return (

    <div className="p-4">

      <h2 className="text-2xl font-semibold mb-6">
        Booking Details
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

        {bookings?.map((item, index) => (
          <Card key={item._id} className="shadow-md">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-600">
                #{index + 1}
              </p>
              {item.payment ? (
                <Badge color="success">
                  Payment Received
                </Badge>
              ) : (
                <Badge color="failure">
                  Payment Pending
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={item.userData.image}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">
                  {item.userData.name}
                </p>
                <p className="text-sm text-gray-500">
                  {item.userData.age} yrs
                </p>
                <p className="text-sm text-gray-400">
                  {item.userData.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={item.courseData.image}
                alt=""
                className="w-14 h-14 rounded"
              />
              <div>
                <p className="font-semibold">
                  {item.courseId.title}
                </p>
                <p className="text-sm text-gray-500">
                  ₹ {item.amount}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={item.courseData.mentor.image}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm text-gray-600">
                  Mentor
                </p>
                <p className="font-medium">
                  {item.courseData.mentor.name}
                </p>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-semibold">
                  Booking Date:
                </span>{" "}
                {formatDate(item.slotDate)}
              </p>
              <p>
                <span className="font-semibold">
                  Batch Timing:
                </span>{" "}
                {item.slotTime}
              </p>
              <p className="capitalize">
                <span className="font-semibold">
                  Payment Method:
                </span>{" "}
                {item.paymentMode}
              </p>
            </div>
            <Button className="mt-4 cursor-pointer" onClick={()=>handleViewDetail(item._id)}>View Detail</Button>
          </Card>
        ))}
      </div>
      <Modal show={openModal} onClose={()=>setOpenModal(false)} size="lg">
      <ModalHeader>Booking Details</ModalHeader>
      <ModalBody>
        {selectedBooking && (
          <div className="space-y-4">
           <div className="flex items-center gap-4">
             <img className="w-16 h-16 rounded-full" src={selectedBooking?.userData?.image} alt="" />
             <div>
              <p className="font-semibold text-lg">{selectedBooking.userId.name}</p>
              <p>{selectedBooking.userId.email}</p>
             </div>
           </div>
            <p><b>Phone:</b> {selectedBooking.userId.phone}</p>
            <p><b>Qualification:</b> {selectedBooking.userId.qualification}</p>
            <p><b>Gender:</b> {selectedBooking.userData.gender}</p>
            <p>
               <b>DOB:</b> {formatTime(selectedBooking.userData.dob)}
            </p>
            <hr />
            <div className="flex items-center gap-4">
             <img className="w-12 h-12 rounded-full" src={selectedBooking.courseData.mentor.image} alt="" />
             <div>
              <p className="font-semibold">{selectedBooking.courseData.mentor.name}</p>
             </div>
            </div>
            <p>
                <b>Course:</b> {selectedBooking.courseId.title}
            </p>
            <p>
                <b>Duration:</b> {selectedBooking.courseId.duration}
            </p>
            <hr />
            <p>
                <b>Booking Date:</b> {formatDate(selectedBooking.slotDate)}
            </p>
            <p>
                <b>Slot Time:</b> {selectedBooking.slotTime}
            </p>
            <p>
                <b>Amount:</b> ₹ {selectedBooking.amount}
            </p>
            <p className="capitalize">
               <b>Payment Mode:</b> {selectedBooking.paymentMode}
            </p>
              <p>
                <b>Payment Status:</b>
                {selectedBooking.payment ?
                " Payment Complete"
                :
                " Payment Pending"
                }
              </p>
               <p>
                <b>Course Status:</b>
                {selectedBooking.isCompleted ?
                " Course Completed"
                :
                " Course Pending"
                }
              </p>
               <Button color="blue" onClick={()=>setOpenModal(false)}>Ok</Button>
          </div>
        )}
      </ModalBody>
      </Modal>
    </div>

  );

};

export default Allenrollment;