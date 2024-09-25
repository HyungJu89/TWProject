/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback} from 'react';
import '../App.css';
import styles from './style/MiniPublicBoard.module.css';
import more from '../icon/24px/more.png';
import heart_deactivation from '../icon/24px/heart-deactivation.png';
import heart_activation from '../icon/24px/heart-activation.png';
import comments from '../icon/24px/comments.png';
import { useSelector, useDispatch } from 'react-redux';
import lodash from 'lodash';
import ChannelTitle from './PublicBoardComponents/ChannelTitle.js';
import Comments from './PublicBoardComponents/Comments.js';
import MoreDelete from './PublicBoardComponents/MoreDelete.js';
import { useNavigate } from 'react-router-dom';
import AlarmModal from '../modal/AlarmModal.js';
import { formatDistanceToNow } from 'date-fns'; // 아래와 같이 사용되는 날짜 라이브러리
import { ko } from 'date-fns/locale'; // 한국어 설정

function MiniPublicBoard() {
    let postInfo = useSelector((state)=>{ return state.postInfo })
    const [heart, setHeart] = useState(postInfo.like); //좋아요 누름 확인
    const [likeCount, setLikeCount] = useState(postInfo.likeCount);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate();
    const PublicBoardImgmodal = ('open'); //이미지 팝업 상태에 따른 신고,삭제 모달 위치 변환용

    const closeModal = () => {
        setModalOpen(false);
    };
    
    // 디바운스요 변수
    let [commentsON, setCommentsON] = useState(false); //댓글 on/off
    const [commentCount,setCommentCount] = useState(0);

    useEffect(() => {
        setCommentCount(postInfo.commentCount)
    }, [postInfo])

    // 디바운스 함수 생성
    const heartDebounce = useCallback(
        lodash.debounce(async(newHeart) => {
            await updateLike(newHeart);
        },500) // 0.5초 늘리고싶으면 시간 늘려도 됨
    ,[]
    );

    const updateLike = async(newHeart) => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if(!sessionIdJson){
                setModalContent('로그인 되어 있지 않습니다.');
                setModalOpen(true);
                return;
            //return alert('로그인되어있지않습니다.')
        }
        let sessionId = JSON.parse(sessionIdJson).sessionId

        const like = {
            like : newHeart,
            sessionId : sessionId,
            postKey: postInfo.postKey
        };
        try {
            const data = await axios.post(`/post/like`, like)

        } catch (error) {
            console.error('Error creating channel:', error);
        }
    }

    const likeOnClick = ()=>{
        const newHeart = !heart;
        setLikeCount((state) => newHeart ? state+1 : state-1 )
        setHeart(newHeart)
        heartDebounce(newHeart);
    }
    

    //모달함수
    let [moreON, setmoreON] = useState(false); //삭제,수정,신고 모달 on/off
    const modalRef = useRef(null);
    const moreRef = useRef(null);
    useEffect(() => {//영역외 클릭시 모달 닫히는 코드
        const handleClickOutside = (event) => {
            if (moreON &&
                !modalRef.current.contains(event.target) && !moreRef.current.contains(event.target)) { setmoreON(false); } //신고, 삭제 닫음
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => { //클린업
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [moreON]);

        //날짜 세팅
        function timeSetting(createdAt){
            return formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ko });
            //formatDistanceToNow : 특정 시간을 기준으로 현재까지의 시간을 계산
            //addSuffix : ~전 ~후 같은 접미사
        }

    return (
        <div className={styles.mainDiv}>
            {postInfo.postChannel && (
                <ChannelTitle postChannel={postInfo.postChannel} />
            )}
            <div className={styles.widthNav} style={{ marginTop: '0px' }}>
                <div className={styles.name}>{postInfo.nickName}<div className={styles.grayText}>· {timeSetting(postInfo.createdAt)}</div></div>
                <img ref={moreRef} onClick={() => { !moreON && setmoreON(true) }} src={more} />
                {moreON && <MoreDelete modalRef={modalRef} nickName={postInfo.nickName} referenceType={'post'} referenceKey={postInfo.postKey} right={'-0px'} top={'30px'} myContent={postInfo.myPost} />}
            </div>
            <div className={styles.contentArea}>{/* 본문 */}
                <div className={styles.text}>
                {postInfo.content}
                </div>
            </div>
            <div className={styles.widthNav} style={{ marginBottom: '0px' }}>{/* 하단 댓글,좋아요,공유 */}
            <div className={styles.commentsDiv}>
                    {/*댓글창*/}    <div onClick={() => { commentsON == false ? setCommentsON(true) : setCommentsON(false) }}>
                        <img src={comments} /><div className={styles.comments}>{commentCount}</div></div>
                    {/*좋아요*/}    <div onClick={()=>likeOnClick(heart)}>
                        {heart ? <img src={heart_activation} /> : <img src={heart_deactivation} />}
                        <div className={styles.comments}>{likeCount}</div>
                    </div>
                </div>
                {/* <img src={sharing} /> */} {/* 공유 아이콘 임시 숨기기 */}
            </div>
            {commentsON && <Comments postKey={postInfo.postKey} setCommentCount={setCommentCount} PublicBoardImgmodal={PublicBoardImgmodal} />}
            {modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    )
}
export default MiniPublicBoard;