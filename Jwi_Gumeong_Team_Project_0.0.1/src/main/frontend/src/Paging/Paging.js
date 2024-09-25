/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from './style/Paging.module.css';
import chevron_left_g from '../icon/24px/chevron-left-g.png';
import chevron_left_b from '../icon/24px/chevron-left-b.png';
import chevron_right_g from '../icon/24px/chevron-right-g.png';
import chevron_right_b from '../icon/24px/chevron-right-b.png';
import '../App.css';

function Paging({ paging, postPage, setPostPage }) {

    let [chevron_left, setChevron_left] = useState(chevron_left_g);
    let [chevron_right, setChevron_right] = useState(chevron_right_g);
    // 한 블록당 리미트
    const blockLimit = 10;


    // 현재 블록위치
    const blockNumber = Math.ceil(postPage / blockLimit);
    // 스타트 페이지 
    const startPage = (blockNumber - 1) * blockLimit + 1;
    // 엔드 페이지
    const endPage = Math.min(startPage + blockLimit - 1, paging.pageCount);
    // 이전블록, 다음불록 여부
    const blockDown = startPage > 1;

    const bockUp = endPage < paging.pageCount

    const numberOnClick = (page) => {
        setPostPage(page);
        window.scrollTo(0, 0);
    }

    const blockUpOnClick = () => {
        if(bockUp){
            setPostPage(endPage + 1)
        }else{
            setPostPage(endPage)

        }
    }

    const blockDownOnClick = () => {
        if(blockDown){
            setPostPage(startPage -1)
        }else {
            setPostPage(1)
        }

    }

    return (
        <div className={styles.mainDiv}>
            {blockDown &&
                <img
                    onMouseEnter={() => setChevron_left(chevron_left_b)}
                    onMouseLeave={() => setChevron_left(chevron_left_g)}
                    style={{ marginRight: '20px', cursor: 'pointer' }} src={chevron_left}
                    onClick={blockDownOnClick} />
            }
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                <div key={i + startPage} className={styles.numText} onClick={() => { numberOnClick(startPage + i) }} style={startPage + i==postPage?{color : "#FF8901"}:{color : "#101010"}}>{startPage + i}</div>
            ))}
            {bockUp &&
                <img
                    onMouseEnter={() => setChevron_right(chevron_right_b)}
                    onMouseLeave={() => setChevron_right(chevron_right_g)}
                    style={{ marginLeft: '20px', cursor: 'pointer' }} src={chevron_right}
                    onClick={blockUpOnClick} />
            }
        </div>
    )
}


export default Paging;
