import { createSlice } from "@reduxjs/toolkit"

let alarmModal = createSlice({
    name : 'alarmModal',
    initialState : {popUp: false, content : ''},
    reducers: {
        openModal(state,action){
                state.popUp = true;
                state.content = action.payload;
        },
        openModalFalse(state){
                state.popUp = false;
                state.content = '';
        }
}})
export let {openModal, openModalFalse} = alarmModal.actions
export default alarmModal;