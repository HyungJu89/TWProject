import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './style/PwInquiry.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import AlarmModal from '../modal/AlarmModal.js';

// 비밀번호 찾기 페이지
function PwInquiry({ onLogout }) {
    // 이메일 인증 유효성 검사 완료 체크
    const [emailCerti, setEmailCerti] = useState(false);
    const [certiNum, setCertiNum] = useState('');
    const [email, setEmail] = useState('');

    const pwIssued = async () => {
        const userData = {
            email: email,
        };
        try {
            const response = await axios.post('/issuedPw', userData);
            // console.log(response.data);
            setCertiNum(response.data);
        } catch (error) {
            console.error('Channel API Error:', error);
        }
    };

    useEffect(() => {
        if (emailCerti) {
            pwIssued();
        }
    }, [emailCerti]);

    return (
        <div className={styles.pwInquiryContainer}>
            <div className={styles.topFont}>비밀번호 찾기</div>
            {
                emailCerti ? <PwIssue certiNum={certiNum} onLogout={onLogout} /> : <EmailAvailable setEmailCerti={setEmailCerti} email={email} setEmail={setEmail} />
            }
        </div>
    );
}

function EmailAvailable({ setEmailCerti, setEmail, email }) {
    // email 관련 state
    const [emailWarning, setEmailWarning] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);
    // 랜덤으로 발송한 인증번호
    const [certification, setCertification] = useState('');
    // 유저가 친 인증번호
    const [userCertification, setUserCertification] = useState('');
    // 인증번호 확인
    const [checkCerti, SetCheckCerti] = useState(false);
    // 인증상태 보여주기
    const [showCerti, SetShowCerti] = useState(false);
    // 인증횟수 확인
    const [countCerti, setCountCerti] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(''); // 모달 내용

    // 이메일 비밀번호 유효성 검사
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    useEffect(() => {
        setModalOpen(true);
        setModalContent('비밀번호 찾기를 위해 이메일 인증이 필요합니다.');
    }, []);

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value.replace(/\s/g, '');
        setEmail(value);
    };

    const handleUserCertification = (e) => {
        const value = e.target.value.replace(/\s/g, '');
        setUserCertification(value);
    };

    // 이메일 인증번호 발송 로직
    const handleEmailCheck = () => {
        if (countCerti) {
            axios.get('/certification2', { params: { email: email } }).then((response) => {
                setCertification(response.data);
            })
                .catch(error => {
                    console.error('Channel API Error:', error);
                    throw error;
                })
            setCountCerti(false);
        }
        if (!countCerti) {
            setEmailWarning('이미 인증번호를 보냈습니다. 이메일을 확인 해주세요.');
            setModalContent('이미 인증번호를 보냈습니다. 이메일을 확인 해주세요.');
            setModalOpen(true);
        }
    };

    // 인증번호 대조 로직
    const contrastCertification = () => {
        if (certification === userCertification) {
            SetCheckCerti(true);
        } else {
            SetCheckCerti(false);
        }
    };

    // 이메일 중복검사 로직
    const emailTest = async (userEmail) => {
        if (userEmail !== '') {
            axios.get('/signUp/emailTest', { params: { email: userEmail } }).then((response) => {
                if (!response.data) {
                    setEmailWarning('인증번호를 전송했습니다. 메일함에서 확인해주세요.');
                    handleEmailCheck();
                    setEmailCheck(true);
                } else if (!emailChecks(userEmail)) {
                    setEmailWarning('이메일 형식이 맞지 않습니다.');
                    setModalContent('이메일 형식이 맞지 않습니다.');
                    setModalOpen(true);
                    return;
                } else if (response.data) {
                    setEmailWarning('존재하지 않는 이메일입니다.');
                    setModalContent('존재하지 않는 이메일입니다.');
                    setModalOpen(true);
                    setEmailCheck(false);
                }
            })
                .catch(error => {
                    console.error('Channel API Error:', error);
                    setModalContent('서버와의 통신에 문제가 발생했습니다.');
                    setModalOpen(true);
                })
        }
    };

    // 이메일 유효성 검사 로직
    const emailChecks = (email) => {
        if (emailRegEx.test(email)) {
            setEmailWarning('');
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            <div className={styles.formGroup}>
                <p>이메일</p>
                <div className={styles.inputWrapper}>
                    <input
                        style={{ marginBottom: '10px' }}
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={handleEmailChange}
                        className={styles.email}
                    />
                    <button onClick={() => { emailTest(email) }} className={`${styles.emailButton} ${email !== '' ? styles.active : ''}`}>이메일 인증</button>
                </div>
            </div>
            {
                emailWarning === '' ? <div style={{ marginBottom: '50px' }}></div> : <div className={`${styles.emailWarn} ${emailCheck ? styles.active : ''}`} style={{ marginBottom: '30px' }}>{emailWarning}</div>
            }
            <div className={styles.formGroup}>
                <p>이메일 인증</p>
                <div className={styles.inputWrapper}>
                    <input
                        style={{ marginBottom: '10px' }}
                        type="text"
                        placeholder="인증번호"
                        value={userCertification}
                        onChange={handleUserCertification}
                        className={styles.email}
                    />
                    <button onClick={() => { contrastCertification(); SetShowCerti(true); }} className={`${styles.emailButton} ${userCertification !== '' ? styles.active : ''}`}>인증</button>
                </div>
            </div>
            {
                showCerti ? checkCerti && userCertification !== '' ? <div className={styles.certifiOk} style={{ marginBottom: '30px' }}>인증되었습니다.</div> : <div className={styles.emailWarn} style={{ marginBottom: '30px' }}>인증번호가 알맞지 않습니다.</div> : <div style={{ marginBottom: '50px' }}></div>
            }
            <button onClick={() => {
                if (checkCerti) {
                    setEmailCerti(true);
                } else {
                    setModalContent('이메일을 인증 해주세요!');
                    setModalOpen(true);
                }
            }} className={`${styles.loginButton} ${checkCerti ? styles.active : ''}`}>다음</button>

            {modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </>
    );
}

function PwIssue({ certiNum, onLogout }) {
    const navigate = useNavigate();
    return (
        <div>
            <div style={{ fontSize:'16px', padding:'56px'}}><div style={{ display:'flex', justifyContent:'center'}} className={styles.pwIssueInform}><div>앞서 인증하신 </div><div style={{ color:"#FF8901", fontWeight:"600" }}>이메일로 임시 비밀번호를 발행</div><div>해 드렸습니다.</div></div>
            <div className={styles.pwIssueInform}><div>로그인 후 꼭 비밀번호를 변경해주세요</div></div></div>
            <button style={{ marginTop: '60px' }} className={`${styles.loginButton} ${styles.active}`} onClick={()=>{onLogout(); navigate('/signIn');}}>로그인하러가기</button>
        </div>
    );
}

export default PwInquiry;
