/* eslint-disable */
// ^워링 업애주는 친구

import React, { useEffect, useState } from 'react';
import styles from './style/Basic.module.css'; 
import '../App.css'; 
import axios from 'axios'

function Basic() {
let [loginOn, setLoginOn] = useState(true);
let [justSearchOn, setJustSearchOn] = useState(false);

    return (
        <>
        <div className={styles.basicNav}>
            <div className={styles.divWidth}>쥐구멍</div>
            <div className={styles.divWidth}>
            <input onClick={()=>{setJustSearchOn(true)}} onBlur={()=>{setJustSearchOn(false)}} placeholder='검색어를 입력하세요'/></div>
                {justSearchOn == true ? <JustSearch/>: null}    
            <div className={styles.icon}>
                { loginOn === true && <Icon/> } {/* 로그인 체크 */}
            <div className={styles.signUpBtn}>로그인</div>
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
    return(
        <div className={styles.JustSearchBase}>
gdgdg
        </div>
    )
}

export default Basic;
