/* TODO
    - 로컬히스토리 연결 (근데 이건 채널 완성되고 해도 될듯)
*/

/* eslint-disable */
// ^워링 업애주는 친구 (< 아하 좋은 친구네요~)

import React, { useEffect, useRef, useState } from 'react';
import styles from './style/Header.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// 이미지 import
import Logo from '../icon/logo/Frame 153.png'; // 로고 이미지
import searching from '../icon/24px/searching.png';
import formulation from '../icon/img/formulation-ing.png';
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
import { useSelector } from 'react-redux';
import AlarmModal from '../modal/AlarmModal.js';

function Header({ onClickSearch, onLogout, isLoggedIn }) {
    const userKey = useSelector((state) => state.session.userKey); // 세션 아이디로 가져온 유저 키값
    let [justSearchOn, setJustSearchOn] = useState(false); // 검색창 클릭시 노출되는 모달창 확인
    const [searchInput, setSearchInput] = useState('');
    const [searchInputs, setSearchInputs] = useState('');
    let [recentSearchData, setRecentSearchData] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0); // 안 읽은 알림 개수
    const [notifications, setNotifications] = useState([]); // 알림 데이터
    let navigate = useNavigate();
    let location = useLocation();
    let popModalRef = useRef(null);
    let popinputRef = useRef(null);

    // 알림 데이터를 가져오는 함수
    const fetchNotifications = async () => {
        if (userKey) {
            try {
                const countResponse = await axios.post('/alarm/count/unread', null, { params: { userKey } });
                if (countResponse.data.result === "success") {
                    setUnreadCount(countResponse.data.unreadCount); // 안 읽은 알림 개수 설정
                }
                const listResponse = await axios.post('/alarm/list', null, { params: { userKey } });
                if (listResponse.data.result === "success") {
                    setNotifications(listResponse.data.list); // 알림 리스트 설정
                }
            } catch (error) {
                console.error("알림 가져오기 에러: ", error);
            }
        }
    };

    // 로그인 후 알림 데이터를 가져오기
    useEffect(() => {
        fetchNotifications(); // 로그인 후 알림 데이터를 가져옴
        const intervalId = setInterval(fetchNotifications, 30000); // 30초마다 알림 데이터 업데이트
        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
    }, [userKey]);

    const handleEnter = (e) => {
        if (e.key === "Enter" || e === "enter") {
            onClickPointer(searchInput);
        }
    };

    useEffect(() => {
        {/* 최근검색어 로컬스토리지 생성문 */ }
        let justSearchLocal = localStorage.getItem('search');
        justSearchLocal = JSON.parse(justSearchLocal);
        justSearchLocal != null ? null : localStorage.setItem('search', JSON.stringify([]), []);
    });

    useEffect(() => {
        const popRefSearchEvent = (e) => {
            if (justSearchOn && !popModalRef.current.contains(e.target) && !popinputRef.current.contains(e.target)) {
                setJustSearchOn(false);
            }
        };
        document.addEventListener('mousedown', popRefSearchEvent);
        return () => { document.removeEventListener('mousedown', popRefSearchEvent); };
    }, [justSearchOn]);

    // 어드민 경로로 접속시 헤더 삭제
    if (location.pathname.indexOf('/admin') === 0) {
        return <></>;
    }

    // 아이콘 클릭 or 엔터키 입력시만 작동
    const onClickPointer = () => {
        setSearchInputs(searchInput);
        onClickSearch(searchInput);
        setJustSearchOn(true);
    };

    return (
        <>
            <div className={styles.basicNav}>
                <div className={styles.divWidth}>
                    <Link to="/"><img src={Logo} /></Link>
                </div>
                <div className={styles.inputDiv}>
                    <input
                        ref={popinputRef}
                        onClick={() => { setJustSearchOn(prev => !prev); }}
                        placeholder='검색어를 입력하세요'
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleEnter}
                        value={searchInput}
                    />
                    <img style={{ cursor: 'pointer' }} src={search} onClick={onClickPointer} />
                </div>
                {/* 최근검색어 모달창 */}
                {justSearchOn === true &&
                    <JustSearch
                        searchTerm={searchInputs}
                        setSearchInputs={setSearchInputs}
                        popModalRef={popModalRef}
                        onClickSearch={onClickSearch}
                        recentSearchData={recentSearchData}
                        setRecentSearchData={setRecentSearchData}
                    />
                }
                {isLoggedIn ? (
                    <div className={styles.icon}>
                        <Icon
                            navigate={navigate}
                            userKey={userKey}
                            isLoggedIn={isLoggedIn}
                            notifications={notifications}
                        />
                        <div onClick={onLogout} className={styles.signInBtn}>로그아웃</div>
                    </div>
                ) : (
                    <div className={styles.icon} style={{ justifyContent: 'end' }}>
                        <div onClick={() => { navigate('/signIn') }} className={styles.signInBtn}>로그인</div>
                    </div>
                )}
            </div>
        </>
    );
}

