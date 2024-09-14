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
import TopicBtn from '../recycleCode/TopicBtn.js'

function AllTopic() {
    let navigate = useNavigate();
    let [topic, settopic] = useState(0);
    let [loginOn, setLoginOn] = useState(false);

    const [channel, setChannel] = useState('');
    const [postList, setPostList] = useState([]);
    const [postPage, setPostPage] = useState(1);


    
    const searchRecommendedPost = async () => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null;
        if (sessionIdJson) {
            sessionId = JSON.parse(sessionIdJson).sessionId
        }
        try {
            const { data } = await axios.get(`/search/recommended`, {
                params: {
                    sessionId: sessionId,
                    page: postPage
                }
            });
            setPostList(data)
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }
    };

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
                    sessionId: sessionId,
                    page: postPage
                }
            });
            setPostList(data)
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }
    };


    const searchAllPost = async () => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null;
        if (sessionIdJson) {
            sessionId = JSON.parse(sessionIdJson).sessionId
        }
        try {
            const { data } = await axios.get(`/search/allTopic`, {
                params: {
                    sessionId: sessionId,
                    page: postPage
                }
            });
            setPostList(data)
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }
    };


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

    }, [postPage]);

    useEffect(() => {
        setPostList([]);
        switch (topic) {
            case 0:
                searchRecommendedPost()
                setPostPage(1)
                break;
            case 1:
                searchFavoritesPost()
                setPostPage(1)
                break;
            case 2:
                searchAllPost()
                setPostPage(1)
                break;
            default:

                break;
        }

    }, [topic]);




    return (
        <div >
            <div className={styles.topBanner}>
                <img src={illustration01} />
            </div>
            <div className={styles.basic}> {/*전체 DIV*/}
                <div className={styles.leftDiv}>{/*게시판 영역*/}
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

                    {(postList.success && postList.paging?.pageCount > 1) &&
                        <Paging paging={postList.paging} postPage={postPage} setPostPage={setPostPage} />
                    }

                </div>
                {/* 오른쪽 로그인, 추천 영역 */}
                <PublicMenu loginOn={loginOn} setLoginOn={setLoginOn} channel={channel} />
            </div>
        </div>
    );
}




export default AllTopic;
