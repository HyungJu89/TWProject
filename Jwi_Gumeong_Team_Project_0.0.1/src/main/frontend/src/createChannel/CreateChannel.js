import { useEffect, useRef, useState } from 'react';
import style from './style/CreateChannel.module.css';

function CreateChannel() {

const [channelUrl,setChannelUrl] = useState(); 




    return (
        <div className={style.createMain}>
            <div className={style.createBody}>
                <div className={style.createTop}>{/* 채널 생성 상단 */}
                    <div className={style.createChannelTitle}>{/* 채널 개설하기 제목 */}
                        <img src='' />
                        <div className={style.createChannelTitleText}>채널 개설하기</div>
                    </div>
                    <div className={style.dashed} />{/* 회색줄 */}
                    <div className={style.createChannel}> {/*개설 할 스트리머 URL 입력부분 */}
                        <div className={style.createChannelText}>개설 할 스트리머 URL입력</div>
                        <input className={style.createChannelInput} placeholder='개설하고 싶은 스트리머의 URL을 넣어주세요.' />
                    </div>
                </div>
                <div className={style.createManager}>{/* 관리자 신청 */}
                    <div className={style.createManagerTitle}>채널 관리자 신청하기</div>
                </div>
                <div className={style.deleteManager}>{/* 관리자 포기 */}
                    <div className={style.deleteManagerTitle}> 채널 관리자 포기하기</div>
                </div>
            </div>
        </div>
    )
}

export default CreateChannel;