import React, { useEffect, useState } from 'react';
import styles from './style/MyPosts.module.css';
import { useQuery } from 'react-query';
import PublicBoard from '../main/PublicBoard.js';
import Paging from '../Paging/Paging.js'
import axios from 'axios';

//내가 쓴 글 페이지
function MyPosts() {
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
        <div className={styles.MyPosts}>
            <PublicBoard className={styles.PublicBoard}></PublicBoard>
            <PublicBoard className={styles.PublicBoard}></PublicBoard>
            <PublicBoard className={styles.PublicBoard}></PublicBoard>
            <Paging/>
        </div>
    );
}

export default MyPosts;