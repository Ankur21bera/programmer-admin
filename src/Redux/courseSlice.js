import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../App";
import { act } from "react";
import toast from "react-hot-toast";
import { BadgeJapaneseYenIcon, UserRoundIcon } from "lucide-react";

export const addCourse = createAsyncThunk(
  "course/addCourse",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;

      const response = await axios.post(
        `${backendUrl}/api/admin/add-course`,
        formData,
        {
          headers: {
            token: token,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed To Add Course",
      );
    }
  },
);

export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/get-courses`);
      return response.data.courses;
    } catch (error) {
      return rejectWithValue("Failed To Fetch Courses");
    }
  },
);

export const viewSingleCourse = createAsyncThunk(
  "course/viewSingleCourse",
  async (courseId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;
      const response = await axios.get(
        `${backendUrl}/api/admin/single-course/${courseId}`,
        { headers: { token } },
      );
      return response.data.course;
    } catch (error) {
      return rejectWithValue("Failed To Fetch Course");
    }
  },
);

export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (courseId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;

      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete-course/${courseId}`,
        {
          headers: {
            token: token,
          },
        },
      );

      return { courseId, message: data.message };
    } catch (error) {
      return rejectWithValue("Failed To Delete Course");
    }
  },
);

export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async ({ courseId, formData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;
      const response = await axios.put(
        `${backendUrl}/api/admin/update-course/${courseId}`,
        formData,
        { headers: { token: token } },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed To Update Course",
      );
    }
  },
);

export const toggleAvailability = createAsyncThunk(
  "course/toggleAvailability",
  async (courseId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;

      const { data } = await axios.patch(
        `${backendUrl}/api/admin/toggle-course/${courseId}`,
        {},
        {
          headers: {
            token: token,
          },
        },
      );

      return { courseId, available: data.available, message: data.message };
    } catch (error) {
      console.error(error);
      return rejectWithValue("Failed To Toggle Course Availability");
    }
  },
);

export const getAllBookings = createAsyncThunk(
  "course/getAllBookings",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;
      const { data } = await axios.get(`${backendUrl}/api/admin/all-bookings`, {
        headers: { token: token },
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Fetch Products");
    }
  },
);

export const getSingleBooking = createAsyncThunk(
  "course/getSingleBooking",
  async (bookingId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;
      const { data } = await axios.get(
        `${backendUrl}/api/admin/single-booking/${bookingId}`,
        { headers: { token: token } },
      );
      return data.booking;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Fetch Booking");
    }
  },
);

export const getAdminDashboard = createAsyncThunk(
  "course/getAdminDashboard",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;
      const { data } = await axios.get(
        `${backendUrl}/api/admin/admin-dashboard`,
        { headers: { token: token } },
      );
      console.log(data);
      return data.dashboard;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Fetch Dashboard");
    }
  },
);

export const getOfflineRequests = createAsyncThunk(
  "course/getOfflineRequests",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;
      const { data } = await axios.get(
        `${backendUrl}/api/admin/offline-requests`,
        { headers: { token } },
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Fetch Products");
    }
  },
);

export const approveOfflinePayment = createAsyncThunk(
  "course/approveOfflinePayment",
  async (appointmentId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;
      const { data } = await axios.patch(
        `${backendUrl}/api/admin/approve-offline/${appointmentId}`,
        {},
        { headers: { token } },
      );
      if (data.success) {
        toast.success("Approve Successfully");
      }
      return { appointmentId, message: data.message };
    } catch (error) {
      console.log(error);
      console.log(error);
      return rejectWithValue("Failed To Approve Payments");
    }
  },
);

export const getHolidays = createAsyncThunk(
  "course/getHolidays",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/holidays`);
      return data.holidays;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Fetch Products");
    }
  },
);

export const addHoliday = createAsyncThunk(
  "course/addHoliday",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-holiday`,
        payload,
        { headers: { token } },
      );
      toast.success(data.message);
      return data.holiday;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Fetch Data");
    }
  },
);

export const deleteHoliday = createAsyncThunk(
  "course/deleteHoliday",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;
      await axios.delete(`${backendUrl}/api/admin/delete-holiday/${id}`, {
        headers: { token },
      });
      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Delete holiday");
    }
  },
);

