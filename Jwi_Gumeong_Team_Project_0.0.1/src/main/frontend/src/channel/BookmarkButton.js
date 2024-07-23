import bookmarkActivation from '../icon/20px/bookmark-activation.png';
import bookmarkActivationW from '../icon/20px/bookmark-activation-w.png';
import bookmarkDeactivation from '../icon/20px/bookmark-deactivation.png';
import style from './style/BookmarkButton.module.css'
import '../App.css'
import { useState } from 'react';

function BookmarkButton() {

    let [bookmarkImg, setBookmarkImg] = useState(bookmarkActivation);
    return (
        <div className={style.bookmarkButton}
            onMouseEnter={() => setBookmarkImg(bookmarkActivationW)}
            onMouseLeave={() => setBookmarkImg(bookmarkActivation)} >
            <img src={bookmarkImg} />
            <div className={style.bookmarkText}>즐겨찾기</div>
        </div>
    )
}

export default BookmarkButton;