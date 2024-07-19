import { createSlice } from "@reduxjs/toolkit"

let imgUiModal = createSlice({
    name : 'imgUiModal',
    initialState : {popUp: false, on : 0},
    reducers: {
        openImgUiModal(state){
               state.popUp = true
        },
        openImgUiModalFalse(state){
              state.popUp = false
        }

    }
})
export let {openImgUiModal, openImgUiModalFalse} = imgUiModal.actions

export default imgUiModal;