/* TODO
    - 로컬히스토리 연결 (근데 이건 채널 완성되고 해도 될듯)
*/

/* eslint-disable */
// ^워링 업애주는 친구 (< 아하 좋은 친구네요~)

import React, { useEffect, useState } from 'react';
import styles from './style/Header.module.css';
import {Link, useNavigate, useLocation} from 'react-router-dom';
//이미지 import
import Logo from '../icon/logo/logo.png'; //로고 이미지
import searching from '../icon/24px/searching.png';
import asking from '../icon/img/ask-ing.png';
import reply from '../icon/img/reply-ing.png';
import report from '../icon/img/report-ing.png';
import deletion from '../icon/14px/deletion.png';
import search from '../icon/24px/search.png';
import Open_channel from '../icon/24px/Open-channel.png';
import notification_activation from '../icon/24px/notification-activation.png';
import notification_deactivation from '../icon/24px/notification-deactivation.png';
import n_comments_activation from '../icon/32px/n-comments-activation.png';
import n_comments_deactivation from '../icon/32px/n-comments-deactivation.png';
import n_heart_activation from '../icon/32px/n-heart-activation.png';
import n_heart_deactivation from '../icon/32px/n-heart-deactivation.png';
import n_service_activation from '../icon/32px/n-service-activation.png';
import n_service_deactivation from '../icon/32px/n-service-deactivation.png';
import more from '../icon/24px/more.png';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo,fetchSessionId } from '../slice/loginSlice.js';

function Header({onClickSearch, onLogout, isLoggedIn}) {
    let [justSearchOn, setJustSearchOn] = useState(false); //검색창 클릭시 노출되는 모달창 확인
    const [searchInput,setSearchInput] = useState('');
    const userKey = useSelector((state) => state.session.userKey); // 세션 아이디로 가져온 유저 키값
    let [adminLogin] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();
    if(location.pathname.indexOf('/admin') === 0 ){
        adminLogin = true;
    }
    useEffect(() => {
        {/* 최근검색어 미완성 */ }
        let justSearchLocal = localStorage.getItem('search')
        justSearchLocal = JSON.parse(justSearchLocal)
        justSearchLocal != null ? null : localStorage.setItem('search', JSON.stringify([])
            , [])
    })

    const onClickPointer = () => {
        onClickSearch(searchInput)
    }

    return (
        <>
            <div className={styles.basicNav}>
                <div className={styles.divWidth}><Link to="/"><img src={Logo} /></Link></div>
                <div className={styles.inputDiv}>
                    <input onClick={() => { setJustSearchOn(true) }} onBlur={()=>{setJustSearchOn(false)}}placeholder='검색어를 입력하세요' onChange={(e)=>setSearchInput(e.target.value)} />
                    <img style={{cursor: 'pointer'}} src={search} onClick={onClickPointer}/>
                </div>
                {justSearchOn == true ? <JustSearch /> : null} {/* 최근 검색 모달*/}
                    {isLoggedIn ? (
                        <div className={styles.icon}>
                            <Icon navigate={navigate} userKey={userKey} />
                            <div onClick={onLogout} className={styles.signInBtn}>로그아웃</div>
                        </div>
                    ) : (
                        <div className={styles.icon} style={{justifyContent:'end'}}>
                        <div onClick={() => { { adminLogin !== true ? navigate('/signIn') : navigate('/admin/login') } }} className={styles.signInBtn}>로그인</div>
                        </div>
                    )}
            </div>
        </>
    );
}

function Icon({navigate, userKey}) { /* 로그인 시 노출되는 알림 아이콘 UI */
    let [img, setImg] = useState(notification_deactivation); /*알림 hover 이팩트 변환용*/
    let [showNotifications, setShowNotifications] = useState(false); /* 알림 모달 표시 여부 */

    return (
        <div className={styles.iconContainer}>
            <div className={styles.icon_notification}>
                <img onClick={() => { navigate('/channelManagement') }} src={Open_channel} alt="채널 이동" />
            </div>
            <div className={styles.icon_notification}
                onMouseEnter={() => setImg(notification_activation)}
                onMouseLeave={() => setImg(notification_deactivation)}
                onClick={() => setShowNotifications(!showNotifications)}>
                <img src={img} alt="Notification" />
            </div>
            {showNotifications && <NotificationModal userKey={userKey} />}
        </div>
    );
}

