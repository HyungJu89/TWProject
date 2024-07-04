
function MainBanner({ channelId }){


    let channe = useQuery('channe', () =>
        axios.get('https://api.chzzk.naver.com/service/v1/channels/' + channelId).then((a) =>
            a.data
        )
    )



    return(
        <div className="위치 고정">
            <img src={channe.data.content.channelImageUrl} className="이미지 사이즈 조정 및 다른 div에 영향을 주지않게"/>
            <div className="맨위에 비어있는칸"></div>
            <div className="라이브 정보">
                <div className="라이브 아이콘"></div>
                <div className="채널 제목"></div>
                <div className="그 방송으로 가는 버튼"></div>
            </div>
        </div>
    );
}



export default MainBanner;