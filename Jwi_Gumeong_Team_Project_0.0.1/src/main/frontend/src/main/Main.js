/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from './style/Main.module.css';
import '../App.css';
import { useChannel, useLiveInfo } from '../recycleCode/ApiQuery.js';
import PublicBoard from './PublicBoard.js';
import PublicMenu from './PublicMenu.js';
import MainBanner from '../channel/MainBanner.js';
import chevron_left_w from '../icon/40px/chevron-left-w.png'
import chevron_right_w from '../icon/40px/chevron-right-w.png'

function Main() {
    let navigate = useNavigate();
    let [topic, settopic] = useState(true);
    let [loginOn, setLoginOn] = useState(false);
    const [partnersLive, setPartnersLive] = useState([]);
  useEffect(() => {
    const addPartners = async () => {
      try {
        const response = await axios.get(`/partnersLiveApi/`);
        const newPartners = response.data.content.streamerPartners;
        setPartnersLive(newPartners);
      } catch (error) {
        console.error('Channel API Error:', error);
      }
    };
    addPartners();
  }, []);

    //컴포넌트 전송 최적화 구문
    const partnerChannelIndex = (i) =>{
        return partnersLive[i]?.channelId || '오류';
    };

    return (
        <div>
            <div className={styles.bannerPosition}>
                <MainBanner channelId={partnerChannelIndex(0)}
                            channelIdSub1={partnerChannelIndex(1)}
                            channelIdSub2={partnerChannelIndex(2)}
                            channelIdSub3={partnerChannelIndex(3)}
                
                />
            </div>
            <div className={styles.basic}> {/*전체 DIV*/}
                <div className={styles.leftDiv}>{/*게시판 영역*/}
                    <div className={styles.hotBoard}>{/*인기 게시판*/}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}><h3>인기 게시판</h3><h6>갱신: 오후 5시</h6></div>
                        <div className={styles.channelDiv}>
                            <div className={styles.channel}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt' />SQL에서 가져왕</div>
                            <div className={styles.channel}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt' />SQL에서 가져왕</div>
                            <div className={styles.channel}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt' />SQL에서 가져왕</div>
                            <div className={styles.channel}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt' />SQL에서 가져왕</div>
                            <div className={styles.channel}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt' />SQL에서 가져왕</div>
                            <div className={styles.channel}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt' />SQL에서 가져왕</div>
                            <div className={styles.channel}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt' />SQL에서 가져왕</div>
                            <div className={styles.channel}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt' />SQL에서 가져왕</div>
                            <div className={styles.channel}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt' />SQL에서 가져왕</div>
                            <div className={styles.channel}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1IwK6-SxM83UpFVY6WtUZxXx-phss_gAUfdKbkTfau6VWVkt' />SQL에서 가져왕</div>
                        </div>
                    </div>
                    <TopicBtn topic={topic} settopic={settopic} />
                    {topic == true ? <div className="fadein"><PublicBoard /></div> : null}
                    <div onClick={() => { navigate('/allTopic'); window.scrollTo(0, 0) }} className={styles.moreAllTopic}>더보기</div>{/* 오른쪽 로그인, 추천 영역 */}
                </div>
                <PublicMenu loginOn={loginOn} setLoginOn={setLoginOn}/>
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
        </div>
    )
}

export default Main;
