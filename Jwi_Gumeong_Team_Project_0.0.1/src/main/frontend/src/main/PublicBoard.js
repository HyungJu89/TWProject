/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import '../App.css';
import styles from './style/PublicBoard.module.css';
import more from '../icon/24px/more.png';
import heart_deactivation from '../icon/24px/heart-deactivation.png';
import heart_activation from '../icon/24px/heart-activation.png';
import comments from '../icon/24px/comments.png';
import sharing from '../icon/24px/sharing.png';
import expand_more from '../icon/24px/expand-more.png';
import emoticon_deactivation from '../icon/24px/emoticon-deactivation.png';
import big_comment from '../icon/20px/bigcomment.png';

function PublicBoard() {
    let [heart, setHeart] = useState(true); //좋아요 누름 확인
    let [commentsON, setCommentsON] = useState(false); //댓글 on/off

    const [channel, setChannel] = useState('');
    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useQuery('channel', () =>
        axios.get(`/channelRest/search/123123`)
            .then((response) => {
                setChannel(response.data.content)
                return response.data.content
            })
            .catch(error => {
                console.error('Channel API Error:', error);
                throw error;
            }),
    );
    if (isLoadingChannel) {
        return <div>로딩중</div>;
    }
    if (isErrorChannel) {
        return <div>에러남</div>;
    }

    return (
        <div className={styles.mainDiv}>
            <div className={styles.title}> {/* 클릭시 URL 이동 */}
                <img src={channel.channelImageUrl} />{channel.channelName}
            </div>
            <div className={styles.dashed} />{/* 회색줄 */}
            <div className={styles.widthNav}>
                <div className={styles.name}>작성자 이름 <div className={styles.grayText}>· 1일</div></div>
                <img src={more} /> {/* 신고삭제 모달 연결 해야함 */}
            </div>
            <div className={styles.contentArea}>{/* 본문 */}
                <div className={styles.text}>
                    뉴비라 오늘 조합 검사 받았는데. 진짜 할거 많더라.<br />
                    피드백 많이 해주셔서 원신 할거 겁나 많이 생김<br />
                    우리 백출.. 잘 키워야지
                </div>
                <img src='https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5367703706/B.jpg?675000000' />
            </div>
            <div className={styles.widthNav} style={{ marginBottom: '0px' }}>{/* 하단 댓글,좋아요,공유 */}
                <div className={styles.commentsDiv}>
                    {/*댓글창*/}    <div onClick={() => { commentsON == false ? setCommentsON(true) : setCommentsON(false) }}>
                        <img src={comments} /><div className={styles.comments}>123</div></div>
                    {/*좋아요*/}    <div onClick={() => { heart == false ? setHeart(true) : setHeart(false) }}>
                        {heart === true ? <img src={heart_activation} /> : <img src={heart_deactivation} />}
                        <div className={styles.comments}>123123</div>
                    </div>
                </div>
                <img src={sharing} />
            </div>
            {commentsON && <Comments />}
        </div>
    )
}

function Comments() {
    return (
        <div>
            <div className={styles.dashed} />{/* 회색줄 */}
            <div className={styles.widthNav} style={{ justifyContent: 'start', cursor: 'pointer' }}>정렬순서<img style={{ marginLeft: '4px' }} src={expand_more} /></div>
            <div className={styles.commentDiv}>{/* 댓글 달기 */}
                <textarea placeholder='댓글 달기' />
                <div className={styles.commentNav}>
                    <img style={{ cursor: 'pointer' }} src={emoticon_deactivation} />
                    <div>0/200<button>등록</button></div>
                </div>
            </div>
            {/* 댓글 */}
            <div className={styles.list}>
                <div className={styles.listNav}>
                    <div className={styles.listName}>닉네임<div className={styles.time}>4시간</div></div>
                    <img style={{cursor:'pointer'}} src={more} /> {/* 신고삭제 모달 연결 해야함 */}
                </div>
                <div className={styles.listContent}>진짜ㅠ 너무 걱정했는데 잘 됬더라구요ㅠ</div>
            </div>
            {/* 대댓글 */}
            <div className={styles.bigComments}>
            <img className={styles.BcImg} src={big_comment} /> 
                <div className={styles.list}>
                    <div className={styles.listNav}>
                        <div className={styles.listName}>닉네임<div className={styles.time}>4시간</div></div>
                        <img src={more} /> {/* 신고삭제 모달 연결 해야함 */}
                    </div>
                    <div className={styles.listContent}>어쩌구 저쩌구 이래구 저래구 ^^</div>
                </div>
            </div>
        </div>
    )
}

export default PublicBoard;