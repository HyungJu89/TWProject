import axios from 'axios';
import '../App.css'
import style from './style/ChannelHome.module.css';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCreate from './PostCreate.js';
import { useChannel } from '../recycleCode/ApiQuery.js';
import MainBanner from './MainBanner.js';
import PublicBoard from '../main/PublicBoard.js'
import ChannelBody from './ChannelBody.js';
import PublicMenu from '../main/PublicMenu.js'
import { checkChannel } from '../recycleCode/axios.js';

function ChannelHome() {
    let { channelId } = useParams();
    const navigate = useNavigate();
    

    const handleCheckChannel = async (channelId) => {
        try {
            const isChannelValid = await checkChannel(channelId); // 비동기 호출
            console.log(isChannelValid)
            if (isChannelValid) {
                alert("생성되지 않은 게시판입니다.");
                return navigate('/');
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
    },[])

//------------------------------------------------------------------------------



    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useChannel(channelId);

    

    // 추후에 에러 페이지 만들기
    if (isLoadingChannel) {
        return <div>로딩중</div>;
    }

    if (isErrorChannel || !channelApi) {
        return <div>에러남</div>;
    }

    




    return (
        <div>
            <div className={style.ChannelTop}> {/* 얘 포인트 */}
            
            <MainBanner channelId={channelId} route={'channel'}/>


            <ChannelBody />
            </div>
            <div className={style.channelInfoBack}>
                <div className={style.mainList}>
                    <div className={style.listLeft}>
                        <PostCreate channelId={channelId} />
                        <div className={style.postList}>
                            <PublicBoard />
                        </div>
                        <div className={style.bottomPaging}>페이징</div>
                    </div>
                    <div className={style.listRight}>
                
                        <div className={style.sideBar}><PublicMenu loginOn={1} setLoginOn={1} channel={1} /></div>
                    </div>
                </div>
            </div>
        </div>
    );

}



export default ChannelHome;