/* eslint-disable */
// ^워링 업애주는 친구

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import styles from './style/PublicBoard.module.css';
import '../App.css';

function PublicBoard() {

const [channel, setChannel] = useState('');
// 첫 번째 쿼리: 채널 정보를 가져오기.
const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useQuery('channel', () =>
    axios.get('/channelRest/search')
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
            <div className={styles.title}>
            <img src={channel.channelImageUrl}/>채널명
            </div>
        </div>
    )
}

export default PublicBoard;