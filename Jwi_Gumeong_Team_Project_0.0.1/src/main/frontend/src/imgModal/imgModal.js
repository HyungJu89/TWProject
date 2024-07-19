/* eslint-disable */
// ^워링 업애주는 친구

import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import styles from './style/imgModal.module.css';
import btn_image_Close from '../icon/btn/btn-image-Close.png';
import btn_image_Close_a from '../icon/btn/btn-image-Close-a.png';
import chevron_left_w from '../icon/40px/chevron-left-w.png';
import chevron_right_w from '../icon/40px/chevron-right-w.png';
import { useSelector, useDispatch } from 'react-redux';
import { openImgUiModalFalse } from '../slice/mainSlice';

function ImgUi(){
    let disPatch = useDispatch();
    let [btnHover, setBtnHover] = useState(btn_image_Close);
    return(
        <div className={styles.imgPopUp}>
            {/*닫기버튼*/}
            <img onClick={() => disPatch(openImgUiModalFalse())}
                onMouseEnter={() => setBtnHover(btn_image_Close_a)}
                onMouseLeave={() => setBtnHover(btn_image_Close)}
                className={styles.btnClose} src={btnHover} />
            {/*보이는 이미지*/}
            <div className={styles.mainImgShow}>
                <div className={styles.chevron_left_w}>
                <img style={{marginRight:'0px'}} src={chevron_left_w}/>
                </div>
                <div className={styles.mainImg}>
                <img 
                src='https://cdn.discordapp.com/attachments/1186577844755771465/1263754117571018873/image_2.png?ex=669b623d&is=669a10bd&hm=65cbc87a86a710cfeb01c4ca7ce74e82dbb838bfa0ff012eb4ef2973a3fe1971&' />
                </div>
                <div className={styles.chevron_right_w}>
                <img style={{marginLeft:'0px'}} src={chevron_right_w}/>
                </div>
            </div>
        </div>
    )
}

export default ImgUi;