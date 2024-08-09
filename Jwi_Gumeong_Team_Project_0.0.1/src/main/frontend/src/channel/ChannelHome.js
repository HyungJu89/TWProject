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
import { channelGet } from '../recycleCode/ChannelAxios.js';
import {searchPost} from '../recycleCode/postAxios.js'
import { useDispatch, useSelector } from 'react-redux';
import { setSessionId, setUserKey, logout, setLoggedIn, fetchUserKey } from '../slice/sessionSlice.js';

function ChannelHome() {
    let { channelId } = useParams();
    const navigate = useNavigate();
    const [channelInfo,serChannelInfo] = useState();
    const [postList,setPostList] = useState([]);
    const [page,setPage] = useState(1);
    
    //세션화용 코드,state
    var jsonSessionInfo = sessionStorage.getItem('sessionId');
    var sessionInfo = JSON.parse(jsonSessionInfo);
    const isLoggedIn = useSelector((state) => state.session.isLoggedIn);  
    const dispatch = useDispatch();
    //로그아웃 함수 
    //dispatch함수를 컴포넌트에 props로 전달하려면 이렇게 함수로 따로 묶어서 설정해준 다음, 보내야됨
    const handleLogout = () => {
        dispatch(logout());
    };
    //세션화 함수
    useEffect(() => {
        if (sessionInfo) {
            dispatch(fetchUserKey(sessionInfo.sessionId));
        }
    }, [sessionInfo]);

    const fetchData = async (channelKey,page) => {
        const postListData = await searchPost('channel',channelKey,page);
        setPostList(postListData)
    };

    const handleCheckChannel = async (channelId) => {
        try {
            const channel = await channelGet(channelId); // 비동기 호출
            if (!channel.success) {
                alert("생성되지 않은 게시판입니다.");
                return navigate('/');
            }

            serChannelInfo(channel.info)
            fetchData(channel.info.channelKey,page)

        } catch (error) {
            console.error('채널 확인 중 오류 발생:', error);
            navigate('/');
        }
    };
    //여기까지 세션화

    //들어오자마자 작동
    useEffect(()=>{
    // 비동기 함수 호출
    handleCheckChannel(channelId);
    },[channelId])

    useEffect(()=>{
        fetchData(channelInfo?.channelKey)
    },[channelInfo,page])

//------------------------------------------------------------------------------
    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useChannel(channelId);
    // 추후에 에러 페이지 만들기
    if (isLoadingChannel || channelInfo == null ) {
        return <div>채널 홈 로딩중</div>;
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
                        <PostCreate channelKey={channelInfo.channelKey} />
                        <div className={style.postList}>
                            {postList.success && 
                                <>
                                    {postList.search.map((postInfo,index)=>
                                        <PublicBoard key={index} postInfo = {postInfo}/>
                                    )}
                                </>
                            }
                        </div>
                        <div className={style.bottomPaging}>페이징</div>
                    </div>
                    <div className={style.listRight}>
                
                        <div className={style.sideBar}>
                             {/* 이부분 */}
                            <PublicMenu isLoggedIn = {isLoggedIn} onLogout={handleLogout}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}



export default ChannelHome;