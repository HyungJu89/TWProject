import React, { useEffect, useState } from 'react';
import show from '../icon/24px/show.png'; //비밀번호 보임 이미지
import hide from '../icon/24px/hide.png'; //비밀번호 안보임 이미지
import styles from './style/LoginChecks.module.css';

function LoginChecks(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); //비밀번호 보임,안보임 state 
    const [isButtonActive, setIsButtonActive] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

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

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return(
        <>
            <div className={styles.MyPageContainer}>
                <div className={styles.topFont}>로그인 검증</div>
                <div className={styles.topFont2}>정보를 수정 하기 전 본인 인증을 위해 한번 더 로그인을 해주세요.</div>
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
                        else {props.setLoginCheck(true)}
                        // if(이메일과 비밀번호가 적혀있으면){대충 엑시오스 요청해서 데이터베이스랑 데이터대조 후 로그인진행}
                    }} className={`${styles.loginButton} ${isButtonActive ? styles.active : ''}`}>다음</button>
            </div>
        </>
    );
}

export default LoginChecks;