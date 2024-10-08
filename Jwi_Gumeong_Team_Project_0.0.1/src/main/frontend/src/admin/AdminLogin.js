import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../cookies/Cookies.js';
import hide from '../icon/24px/hide.png'; //비밀번호 안보임 이미지
import show from '../icon/24px/show.png'; //비밀번호 보임 이미지
import AlarmModal from '../modal/AlarmModal.js';
import styles from './style/AdminLogin.module.css';

function AdminLogin() {

    // 세션화성공
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //모든 정보가 입력되면 버튼 활성화
    const [isButtonActive, setIsButtonActive] = useState(false);
    //비밀번호 보임,안보임 state
    const [showPassword, setShowPassword] = useState(false);
    //로그인 틀릴 시 경고문 저장
    const [loginWarn, setLoginWarn] = useState('');
    let navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    
    useEffect(() => {
        setModalOpen(true);
        setModalContent('관리자 로그인 페이지입니다.');
    }, []);

    const closeModal = () => {
        setModalOpen(false);
    };

    // 눈 아이콘 클릭시 바꾸게 설정하기
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // 엔터 키 다운 이벤트
    const handleEnter = (e) => {
        if (e.key === "Enter") {
            checkAdmin();    
        }
    };

    // 로그인 버튼 클릭 핸들러
    const handleLogin = () => {
        if (email === '') {
            setModalContent('ID를 입력해주세요!');
            setModalOpen(true);
        } else if (password === '') {
            setModalContent('비밀번호를 입력해주세요!');
            setModalOpen(true);
        } else {
            checkAdmin();
        }
    };

    let maxAge = 1800;
    let endTime = Date.now() + maxAge * 1000;

    const checkAdmin = async () => {
        if (email !== '' && password !== '') {
            try {
                const adminData = {
                    adminName: email,
                    adminPassWord: password
                };
                const userResponse = 
                    await axios.post('/admin/login', adminData);
                if(userResponse.data){
                    setCookie('frontCookie', "프론트쿠키",{
                        path: '/',
                        secure: true,
                        maxAge: maxAge
                    });
                    localStorage.setItem('endTime', endTime);
                    navigate('/admin');
                }
                setLoginWarn(userResponse.data.warningMessage);
            } catch (error) {
                console.error('Channel API Error:', error);
                setModalContent('로그인 중 문제가 발생했습니다.');
                setModalOpen(true);
            }
        } else {
            setLoginWarn("이메일과 비밀번호를 제대로 입력해주세요.")
        }
    };

    // 유저정보 체크 로직
    useEffect(() => {
        if (email !== '' && password !== ''){
            setIsButtonActive(true);
        } else if (email === ''){
            setIsButtonActive(false);
        } else if (password === ''){
            setIsButtonActive(false);
        } else if (email === '' && password === ''){
            setIsButtonActive(false);
        }
    }, [email, password]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={styles.section}>
            <div className={styles.loginContainer}>
                <div className={styles.topFont}>관리자 로그인</div>
                {/* 아이디 input */}
                <div className={styles.formGroup}>
                    <p>ID</p>
                    <div className={styles.inputWrapper}>
                        <input
                            style={{marginBottom : '30px'}}
                            type="email"
                            placeholder="이메일을 입력하세요"
                            value={email}
                            onChange={handleEmailChange}
                            onKeyDown={handleEnter}
                        />
                    </div>
                </div>
                {/* 비밀번호 input */}
                <div className={styles.formGroup}>
                    <p>PW</p>
                    <div className={styles.inputWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={handlePasswordChange}
                            onKeyDown={handleEnter}
                        />
                        <img src={showPassword ? show : hide} className={styles.icon} onClick={toggleShowPassword} alt='ㅋㅋ' />
                    </div>
                </div>
                {
                    loginWarn !== '' ? <div className={styles.warning} style={{marginTop : '40px' , marginBottom : '40px'}}>{loginWarn}</div> : <div style={{ marginBottom : '80px'}}></div> 
                }
                <button onClick={() => { handleLogin(); }} className={`${styles.loginButton} ${isButtonActive ? styles.active : ''}`}> 로그인 </button>
            </div>
            {modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    );
}

export default AdminLogin;
