/* eslint-disable */
// ^워링 업애주는 친구

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
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
import { useSelector, useDispatch } from 'react-redux';
import { openImgUiModal } from '../slice/mainSlice';
import Emogi from '../Emogi/Emogi.js';


function PublicBoard({ postInfo }) {
    let [heart, setHeart] = useState(true); //좋아요 누름 확인
    let [commentsON, setCommentsON] = useState(false); //댓글 on/off
    //이미지
    let [imgBeing, setImgBeing] = useState([]);// 이미지가 존재하는지 검사
    let [imgCount, setImgCount] = useState('');// ★ 이미지 hover 갯수 임시 변수

    let state = useSelector((state) => { return state });
    let disPatch = useDispatch();

    useEffect(() => {
        setHeart(postInfo.isLike)
        if (postInfo.image) {
            setImgBeing(JSON.parse(postInfo.image));
        }
    }, [])

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

    return (
        <div className={styles.mainDiv}>
            {postInfo.postChannel && (
                <ChannelTitle postChannel={postInfo.postChannel} />
            )}
            <div className={styles.widthNav} style={{ marginTop: '0px' }}>
                <div className={styles.name}>{postInfo.nickName}<div className={styles.grayText}>· 1일</div></div>
                <img ref={moreRef} onClick={() => { !moreON && setmoreON(true) }} src={more} />
                {moreON && <MoreDelete modalRef={modalRef} postInfo={postInfo} right={'-82px'} top={'30px'} />} {/*신고, 삭제 모달*/}
            </div>
            <div className={styles.contentArea}>{/* 본문 */}
                <div className={styles.text}>
                    {postInfo.content}
                </div>
                {imgBeing.length > 0 &&
                    <div onClick={() => disPatch(openImgUiModal())} className={styles.imgClick}>{/* 이미지 */}
                        <div className={styles.imgArea}>
                            <img src={`http://localhost:9090/images/${imgBeing[0]}`} />
                            {imgBeing.length > 0 &&
                                <div onMouseEnter={() => { setImgCount("+" + imgBeing.length) }} onMouseLeave={() => { setImgCount('') }} className={styles.imgArea}>
                                    {imgCount}
                                </div>}
                        </div>
                    </div>
                }
            </div>
            <div className={styles.widthNav} style={{ marginBottom: '0px' }}>{/* 하단 댓글,좋아요,공유 */}
                <div className={styles.commentsDiv}>
                    {/*댓글창*/}    <div onClick={() => { commentsON == false ? setCommentsON(true) : setCommentsON(false) }}>
                        <img src={comments} /><div className={styles.comments}>{postInfo.commentCount}</div></div>
                    {/*좋아요*/}    <div onClick={() => { heart == false ? setHeart(true) : setHeart(false) }}>
                        {heart ? <img src={heart_activation} /> : <img src={heart_deactivation} />}
                        <div className={styles.comments}>{postInfo.likeCount}</div>
                    </div>
                </div>
                {/* <img src={sharing} /> */} {/* 공유 아이콘 임시 숨기기 */}
            </div>
            {commentsON && <Comments postKey={postInfo.postKey} />}
        </div>
    )
}
function ChannelTitle({ postChannel }) {
    let navigate = useNavigate();
    return (
        <div onClick={() => { navigate(`/channel/${postChannel.id}`) }}>
            <div className={styles.title}> {/* 클릭시 URL 이동 */}
                <img src={postChannel.imageUrl} /><div style={{ cursor: 'pointer' }}>{postChannel.name}</div>
            </div>
            <div className={styles.dashed} />{/* 회색줄 */}
        </div>
    )
}

