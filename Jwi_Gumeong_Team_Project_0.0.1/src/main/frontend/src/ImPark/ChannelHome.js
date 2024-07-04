import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

function ChannelHome({ channelId }) {

    let channe = useQuery('channe', () =>
        axios.get('https://api.chzzk.naver.com/service/v1/channels/' + channelId).then((a) =>
            a.data
        )
    )

    return (
        <>
            <div>
                <div>
                    <div>
                        {channe.openLive ? 
                        <div className="백그라운드 이미지 줄필욘없음"> 메인배너banner</div> : 
                        <div className="백그라운드 이미지 주기"> 라이브 off배너</div>
                        }
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
                            즐겨찾기
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