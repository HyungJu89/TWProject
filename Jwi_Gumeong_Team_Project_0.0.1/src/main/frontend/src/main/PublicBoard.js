/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect} from 'react';
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
    let [moreON, setmoreON] = useState(false); //삭제,수정,신고 모달 on/off

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
            <ChannelTitle channel={channel} />
            <div className={styles.widthNav} style={{ marginTop: '0px' }}>
                <div className={styles.name}>작성자 이름 <div className={styles.grayText}>· 1일</div></div>
                <img onClick={() => { moreON == false ? setmoreON(true) : setmoreON(false) }} src={more} />
                {moreON && <MoreDelete />} {/*신고, 삭제 모달*/}
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
function ChannelTitle({ channel }) {
    return (
        <div>
            <div className={styles.title}> {/* 클릭시 URL 이동 */}
                <img src={channel.channelImageUrl} />{channel.channelName}
            </div>
            <div className={styles.dashed} />{/* 회색줄 */}
        </div>
    )
}

function Comments() {
    let [moreON, setmoreON] = useState(false); //정렬순서 모달 on/off    
    return (
        <div>
            <div className={styles.dashed} />{/* 회색줄 */}
            <div className={styles.widthNav} style={{ justifyContent: 'start' }}>
                <div style={{ cursor: 'pointer' }} onClick={() => { moreON == false ? setmoreON(true) : setmoreON(false) }} >
                    정렬순서<img style={{ marginLeft: '4px' }} src={expand_more} />
                    {moreON && <MoreAlign />} {/*신고, 삭제 모달*/}
                </div>
            </div>
            <div className={styles.commentDiv}>{/* 댓글 달기 */}
                <textarea placeholder='댓글 달기' />
                <div className={styles.commentNav}>
                    <img style={{ cursor: 'pointer' }} src={emoticon_deactivation} />
                    <div>0/200<button>등록</button></div>
                </div>
            </div>
            <CommentsList/>
            <BigCommentsList/>
        </div>
    )
}
function CommentsList() {
    let [commentMoreON, setCommentmoreON] = useState(false); //삭제,수정,신고 모달 on/off    
    const modalRef = useRef();

    const handleClickOutside = (event) => {// 모달 창 외부를 클릭했을 때 모달 창을 닫기 위한 이벤트 핸들러
         // modalRef.current가 유효하고, 이벤트가 발생한 타겟이 모달 창을 포함하지 않는 경우
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setCommentmoreON(false); // 모달 창을 닫음
        }
    };
    useEffect(() => {// 컴포넌트가 마운트될 때 이벤트 리스너를 추가하고 언마운트될 때 제거하는 useEffect 훅
        document.addEventListener('mousedown', handleClickOutside); // mousedown 발생>handleClickOutside 함수가 실행됨
        return () => {// 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
            document.removeEventListener('mousedown', handleClickOutside);
        };}, []);
    return (
        <div>
            {/* 댓글 */}
            <div className={styles.list}>
                <div className={styles.listNav}>
                    <div className={styles.listName}>닉네임<div className={styles.time}>4시간</div></div>
                    <div>
                    <img onClick={() => { commentMoreON == false ? setCommentmoreON(true) : setCommentmoreON(false) }} className={styles.moreImg} src={more} /> {/* 신고삭제 모달 연결 해야함 */}
                    {commentMoreON && <div ref={modalRef}><MoreDeleteMini/></div>} {/*신고, 삭제 모달*/}
                    </div>
                </div>
                <div className={styles.listContent}>진짜ㅠ 너무 걱정했는데 잘 됬더라구요ㅠ</div>
            </div>
        </div>
    )
}
function BigCommentsList() {
    let [commentMoreON, setCommentmoreON] = useState(false); //삭제,수정,신고 모달 on/off 
    const modalRef = useRef();

    const handleClickOutside = (event) => {// 모달 창 외부를 클릭했을 때 모달 창을 닫기 위한 이벤트 핸들러
         // modalRef.current가 유효하고, 이벤트가 발생한 타겟이 모달 창을 포함하지 않는 경우
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setCommentmoreON(false); // 모달 창을 닫음
        }
    };
    useEffect(() => {// 컴포넌트가 마운트될 때 이벤트 리스너를 추가하고 언마운트될 때 제거하는 useEffect 훅
        document.addEventListener('mousedown', handleClickOutside); // mousedown 발생>handleClickOutside 함수가 실행됨
        return () => {// 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
            document.removeEventListener('mousedown', handleClickOutside);
        };}, []);   
    return (
        <div>
            {/* 대댓글 */}
            <div className={styles.bigComments}>
                <img className={styles.BcImg} src={big_comment} />
                <div className={styles.list}>
                    <div className={styles.listNav}>
                        <div className={styles.listName}>닉네임<div className={styles.time}>4시간</div></div>
                        <div><img onClick={() => { commentMoreON == false ? setCommentmoreON(true) : setCommentmoreON(false) }} className={styles.moreImg} src={more} /> {/* 신고삭제 모달 연결 해야함 */}
                        {commentMoreON && <div ref={modalRef}><MoreDeleteMini/></div>}</div> {/*신고, 삭제 모달*/}
                    </div>
                    <div className={styles.listContent}>어쩌구 저쩌구 이래구 저래구 ^^</div>
                </div>
            </div>
        </div>
    )
}
function MoreDelete() {
    let [deleteWrote, setDeleteWrote] = useState(true) //★내가 쓴 글이면 활성화 코드 추가★
    return (
        <div  className={styles.moreUi} style={{right:'-82px',top:'30px'}}>
            {deleteWrote == true ?
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className={styles.text}>수정하기</div>
                    <div className={styles.text}>삭제하기</div>
                </div>
                :
                <div className={styles.text}>신고하기</div>}
        </div>
    )
}
function MoreDeleteMini() {
    let [deleteWrote, setDeleteWrote] = useState(true) //★내가 쓴 댓글이면 활성화 코드 추가★
    return (
        <div  className={styles.moreUi} style={{right:'-90px',top:'24px'}}>
            {deleteWrote == true ?
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className={styles.text}>수정하기</div>
                    <div className={styles.text}>삭제하기</div>
                </div>
                :
                <div className={styles.text}>신고하기</div>}
        </div>
    )
}
function MoreAlign() {
    return (
    <div className={styles.moreUi}style={{left:'60px',top:'30px'}}>
        <div className={styles.text}>최신순</div>
        <div className={styles.text}>과거순</div>
    </div>
    )
}

export default PublicBoard;