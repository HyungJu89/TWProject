import { createSlice } from "@reduxjs/toolkit"

let postInfo = createSlice({
    name : 'postInfo',
    initialState : { postKey : '',
                    nickName : '',
                    content:'' ,
                    image : [],
                    state : '',
                    likeCount : '',
                    commentCount : '',
                    like : false,
                    postChannel : {
                        channelKey : '',
                        id : '',
                        imageUrl : '',
                        name : '',
                    },
                    createdAt : '',
                    updatedAt : ''
                },
    reducers : {
        changePost(state,action){
            return action.payload;
        },
        clearPost(state){
            return { 
                postKey: '',
                nickName: '',
                content: '',
                image: [],
                state: '',
                likeCount: '',
                commentCount: '',
                like: false,
                postChannel : {
                    channelKey : '',
                    id : '',
                    imageUrl : '',
                    name : '',
                },
                createdAt: '',
                updatedAt: ''
            };
        }
    }
})

export let {changePost, clearPost} = postInfo.actions
export default postInfo;