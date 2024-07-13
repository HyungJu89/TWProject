/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import '../App.css';
import styles from './style/PublicBoard.module.css';

function PublicBoard() {
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

    return (
        <div className={styles.mainDiv}>
            <div className={styles.title}> {/* 클릭시 URL 이동 */}
                <img src={channel.channelImageUrl}/>{channel.channelName}
            </div>
            <div className={styles.dashed}/>
            <div className={styles.userName}>
                <div>작성자 이름 <div className={styles.grayText}>· 1일</div></div>
            </div>
            <div className={styles.contentArea}>gd</div>
        </div>
    )
}

export default PublicBoard;