function Icon({ navigate, userKey, notifications }) { /* 로그인 시 노출되는 알림 아이콘 UI */
    let [img, setImg] = useState(notification_deactivation); /*알림 hover 이팩트 변환용*/
    let [showNotifications, setShowNotifications] = useState(false); /* 알림 모달 표시 여부 */
    let [unreadCount, setUnreadCount] = useState(0); // 알림 개수

    // 알림 개수 가져오기
    useEffect(() => {
        const fetchUnreadCount = async () => {
            if (userKey !== null) {
                try {
                    const response = await axios.post('/alarm/count/unread', null, { params: { userKey } });
                    if (response.data.result === "success") {
                        setUnreadCount(response.data.unreadCount);
                    }
                } catch (error) {
                    console.log("알림 개수 가져오기 에러: ", error);
                }
            }
        };
        fetchUnreadCount();

        const intervalId = setInterval(fetchUnreadCount, 30000); // 30초마다 호출
        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
    }, [userKey]);

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
                {unreadCount > 0 && (
                    <div className={styles.redNotRead}>{unreadCount}</div> // 안 읽은 알림이 1개 이상일 때만 보이기
                )}
            </div>
            {showNotifications && <NotificationModal userKey={userKey} notifications={notifications} />}
        </div>
    );
}

