/* eslint-disable */
// ^워링 업애주는 친구

import React from 'react';
import styles from './style/Basic.module.css'; 
import '../App.css'; 

function Basic() {
let loginOn = true;

    return (
        <div className={styles.basicNav}>
            <div className={styles.divWidth}>쥐구멍</div>
            <div className={styles.divWidth}><input placeholder='검색어를 입력하세요'/></div>
            <div className={styles.icon}>
            { loginOn === true && <Icon/> }
            <div className={styles.signUpBtn}>로그인</div>
            </div>
        </div>
    );
}

function Icon(){
    return(
    <>
    <div>★</div>
    <div>★</div>
    </>
    )
}

export default Basic;
