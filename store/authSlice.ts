import { createSlice } from "@reduxjs/toolkit";

interface AuthSlice {
    token: string | null
}

const initialState  : AuthSlice = {
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { setToken } = authSlice.actions
export default authSlice.reducer