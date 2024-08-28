/* eslint-disable */
// ^워링 업애주는 친구
import '../../App.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../style/MiniPublicBoard.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../slice/ReportModalSlice.js'
import { reportInfo } from '../../slice/ReportDtoSlice.js';

function MoreDeleteMini({ nickName, referenceType, referenceKey, myContent }) {

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

    return (
        <div className={styles.moreUi} style={{ right: '-90px', top: '24px' }}>
            {myContent ?
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className={styles.text}>삭제하기</div>
                </div>
                :
                <div className={styles.text} onClick={reportOnClick}>신고하기</div>}
        </div>
    )
}


export default MoreDeleteMini;