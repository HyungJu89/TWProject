import React, { useEffect, useState } from 'react';
import styles from './style/PwInquiry.module.css';
import show from '../icon/24px/show.png'; //비밀번호 보임 이미지
import hide from '../icon/24px/hide.png'; //비밀번호 안보임 이미지
import { useNavigate } from 'react-router-dom';




//비밀번호 찾기 페이지
function PwInquiry() {
    const [email, setEmail] = useState('');
    const [emailCheck, setEmailCheck] = useState('');
    const [certification, setCertification] = useState('인증번호');
    const [isButtonActive, setIsButtonActive] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleEmailCheckChange = (e) => {
        setEmailCheck(e.target.value);
    };

    return(
        <div className={styles.PwInquiryContainer}>
                <div className={styles.topFont}>비밀번호 찾기</div>
                <div className={styles.formGroup}>
                    <p>이메일</p>
                    <div className={styles.inputWrapper}>
                        <input
                            style={{marginBottom : '60px'}}
                            type="email"
                            placeholder="사용할 이메일을 입력하세요"
                            value={email}
                            onChange={handleEmailChange}
                            className={styles.email}
                        />
                        <button className={`${styles.emailButton} ${email !== '' ? styles.active : ''}`}>중복체크</button>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <p>이메일 인증</p>
                    <div className={styles.inputWrapper}>
                        <input
                            style={{marginBottom : '60px'}}
                            type="text"
                            placeholder="인증번호"
                            value={emailCheck}
                            onChange={handleEmailCheckChange}
                            className={styles.email}
                        />
                        <button className={`${styles.emailButton} ${emailCheck !== '' ? styles.active : ''}`}>인증</button>
                    </div>
                </div>
                <button 
                    className={`${styles.loginButton}`} >
                다음
                </button>
        </div>
    );
}


export default PwInquiry;