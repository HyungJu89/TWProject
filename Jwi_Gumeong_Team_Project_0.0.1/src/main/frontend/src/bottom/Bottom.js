/* TODO
    - 링크 연결
*/

/* eslint-disable */
// ^워링 업애주는 친구

import React, { useEffect, useState } from 'react';
import styles from './style/Bottom.module.css';
import {Link, useNavigate} from 'react-router-dom';
//이미지 import
import '../App.css';

function Header() {
    let navigate = useNavigate();

    return (
        <div style={{marginTop:'100px'}}>        
            <div className={styles.dashed} />{/* 회색줄 */}
            <div className={styles.basic}>
                <div style={{cursor:'pointer'}}  onClick={() => { navigate('/customerService'); window.scrollTo(0, 0) }}>
                    고객센터
                </div>
                <div className={styles.point}/> {/* 점 */}
                <div style={{cursor:'pointer'}}  onClick={() => { navigate('/customerService'); window.scrollTo(0, 0) }}>
                    이용약관
                </div>
                <div className={styles.point}/>
                <div style={{cursor:'pointer'}}  onClick={() => { navigate('/customerService'); window.scrollTo(0, 0) }}>
                    광고문의
                </div>
                <div className={styles.point}/>
                <div style={{cursor:'pointer'}}  onClick={() => { navigate('/customerService'); window.scrollTo(0, 0) }}>
                    의견제안
                </div>
                <div className={styles.info}>
                    jwigumeong © 2024 jwigumeongTeam
                </div>
            </div>
            <div className={styles.basic}>
                
            </div>
        </div>
    );
}

export default Header;
