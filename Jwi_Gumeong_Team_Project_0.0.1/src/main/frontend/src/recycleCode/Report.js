import axios from "axios";

export const report = async (reportDto) => {
    try{
        //get 요청을 할때 params 로 데이터를 실어서 보낼수 있다.
        const { data } = await axios.get(`/channel/get`,{
            params: { 
                sessionId : reportDto.sessionId,
                referenceType : reportDto.referenceType,
                referenceKey : reportDto.referenceKey,
                category : reportDto.category
            }
        });
        return data;
    }catch(error){
        console.error('Channel API Error:', error);
        throw new Error('Failed to fetch channel data');
    }

}