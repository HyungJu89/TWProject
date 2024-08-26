/* eslint-disable */
// ^워링 업애주는 친구
import '../../App.css';
import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from '../style/MiniPublicBoard.module.css';
import MoreDeleteMini from './MoreDeleteMini.js';
import ReplyArea from './ReplyArea.js';
import more from '../../icon/24px/more.png';
import comments_20px from '../../icon/20px/comments-20px.png';
import big_comment from '../../icon/20px/bigcomment.png';


function CommentsList({ index, postKey, comment, setCommentLode, replyOnclick, onClear, replyInputState, replyInputIndex }) {
    let [commentMoreON, setCommentmoreON] = useState(false); //삭제,수정,신고 모달 on/off    
    const modalRef = useRef(null);
    const moreRef = useRef(null);

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

    return (
        <>
            <div>{/* 댓글 */}
                <div className={styles.list} style={{ marginBottom: '0px' }}>
                    <div className={styles.listNav}>
                        <div className={styles.listName}>{comment.nickName}<a className={styles.time}>{comment.createdAt}</a></div>
                        <div>
                            <img ref={moreRef} onClick={() => { !commentMoreON && setCommentmoreON(true) }} className={styles.moreImg} src={more} /> {/* 신고삭제 모달 연결 해야함 */}
                            {commentMoreON && <div ref={modalRef}><MoreDeleteMini nickName={comment.nickName} referenceType={'comment'} referenceKey={comment.commentKey} myContent={comment.myComment} /></div>} {/*신고, 삭제 모달*/}
                        </div>
                    </div>
                    <div className={styles.listContent}>{comment.comment}</div>
                    <div className={styles.replyDiv} onClick={() => (replyInputState == 'comment' && replyInputIndex == comment.commentKey) ? onClear() : replyOnclick('comment', comment.commentKey)}>
                        <div className={styles.replyDivText} style={{ marginBottom: '20px' }}><img src={comments_20px} />답글달기</div>
                    </div>
                    {(replyInputState == 'comment' && replyInputIndex == comment.commentKey) &&
                        <ReplyArea postKey={postKey} commentKey={comment.commentKey} setCommentLode={setCommentLode} onClear={onClear} />
                    }
                </div>
            </div>
            {/*대댓글*/}
            {comment.replys[0].replyKey != 0 && (
                <>
                    {comment.replys.map((reply, replyIndex) => {
                        return (
                            <div key={reply.replyKey}>
                                <div className={styles.bigComments}>
                                    <img className={styles.BcImg} src={big_comment} />
                                    <div className={styles.list}>
                                        <div className={styles.listNav}>{/*닉네임, 글 작성 일시*/}
                                            <div className={styles.listName}>{reply.nickName}<a className={styles.time}>{reply.createdAt}</a></div>
                                            <div>
                                                <img ref={moreRef} onClick={() => { !commentMoreON && setReplyMoreON(true) }} className={styles.moreImg} src={more} /> {/* 신고삭제 모달 연결 해야함 */}
                                                {commentMoreON && <div ref={modalRef}><MoreDeleteMini nickName={reply.nickName} referenceType={'reply'} referenceKey={reply.replyKey} myContent={reply.myReply} /></div>} {/*신고, 삭제 모달*/}
                                            </div>
                                        </div>
                                        {reply.replyNickName &&
                                            <a className={styles.replyNickNameBlue}>@{reply.replyNickName}</a>
                                        }
                                        <a className={styles.listContent}>{reply.reply}</a>
                                        <div className={styles.replyDiv} onClick={() => (replyInputState == 'reply' && replyInputIndex == reply.replyKey) ? onClear() : replyOnclick('reply', reply.replyKey)}>
                                            <div className={styles.replyDivText}><img src={comments_20px} />답글달기</div>
                                        </div>
                                    </div>
                                </div>
                                {(replyInputState == 'reply' && replyInputIndex == reply.replyKey) &&
                                    <ReplyArea postKey={postKey} commentKey={comment.commentKey} replyKey={reply.replyKey} replyNickName={reply.nickName} setCommentLode={setCommentLode} onClear={onClear} />
                                }
                            </div>
                        )
                    })}</>)}
        </>
    )
}
export default CommentsList;