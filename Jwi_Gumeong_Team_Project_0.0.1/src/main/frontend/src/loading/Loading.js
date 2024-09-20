// Loading.js
import React from 'react';
import loadingIcon from '../icon/img/loading.png'
import style from './style/Loading.module.css';

function Loading() {
    return <div className={style.main}>
        <div className={style.loading}>
        <div className={style.spin}>
            <img src={loadingIcon}/>
        </div>
        로딩중...
        </div>
    </div>;
}

export default Loading;