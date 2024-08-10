import '../App.css';
import React from 'react';
import style from './style/NotFound.module.css';
import { useNavigate } from 'react-router-dom';
import notFoundImage from '../icon/img/404-img-x.png';

function NotFound(){ // 404 페이지
    let navigate = useNavigate();
    return(
        <div className={style.mainArea}>
            <div className={style.notFoundContainer}>            
                <img src={notFoundImage} className={style.notFoundImage}/>
            </div>
            <div className={style.notFoundText}>존재하찍 않는 페이쥐입니다. (｡•́ - •̀｡)</div>
            <button onClick={() => { navigate('/') }}>메인화면으로 돌아가기</button>
        </div>
    )
}

export default NotFound;