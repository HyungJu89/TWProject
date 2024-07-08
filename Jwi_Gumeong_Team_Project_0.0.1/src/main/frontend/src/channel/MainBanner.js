import axios from 'axios';
import style from './style/MainBanner.module.css';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

function MainBanner({ channelId }) {

    let channe = useQuery('channe', () =>
        axios.get('/channelRest/live/' + channelId).then((a) =>
            a.data.content.topExposedVideos.openLive

        )
    )


    return (
        <div className={style.MainBanner}>
            {channe.isLoading ? <div  className={style.liveImage}>로딩중</div> : channe.isError ? <div  className={style.liveImage}>에러남</div> : <div className={style.liveImage}><img src={channe.data.liveImageUrl.replace("{type}", 1920)} /></div>}
            <div className={style.liveInfo}>
                <div className={style.liveIcon}>
                    빨간 라이브 아이콘
                </div>
                <div className={style.liveTitle}>
                {channe.channeLive}       
                </div>
                <div className={style.liveGoing}>
                    생방송으로 바로가기
                </div>
            </div>
        </div>
    );
}



export default MainBanner;