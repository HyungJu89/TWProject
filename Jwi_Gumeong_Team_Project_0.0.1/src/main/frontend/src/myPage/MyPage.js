import React, { useEffect, useState } from 'react';
import styles from './style/MyPage.module.css';
import InfoEdit from './InfoEdit.js';
import MyPosts from './MyPosts.js';
import FavoritesManagement from './FavoritesManagement.js';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//마이페이지(로그인 검증)
function MyPage() {
    let [topic, settopic] = useState('');
    let [onOff, setOnOff] = useState(false);
    const location = useLocation();
    const { pageState } = location.state || {};
    let navigate = useNavigate();
    
    useEffect(() => {
        {/* 최근검색어 로컬스토리지 생성문 */ }
        let justMyPageLocal = localStorage.getItem('myPage');
        if(justMyPageLocal === null){
            localStorage.setItem('myPage', JSON.stringify('정보 수정'));
        }
    },[]);
    
    useEffect(() => {
        let justMyPageLocal = localStorage.getItem('myPage');
        if(justMyPageLocal){
            justMyPageLocal = JSON.parse(justMyPageLocal); // JSON 객체로 변환
            settopic(justMyPageLocal); // 상태에 저장
        }
    },[]);

    let setMyPageTopic = (topics)=>{
        settopic(topics);
        if(topics === '정보 수정'){
            localStorage.setItem('myPage', JSON.stringify('정보 수정'));
        }
        if(topics === '내가 쓴 글'){
            localStorage.setItem('myPage', JSON.stringify('내가 쓴 글'));
        }
        if(topics === '즐겨찾기 관리'){
            localStorage.setItem('myPage', JSON.stringify('즐겨찾기 관리'));
        };
    }

    useEffect(()=>{
        (pageState &&
            settopic(pageState)
        );
    },[]);

    return (
        // loginSession === true ?
            <div className={('fadein', styles.MyPage)}>
                <TopicBtn topic={topic} settopic={settopic} setMyPageTopic = {setMyPageTopic} />
                {topic === '정보 수정' && <InfoEdit/>}
                {topic === '내가 쓴 글' && <MyPosts />}
                {topic === '즐겨찾기 관리' && <FavoritesManagement />}
            </div>
        // : null
    );
}

function TopicBtn({ topic, settopic, setMyPageTopic }) {

    return (
        <div className={styles.Nav }style={{marginBottom: topic === '내가 쓴 글' ? '0px' : '10px'}}>
            <div className={styles.topicdiv}>
                <div 
                    onClick={() => setMyPageTopic('정보 수정')}
                    style={{ color: topic === '정보 수정' ? 'black' : '#999999' }}
                >
                    정보 수정
                    {topic === '정보 수정' && <div className={styles.bar} />}
                </div>
                <div 
                    onClick={() => setMyPageTopic('내가 쓴 글')}
                    style={{color: topic === '내가 쓴 글' ? 'black' : '#999999'}}
                >
                    내가 쓴 글
                    {topic === '내가 쓴 글' && <div className={styles.bar} />}
                </div>
                <div 
                    onClick={() => setMyPageTopic('즐겨찾기 관리')}
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