export const getCancelledBookings = createAsyncThunk(
  "course/getCancelledBookings",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;

      const { data } = await axios.get(
        `${backendUrl}/api/admin/cancelled-bookings`,
        { headers: { token } },
      );

      console.log("CANCEL API DATA:", data);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Fetch Cancel Booking");
    }
  },
);

export const getAllEnquiries = createAsyncThunk(
  "course/getAllEnquiries",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.adminToken;

      const { data } = await axios.get(
        `${backendUrl}/api/admin/all-enquiries`,
        { headers: { token } }
      );

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Fetch Enquiries");
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "course/deleteEnquiry",
  async(enquiryId,{getState,rejectWithValue})=>{
    try {
      const token = getState().auth.adminToken;
      await axios.delete(`${backendUrl}/api/admin/delete-enquiry/${enquiryId}`,{headers:{token}})
      return enquiryId;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Delete")
    }
  }
)

export const getJobApplication = createAsyncThunk(
  "course/getJobApplications",
  async(_,{getState,rejectWithValue})=>{
    try {
      const token = getState().auth.adminToken;
      const {data} = await axios.get(`${backendUrl}/api/admin/job-applications`,{headers:{token}})
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Fetch Applications")
    }
  }
)

export const deleteJobApplication = createAsyncThunk(
  "course/deleteJobApplication",
  async(applicationId,{getState,rejectWithValue})=>{
    try {
      const token = getState().auth.adminToken;
      await axios.delete(`${backendUrl}/api/admin/delete-applications/${applicationId}`,{headers:{token}})
      return applicationId;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed To Delete Application")
    }
  }
)

const courseSlice = createSlice({
  name: "course",
  initialState: {
    loading: false,
    success: false,
    error: null,
    courses: [],
    selectedCourse: null,
    bookings: [],
    totalBookings: 0,
    selectedBooking: null,
    dashboard: null,
    offlineRequests: [],
    totalRequests: 0,
    holidays: [],
    cancelledBookings: [],
    totalCancelled: 0,
    enquiries: [],
    applications: [],
  },
  reducers: {
    resetCourseState: (state) => {
      state.success = false;
      state.error = null;
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(viewSingleCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewSingleCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(viewSingleCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload.courseId,
        );
      })
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;

        const updatedCourse = action.payload.course;

        state.courses = state.courses.map((course) =>
          course._id === updatedCourse._id ? updatedCourse : course,
        );
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleAvailability.fulfilled, (state, action) => {
        const { courseId, available } = action.payload;
        state.courses = state.courses.map((course) =>
          course._id === courseId ? { ...course, available } : course,
        );
      })
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.totalBookings = action.payload.totalBookings;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBooking = action.payload;
      })
      .addCase(getSingleBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAdminDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(getAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOfflineRequests.fulfilled, (state, action) => {
        state.offlineRequests = action.payload.requests;
        state.totalRequests = action.payload.totalRequests;
      })
      .addCase(approveOfflinePayment.fulfilled, (state, action) => {
        const id = action.payload.appointmentId;
        state.offlineRequests = state.offlineRequests.map((item) =>
          item._id === id
            ? { ...item, payment: true, offlinePending: false }
            : item,
        );
      })
      .addCase(getHolidays.fulfilled, (state, action) => {
        state.holidays = action.payload;
      })
      .addCase(addHoliday.fulfilled, (state, action) => {
        state.holidays.push(action.payload);
      })
      .addCase(deleteHoliday.fulfilled, (state, action) => {
        state.holidays = state.holidays.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addCase(getCancelledBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCancelledBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.cancelledBookings = action.payload.cancelledBookings;
        state.totalCancelled = action.payload.cancelledBookings.length;
      })
      .addCase(getCancelledBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllEnquiries.fulfilled, (state, action) => {
        state.enquiries = action.payload.enquiries;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.enquiries = state.enquiries.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addCase(getJobApplication.fulfilled, (state, action) => {
        state.applications = action.payload.applications;
      })
      .addCase(deleteJobApplication.fulfilled, (state, action) => {
        state.applications = state.applications.filter(
          (item) => item._id !== action.payload,
        );
      })
  },
});

export const { resetCourseState, clearSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;
