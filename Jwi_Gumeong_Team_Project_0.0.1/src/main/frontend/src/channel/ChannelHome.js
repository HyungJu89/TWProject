import axios from 'axios';
import '../App.css'
import style from './style/ChannelHome.module.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ChannelHome() {
    let { id } = useParams();
    const [channel, setChannel] = useState('');
    const [liveInfo, setLiveInfo] = useState('');

    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useQuery('channel', () =>
        axios.get(`/channelRest/search/${id}`)
            .then((response) => {
                setChannel(response.data.content)

                return response.data.content
            })
            .catch(error => {
                console.error('Channel API Error:', error);
                throw error;
            }),
        {
            enabled: !!id, // id가 있을 때만 쿼리 실행
        }

    );

    // 두 번째 쿼리: 라이브 정보 가져오기
    const { data: liveInfoApi, isLoading: isLoadingLiveInfo, isError: isErrorLiveInfo } = useQuery('liveInfo', () =>
        axios.get(`/channelRest/live/${id}`)
            .then((response) => {
                setLiveInfo(response.data.content.topExposedVideos.openLive)
                return response.data.content.topExposedVideos.openLive
            })
            .catch(error => {
                console.error('Live Info API Error:', error);
                throw error;
            }),
        {
            enabled: !!id, // id가 있을 때만 쿼리 실행
        }
    );


    if (isLoadingChannel || isLoadingLiveInfo) {
        return <div>로딩중</div>;
    }

    if (isErrorChannel || isErrorLiveInfo) {
        return <div>에러남</div>;
    }

    return (
        <div><div className={style.ChannelTop}> {/* 얘 포인트 */}
            <div className={style.channelInfoBack}> {/* 상단 이미지 배너*/}
                {channel.openLive ? (
                    <div className={style.MainBanner}>
                        {/* 라이브 이미지*/}    <img src={liveInfo?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                        {/* Live 방송 정보 */}   <div className={style.liveInfo}>
                            <div className={style.liveIcon}>Live</div>
                            <div className={style.liveTitle}>{liveInfo.liveTitle}</div>
                            <div className={style.liveGoing} onClick={() => window.open(`https://chzzk.naver.com/live/${id}`)}>
                                새창으로 방송보기
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={style.backgroundImage}>라이브 off 배너</div>
                )}
            </div>
            <div className={style.channelBody}>{/* 채널 정보 bar */}
                <div className={style.channelInfo}>
                    <div className={style.iconBack}>
                        <div className={style.channelIcon}>
                            <img className={style.icon} src={channel.channelImageUrl} alt="Channel Icon" />
                        </div>
                    </div>
                    <div className={style.iconRight}>
                        <div className={style.imageBackground}>
                            <div className={style.iconRight}>
                                <div className={style.channelTitle}>{channel.channelName}</div>
                                <div className={style.announcement}>채널 공지사항</div>
                            </div>
                            <div className={style.bookmarkButton}>즐겨찾기 버튼</div>
                        </div>
                        <div className={style.whiteBackground}>
                            <div className={style.mark}>
                                <div className={style.markText}>팔로워</div>
                                <div className={style.markCount}> {channel.followerCount}</div>
                            </div>
                            <div className={style.mark}>
                                <div className={style.markText}>즐겨찾기</div>
                                <div className={style.markCount}> 10000</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.channelInfoBackgroundColor}></div>
            </div>
        </div>
            <div className={style.channelInfoBack}>
                <div className={style.mainList}>
                        <div className={style.listLeft}>
                            <div className={style.postCreact}>
                                <textarea/>
                                <div className={style.postCreactIconBox}>
                                    <div className={style.emotIcon}></div>
                                    <div className={style.imageIcon}></div>
                                    <div className={style.textareaSize}>100/300</div>
                                    <div className={style.postCreactButton}>등록</div>
                                </div>
                            </div>

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