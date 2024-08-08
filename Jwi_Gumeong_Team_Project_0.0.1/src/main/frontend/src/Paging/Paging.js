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

function Paging() {
    let [chevron_left, setChevron_left] = useState(chevron_left_g);
    let [chevron_right, setChevron_right] = useState(chevron_right_g);
    return(
        <div className={styles.mainDiv}>
            <img 
            onMouseEnter={() => setChevron_left(chevron_left_b)}
            onMouseLeave={() => setChevron_left(chevron_left_g)}
            style={{marginRight:'20px',cursor:'pointer'}} src={chevron_left}/>
            <div className={styles.numText}>1</div>
            <div className={styles.numText}>2</div>
            <div className={styles.numText}>3</div>
            <div className={styles.numText}>4</div>
            <div className={styles.numText}>5</div>
            <div className={styles.numText}>6</div>
            <div className={styles.numText}>7</div>
            <div className={styles.numText}>8</div>
            <div className={styles.numText}>9</div>
            <div className={styles.numText}>10</div>
            <img 
            onMouseEnter={() => setChevron_right(chevron_right_b)}
            onMouseLeave={() => setChevron_right(chevron_right_g)}
            style={{marginLeft:'20px',cursor:'pointer'}}  src={chevron_right}/>
        </div>
    )
}


export default Paging;
