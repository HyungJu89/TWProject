import style from './style/ChannelManagement.module.css';
import CreateChannel from './CreateChannel.js';
import ApplyManager from './ApplyManager.js';
import GiveUpManager from './GiveUp.js';
import styleManagement from './style/Management.module.css';
import open_channel_32 from '../icon/32px/open-channel-32.png';
import enroll from '../icon/32px/enroll.png';
import give_up from '../icon/32px/give-up.png';
import '../App.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlarmModal from '../modal/AlarmModal.js';

function ChannelManagement() {
    let navigate = useNavigate();
    const location = useLocation();
    const { ManagementChannelId } = location.state || {};
    const [openTap, setOpenTap] = useState(0);
    const [v2ComingSoon, setV2ComingSoon] = useState(false);//2차 버전에서 다시 부활
    // 모달 상태
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    // 닫기
    const [onClose, setOnClose] = useState(null);

    const tapClick = (e) => {
        if (openTap === e) {
            return setOpenTap(0);
        }
        setOpenTap(e);
    };

    useEffect(() => {
        // PageCheck.js를 통해서 미개설 게시판 개설 추천하는 로직
        if (ManagementChannelId) {
            setOpenTap(1);
        } else {
            setOpenTap(0);
        }
    }, [ManagementChannelId]);

    // 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
        if (onClose) {
            onClose();
        }
    }

    // 모달 열기
    const openModal = (content, close = null) => {
        setModalContent(content);
        // 닫으면 불러와 null을!
        setOnClose(() => close);
        setModalOpen(true);
    };

    useEffect(()=>{
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if (!sessionIdJson) {
            return openModal('로그인 되어있지않습니다. ', () => navigate(-1));
        }
    })

    return (
        <div className={style.createMain}>
            <div className={style.createBody}>
                <div className={style.container}>{/* 채널 생성 상단 */}
                    <div className={style.createChannelTitle} onClick={() => tapClick(1)}>{/* 채널 개설하기 제목 */}
                        <img src={open_channel_32} alt="채널 개설하기" />
                        <div className={style.createChannelTitleText}>채널 개설하기</div>
                    </div>
                    {openTap === 1 &&
                        <>
                            <div className={styleManagement.dashed} />{/* 회색줄 */}
                            <CreateChannel ManagementChannelId={ManagementChannelId} openModal={openModal} />
                        </>
                    }
                </div>
                {
                    v2ComingSoon && 
                        <>
                            <div className={style.container}>{/* 관리자 신청 */}
                                <div className={style.createChannelTitle} onClick={() => tapClick(2)}>
                                    <img src={enroll} alt="관리자 신청" />
                                    <div className={style.createChannelTitleText}>채널 관리자 신청하기</div>
                                </div>
                                {openTap === 2 &&
                                    <>
                                        <div className={styleManagement.dashed} />{/* 회색줄 */}
                                        <ApplyManager openModal={openModal} />
                                    </>
                                }
                            </div>
                            <div className={style.container}>{/* 관리자 포기 */}
                                <div className={style.createChannelTitle} onClick={() => tapClick(3)}> 
                                    <img src={give_up} alt="관리자 포기" />
                                    <div className={style.createChannelTitleText}>채널 관리자 포기하기</div>
                                </div>
                                {openTap === 3 &&
                                    <>
                                        <div className={styleManagement.dashed} />{/* 회색줄 */}
                                        <GiveUpManager openModal={openModal} />
                                    </>
                                }
                            </div>
                        </>
                }
            </div>
            {modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    );
}

export default ChannelManagement;
