/* eslint-disable */
// ^워링 업애주는 친구

import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import styles from './style/imgModal.module.css';
import MiniPublicBoard from '../main/MiniPublicBoard.js';
import btn_image_Close from '../icon/btn/btn-image-Close.png';
import btn_image_Close_a from '../icon/btn/btn-image-Close-a.png';
import btn_content_close from '../icon/btn/btn-content-close.png';
import btn_content_open from '../icon/btn/btn-content-open.png';
import chevron_left_w from '../icon/40px/chevron-left-w.png';
import chevron_right_w from '../icon/40px/chevron-right-w.png';
import { useDispatch } from 'react-redux';
import { openImgUiModalFalse } from '../slice/mainSlice';

function ImgUi(){
    // 여기에 postInfo와 댓글, 좋아요 등을 전부 다 불러와야함? 어캐함? ㄹㅇㅋㅋ
    let disPatch = useDispatch();
    let [btnHover, setBtnHover] = useState(btn_image_Close);
    let [content, setContent] = useState(false);
    return(
        <div className={styles.imgPopUp}>
            {/*닫기버튼*/}
            <img onClick={() => disPatch(openImgUiModalFalse())}
                onMouseEnter={() => setBtnHover(btn_image_Close_a)}
                onMouseLeave={() => setBtnHover(btn_image_Close)}
                className={styles.btnClose} src={btnHover} />
            {/*보이는 이미지*/}
            <div className={styles.moveDiv}>
            <div className={styles.moveDivWidth100}>
            <div className={styles.mainImgShow}>
                <div className={styles.chevron}>
                    <img style={{ marginRight: '0px' }} src={chevron_left_w} />
                </div>
                <div className={styles.mainImg}>
                    <img
                        // src='https://cdn1.epicgames.com/offer/879b0d8776ab46a59a129983ba78f0ce/PortraitProductImage-KOR_1200x1600-0379125a5dee5bbda79bf68aaac62146' />
                        src='https://images.ctfassets.net/vfkpgemp7ek3/2faNVDHi2juX0zx8rhwZ5g/8ac2c96bf24d987639901164291c9436/Cover_Image.jpg' />
                </div>
                <div className={styles.chevron}>
                    <img style={{ marginLeft: '0px' }} src={chevron_right_w} />
                </div>
            </div>
            </div>
            <div className={styles.mainContent}>
                <div onClick={()=>{content== true ? setContent(false):setContent(true)}} className={styles.btn_contentA}>
                </div>
                {content == true ? null:
                <div className={styles.fadeOut}>
                <div className={styles.move}>
                    <Content content={content} setContent={setContent}/>
                    </div>
                </div>}
                { content && <div className={styles.fadeIn}><Content content={content} setContent={setContent}/></div>}
            </div>
            </div>
        </div>
    )
}
function Content({setContent,content}){
    return(
        <div className={styles.mainContent}>
        <div onClick={()=>{content== true ? setContent(false):setContent(true)}} className={styles.btn_content}>
        {content == true ? <img src={btn_content_close}/>:<img src={btn_content_open}/>}
        </div>
        <div className={styles.mainArea}>
        <MiniPublicBoard/>
        </div>
        </div>
    )
}
export default ImgUi;