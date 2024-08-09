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
import { getUserInfo } from '../slice/loginSlice.js';
import { useDispatch, useSelector } from 'react-redux';

function PublicMenu({ isLoggedIn, onLogout }) {
    var jsonSessionInfo = sessionStorage.getItem('sessionId');
    var sessionInfo = JSON.parse(jsonSessionInfo);
    const dispatch = useDispatch();
    useEffect(() => {
        if(sessionInfo){
            console.log(1);
            dispatch(getUserInfo(sessionInfo.sessionId));
        }
    }, [dispatch,sessionInfo]); 
    let navigate = useNavigate();
    // 첫 번째 쿼리: 채널 정보를 가져오기.
    return (
        <div className={styles.rightDiv}>{/*유저 영역 */}
            {isLoggedIn ? <UserAfter onLogout={onLogout}/> : <UserBefore/>}
            <div className={styles.recommendation}>{/* 추천 */}
                <p style={{ margin: '0px', marginLeft: '21px' }}>추천</p>
                <div className={styles.list}>
                    {/*onClick={()=>{navigate(`/channel/123`); window.scrollTo(0, 0) }}*/}
                        <div className={styles.reChannel}>
                            <img src='https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg' />
                            DB연결할것 최대 7개
                        </div>
                </div>
            </div>
        </div>
    )
}

function UserAfter({ onLogout }) {
    let navigate = useNavigate();
    const userState = useSelector((state) => state.userState);  
    return (
        <div className={styles.fadein}>
            <div className={styles.userAfter} style={{ borderRadius: '20px 20px 0px 0px' }}>
                <div className={styles.userInfo}>
                    <div>
                        {userState.nickName} 님
                        <p>{userState.email}</p>
                    </div>
                    <button onClick={() => { onLogout() }} >로그아웃</button>
                </div>
                <button onClick={() => { navigate('/myPage') }} className={styles.myPage}>마이페이지</button>
            </div>
            <div className={styles.dashed} />{/* 회색줄 */}
            <div className={styles.userAfter} style={{ borderRadius: '00px 00px 20px 20px' }}>
                <div className={styles.Bookmark}>즐겨찾기<img src={edit} /></div>
                <div className={styles.recommendation} style={{ marginTop: '0px', paddingTop: '20px' }}>{/* 추천 */}
                    <div className={styles.list} style={{ marginTop: '0px' }}>
                        <div className={styles.reChannel}><img src='https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg' />즐찾</div>
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

function UserBefore() {
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