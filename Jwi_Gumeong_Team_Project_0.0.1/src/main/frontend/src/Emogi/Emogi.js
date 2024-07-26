/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from './style/Emogi.module.css';
import big_comment from '../icon/20px/bigcomment.png';

import '../App.css';

function Emogi() {
  let emotion = ['😀', '😃', '😄','😀', '😃', '😄','😀', '😃', '😄', '😃', '😄', '😃', '😄', '😃', '😄', '😃', '😄','😀', '😃', '😄','😀', '😃', '😄', '😃', '😄', '😃', '😄', '😃', '😄', '😃', '😄','😀', '😃', '😄','😀', '😃', '😄', '😃', '😄', '😃', '😄', '😃', '😄', '😃', '😄','😀', '😃', '😄','😀', '😃', '😄', '😃', '😄', '😃', '😄', '😃', '😄'];
  let symbols = ['♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉','♉', '♉'];
  let [emogiList, setEmogiList] = useState(['d','m']);
    return(
        <div className={styles.emogiMain}>
          <div className={styles.emogiIcon}>
            <img src={big_comment}/>{/*표정*/}
            <img onClick={()=>{setEmogiList(emotion)}} src={big_comment}/>{/*자연물*/}
            <img src={big_comment}/>{/*케이크뭐임?*/}
            <img src={big_comment}/>{/*차*/}
            <img src={big_comment}/>{/*구기종목*/}
            <img src={big_comment}/>{/*띠용*/}
            <img onClick={()=>{setEmogiList(symbols)}} src={big_comment}/>{/*추상*/}  
            </div>

            <div>
            표정
              <div className={styles.emogiArea}>
                {emogiList.map((emogiList, i)=>(
                  <div className={styles.emogi}>{emogiList}</div>))
                }
              </div>
            </div>
        </div>
    )
}


export default Emogi;
