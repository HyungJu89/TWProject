import { useState, useRef, useEffect } from 'react';
import style from './style/PostCreate.module.css';
import emotIcon from '../icon/24px/emoticon-activation.png';
import imageIcon from '../icon/24px/photo.png'
import closeIcon from '../icon/btn/btn-image-Close.png'
import Emogi from '../Emogi/Emogi.js';
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AlarmModal from '../modal/AlarmModal.js';

function PostCreact({channelKey}) {
    const navigate = useNavigate();
    // 게시글 길이 제한
    const contentLimit = 300;
    // 게시글작성 내용
    const [content, setContent] = useState('');
    // 플레이스홀더 상태
    const [hasContent, setHasContent] = useState(false);
    // div에 입력되어있는 값 임시저장
    const contentRef = useRef(null);
    // 이미지와 input 태그 연결
    const fileInputRef = useRef(null);
    // 이미지 어레이
    const [selectedImage, setSelectedImage] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenKeepURL, setModalOpenKeepURL] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const closeModal = () => {
        setModalOpen(false);
        navigate('/signIn');
    };
    const closeModalKeepURL = () => {
        setModalOpenKeepURL(false);
    };

    // text 의 상태 저장시켜줌, 길이가 300이 넘어갈때 글자 색 변경
    const handleInput = (e) => {
        setContent(e.target.value);
        setHasContent(e.target.value.trim().length !== 0)
    }
    // 이미지 선택할때 input='file' 를 실행시켜줌
    const imageFileClick = () => {
        fileInputRef.current.click();
    }
    // 파일 선택 
    const imageChange = (e) => {
        let files = Array.from(e.target.files);

        if (files.length + selectedImage.length > 4) {
            setModalContent('파일이 너무 많아요.');
            setModalOpen(true);
            return;
        }

        const newFiles = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve({ file, preview: reader.result });
                };
                reader.readAsDataURL(file);
            });
        });
        // 모든 파일을 읽은 후에 상태를 한번에 업데이트 되도록 하는 함수
        Promise.all(newFiles).then(fileArray => {
            setSelectedImage(prevFiles => [...prevFiles, ...fileArray]);
        // 리셋
            fileInputRef.current.value = null;
        });
    }
    // 선택된 파일 삭제
    const imageDelete = (indexToDelete) => {
        setSelectedImage(prevFiles => prevFiles.filter((_, index) => index !== indexToDelete));
    }
    // 서버로 게시글 정보를 넘김
    const postCreact = async() => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if(!sessionIdJson){
            setModalContent('로그인 되어 있지 않습니다.');
            setModalOpen(true);
            return;
        } 
        let sessionId = JSON.parse(sessionIdJson).sessionId
        if(content.length < 3){
            setModalContent('내용이 너무 짧아요.');
            setModalOpenKeepURL(true);
            return;
        }
        if(content.length > contentLimit){
            setModalContent('내용이 너무 길어요.');
            setModalOpenKeepURL(true);
            return;
        }

        // JSP 에서 FORM 과 비슷함
        const formData = new FormData();
        formData.append('content',content);
        // 로그인 기능 완성되면 유저 키값이 들어가도록 변경
        formData.append('sessionId', sessionId);
        formData.append('channelKey',channelKey);
        selectedImage.forEach(({file}) => {
            formData.append('files',file);
        });
        try{
            // 서버로 데이터 전달
            const {data} = await axios.post(`/post/create`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // 성공적으로 업로드된 경우 추가적인 처리
            window.location.reload();  // 페이지 새로고침
        } catch (error) {
            console.error('업로드 실패:', error);
            setModalContent('서버에 이상이 생겨 업로드를 실패하였습니다. 다시 시도해주세요.');
            setModalOpen(true);
        }
    }

    window.onload = function() {
        window.scrollTo(0, 0);  // 페이지 로드 후 스크롤 위치를 (0, 0)으로 설정
    };

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

        useEffect(() => {
            EmojiOn && (contentRef.current.innerText=content);
        }, [content]);

    return (
        <div className={style.postCreact}>{/*게시글 작성 box*/}
            {!hasContent && <span className={style.placeholderContentTop}>내용을 입력하세요.(3자 이상)<br /><p className={style.placeholderContentBottom}>비매너 행위는 제재의 대상이 됩니다.</p><br /><p className={style.placeholderContentBottom}>* 욕설, 광고(도배), 악의적인 글, 친목, 성희롱(음란물) 등</p></span>
            }
            <textarea
                className={style.contentArea}
                ref={contentRef}
                onInput={handleInput}
            />
            <div style={{display : 'flex'}}>
                {selectedImage.length > 0 && (
                    selectedImage.map(({ file, preview }, index) => (
                        <div key={index} className={style.imageContainer}>
                            <img src={preview} alt={`preview ${index}`} className={style.imagePreview} />
                                <div onClick={() => imageDelete(index)} className={style.deleteButton}>
                                    <img src = {closeIcon}  className={style.deleteButtonImg} alt='삭제'/>
                                </div>
                        </div>
                    ))
                )}
            </div>

            <div className={style.dashed} />{/* 회색줄 */}
            <div className={style.postCreactIconBox}> {/*게시글 작성 하단 아이콘*/}
                <div className={style.emotIcon}>
                    <img ref={moreRef} onClick={() => { !EmojiOn && setEmojiOn(true) }} style={{ cursor: 'pointer' }} src={emotIcon} art='이모티콘' />
                    {EmojiOn && 
                    // <div ref={modalRef}>
                        <Emogi now={'post'} textareaRef={contentRef} modalRef={modalRef} content={content} setContent={setContent} />
                        // </div>
                        }
                </div>{/*이모티콘 아이콘*/}

                <div className={style.imageIcon}><img src={imageIcon} alt='이미지' onClick={imageFileClick} /></div>{/*이미지 아이콘*/}
                <input 
                    type='file' 
                    ref={fileInputRef} 
                    accept=".jpg, .jpeg, .png" 
                    style={{ display: 'none' }} 
                    onChange={imageChange} 
                    multiple 
                />{/*이미지 업로드용 아이콘 */}
                <div className={style.textareaSize} style={{ color: (content.length <= contentLimit) ? '#BBBBBB' : '#EC000E' }}>{content.length}/{contentLimit}</div>{/*작성된 글자수*/}
                <div className={style.postCreactButton} onClick={postCreact} style={{ backgroundColor: (content.length <= contentLimit && content.length >= 3) ? '#FF8901' : '#BBBBBB' }}>등록</div>{/*게시글 작성 버튼*/}
            </div>

            {modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
            {modalOpenKeepURL && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModalKeepURL} />
            }
        </div>
    )
}


export default PostCreact;
