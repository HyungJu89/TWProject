/* eslint-disable */
// ^워링 업애주는 친구
import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../App.css';
import styles from './style/PublicBoard.module.css';
import more from '../icon/24px/more.png';
import heart_deactivation from '../icon/24px/heart-deactivation.png';
import heart_activation from '../icon/24px/heart-activation.png';
import comments from '../icon/24px/comments.png';
import { useSelector, useDispatch } from 'react-redux';
import { openImgUiModal } from '../slice/mainSlice';
import lodash from 'lodash';
import { changePost } from '../slice/PostSlice.js';
import Comments from './PublicBoardComponents/Comments.js';
import MoreDelete from './PublicBoardComponents/MoreDelete.js';
import ChannelTitle from './PublicBoardComponents/ChannelTitle.js';
import { useNavigate } from 'react-router-dom';
import AlarmModal from '../modal/AlarmModal.js';
import { formatDistanceToNow } from 'date-fns'; // 아래와 같이 사용되는 날짜 라이브러리
import { ko } from 'date-fns/locale'; // 한국어 설정

function PublicBoard({ postInfo,index }) {
    let disPatch = useDispatch();
    const [heart, setHeart] = useState(false); //좋아요 누름 확인
    const [likeCount, setLikeCount] = useState(0);
    // 디바운스요 변수
    let [commentsON, setCommentsON] = useState(false); //댓글 on/off
    //이미지
    let [imgBeing, setImgBeing] = useState([]);// 이미지가 존재하는지 검사
    let [imgCount, setImgCount] = useState('');// ★ 이미지 hover 갯수 임시 변수
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate();

    const closeModal = () => {
        setModalOpen(false);
        navigate('/signIn');
        window.scrollTo(0, 0);
    };

    const [commentCount, setCommentCount] = useState(0);

    useEffect(() => {
        if (postInfo.image) {
            setImgBeing(JSON.parse(postInfo.image));
        }
        setCommentCount(postInfo.commentCount)
        setHeart(postInfo.like)
        setLikeCount(postInfo.likeCount)
        setCommentsON(false)
    }, [postInfo])

    // 디바운스 함수 생성
    const heartDebounce = useCallback(
        lodash.debounce(async (newHeart) => {
            await updateLike(newHeart);
        }, 500) // 0.5초 늘리고싶으면 시간 늘려도 됨
        , []
    );

    const updateLike = async(newHeart) => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if(!sessionIdJson){
            setModalContent('로그인 되어 있지 않습니다.');
            setModalOpen(true);
            return;
        }
        let sessionId = JSON.parse(sessionIdJson).sessionId

        const like = {
            like: newHeart,
            sessionId: sessionId,
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
        let sessionIdJson = sessionStorage.getItem('sessionId');
                if(!sessionIdJson){
            setModalContent('로그인 되어 있지 않습니다.');
            setModalOpen(true);
            return;
        }
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

    const imgOnclick = () => {
        const { image, ...newPostInfo } = postInfo;
        const updatePostInfo = { ...newPostInfo, image: imgBeing }
        disPatch(changePost(updatePostInfo))
        disPatch(openImgUiModal())
    }

    //날짜 세팅
    function timeSetting(createdAt){
        return formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ko });
        //formatDistanceToNow : 특정 시간을 기준으로 현재까지의 시간을 계산
        //addSuffix : ~전 ~후 같은 접미사
    }

    return (
        <div className={('fadein', styles.mainDiv)} style={{ zIndex: -Number(index) }}>
            {postInfo.postChannel && (
                <ChannelTitle postChannel={postInfo.postChannel} />
            )}
            <div className={styles.widthNav} style={{ marginTop: '0px' }}>
                <div className={styles.name}>{postInfo.nickName}<div className={styles.grayText}>· {timeSetting(postInfo.createdAt)}</div></div>
                <img ref={moreRef} onClick={() => { !moreON && setmoreON(true) }} src={more} />
                {moreON && <MoreDelete state = {postInfo.state} modalRef={modalRef} nickName={postInfo.nickName} referenceType={'post'} referenceKey={postInfo.postKey} right={'-82px'} top={'30px'} myContent={postInfo.myPost} />} {/*신고, 삭제 모달*/}
            </div>
            <div className={styles.contentArea}>{/* 본문 */}
                {imgBeing.length > 0 ?
                <>
                    <div className={styles.text}>
                    {postInfo.content}
                    </div>
                    <div onClick={imgOnclick} className={styles.imgClick}>{/* 이미지 */}
                        <div className={styles.imgArea}>
                            <img src={`http://localhost:9090/images/${imgBeing[0]}`} />
                            {imgBeing.length > 0 &&
                                <div onMouseEnter={() => { setImgCount("+" + imgBeing.length) }} onMouseLeave={() => { setImgCount('') }} className={styles.imgArea}>
                                    {imgCount}
                                </div>}
                        </div>
                    </div>
                </>:
                    <>
                    <div className={styles.text2}>
                    {postInfo.content}
                    </div>
                    </>
                }
            </div>
            <div className={styles.widthNav} style={{ marginBottom: '0px' }}>{/* 하단 댓글,좋아요,공유 */}
                <div className={styles.commentsDiv}>
                    {/*댓글창*/}    <div onClick={() => { commentsON == false ? setCommentsON(true) : setCommentsON(false) }}>
                        <img src={comments} /><div className={styles.comments}>{commentCount}</div></div>
                    {/*좋아요*/}    <div onClick={() => likeOnClick(heart)}>
                        {heart ? <img src={heart_activation} /> : <img src={heart_deactivation} />}
                        <div className={styles.comments}>{likeCount}</div>
                    </div>
                </div>
                {/* <img src={sharing} /> */} {/* 공유 아이콘 임시 숨기기 */}
            </div>
            {commentsON && <Comments postKey={postInfo.postKey} setCommentCount={setCommentCount} />}
            {modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    )
}
export default PublicBoard;