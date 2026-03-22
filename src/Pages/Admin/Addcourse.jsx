import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCourse, resetCourseState } from "../../Redux/courseSlice";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";

import {
  Button,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
  Modal,
  ModalBody,
} from "flowbite-react";

import { X } from "lucide-react";

const Addcourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.course);

  const [showModal, setShowModal] = useState(false);

  const [courseImg, setCourseImg] = useState(null);
  const [mentorImg, setMentorImg] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    duration: "",
    level: "Beginner",
    mentorName: "",
    mentorEmail: "",
    mentorPassword: "",
    degree: "",
    experience: "",
    mentorAbout: "",
    about: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (success) {
      setShowModal(true);
      dispatch(resetCourseState());
    }

    if (error) {
      toast.error(error);
      dispatch(resetCourseState());
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  // VALIDATION

  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Course title is required";

    if (!formData.duration.trim()) newErrors.duration = "Duration is required";

    if (!formData.mentorName.trim())
      newErrors.mentorName = "Mentor name is required";

    if (!formData.mentorEmail.trim())
      newErrors.mentorEmail = "Mentor email is required";

    if (!formData.mentorEmail.includes("@"))
      newErrors.mentorEmail = "Enter valid email";

    if (!formData.mentorPassword)
      newErrors.mentorPassword = "Password required";

    if (formData.mentorPassword.length < 8)
      newErrors.mentorPassword = "Minimum 8 characters";

    if (!formData.degree.trim()) newErrors.degree = "Degree is required";

    if (!formData.experience.trim())
      newErrors.experience = "Experience required";

    if (!formData.mentorAbout.trim())
      newErrors.mentorAbout = "Mentor about required";

    if (!formData.about.trim()) newErrors.about = "Course description required";

    if (!formData.price) newErrors.price = "Price required";

    if (!courseImg) newErrors.courseImg = "Course image required";

    if (!mentorImg) newErrors.mentorImg = "Mentor image required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Web Development",
      duration: "",
      level: "Beginner",
      mentorName: "",
      mentorEmail: "",
      mentorPassword: "",
      degree: "",
      experience: "",
      mentorAbout: "",
      about: "",
      price: "",
    });

    setCourseImg(null);
    setMentorImg(null);
    setErrors({});
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("courseImage", courseImg);
    data.append("mentorImage", mentorImg);

    dispatch(addCourse(data));
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Add Course</h2>
          </div>

          <div className="flex gap-10 mb-6">
            <div>
              <Label value="Course Image" />

              <label htmlFor="course-img">
                <img
                  className="w-28 h-28 object-cover rounded  cursor-pointer mt-2"
                  src={
                    courseImg
                      ? URL.createObjectURL(courseImg)
                      : assets.upload_area
                  }
                  alt=""
                />
              </label>

              <input
                id="course-img"
                type="file"
                hidden
                onChange={(e) => setCourseImg(e.target.files[0])}
              />

              {errors.courseImg && (
                <p className="text-red-500 text-sm">{errors.courseImg}</p>
              )}
            </div>

            <div>
              <Label value="Mentor Image" />

              <label htmlFor="mentor-img">
                <img
                  className="w-28 h-28 object-cover rounded  cursor-pointer mt-2"
                  src={
                    mentorImg
                      ? URL.createObjectURL(mentorImg)
                      : assets.upload_area
                  }
                  alt=""
                />
              </label>

              <input
                id="mentor-img"
                type="file"
                hidden
                onChange={(e) => setMentorImg(e.target.files[0])}
              />

              {errors.mentorImg && (
                <p className="text-red-500 text-sm">{errors.mentorImg}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label value="Course Title" />
              <TextInput
                name="title"
                placeholder="Course Title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div>
              <Label value="Duration" />
              <TextInput
                name="duration"
                placeholder="Course Duration"
                value={formData.duration}
                onChange={handleChange}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm">{errors.duration}</p>
              )}
            </div>

            <div>
              <Label value="Mentor Name" />
              <TextInput
                placeholder="Mentor Name"
                name="mentorName"
                value={formData.mentorName}
                onChange={handleChange}
              />
              {errors.mentorName && (
                <p className="text-red-500 text-sm">{errors.mentorName}</p>
              )}
            </div>

            <div>
              <Label value="Mentor Email" />
              <TextInput
                placeholder="Mentor Email"
                type="email"
                name="mentorEmail"
                value={formData.mentorEmail}
                onChange={handleChange}
              />
              {errors.mentorEmail && (
                <p className="text-red-500 text-sm">{errors.mentorEmail}</p>
              )}
            </div>

            <div>
              <Label value="Mentor Password" />
              <TextInput
                placeholder="Mentor Password"
                type="password"
                name="mentorPassword"
                value={formData.mentorPassword}
                onChange={handleChange}
              />
              {errors.mentorPassword && (
                <p className="text-red-500 text-sm">{errors.mentorPassword}</p>
              )}
            </div>

            <div>
              <Label value="Degree" />
              <TextInput
                placeholder="Enter Degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
              />
              {errors.degree && (
                <p className="text-red-500 text-sm">{errors.degree}</p>
              )}
            </div>

            <div>
              <Label value="Experience" />
              <TextInput
                placeholder="Enter Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">{errors.experience}</p>
              )}
            </div>

            <div>
              <Label value="Course Price" />
              <TextInput
                placeholder="Course Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            <div>
              <Label value="Category" />
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Web Development</option>
                <option>Digital Marketing</option>
                <option>Cyber Security</option>
                <option>Data Science</option>
                <option>App Development</option>
                <option>UI/UX</option>
                <option>Graphic Design</option>
              </Select>
            </div>

            {/* LEVEL */}

            <div>
              <Label value="Level" />
              <Select
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <Label value="Mentor About" />
            <Textarea
              placeholder="Mentor About"
              rows={3}
              name="mentorAbout"
              value={formData.mentorAbout}
              onChange={handleChange}
            />
            {errors.mentorAbout && (
              <p className="text-red-500 text-sm">{errors.mentorAbout}</p>
            )}
          </div>

          <div className="mt-4">
            <Label value="Course About" />
            <Textarea
              rows={4}
              placeholder="About"
              name="about"
              value={formData.about}
              onChange={handleChange}
            />
            {errors.about && (
              <p className="text-red-500 text-sm">{errors.about}</p>
            )}
          </div>
          <Button
            className="w-full mt-3 cursor-pointer"
            size="sm"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" />
                Adding...
              </span>
            ) : (
              "Add Course"
            )}
          </Button>
        </div>
      </form>

      <Modal show={showModal} size="md">
        <ModalBody>
          <div className="flex justify-end">
            <X className="cursor-pointer" onClick={() => setShowModal(false)} />
          </div>

          <h3 className="text-xl font-semibold text-center mb-6">
            Course Added Successfully
          </h3>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => {
                resetForm();
                setShowModal(false);
              }}
            >
              Add Another Course
            </Button>

            <Button color="gray" onClick={() => navigate("/course-list")}>
              View Courses
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Addcourse;
