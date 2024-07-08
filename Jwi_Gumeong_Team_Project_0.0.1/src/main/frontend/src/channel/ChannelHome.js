import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import MainBanner from './MainBanner.js'
import axios from 'axios';
import { Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';

function ChannelHome() {
    let [babo,setBabo] = useState('');

            let channelInfo = useQuery('channe', () =>(
            axios.get('/channelRest/search')
            .then((a) =>setBabo(a.data),
            console.log(22)
            )
            ))

    return (

        <>

            <div>
                <div>
                    <div>
                        {channelInfo.isLoading?'로딩중':babo.content.channelName}
                        {/* {channe.openLive ?  */}
                        <MainBanner/> : 
                        <div className="백그라운드 이미지 주기"> 라이브 off배너</div>
                        {/* } */}
                    </div>
                    <div className="채널 정보">
                        <div className="채널 아이콘"></div>
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