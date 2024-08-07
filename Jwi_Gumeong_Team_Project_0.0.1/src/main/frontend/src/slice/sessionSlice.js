import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        sessionId: null,
        userKey: null,
        isLoggedIn: false,
    },
    reducers: {
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        },
        setUserKey: (state, action) => {
            state.userKey = action.payload;
        },
        clearSession: (state) => {
            state.sessionId = null;
            state.userKey = null;
            state.isLoggedIn = false;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
});

export const { setSessionId, setUserKey, clearSession, setLoggedIn } = sessionSlice.actions;
export default sessionSlice.reducer;