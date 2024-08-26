import { createSlice } from "@reduxjs/toolkit";
import {repostReset} from './ReportDtoSlice.js'
let reportModal = createSlice({
    name : 'reportModal',
    initialState : false,
    reducers : {
        openModal(){
            return true;
        },
        offModal(){
            repostReset();
            return false;
        }
    }

})


export let {openModal, offModal} = reportModal.actions
export default reportModal;