function NotificationModal({ userKey, notifications }) { /* 알림 모달 */
    const [activeButton, setActiveButton] = useState(1); /* 현재 활성화된 버튼 상태 */
    const [showDropdown, setShowDropdown] = useState(false); /* more 아이콘 클릭 시 드롭다운 */
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

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
                    <div className={`${styles.tooltipMsg} ${animationStarted ? styles.tooltipAnimation : ''}`}>
                        {message}
                    </div>
                )}
            </div>
        );
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleMoreClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleButtonClick = (buttonNumber) => {
        setActiveButton(buttonNumber);
    };

    // 알림 삭제
    const deleteNotification = async (notificationId) => {
        try {
            const response = await axios.post('/alarm/delete', null, { params: { notificationId } });
            if (response.data.result === 'success') {
                setNotifications(notifications.filter(notification => notification.alarmKey !== notificationId));
            } else {
                setModalContent('알람 삭제에 실패 하였습니다.\n잠시 후 다시 시도해 주세요 ');
                setModalOpen(true);
            }
        } catch (error) {
            console.log("알람 삭제 에러: " + error.message);
        }
    };

    // 알림 읽음
    const onRead = async (notificationId) => {
        try {
            const response = await axios.post('/alarm/read', null, { params: { notificationId } });
            if (response.data.result === 'success') {
                setNotifications(notifications.map(notification =>
                    notification.alarmKey === notificationId ? { ...notification, read: true } : notification));
            } else {
                setModalContent('알람 읽기에 실패 하였습니다.\n잠시 후 다시 시도해 주세요 ');
                setModalOpen(true);
            }
        } catch (error) {
            console.log("알람 1개 읽음 에러: " + error.message);
        }
    };

    // 모두 읽음
    const onAllRead = async () => {
        try {
            await axios.post('/alarm/read/all', null, { params: { userKey } });
            setNotifications(notifications.map(notification => ({ ...notification, read: true })));
        } catch (error) {
            console.log("모두 읽음 에러: " + error.message);
        }
    };

    // 모두 지우기
    const onAllDelete = async () => {
        try {
            await axios.post('/alarm/delete/all', null, { params: { userKey } });
            setNotifications([]);
        } catch (error) {
            console.log("전체 삭제 에러: " + error.message);
        }
    };

    const renderContent = () => {
        let filteredNotifications = notifications.filter(notification => {
            if (activeButton === 1) {
                // 댓글 또는 대댓글일때
                return notification.referenceType === 'post' || notification.referenceType === 'comment';
            } else if (activeButton === 2) {
                // 좋아요일때
                return notification.referenceType.startsWith('like');
            } else if (activeButton === 3) {
                // 문의나 제재내역일때
                return notification.referenceType === 'inquiry' || notification.referenceType === 'system';
            }
            return false;
        });

        // 내용이 없을 때
        if (filteredNotifications.length === 0) {
            let emptyMessage = '';
            if (activeButton === 1) {
                emptyMessage = '소식이 온 댓글이 없어요.';
            } else if (activeButton === 2) {
                emptyMessage = '소식이 온 좋아요가 없어요.';
            } else if (activeButton === 3) {
                emptyMessage = '소식이 온 내용이 없어요.';
            }
            return <div className={styles.emptyNotification}><span>{emptyMessage}</span></div>;
        }

        return filteredNotifications.map((notification, index) => {
            let icon = '';
            let content = '';
            let subContent = '';

            switch (notification.referenceType) {
                case 'post':
                    icon = notification.channelImageUrl || formulation;
                    content = notification.content;
                    subContent = `${notification.nickname}님이 댓글을 달았어요.`;
                    break;
                case 'comment':
                    icon = notification.channelImageUrl || formulation;
                    content = notification.content;
                    subContent = `${notification.nickname}님이 대댓글을 달았어요.`;
                    break;
                case 'like_10':
                case 'like_50':
                case 'like_100':
                    icon = notification.channelImageUrl || n_heart_activation;
                    content = notification.content;
                    subContent = `해당글이 ♥${notification.subContent}개를 받았어요.`; // 좋아요 알림
                    break;
                case 'inquiry':
                    icon = reply;  // 문의 답변
                    content = '문의하신 내용을 답변 받았습니다.';
                    subContent = `고객센터에서 확인 가능합니다.`;
                    break;
                case 'system':
                    icon = formulation;
                    content = `당신의 선함으로 ${notification.nickname}님이 제재를 받았어요!`;
                    subContent = `신고내용 : ${notification.reason}, 대상자가 ${notification.date}일 정지를 받았습니다.`;
                    break;
                default:
                    break;
            }

            return (
                <div className={styles.notificationBox} key={index}>
                    <div className={styles.notificationItem}>
                        <div className={`${styles.notificationDot} ${notification.read ? styles.noDot : ''}`}></div> {/* 안 읽은 알림 */}
                        <img className={styles.iconImg} src={icon} alt="icon" />  {/* 프로필 or 이미지 */}
                        <div className={styles.notificationItemContent} onClick={() => onRead(notification.alarmKey)}> {/* 내용 div onClick는 읽음처리 */}
                            <span className={styles.applyContent}>{content}</span> {/* 게시글 제목 */}
                            <span className={styles.applyId}>{subContent}</span> {/* 알림 설명 */}
                        </div>
                        <img className={styles.deleteIcon} src={deletion} alt="제거 아이콘" onClick={() => deleteNotification(notification.alarmKey)} />
                    </div>
                </div>
            );
        });
    };

    return (
        <div className={styles.notificationModal}>
            <div className={styles.notificationHeader}>
                <div className={styles.notificationTitle}>알림</div>
                <div className={styles.moreBtnContainer}>
                    <img src={more} className={styles.moreBtn} alt="더보기" onClick={handleMoreClick} />
                    {showDropdown && (
                        <div className={styles.dropdownMenu}>
                            <div className={styles.dropdownItem} onClick={onAllRead}>모두 읽음</div>
                            <div className={styles.dropdownItem} onClick={onAllDelete}>알림 전체 삭제</div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.buttonContainer}>
                {/* 버튼이 눌렸을 때 그 버튼을 활성화 시키고 이미지 변경 */}
                <Tooltip message={'댓글&대댓글'}>
                    <div className={styles.imgContainer} onClick={() => handleButtonClick(1)}>
                        <img src={activeButton === 1 ? n_comments_activation : n_comments_deactivation} alt="댓글" />
                    </div>
                </Tooltip>
                <Tooltip message={'좋아요'}>
                    <div className={styles.imgContainer} onClick={() => handleButtonClick(2)}>
                        <img src={activeButton === 2 ? n_heart_activation : n_heart_deactivation} alt="좋아요" />
                    </div>
                </Tooltip>
                <Tooltip message={'신고&고객센터'}>
                    <div className={styles.imgContainer} onClick={() => handleButtonClick(3)}>
                        <img src={activeButton === 3 ? n_service_activation : n_service_deactivation} alt="신고" />
                    </div>
                </Tooltip>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.notificationContent}>
                {renderContent()}
            </div>
            {modalOpen && <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />}
        </div>
    );
}

