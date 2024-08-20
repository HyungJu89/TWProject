import bookmarkActivation from '../icon/20px/bookmark-activation.png';
import bookmarkActivationW from '../icon/20px/bookmark-activation-w.png';
import bookmarkDeactivation from '../icon/20px/bookmark-deactivation.png';
import Star from '../icon/20px/bookmark-deactivation.png'; 
import style from './style/BookmarkButton.module.css'
import '../App.css'
import { useEffect, useState, useCallback } from 'react';
import lodash from 'lodash';
import axios from 'axios';

function BookmarkButton({channelInfo,setFavoriteCount}) {
    const [bookmarkOn, setBookMarkOn] = useState(channelInfo.favorite);
    const [bookmarkImg, setBookmarkImg] = useState(bookmarkActivation);
    const [debounceBookMark,setDebounceBookMark] = useState(bookmarkOn);
    const [bookMarkMounted, setBookMarkMounted] = useState(false);
    const bookMarkDebounce = useCallback(
        lodash.debounce((term) => {
            setDebounceBookMark(term);
        }, 500), // 500ms 대기 시간
        []
    );
    
    useEffect(()=>{
        if(bookMarkMounted){
            bookMarkDebounce(bookmarkOn)
        }
    },[bookmarkOn,debounceBookMark,bookMarkMounted]);

    const updateFavorite = async()=>{
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if (!sessionIdJson) {
            return alert('로그인되어있지않습니다.'); // 사용자가 로그인하지 않은 경우 경고 표시
        }
        let sessionId = JSON.parse(sessionIdJson).sessionId;

        // 서버에 보낼 객체 생성
        const favorite = {
            favorite: bookmarkOn,
            sessionId: sessionId,
            channelKey: channelInfo.channelKey
        };
        console.log(favorite)
        try {
            // 상태를 업데이트하기 위한 POST 요청 전송
            const data = await axios.post(`/channel/favorite`, favorite);
        } catch (error) {
            console.error('Error creating channel:', error); // 에러 처리
        }
    };
    
    useEffect(()=>{
        if(bookMarkMounted){
            updateFavorite();
        }
    },[debounceBookMark,bookMarkMounted])

    const bookMarkOnclick = (favorite) =>{
        setBookMarkMounted(true);
        setFavoriteCount((state) => (favorite ? state -1 : state + 1 ));
        setBookMarkOn(!favorite)
    }

    return (
        <div>
            {bookmarkOn ? <BookMarkTrue setBookMarkOn={setBookMarkOn} bookMarkOnclick={bookMarkOnclick}/> 
            : <BookMarkNone setBookmarkImg={setBookmarkImg} bookmarkImg={bookmarkImg} setBookMarkOn={setBookMarkOn} bookMarkOnclick={bookMarkOnclick}/> }
        </div>
    )
}

function BookMarkNone({setBookmarkImg,bookmarkImg,bookMarkOnclick}){
    return(
        <div onClick={()=>{bookMarkOnclick(false)}} className={style.bookmarkButton}
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