import './style/MainBanner.module.css';


function MainBanner({ channelId }){


    // let channe = useQuery('channe', () =>
    //     axios.get('https://api.chzzk.naver.com/service/v1/channels/'+channelId+'/data?fields=topExposedVideos').then((a) =>
    //         a.data
    //     )
    // )

    let channe = useQuery('channe', () =>
    axios.get('https://api.chzzk.naver.com/service/v1/channels/b5ed5db484d04faf4d150aedd362f34b/data?fields=topExposedVideos').then((a) =>
        a.data
    )
)

    let liveImageUrl = (channe.data.content.topExposedVideos.liveImageUrl("{type}", "480"));


    return(
        <div className="위치 고정">
            <img src={liveImageUrl} className="liveImage"/>
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