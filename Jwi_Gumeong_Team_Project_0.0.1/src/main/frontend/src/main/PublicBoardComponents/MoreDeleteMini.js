/* eslint-disable */
// ^워링 업애주는 친구
import '../../App.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../style/MiniPublicBoard.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../slice/ReportModalSlice.js'
import { reportInfo } from '../../slice/ReportDtoSlice.js';
import {delectByUser} from '../../recycleCode/delectByUser.js'
import AlarmModal from '../../modal/AlarmModal.js';

function MoreDeleteMini({ setCommentLode,state,nickName, referenceType, referenceKey, myContent, right, top }) {
    const [modalContent, setModalContent] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => {
        setModalOpen(false);
    };
    const dispatch = useDispatch()

    const reportOnClick = () => {
        dispatch(
            reportInfo({
                nickName: nickName,
                referenceType: referenceType,
                referenceKey: referenceKey
            })
        )
        dispatch(openModal())
    }

    const delectOnClick = () => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if(!sessionIdJson){
            setModalContent('로그인 되어 있지 않습니다.');
            setModalOpen(true);
            return;
        }
        

        if(state != "common"){
            setModalContent('삭제된 댓글입니다..');
            setModalOpen(true); 
            return; 
        }
        delectByUser(referenceType,referenceKey)
        setCommentLode((state) => state ? false : true)
    }

    return (
        <div className={styles.moreUi} style={{ right: right, top: top }}>
            {myContent ?
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className={styles.text} onClick={delectOnClick}>삭제하기</div>
                </div>
                :
                <div className={styles.text} onClick={reportOnClick}>신고하기</div>}
            {modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    )
}

export default MoreDeleteMini;