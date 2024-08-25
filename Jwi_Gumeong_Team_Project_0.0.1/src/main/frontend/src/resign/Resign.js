import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import style from './style/Resign.module.css';
import checkImg from '../icon/24px/check-deactivation.png';
import checkingImg from '../icon/24px/check-activation.png';
import AlarmTwoModal from '../modal/AlarmTwoModal.js';
import AlarmModal from '../modal/AlarmModal.js';

function Resign({ onLogout }) {
    const userKey = useSelector((state) => state.session.userKey);
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [alarmContent, setAlarmContent] = useState('');
    const [isAlarmOpen, setIsAlarmOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 유저 키가 없으면 리턴
        if (!userKey) {
            navigate('/signin'); // userKey가 없으면 로그인 페이지로 돌아가랏!!
            return;
        }
        axios.post('/user/email', null, { params: { userKey: userKey } })
        .then(response => {
            if (response.data.result === "success") {
                setEmail(response.data.email);
            } else {
                console.log("유저 정보 가져오기 실패");
            }
        })
        .catch(error => {
            console.log("유저 정보 가져오기 에러 : " + error.message);
        });
    }, [userKey]);

    const checkClick = () => {
        setIsChecked(prevState => !prevState);
    }

    const resignClick = () => {
        if (isChecked) {
            setIsModalOpen(true);
        }
    };

    const modalClose = (action) => {
        setIsModalOpen(false);
        if (action === 'confirm') {
            if (!userKey) return;
            axios.post('/user/account/resign', null, { params: { userKey: userKey } })
                .then(response => {
                    if (response.data.result === "success") {
                        setAlarmContent('탈퇴에 성공하셨습니다.');
                        setIsAlarmOpen(true);
                    } else {
                        setAlarmContent('탈퇴에 실패하였습니다. 다시 시도해 주세요.');
                        setIsAlarmOpen(true);
                    }
                })
                .catch(error => {
                    console.log("탈퇴 에러 : " + error.message);
                    setAlarmContent("탈퇴 도중 에러가 발생하였습니다. 관리자에게 문의 해 주세요.");
                    setIsAlarmOpen(true);
                });
        }
    };

    const alarmClose = () => {
        setIsAlarmOpen(false);
        if (alarmContent === '탈퇴에 성공하셨습니다.') {
            onLogout();
            navigate('/signin');
        } else {
            window.location.reload();
        }
    };

    return(
        <div className={style.resignContainer}>
            <div className={style.resignBox}>
                <div className={style.resignMain}>
                    <div className={style.resignTitle}>회원 탈퇴</div>
                    <div className={style.check}>회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.</div>
                    <div className={style.reCheck}>사용하고 계신 아이디(<span className={style.email}>{email}</span>)는 탈퇴할 경우 재사용 및 복구가 불가능합니다.</div>
                    {/* 주의사항 박스 */}
                    <div className={style.cautionContainer}>
                        <div className={style.cautionBox}>
                            <div className={style.cautionOne}>
                                <div className={style.cautionTitle}>탈퇴 후 회원정보 및 이용기록은 모두 삭제됩니다.</div>
                                <li>회원탈퇴 시 사용자의 기록은 삭제됩니다.</li>
                                <li>작성한 게시글도 삭제됩니다.</li>
                                <li>채널 관리자라면 관리자 권한도 삭제 됩니다.</li>
                            </div>
                            <div className={style.cautionTwo}>
                                <div className={style.cautionTitle}>회원탈퇴 신청 후 15일 이내로 복구 가능합니다.</div>
                                <li>탈퇴한 아이디는 15일 이내 복구하지 않으면 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.</li>
                            </div>
                        </div>
                    </div>
                    <div className={style.checkBox}>
                        <div className={style.checkOk}>위 내용을 동의 하십니까?</div>
                        <div className={style.checkImgBox} onClick={checkClick}>
                        <img src={isChecked ? checkingImg : checkImg} alt='체크 이미지'/>
                            <div>위 주의사항을 숙지했으며 동의합니다.</div>
                        </div>
                    </div>
                    <div className={style.buttonContainer}>
                        <div className={`${style.resignButton} ${isChecked ? style.active : ''}`} onClick={resignClick}>
                            탈퇴하기
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <AlarmTwoModal
                    content={
                        <span>탈퇴 시 <span style={{ color: '#FF8901' }}>15일 내 복구 가능</span>하며,<br/> 기간내 복구 하지 않을 시 재사용 및 복구가 불가능 합니다.</span>
                    }
                    onClose={modalClose}
                    confirmText="탈퇴하기"
                    cancelText="취소"
                />
            )}
            {isAlarmOpen && (
                <AlarmModal
                    content={alarmContent}
                    onClose={alarmClose}
                />
            )}
        </div>
    )
}

export default Resign;