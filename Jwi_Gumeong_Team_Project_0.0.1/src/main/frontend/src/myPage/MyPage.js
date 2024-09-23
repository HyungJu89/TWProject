import React, { useEffect, useState } from 'react';
import styles from './style/MyPage.module.css';
import InfoEdit from './InfoEdit.js';
import MyPosts from './MyPosts.js';
import FavoritesManagement from './FavoritesManagement.js';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//마이페이지(로그인 검증)
function MyPage() {
    let [topic, settopic] = useState('정보 수정');
    const location = useLocation();
    const { pageState } = location.state || {};
    let navigate = useNavigate();
    // let [loginSession,setLoginSession] = useState(false);
    // var jsonSessionInfo = sessionStorage?.getItem('sessionId');
    // var sessionInfo = JSON.parse(jsonSessionInfo);
    useEffect(()=>{
        (pageState &&
            settopic(pageState)
        );
    },[]);
    // useEffect(()=>{
    //     // 세션여부 체크 ? << 이거 처리 넣어서 null 값일떄 undefined 반환되게했음.
    //     if(sessionInfo?.sessionId === undefined){
    //         // 컴포넌트 표기를 위한 true false state문
    //         setLoginSession(false);
    //         navigate('/');
    //     } else {
    //         setLoginSession(true);
    //     }
    //     // sessionInfo,loginSession 이 바뀔떄마다 실행
    // },[sessionInfo,loginSession])

    return (
        // loginSession === true ?
            <div className={styles.MyPage}>
                <TopicBtn topic={topic} settopic={settopic} />
                {topic === '정보 수정' && <InfoEdit/>}
                {topic === '내가 쓴 글' && <MyPosts />}
                {topic === '즐겨찾기 관리' && <FavoritesManagement />}
            </div>
        // : null
    );
}

function TopicBtn({ topic, settopic }) {
    return (
        <div className={styles.Nav}>
            <div className={styles.topicdiv}>
                <div 
                    onClick={() => settopic('정보 수정')}
                    style={{ color: topic === '정보 수정' ? 'black' : '#999999' }}
                >
                    정보 수정
                    {topic === '정보 수정' && <div className={styles.bar} />}
                </div>
                <div 
                    onClick={() => settopic('내가 쓴 글')}
                    style={{ color: topic === '내가 쓴 글' ? 'black' : '#999999' }}
                >
                    내가 쓴 글
                    {topic === '내가 쓴 글' && <div className={styles.bar} />}
                </div>
                <div 
                    onClick={() => settopic('즐겨찾기 관리')}
                    style={{ color: topic === '즐겨찾기 관리' ? 'black' : '#999999' }}
                >
                    즐겨찾기 관리
                    {topic === '즐겨찾기 관리' && <div className={styles.bar} />}
                </div>
            </div>
        </div>  
    );
}


export default MyPage;