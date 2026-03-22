import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    adminToken:sessionStorage.getItem("adminToken") || null,
    isAdminLoggedIn:sessionStorage.getItem("adminToken") ? true:false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAdminLogin:(state,action)=>{
            state.adminToken = action.payload;
            state.isAdminLoggedIn = true;
            sessionStorage.setItem("adminToken",action.payload);
        },
        adminLogout:(state)=> {
            state.adminToken = null;
            state.isAdminLoggedIn = false;
            sessionStorage.removeItem("adminToken");
        }
    }
});

export const {setAdminLogin,adminLogout} = authSlice.actions;
export default authSlice.reducer;