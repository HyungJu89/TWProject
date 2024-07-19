import favoritesActivation from '../icon/20px/favorites-activation.png';
import favoritesActivationW from '../icon/20px/favorites-activation-w.png';
import favoritesDeactivation from '../icon/20px/favorites-deactivation.png';
import style from './style/BookmarkButton.module.css'
import '../App.css'
import { useState } from 'react';

function BookmarkButton() {

    let [favoritesImg, setFavoritesImg] = useState(favoritesActivation);

    return (
        <div className={style.bookmarkButton}
            onMouseEnter={() => setFavoritesImg(favoritesActivationW)}
            onMouseLeave={() => setFavoritesImg(favoritesActivation)} >
            <img src={favoritesImg} />
            <div className={style.bookmarkText}>즐겨찾기</div>
        </div>
    )
}

export default BookmarkButton;