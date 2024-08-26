import { createSlice } from "@reduxjs/toolkit"

let reportDto = createSlice({
    name : 'reportDto',
    initialState : {
            nickName : '',
            referenceType : '',
            referenceKey : 0
    },
    reducers : {
        reportInfo(state,action){
            state.nickName = action.payload.nickName;
            state.referenceType = action.payload.referenceType;
            state.referenceKey = action.payload.referenceKey;
        },
        repostReset(){
            return {
                nickName : '',
                referenceType : '',
                referenceKey : 0,
            }
        }

    }

})


export let {reportInfo, repostReset} = reportDto.actions
export default reportDto;