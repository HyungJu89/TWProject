import React, { useEffect, useState } from 'react';
import styles from './style/SignIn.module.css';
import show from '../icon/24px/show.png'; //비밀번호 보임 이미지
import hide from '../icon/24px/hide.png'; //비밀번호 안보임 이미지

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false); //비밀번호 보임,안보임 state
    const [loginCheck, setLoginCheck] = useState(false);

    // 눈 아이콘 클릭시 바꾸게 설정하기
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsButtonActive(true);
        } else {
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
                        />
                        <img src={showPassword ? show : hide} className={styles.icon} onClick={toggleShowPassword} />
                    </div>
                </div>
                <button onClick={
                    () => {
                        if (email == '') { alert('이메일을 입력해주세요!'); }
                        else if (password == '') { alert('비밀번호를 입력해주세요!'); }
                        // if(이메일과 비밀번호가 적혀있으면){대충 엑시오스 요청해서 데이터베이스랑 데이터대조 후 로그인진행}
                    }} className={`${styles.loginButton} ${isButtonActive ? styles.active : ''}`}>로그인</button>
                <div className={styles.help}><h6>회원가입</h6><h6>|</h6><h6>비밀번호 찾기</h6></div>
            </div>
        </div>
    );
}

export default SignIn;