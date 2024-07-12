import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { useParams } from 'react-router-dom';
import style from './style/ChannelHome.module.css';
import MainBanner from './MainBanner.js'
import axios from 'axios';
import { Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';

function ChannelHome() {
    let { channelId } = useParams();
    let [live,setLive] = useState(false);
    // useEffect 를 사용하면 컴포넌트 내부에서 상태를 업데이트 하면서 재랜더링이 되기 때문에
    // useQuery 를 다시 실행해서 생기는 버그
    let channelInfo = useQuery('channelInfo', () => (
        axios.get('/channelRest/search/' + channelId)
            .then((a)=>{
                setLive(a.data.content.openLive);
                return (a.data.content)})
            .catch(error => console.log(error))
    )) 




    return (

        <>

            <div>
                <div>
                    <div>
                        {channelInfo.isLoading ? '로딩중' : channelInfo.isError ? '에러남' : '정상작동'}
                        {live ? <MainBanner  channelId={channelId}/> : <div className="백그라운드 이미지 주기"> 라이브 off배너</div>}
                    </div>
                    <div className="채널 정보">
                        <div className={style.channelIcon}><img src={channelInfo.data.channelImageUrl}/></div>
                        <div className="아이콘 오른쪽">
                            <div className="이미지 바탕">
                                <div className="아이콘 오른쪽">
                                    <div className="채널 제목"></div>
                                    <div className="공지사항"></div>
                                </div>
                                <div className="즐겨찾기 버튼"></div>
                            </div>
                            <div className="하얀바탕">
                                <div className="팔로워수"></div>
                                <div className="즐겨찾기"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        글리스트
                    </div>
                    <div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            추천창
                        </div>
                        <div>
                            사이드 베너
                        </div>
                    </div>
                </div>
                <div>
                    페이징
                </div>
            </div>

        </>
    );
}

export default ChannelHome;