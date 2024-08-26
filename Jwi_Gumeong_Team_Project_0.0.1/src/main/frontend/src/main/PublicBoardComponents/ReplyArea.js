/* eslint-disable */
// ^워링 업애주는 친구
import axios from 'axios';
import '../../App.css';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../style/PublicBoard.module.css';
import big_comment from '../../icon/20px/bigcomment.png';
import emoticon_activation from '../../icon/24px/emoticon-activation.png';
import emoticon_deactivation from '../../icon/24px/emoticon-deactivation.png';
import Emogi from '../../Emogi/Emogi.js';

function ReplyArea({ postKey, commentKey, replyKey, replyNickName, setCommentLode, onClear }) {
    const textareaRef = useRef(null);
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
        setReplyButtonColor(e.target.value.length <= replysLimit ? '#FF8901' : '#BBBBBB')
        setReplyTextColor(e.target.value.length <= replysLimit ? '#BBBBBB' : '#EC000E')
    };

    return (
        <div className={`${styles.bigComments} fadein`}>
            <img className={styles.BcImg} src={big_comment} />
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
                    <img onClick={() => { EmojiOn == true ? setEmojiOn(false) : setEmojiOn(true) }} style={{ cursor: 'pointer' }} src={emoticon_deactivation} />
                    {EmojiOn && <div className={styles.a}><Emogi setEmogiAdd={setEmogiAdd} /></div>}
                    <div style={{ color: replyTextColor }}>{replyLength}/{replysLimit}<button style={{ backgroundColor: replyButtonColor }} onClick={() => replyCreate()}>등록</button></div>
                </div>
            </div>
        </div>
    )
}


export default ReplyArea;