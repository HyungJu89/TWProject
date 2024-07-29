import React, { useEffect, useState } from 'react';
import styles from './style/FavoritesManagement.module.css';
import List from '../icon/24px/List.png'; 
import Star from '../icon/20px/bookmark-deactivation.png'; 
import Left from '../icon/btn/btn-left.png'; 
import Right from '../icon/btn/btn-right.png'; 
import { useQuery } from 'react-query';
import PublicBoard from '../main/PublicBoard.js';
import Paging from '../Paging/Paging.js'
import axios from 'axios';
import BookmarkButton from '../channel/BookmarkButton.js'

//즐겨찾기 관리페이지
function FavoritesManagement() {
    const [channel, setChannel] = useState('');

    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useQuery('channel', () =>
        axios.get(`/channelRest/search/123123`)
            .then((response) => {
                setChannel(response.data.content)
                return response.data.content
            })
            .catch(error => {
                console.error('Channel API Error:', error);
                throw error;
            }),
    );

    if (isLoadingChannel) {
        return <div>로딩중</div>;
    }

    if (isErrorChannel) {
        return <div>에러남</div>;
    }
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
    return (
        <div className={styles.MyPageContainer}>
            <div className={styles.formGroup}>
                <img src={List} />
                <ChannelTitle channel={channel} />
                <div className={styles.streammerInfo} style={{ cursor: 'pointer' }}>
                    <div className={styles.channelName}>{channel.channelName}</div>
                    <div className={styles.follower}>
                        <div className={styles.markText}>팔로워</div>
                        <div className={styles.markCount}> {formatUnit(channelApi.followerCount)}</div>
                        <div className={styles.markText}>즐겨찾기</div>
                        <div className={styles.markCount}> 10000만</div>
                    </div>
                </div>
                <div className={styles.bookMark}>
                <BookmarkButton/>
                </div>
            </div>
            <hr className={styles.horizontalLine} />
            <div className={styles.Paging}>
                <div className={styles.PagingNum} style={{marginTop : '30px'}}><img src={Left}/><div>1/5</div><img src={Right}/></div>
            </div>
        </div>
    )
}

function ChannelTitle({ channel }) {
    return (
        <div>
            <div className={styles.title}> {/* 클릭시 URL 이동 */}
                <img src={channel.channelImageUrl} />
            </div>
            <div className={styles.dashed} />{/* 회색줄 */}
        </div>
    )
}
export default FavoritesManagement;