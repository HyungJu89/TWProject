/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from './style/AllTopic.module.css';
import '../App.css';
import PublicBoard from '../main/PublicBoard.js'
import PublicMenu from '../main/PublicMenu.js'
import Paging from '../Paging/Paging.js'
import illustration01 from '../icon/img/illustration01.png';

function AllTopic() {
    let navigate = useNavigate();
    let [topic, settopic] = useState(0);
    let [loginOn, setLoginOn] = useState(false);

    const [channel, setChannel] = useState('');
    const [postInfo,setPostInfo] = useState('');
    const [postPage,setPostPage] = useState(1);
    const searchPost = async () => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null;
        if (sessionIdJson) {
            sessionId = JSON.parse(sessionIdJson).sessionId
        }
        try {
            const { data } = await axios.get(`/search/allTopic`, {
                params: {
                    sessionId:sessionId,
                    page: postPage
                }
            });
            setPostInfo(data.search)
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }
    };

    useEffect(() => {
        searchPost();
    }, [topic]);




    return (
        <div >
            <div className={styles.topBanner}>
                <img src={illustration01}/>
            </div>
            <div className={styles.basic}> {/*전체 DIV*/}
                <div className={styles.leftDiv}>{/*게시판 영역*/}
                    <TopicBtn topic={topic} settopic={settopic} />
                    {topic == true ? <div className={styles.fadein}><PublicBoard postInfo={postInfo} /></div> : null}
                    <Paging/>
                </div>
                {/* 오른쪽 로그인, 추천 영역 */}
                <PublicMenu loginOn={loginOn} setLoginOn={setLoginOn} channel={channel} />
            </div>
        </div>
    );
}

function TopicBtn({ topic, settopic }) {
    return (
        <div className={styles.Nav}>
            {topic == 0 &&
                <div className={styles.topicdiv}>
                    <div>추천 토픽<div className={styles.bar} /></div>
                    <div onClick={() => { settopic(1) }} style={{ color: '#999999' }}>즐겨찾기 토픽</div>
                    <div onClick={() => { settopic(2) }} style={{ color: '#999999' }}>실시간 토픽</div>
                </div>}
            {topic == 1 &&
            <div className={styles.topicdiv}>
                <div onClick={() => { settopic(0) }} style={{ color: '#999999' }}>추천 토픽</div>
                <div>즐겨찾기 토픽<div className={styles.bar} /></div>
                <div onClick={() => { settopic(2) }} style={{ color: '#999999' }}>실시간 토픽</div>
            </div>
            }
            {topic == 2 &&
                <div className={styles.topicdiv}>
                <div onClick={() => { settopic(0) }} style={{ color: '#999999' }}>추천 토픽</div>
                <div onClick={() => { settopic(1) }} style={{ color: '#999999' }}>즐겨찾기 토픽</div>
                <div>실시간 토픽<div className={styles.bar} /></div>
            </div>
            }
            

        </div>
    )
}


export default AllTopic;
