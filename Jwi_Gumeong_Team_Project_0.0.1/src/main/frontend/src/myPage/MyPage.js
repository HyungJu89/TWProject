import React, { useEffect, useState } from 'react';
import styles from './style/MyPage.module.css';
import InfoEdit from './InfoEdit.js';
import MyPosts from './MyPosts.js';
import FavoritesManagement from './FavoritesManagement.js';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//마이페이지(로그인 검증)
function MyPage() {
    let [topic, settopic] = useState('정보 수정');
    const location = useLocation();
    const { pageState } = location.state || {};
    useEffect(()=>{
        (pageState &&
            settopic(pageState)
        );
    },[]);

    return (
        <div className={styles.MyPage}>
            <TopicBtn topic={topic} settopic={settopic} />
            {topic === '정보 수정' && <InfoEdit/>}
            {topic === '내가 쓴 글' && <MyPosts />}
            {topic === '즐겨찾기 관리' && <FavoritesManagement />}
        </div>
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