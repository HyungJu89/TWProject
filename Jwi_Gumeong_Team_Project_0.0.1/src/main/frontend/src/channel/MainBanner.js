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
     channelIdSub1, channelIdSub2, channelIdSub3, channelIdSub4, channelIdSub5, channelIdSub6, channelIdSub7, channelIdSub8, channelIdSub9, channelIdSub10, channelIdSub11 }) {
    let navigate = useNavigate();
    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useChannel(channelId);
    const { data: channelApi1, isLoading: isLoadingChannel1, isError: isErrorChannel1 } = useChannel(channelIdSub1);
    const { data: channelApi2, isLoading: isLoadingChannel2, isError: isErrorChannel2 } = useChannel(channelIdSub2);
    const { data: channelApi3, isLoading: isLoadingChannel3, isError: isErrorChannel3 } = useChannel(channelIdSub3);
    const { data: channelApi4, isLoading: isLoadingChannel4, isError: isErrorChannel4 } = useChannel(channelIdSub4);
    const { data: channelApi5, isLoading: isLoadingChannel5, isError: isErrorChannel5 } = useChannel(channelIdSub5);
    const { data: channelApi6, isLoading: isLoadingChannel6, isError: isErrorChannel6 } = useChannel(channelIdSub6);
    const { data: channelApi7, isLoading: isLoadingChannel7, isError: isErrorChannel7 } = useChannel(channelIdSub7);
    const { data: channelApi8, isLoading: isLoadingChannel8, isError: isErrorChannel8 } = useChannel(channelIdSub8);
    const { data: channelApi9, isLoading: isLoadingChannel9, isError: isErrorChannel9 } = useChannel(channelIdSub9);
    const { data: channelApi10, isLoading: isLoadingChannel10, isError: isErrorChannel10 } = useChannel(channelIdSub10);
    const { data: channelApi11, isLoading: isLoadingChannel11, isError: isErrorChannel11 } = useChannel(channelIdSub11);
    // 두 번째 쿼리: 라이브 정보 가져오기
    const { data: liveInfoApi, isLoading: isLoadingLiveInfo, isError: isErrorLiveInfo } = useLiveInfo(channelId);
    const { data: liveInfoApi1, isLoading: isLoadingLiveInfo1, isError: isErrorLiveInfo1 } = useLiveInfo(channelIdSub1);
    const { data: liveInfoApi2, isLoading: isLoadingLiveInfo2, isError: isErrorLiveInfo2 } = useLiveInfo(channelIdSub2);
    const { data: liveInfoApi3, isLoading: isLoadingLiveInfo3, isError: isErrorLiveInfo3 } = useLiveInfo(channelIdSub3);
    const { data: liveInfoApi4, isLoading: isLoadingLiveInfo4, isError: isErrorLiveInfo4 } = useLiveInfo(channelIdSub4);
    const { data: liveInfoApi5, isLoading: isLoadingLiveInfo5, isError: isErrorLiveInfo5 } = useLiveInfo(channelIdSub5);
    const { data: liveInfoApi6, isLoading: isLoadingLiveInfo6, isError: isErrorLiveInfo6 } = useLiveInfo(channelIdSub6);
    const { data: liveInfoApi7, isLoading: isLoadingLiveInfo7, isError: isErrorLiveInfo7 } = useLiveInfo(channelIdSub7);
    const { data: liveInfoApi8, isLoading: isLoadingLiveInfo8, isError: isErrorLiveInfo8 } = useLiveInfo(channelIdSub8);
    const { data: liveInfoApi9, isLoading: isLoadingLiveInfo9, isError: isErrorLiveInfo9 } = useLiveInfo(channelIdSub9);
    const { data: liveInfoApi10, isLoading: isLoadingLiveInfo10, isError: isErrorLiveInfo10 } = useLiveInfo(channelIdSub10);
    const { data: liveInfoApi11, isLoading: isLoadingLiveInfo11, isError: isErrorLiveInfo11 } = useLiveInfo(channelIdSub11);

    // 라이브 정보 변경 시 partnersLive 업데이트
    let [partnersLive, setPartnersLive] = useState(liveInfoApi);
    useEffect(() => {
        setPartnersLive(liveInfoApi);
    }, [liveInfoApi, channelId, channelIdSub1, channelIdSub2, channelIdSub3, channelIdSub4]);

    // 라이브 정보 변경 시 partnersLiveInfo 업데이트
    let [partnersLiveInfo, setPartnersLiveInfo] = useState(channelApi);
    useEffect(() => {
        setPartnersLiveInfo(channelApi);
    }, [channelApi, channelId, channelIdSub1, channelIdSub2, channelIdSub3, channelIdSub4]);

    if (isLoadingLiveInfo || isLoadingChannel || 
        isLoadingLiveInfo1 || isLoadingChannel1 ||
        isLoadingLiveInfo2 || isLoadingChannel2 ||
        isLoadingLiveInfo3 || isLoadingChannel3 ||
        isLoadingLiveInfo4 || isLoadingChannel4 ||
        isLoadingLiveInfo5 || isLoadingChannel5 ||
        isLoadingLiveInfo6 || isLoadingChannel6 ||
        isLoadingLiveInfo7 || isLoadingChannel7 ||
        isLoadingLiveInfo8 || isLoadingChannel8 ||
        isLoadingLiveInfo9 || isLoadingChannel9 ||
        isLoadingLiveInfo10 || isLoadingChannel10 ||
        isLoadingLiveInfo11 || isLoadingChannel11) {
        return <div className={style.channelInfoBack}> {/*상단 이미지 배너 */}
            <div className={style.gradinetMainBanner} style={{ background: '#000000' }}></div>
        </div>;
    }
    
    if (isErrorLiveInfo || isErrorChannel || 
        isErrorLiveInfo1 || isErrorChannel1 ||
        isErrorLiveInfo2 || isErrorChannel2 ||
        isErrorLiveInfo3 || isErrorChannel3 ||
        isErrorLiveInfo4 || isErrorChannel4 ||
        isErrorLiveInfo5 || isErrorChannel5 ||
        isErrorLiveInfo6 || isErrorChannel6 ||
        isErrorLiveInfo7 || isErrorChannel7 ||
        isErrorLiveInfo8 || isErrorChannel8 ||
        isErrorLiveInfo9 || isErrorChannel9 ||
        isErrorLiveInfo10 || isErrorChannel10 ||
        isErrorLiveInfo11 || isErrorChannel11) {
        return <>에러</>;
    }
    
    return (

        <div className={style.channelInfoBack}> {/*상단 이미지 배너 */}
            {channelApi.openLive ? (
                <div className={style.gradinetMainBanner}>
                    <div className={style.MainBanner}>
                        {/* 라이브 이미지 */}
                        {route === 'channel' ?
                            <img src={liveInfoApi?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                            :
                            <img src={partnersLive?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                        }
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
                    {route === 'channel' ? null :
                        <div className={style.liveDiv}>
                            <img style={{ marginRight: '30px' }} src={chevron_left_w} />
                            <div className={style.liveImg}>
                     {/*박스-*/}<div onClick={() => { setPartnersLive(liveInfoApi); setPartnersLiveInfo(channelApi) }} className={style.box}>
                                    <img src={liveInfoApi?.liveImageUrl?.replace("{type}", 144)} alt="Live Image" />
                                    <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                                </div>
                     {/*박스-*/}<div onClick={() => { setPartnersLive(liveInfoApi1); setPartnersLiveInfo(channelApi1)  }} className={style.box}>
                                    <img src={liveInfoApi1?.liveImageUrl?.replace("{type}", 144)} alt="Live Image" />
                                    <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                                </div>
                     {/*박스-*/}<div onClick={() => { setPartnersLive(liveInfoApi2); setPartnersLiveInfo(channelApi2)  }} className={style.box}>
                                    <img src={liveInfoApi2?.liveImageUrl?.replace("{type}", 144)} alt="Live Image" />
                                    <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                                </div>
                     {/*박스-*/}<div onClick={() => { setPartnersLive(liveInfoApi3); setPartnersLiveInfo(channelApi3)  }} className={style.box}>
                                    <img src={liveInfoApi3?.liveImageUrl?.replace("{type}", 144)} alt="Live Image" />
                                    <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                                </div>
                     {/*박스-*/}<div onClick={() => { setPartnersLive(liveInfoApi4); setPartnersLiveInfo(channelApi4)  }} className={style.box}>
                                    <img src={liveInfoApi4?.liveImageUrl?.replace("{type}", 144)} alt="Live Image" />
                                    <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                                </div>
                            </div>
                            <img style={{ marginLeft: '30px' }} src={chevron_right_w} />
                        </div>
                    }
                </div>
            )
                : (
                    <div className={style.backgroundImage}><img src={offBanner} /></div>
                )}
        </div>



    )
}

export default MainBanner;