import { useParams, useNavigate } from 'react-router-dom';
import style from './style/MainBanner.module.css';
import '../App.css'
import offBanner from '../icon/img/illustration02.png';
import adult_img from '../icon/img/adult_img.png'
import game from '../icon/20px/game.png';
import talk from '../icon/20px/talk.png';
import art from '../icon/20px/art.png';
import music from '../icon/20px/music.png';
import food from '../icon/20px/food.png';
import skill from '../icon/20px/skill.png';
import economy from '../icon/20px/economy.png';
import xBoxImg from '../icon/img/profile.png';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useChannel, useLiveInfo } from '../recycleCode/ApiQuery.js';
import LiveLink from './LiveLink.js'
function MainBanner({ channelId, route,
    channelIdSub1, channelIdSub2, channelIdSub3, postList }) {
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
                            //channel
                            liveInfoApi?.adult ? ( //19세 체크
                                <div className={style.adult}><img src={adult_img}/></div>
                            ) : (
                                <img src={liveInfoApi?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                            )
                        ) : (
                            //main
                            partnersLive?.adult ? ( //19세 체크
                                <div className={style.adult}><img src={adult_img}/></div>
                            ) : (
                                partnersLive?.liveImageUrl?
                                <img src={partnersLive?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                                :
                                <div className={style.noSignal}>No Signal</div>
                            )
                        )}
                        {/* 라이브 방송 정보 */}
                            {route === 'channel' ?/* 라이브 제목 */
                                //channel
                                (<div className={style.liveInfo} style={{cursor:'default'}}>
                                <div className={style.liveIcon}><div className={style.point}></div>LIVE</div> {/* 라이브 아이콘 */}
                                <div className={style.liveTitle}>{liveInfoApi?.liveTitle}</div>
                                <LiveLink channelId={channelId} />
                                </div>)
                                :
                                //main
                                //pageCheck : 게시판 개설 여부 ? 개설된 게시판으로 이동 : 클릭한 스트리머 정보로 게시판 개설 추천
                                (<div onClick={()=>{navigate(`/pageCheck/${partnersLiveInfo?.channelId}`); window.scrollTo(0, 0)}} className={style.liveInfo}>
                                    {partnersLive? /* 라이브 아이콘 */
                                    <div className={style.liveIcon}><div className={style.point}></div>LIVE</div>  
                                    :
                                    <div className={style.noSignalLIVE}></div>
                                    }
                                <div className={style.liveTitle}>{partnersLive?.liveTitle}</div>
                                    {partnersLive ?
                                        <div className={style.mainbannerDiv}>
                                            <div className={style.divImg}> 
                                                {partnersLiveInfo?.channelImageUrl ? //채널 아이콘 예외처리
                                                <img className={style.icon} src={partnersLiveInfo?.channelImageUrl} alt="Channel Icon" />
                                                :
                                                <img className={style.icon} src={xBoxImg} alt="Channel Icon" />
                                                }
                                            </div>
                                            <div className={style.textArea}>
                                                {partnersLiveInfo?.channelName}
                                                <div className={style.category}>
                                                    {(() => {
                                                        switch (partnersLive?.liveCategoryValue) {
                                                            case 'talk':
                                                                return <img src={talk} />;
                                                            case '그림/아트':
                                                                return <img src={art} />;
                                                            case '음악/노래':
                                                                return <img src={music} />;
                                                            case '먹방/쿡방':
                                                                return <img src={food} />;
                                                            case '과학/기술':
                                                                return <img src={skill} />;
                                                            case '시사/경제':
                                                                return <img src={economy} />;
                                                            case '':
                                                                return <img src={talk} />;
                                                            default:
                                                                return <img src={game} />;
                                                        }
                                                    })()
                                                    }
                                                {partnersLive?.liveCategoryValue}</div>
                                            </div>
                                        </div>
                                        :
                                    <>
                                    {partnersLiveInfo?.channelImageUrl ? //방송종료 시 노출
                                        <div className={style.mainbannerDiv}>
                                            <div className={style.noSignalimgDIV}>
                                                <img className={style.noSignalimg} src={partnersLiveInfo?.channelImageUrl} alt="Channel Icon" />
                                            </div>
                                            <div className={style.textArea}>
                                                    {partnersLiveInfo?.channelName}
                                            <div className={style.category}>
                                                <img src={talk} />방송이 종료되었어요!
                                            </div>
                                            </div>
                                        </div>
                                        :
                                        <>
                                        <div className={style.noSignalimgDIV}>
                                            <img className={style.noSignalimg} src={xBoxImg} alt="Channel Icon" />
                                        </div>
                                        </>
                                    }
                                    </>
                                    }
                                </div>)
                            }
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
            {liveImginfo?.adult ? //19금 체크
                (<>
                <div className={style.adultMini}><img src={adult_img}/></div>
                <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                </>)
                :
                (liveImginfo?.liveImageUrl ? //방송중 체크
                    <>
                    <img src={liveImginfo?.liveImageUrl?.replace("{type}", 144)} alt="Live Image" />
                    <div className={style.liveRed}><div className={style.pointer}></div>LIVE</div>
                    </>
                    :
                    <div className={style.adultMini}>No Signal</div>
                )
            }                                    
        </div >
    )
}

export default MainBanner;