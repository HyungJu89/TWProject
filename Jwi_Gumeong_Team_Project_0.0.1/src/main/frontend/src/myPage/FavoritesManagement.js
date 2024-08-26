import React, { useEffect, useState } from 'react';
import styles from './style/FavoritesManagement.module.css';
import List from '../icon/24px/List.png';
import Star from '../icon/20px/bookmark-deactivation.png';
import Left from '../icon/btn/btn-left.png';
import Right from '../icon/btn/btn-right.png';
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

    const [channelList, setChannelList] = useState([]);
    const [search, setSearch] = useState(null);
    const [channelPage, setChannePage] = useState(1);
    const [postPage, setPostPage] = useState(1);
    const searchChannel = async (search, channelPage) => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null;
        if (sessionIdJson) {
            sessionId = JSON.parse(sessionIdJson).sessionId
        }
        try {
            const { data } = await axios.get(`/search/channel`, {
                params: {
                    sessionId: sessionId,
                    search: search,
                    page: channelPage
                }
            });
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const channelListData = await searchChannel(search, channelPage);
            setChannelList(channelListData)
            console.log(channelListData)
        };
        fetchData();
    }, [search, channelPage])

    return (
        <div className={styles.MyPageContainer}>
                    {channelList.success ?
                        <div>
                            {channelList.search.map((channelInfo, index) =>
                                <div key={index}>
                                    <SearchChannel channelInfo={channelInfo} formatUnit={formatUnit}/>

                                </div>
                            )}
                        </div>
                        : <div>만들어진 토픽 게시판이 없어요</div>}
            <div className={styles.Paging}>
                <div className={styles.PagingNum} style={{ marginTop: '30px' }}><img src={Left} /><div>1/5</div><img src={Right} /></div>
            </div>
        </div>
    )
}

function SearchChannel({ channelInfo, formatUnit }) {
    let navigate = useNavigate();
    const [favoriteCount, setFavoriteCount] = useState(channelInfo.favoriteCount);

    return (
        <>
            <div className={styles.formGroup}>
                <img src={List} />
                <div className={styles.title}> {/* 클릭시 URL 이동 */}
                    <img src={channelInfo.imageUrl} />
                </div>
                <div className={styles.streammerInfo} style={{ cursor: 'pointer' }}>
                    <div className={styles.channelName}>{channelInfo.name}</div>{/*채널명*/}
                    <div className={styles.follower}>
                        <div className={styles.markText}>팔로워</div>
                        <div className={styles.markCount}> {formatUnit(channelInfo.followerCount)}</div>{/*팔로워*/}
                        <div className={styles.markText}>즐겨찾기</div>
                        <div className={styles.markCount}>{formatUnit(favoriteCount)}</div>{/*즐겨찾기*/}
                    </div>
                </div>
                <div className={styles.bookMark}>
                    <BookmarkButton channelInfo={channelInfo} setFavoriteCount={setFavoriteCount} />
                </div>
            </div>
            <hr className={styles.horizontalLine} />
        </>
    )

}

export default FavoritesManagement;