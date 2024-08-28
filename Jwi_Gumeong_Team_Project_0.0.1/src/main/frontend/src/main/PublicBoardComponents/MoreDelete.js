/* eslint-disable */
// ^워링 업애주는 친구
import '../../App.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../style/MiniPublicBoard.module.css';
import { reportInfo } from '../../slice/ReportDtoSlice.js';
import { openModal } from '../../slice/ReportModalSlice.js';

function MoreDelete({ nickName, referenceType, referenceKey, modalRef, right, top, myContent }) {
    const dispatch = useDispatch()

    const reportOnClick = () => {
        dispatch(reportInfo({
            nickName: nickName,
            referenceType: referenceType,
            referenceKey: referenceKey
        }))
        dispatch(openModal())

    }
    return (
        <div ref={modalRef} className={styles.moreUi} style={{ right: right, top: top }}>
            {myContent ?
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <div className={styles.text}>수정하기</div> */}
                    <div className={styles.text}>삭제하기</div>
                </div>
                :
                <div className={styles.text} onClick={reportOnClick}>신고하기</div>}
        </div>
    )
}


export default MoreDelete;