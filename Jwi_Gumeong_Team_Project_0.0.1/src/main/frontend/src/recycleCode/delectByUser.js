import axios from "axios";

export const delectByUser = async (referenceType,referenceKey) => {
    let sessionIdJson = sessionStorage.getItem('sessionId');
    let sessionId = JSON.parse(sessionIdJson)?.sessionId

    if (!sessionId) {
        console.log("로그인 안되어있음");
        return;
    }

    let apiUrl = '';
    const delectByUserDto = {
        sessionId : sessionId,
        referenceKey : referenceKey,
    }

    switch (referenceType) {
        case 'post':
            apiUrl = '/post/deleteByUser';
            break;
        case 'comment':
            apiUrl = '/comment/deleteByUser';
            break;
        case 'reply':
            apiUrl = '/reply/deleteByUser';
            break;
        default:
            console.error("잘못된 referenceType:", referenceType);
            return;
    }

    try {
        // axios.post로 API 요청
        const { data } = await axios.post(apiUrl, delectByUserDto);
        console.log(data)
        return data;
    } catch (error) {
        console.error(`Error deleting ${referenceType}:`, error);
        throw new Error(`Failed to delete ${referenceType}`);
    }
};