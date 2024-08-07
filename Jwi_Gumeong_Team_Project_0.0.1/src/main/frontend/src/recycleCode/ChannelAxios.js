import axios from "axios";
// 채널이 생성되어 있는지 확인
export const checkChannel = async (channelId) => {
    try {
        //get 요청을 할때 params 로 데이터를 실어서 보낼수 있다.
        const { data } = await axios.get(`/channel/check`,{
            params: { channelId : channelId }
        });
        return data;
    } catch (error) {
        console.error('Channel API Error:', error);
        throw new Error('Failed to fetch channel data');
    }

};

export const channelGet = async (channelId) => {
    try{
        //get 요청을 할때 params 로 데이터를 실어서 보낼수 있다.
        const { data } = await axios.get(`/channel/get`,{
            params: { channelId : channelId }
        });
        return data;
    }catch(error){
        console.error('Channel API Error:', error);
        throw new Error('Failed to fetch channel data');
    }

}