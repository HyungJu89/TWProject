/* eslint-disable */
// ^워링 업애주는 친구

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChannel } from '../recycleCode/ApiQuery.js';
import styles from './style/PublicMenu.module.css';
import '../App.css';
import edit from '../icon/20px/edit.png';
import add from '../icon/40px/add.png';
import btn_left from '../icon/btn/btn-left.png';
import btn_right from '../icon/btn/btn-right.png';

function PublicMenu({ loginOn, setLoginOn, channel,
    channelId, channelIdSub1, channelIdSub2, channelIdSub3, channelIdSub4, channelIdSub5, channelIdSub6 }) {

    let navigate = useNavigate();
    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useChannel(channelId);
    const { data: channelApi1, isLoading: isLoadingChannel1, isError: isErrorChannel1 } = useChannel(channelIdSub1);
    const { data: channelApi2, isLoading: isLoadingChannel2, isError: isErrorChannel2 } = useChannel(channelIdSub2);
    const { data: channelApi3, isLoading: isLoadingChannel3, isError: isErrorChannel3 } = useChannel(channelIdSub3);
    const { data: channelApi4, isLoading: isLoadingChannel4, isError: isErrorChannel4 } = useChannel(channelIdSub4);
    const { data: channelApi5, isLoading: isLoadingChannel5, isError: isErrorChannel5 } = useChannel(channelIdSub5);
    const { data: channelApi6, isLoading: isLoadingChannel6, isError: isErrorChannel6 } = useChannel(channelIdSub6);

    if (isLoadingChannel || isLoadingChannel1 || isLoadingChannel2 || isLoadingChannel3 || isLoadingChannel4 || isLoadingChannel5 || isLoadingChannel6) {
        const loadingimageUrls = [add, add, add, add, add, add, add];

        return <div className={styles.rightDiv}>{/*유저 영역 */}
            {loginOn ? <UserAfter setLoginOn={setLoginOn} channel={channel} /> : <UserBefore setLoginOn={setLoginOn} />}
            <div className={styles.recommendation}>{/* 추천 */}
                <p style={{ margin: '0px', marginLeft: '21px' }}>추천</p>
                <div className={styles.list}>
                    {loadingimageUrls.map((url, index) => (
                        <div key={index} className={styles.reChannel}>
                            <img src={url} alt={`Channel ${index}`} />
                            ...
                        </div>
                    ))}
                </div>
            </div>
        </div>
    }
    if (isErrorChannel || isErrorChannel1 || isErrorChannel2 || isErrorChannel3 || isErrorChannel4 || isErrorChannel5 || isErrorChannel6) {
        return <>에러남</>;
    }
    
    const channels = [
        channelApi, channelApi1, channelApi2, channelApi3, channelApi4,channelApi5, channelApi6
    ];
    return (
        <div className={styles.rightDiv}>{/*유저 영역 */}
            {loginOn ? <UserAfter setLoginOn={setLoginOn} channel={channel} /> : <UserBefore setLoginOn={setLoginOn} />}
            <div className={styles.recommendation}>{/* 추천 */}
                <p style={{ margin: '0px', marginLeft: '21px' }}>추천</p>
                <div className={styles.list}>
                    {channels.map((channel, index) => (
    /*★추천 눌렀을 때 게시판으로 이동하는 위치 ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★*/
                        <div onClick={()=>{navigate(`/channel/${channel?.channelId}`); window.scrollTo(0, 0) }} key={index} className={styles.reChannel}>
                            <img src={channel?.channelImageUrl} alt={channel?.channelName} />
                            {channel?.channelName}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function UserAfter({ channel, setLoginOn }) {
    let navigate = useNavigate();
    return (
        <div className={styles.fadein}>
            <div className={styles.userAfter} style={{ borderRadius: '20px 20px 0px 0px' }}>
                <div className={styles.userInfo}>
                    <div>
                        김박최조임권강이
                        <p>aaaaaa1234@naver.Com</p>
                    </div>
                    <button onClick={() => { setLoginOn(false) }} >로그아웃</button>
                </div>
                <button onClick={() => { navigate('/myPage') }} className={styles.myPage}>마이페이지</button>
            </div>
            <div className={styles.dashed} />{/* 회색줄 */}
            <div className={styles.userAfter} style={{ borderRadius: '00px 00px 20px 20px' }}>
                <div className={styles.Bookmark}>즐겨찾기<img src={edit} /></div>
                <div className={styles.recommendation} style={{ marginTop: '0px', paddingTop: '20px' }}>{/* 추천 */}
                    <div className={styles.list} style={{ marginTop: '0px' }}>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                        <div className={styles.reChannel}><img src={channel.channelImageUrl} />{channel.channelName}</div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <img src={btn_left} />
                    1/5
                    <img src={btn_right} />
                </div>
            </div>
        </div>
    )
}

function UserBefore({ setLoginOn }) {
    let navigate = useNavigate();
    return (
        <div>
            <div className={styles.userBefore}>
                스트리머 덕후들이 모이는 쥐구멍!
                <button onClick={() => { navigate('/signIn') }} style={{ width: '318px', height: '63px' }}>로그인</button>
                <div>
                    <div onClick={() => { navigate('/signUp') }} className={styles.loginMenu} style={{ borderRight: '1px solid #999999' }}>회원가입</div>
                    <div className={styles.loginMenu} onClick={() => { navigate('/pwInquiry') }}>비밀번호 찾기</div>
                </div>
            </div>
        </div>
    )
}


export default PublicMenu;