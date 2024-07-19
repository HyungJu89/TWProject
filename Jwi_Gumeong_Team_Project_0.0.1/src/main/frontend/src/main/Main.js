/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from './style/Main.module.css';
import '../App.css';
import PublicBoard from './PublicBoard.js'
import PublicMenu from './PublicMenu.js'
import { useSelector, useDispatch } from 'react-redux';

function Main() {
    let navigate = useNavigate();
    let [topic, settopic] = useState(true);
    let [loginOn, setLoginOn] = useState(false);
    // let [imgUi, setImgUi] = useState(false); //이미지 ㅡ클릭 검사
    let state = useSelector((state)=>{ return state })

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
        {state.imgUiModal.popUp && <ImgUi/>}
        {console.log(state.imgUiModal.popUp)}
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
                {topic == true ? <div className={styles.fadein}><PublicBoard/></div> : null}
            </div>
            {/* 오른쪽 로그인, 추천 영역 */}
            <PublicMenu loginOn={loginOn} setLoginOn={setLoginOn} channel={channel} />
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


function ImgUi(){
    return(
        <div className={styles.imgPopUp}>
            <img></img>
        </div>
    )
}


export default Main;
