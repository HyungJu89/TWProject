import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './style/SignIn.module.css';
import show from '../icon/24px/show.png'; //비밀번호 보임 이미지
import hide from '../icon/24px/hide.png'; //비밀번호 안보임 이미지
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo,fetchSessionId } from '../slice/loginSlice.js';
import { setLoggedIn } from '../slice/sessionSlice.js';

function SignIn() {
    var jsonSessionInfo = sessionStorage.getItem('sessionId');
    var sessionInfo = JSON.parse(jsonSessionInfo);    
    // 세션화성공
    const userState = useSelector((state) => state.session);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //모든 정보가 입력되면 버튼 활성화
    const [isButtonActive, setIsButtonActive] = useState(false);
    //비밀번호 보임,안보임 state
    const [showPassword, setShowPassword] = useState(false);
    //로그인 틀릴 시 경고문 저장
    const [loginWarn, setLoginWarn] = useState('');
    //로그인 비번 카운트
    let [count, setCount] = useState(0);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    // 눈 아이콘 클릭시 바꾸게 설정하기
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    //엔터 키 다운 이벤트
    const handleEnter = (e) => {
        if (e.key === "Enter") {
        checkUser();    
        }
    };
          // 로그인 버튼 클릭 핸들러
    const handleLogin = () => {
        if (email === '') {
            alert('이메일을 입력해주세요!');
        } else if (password === '') {
            alert('비밀번호를 입력해주세요!');
        } else if (count >= 5) {
            alert('비밀번호를 5회이상 틀리셨습니다!');
        }else {
            checkUser();
        }
    };
    
    const checkUser = async () => {
<<<<<<< HEAD
=======
        // console.log(count);
>>>>>>> origin/kimhyeongju
        if (email !== '' && password !== '') {
            try {

                const userData = {
                    email: email,
                    pw: password
                };

                const userResponse = await axios.post('/signIn/loginCheck', userData);
<<<<<<< HEAD
                if(userResponse.data.check && count < 5){
                    dispatch(fetchSessionId(email));
                    dispatch(getUserInfo(userResponse.data.userKey));
                    dispatch(setLoggedIn(true)); // 로그인 성공 후 상태 업데이트
                    navigate('/');
                }else{
                    setCount(userResponse.data.wrongCount);
=======
                // console.log("userResponse:", userResponse.data);
                if(userResponse.data.check && count < 5){
                    dispatch(fetchSessionId(email));
                    dispatch(getUserInfo(sessionInfo.sessionId));
                    // console.log(userResponse.data);
                    navigate('/');
                }else{
                    setCount(userResponse.data.wrongCount);
                    // console.log(userResponse.data);
                    // console.log(userResponse.data.wrongCount);
>>>>>>> origin/kimhyeongju
                } 
                setLoginWarn(userResponse.data.warningMessage);
                
            } catch (error) {
                console.error('Channel API Error:', error);
            }
        } else {
            setLoginWarn("이메일과 비밀번호를 제대로 입력해주세요.")
        }
    };
    // 비밀번호 5회 실패 로직
    useEffect(() => {
        let timer;
        if (count >= 5) {
            timer = setTimeout(() => {
                count = 0;
                localStorage.setItem('sessionId',JSON.stringify(sessionInfo));
            }, 10 * 60 * 1000);
        }
        return () => clearTimeout(timer);
    }, [count, dispatch]);

    // 유저정보 체크 로직
    useEffect(() => {
        // console.log(sessionInfo.sessionId);
        if (email !== '' && password !== ''){
            setIsButtonActive(true);
        }else if(email == ''){
            setIsButtonActive(false);
        }else if(password == ''){
            setIsButtonActive(false);
        }else if(email == '' && password == ''){
            setIsButtonActive(false);
        }
    }, [email, password]);

    const handleEmailChange = (e) => {
        const value = e.target.value.replace(/\s/g, '');
        setEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value.replace(/\s/g, '');
        setPassword(value);
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