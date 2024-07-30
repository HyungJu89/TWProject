import axios from "axios";

export const checkChannel = async (channelId) => {
    try {
        const { data } = await axios.post(`/channel/check`, channelId, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });
        return data;
    } catch (error) {
        console.error('Channel API Error:', error);
        throw new Error('Failed to fetch channel data');
    }

};

export const createChannel = async (channelCreate) => {
    
    try {
        const { data } = await axios.post(`/channel/create`, channelCreate);
        return data;
    } catch (error) {
        console.error('Channel API Error:', error);
        throw new Error('Failed to fetch channel data');
    }

};
