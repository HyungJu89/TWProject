import axios from 'axios';
import '../App.css'
import style from './style/ChannelHome.module.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCreate from './PostCreate.js';
import { useChannel } from './ApiQuery.js';
import MainBanner from './MainBanner.js';

import ChannelBody from './ChannelBody.js';
function ChannelHome() {
    let { channelId } = useParams();

    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useChannel(channelId);



    if (isLoadingChannel) {
        return <div>로딩중</div>;
    }

    if (isErrorChannel) {
        return <div>에러남</div>;
    }

    if (!channelApi) {
        return <div>에러남</div>;
    }

    return (
        <div>
            <div className={style.ChannelTop}> {/* 얘 포인트 */}
                <MainBanner />

                <ChannelBody />
            </div>
            <div className={style.channelInfoBack}>
                <div className={style.mainList}>
                    <div className={style.listLeft}>
                        <PostCreate channelId={channelId} />
                        <div className={style.postList}>글리스트</div>
                        <div className={style.bottomPaging}>페이징</div>
                    </div>
                    <div className={style.listRight}>
                        <div className={style.sideBar}>사이드 바</div>
                        <div className={style.suggestionChannel}>추천바</div>
                        <div className={style.sideBanner}>배너</div>
                    </div>
                </div>
            </div>
        </div>
    );

}





export default ChannelHome;