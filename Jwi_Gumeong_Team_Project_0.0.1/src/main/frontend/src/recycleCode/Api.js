import axios from "axios";

export const fetchChannel = async (channelId) => {
    try {
        const { data } = await axios.get(`/channelAPI/search/${channelId}`);
        return data.content;
    } catch (error) {
        console.error('Channel API Error:', error);
        throw new Error('Failed to fetch channel data');
    }
};

export const fetchLive = async (channelId) => {
    try {
        const { data } = await axios.get(`/channelAPI/live/${channelId}`);
        return data.content.topExposedVideos.openLive;
    } catch (error) {
        console.error('Channel API Error:', error);
        throw new Error('Failed to fetch channel data');
    }
};

