import { useEffect, useState } from 'react';
import '../App.css';
import style from './style/BlinkPage.module.css';
import loading_suggest from '../icon/img/loading-suggest.png';
import open_channel_w from '../icon/24px/open-channel-w.png';

function BlinkPage(){ //LIVE중 클릭 후, 개설 여부를 확인하기 위한 페이지
    return(
        <div className={style.mainArea}>
            <img src={loading_suggest}/>
            해당 스트리머의 게시판은 생성되지 않았습니다.
            <button><img src={open_channel_w}/>게시판 생성하기</button>
        </div>
    )
}

export default BlinkPage;