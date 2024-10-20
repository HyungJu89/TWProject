/* eslint-disable */
// ^워링 업애주는 친구
import '../../App.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../style/PublicBoard.module.css';
import { useNavigate } from 'react-router-dom';
import xBoxImg from '../../icon/img/profile.png';

function ChannelTitle({ postChannel }) {
    let navigate = useNavigate();
    return (
        <div onClick={() => { navigate(`/channel/${postChannel.id}`); window.scrollTo(0, 0) }}>
            <div className={styles.title}> {/* 클릭시 URL 이동 */}
                <div className={styles.imgDiv}>
                {postChannel.imageUrl ?
                    <img src={postChannel.imageUrl} />
                    :
                    <img src={xBoxImg} />
                }   
                </div>{postChannel.name}
            </div>
            <div className={styles.dashed} />{/* 회색줄 */}
        </div>
    )
}
export default ChannelTitle;