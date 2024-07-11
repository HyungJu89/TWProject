import axios from 'axios';
import '../App.css'
import style from './style/ChannelHome.module.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ChannelHome() {
    let { id } = useParams();
    const [imgUrl, setImgUrl] = useState('');
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
        <div className={style.ChannelHome}>

            {channel.openLive ? (
                <div className={style.MainBanner}>
                    <div className={style.liveImage}>
                        <img src={liveInfo?.liveImageUrl?.replace("{type}", 1080)} alt="Live Image" />
                        <div className={style.liveInfo}>
                            <div className={style.liveIcon}>
                                <div className={style.liveText}>Live</div>
                            </div>
                            <div className={style.liveTitle}>
                                {liveInfo.liveTitle}
                            </div>
                            <div className={style.liveGoing} onClick={() => window.open(`https://chzzk.naver.com/live/${id}`)}>
                                새창으로 방송보기
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style.backgroundImage}>라이브 off 배너</div>
            )}
            <div className={style.channelBody}>
                <div className={style.channelInfo}>
                    <div className={style.iconBack}>
                        <div className={style.channelIcon}>
                            <img src={channel.channelImageUrl} alt="Channel Icon" />
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
                            <div className={style.followerCount}>팔로워수: {channel.followerCount}</div>
                            <div className={style.bookmark}>즐겨찾기</div>
                        </div>
                    </div>
                </div>
                <div className={style.mainList}>
                    <div>글리스트</div>
                    <div>
                        <div>
                            <div></div>
                        </div>
                        <div>추천창</div>
                        <div>사이드 배너</div>
                    </div>
                </div>
                <div className={style.bottomPaging}>페이징</div>
            </div>
        </div>
    );
}

export default ChannelHome;