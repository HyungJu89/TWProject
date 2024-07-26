
import style from './style/ChannelManagement.module.css';
import CreateChannel from './CreateChannel.js'
import ApplyManager from './ApplyManager.js'
import styleManagement from './style/Management.module.css';
import '../App.css'
import { useState } from 'react';

function ChannelManagement() {

    const [openTap, setOpenTap] = useState(0);

    const tapClick = (e) => {
        if (openTap == e) {
            return setOpenTap(0)
        }
        setOpenTap(e)
    }

    return (
        <div className={style.createMain}>
            <div className={style.createBody}>
                <div className={style.container} >{/* 채널 생성 상단 */}
                    <div className={style.createChannelTitle} onClick={() => tapClick(1)}>{/* 채널 개설하기 제목 */}
                        <img src='' />
                        <div className={style.createChannelTitleText}>채널 개설하기</div>
                    </div>

                    {openTap == 1 &&
                        <>
                            <div className={styleManagement.dashed} />{/* 회색줄 */}
                            <CreateChannel />
                        </>
                    }
                </div>
                <div className={style.container}>{/* 관리자 신청 */}
                    <div className={style.createManagerTitle} onClick={() => tapClick(2)}>채널 관리자 신청하기</div>
                    {openTap == 2 &&
                        <>
                            <div className={styleManagement.dashed} />{/* 회색줄 */}
                            <ApplyManager />
                        </>
                    }
                </div>

                <div className={style.container}>{/* 관리자 포기 */}
                    <div className={style.deleteManagerTitle} onClick={() => tapClick(3)}> 채널 관리자 포기하기</div>
                    {openTap == 3 &&
                        <>
                            <div className={styleManagement.dashed} />{/* 회색줄 */}
                            <ApplyManager />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChannelManagement;