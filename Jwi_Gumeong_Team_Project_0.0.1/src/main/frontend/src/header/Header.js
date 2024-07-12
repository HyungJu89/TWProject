/* eslint-disable */
// ^워링 업애주는 친구

import React, { useEffect, useState } from 'react';
import styles from './style/Header.module.css'; 
//이미지 import
import searching from '../icon/24px/searching.png';
import '../App.css'; 
import { useNavigate } from 'react-router-dom';

function Header() {
let [loginOn, setLoginOn] = useState(true);
let [justSearchOn, setJustSearchOn] = useState(false);
let navigate = useNavigate();
useEffect(()=>{ {/* 최근검색어 미완성 */}
let justSearchLocal = localStorage.getItem('search')
justSearchLocal = JSON.parse(justSearchLocal)
justSearchLocal != null ? null : localStorage.setItem('search', JSON.stringify([])
,[])
})

// onBlur={()=>{setJustSearchOn(false)}}
    return (
        <>
        <div className={styles.basicNav}>
            <div className={styles.divWidth}>쥐구멍</div>
            <div className={styles.divWidth}>
            <input onClick={()=>{setJustSearchOn(true)}}  placeholder='검색어를 입력하세요'/></div>
                {justSearchOn == true ? <JustSearch/>: null} {/* 최근 검색 모달*/}
            <div className={styles.icon}>
                { loginOn === true && <Icon/> } {/* 로그인 체크 */}
            <div onClick={()=>{navigate('/signIn')}}className={styles.signUpBtn}>로그인</div>
            </div>
        </div>
        </>
    );
}

function Icon(){ /* 로그인 상황에 따른 모달 UI */
    return(
    <>
    <div>★</div>
    <div>★</div>
    </>
    )
}
function JustSearch(){
    useEffect(()=>{ {/* 최근검색어 미완성 */}
        let justSearchLocal = localStorage.getItem('search') //최근검색어 로컬스토리지 생성
        justSearchLocal = JSON.parse(justSearchLocal) // JSON 오브젝트 저장
        // justSearchLocal.push('props...방금 검색한거 여기 추가') 
        justSearchLocal = new Set(justSearchLocal) // 중복검사
        justSearchLocal = Array.from(justSearchLocal) // 다시 array 변환
        localStorage.setItem('search', JSON.stringify(justSearchLocal))
      },[])

      let [justSearchOn, setJustSearchOn ] = useState(true) //나중에... 최근 검색어 on/off로 바꿔야함

    return(
        <div className={styles.JustSearchBase}>
            <h4>최근검색어</h4>
            {justSearchOn === true ? 
            <div className={styles.mainDiv}>
            <div className={styles.list}>
            <div><img src={searching}/>요즘 검색어</div>
            <div><img src={searching}/>요즘 검색어</div>
            <div><img src={searching}/>요즘 검색어</div>
            <div><img src={searching}/>요즘 검색어</div>
            <div><img src={searching}/>요즘 검색어</div>
            <div><img src={searching}/>요즘 검색어</div>
            </div>   
            </div>
            
            : <p>최근 검색 내역이 없어요.</p>}
        
            </div>
    )
}
export default Header;
