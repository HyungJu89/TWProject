import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './style/SignIn.module.css';
import show from '../icon/24px/show.png'; //비밀번호 보임 이미지
import hide from '../icon/24px/hide.png'; //비밀번호 안보임 이미지
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo,fetchSessionId } from '../slice/loginSlice.js';

function SignIn() {
    var jsonSessionInfo = localStorage.getItem('sessionId');
    var sessionInfo = JSON.parse(jsonSessionInfo);  
    // 세션화성공
    // const { birthday, pw, sessionId, state, nickName } = useSelector((state) => state.userState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //모든 정보가 입력되면 버튼 활성화
    const [isButtonActive, setIsButtonActive] = useState(false);
    //비밀번호 보임,안보임 state
    const [showPassword, setShowPassword] = useState(false);
    //로그인 유저정보 맞는지 대조하고 결과값 저장하는 state 
    const [loginCheck, setLoginCheck] = useState(false);
    //유저 밴정보 확인
    const [banCheck, setbanCheck] = useState(false);
    //로그인 틀릴 시 경고문 저장
    const [loginWarn, setLoginWarn] = useState('');
    //로그인 비번 카운트
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
        if (loginCheck && !banCheck && sessionInfo.count < 5) {
            dispatch(fetchSessionId(email));
            // 세션화성공용
            // dispatch(getUserInfo(sessionInfo.sessionId));
        } else if (email === '') {
            alert('이메일을 입력해주세요!');
        } else if (password === '') {
            alert('비밀번호를 입력해주세요!');
        } else if(sessionInfo.count >= 5){
            alert('비밀번호를 5회이상 틀리셨습니다. 10분 후에 다시 로그인 해주세요.');
        } else if(!loginCheck && !sessionInfo.email == '') {
            sessionInfo.count = sessionInfo.count + 1;
            localStorage.setItem('sessionId',JSON.stringify(sessionInfo));
            setLoginWarn('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.')
        };
    };
    
    const checkUser = async () => {
        if (email !== '' && password !== '') {
            setIsButtonActive(true);
            try {
                const [userResponse, banResponse] = await Promise.all([
                    axios.get('/signIn/userCheck', { params: { email: email, pw: password } }),
                    axios.get('/signIn/banCheck', { params: { email: email } })
                ]);
                setLoginCheck(userResponse.data);
                setbanCheck(banResponse.data);
                if(banResponse.data){
                    setLoginWarn('해당 계정은 악의적인 글 작성과 과도한 친목주도로 인해 사용 정지 된 계정이에요.')
                }
            } catch (error) {
                console.error('Channel API Error:', error);
            }
        } else {
            setIsButtonActive(false);
        }
    };

    // 비밀번호 5회 실패 로직
    useEffect(() => {
        let timer;
        if (sessionInfo.count >= 5) {
            timer = setTimeout(() => {
                sessionInfo.count = 0;
                localStorage.setItem('sessionId',JSON.stringify(sessionInfo));
            }, 10 * 60 * 1000);
        }
        return () => clearTimeout(timer);
    }, [sessionInfo.count, dispatch]);
    
    useEffect(() => {
        checkUser();
    }, [email, password]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        
        <div className={styles.section}>
        {/* 세션화보여주기 */}
        {/* <div>
            <p>Birthday: {birthday}</p>
            <p>Password: {pw}</p>
            <p>Session ID: {sessionId}</p>
            <p>State: {state}</p>
            <p>NickName: {nickName}</p>
        </div> */}
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