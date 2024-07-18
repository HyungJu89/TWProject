
import { useState, useRef } from 'react';
import style from './style/PostCreate.module.css';
import emotIcon from '../icon/24px/emoticon-activation.png';
import imageIcon from '../icon/24px/photo.png'
import '../App.css'
import { useParams } from 'react-router-dom';

function PostCreact() {


    let { channelId } = useParams();
    //게시글 길이 제한
    const contentLimit = 300;
    //게시글작성 내용
    const [content, setContent] = useState('');
    //플레이스홀더 상태
    const [hasContent, setHasContent] = useState(false);
    //div에 입력되어있는 값 임시저장
    const contentRef = useRef(null);
    //size 계산 상태 색깔
    const [contentColor, setContentColor] = useState('black');




    const handleInput = () => {
        setContent(contentRef.current.innerText);
        setContentColor(contentRef.current.innerText.length <= 300 ? '#BBBBBB' : '#EC000E')
        setHasContent(contentRef.current.innerText.trim().length !== 0)
    }


    return (
        <div className={style.postCreact}>{/*게시글 작성 box*/}
            {!hasContent && <span className={style.placeholderContentTop}>내용을 입력하세요.<br /><p className={style.placeholderContentBottom}>비매너 행위는 하지마세요.</p><br /><p className={style.placeholderContentBottom}>* 욕설, 광고(도배), 악의적인 글, 친목, 성희롱(음란물) 등</p></span>
            }
            <div
                contentEditable="true"
                className={`${style.contentArea}`}
                ref={contentRef}
                onInput={handleInput}
                onBlur={() => setContent(contentRef.current.innerText)}
            />


            <div className={style.dashed} />{/* 회색줄 */}
            <div className={style.postCreactIconBox}> {/*게시글 작성 하단 아이콘*/}
                <div className={style.emotIcon}><img src={emotIcon} /></div>{/*이모티콘 아이콘*/}
                <div className={style.imageIcon}><img src={imageIcon} /></div>{/*이미지 아이콘*/}
                <div className={style.textareaSize} style={{ color: contentColor }}>{content.length}/{contentLimit}</div>{/*작성된 글자수*/}
                <div className={style.postCreactButton}>등록</div>{/*게시글 작성 버튼*/}
            </div>
        </div>
    )
}


export default PostCreact;