function NotificationModal({ userKey }) { /* 알림 모달찰 */
    const [activeButton, setActiveButton] = useState(1); /* 현재 활성화된 버튼 상태 */
    const [showDropdown, setShowDropdown] = useState(false); /* more 아이콘 클릭 시 드롭다운 */
    const [notifications, setNotifications] = useState([]);

    const handleMoreClick = () => {
        setShowDropdown(!showDropdown);
    };

    useEffect(() => {
        if (userKey) {
            getNotifications();
        }
    }, [userKey, activeButton]);

    const getNotifications = async () => {
        try {
            const response = await axios.get(`아직 없는 url`);
            setNotifications(response.data);
        } catch (error) {
            console.error('알림 Axios 에러:', error);
        }
    };

    // 툴팁
    const Tooltip = ({ children, message }) => {
        const [visible, setVisible] = useState(false);
        const [animationStarted, setAnimationStarted] = useState(false);
    
        useEffect(() => {
            if (visible) {
                const timer = setTimeout(() => {
                    setAnimationStarted(true);
                }, 1000); // 1초 뒤에 애니메이션 시작
                return () => clearTimeout(timer);
            }
        }, [visible]);
    
        // 마우스 올렸을 때
        const handleMouseEnter = () => {
            setVisible(true);
            setAnimationStarted(false);
        };
    
        // 마우스가 나갔을 때
        const handleMouseLeave = () => {
            setVisible(false);
            setAnimationStarted(false);
        };
    
        return (
            <div className={styles.tooltip} onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {children}
                {visible && (
                    <div className={`${styles.tooltipMsg} ${
                            animationStarted ? styles.tooltipAnimation : ''}`}>
                        {message}
                    </div>
                )}
            </div>
        );
    };

    const handleButtonClick = (buttonNumber) => {
        setActiveButton(buttonNumber);
    };

    /* 내용 배열로 변경 */
    const renderContent = () => {
        let notifications = [];
        switch (activeButton) {
            case 1:
                notifications = [
                    {
                        icon: asking,
                        content: "공무원이 축하해야 할까?",
                        id: "충주시님이 댓글을 달았어요."
                    },
                    {
                        icon: reply,
                        content: "공무원이 축하해야 할까?",
                        id: "충주시님이 댓글을 달았어요."
                    },
                    {
                        icon: report,
                        content: "공무원이 축하해야 할까?",
                        id: "충주시님이 댓글을 달았어요."
                    },
                    {
                        icon: report,
                        content: "공무원이 축하해야 할까?",
                        id: "충주시님이 댓글을 달았어요."
                    },
                    {
                        icon: report,
                        content: "공무원이 축하해야 할까?",
                        id: "충주시님이 댓글을 달았어요."
                    },
                    {
                        icon: report,
                        content: "공무원이 축하해야 할까?",
                        id: "충주시님이 댓글을 달았어요."
                    },
                    {
                        icon: report,
                        content: "공무원이 축하해야 할까?",
                        id: "충주시님이 댓글을 달았어요."
                    },
                    {
                        icon: report,
                        content: "공무원이 축하해야 할까?",
                        id: "충주시님이 댓글을 달았어요."
                    },
                    {
                        icon: report,
                        content: "공무원이 축하해야 할까?",
                        id: "충주시님이 댓글을 달았어요."
                    },
                    {
                        icon: report,
                        content: "공무원이 축하해야 할까?",
                        id: "충주시님이 댓글을 달았어요."
                    },
                    {
                        icon: report,
                        content: "공무원이 축하해야 할까?",
                        id: "충주시님이 댓글을 달았어요."
                    }
                ];

                // 배열이 비어있을 경우 (알림이 없을 때)
                if (notifications.length === 0) {
                    return (
                        <div className={styles.emptyNotification}>
                            <span>소식이 온 댓글이 없어요.</span>
                        </div>
                    );
                }
                break;
            case 2:
                notifications = [
                    {
                        icon: asking,
                        content: "성우가 다른 성우 ARS를 들었을 때 찐반응",
                        id: "무야호님이 댓글을 달았어요."
                    }
                ];
                if (notifications.length === 0) {
                    return (
                        <div className={styles.emptyNotification}>
                            <span>소식이 온 좋아요가 없어요.</span>
                        </div>
                    );
                }
                break;
            case 3:
                notifications = [];
                if (notifications.length === 0) {
                    return (
                        <div className={styles.emptyNotification}>
                            <span>소식이 온 내용이 없어요.</span>
                        </div>
                    );
                }
                break;
            default:
                return null;
        }
        return (
            <div className={styles.notificationBox}>
                {notifications.map((notification, index) => (
                    <div key={index} className={styles.notificationItem}>
                        <div className={styles.notificationDot}></div> {/* 안 읽은 알림 */}
                        <img src={notification.icon} alt="icon" />  {/* 프로필 or 이미지 */}
                        <div className={styles.notificationItemContent}> {/* 내용 div */}
                            <span className={styles.applyContent}>{notification.content}</span> {/* 게시글 제목 */}
                            <span className={styles.applyId}>{notification.id}</span> {/* 알림 설명 */}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.notificationModal}>
            <div className={styles.notificationHeader}>
                <div className={styles.notificationTitle}>알림</div>
                <div className={styles.moreBtnContainer}>
                    <img src={more} className={styles.moreBtn} alt="더보기" onClick={handleMoreClick} />
                    {showDropdown && (
                        <div className={styles.dropdownMenu}>
                            <div className={styles.dropdownItem}>모두 읽음</div>
                            <div className={styles.dropdownItem}>알림 전체 삭제</div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.buttonContainer}>
                {/* 버튼이 눌렸을 때 그 버튼을 활성화 시키고 이미지 변경 */}
                <Tooltip message={'댓글&대댓글'}>
                    <div className={styles.imgContainer} 
                    onClick={() => handleButtonClick(1)}>
                        <img
                            src={activeButton === 1 ? n_comments_activation : n_comments_deactivation}
                            alt="댓글"
                        />
                    </div>
                </Tooltip>
                <Tooltip message={'좋아요'}>
                    <div className={styles.imgContainer} 
                    onClick={() => handleButtonClick(2)}>
                        <img
                            src={activeButton === 2 ? n_heart_activation : n_heart_deactivation}
                            alt="좋아요"
                        />
                    </div>
                </Tooltip>
                <Tooltip message={'신고&고객센터'}>
                    <div className={styles.imgContainer}
                    onClick={() => handleButtonClick(3)}>
                        <img
                            src={activeButton === 3 ? n_service_activation : n_service_deactivation}
                            alt="신고"
                        />
                    </div>
                </Tooltip>
            </div>

            <div className={styles.divider}></div>
            <div className={styles.notificationContent}>
                {renderContent()}
            </div>
        </div>
    );
}

function JustSearch() { /* 최근 검색어 모달창 */
    useEffect(() => {
        {/* 최근검색어 미완성 */ }
        let justSearchLocal = localStorage.getItem('search') //최근검색어 로컬스토리지 생성
        justSearchLocal = JSON.parse(justSearchLocal) // JSON 오브젝트 저장
        // justSearchLocal.push('props...방금 검색한거 여기 추가') 
        justSearchLocal = new Set(justSearchLocal) // 중복검사
        justSearchLocal = Array.from(justSearchLocal) // 다시 array 변환
        localStorage.setItem('search', JSON.stringify(justSearchLocal))
    }, [])

    let [임시, set임시] = useState(true) //나중에... 최근 검색어 on/off로 바꿔야함
    return (
    <div className={styles.JustSearchBase}><h4>최근검색어</h4>
            {임시 === true ?
                <div className={styles.mainDiv}>
                    <div className={styles.list}>
                    {/* 서치 icon */} <div><img src={searching} /> 
                    {/* 글내용 */}    <p>1saf</p> 
                    {/* 삭제 icon */} <img style={{height:'14px', cursor : 'pointer'}} src={deletion} /></div>
                    </div></div>
                : <p>최근 검색 내역이 없어요.</p>}
    </div>
    )
}
export default Header;
