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
    const [partnersLive, setPartnersLive] = useState([]);
    useEffect(() => { /*파트너스 Live*/
        const addPartners = async () =>{
            let arrayPartners = []; //12개 배열 저장할 장소
            let filterArrayPartners = new Set(); // 고유 파트너를 저장할 Set

            try{
                while (arrayPartners.length < 12){ //배열이 12가 되면 참이다.
                    const response = await axios.get(`/partnersLiveApi/`);
                    const newPartners = response.data.content.streamerPartners;

                    // API 호출 데이터를 Set에 추가하여 중복을 자동으로 제거
                    newPartners.forEach(partner => filterArrayPartners.add(partner));
                    
                    if (filterArrayPartners.size >= 12) {//불러온 데이터 12개 초과 시 실행
                        arrayPartners = Array.from(filterArrayPartners).slice(0, 12);
                        setPartnersLive(arrayPartners); // 상태 업데이트
                        break;
                    }
                }
            } catch(error){
                console.error('Channel API Error:', error);
            }
        };
        addPartners();
    }, []);
    
    //컴포넌트 전송 최적화 구문
    const partnerChannelIndex = (i) =>{
        return partnersLive[i]?.channelId || '오류';
    };

    const [channelHot, setChannelHot] = useState('');
    useEffect(() => { /*특정 URL 방송--대체예정*/
        axios.get(`/channelAPI/search/${partnerChannelIndex(1)}`)
            .then((response) => {
                setChannelHot(response.data.content);
            })
            .catch(error => {
                console.error('Channel API Error:', error);
                throw error;
            })
    }, []);

    const [channel, setChannel] = useState('');
    useEffect(() => { /*파트너스 추천*/
        const addPartners = async () =>{
            let arrayPartners = []; //12개 배열 저장할 장소
            let filterArrayPartners = new Set(); // 고유 파트너를 저장할 Set

            try{
                while (arrayPartners.length < 12){ //배열이 12가 되면 참이다.
                    const response = await axios.get(`/partnersLiveApi/`);
                    const newPartners = response.data.content.streamerPartners;

                    // API 호출 데이터를 Set에 추가하여 중복을 자동으로 제거
                    newPartners.forEach(partner => filterArrayPartners.add(partner));
                    
                    if (filterArrayPartners.size >= 12) {//불러온 데이터 12개 초과 시 실행
                        arrayPartners = Array.from(filterArrayPartners).slice(0, 12);
                        setChannel(arrayPartners); // 상태 업데이트
                        break;
                    }
                }
            } catch(error){
                console.error('Channel API Error:', error);
            }
        };
        addPartners();
    }, []);

        //컴포넌트 전송 최적화 구문
        const ChannelIndex = (i) =>{
            return channel[i]?.channelId || '오류';
        };


    return (
        <div>
            <div className={styles.bannerPosition}>
                <MainBanner channelId={partnerChannelIndex(0)}
                            channelIdSub1={partnerChannelIndex(1)}
                            channelIdSub2={partnerChannelIndex(2)}
                            channelIdSub3={partnerChannelIndex(3)}
                            channelIdSub4={partnerChannelIndex(4)}
                            channelIdSub5={partnerChannelIndex(5)}
                            channelIdSub6={partnerChannelIndex(6)}
                            channelIdSub7={partnerChannelIndex(7)}
                            channelIdSub8={partnerChannelIndex(8)}
                            channelIdSub9={partnerChannelIndex(9)}
                            channelIdSub10={partnerChannelIndex(10)}
                            channelIdSub11={partnerChannelIndex(11)}
                
                />
            </div>
            <div className={styles.basic}> {/*전체 DIV*/}
                <div className={styles.leftDiv}>{/*게시판 영역*/}
                    <div className={styles.hotBoard}>{/*인기 게시판*/}
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}><h3>인기 게시판</h3><h6>갱신: 오후 5시</h6></div>
                        <div className={styles.channelDiv}>
                            <div className={styles.channel}><img src={channelHot.channelImageUrl} />{channelHot.channelName}</div>
                            <div className={styles.channel}><img src={channelHot.channelImageUrl} />{channelHot.channelName}</div>
                            <div className={styles.channel}><img src={channelHot.channelImageUrl} />{channelHot.channelName}</div>
                            <div className={styles.channel}><img src={channelHot.channelImageUrl} />{channelHot.channelName}</div>
                            <div className={styles.channel}><img src={channelHot.channelImageUrl} />{channelHot.channelName}</div>
                            <div className={styles.channel}><img src={channelHot.channelImageUrl} />{channelHot.channelName}</div>
                            <div className={styles.channel}><img src={channelHot.channelImageUrl} />{channelHot.channelName}</div>
                            <div className={styles.channel}><img src={channelHot.channelImageUrl} />{channelHot.channelName}</div>
                            <div className={styles.channel}><img src={channelHot.channelImageUrl} />{channelHot.channelName}</div>
                            <div className={styles.channel}><img src={channelHot.channelImageUrl} />{channelHot.channelName}</div>
                        </div>
                    </div>
                    <TopicBtn topic={topic} settopic={settopic} />
                    {topic == true ? <div className={styles.fadein}><PublicBoard /></div> : null}
                    <div onClick={() => { navigate('/allTopic'); window.scrollTo(0, 0) }} className={styles.moreAllTopic}>더보기</div>{/* 오른쪽 로그인, 추천 영역 */}
                </div>
                <PublicMenu loginOn={loginOn} setLoginOn={setLoginOn} channel={channel}
                        channelId={ChannelIndex(0)}
                        channelIdSub1={ChannelIndex(1)}
                        channelIdSub2={ChannelIndex(2)}
                        channelIdSub3={ChannelIndex(3)}
                        channelIdSub4={ChannelIndex(4)}
                        channelIdSub5={ChannelIndex(5)}
                        channelIdSub6={ChannelIndex(6)}
                />
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
