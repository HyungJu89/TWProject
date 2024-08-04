import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//email이 db에 있는지 확인하고 sessionId발급하는 로직
export const fetchSessionId = createAsyncThunk(
    'user/fetchSessionId',
    async (email, { rejectWithValue }) => {
      try {
          var jsonSessionInfo = localStorage.getItem('sessionId');
          const response = await axios.get(`/signIn/getSessionId`, { params: { email: email } });
          localStorage.setItem('sessionId', JSON.stringify({email:email , sessionId:response.data , count:0}));
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  //유저정보 sessionId로 가져오는 로직
  export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (sessionId,{ rejectWithValue }) => {
      try {
          const response = await axios.get(`/signIn/checkSessionId`, { params: { sessionId: sessionId } });

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
            // 서버에서 받아온 데이터를 상태에 반영합니다.
            state.email = action.payload.email;
            state.birthday = action.payload.birthday;
            state.pw = action.payload.pw;
            state.sessionId = action.payload.sessionId;
            state.state = action.payload.state;
            state.nickName = action.payload.nickName;
          })
          .addCase(getUserInfo.rejected, (state, action) => {
            // 요청이 실패한 경우에 대한 처리 (선택 사항)
            console.error('Failed to fetch user info:', action.payload);
          });
      }
})




export default userState;