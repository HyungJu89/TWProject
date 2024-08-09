import React, { useEffect, useState } from 'react';
import styles from './style/InfoEdit.module.css';
import show from '../icon/24px/show.png'; //비밀번호 보임 이미지
import hide from '../icon/24px/hide.png'; //비밀번호 안보임 이미지
import LoginChecks from './LoginChecks.js';
import { useNavigate } from 'react-router-dom';


//정보수정 페이지
function InfoEdit() {
    const [nickname, setNickname] = useState('');
    const [userInput, setUserInput] = useState(0);
    const [password, setPassword] = useState('');//비밀번호 입력값 저장용
    const [passwordCheck, setpasswordCheck] = useState('');//비밀번호 재확인 입력값 저장용
    const [samePassword, setSamePassword] = useState(false);//대조 유효검사 후 true,false값 저장용
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false); //비밀번호 보임,안보임 state
    const [showPasswordCheck, setShowPasswordCheck] = useState(false); //비밀번호 보임,안보임 state
    const [LoginCheck, setLoginCheck] = useState(false);
    const navigate = useNavigate();
    const handleNickname = (e) => {
        if (e.target.value.length == 0 || e.target.value.length <= 8) {
            setNickname(e.target.value);
            setUserInput(e.target.value.length);
            setIsButtonActive(true);
            if (e.target.value.length == 0) {
                setIsButtonActive(false);
            }
        }
        if (e.target.value.length >= 9) {
            alert('닉네임은 8자 이하만 사용가능 합니다!');
            
        }
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPasswordCheck = () => {
        setShowPasswordCheck(!showPasswordCheck);
    };
    //input에 넣는값으로 state바꿔주는 함수
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    //input에 넣는값으로 state바꿔주는 함수
    const handlepasswordCheckChange = (e) => {
        setpasswordCheck(e.target.value);
    };


    useEffect(() => {
        if (passwordCheck == password) {
            setSamePassword(true);
        } else {
            setSamePassword(false);
        }
    }, [password, passwordCheck]);


    return (
        <>
        {
            LoginCheck ?
            
            <div className={styles.MyPageContainer}>
            <div className={styles.topFont}>정보 수정</div>

            <div className={styles.formGroup}>
                <p>닉네임</p>
                <div className={styles.inputWrapper}>
                    <input
                        style={{ marginBottom: '10px' }}
                        type="text"
                        placeholder="변경 할 닉네임을 입력하세요."
                        value={nickname}
                        onChange={handleNickname}
                    />
                    {
                        userInput !== 0 ? <div className={styles.icon} style={{ color: '#999999' }}>{'('}{userInput}/8{')'}</div> : ''
                    }
                </div>
                <div className={`${styles.nicknameCheck} ${isButtonActive ? styles.active : ''}`}>{isButtonActive ? '사용 가능한 닉네임 입니다' : '사용 불가능한 닉네임 입니다.'}</div>
            </div>
            <div className={styles.formGroup}>
                <p>비밀번호</p>
                <div className={styles.inputWrapper}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ marginBottom: '30px' }}
                    />
                    <img src={showPassword ? show : hide} className={styles.icon} onClick={toggleShowPassword} />
                </div>
            </div>
            <div className={styles.formGroup}>
                <p>비밀번호 재확인</p>
                <div className={styles.inputWrapper}>
                    <input
                        style={{ marginBottom: '10px' }}
                        type={showPasswordCheck ? "text" : "password"}
                        placeholder="비밀번호를 한번 더 입력하세요."
                        value={passwordCheck}
                        onChange={handlepasswordCheckChange}
                    />
                    <img src={showPasswordCheck ? show : hide} className={styles.icon} onClick={toggleShowPasswordCheck} />
                </div>
                <div className={`${styles.passwordCheck} ${samePassword ? styles.active : ''}`}>{samePassword ? '' : '비밀번호가 같지 않습니다.'}</div>
            </div>
            <button
                className={`${styles.loginButton} ${isButtonActive && samePassword ? styles.active : ''}`} 
                onClick={()=>{
                    navigate('/');
                }}>
                정보 수정
            </button>
        </div> : <LoginChecks setLoginCheck = {setLoginCheck}/>
        }
        </>

    );
}

export default InfoEdit;