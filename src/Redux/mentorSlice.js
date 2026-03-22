import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { backendUrl } from "../App";
import toast from "react-hot-toast";

const initialState = {
    mentorToken:sessionStorage.getItem("mentorToken") || null,
    isMentorLoggedIn:sessionStorage.getItem("mentorToken") ? true:false,
    mentorProfile:null,
    loading:false,
    students:[],
    mentorBookings:[],
    dashboard:null
}

const mentorSlice = createSlice({
    name:"mentor",
    initialState,
    reducers:{
        setMentorLogin:(state,action)=>{
            state.mentorToken = action.payload;
            state.isMentorLoggedIn = true;
            sessionStorage.setItem("mentorToken",action.payload)
        },
        mentorLogout:(state)=>{
            state.mentorToken = null;
            state.isMentorLoggedIn = false;
            sessionStorage.removeItem("mentorToken")
        },
        setProfile:(state,action)=>{
            state.mentorProfile = action.payload;
        },
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        setStudents:(state,action)=>{
            state.students = action.payload;
        },
        setMentorBookings:(state,action)=>{
            state.mentorBookings = action.payload;
        }
    }
})

export const {setMentorLogin,mentorLogout,setProfile,setLoading,setStudents,setMentorBookings} = mentorSlice.actions;


export const fetchMentorProfile = () => async(dispatch,getState) => {
    try {
        dispatch(setLoading(true));
        const token = getState().mentor.mentorToken;
        const res = await axios.get(`${backendUrl}/api/mentor/mentor-profile`,{headers:{Authorization:`Bearer ${token}`}})
        if(res.data.success){
            dispatch(setProfile(res.data.mentor))
        }
        console.log(res.data);
        dispatch(setLoading(false))
    } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
    }
}

export const updateMentorProfile = (formData) => async(dispatch,getState)=>{
    try {
        dispatch(setLoading(true));
        const token = getState().mentor.mentorToken;

        const res = await axios.put(
          `${backendUrl}/api/mentor/mentor-update`,
          formData,
          {
            headers:{
              Authorization:`Bearer ${token}`,
              "Content-Type":"multipart/form-data"
            }
          }
        );
        if(res.data.success){
            dispatch(fetchMentorProfile());
            toast.success("Profile Updated Successfully");
        }
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        toast.error(error.response?.data?.message || error.message);
    }
}

export const fetchMentorStudents = () => async (dispatch,getState)=>{
    try {
        dispatch(setLoading(true))
        const token = getState().mentor.mentorToken;
        const res = await axios.get(`${backendUrl}/api/mentor/students`,{headers:{Authorization:`Bearer ${token}`}})
        if(res.data.success){
            dispatch(setStudents(res.data.students))
        }
        dispatch(setLoading(false))
        console.log(res.data)
    } catch (error) {
        dispatch(setLoading(false))
        console.log(error);
        toast.error("failed to load students")
    }
}

export const fetchMentorBookings = ()=> async(dispatch,getState)=>{
    try {
        dispatch(setLoading(true))
        const token = getState().mentor.mentorToken;
        const res = await axios.get(`${backendUrl}/api/mentor/bookings`,{headers:{Authorization:`Bearer ${token}`}})
        if(res.data.success){
            dispatch(setMentorBookings(res.data.bookings))
        }
        dispatch(setLoading(false))
    } catch (error) {
        dispatch(setLoading(false))
        console.log(error);
        toast.error("Failed To Load Bookings")
    }
}

export const updateBookingStatus = (bookingId,action) => async(dispatch,getState)=>{
    try {
        const token = getState().mentor.mentorToken;
        const res = await axios.patch(`${backendUrl}/api/mentor/booking-status`,{bookingId,action},{headers:{Authorization:`Bearer ${token}`}})
        if(res.data.success){
            toast.success(res.data.message)
            dispatch(fetchMentorBookings())
        }
    } catch (error) {
        console.log(error);
        toast.error("Failed To Update Status")
    }
} 


export const fetchMentorDashboard = () => async (dispatch,getState) => {
    try {
        dispatch(setLoading(true))
        const token = getState().mentor.mentorToken;
        const res = await axios.get(`${backendUrl}/api/mentor/dashboard`,{headers:{Authorization:`Bearer ${token}`}})
        dispatch(setLoading(false))
        if(res.data.success){
            return res.data.dashboard
        }
    } catch (error) {
        dispatch(setLoading(false));
        console.log(error);
        toast.error("Failed To Fetch Dashboard")
    }
}

export default mentorSlice.reducer;