import bookmarkActivation from '../icon/20px/bookmark-activation.png';
import bookmarkActivationW from '../icon/20px/bookmark-activation-w.png';
import bookmarkDeactivation from '../icon/20px/bookmark-deactivation.png';
import Star from '../icon/20px/bookmark-deactivation.png'; 
import style from './style/BookmarkButton.module.css'
import '../App.css'
import { useState } from 'react';

function BookmarkButton() {
    let [bookmarkOn, setBookMarkOn] = useState(false);
    let [bookmarkImg, setBookmarkImg] = useState(bookmarkActivation);

    return (
        <div>
            {bookmarkOn === false ? <BookMarkNone setBookmarkImg={setBookmarkImg} bookmarkImg={bookmarkImg} setBookMarkOn={setBookMarkOn}/> 
                                    : <BookMarkTrue setBookMarkOn={setBookMarkOn}/>}
        </div>
    )
}

function BookMarkNone({setBookmarkImg,bookmarkImg,setBookMarkOn}){
    return(
        <div onClick={()=>{setBookMarkOn(true)}} className={style.bookmarkButton}
            onMouseEnter={()=>{setBookmarkImg(bookmarkActivationW)}}
            onMouseLeave={()=>{setBookmarkImg(bookmarkActivation)}} >
            <img src={bookmarkImg} />
            <div className={style.bookmarkText}>즐겨찾기</div>
        </div>
    )
}
function BookMarkTrue({setBookMarkOn}){
    return(
        <div onClick={()=>{setBookMarkOn(false)}} className={style.bookMark}>
            <img src={Star}/><div className={style.text}>즐겨찾기 중</div>
        </div>
    )
}

export default BookmarkButton;