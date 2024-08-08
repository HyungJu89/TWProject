import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { channelGet } from '../recycleCode/ChannelAxios.js';
import '../App.css';
import style from './style/PageCheck.module.css';
import loading_suggest from '../icon/img/loading-suggest.png';
import open_channel_w from '../icon/24px/open-channel-w.png';

function PageCheck(){ //LIVE중 클릭 후, 개설 여부를 확인하기 위한 페이지
    let navigate = useNavigate();
    let { channelId } = useParams();
    const handleCheckChannel = async (channelId) => {
        try {
            const channel = await channelGet(channelId); // 비동기 호출
            if (channel.success) {
                return navigate(`/channel/${channelId}`);
            }
        } catch (error) {
            console.error('채널 확인 중 오류 발생:', error);
            navigate('/');
        }
    };
    //들어오자마자 작동
    useEffect(()=>{
    // 비동기 함수 호출
    handleCheckChannel(channelId);
    },[channelId])
    return(
        <div className={style.mainArea}>
            <img src={loading_suggest}/>
            해당 스트리머의 게시판은 생성되지 않았습니다.
            <button onClick={() => { navigate('/channelManagement',{ state: { ManagementChannelId: channelId } }); window.scrollTo(0, 0); }}><img src={open_channel_w}/>게시판 생성하기</button>
        </div>
    )
}

export default PageCheck;