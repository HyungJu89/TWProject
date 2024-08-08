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
function MainBanner({ channelId, route,
    channelIdSub1, channelIdSub2, channelIdSub3 }) {
    let navigate = useNavigate();
    // 첫 번째 쿼리: 채널 정보를 가져오기.

    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useChannel(channelId);
    const { data: channelApi1, isLoading: isLoadingChannel1, isError: isErrorChannel1 } = useChannel(channelIdSub1);
    const { data: channelApi2, isLoading: isLoadingChannel2, isError: isErrorChannel2 } = useChannel(channelIdSub2);
    const { data: channelApi3, isLoading: isLoadingChannel3, isError: isErrorChannel3 } = useChannel(channelIdSub3);
    // 두 번째 쿼리: 라이브 정보 가져오기
    const { data: liveInfoApi, isLoading: isLoadingLiveInfo, isError: isErrorLiveInfo } = useLiveInfo(channelId);
    const { data: liveInfoApi1, isLoading: isLoadingLiveInfo1, isError: isErrorLiveInfo1 } = useLiveInfo(channelIdSub1);
    const { data: liveInfoApi2, isLoading: isLoadingLiveInfo2, isError: isErrorLiveInfo2 } = useLiveInfo(channelIdSub2);
    const { data: liveInfoApi3, isLoading: isLoadingLiveInfo3, isError: isErrorLiveInfo3 } = useLiveInfo(channelIdSub3);

    // 라이브 정보 변경 시 partnersLive 업데이트
    let [partnersLive, setPartnersLive] = useState(liveInfoApi);
    
    // 라이브 정보 변경 시 partnersLiveInfo 업데이트
    let [partnersLiveInfo, setPartnersLiveInfo] = useState(channelApi);

    useEffect(() => {
        setPartnersLive(liveInfoApi);
        setPartnersLiveInfo(channelApi);
    }, [liveInfoApi,channelApi, channelId, channelIdSub1, channelIdSub2, channelIdSub3]);



    if (isLoadingLiveInfo || isLoadingChannel ||
        isLoadingLiveInfo1 || isLoadingChannel1 ||
        isLoadingLiveInfo2 || isLoadingChannel2 ||
        isLoadingLiveInfo3 || isLoadingChannel3) {
        return <div className={style.channelInfoBack}> {/*상단 이미지 배너 */}
            <div className={style.gradinetMainBanner} style={{ background: '#000000' }}></div>
        </div>;
    }

    if (isErrorLiveInfo || isErrorChannel ||
        isErrorLiveInfo1 || isErrorChannel1 ||
        isErrorLiveInfo2 || isErrorChannel2 ||
        isErrorLiveInfo3 || isErrorChannel3) {
        return <>에러</>;
    }
    return (

        <div className={style.channelInfoBack}> {/*상단 이미지 배너 */}
            {channelApi.openLive ? (
                <div className={style.gradinetMainBanner}>
                    <div className={style.MainBanner}>
                        {/* 라이브 이미지 */}
                        {route === 'channel' ? (
                            liveInfoApi?.adult ? (
                                <div className={style.adult}>시청연령 제한</div>
                            ) : (
                                <img src={liveInfoApi?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                            )
                        ) : (
                            partnersLive?.adult ? (
                                <div className={style.adult}>시청연령 제한</div>
                            ) : (
                                <img src={partnersLive?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                            )
                        )}

                        {/* 라이브 방송 정보 */}
                        <div className={style.liveInfo}>
                            <div className={style.liveIcon}><div className={style.point}></div>LIVE</div> {/* 라이브 아이콘 */}
                            {route === 'channel' ?/* 라이브 제목 */
                                <div className={style.liveTitle}>{liveInfoApi?.liveTitle}</div>
                                :
                                <div className={style.liveTitle}>{partnersLive?.liveTitle}</div>
                            }
                            {route === 'channel' ? <LiveLink channelId={channelId} /> :
                                <div className={style.mainbannerDiv}>
                                    <img className={style.icon} src={partnersLiveInfo?.channelImageUrl} alt="Channel Icon" />
                                    <div className={style.textArea}>
                                        {partnersLiveInfo?.channelName}
                                        <div className={style.category}><img src={game} />{partnersLive?.liveCategoryValue}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    {/*메인 선택 배너*/}
                    {route === 'channel' ? (null) : (
                        <div className={style.liveDiv}>
                            <div className={style.liveImg}>
                                <LiveImgAdultCheck liveImginfo={liveInfoApi} channelinfo={channelApi} setPartnersLive={setPartnersLive} setPartnersLiveInfo={setPartnersLiveInfo}/>
                                <LiveImgAdultCheck liveImginfo={liveInfoApi1} channelinfo={channelApi1} setPartnersLive={setPartnersLive} setPartnersLiveInfo={setPartnersLiveInfo}/>
                                <LiveImgAdultCheck liveImginfo={liveInfoApi2} channelinfo={channelApi2} setPartnersLive={setPartnersLive} setPartnersLiveInfo={setPartnersLiveInfo}/>
                                <LiveImgAdultCheck liveImginfo={liveInfoApi3} channelinfo={channelApi3} setPartnersLive={setPartnersLive} setPartnersLiveInfo={setPartnersLiveInfo}/>
                            </div>
                        </div>
                    )}
                </div>
            )
                : (
                    <div className={style.backgroundImage}><img src={offBanner} /></div>
                )}
        </div>



    )
}

function LiveImgAdultCheck({ liveImginfo, channelinfo, setPartnersLive, setPartnersLiveInfo}) {
    return (
        < div onClick={() => { setPartnersLive(liveImginfo); setPartnersLiveInfo(channelinfo) }} className={style.box} >
            {liveImginfo?.adult ?
                (<div className={style.adult}>19금</div>)
                :
                (<img src={liveImginfo?.liveImageUrl?.replace("{type}", 144)} alt="Live Image" />)
            }                                    <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>

        </div >

    )
}

export default MainBanner;