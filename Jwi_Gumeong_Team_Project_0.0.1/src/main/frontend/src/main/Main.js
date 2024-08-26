/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import styles from './style/Main.module.css';
import '../App.css';
import PublicBoard from './PublicBoard.js';
import PublicMenu from './PublicMenu.js';
import MainBanner from '../channel/MainBanner.js';
import refresh from '../icon/24px/refresh.png';

function Main({onLogout,isLoggedIn}) {
    let navigate = useNavigate();
    let [topic, settopic] = useState(true);
    let [loginOn, setLoginOn] = useState(false);
    const [postList, setPostList] = useState([]);
    const [partnersLive, setPartnersLive] = useState([]);
    const [hotBoardList, setHotBoardList] = useState([]);

    //메인화면 추천순 게시글
    const searchRecommended = async () => {
        const sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null
        if(sessionIdJson){
        sessionId = JSON.parse(sessionIdJson).sessionId
    }
        try {
            const { data } = await axios.get(`/search/recommended` , {
                params: {
                    page: '1',
                    sessionId : sessionId
                }
            });
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }
    };

    //인기 게시판 :: 우리 DB에서 하루동안 게시글 많은 채널 10개 가져오기 
    useEffect(() => {
        const hotBoardLoad = async () => {
            try {
                const {data} = await axios.get(`/channel/hotTen`);
                setHotBoardList(data);
            } catch (error) {
                console.error('Channel API Error:', error);
            }
        };
        hotBoardLoad();
    }, []);


    useEffect(() => { //메인 무작위 방송 추천
        const addPartners = async () => {
            try {
                const response = await axios.get(/partnersLiveApi/);
                //파트너스 api
                // const newPartners = response.data.content.streamerPartners; 
                //라이브 무작위 api
                const newPartners = response.data.content.recommendationChannels;
                setPartnersLive(newPartners);
            } catch (error) {
                console.error('Channel API Error:', error);
            }
        };
        addPartners();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const postListData = await searchRecommended();
            setPostList(postListData)
        };

        fetchData();

    }, []);

    return (
        <div>
            <div className={styles.bannerPosition}>
                {partnersLive && partnersLive.length > 0 &&(
                    <MainBanner channelId={partnersLive[0]?.channelId}
                                channelIdSub1={partnersLive[1]?.channelId}
                                channelIdSub2={partnersLive[2]?.channelId}
                                channelIdSub3={partnersLive[3]?.channelId}
                                postList={postList}
                    />
                )
            }
            </div>
            <div className={styles.basic}> {/*전체 DIV*/}
                <div className={styles.leftDiv}>{/*게시판 영역*/}
                    <div className={styles.hotBoard}>{/*인기 게시판*/}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}><h3>인기 게시판</h3><h6>갱신: 오후 5시</h6></div>
                        <div className={styles.channelDiv}>
                            {hotBoardList && hotBoardList.success &&
                            <>{hotBoardList.info.length > 0 ? 
                                hotBoardList.info.map((item, i)=>
                                <div onClick={() => { navigate(`/channel/${item.id}`); window.scrollTo(0, 0) }} className={styles.channel}><img src={item.imageUrl} />
                                    <div className={styles.text}>{item.name}</div></div>
                            ):<div className={styles.nulltext}>아직 인기 게시판이 갱신되지 않았어요 :3</div>}</>}
                        </div>
                    </div>
                    <TopicBtn topic={topic} settopic={settopic} />
                    {topic == true ?
                        <div className={styles.fadein}>
                            {postList && postList.success &&
                            <>{postList.search.map((postInfo, index) =>
                                <PublicBoard key={index} postInfo={postInfo} />
                            )}</>}
                        </div>
                        : null}
                    <div onClick={() => { navigate('/allTopic'); window.scrollTo(0, 0) }} className={styles.moreAllTopic}>더보기</div>{/* 오른쪽 로그인, 추천 영역 */}
                </div>
                <PublicMenu isLoggedIn={isLoggedIn} onLogout={onLogout}/>
            </div>
        </div>
    );
}

function TopicBtn({ topic, settopic }) {
    return (
        <div className={styles.Nav}>
            {topic == true ?
                <div className={styles.topicdiv}>
                    <div>추천 토픽<div className={styles.bar} /></div>
                    <div onClick={() => { topic && settopic(false) }} style={{ color: '#999999' }}>즐겨찾기 토픽</div>
                </div>
                :
                <div className={styles.topicdiv}>
                    <div onClick={() => { topic ? null : settopic(true) }} style={{ color: '#999999' }}>추천 토픽</div>
                    <div>즐겨찾기 토픽<div className={styles.bar} /></div>
                </div>}
                <img src={refresh}/>
        </div>
    )
}

export default Main;
