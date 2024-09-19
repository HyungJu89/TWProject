import axios from 'axios';
import React, { useEffect, useState } from 'react';
import show from '../icon/24px/show.png'; //비밀번호 보임 이미지
import hide from '../icon/24px/hide.png'; //비밀번호 안보임 이미지
import styles from './style/LoginChecks.module.css';

function LoginChecks(props) {
    //자, 생각을 해봐 형주야. 이건 이미 로그인 된 아이디야. 그러니까 지금 로그인된 이메일이랑 대조를 해서 그 결과값을 보여줘야 해 알겠어? 알겠냐고?
    // 그리고 비밀번호 5회제한로직? 여기선 필요없어 그럼 뭘 의미하냐? ㅈㄴ 귀찮게 한번 더 똑같은 로직에서 쓸모없는것만 빼야해. 어우 귀찮아!
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); //비밀번호 보임,안보임 state 
    const [isButtonActive, setIsButtonActive] = useState(false);
    //로그인 틀릴 시 경고문 저장
    const [loginWarn, setLoginWarn] = useState('');
    const [loginCheck, setLoginCheck] = useState(false);
    var jsonSessionInfo = sessionStorage.getItem('sessionId');
    var sessionInfo = JSON.parse(jsonSessionInfo);    
    
    const handleEmailChange = (e) => {
        const value = e.target.value.replace(/\s/g, '');
        setEmail(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value.replace(/\s/g, '');
        setPassword(value);
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


    const checkUser = async () => {
        // console.log(count);
        if (email !== '' && password !== '') {
            try {
                const userData = {
                    email: email,
                    pw: password,
                    sessionId: sessionInfo.sessionId
                };
                const userResponse = await axios.post('/myPage/loginRetry', userData); 
                if(userResponse.data.check){
                    props.setOriPassword(password);
                    props.setLoginCheck(true);
                    console.log(loginCheck+"로그인체크");
                } else if(!userResponse.data.check){
                    setLoginWarn(userResponse.data.warningMessage);
                }
            } catch (error) {
                console.error('Channel API Error:', error);
            }
        } else {
            setLoginWarn("이메일과 비밀번호를 제대로 입력해주세요.")
        }
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
                {
                    loginWarn !== '' ? <div className={styles.warning} style={{marginTop : '10px'}}>{loginWarn}</div> : <div style={{marginTop : '15px'}}></div> 
                }
                <button onClick={
                    () => {
                        if (email == '') { alert('이메일을 입력해주세요!'); }
                        else if (password == '') { alert('비밀번호를 입력해주세요!'); }
                        else {checkUser();}
                        // if(이메일과 비밀번호가 적혀있으면){대충 엑시오스 요청해서 데이터베이스랑 데이터대조 후 로그인진행}
                        // 과거의 김형주 죽이고 싶다.
                    }} className={`${styles.loginButton} ${isButtonActive ? styles.active : ''}`}>다음</button>
            </div>
        </>
    );
}

export default LoginChecks;