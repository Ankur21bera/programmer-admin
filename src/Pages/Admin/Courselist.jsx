import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedCourse,
  deleteCourse,
  getCourses,
  toggleAvailability,
  updateCourse,
  viewSingleCourse,
} from "../../Redux/courseSlice";
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Eye, Pencil, Power, Trash2 } from "lucide-react";
import { set } from "mongoose";
import toast from "react-hot-toast";

const Courselist = () => {
  const dispatch = useDispatch();
  const { courses, loading, selectedCourse } = useSelector(
    (state) => state.course,
  );
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    duration: "",
    level: "",
    about: "",
    price: "",
    mentorName: "",
    mentorEmail: "",
    mentorPassword: "",
    degree: "",
    experience: "",
    mentorAbout: "",
    courseImage: null,
    mentorImage: null,
  });

  const handleUpdateClick = (course) => {
    setUpdateId(course._id);
    setFormData({
      title: course.title,
      category: course.category,
      duration: course.duration,
      level: course.level,
      about: course.about,
      price: course.price,
      mentorName: course.mentor.name,
      mentorEmail: course.mentor.email,
      mentorPassword: "",
      degree: course.mentor.degree,
      experience: course.mentor.experience,
      mentorAbout: course.mentor.about,
    });
    setUpdateModal(true);
  };

  useEffect(() => {
    window.scrollTo(0,0)
    dispatch(getCourses());
  }, [dispatch]);

  const handleView = (id) => {
    dispatch(viewSingleCourse(id));
    setOpenModal(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteCourse(deleteId));
    toast.success("Course Delete Successfull");
    setDeleteModal(false);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    dispatch(updateCourse({ courseId: updateId, formData: data }));
    toast.success("Course Update Successfully");
    dispatch(getCourses());
    setUpdateModal(false);
  };

  const handleToggle = (id) => {
    dispatch(toggleAvailability(id));
    toast.success("Toggle Availabilty Changed")
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Course List</h2>
      <div className="hidden md:block">
        <Table striped>
          <TableHead>
            <TableHeadCell>Sno</TableHeadCell>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Duration</TableHeadCell>
            <TableHeadCell>Level</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Available</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {courses.map((course, index) => (
              <TableRow key={course._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    className="w-12 h-12 rounded object-cover"
                    src={course.image}
                    alt=""
                  />
                </TableCell>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{course.level}</TableCell>
                <TableCell>₹{course.price}</TableCell>
                <TableCell>
                  {course.available ? (
                    <Badge color="success">Available</Badge>
                  ) : (
                    <Badge color="failure">Not Available</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    <Power onClick={()=>handleToggle(course._id)} className="cursor-pointer text-blue-600" />
                    <Eye
                      onClick={() => handleView(course._id)}
                      className="cursor-pointer text-green-600"
                    />
                    <Trash2
                      onClick={() => handleDeleteClick(course._id)}
                      className="cursor-pointer text-red-600"
                    />
                    <Pencil
                      onClick={() => handleUpdateClick(course)}
                      className="cursor-pointer text-yellow-600"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Modal
          show={openModal}
          onClose={() => {
            setOpenModal(false);
            dispatch(clearSelectedCourse());
          }}
          size="4xl"
        >
          <ModalHeader>Course Details</ModalHeader>
          <ModalBody>
            {selectedCourse && (
              <div className="space-y-6">
                <img
                  className="w-full h-60 object-cover rounded-lg"
                  src={selectedCourse.image}
                  alt=""
                />
                <div>
                  <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                  <p className="text-gray-500">{selectedCourse.category}</p>
                </div>
                <p>{selectedCourse.about}</p>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <b>Duration:</b>
                    {selectedCourse.duration}
                  </p>
                  <p>
                    <b>Level:</b>
                    {selectedCourse.level}
                  </p>
                  <p>
                    <b>Price:</b>₹{selectedCourse.price}
                  </p>
                  <p>
                    <b>Status:</b>{" "}
                    {selectedCourse.available ? "Available" : "Not Available"}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <h3 className="text-xl font-semibold mb-3">Mentor Details</h3>
                  <div className="flex gap-4">
                    <img
                      className="w-20 h-20 rounded-full"
                      src={selectedCourse.mentor.image}
                      alt=""
                    />
                    <div>
                      <p>
                        <b>Name:</b> {selectedCourse.mentor.name}
                      </p>
                      <p>
                        <b>Email:</b> {selectedCourse.mentor.email}
                      </p>
                      <p>
                        <b>Degree:</b> {selectedCourse.mentor.degree}
                      </p>
                      <p>
                        <b>Experience:</b> {selectedCourse.mentor.experience}
                      </p>
                      <p>
                        <b>About:{selectedCourse.mentor.about}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => setOpenModal(false)}
              className="cursor-pointer"
              color="gray"
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
        <Modal show={deleteModal}>
          <ModalHeader>Delete Course</ModalHeader>
          <ModalBody>
            <div className="text-center space-y-4">
              <Trash2 className="mx-auto text-red-700" size={40} />
              <p className="text-lg">
                Are you sure you want to delete this course?
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={confirmDelete}
              className="cursor-pointer"
              color="failure"
            >
              Yes Delete
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          show={updateModal}
          size="4xl"
          onClose={() => setUpdateModal(false)}
        >
          <ModalHeader>Update Course</ModalHeader>
          <ModalBody>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                className="w-full border p-2 rounded"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Level"
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />

              <textarea
                className="w-full border p-2 rounded"
                placeholder="Course About"
                value={formData.about}
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
              />

              <h3 className="font-semibold mt-4">Mentor Details</h3>

              <input
                className="w-full border p-2 rounded"
                placeholder="Mentor Name"
                value={formData.mentorName}
                onChange={(e) =>
                  setFormData({ ...formData, mentorName: e.target.value })
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Mentor Email"
                value={formData.mentorEmail}
                onChange={(e) =>
                  setFormData({ ...formData, mentorEmail: e.target.value })
                }
              />

              <input
                type="password"
                className="w-full border p-2 rounded"
                placeholder="Mentor Password"
                onChange={(e) =>
                  setFormData({ ...formData, mentorPassword: e.target.value })
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Degree"
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
              />

              <input
                className="w-full border p-2 rounded"
                placeholder="Experience"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />

              <textarea
                className="w-full border p-2 rounded"
                placeholder="Mentor About"
                value={formData.mentorAbout}
                onChange={(e) =>
                  setFormData({ ...formData, mentorAbout: e.target.value })
                }
              />

              {/* Course Image Dropzone */}

              <label className="block border-2 border-dashed p-6 text-center cursor-pointer rounded">
                Upload Course Image
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setFormData({ ...formData, courseImage: e.target.files[0] })
                  }
                />
              </label>

              {/* Mentor Image Dropzone */}

              <label className="block border-2 border-dashed p-6 text-center cursor-pointer rounded">
                Upload Mentor Image
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setFormData({ ...formData, mentorImage: e.target.files[0] })
                  }
                />
              </label>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded w-full"
              >
                Update Course
              </button>
            </form>
          </ModalBody>
        </Modal>
      </div>
      <div className="md:hidden space-y-4">
        {courses.map((course, index) => (
          <div className="bg-white p-4 rounded-lg shadow" key={course._id}>
            <div className="flex gap-4">
              <img
                className="w-16 h-16 rounded object-cover"
                src={course.image}
                alt=""
              />
              <div>
                <h3 className="font-semibold">{course.title}</h3>

                <p className="text-sm text-gray-500">{course.category}</p>

                <p className="text-sm">
                  {course.duration} • {course.level}
                </p>

                <p className="font-medium">₹{course.price}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              {course.available ? (
                <Badge color="success">Available</Badge>
              ) : (
                <Badge color="failure">Not Available</Badge>
              )}

              <div className="flex gap-4">
                <Power onClick={()=>handleToggle(course._id)} className="cursor-pointer text-blue-600" />

                <Eye
                  onClick={() => handleView(course._id)}
                  className="cursor-pointer text-green-600"
                />

                <Trash2
                  onClick={() => handleDeleteClick(course._id)}
                  className="cursor-pointer text-red-600"
                />

                <Pencil
                  onClick={() => handleUpdateClick(course)}
                  className="cursor-pointer text-yellow-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courselist;
