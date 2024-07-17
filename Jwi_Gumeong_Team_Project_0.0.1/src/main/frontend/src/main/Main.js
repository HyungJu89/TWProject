/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from './style/Main.module.css';
import '../App.css';
import PublicBoard from './PublicBoard.js'
import edit from '../icon/20px/edit.png';

function Main() {
    let navigate = useNavigate();
    let [topic, settopic] = useState(true);
    let [loginOn, setLoginOn] = useState(false);

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
                {console.log(topic)}
                {topic == true ? <PublicBoard /> : null}
                <button style={{ width: '150px', height: '50px' }} on Click={() => { navigate('/channel/' + '123') }}>채널 확인 URL</button>
            </div>
            <div className={styles.rightDiv}>{/*유저 영역 */}
                {loginOn == true ? <UserBefore/>:<UserAfter channel={channel}/>}
                <div className={styles.recommendation}>{/* 추천 */}
                    <p style={{margin:'0px',marginLeft:'21px'}}>추천</p>
                    <div className={styles.list}>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                    </div>
                </div>
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

function UserAfter({channel}){
    return(
    <div>
    <div className={styles.userAfter} style={{borderRadius:'20px 20px 0px 0px'}}>
        <div className={styles.userInfo}>
            <div>
                김박최조임권강이
                <p>aaaaaa1234@naver.Com</p>
            </div>
            <button>로그아웃</button>
        </div>
        <button className={styles.myPage}>마이페이지</button>
    </div>
    <div className={styles.dashed} />{/* 회색줄 */}
    <div className={styles.userAfter}style={{borderRadius:'00px 00px 20px 20px'}}>
        <div className={styles.Bookmark}>즐겨찾기<img src={edit}/></div>
        <div className={styles.recommendation}style={{marginTop:'0px', paddingTop:'20px'}}>{/* 추천 */}
                    <div className={styles.list} style={{marginTop:'0px'}}>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                    </div>
        </div>
    </div>
    </div>
    )
}

function UserBefore(){
    return(
    <div className={styles.userBefore}>
        스트리머 덕후들이 모이는 쥐구멍!
        <button style={{ width: '318px', height: '63px' }}>로그인</button>
        <div>
            <div className={styles.loginMenu} style={{ borderRight: '1px solid #999999' }}>회원가입</div>
            <div className={styles.loginMenu}>비밀번호 찾기</div>
        </div>
    </div>
    )
}
export default Main;