function Comments({postKey}) {
    let [EmojiOn, setEmojiOn] = useState(false);//이모지 모달 on/off
    let [emogiAdd, setEmogiAdd] = useState('')// 새로운 이모지
    let [emogiAddText, setEmogiAddText] = useState('')// 텍스트
    // 컴포넌트 로드용 함수
    const [commentLode, setCommentLode] = useState(true);
    let [comments, setComments] = useState([]);

    const textareaRef = useRef(null); //

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
    const [isAsc,setIsAsc] = useState(true);

    // 이모지 삽입 함수
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
        const commentCreate = {
            userKey: '1',
            postKey: postKey,
            comment: comment
        };

        try {
            const { data } = await axios.post(`/comment/create`, commentCreate)
            if (!data.success) {
                alert("게시글 생성이 안됨 ㅅㄱ")
            }
        } catch (error) {
            console.error('Error creating channel:', error);
        }

        setCommentLode((state) => state ? false : true)
    }

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`/comment/select`, {
                params: {
                    postKey: postKey,
                    isAsc: isAsc
                }
            });
            setComments(data);
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }
    };

    //댓글 불러오기
    useEffect(() => {
        fetchData()
    }, [commentLode,isAsc])


    return (
        <div>
            <div className={styles.dashed} />{/* 회색줄 */}
            <div className={styles.widthNav} style={{ justifyContent: 'start' }}>
                <div ref={moreRef} style={{ cursor: 'pointer' }} onClick={() => { !moreON && setmoreON(true) }} >
                    정렬순서<img style={{ marginLeft: '4px' }} src={expand_more} />
                    {moreON && <div ref={modalRef}><MoreAlign setIsAsc={setIsAsc}/></div>} {/*신고, 삭제 모달*/}
                </div>
            </div>
            <div className={styles.commentDiv}>{/* 댓글 달기 */}
                <textarea
                    className={styles.textarea}
                    ref={textareaRef}
                    placeholder='댓글 달기'
                    onInput={handleInput}
                />
                <div className={styles.commentNav}>
                    <img onClick={() => { EmojiOn == true ? setEmojiOn(false) : setEmojiOn(true) }} style={{ cursor: 'pointer' }} src={emoticon_deactivation} />
                    {EmojiOn && <Emogi setEmogiAdd={setEmogiAdd} />}
                    <div style={{ color: commentTextColor }}>{commentLength}/{commentsLimit}<button style={{ backgroundColor: commentButtonColor }} onClick={createComment}>등록</button></div>
                </div>
            </div>
            {comments.success &&
                <>
                    {comments.info.map((comment, index) => {
                        return (
                            <CommentsList
                                key={index}
                                index={index}
                                postKey={postKey}
                                comment={comment}
                                setCommentLode = {setCommentLode}
                            />
                        );
                    })}
                </>
            }
        </div>
    )
}
function CommentsList({ index, postKey, comment,setCommentLode }) {
    let [commentMoreON, setCommentmoreON] = useState(false); //삭제,수정,신고 모달 on/off    
    const modalRef = useRef(null);
    const moreRef = useRef(null);
    const [replyInputState, setReplyInputState] = useState('');
    const [replyInputIndex, setReplyInputIndex] = useState(0);
    const [replyMoreON, setReplyMoreON] = useState(false); //삭제,수정,신고 모달 on/off    
    useEffect(() => {//영역외 클릭시 모달 닫히는 코드
        const handleClickOutside = (event) => {
            if (commentMoreON &&
                !modalRef.current.contains(event.target) && !moreRef.current.contains(event.target)) { setCommentmoreON(false); } //신고, 삭제 닫음
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => { //클린업
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [commentMoreON]);


    const replyOnclick = (state, index) => {
        setReplyInputState(state)
        setReplyInputIndex(index)
    }

    const clear = () => {
        setReplyInputState(null)
        setReplyInputIndex(null)
    }




    return (
        <>
            <div>{/* 댓글 */}
                <div className={styles.list}>
                    <div className={styles.listNav}>
                        <div className={styles.listName}>{comment.nickName}<div className={styles.time}>{comment.createdAt}</div></div>
                        <div>
                            <img ref={moreRef} onClick={() => { !commentMoreON && setCommentmoreON(true) }} className={styles.moreImg} src={more} /> {/* 신고삭제 모달 연결 해야함 */}
                            {commentMoreON && <div ref={modalRef}><MoreDeleteMini /></div>} {/*신고, 삭제 모달*/}
                        </div>
                    </div>
                    <div className={styles.listContent}>{comment.comment}</div>
                    <div className={styles.replyDiv} onClick={() => (replyInputState == 'comment' && replyInputIndex == index) ? clear() : replyOnclick('comment', index)}>
                        <img className={styles.replyDivImg} />
                        <div className={styles.replyDivText}>답글달기</div>
                    </div>
                    {(replyInputState == 'comment' && replyInputIndex == index) &&
                        <ReplyArea postKey={postKey} commentKey={comment.commentKey} setCommentLode={setCommentLode}/>
                    }
                </div>
            </div>
            {comment.replys.map((reply, replyIndex) => {
                return (
                    <>
                        <div className={styles.bigComments} key={replyIndex}>
                            <img className={styles.BcImg} src={big_comment} />
                            <div className={styles.list}>
                                <div className={styles.listNav}>
                                    <div className={styles.listName}>{reply.nickName}<div className={styles.time}>{reply.createdAt}</div>
                                        <div>
                                            <img ref={moreRef} onClick={() => { !commentMoreON && setReplyMoreON(true) }} className={styles.moreImg} src={more} /> {/* 신고삭제 모달 연결 해야함 */}
                                            {commentMoreON && <div ref={modalRef}><MoreDeleteMini /></div>} {/*신고, 삭제 모달*/}
                                        </div>
                                    </div>
                                </div>
                                {reply.replyNickName &&
                                    <div>@{reply.replyNickName}</div>
                                    }
                                
                                <div className={styles.listContent}>{reply.reply}</div>
                                <div className={styles.replyDiv} onClick={() => (replyInputState == 'reply' && replyInputIndex == replyIndex) ? clear() : replyOnclick('reply', replyIndex)}>
                                    <img className={styles.replyDivImg} />
                                    <div className={styles.replyDivText}>답글달기</div>
                                </div>
                            </div>
                        </div>
                        {(replyInputState == 'reply' && replyInputIndex == replyIndex) &&
                            <ReplyArea postKey={postKey} commentKey={comment.commentKey} replyKey={reply.replyKey} replyNickName={reply.nickName} setCommentLode={setCommentLode} />
                        }
                    </>
                )
            })}
        </>
    )
}

function ReplyArea({ postKey, commentKey, replyKey, replyNickName ,setCommentLode}) {
    const textareaRef = useRef(null);
    const [EmojiOn, setEmojiOn] = useState(false);


    //댓글 길이 제한1
    const replysLimit = 200;
    //댓글작성 내용
    const [reply, setReply] = useState('');
    //댓글 길이 저장
    const [replyLength, setReplyLength] = useState(0);
    //댓글작성 버튼 색상
    const [replyButtonColor, setReplyButtonColor] = useState('#FF8901');
    //댓글 길이 text 색상
    const [replyTextColor, setReplyTextColor] = useState('#BBBBBB');

    const replyCreate = async () => {

        const replyCreateDto = {
            commentKey: commentKey,
            replyreplyKey: replyKey,
            userKey: '1',
            reply:reply
        }


        try {
            const { data } = await axios.post(`/reply/create`, replyCreateDto)
            if (!data.success) {
                alert("댓글 생성이 안됨 ㅅㄱ")
            }

        } catch (error) {
            console.error('Error creating channel:', error);
        }

        setCommentLode((state)=> state? false : true)
    }



const handleInput = (e) => {//스크롤 늘어나게
    const textarea = textareaRef.current;

    if (textarea) {
        // text 가 지워질때 높이를 초기화해주기위해
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
    setReply(e.target.value)
    setReplyLength(e.target.value.length)
    setReplyButtonColor(e.target.value.length <= replysLimit ? '#FF8901' : '#BBBBBB')
    setReplyTextColor(e.target.value.length <= replysLimit ? '#BBBBBB' : '#EC000E')
};



return (
    <div className={styles.bigComments}>
        <img className={styles.BcImg} src={big_comment} />
        <div className={styles.commentDiv}>{/* 댓글 달기 */}
            <div className={styles.replyAreaDiv}>
                {replyNickName && <div className={styles.replyAreaDivText}>@{replyNickName}</div>}
                <textarea
                    className={styles.textarea}
                    ref={textareaRef}
                    placeholder='댓글 달기'
                    onInput={handleInput}
                />
            </div>
            <div className={styles.commentNav}>
                <img onClick={() => { EmojiOn == true ? setEmojiOn(false) : setEmojiOn(true) }} style={{ cursor: 'pointer' }} src={emoticon_deactivation} />
                {EmojiOn && <Emogi setEmogiAdd={setEmogiAdd} />}
                <div style={{ color: replyTextColor }}>{replyLength}/{replysLimit}<button style={{ backgroundColor: replyButtonColor }} onClick={replyCreate}>등록</button></div>
            </div>
        </div>
    </div>
)
}


function MoreDelete({ postInfo, modalRef, right, top }) {
    let [deleteWrote, setDeleteWrote] = useState(true) //★내가 쓴 글이면 활성화 코드 추가★
    return (
        <div ref={modalRef} className={styles.moreUi} style={{ right: right, top: top }}>
            {deleteWrote == true ?
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <div className={styles.text}>수정하기</div> */}
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
        <div className={styles.moreUi} style={{ right: '-90px', top: '24px' }}>
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
function MoreAlign({setIsAsc}) {
    return (
        <div className={styles.moreUi} style={{ left: '60px', top: '30px' }}>
            <div className={styles.text} onClick={()=>setIsAsc(false)}>최신순</div>
            <div className={styles.text} onClick={()=>setIsAsc(true)}>과거순</div>
        </div>
    )
}

export default PublicBoard;