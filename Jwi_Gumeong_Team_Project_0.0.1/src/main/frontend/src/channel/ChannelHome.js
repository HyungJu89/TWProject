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
import { checkChannel } from '../recycleCode/Axios.js';

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
const [channel, setChannel] = useState('');
useEffect(() => { /*파트너스 추천*/
    const addPartners = async () =>{
        let arrayPartners = []; //12개 배열 저장할 장소
        let filterArrayPartners = new Set(); // 고유 파트너를 저장할 Set

        try{
            while (arrayPartners.length < 12){ //배열이 12가 되면 참이다.
                const response = await axios.get(`/partnersLiveApi/`);
                const newPartners = response.data.content.streamerPartners;

                // API 호출 데이터를 Set에 추가하여 중복을 자동으로 제거
                newPartners.forEach(partner => filterArrayPartners.add(partner));
                
                if (filterArrayPartners.size >= 12) {//불러온 데이터 12개 초과 시 실행
                    arrayPartners = Array.from(filterArrayPartners).slice(0, 12);
                    setChannel(arrayPartners); // 상태 업데이트
                    break;
                }
            }
        } catch(error){
            console.error('Channel API Error:', error);
        }
    };
    addPartners();
}, []);

    //컴포넌트 전송 최적화 구문
    const ChannelIndex = (i) =>{
        return channel[i]?.channelId || '오류';
    };



    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useChannel(channelId);

    

    // 추후에 에러 페이지 만들기
    if (isLoadingChannel) {
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
                        <PostCreate channelId={channelId} />
                        <div className={style.postList}>
                            <PublicBoard />
                        </div>
                        <div className={style.bottomPaging}>페이징</div>
                    </div>
                    <div className={style.listRight}>
                
                        <div className={style.sideBar}>
                            <PublicMenu loginOn={1} setLoginOn={1} channel={1} 
                                        channelId={ChannelIndex(0)}
                                        channelIdSub1={ChannelIndex(1)}
                                        channelIdSub2={ChannelIndex(2)}
                                        channelIdSub3={ChannelIndex(3)}
                                        channelIdSub4={ChannelIndex(4)}
                                        channelIdSub5={ChannelIndex(5)}
                                        channelIdSub6={ChannelIndex(6)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}



export default ChannelHome;