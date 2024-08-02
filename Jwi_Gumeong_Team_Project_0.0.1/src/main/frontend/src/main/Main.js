/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
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

    const [channel, setChannel] = useState('');

    useEffect(() => { /*특정 URL 방송--대체예정*/
        axios.get(`/channelAPI/search/0b33823ac81de48d5b78a38cdbc0ab94`)
            .then((response) => {
                setChannel(response.data.content);
            })
            .catch(error => {
                console.error('Channel API Error:', error);
                throw error;
            })
    }, []);

    const [partnersLive, setPartnersLive] = useState([]);
    useEffect(() => { /*파트너스 Live*/
        const addPartners = async () =>{
            let ArrayPartners = []; //12개 배열 저장할 장소
            try{
                while (ArrayPartners.length < 12){ //배열이 12가 되면 참이다.
                    const response = await axios.get(`/partnersLiveApi/`);
                    ArrayPartners  = [...ArrayPartners, ...response.data.content.streamerPartners];

                    if (ArrayPartners.length >= 12) {//불러온 데이터 12개 초과 시 잘라내기
                        setPartnersLive(ArrayPartners.slice(0,12));
                        break;
                    }
                }
            } catch(error){
                console.error('Channel API Error:', error);
            }
        }
        addPartners();
        console.log("ㅎㅇ");
        console.log(partnersLive);

        // axios.get(`/partnersLiveApi/`)
        //     .then((response) => {
        //         console.log(response.data.content.streamerPartners);
        //         setPartnersLive(response.data.content.streamerPartners)
        //     })
        //     .catch(error => {
        //         console.error('Channel API Error:', error);
        //         throw error;
        //     })
    }, []);

    return (
        <div>
            <div className={styles.bannerPosition}>
                <MainBanner channelId={partnersLive[0]?.channelId ? partnersLive[0].channelId : '오류'}
                            channelIdSub1={partnersLive[1]?.channelId ? partnersLive[1].channelId : '오류'}
                            channelIdSub2={partnersLive[2]?.channelId ? partnersLive[2].channelId : '오류'}
                            channelIdSub3={partnersLive[3]?.channelId ? partnersLive[3].channelId : '오류'}
                
                />
            </div>
            <div className={styles.basic}> {/*전체 DIV*/}
                <div className={styles.leftDiv}>{/*게시판 영역*/}
                    <div className={styles.hotBoard}>{/*인기 게시판*/}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}><h3>인기 게시판</h3><h6>갱신: 오후 5시</h6></div>
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
                    <TopicBtn topic={topic} settopic={settopic} />
                    {topic == true ? <div className={styles.fadein}><PublicBoard /></div> : null}
                    <div onClick={() => { navigate('/allTopic'); window.scrollTo(0, 0) }} className={styles.moreAllTopic}>더보기</div>{/* 오른쪽 로그인, 추천 영역 */}
                </div>
                <PublicMenu loginOn={loginOn} setLoginOn={setLoginOn} channel={channel} />
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