function JustSearch({ searchTerm, setSearchInputs, popModalRef, onClickSearch, recentSearchData, setRecentSearchData }) { 
    /* 최근 검색어 모달창 */
    let justSearchLocal;
    let asdf = [];

    // 로컬 스토리지에서 최근 검색어 가져오기
    useEffect(() => {
        justSearchLocal = localStorage.getItem('search');
        if (justSearchLocal) {
            justSearchLocal = JSON.parse(justSearchLocal); // JSON 객체로 변환
            setRecentSearchData(justSearchLocal); // 상태에 저장
        }
    }, []);

    // 검색어가 추가될 때 로컬 스토리지 업데이트 (중복 제외 + 최대 10개)
    useEffect(() => {
        if (searchTerm) {
            const maxLength = 40; // 최대 길이
            const maxSlice = 10; // 최대 개수

            // 검색어 길이 제한 체크
            if (searchTerm.length > maxLength) {
                console.log(`검색어가 너무 깁니다. 최대 ${maxLength}자까지 가능합니다.`);
                return;
            }

            let updatedSearches = [...recentSearchData, searchTerm];  // 기존 검색어 + 새로운 검색어
            updatedSearches = Array.from(new Set(updatedSearches));   // 중복 제거

            // 최대 10개 초과 시
            if (updatedSearches.length > maxSlice) {
                updatedSearches = updatedSearches.slice(-maxSlice); // 최신 검색어 10개만 유지
            }

            setRecentSearchData(updatedSearches);
            localStorage.setItem('search', JSON.stringify(updatedSearches)); // 로컬 스토리지에 저장
            setSearchInputs(''); // 검색어 받은걸 초기화시켜서 if문 작동 안 되게 전환
        }
    }, [searchTerm, justSearchLocal]);

    // 검색어 삭제 함수
    const deleteTerm = (term) => {
        let updatedSearches = recentSearchData.filter(item => item !== term);  // 해당 검색어 제외
        setRecentSearchData(updatedSearches);
        localStorage.setItem('search', JSON.stringify(updatedSearches));  // 로컬 스토리지에 저장
    };

    return (
        <div className={styles.JustSearchBase} ref={popModalRef}>
            <h4>최근검색어</h4>
            {recentSearchData.length !== 0 ? (
                <div className={styles.mainDiv}>
                    {recentSearchData?.slice().reverse().map((term, i) => (
                        <div className={styles.list} key={i}>
                            <div>
                                <img src={searching} /> {/* 서치 icon */}
                                <p onClick={() => { onClickSearch(term); }}>{term}</p> {/* 글내용 */}
                                <img
                                    style={{ height: '14px', cursor: 'pointer' }}
                                    src={deletion}
                                    onClick={() => { deleteTerm(term); }} // 삭제 icon
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>최근 검색 내역이 없어요.</p>
            )}
        </div>
    );
}

export default Header;
