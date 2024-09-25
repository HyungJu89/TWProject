/* eslint-disable */
// ^워링 업애주는 친구
import axios from 'axios';
import '../../App.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../style/PublicBoard.module.css';
import replyImg from '../../icon/20px/reply.png';
import emoticon_activation from '../../icon/24px/emoticon-activation.png';
import emoticon_deactivation from '../../icon/24px/emoticon-deactivation.png';
import Emogi from '../../Emogi/Emogi.js';

function ReplyArea({ postKey, commentKey, replyKey, replyNickName, setCommentLode, onClear, setCommentStart, commentStart, setReplyNew }) {
    const textareaRef = useRef(null);
    //댓글 길이 제한1
    const replysLimit = 200;
    //댓글작성 내용
    const [reply, setReply] = useState('');
    //댓글 길이 저장
    const [replyLength, setReplyLength] = useState(0);
    //댓글작성 버튼 색상
    const [replyButtonColor, setReplyButtonColor] = useState('#BBBBBB');
    //댓글 길이 text 색상
    const [replyTextColor, setReplyTextColor] = useState('#BBBBBB');

    const replyCreate = async () => {
        if (replysLimit < replyLength || replyLength < 3) {
            return;
        }

        let sessionIdJson = sessionStorage.getItem('sessionId');
        if (!sessionIdJson) {
            return alert('로그인되어있지않습니다.')
        }

        let sessionId = JSON.parse(sessionIdJson).sessionId
        const replyCreateDto = {
            commentKey: commentKey,
            replyreplyKey: replyKey,
            sessionId: sessionId,
            reply: reply
        }

        try {
            const { data } = await axios.post(`/reply/create`, replyCreateDto)
            setCommentStart(commentStart+1); //댓글 작성시에만 포커스 되도록 하는 함수
            setReplyNew(true);
            if (!data.success) {
                alert("댓글 생성이 안됨 ㅅㄱ")
            }
        } catch (error) {
            console.error('Error creating channel:', error);
        }
        setCommentLode((state) => state ? false : true);
        setReply('');
        onClear();
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
        setReplyButtonColor(replyLength >= 3 && reply.length <= replysLimit  ? '#FF8901' : '#BBBBBB')
        setReplyTextColor(e.target.value.length <= replysLimit ? '#BBBBBB' : '#EC000E')
    };

    useEffect(()=>{
        setReplyLength(reply.length);
        setReplyButtonColor(replyLength >= 3 && reply.length <= replysLimit  ? '#FF8901' : '#BBBBBB')
    },[reply,replyLength]);

    //모달함수
    let [EmojiOn, setEmojiOn] = useState(false);//이모지 모달 on/off
    const modalRef = useRef(null);
    const moreRef = useRef(null);
    useEffect(() => {//영역외 클릭시 모달 닫히는 코드
        const handleClickOutside = (event) => {
            if (EmojiOn &&
                !modalRef.current.contains(event.target) && !moreRef.current.contains(event.target))
                { setEmojiOn(false); } //신고, 삭제 닫음
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => { //클린업
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [EmojiOn]);


    return (
        <div className={`${styles.bigComments} fadein`}>
            <img className={styles.BcImg} src={replyImg} />
            <div className={styles.commentDiv}>{/* 댓글 달기 */}
                <div className={styles.replyAreaDiv}>
                    {replyNickName && <a className={styles.replyAreaDivText}>@{replyNickName}</a>}
                    <textarea
                        value={reply}
                        className={styles.textarea}
                        ref={textareaRef}
                        placeholder='댓글 달기'
                        onInput={handleInput}
                    />
                </div>
                <div className={styles.commentNav}>
                    <img className={styles.iconimg} ref={moreRef} onClick={() => { EmojiOn == true ? setEmojiOn(false) : setEmojiOn(true) }} style={{ cursor: 'pointer' }} src={emoticon_deactivation} />
                    {EmojiOn &&<Emogi  now={'comments'} modalRef={modalRef} textareaRef={textareaRef} setComment={setReply} />}
                    <div style={{ color: replyTextColor }}>
                        {replyLength}/{replysLimit}
                    <button style={{ backgroundColor: replyButtonColor }} onClick={() => replyCreate()}>등록</button></div>
                </div>
            </div>
        </div>
    )
}


export default ReplyArea;