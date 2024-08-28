import { useEffect, useState } from "react";
import styles from './style/TopicBtn.module.css'

function TopicBtn({ topic, settopic }) {

    const [loginCheck,setLoginChanck] = useState(false);

useEffect(()=>{
    setLoginChanck(sessionStorage.getItem('sessionId') != null)
    console.log(loginCheck)
},[])

    return (
        <div className={styles.Nav}>
            {topic == 0 &&
                <div className={styles.topicdiv}>
                    <div>추천 토픽<div className={styles.bar} /></div>
                    {loginCheck && <div onClick={() => { settopic(1) }} style={{ color: '#999999' }}>즐겨찾기 토픽</div>}
                    <div onClick={() => { settopic(2) }} style={{ color: '#999999' }}>실시간 토픽</div>
                </div>}
            {topic == 1 &&
                <div className={styles.topicdiv}>
                    <div onClick={() => { settopic(0) }} style={{ color: '#999999' }}>추천 토픽</div>
                    {loginCheck && <div>즐겨찾기 토픽<div className={styles.bar} /></div>}
                    <div onClick={() => { settopic(2) }} style={{ color: '#999999' }}>실시간 토픽</div>
                </div>
            }
            {topic == 2 &&
                <div className={styles.topicdiv}>
                    <div onClick={() => { settopic(0) }} style={{ color: '#999999' }}>추천 토픽</div>
                    {loginCheck && <div onClick={() => { settopic(1) }} style={{ color: '#999999' }}>즐겨찾기 토픽</div>}
                    <div>실시간 토픽<div className={styles.bar} /></div>
                </div>
            }


        </div>
    )
}

export default TopicBtn;