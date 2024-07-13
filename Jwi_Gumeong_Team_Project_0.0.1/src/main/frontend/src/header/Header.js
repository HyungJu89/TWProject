/* TODO
    - 로컬히스토리 연결 (근데 이건 채널 완성되고 해도 될듯)
*/

/* eslint-disable */
// ^워링 업애주는 친구

import React, { useEffect, useState } from 'react';
import styles from './style/Header.module.css';
import {Link, useNavigate} from 'react-router-dom';
//이미지 import
import Logo from '../icon/logo/logo.png'; //로고 이미지
import searching from '../icon/24px/searching.png';
import deletion from '../icon/14px/deletion.png';
import search from '../icon/24px/search.png';
import Open_channel from '../icon/24px/Open-channel.png';
import notification_activation from '../icon/24px/notification-activation.png';
import notification_deactivation from '../icon/24px/notification-deactivation.png';
import '../App.css';

function Header() {
    let [loginOn, setLoginOn] = useState(true); //로그인 확인 변수
    let [justSearchOn, setJustSearchOn] = useState(false); //검색창 클릭시 노출되는 모달창 확인
    let navigate = useNavigate();
    useEffect(() => {
        {/* 최근검색어 미완성 */ }
        let justSearchLocal = localStorage.getItem('search')
        justSearchLocal = JSON.parse(justSearchLocal)
        justSearchLocal != null ? null : localStorage.setItem('search', JSON.stringify([])
            , [])
    })

    return (
        <>
            <div className={styles.basicNav}>
                <div className={styles.divWidth}><Link to="/"><img src={Logo} /></Link></div>
                <div className={styles.inputDiv}>
                    <input onClick={() => { setJustSearchOn(true) }}onBlur={()=>{setJustSearchOn(false)}}placeholder='검색어를 입력하세요' />
                    <img style={{cursor: 'pointer'}} src={search}/>
                </div>
                {justSearchOn == true ? <JustSearch /> : null} {/* 최근 검색 모달*/}
                <div className={styles.icon}>
                    {loginOn === true && <Icon/>} {/* 로그인 체크 */}
                    <div onClick={() => { navigate('/signIn') }} className={styles.signInBtn}>로그인</div>
                </div>
            </div>
        </>
    );
}
function Icon() { /* 로그인 시 노출되는 알림 아이콘 UI */
let [img, setImg] = useState(notification_deactivation) /*알림 hover 이팩트 변환용*/
    return (
        <>
            <div className={styles.icon_notification}>
                <img src={Open_channel} alt="Open Channel" /></div>
            <div className={styles.icon_notification}
                onMouseEnter={() => setImg(notification_activation)}
                onMouseLeave={() => setImg(notification_deactivation)}>
                <img src={img} alt="Notification"/></div>
        </>
    );
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
                    {/* 서치 icon */} <div><img src={searching} /> 
                    {/* 글내용 */}    <p>1saf</p> 
                    {/* 삭제 icon */} <img style={{height:'14px', cursor : 'pointer'}} src={deletion} /></div>
                    </div></div>
                : <p>최근 검색 내역이 없어요.</p>}
    </div>
    )
}
export default Header;
