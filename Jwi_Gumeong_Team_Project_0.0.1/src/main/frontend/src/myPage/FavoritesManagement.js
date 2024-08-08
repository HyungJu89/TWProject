import React, { useEffect, useState } from 'react';
import styles from './style/FavoritesManagement.module.css';
import List from '../icon/24px/List.png';
import Star from '../icon/20px/bookmark-deactivation.png';
import Left from '../icon/btn/btn-left.png';
import Right from '../icon/btn/btn-right.png';
import { useQuery } from 'react-query';
import PublicBoard from '../main/PublicBoard.js';
import Paging from '../Paging/Paging.js'
import axios from 'axios';
import BookmarkButton from '../channel/BookmarkButton.js'

//즐겨찾기 관리페이지
function FavoritesManagement() {
    const formatUnit = (number) => {
        let unit = ['만', '천']
        let num = [10000, 1000]


        if (number / num[0] >= 1) {
            let int = Math.floor(number / num[1]);

            return Math.floor(int / 10) + unit[0] + Math.floor(int % 10) + unit[1]
        }
        if (number / num[1] >= 1) {
            return Math.floor(number / num[1]) + unit[1];
        }
        return number
    }
    return (
        <div className={styles.MyPageContainer}>
            <div className={styles.formGroup}>
                <img src={List} />
                <div className={styles.title}> {/* 클릭시 URL 이동 */}
                    <img src='https://nng-phinf.pstatic.net/MjAyMzEyMjBfNDkg/MDAxNzAzMDU1NjA1MTY2.bCUbi8bRvnKsF6Gmw_EIPrll1fPYTkJzTDo243vchEEg.JIYN6Ve8RVWFNqjdiwrEImVAAK4s-bNrJRRGA0ikM8sg.JPEG/%EA%B7%B8%EC%9C%BD.jpg?type=f120_120_na' />
                </div>
                <div className={styles.streammerInfo} style={{ cursor: 'pointer' }}>
                    <div className={styles.channelName}>채널명 DB에서떼오기</div>
                    <div className={styles.follower}>
                        <div className={styles.markText}>팔로워</div>
                        <div className={styles.markCount}> {formatUnit(142400)}</div>
                        <div className={styles.markText}>즐겨찾기</div>
                        <div className={styles.markCount}> 10000만</div>
                    </div>
                </div>
                <div className={styles.bookMark}>
                    <BookmarkButton />
                </div>
            </div>
            <hr className={styles.horizontalLine} />
            <div className={styles.Paging}>
                <div className={styles.PagingNum} style={{ marginTop: '30px' }}><img src={Left} /><div>1/5</div><img src={Right} /></div>
            </div>
        </div>
    )
}

export default FavoritesManagement;