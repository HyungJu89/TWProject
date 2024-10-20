import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './style/InfoEdit.module.css';
import show from '../icon/24px/show.png'; //비밀번호 보임 이미지
import hide from '../icon/24px/hide.png'; //비밀번호 안보임 이미지
import LoginChecks from './LoginChecks.js';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../slice/loginSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import AlarmModal from '../modal/AlarmModal.js';

//정보수정 페이지
function InfoEdit() {
    const [nickName, setNickname] = useState('');
    const [nickNameCheck, setNickNameCheck] = useState(false);
    const [nicknameWarning, setNickNameWarning] = useState('');
    const [userInput, setUserInput] = useState(0);
    const [oriPassword,setOriPassword] = useState('');
    const [password, setPassword] = useState('');//비밀번호 입력값 저장용
    const [passwordCheck, setpasswordCheck] = useState('');//비밀번호 재확인 입력값 저장용
    const [passwordWarning2, setpasswordWarning2] = useState('');
    const [samePassword, setSamePassword] = useState(false); // 대조 유효검사 후 true,false값 저장용
    const [allCheck, setAllCheck] = useState(false); // 대조 유효검사 후 true,false값 저장용
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false); //비밀번호 보임,안보임 state
    const [showPasswordCheck, setShowPasswordCheck] = useState(false); //비밀번호 보임,안보임 state
    const [LoginCheck, setLoginCheck] = useState(false);
    const [pwCheck, setPwCheck] = useState(false);
    const navigate = useNavigate();
    var jsonSessionInfo = sessionStorage.getItem('sessionId');
    var sessionInfo = JSON.parse(jsonSessionInfo);   
    //닉네임 유효성 검사
    const nickNameRegEx = /^[A-Za-z0-9\uAC00-\uD7A3]{2,8}$/;
    //비밀번호 유효성 검사
    const passwordRegEx = /^[A-Za-z0-9!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~=.-]{8,20}$/;
    const numberRegEx = /[0-9]/;
    const specialCharRegEx = /[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~=.-]/;
    const letterRegEx = /[A-Za-z]/;
    const bigLetterRegEx = /[A-Z]/;

    // 알림 모달
    const [modalOpen, setModalOpen] = useState(false);
    // 모달 내용
    const [modalContent, setModalContent] = useState('');

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
        }
    };

    useEffect(() => {
        // 초기값 false 선언
        setIsButtonActive(false);
        // 비밀번호 체크 실행
        PasswordCheck(password);
        // 닉네임 체크 실행
        let nickNameBoolean = nickNameChecks(nickName);
        // 비밀번호 체크 || 닉네임 체크가 true 일때 실행
        if (pwCheck || nickNameBoolean) {
            // 패스워드 체크에서 지정된 pwCheck 에 따라 버튼활성화
            if(pwCheck){
                setpasswordWarning2('사용 가능한 비밀번호 입니다.');
                if(nicknameWarning === '사용 가능한 닉네임 입니다.' || nickName.length === 0){
                    setIsButtonActive(true);
                }
                setSamePassword(true);
            } else {
                setIsButtonActive(false);
            }
            // 닉네임 boolean에서 지정된 닉네임체크 에 따라 버튼활성화
            if(nickNameBoolean){
                setIsButtonActive(true);
                if(!pwCheck && password.length !== 0){
                    setIsButtonActive(false);
                }
                if(!pwCheck && passwordCheck.length !== 0){
                    setIsButtonActive(false);
                }
            } else if(!nickNameBoolean && nickName.length === 1){
                setIsButtonActive(false);
            }
        }
    }, [password, passwordCheck, nickName, pwCheck]);

    //비밀번호 유효성 검사로직
    const PasswordCheck = (password) => {
        setpasswordWarning2('');
        setPwCheck(true);
        if (password.length === 0 && passwordCheck.length === 0) {
            setPwCheck(false);
            return;
        }
        if (password.length === 0 && passwordCheck.length !== 0) {
            setpasswordWarning2('비밀번호를 입력해주세요.');
            setPwCheck(false);
            return;
        }

        if (passwordCheck.length === 0 && password.length !== 0) {
            setpasswordWarning2('비밀번호 재확인을 입력해주세요.');
            setPwCheck(false);
            return;
        }

        if(nickName.length !== 0){
            if(password.length === 0 && passwordCheck.length === 0){
                setPwCheck(false);
            }
        }

        if(password.length !== 0 || passwordCheck.length !== 0){
            if (!passwordRegEx.test(password)) {
                setpasswordWarning2('비밀번호의 형식이 맞지 않습니다.(8자~20자)');
                setPwCheck(false);
            }
            if (!numberRegEx.test(password)) {
                setpasswordWarning2('비밀번호는 적어도 하나의 숫자를 포함해야 합니다.');
                setPwCheck(false);
            }
            if (!specialCharRegEx.test(password)) {
                setpasswordWarning2('비밀번호는 적어도 하나의 특수 문자를 포함해야 합니다.');
                setPwCheck(false);
            }
            if (!letterRegEx.test(password)) {
                setpasswordWarning2('비밀번호는 적어도 하나의 영어 알파벳을 포함해야 합니다.');
                setPwCheck(false);
            }
            if (!bigLetterRegEx.test(password)) {
                setpasswordWarning2('비밀번호에는 대문자가 하나 이상 포함되어야 합니다.');
                setPwCheck(false);
            }
            if (oriPassword == password){
                setpasswordWarning2('이미 사용한 비밀번호는 사용하실 수 없습니다.');
                setPwCheck(false);
            }
            if (password !== passwordCheck){
                setpasswordWarning2('비밀번호가 일치하지 않습니다.');
                setPwCheck(false);
            }
        }
    };
    
    //닉네임 유효성 검사로직
    const nickNameChecks = (nickName) => {
        setNickNameWarning('');
        setNickNameCheck(false);
        if(nickName.length >= 2){
            if (nickNameRegEx.test(nickName)) {
                setNickNameCheck(true);
                return true;
            }
            setNickNameWarning('닉네임 형식이 맞지 않습니다.(2~8자 + 올바른조합)');
            return false;
        } else {
            setNickNameWarning('닉네임 형식이 맞지 않습니다.(2~8자 + 올바른조합)');
            if(nickName.length === 0){
                setNickNameWarning('');
            }
            return false;
        }
    }
    // 닉네임 바꾸는 로직
    const handleNickname = (e) => {
        if (e.target.value.length == 0 || e.target.value.length <= 8) {
            setNickname(e.target.value);
            setUserInput(e.target.value.length);
        }
        if (e.target.value.length >= 9) {
            setModalContent('닉네임은 8자 이하만 사용가능 합니다!');
            setModalOpen(true);
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

    const changeUserInfo = async () => {
        // 여기에서 한번에 보내는거 말고 경우를 3개로 늘려야할꺼같음.
        if(isButtonActive){
            try {
                let userResponse = {};
                const userData = {
                    pw: password,
                    nickName: nickName,
                    sessionId: sessionInfo.sessionId
                };
                if (nickNameCheck && !pwCheck) {
                    userResponse = await axios.post('/myPage/editNickName', userData); 
                }
                if (pwCheck && !nickNameCheck){
                    userResponse = await axios.post('/myPage/editPw', userData); 
                }
                if (nickNameCheck && pwCheck){
                    userResponse = await axios.post('/myPage/editAll', userData); 
                }
                if(userResponse.data.check){
                    setModalContent(userResponse.data.warningMessage);
                    setModalOpen(true);
                    navigate("/");
                    //여기에 네비게이트 넣으면 됨
                }
            } catch (error) {
                console.error('Channel API Error:', error);
            }
        }
    }

    const onResign = () => {
        navigate("/resign");
    }

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
                        value={nickName}
                        onChange={handleNickname}
                        onKeyDown={handleEnter}
                    />
                    {
                        userInput !== 0 ? <div className={styles.icon} style={{ color: '#999999' }}>{'('}{userInput}/8{')'}</div> : ''
                    }
                </div>
                <div className={`${styles.nicknameCheck} ${nickNameCheck ? styles.active : ''}`}>{nickNameCheck ? '사용 가능한 닉네임 입니다' : nicknameWarning}</div>
            </div>
            <div className={styles.formGroup}>
                <p>비밀번호</p>
                <div className={styles.inputWrapper}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={handlePasswordChange}
                        onKeyDown={handleEnter}
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
                        onKeyDown={handleEnter}
                    />
                    <img src={showPasswordCheck ? show : hide} className={styles.icon} onClick={toggleShowPasswordCheck} />
                </div>
                <div className={`${styles.passwordCheck} ${pwCheck ? styles.active : ''}`}>{samePassword && passwordWarning2 == '' ? '' : passwordWarning2}</div>
            </div>
            <button
                className={`${styles.loginButton} ${isButtonActive ? styles.active : ''}`} 
                onClick={()=>{
                    changeUserInfo();
                }}>
                정보 수정
            </button>
            <div className={styles.resignButton} onClick={()=>{
                    onResign();
                }}>
                회원탈퇴
            </div>
        </div> : <LoginChecks setLoginCheck = {setLoginCheck} setOriPassword = {setOriPassword}/>
        }
        {modalOpen && 
            <AlarmModal content={<div className={styles.alarmModal}>{modalContent}</div>} onClose={closeModal} />
        }
        </>

    );
}

export default InfoEdit;