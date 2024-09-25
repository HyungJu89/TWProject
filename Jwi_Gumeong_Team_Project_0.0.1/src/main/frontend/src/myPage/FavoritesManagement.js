import React, { useEffect, useState } from 'react';
import styles from './style/FavoritesManagement.module.css';
import List from '../icon/24px/List.png';
import Star from '../icon/20px/favorites-deactivation.png';
import btn_left from '../icon/btn/btn-left.png';
import btn_right from '../icon/btn/btn-right.png';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import PublicBoard from '../main/PublicBoard.js';
import Paging from '../Paging/Paging.js'
import axios from 'axios';
import BookmarkButton from '../channel/BookmarkButton.js'
import { channelGet } from '../recycleCode/ChannelAxios.js';

//즐겨찾기 관리페이지
function FavoritesManagement() {
    const navigate = useNavigate();
    const [pagingNow, setPagingNow] = useState(0);
    const [pagingMax, setPagingMax] = useState(7);

    const formatUnit = (number) => {
        let unit = ['만', '천']
        let num = [10000, 1000]
        if (number / num[0] >= 1) {
            let int = Math.floor(number / num[1]);
            return Math.floor(int / 10) + unit[0] + Math.floor(int % 10) + unit[1]
        }
        if (number / num[1] >= 1) {
            return Math.floor(number / num[1]) + unit[1];
        }
        return number
    }

    let sessionIdJson = sessionStorage.getItem('sessionId');
    let sessionId = null;
    if (sessionIdJson) {
        sessionId = JSON.parse(sessionIdJson).sessionId
    }

        //즐겨찾기 게시판(1) :: 유저 정보 기준으로 연동된 즐겨찾기 가져오기
        const [favoritesList, setFavoritesList] = useState(); //즐겨찾기 key
        useEffect(() => {
            const favorites = async () => {
                try {
                    const {data} = await axios.get(`/myPage/favorites`,{params:{sessionId : sessionId}});
                    setFavoritesList(data);
                } catch (error) {
                    console.error('Channel API Error:', error);
                }
            };
            favorites();
        }, []);
        
        //즐겨찾기 게시판(2)  :: 채널 정보 가져오기
        const [channelList, setChannelList] = useState([]); //즐겨찾기에서 찾은key를 기반으로 채널 정보 가져오기
        useEffect(() => {
            const fetchChannels = async () => {
            try {
                //favoritesList에서 구한 channelKey만 골라서 배열저장
                const channelKeys = (favoritesList && Array.isArray(favoritesList)) 
                ? favoritesList.map(item => item.channelKey) 
                : [];  

                if (channelKeys.length > 0) {
                const channelInfo =
                    await Promise.all( //비동기 통신이 완료 될 때 까지 기다림
                    channelKeys.map(key =>
                        axios.get('/channel/findKey', { params: { channelKey: key } })
                    ));
                    setChannelList(channelInfo.map(channelInfo => channelInfo.data));
                };
            } catch (error) {
                console.error('Channel API Error:', error);
                }
            }
            fetchChannels();
            }, [favoritesList]);

        //즐겨찾기 게시판(3) :: 페이징
        const nowChannelList = channelList.slice(pagingNow, pagingMax);
        const result = channelList.length / 7;
        const maxPaging = result !== Math.floor(result) ? Math.floor(result) + 1 : result;
        function BtnRightPaging(){
            setPagingNow(pagingNow+7)
            setPagingMax(pagingMax+7)
        }
        function BtnLeftPaging(){
            setPagingNow(pagingNow-7)
            setPagingMax(pagingMax-7)
        }

    return (
        <div className={styles.MyPageContainer}>
                    {nowChannelList.length ?
                        <div>
                            {nowChannelList.map((channelInfo, index) =>
                                <div key={index}>
                                    <SearchChannel favoritesList={favoritesList} channelInfo={channelInfo[0]} formatUnit={formatUnit}/>
                                </div>
                            )}
                        </div>
                        : <div className={styles.none}>즐겨찾기가 없습니다.</div>}
                {channelList.length >7?
                    <div className={styles.bottom}>
                    {pagingNow/7+1 === 1 ?  <div className={styles.div48}/> :
                        <img src={btn_left}  onClick={BtnLeftPaging}/>
                    }
                        {pagingNow === 0 ? 1 : pagingNow/7+1}/{maxPaging}
                    {pagingNow/7+1 === maxPaging ? <div className={styles.div48}/> : 
                        <img src={btn_right} onClick={BtnRightPaging}/>
                    }
                    </div>
                    : null
                }   
        </div>
    )
}

function SearchChannel({favoritesList, channelInfo, formatUnit }) {
    let navigate = useNavigate();
    const [favoriteCount, setFavoriteCount] = useState(channelInfo.favoriteCount);

    //즐겨찾기 게시판(4) :: 즐겨찾기 카운팅
    useEffect(() => {
        const count = async () => {
            try {
                const {data} = await axios.get(`/myPage/favoritesCount`,{params:{channelKey : channelInfo.channelKey}});
                setFavoriteCount(data);
            } catch (error) {
                console.error('Channel API Error:', error);
            }
        };
        count();
    }, []);

    //BookmarkButton 컴포넌트 전달을 위한 데이터 바인딩
    const channel = {
        channelKey: channelInfo.channelKey,
        id: channelInfo.id,
        name: channelInfo.name,
        imageUrl: channelInfo.imageUrl,
        followerCount: channelInfo.followerCount,
        favoriteCount: favoriteCount,
        favorite: false
    };

    if (favoritesList.some(item => item.channelKey === channelInfo.channelKey)) {
        channel.favorite = true;
    }

    return (
        <>
            <div className={styles.formGroup}>
                <img src={List} />
                <div className={styles.title}> {/* 클릭시 URL 이동 */}
                    <img src={channelInfo.imageUrl} />
                </div>
                <div onClick={() => {  navigate(`/channel/${channelInfo.id}`); window.scrollTo(0, 0) }}  className={styles.streammerInfo} style={{ cursor: 'pointer' }}>
                    <div className={styles.channelName}>{channelInfo.name}</div>{/*채널명*/}
                    <div className={styles.follower}>
                        <div className={styles.markText}>팔로워&nbsp;</div>
                        <div className={styles.markCount}> {formatUnit(channelInfo.followerCount)}</div>{/*팔로워*/}
                        <div className={styles.markText}>즐겨찾기&nbsp;</div>
                        <div className={styles.markCount}>{formatUnit(favoriteCount)}</div>
                    </div>
                </div>
                <div className={styles.bookMark}>
                    <BookmarkButton channelInfo={channel} setFavoriteCount={setFavoriteCount} />
                </div>
            </div>
            <hr className={styles.horizontalLine} />
        </>
    )
}

export default FavoritesManagement;