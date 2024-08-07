import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//email이 db에 있는지 확인하고 sessionId발급하는 로직
export const fetchSessionId = createAsyncThunk(
    'user/fetchSessionId',
    async (email, { rejectWithValue }) => {
    try {
        var jsonSessionInfo = sessionStorage.getItem('sessionId');
        const response = await axios.get(`/signIn/getSessionId`, { params: { email: email } });
        console.log(response.data);
        sessionStorage.setItem('sessionId', JSON.stringify({sessionId:response.data.sessionId}));
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
    }
);
  //유저정보 sessionId로 가져오는 로직
export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (userKey,{ rejectWithValue }) => {
    try {
        const response = await axios.get(`/signIn/checkSessionId`, { params: { userKey: userKey } });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
    }
);

let userState = createSlice({
    name : 'user',
    initialState : {email: '', birthday : '' , pw : '', sessionId : '', state: '', nickName: ''},
    reducers : {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.email = action.payload.email;
            state.birthday = action.payload.birthday;
            state.pw = action.payload.pw;
            state.sessionId = action.payload.sessionId;
            state.state = action.payload.state;
            state.nickName = action.payload.nickName;
        })
        .addCase(getUserInfo.rejected, (state, action) => {
            console.error('Failed to fetch user info:', action.payload);
        });
    }
})

export default userState;