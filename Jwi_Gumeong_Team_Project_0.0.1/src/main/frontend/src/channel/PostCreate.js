import { useState, useRef, useEffect } from 'react';
import style from './style/PostCreate.module.css';
import emotIcon from '../icon/24px/emoticon-activation.png';
import imageIcon from '../icon/24px/photo.png'
import closeIcon from '../icon/btn/btn-image-Close.png'
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AlarmModal from '../modal/AlarmModal.js';

function PostCreact({channelKey}) {
    const navigate = useNavigate();
    let { channelId } = useParams();
    // 게시글 길이 제한
    const contentLimit = 300;
    // 게시글작성 내용
    const [content, setContent] = useState('');
    // 플레이스홀더 상태
    const [hasContent, setHasContent] = useState(false);
    // div에 입력되어있는 값 임시저장
    const contentRef = useRef(null);
    // size 계산 상태 색깔
    const [contentColor, setContentColor] = useState('#BBBBBB');
    // 이미지와 input 태그 연결
    const fileInputRef = useRef(null);
    // 이미지 어레이
    const [selectedImage, setSelectedImage] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        setModalOpen(true);
        setModalContent('게시글을 작성해주세요.');
    }, []);

    const closeModal = () => {
        setModalOpen(false);
    };

    // text 의 상태 저장시켜줌, 길이가 300이 넘어갈때 글자 색 변경
    const handleInput = () => {
        setContent(contentRef.current.innerText);
        setContentColor(contentRef.current.innerText.length <= 300 ? '#BBBBBB' : '#EC000E')
        setHasContent(contentRef.current.innerText.trim().length !== 0)
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
        if(content.length < 10){
            setModalContent('내용이 너무 짧아요.');
            setModalOpen(true);
            return;
        }
        // JSP 에서 FORM 과 비슷함
        const formData = new FormData();
        formData.append('content',content);
        // 로그인 기능 완성되면 유저 키값이 들어가도록 변경
        formData.append('userKey', 5);
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
            window.location.reload();
        } catch (error) {
            console.error('업로드 실패:', error);
            setModalContent('서버에 이상이 생겨 업로드를 실패하였습니다. 다시 시도해주세요.');
            setModalOpen(true);
        }
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
            <div style={{display : 'flex'}}>
                {selectedImage.length > 0 && (
                    selectedImage.map(({ file, preview }, index) => (
                        <div key={index} className={style.imageContainer}>
                            <img src={preview} alt={`preview ${index}`} className={style.imagePreview} />
                                <div onClick={() => imageDelete(index)} className={style.deleteButton}>
                                    <img src = {closeIcon} alt='삭제'/>
                                </div>
                        </div>
                    ))
                )}
            </div>

            <div className={style.dashed} />{/* 회색줄 */}
            <div className={style.postCreactIconBox}> {/*게시글 작성 하단 아이콘*/}
                <div className={style.emotIcon}><img src={emotIcon} alt='이모티콘'/></div>{/*이모티콘 아이콘*/}
                <div className={style.imageIcon}><img src={imageIcon} alt='이미지' onClick={imageFileClick} /></div>{/*이미지 아이콘*/}
                <input 
                    type='file' 
                    ref={fileInputRef} 
                    accept=".jpg, .jpeg, .png" 
                    style={{ display: 'none' }} 
                    onChange={imageChange} 
                    multiple 
                />{/*이미지 업로드용 아이콘 */}
                <div className={style.textareaSize} style={{ color: contentColor }}>{content.length}/{contentLimit}</div>{/*작성된 글자수*/}
                <div className={style.postCreactButton} onClick={postCreact}>등록</div>{/*게시글 작성 버튼*/}
            </div>

            {modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    )
}


export default PostCreact;
