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
import TopicBtn from '../recycleCode/TopicBtn.js'

function Main({ onLogout, isLoggedIn }) {
    let navigate = useNavigate();
    let [topic, settopic] = useState(0);
    let [loginOn, setLoginOn] = useState(false);
    const [postList, setPostList] = useState([]);
    const [partnersLive, setPartnersLive] = useState([]);
    const [hotBoardList, setHotBoardList] = useState([]);

    //추천순
    const searchRecommendedPost = async () => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null;
        if (sessionIdJson) {
            sessionId = JSON.parse(sessionIdJson).sessionId
        }
        try {
            const { data } = await axios.get(`/search/recommended`, {
                params: {
                    sessionId: sessionId
                }
            });
            setPostList(data)
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }
    };
    // 팔로우된 채널 게시글
    const searchFavoritesPost = async () => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null;
        if (sessionIdJson) {
            sessionId = JSON.parse(sessionIdJson).sessionId
        } else {
            return
        }
        try {
            const { data } = await axios.get(`/search/favorites`, {
                params: {
                    sessionId: sessionId
                }
            });
            setPostList(data)
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }
    };

    //실시간 게시글
    const searchAllPost = async () => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null;
        if (sessionIdJson) {
            sessionId = JSON.parse(sessionIdJson).sessionId
        }
        try {
            const { data } = await axios.get(`/search/allTopic`, {
                params: {
                    sessionId: sessionId
                }
            });
            setPostList(data)
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
                const { data } = await axios.get(`/channel/hotTen`);
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
        setPostList([]);
        switch (topic) {
            case 0:
                searchRecommendedPost()
                break;
            case 1:
                searchFavoritesPost()
                break;
            case 2:
                searchAllPost()
                break;
            default:

                break;
        }

    }, [topic]);


    return (
        <div>
            <div className={styles.bannerPosition}>
                {partnersLive && partnersLive.length > 0 && (
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
                                    hotBoardList.info.map((item, i) =>
                                        <div onClick={() => { navigate(`/channel/${item.id}`); window.scrollTo(0, 0) }} className={styles.channel}>
                                            <div className={styles.imgDiv}><img src={item.imageUrl} /></div>
                                            <div className={styles.text}>{item.name}</div></div>
                                    ) : <div className={styles.nulltext}>아직 인기 게시판이 갱신되지 않았어요 :3</div>}</>}
                        </div>
                    </div>
                    <TopicBtn topic={topic} settopic={settopic} />
                    {postList.success &&
                    <>{postList.search ?
                            <div className={styles.fadein}>
                                {postList.search.map((postInfo, index) =>
                                    <PublicBoard key={index} postInfo={postInfo} />
                                )}
                            </div> : 
                        <div className={styles.nonPostList}>게시글이 없습니다.</div>
                    }</>
                    }
                    {/* 오른쪽 로그인, 추천 영역 */}
                    {(postList.search && postList.paging.pageCount > 1) &&
                    <div onClick={() => { navigate('/allTopic'); window.scrollTo(0, 0) }} className={styles.moreAllTopic}>더보기</div>
                }
                </div>
                <PublicMenu isLoggedIn={isLoggedIn} onLogout={onLogout} />
            </div>
        </div>
    );
}


export default Main;
