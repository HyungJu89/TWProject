/* eslint-disable */
// ^워링 업애주는 친구
import '../../App.css';
import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback, forwardRef } from 'react'
import styles from '../style/PublicBoard.module.css';
import MoreDeleteMini from './MoreDeleteMini.js';
import ReplyArea from './ReplyArea.js';
import more from '../../icon/24px/more.png';
import comments_20px from '../../icon/20px/comments-20px.png';
import big_comment from '../../icon/20px/bigcomment.png';
import {dateTime} from '../../recycleCode/dateTime.js'
//댓글 포커스용 ref 받는 코드(forwardRef)
const CommentsList = forwardRef(function CommentsList(
{ index, postKey, comment, setCommentLode, replyOnclick, onClear, replyInputState, replyInputIndex, setCommentStart, commentStart }, ref) {
    let [commentMoreON, setCommentmoreON] = useState(false); //삭제,수정,신고 모달 on/off   
    const [nowRef, setNowRef] = useState(0) ; //모달(Ref)지정용 함수 = 현재 누른 댓글의 key를 비교해서 동일한 모달만 오픈
    const [commentColor,setCommentColor] = useState(comment.state != "common" ? '#999999' : '#101010');
    const modalRef = useRef(null);
    const moreRef = useRef(null);
    const [replyMoreON, setReplyMoreON] = useState(false); //삭제,수정,신고 모달 on/off    
    const [commentUpdateTime, setCommentUpdateTime] = useState(null);
    useEffect(() => {//영역외 클릭시 모달 닫히는 코드
        const handleClickOutside = (event) => {
            if (commentMoreON &&
                !modalRef.current.contains(event.target) && !moreRef.current.contains(event.target)) 
                { setCommentmoreON(false); } //신고, 삭제 닫음
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => { //클린업
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [commentMoreON]);

    useEffect(()=>{
        setCommentColor(comment.state != "common" ? '#999999' : '#101010')
        const time = dateTime(comment.createdAt);
        setCommentUpdateTime(time)
    },[comment])
    return (
        <>
            <div>{/* 댓글 */}
                <div className={styles.list} style={{ marginBottom: '0px' }}  ref={ref}>
                    <div className={styles.listNav}>
                        <div className={styles.listName}>{comment.nickName}<a className={styles.time}>{commentUpdateTime}</a></div>
                        <div>
                            <img ref={moreRef} onClick={() => { !commentMoreON && setCommentmoreON(true); setNowRef(comment.commentKey) }} className={styles.moreImg} src={more} /> {/* 신고삭제 모달 연결 해야함 */}
                            {commentMoreON &&
                            nowRef === comment.commentKey ?
                            <div ref={modalRef}><MoreDeleteMini setCommentLode = {setCommentLode} state = {comment.state} nickName={comment.nickName} referenceType={'comment'} referenceKey={comment.commentKey} myContent={comment.myComment} /></div> : null} {/*신고, 삭제 모달*/}
                        </div>
                    </div>
                    <div className={styles.listContent} style={{color : commentColor }}>{comment.comment}</div>
                    <div className={styles.replyDiv} onClick={() => (replyInputState == 'comment' && replyInputIndex == comment.commentKey) ? onClear() : replyOnclick('comment', comment.commentKey)}>
                        <div className={styles.replyDivText} style={{ marginBottom: '20px' }}><img src={comments_20px} />답글달기</div>
                    </div>
                    {(replyInputState == 'comment' && replyInputIndex == comment.commentKey) &&
                        <ReplyArea postKey={postKey} commentKey={comment.commentKey} setCommentLode={setCommentLode} onClear={onClear}  setCommentStart={setCommentStart} commentStart={commentStart}/>
                    }
                </div>
            </div>
            {/*대댓글*/}
            {comment.replys[0].replyKey != 0 && (
                <>
                    {comment.replys.map((reply, replyIndex) => {
                        const [replyColor,setReplyColor] = useState(reply.state != "common" ? '#999999' : '#101010');
                        const [replyUpdateTime, setReplyUpdateTime] = useState(null);
                        useEffect(()=>{
                            setReplyColor(reply.state != "common" ? '#999999' : '#101010')
                            const time = dateTime(reply.createdAt);
                            setReplyUpdateTime(time);
                        },[reply])
                        return (
                            <div key={reply.replyKey}>
                                <div className={styles.bigComments}>
                                    <img className={styles.BcImg} src={big_comment} />
                                    <div className={styles.list}>
                                        <div className={styles.listNav}>{/*닉네임, 글 작성 일시*/}
                                            <div className={styles.listName}>{reply.nickName}<a className={styles.time}>{replyUpdateTime}</a></div>
                                            <div>
                                                <img ref={moreRef} onClick={() => { !commentMoreON && setCommentmoreON(true); setNowRef(reply.replyKey) }} className={styles.moreImg} src={more} /> {/* 신고삭제 모달 연결 해야함 */}
                                                {commentMoreON &&
                                                nowRef === reply.replyKey ?
                                                <div ref={modalRef}><MoreDeleteMini  setCommentLode = {setCommentLode}  state = {reply.state} nickName={reply.nickName} referenceType={'reply'} referenceKey={reply.replyKey} myContent={reply.myReply} /></div>:null} {/*신고, 삭제 모달*/}
                                            </div>
                                        </div>
                                        {reply.replyNickName &&
                                            <a className={styles.replyNickNameBlue}>@{reply.replyNickName}</a>
                                        }
                                        <a className={styles.listContent} style={{color : replyColor}}>{reply.reply}</a>
                                        <div className={styles.replyDiv} onClick={() => (replyInputState == 'reply' && replyInputIndex == reply.replyKey) ? onClear() : replyOnclick('reply', reply.replyKey)}>
                                            <div className={styles.replyDivText}><img src={comments_20px} />답글달기</div>
                                        </div>
                                    </div>
                                </div>
                                {(replyInputState == 'reply' && replyInputIndex == reply.replyKey) &&
                                    <ReplyArea postKey={postKey} commentKey={comment.commentKey} replyKey={reply.replyKey} replyNickName={reply.nickName} setCommentLode={setCommentLode} onClear={onClear} setCommentStart={setCommentStart} commentStart={commentStart} />
                                }
                            </div>
                        )
                    })}</>)}
        </>
    )
});
export default CommentsList;