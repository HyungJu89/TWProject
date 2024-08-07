import axios from "axios";
//검색어
export  const searchPost = async (type,search, postPage) => { 
    console.log(type)
    try{
        const { data } = await axios.get(`/search/post`, {
            params: {
                type : type,
                search: search,
                page: postPage
            }
        });

        return data;


    }catch (error){
        console.error('Channel API Error:', error);
        throw new Error('Failed to fetch channel data');
    }


}