// mainBanner 사이트 이동하고 다시 돌아오면 실시간 방송 사진 바뀔수 있게 처리




import { useParams , useNavigate } from 'react-router-dom';
import style from './style/MainBanner.module.css';
import offBanner from '../icon/img/illustration02.png';
import game from '../icon/20px/game.png';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useChannel, useLiveInfo } from '../recycleCode/ApiQuery.js';
import LiveLink from './LiveLink.js'
function MainBanner({  channelId , route }) {

    
    let navigate = useNavigate(); 
    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useChannel(channelId); 
    // 두 번째 쿼리: 라이브 정보 가져오기
    const { data: liveInfoApi, isLoading: isLoadingLiveInfo, isError: isErrorLiveInfo } = useLiveInfo(channelId);
 
    
    if (isLoadingLiveInfo || isLoadingChannel) {
        return <div>로딩중</div>;
    }
    if (isErrorLiveInfo || isErrorChannel) {
        return <div>에러남</div>;
    }

    return (

        <div className={style.channelInfoBack}> {/*상단 이미지 배너 */}
            {channelApi.openLive ? (
                <div className={style.gradinetMainBanner}>
                    <div className={style.MainBanner}>
                        {/* 라이브 이미지 */}
                        <img src={liveInfoApi?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                        {/* 라이브 방송 정보 */}
                        <div className={style.liveInfo}> 
                            <div className={style.liveIcon}><div className={style.point}></div>LIVE</div> {/* 라이브 아이콘 */}
                            <div className={style.liveTitle}>{liveInfoApi.liveTitle}</div> {/* 라이브 제목 */}
                            {route == 'channel' ? <LiveLink channelId={channelId}/>:
                                <div className={style.mainbannerDiv}>
                                <img className={style.icon} src={channelApi.channelImageUrl} alt="Channel Icon" />
                                    <div className={style.textArea}>
                                        {channelApi.channelName}
                                        <div className={style.category}><img src={game}/>{liveInfoApi.liveCategoryValue}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style.backgroundImage}><img src={offBanner} /></div>
            )}
        </div>



    )
}

export default MainBanner;