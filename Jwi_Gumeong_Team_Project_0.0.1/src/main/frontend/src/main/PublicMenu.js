/* eslint-disable */
// ^워링 업애주는 친구

import React from 'react';
import styles from './style/PublicMenu.module.css';
import '../App.css';
import edit from '../icon/20px/edit.png';
import btn_left from '../icon/btn/btn-left.png';
import btn_right from '../icon/btn/btn-right.png';

function PublicMenu({loginOn, setLoginOn, channel}){
    return(
        <div className={styles.rightDiv}>{/*유저 영역 */}
        {loginOn ? <UserAfter setLoginOn={setLoginOn} channel={channel}/>:<UserBefore setLoginOn={setLoginOn}/>}
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
    )
}

function UserAfter({channel,setLoginOn}){
    return(
        <div className={styles.fadein}>
            <div className={styles.userAfter} style={{ borderRadius: '20px 20px 0px 0px' }}>
                <div className={styles.userInfo}>
                    <div>
                        김박최조임권강이
                        <p>aaaaaa1234@naver.Com</p>
                    </div>
                    <button onClick={()=>{setLoginOn(false)}} >로그아웃</button>
                </div>
                <button className={styles.myPage}>마이페이지</button>
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

function UserBefore({setLoginOn}){
    return(
        <div className={styles.fadein}>
            <div className={styles.userBefore}>
                스트리머 덕후들이 모이는 쥐구멍!
                <button onClick={() => { setLoginOn(true) }} style={{ width: '318px', height: '63px' }}>로그인</button>
                <div>
                    <div className={styles.loginMenu} style={{ borderRight: '1px solid #999999' }}>회원가입</div>
                    <div className={styles.loginMenu}>비밀번호 찾기</div>
                </div>
            </div>
        </div>
    )
}



export default PublicMenu;