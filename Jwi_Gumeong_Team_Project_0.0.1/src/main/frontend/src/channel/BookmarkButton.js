import bookmarkActivation from '../icon/20px/favorites-activation.png';
import bookmarkActivationW from '../icon/20px/favorites-activation-w.png';
import bookmarkDeactivation from '../icon/20px/favorites-deactivation.png';
import Star from '../icon/20px/favorites-deactivation.png'; 
import style from './style/BookmarkButton.module.css'
import '../App.css'
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import lodash from 'lodash';
import axios from 'axios';
import AlarmModal from '../modal/AlarmModal.js';

function BookmarkButton({channelInfo,setFavoriteCount}) {
    const [bookmarkOn, setBookMarkOn] = useState(channelInfo.favorite);
    const [bookmarkImg, setBookmarkImg] = useState(bookmarkActivation);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const closeModal = () => {
        setModalOpen(false);
        navigate('/signIn');
    };

    const bookMarkDebounce = useCallback(
        lodash.debounce((favorite) => {
            updateFavorite(favorite);
        }, 500), // 500ms 대기 시간
        []
    );
    

    const updateFavorite = async(favorite)=>{
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if (!sessionIdJson) {
            setModalContent('로그인 되어 있지 않습니다.');
            setModalOpen(true);
            return;
            // return alert('로그인되어있지않습니다.'); // 사용자가 로그인하지 않은 경우 경고 표시
        }
        let sessionId = JSON.parse(sessionIdJson).sessionId;

        // 서버에 보낼 객체 생성
        const favoriteDto = {
            favorite: favorite,
            sessionId: sessionId,
            channelKey: channelInfo.channelKey
        };
        try {
            // 상태를 업데이트하기 위한 POST 요청 전송
            const data = await axios.post(`/channel/favorite`, favoriteDto);
        } catch (error) {
            console.error('Error creating channel:', error); // 에러 처리
        }
    };
    
    const bookMarkOnclick = () =>{
        const favorite = !bookmarkOn;
        setFavoriteCount((state) => (favorite ? state +1 : state - 1 ));
        setBookMarkOn(favorite)
        bookMarkDebounce(favorite)
    }

    return (
        <div>
            {bookmarkOn ? <BookMarkTrue setBookMarkOn={setBookMarkOn} bookMarkOnclick={bookMarkOnclick}/> 
            : <BookMarkNone setBookmarkImg={setBookmarkImg} bookmarkImg={bookmarkImg} setBookMarkOn={setBookMarkOn} bookMarkOnclick={bookMarkOnclick}/> }
            {modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    )
}

    function BookMarkNone({setBookmarkImg,bookmarkImg,bookMarkOnclick}){
        return(
            <div onClick={()=>{bookMarkOnclick()}} className={style.bookmarkButton}
                onMouseEnter={()=>{setBookmarkImg(bookmarkActivationW)}}
                onMouseLeave={()=>{setBookmarkImg(bookmarkActivation)}} >
                <img src={bookmarkImg} />
                <div className={style.bookmarkText}>즐겨찾기</div>
            </div>
        )
    }
    function BookMarkTrue({bookMarkOnclick}){
        return(
            <div onClick={()=>{bookMarkOnclick(true)}} className={style.bookMark}>
                <img src={Star}/><div className={style.text}>즐겨찾기 중</div>
            </div>
        )
    }

export default BookmarkButton;