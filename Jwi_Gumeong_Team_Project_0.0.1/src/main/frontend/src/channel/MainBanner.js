// mainBanner 사이트 이동하고 다시 돌아오면 실시간 방송 사진 바뀔수 있게 처리




import { useParams, useNavigate } from 'react-router-dom';
import style from './style/MainBanner.module.css';
import offBanner from '../icon/img/illustration02.png';
import chevron_left_w from '../icon/40px/chevron-left-w.png'
import chevron_right_w from '../icon/40px/chevron-right-w.png'
import game from '../icon/20px/game.png';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useChannel, useLiveInfo } from '../recycleCode/ApiQuery.js';
import LiveLink from './LiveLink.js'
function MainBanner({ channelId, route,channelIdSub1,channelIdSub2,channelIdSub3 }) {
    let navigate = useNavigate();
    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useChannel(channelId);
    // 두 번째 쿼리: 라이브 정보 가져오기
    const { data: liveInfoApi, isLoading: isLoadingLiveInfo, isError: isErrorLiveInfo } = useLiveInfo(channelId);
    const { data: liveInfoApi1, isLoading: isLoadingLiveInfo1, isError: isErrorLiveInfo1 } = useLiveInfo(channelIdSub1);
    const { data: liveInfoApi2, isLoading: isLoadingLiveInfo2, isError: isErrorLiveInfo2 } = useLiveInfo(channelIdSub2);
    const { data: liveInfoApi3, isLoading: isLoadingLiveInfo3, isError: isErrorLiveInfo3 } = useLiveInfo(channelIdSub3);

    // 라이브 정보 변경 시 partnersLive 업데이트
    let [partnersLive, setPartnersLive] = useState(liveInfoApi);
    useEffect(() => {
        setPartnersLive(liveInfoApi);
    }, [liveInfoApi, channelId, channelIdSub1, channelIdSub2, channelIdSub3]);


    console.log(partnersLive);
    if (isLoadingLiveInfo || isLoadingChannel) {
        return <div className={style.channelInfoBack}> {/*상단 이미지 배너 */}
            <div className={style.gradinetMainBanner} style={{ background: '#000000' }}></div>
        </div>;
    }
    if (isErrorLiveInfo || isErrorChannel) {
        return <div className={style.channelInfoBack}> {/*상단 이미지 배너 */}
            <div className={style.gradinetMainBanner} style={{ background: '#000000' }}>에러</div>
        </div>;
    }

    return (

        <div className={style.channelInfoBack}> {/*상단 이미지 배너 */}
            {channelApi.openLive ? (
                <div className={style.gradinetMainBanner}>
                    <div className={style.MainBanner}>
                        {/* 라이브 이미지 */}
                        {route == 'channel' ?
                        <img src={liveInfoApi?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                        :
                        <img src={partnersLive?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                        }  
                        {/* 라이브 방송 정보 */}
                        <div className={style.liveInfo}>
                            <div className={style.liveIcon}><div className={style.point}></div>LIVE</div> {/* 라이브 아이콘 */}
                                                        {route == 'channel' ?/* 라이브 제목 */
                            <div className={style.liveTitle}>{liveInfoApi.liveTitle}</div> 
                            :
                            <div className={style.liveTitle}>{liveInfoApi.liveTitle}</div> 
                            }
                            {route == 'channel' ? <LiveLink channelId={channelId} /> :
                                <div className={style.mainbannerDiv}>
                                    <img className={style.icon} src={channelApi.channelImageUrl} alt="Channel Icon" />
                                    <div className={style.textArea}>
                                        {channelApi.channelName}
                                        <div className={style.category}><img src={game} />{liveInfoApi.liveCategoryValue}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className={style.liveDiv}>
                        <img style={{ marginRight: '30px' }} src={chevron_left_w} />
                        <div className={style.liveImg}>
                            <div onClick={()=>{setPartnersLive(liveInfoApi)}} className={style.box}>
                                <img src={liveInfoApi?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                                <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                            </div>
                            <div onClick={()=>{setPartnersLive(liveInfoApi1)}} className={style.box}>
                                <img src={liveInfoApi1?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                                <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                            </div>
                            <div onClick={()=>{setPartnersLive(liveInfoApi2)}}  className={style.box}>
                                <img src={liveInfoApi2?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                                <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                            </div>
                            <div onClick={()=>{setPartnersLive(liveInfoApi3)}} className={style.box}>
                                <img src={liveInfoApi3?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                                <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                            </div>
                            <div onClick={()=>{setPartnersLive(liveInfoApi)}} className={style.box}>
                                <img src={liveInfoApi?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                                <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                            </div>
                        </div>
                        <img style={{ marginLeft: '30px' }} src={chevron_right_w} />
                    </div>


                </div>
            )
                : (
                    <div className={style.backgroundImage}><img src={offBanner} /></div>
                )}
        </div>



    )
}

export default MainBanner;