import { useQuery } from 'react-query';
import { fetchChannel,fetchLive } from './Api.js';

export const useChannel = (channelId) => {
    return useQuery(['channel', channelId], () =>
    fetchChannel(channelId),
    {
        staleTime: 10000, // 10초 동안 데이터는 신선하다고 간주
        cacheTime: 60000, // 1분 동안 캐시 유지
        refetchOnWindowFocus: true, // 창이 포커스될 때 데이터 재요청
        enabled: !!channelId, // id가 있을 때만 쿼리 실행
    });
};

export const useLiveInfo  = (channelId) => {
    return useQuery(['liveInfo',channelId], () =>
    fetchLive(channelId),
    {
        staleTime: 10000, // 10초 동안 데이터는 신선하다고 간주
        cacheTime: 60000, // 1분 동안 캐시 유지
        refetchOnWindowFocus: true, // 창이 포커스될 때 데이터 재요청
        enabled: !!channelId, // id가 있을 때만 쿼리 실행
    });
};