import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './style/SignIn.module.css';
import show from '../icon/24px/show.png'; //비밀번호 보임 이미지
import hide from '../icon/24px/hide.png'; //비밀번호 안보임 이미지
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //모든 정보가 입력되면 버튼 활성화
    const [isButtonActive, setIsButtonActive] = useState(false);
    //비밀번호 보임,안보임 state
    const [showPassword, setShowPassword] = useState(false);
    //로그인 유저정보 맞는지 대조하고 결과값 저장하는 state 
    const [loginCheck, setLoginCheck] = useState(false);
    const [loginWarn, setLoginWarn] = useState('');
    let navigate = useNavigate();
    // 눈 아이콘 클릭시 바꾸게 설정하기
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    //엔터 키 다운 이벤트
    const handleEnter = (e) => {
        if (e.key === "Enter") {
        handleLogin();
        }
    };
          // 로그인 버튼 클릭 핸들러
    const handleLogin = () => {
        if (loginCheck) {
            alert('로그인 성공');
            navigate('/');
        } else if (email === '') {
            alert('이메일을 입력해주세요!');
        } else if (password === '') {
            alert('비밀번호를 입력해주세요!');
        } else if(!loginCheck){
            setLoginWarn('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.')
        } else {
            alert('로그인 실패');
        }
    };
    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsButtonActive(true);
            axios.get('/signIn/userCheck', { params: { email: email, pw : password } }).then((response) => {
                setLoginCheck(response.data);
            })
                .catch(error => {
                    console.error('Channel API Error:', error);
                    throw error;
            })
        }
        else if (email == '') {setIsButtonActive(false); } 
        else if (password == '') {setIsButtonActive(false);}                        
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
                <div className={styles.topFont}>로그인</div>
                {/* 아이디 input */}
                <div className={styles.formGroup}>
                    <p>이메일</p>
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
                    <p>비밀번호</p>
                    <div className={styles.inputWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={handlePasswordChange}
                            onKeyDown={handleEnter}
                        />
                        <img src={showPassword ? show : hide} className={styles.icon} onClick={toggleShowPassword} />
                    </div>
                </div>
                {
                    loginWarn !== '' ? <div className={styles.warning} style={{marginTop : '40px' , marginBottom : '40px'}}>{loginWarn}</div> : <div style={{ marginBottom : '80px'}}></div> 
                }
                <button 
                onClick={
                    () => {
                        handleLogin();
                    }}  
                className={`${styles.loginButton} ${isButtonActive ? styles.active : ''}`}>
                로그인
                </button>
                <div className={styles.help}><h6 onClick={() => { navigate('/signUp') } }>회원가입</h6><h6>|</h6><h6 onClick={() => { navigate('/pwInquiry') } }>비밀번호 찾기</h6></div>
            </div>
        </div>
    );
}

export default SignIn;