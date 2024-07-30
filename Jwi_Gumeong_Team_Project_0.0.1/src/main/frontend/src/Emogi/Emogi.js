/* eslint-disable */
// ^워링 업애주는 친구

import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styles from './style/Emogi.module.css';
import face_activation from '../icon/20px/face-activation.png';
import face_deactivation from '../icon/20px/face-deactivation.png';

import nature_activation from '../icon/20px/nature-activation.png';
import nature_deactivation from '../icon/20px/nature-deactivation.png';

import food_activation from '../icon/20px/food-activation.png';
import food_deactivation from '../icon/20px/food-deactivation.png';

import travel_activation from '../icon/20px/travel-activation.png';
import travel_deactivation from '../icon/20px/travel-deactivation.png';

import activity_activation from '../icon/20px/activity-activation.png';
import activity_deactivation from '../icon/20px/activity-deactivation.png';

import object_activation from '../icon/20px/object-activation.png';
import object_deactivation from '../icon/20px/object-deactivation.png';

import symbol_activation from '../icon/20px/symbol-activation.png';
import symbol_deactivation from '../icon/20px/symbol-deactivation.png';


import '../App.css';

function Emogi({setEmogiAdd}) {

  let emotion = ['😀', '😃', '😄','😁', '😆', '😅', '🤣', '😂', '🙂', '😉', '😊', '😚', '😙', '😏', '😋', '😛', '😜', '🤪', '😝', '🤗', '🤭','🤫','🤔','🤤','🤠','🥳','😎','🤓','🧐','🙃','🤐','🤨','😐','😑','😶','😒'];
  let nature = ['🐵','🐒','🦍','🦧','🐶','🐕','🦮','🐕‍🦺','🐩','🐺','🦊','🦝','🐱','🐈','🦁','🐯','🐅','🐆','🐴','🐎','🦄','🦓','🦌','🐮','🐂','🐃','🐄','🐷','🐖','🐗','🐽','🐏','🐑','🐐','🐪','🐫'];
  let food = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍊', '🍋', '🍍', '🥭', '🍑', '🍈', '🍆', '🥑', '🥒', '🥕', '🌽', '🥔', '🍠', '🍟', '🍕', '🌭', '🍔', '🍲', '🍛', '🍜', '🍝', '🍠', '🍣', '🍱', '🍤', '🍙', '🍚', '🍘', '🍥', '🍢', '🍡', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍮', '🍬', '🍭', '🍯'];
  let travel = ['🏝', '🏖', '🏜', '🏞', '🏟', '🏛', '🕌', '🕍', '⛪', '🛕', '🏰', '🏯', '🏟', '🛣', '🛤', '🚆', '🚊', '🚝', '🚄', '🚅', '🚈', '🚂', '🚃', '🚁', '✈️', '🛩', '🚀', '🛳', '🚢', '🚤', '⛴', '🛥', '🚉', '🚠', '🚡', '🚢'];
  let activity = ['🏅', '🥇', '🥈', '🥉', '🏆', '🏆', '🏅', '🥇', '🥈', '🥉', '🏆', '🏅', '🥇', '🥈', '🥉', '🏆', '🏅', '🥇', '🥈', '🥉', '🏆', '🏅', '🥇', '🥈', '🥉', '🏆', '🏅', '🥇', '🥈', '🥉', '🏆', '🏅', '🥇', '🥈', '🥉', '🏆', '🏅', '🥇', '🥈', '🥉', '🏆', '🏅', '🥇', '🥈', '🥉', '🏆', '🏅', '🥇', '🥈', '🥉'];
  let object = ['📱', '📲', '💻', '⌨️', '🖥', '🖨', '🖱', '🖲', '🕹', '🖥', '📺', '📻', '🎙', '🎚', '🎛', '🧭', '🧰', '🧲', '🔭', '🔬', '🔒', '🔓', '🔏', '🔐', '🔑', '🗝', '🛠', '⛏', '🔨', '🔧', '🔩', '⚙️', '🗜', '⚖️', '🔗', '🔒', '🔓', '🔏', '🔐', '🔑', '🗝', '🧰'];
  let symbol = ['♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⚛', '⚜', '⚧', '⚤', '⚩', '⚪', '⚫', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '🟤', '⚫', '⚪', '🔶', '🔷', '🔸', '🔹', '🔺', '🔻', '🔲', '🔳', '🔘', '🔗', '🔰', '🔱', '🔺', '🔻', '🟣', '🟠'];
  let [emogiList, setEmogiList] = useState(emotion);
  let [category, setCategory] = useState('표정')
  let [selectEmogi, setSelectEmogi] = useState('');

  return(
        <div className={styles.emogiMain}>
          <div className={styles.emogiIcon}>
            <img onClick={()=>{setEmogiList(emotion), setCategory('표정')}} src={category === '표정' ? face_activation :face_deactivation}/>{/*표정*/}
            <img onClick={()=>{setEmogiList(nature),  setCategory('자연')}} src={category === '자연' ? nature_activation :nature_deactivation}/>{/*자연물*/}
            <img onClick={()=>{setEmogiList(food),  setCategory('음식')}} src={category === '음식' ? food_activation :food_deactivation}/>{/*케이크뭐임?*/}
            <img onClick={()=>{setEmogiList(travel),  setCategory('여행')}} src={category === '여행' ? travel_activation :travel_deactivation}/>{/*차*/}
            <img onClick={()=>{setEmogiList(activity),  setCategory('활동')}} src={category === '활동' ? activity_activation :activity_deactivation}/>{/*구기종목*/}
            <img onClick={()=>{setEmogiList(object),  setCategory('물건')}} src={category === '물건' ? object_activation :object_deactivation}/>{/*띠용*/}
            <img onClick={()=>{setEmogiList(symbol),  setCategory('추상')}} src={category === '추상' ? symbol_activation :symbol_deactivation}/>{/*추상*/}  
            </div>
            <div>
            <p>{category}</p>
              <div className={styles.emogiArea}>
                {emogiList.map((emogiList, i)=>(
                  <div onClick={()=>setEmogiAdd(emogiList)} key={i} className={styles.emogi}>{emogiList}</div>))
                }
              </div>
            </div>
        </div>
    )
}


export default Emogi;
