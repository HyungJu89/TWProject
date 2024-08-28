/* eslint-disable */
// ^워링 업애주는 친구
import '../../App.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../style/MiniPublicBoard.module.css';

function MoreAlign({ setIsAsc }) {
    return (
        <div className={styles.moreUi} style={{ left: '60px', top: '30px' }}>
            <div className={styles.text} onClick={() => setIsAsc(false)}>최신순</div>
            <div className={styles.text} onClick={() => setIsAsc(true)}>과거순</div>
        </div>
    )
}

export default MoreAlign;