
import style from './style/LiveLink.module.css';
import openInNew from '../icon/20px/open_in_new.png'

function LiveLink({channelId}){
    return (
        <div className={style.liveGoing} onClick={() => window.open(`https://chzzk.naver.com/live/${channelId}`)}>
            <div className={style.liveGo}>
                <div className={style.liveGoText}>새창으로 방송보기</div>
                <img className={style.liveGoIcon} src={openInNew}/>
            </div>
        </div>
    )
}

export default LiveLink;