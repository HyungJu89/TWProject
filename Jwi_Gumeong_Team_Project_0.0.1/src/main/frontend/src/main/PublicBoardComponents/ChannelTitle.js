/* eslint-disable */
// ^워링 업애주는 친구
import '../../App.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../style/MiniPublicBoard.module.css';
import { useNavigate } from 'react-router-dom';

function ChannelTitle({ postChannel }) {
    let navigate = useNavigate();
    return (
        <div onClick={() => { navigate(`/channel/${postChannel.id}`) }}>
            <div className={styles.title}> {/* 클릭시 URL 이동 */}
                <img src={postChannel.imageUrl} /><div style={{ cursor: 'pointer' }}>{postChannel.name}</div>
            </div>
            <div className={styles.dashed} />{/* 회색줄 */}
        </div>
    )
}
export default ChannelTitle;