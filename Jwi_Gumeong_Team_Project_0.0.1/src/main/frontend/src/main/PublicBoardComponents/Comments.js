/* eslint-disable */
// ^워링 업애주는 친구
import '../../App.css';
import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/PublicBoard.module.css';
import Emogi from '../../Emogi/Emogi.js';
import expand_more from '../../icon/24px/expand-more.png';
import emoticon_deactivation from '../../icon/24px/emoticon-deactivation.png';
import CommentsList from './CommentsList.js';
import MoreAlign from '../PublicBoardComponents/MoreAlign.js';
import { reportInfo } from '../../slice/ReportDtoSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { openImgUiModalFalse } from '../../slice/mainSlice';
import { clearPost } from '../../slice/PostSlice.js';
import AlarmModal from '../../modal/AlarmModal.js';

function Comments({ postKey, setCommentCount, PublicBoardImgmodal }) {
    let [emogiAddText, setEmogiAddText] = useState('')// 텍스트
    // 컴포넌트 로드용 함수
    const [commentLode, setCommentLode] = useState(true);
    let [comments, setComments] = useState([]);
    const textareaRef = useRef(null); //
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate();
    let disPatch = useDispatch();

    const closeModal = () => {
        setModalOpen(false);
        disPatch(clearPost())
        disPatch(openImgUiModalFalse())
        navigate('/signIn');
        window.scrollTo(0, 0);
    };

    //댓글 길이 제한
    const commentsLimit = 200;
    //댓글작성 내용
    const [comment, setComment] = useState('');
    //댓글 길이 저장
    const [commentLength, setCommentLength] = useState(0);
    //댓글작성 버튼 색상
    const [commentButtonColor, setCommentButtonColor] = useState('#FF8901');
    //댓글 길이 text 색상
    const [commentTextColor, setCommentTextColor] = useState('#BBBBBB');
    //댓글 정렬순서
    const [isAsc, setIsAsc] = useState(true);
    //댓글 포커스
    const commentFocus = useRef(null);
    const [commentStart, setCommentStart] = useState(0);
    const [commentNew, setCommentNew] = useState(false);

    const [replyInputState, setReplyInputState] = useState('');
    const [replyInputIndex, setReplyInputIndex] = useState(0);

    // 이모지 삽입 함수
    let [EmojiOn, setEmojiOn] = useState(false);//이모지 모달 on/off
    let [emogiAdd, setEmogiAdd] = useState('')// 새로운 이모지
    const insertEmogiAtCursor = (emoji) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;//선택된 텍스트의 시작 위치 또는 커서의 위치
        const end = textarea.selectionEnd;//선택된 텍스트의 마지막
        const value = textarea.value;// textarea의 현재 값을 가져옴
        // 현재 커서 위치 기준으로 텍스트를 나누고 이모지 삽입
        const newValue = value.slice(0, start) + emoji + value.slice(end);
        // 텍스트를 업데이트하고 커서를 이모지 뒤에 위치시킴
        textarea.value = newValue;
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        // 커서 위치 유지
        textarea.focus();
    };
    useEffect(() => { //이모지 함수 실행
        if (emogiAdd) {
            insertEmogiAtCursor(emogiAdd);
            setEmogiAdd(''); // 이모지 추가 후 초기화
        }
    }, [emogiAdd]);
    const handleInput = (e) => {//스크롤 늘어나게
        const textarea = textareaRef.current;

        if (textarea) {
            // text 가 지워질때 높이를 초기화해주기위해
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
        setComment(e.target.value)
        setCommentLength(e.target.value.length)
        setCommentButtonColor(e.target.value.length <= commentsLimit ? '#FF8901' : '#BBBBBB')
        setCommentTextColor(e.target.value.length <= commentsLimit ? '#BBBBBB' : '#EC000E')
    };

    //모달함수
    let [moreON, setmoreON] = useState(false); //정렬순서 모달 on/off   
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


    //댓글 작성 
    const createComment = async () => {
        if (commentsLimit < commentLength) {
            return alert('너무 김');
        }
        // 추가로 로직필요하면 여기에
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if(!sessionIdJson){
            setModalContent('로그인 되어 있지 않습니다.');
            setModalOpen(true);
            return;
        }
        let sessionId = JSON.parse(sessionIdJson).sessionId
        const commentCreate = {
            sessionId : sessionId,
            postKey: postKey,
            comment: comment
        };
        try {
            const { data } = await axios.post(`/comment/create`, commentCreate)
            setCommentStart(commentStart+1); //댓글 작성시에만 포커스 되도록 하는 함수
            setCommentNew(true);
            if (!data.success) {
                alert("오류가남")
            }
        } catch (error) {
            console.error('Error creating channel:', error);
        }
        setComment('');
        setCommentLode((state) => state ? false : true)
    }

    const fetchData = async () => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null;
        if (sessionIdJson) {
            sessionId = JSON.parse(sessionIdJson).sessionId
        }
        try {
            const { data } = await axios.get(`/comment/select`, {
                params: {
                    sessionId: sessionId,
                    postKey: postKey,
                    isAsc: isAsc
                }
            });
            setComments(data);
            if (data.success) {
                setCommentCount(data.info.commentCount);
            }
        } catch (error) {
            console.error('Channel API Error:', error);
        }
    };

    //댓글 불러오기
    useEffect(() => {
        fetchData()
    }, [commentLode, isAsc])

    const replyOnclick = (state, index) => {
        setReplyInputState(state)
        setReplyInputIndex(index)
    }

    const onClear = () => {
        setReplyInputState('')
        setReplyInputIndex(0)
    }

    //댓글 작성후 화면 포커스
    useEffect(() => {
        if (commentFocus.current && commentNew) {
            commentFocus.current.scrollIntoView({
                behavior: 'smooth', //부드럽게 움직이기
                block: 'center'  // 중앙
            });
            setCommentNew(false);
            commentFocus.current.focus();
        }
    }, [commentStart]);
    return (
        <div>
            <div className={styles.dashed} />{/* 회색줄 */}
            <div className={styles.widthNav} style={{ justifyContent: 'start' }}>
                <div ref={moreRef} style={{ cursor: 'pointer' }} onClick={() => { !moreON && setmoreON(true) }} >
                    정렬순서<img style={{ marginLeft: '4px' }} src={expand_more} />
                    {moreON && <div ref={modalRef}><MoreAlign setIsAsc={setIsAsc} /></div>} {/*정렬 모달*/}
                </div>
            </div>
            <div className={styles.commentDiv}>{/* 댓글 달기 */}
                <textarea
                    value={comment}
                    className={styles.textarea}
                    ref={textareaRef}
                    placeholder='댓글 달기'
                    onInput={handleInput}
                />
                <div className={styles.commentNav}>
                    <img onClick={() => { EmojiOn == true ? setEmojiOn(false) : setEmojiOn(true) }} style={{ cursor: 'pointer' }} src={emoticon_deactivation} />
                    {EmojiOn && <Emogi setEmogiAdd={setEmogiAdd} />}
                    <div style={{ color: commentTextColor }}>
                        {commentLength}/{commentsLimit}
                        <button style={{ backgroundColor: commentButtonColor }} onClick={createComment}>등록</button>{/*기본 댓글 등록*/}
                    </div>
                </div>
            </div>
            {comments.success &&
                <>
                    {comments.info.comment.map((comment, index) => {
                        return (
                            <div key={comment.commentKey}>
                                <CommentsList
                                    index={index}
                                    postKey={postKey}
                                    comment={comment}
                                    setCommentLode={setCommentLode}
                                    replyOnclick={replyOnclick}
                                    onClear={onClear}
                                    replyInputState={replyInputState}
                                    replyInputIndex={replyInputIndex}
                                    ref={index === comments.info.comment.length-1 ? commentFocus : null}
                                    setCommentStart={setCommentStart}
                                    commentStart={commentStart}
                                    PublicBoardImgmodal={PublicBoardImgmodal ? PublicBoardImgmodal : null}
                                />
                            </div>
                        );
                    })}
                </>
            }
                {modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    )
}
function CommentsZero(){
    return(
        <div className={styles.CommentsZero}>
            댓글이 없어요.
        </div>
    )
}
export default Comments;