import axios from 'axios';
import './style/MainBanner.module.css';
import { useQuery } from 'react-query';
import { useState } from 'react';

function MainBanner({ channelId }){


    // let channe = useQuery('channe', () =>
    //     axios.get('https://api.chzzk.naver.com/service/v1/channels/'+channelId+'/data?fields=topExposedVideos').then((a) =>
    //         a.data
    //     )
    // )
    // let [liveImageUrl,setLiveImageUrl] = useState();
    // let channe = axios.get('https://api.chzzk.naver.com/service/v1/channels/b5ed5db484d04faf4d150aedd362f34b').then((a) =>
    // a.data
    // )


    return(
        <div className="위치 고정">
            
            <div>음오아예 </div>
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