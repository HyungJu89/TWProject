/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect} from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from './style/Main.module.css';
import '../App.css';
import PublicBoard from './PublicBoard.js'

function Main() {
    let navigate = useNavigate();

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
    <div className={styles.basic}> {/*전체 DIV*/}
        <div className={styles.leftDiv}>{/*게시판 영역*/}
            <div className={styles.hotBoard}>{/*인기 게시판*/}
                <div style={{display:'flex',alignItems:'center',marginBottom:'20px'}}><h3>인기 게시판</h3><h6>갱신: 오후 5시</h6></div>
                <div className={styles.channelDiv}>
                <div className={styles.channel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                <div className={styles.channel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                <div className={styles.channel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                <div className={styles.channel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                <div className={styles.channel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                <div className={styles.channel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                <div className={styles.channel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                <div className={styles.channel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                <div className={styles.channel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                <div className={styles.channel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                </div>
            </div>
            <div className={styles.Nav}></div>
            <PublicBoard/>
            <button style={{width : '150px', height : '50px'}} on   Click={()=>{navigate('/channel/'+'123')}}>채널 확인 URL</button>
        </div>
        <div className={styles.rightDiv}>{/*유저 영역 */}
            <div className={styles.userBefore}></div>   
        </div>
    </div>
    );
}

export default Main;
 