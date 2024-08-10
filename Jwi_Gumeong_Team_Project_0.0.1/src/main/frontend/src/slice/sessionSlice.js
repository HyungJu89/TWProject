import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// userKey API 호출을 비동기 thunk로 정의
export const fetchUserKey = createAsyncThunk(
    'session/fetchUserKey',
    async (sessionId, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post('/user/key', null, {
                params: { sessionId }
            });
            if (response.data.result === 'success') {
                dispatch(setUserKey(response.data.userKey));
                dispatch(setLoggedIn(true)); // 성공 시 로그인 상태 설정
            } else {
                return rejectWithValue('Failed to fetch user key');
            }
        } catch (error) {
            console.error('userKey Axios 에러임:', error);
            return rejectWithValue(error.message);
        }
    }
);

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        sessionId: null,
        userKey: null,
        isLoggedIn: false,
        error: null, // 에러 상태 추가
    },
    reducers: {
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        },
        setUserKey: (state, action) => {
            state.userKey = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        logout: (state) => {
            sessionStorage.removeItem('sessionId');
            state.sessionId = null;
            state.userKey = null;
            state.isLoggedIn = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserKey.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { setSessionId, setUserKey, setLoggedIn, logout } = sessionSlice.actions;
export default sessionSlice.reducer;