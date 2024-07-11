/* eslint-disable */
// ^워링 업애주는 친구

import React, { useEffect, useState } from 'react';
import styles from './style/Header.module.css';
//이미지 import
import searching from '../icon/24px/searching.png';
import deletion from '../icon/14px/deletion.png';
import Open_channel from '../icon/24px/Open-channel.png';
import notification_activation from '../icon/24px/notification-activation.png';
import notification_deactivation from '../icon/24px/notification-deactivation.png';
import '../App.css';

function Header() {
    let [loginOn, setLoginOn] = useState(true); //로그인 확인 변수
    let [justSearchOn, setJustSearchOn] = useState(true); //검색창 클릭시 노출되는 모달창 확인
    let [notification_img, setNotification_deactivation] = useState(notification_deactivation)

    useEffect(() => {
        {/* 최근검색어 미완성 */ }
        let justSearchLocal = localStorage.getItem('search')
        justSearchLocal = JSON.parse(justSearchLocal)
        justSearchLocal != null ? null : localStorage.setItem('search', JSON.stringify([])
            , [])
    })

    // onBlur={()=>{setJustSearchOn(false)}}
    return (
        <>
            <div className={styles.basicNav}>
                <div className={styles.divWidth}>쥐구멍</div>
                <div className={styles.divWidth}>
                    <input onClick={() => { setJustSearchOn(true) }} placeholder='검색어를 입력하세요' /></div>
                {justSearchOn == true ? <JustSearch /> : null} {/* 최근 검색 모달*/}
                <div className={styles.icon}>
                    {loginOn === true && <Icon />} {/* 로그인 체크 */}
                    <div className={styles.signUpBtn}>로그인</div>
                </div>
            </div>
        </>
    );
}

function Icon() { /* 로그인 시 노출되는 알림 아이콘 UI */
    return (
        <>
            <div><img src={Open_channel} /></div>
            <div><img
                onMouseEnter={() => { src={notification_deactivation} }}
                onMouseLeave={() => { src={notification_deactivation}  }}
                src={notification_deactivation} /></div>
        </>
    )
}
function JustSearch() { /* 최근 검색어 모달창 */
    useEffect(() => {
        {/* 최근검색어 미완성 */ }
        let justSearchLocal = localStorage.getItem('search') //최근검색어 로컬스토리지 생성
        justSearchLocal = JSON.parse(justSearchLocal) // JSON 오브젝트 저장
        // justSearchLocal.push('props...방금 검색한거 여기 추가') 
        justSearchLocal = new Set(justSearchLocal) // 중복검사
        justSearchLocal = Array.from(justSearchLocal) // 다시 array 변환
        localStorage.setItem('search', JSON.stringify(justSearchLocal))
    }, [])

    let [임시, set임시] = useState(true) //나중에... 최근 검색어 on/off로 바꿔야함

    return (
    <div className={styles.JustSearchBase}><h4>최근검색어</h4>
            {임시 === true ?
                <div className={styles.mainDiv}>
                    <div className={styles.list}>
                        <div><img src={searching} /> {/* 서치아이콘 */}
                        <p>1saf</p>
                        <img style={{height:'14px'}} src={deletion} /></div> {/* 삭제아이콘 */}
                    </div></div>
                : <p>최근 검색 내역이 없어요.</p>}
    </div>
    )
}
export default Header;
