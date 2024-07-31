import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './style/SignUp.module.css';
import show from '../icon/24px/show.png'; //비밀번호 보임 이미지
import hide from '../icon/24px/hide.png'; //비밀번호 안보임 이미지
import { redirect, useNavigate } from 'react-router-dom';




//회원가입 전체 페이지
function SignUp() {
    const [AgreeCheck, setAgreeCheck] = useState(false);
    // 눈 아이콘 클릭시 바꾸게 설정하기
    return (
        <div className={styles.section}>
            {
                AgreeCheck ? <Join /> : <Agree setAgreeCheck={setAgreeCheck} />
            }
        </div>
    );
}




// 필수 동의 사항 페이지

function Agree({ setAgreeCheck }) {
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false); //비밀번호 보임,안보임 state
    const [selectedOption, setSelectedOption] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value === 'true');
    };
    const handleOptionChange2 = (event) => {
        setSelectedOption2(event.target.value === 'true');
    };

    useEffect(() => {
        if (selectedOption && selectedOption2) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [selectedOption, selectedOption2]);
    useEffect(()=>{
        alert('★이메일 수신 동의는 회원가입 시 이메일 인증을 위하여 반드시 하여야 회원가입 할 수 있습니다!!!')
    },[])
    return (
        <div className={styles.joinContainer}>
            <div className={styles.topFont}>회원가입</div>
            {/* 필수 동의 항목 */}
            <div className={styles.topAgreeFont} >필수 동의 항목</div>
            <div className={styles.agree} style={{ marginBottom: '20px' }}>
                <div className={styles.textBox} style={{ marginBottom: '12px' }}>

                    <h4>이용약관</h4>
                    <div className={styles.a}>
                        헌법개정안이 제2항의 찬성을 얻은 때에는 헌법개정은 확정되며, 대통령은 즉시 이를 공포하여야 한다. 정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다. 일반사면을 명하려면 국회의 동의를 얻어야 한다. 대한민국의 영토는 한반도와 그 부속도서로 한다.<br />
                        국무회의는 대통령·국무총리와 15인 이상 30인 이하의 국무위원으로 구성한다. 군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. 국민의 모든 자유와 권리는 국가안전보장·질서유지 또는 공공복리를 위하여 필요한 경우에 한하여 법률로써 제한할 수 있으며, 제한하는 경우에도 자유와 권리의 본질적인 내용을 침해할 수 없다.<br />
                        모든 국민은 언론·출판의 자유와 집회·결사의 자유를 가진다. 국정의 중요한 사항에 관한 대통령의 자문에 응하기 위하여 국가원로로 구성되는 국가원로자문회의를 둘 수 있다. 헌법개정안은 국회가 의결한 후 30일 이내에 국민투표에 붙여 국회의원선거권자 과반수의 투표와 투표자 과반수의 찬성을 얻어야 한다.<br />
                        국회의원이 회기전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가 있으면 회기중 석방된다. 국교는 인정되지 아니하며, 종교와 정치는 분리된다. 모든 국민은 인간다운 생활을 할 권리를 가진다. 모든 국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다.<br />
                        <br />
                        대통령은 제1항과 제2항의 처분 또는 명령을 한 때에는 지체없이 국회에 보고하여 그 승인을 얻어야 한다. 대한민국은 민주공화국이다. 대통령은 조약을 체결·비준하고, 외교사절을 신임·접수 또는 파견하며, 선전포고와 강화를 한다. 공무원은 국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다.<br />
                        국가는 평생교육을 진흥하여야 한다. 공공필요에 의한 재산권의 수용·사용 또는 제한 및 그에 대한 보상은 법률로써 하되, 정당한 보상을 지급하여야 한다.      <br />
                    </div>
                </div>
            </div>
            {/* 필수 동의 란 */}
            <div className={styles.formGroup} style={{ marginBottom: '30px' }}>
                <p>해당 사항에 어긋나는 행위를 하면 제제를 가합니다?</p>
                <label>
                    <input style={{ marginRight: '8px' }}
                        type="radio"
                        value="true"
                        checked={selectedOption === true}
                        onChange={handleOptionChange}
                        className={styles.customRadio}
                    />
                    동의 합니다.
                </label>
                <label>
                    <input style={{ marginLeft: '48px', marginRight: '8px' }}
                        type="radio"
                        value="false"
                        checked={selectedOption === false}
                        onChange={handleOptionChange}
                        className={styles.customRadio}
                    />
                    동의 하지 않습니다.
                </label>
            </div>
            <div className={styles.formGroup}>
                <p>이메일 수신 동의</p>
                <label>
                    <input style={{ marginRight: '8px' }}
                        type="radio"
                        value="true"
                        checked={selectedOption2 === true}
                        onChange={handleOptionChange2}
                        className={styles.customRadio}
                    />
                    동의 합니다.
                </label>
                <label>
                    <input style={{ marginLeft: '48px', marginRight: '8px' }}
                        type="radio"
                        value="false"
                        checked={selectedOption2 === false}
                        onChange={handleOptionChange2}
                        className={styles.customRadio}
                    />
                    동의 하지 않습니다.
                </label>
            </div>
            <button onClick={() => {
                if (selectedOption && selectedOption2) {
                    setAgreeCheck(true);
                }
                else { alert('동의사항에 동의하지 않으면 회원가입 할 수 없습니다.') }
            }}
                className={`${styles.loginButton} ${isButtonActive ? styles.active : ''}`} >
                다음
            </button>
        </div>
    );
}




//회원가입 페이지

function Join() {
    //email 관련 state
    const [email, setEmail] = useState('');
    const [emailWarning, setEmailWarning] = useState('');
    const [emailCheck, setEmailCheck] = useState(false);

    //비밀번호 관련 state
    const [password, setPassword] = useState('');
    const [passwordCheck, setpasswordCheck] = useState('');
    const [passwordWarning, setpasswordWarning] = useState('');
    const [passwordWarning2, setpasswordWarning2] = useState('');
    const [showPassword, setShowPassword] = useState(false); //비밀번호 보임,안보임 state
    const [showPasswordCheck, setShowPasswordCheck] = useState(false); //비밀번호 보임,안보임 state

    //닉네임 관련 state
    const [nickName, setNickname] = useState('');
    const [nickNameWarning, setNickNameWarning] = useState('');
    const [nickNameCheck, setNickNameCheck] = useState(false);

    //잡다 state
    const [gender, setGender] = useState('비밀');
    const [certification, setCertification] = useState(''); 
    const [userInput, setUserInput] = useState(0);
    const [isButtonActive, setIsButtonActive] = useState(false);
    let navigate = useNavigate();

    //이메일 비밀번호 유효성 검사
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    //닉네임 유효성 검사
    const nickNameRegEx = /^[A-Za-z0-9\uAC00-\uD7A3]{2,8}$/;
    //비밀번호 유효성 검사
    const passwordRegEx = /^[A-Za-z0-9!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~=.-]{8,20}$/;
    const numberRegEx = /[0-9]/;
    const specialCharRegEx = /[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~=.-]/;
    const letterRegEx = /[A-Za-z]/;
    //이메일 유효성 검사로직
    const emailChecks = (email) => {
        if (emailRegEx.test(email)) {
            setEmailWarning('');
            return true;
        } else {
            return false;
        }
    }
    //비밀번호 유효성 검사로직
    const PasswordCheck = (password) => {
        setpasswordWarning2('');
        if (!passwordRegEx.test(password)) {
          setpasswordWarning2('비밀번호는 8자 이상 20자 이하이어야 합니다.');
        }
        if (!numberRegEx.test(password)) {
            setpasswordWarning2('비밀번호는 적어도 하나의 숫자를 포함해야 합니다.');
        }
        if (!specialCharRegEx.test(password)) {
            setpasswordWarning2('비밀번호는 적어도 하나의 특수 문자를 포함해야 합니다.');
        }
        if (!letterRegEx.test(password)) {
            setpasswordWarning2('비밀번호는 적어도 하나의 영어 알파벳을 포함해야 합니다.');
        }
      };
    //닉네임 유효성 검사로직
    const nickNameChecks = (nickName) => {
        if (nickNameRegEx.test(nickName)) {
            setNickNameWarning('');
            return true;
        } else {
            return false;
        }
    }
    //이메일 인증 로직
    

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };
    const handleCertification = (event) => {
        setCertification(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordCheck = () => {
        setShowPasswordCheck(!showPasswordCheck);
    };


    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsButtonActive(true);
        } 
        if (!emailChecks(email)) {
            setEmailWarning('이메일 형식이 맞지 않습니다.');
            setEmailCheck(false);
        }
         else {
            setIsButtonActive(false);
        }
        if(password !== passwordCheck){
            setpasswordWarning('재확인 비밀번호와 비밀번호가 일치하지 않습니다.');
        }
        if(password == passwordCheck){
            setpasswordWarning('');
        }
        PasswordCheck(password)  
    }, [email, password,passwordCheck]);

    useEffect(()=>{
    if(!nickNameChecks(nickName)){
        setNickNameWarning('닉네임 형식이 맞지 않습니다.');
        setNickNameCheck(false);
    } if(nickNameChecks(nickName)){
        axios.get('/signUp/nickNameTest', { params: { nickName: nickName } }).then((response) => {
            if(!response.data){
                setNickNameWarning('이미 사용한 닉네임 입니다.');
                setNickNameCheck(response.data);
            }else {
                setNickNameWarning('사용가능한 닉네임 입니다.');
                setNickNameCheck(response.data);
            }
        })
        .catch(error => {
            console.error('Channel API Error:', error);
            throw error;
        })
    }
    },[nickName])


    //이메일 state input에 넣는값으로 state바꿔주는 함수
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    //비밀번호 state input에 넣는값으로 state바꿔주는 함수
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    //비밀번호 재확인 state input에 넣은값으로 바꿔주는 함수
    const handlepasswordCheckChange = (e) => {
        setpasswordCheck(e.target.value);
    };


    //input에 넣는값으로 state바꿔주는 함수
    const handleNickname = (e) => {
        if (e.target.value.length == 0 || e.target.value.length <= 8) {
            setNickname(e.target.value);
            setUserInput(e.target.value.length);
        }
        if (e.target.value.length >= 9) {
            alert('닉네임은 8자 이하만 사용가능 합니다!');
        }
    };

    //이메일 중복검사 로직
    const emailTest = (userEmail) => {
        if(!email == ''){
            axios.get('/signUp/emailTest', { params: { email: userEmail } }).then((response) => {
                if(!response.data){
                    setEmailWarning('이미 사용한 이메일 입니다.');
                    setEmailCheck(response.data);
                }else {
                    setEmailWarning('유효한 이메일입니다! 인증번호를 전송했습니다. 메일함에서 확인해주세요.');
                    setEmailCheck(response.data);
                }
            })
            .catch(error => {
                console.error('Channel API Error:', error);
                throw error;
            })
        }
    }


    // POST 요청 보내는 함수 회원가입 버튼로직
    const handleSubmit = async () => {
        // 회원가입 유효성 검사
        if (email == '') {
            alert('이메일이 비었습니다!');
            return;
        }
        if (!emailCheck){
            alert('중복된 이메일 입니다.')
            return;
        }
        if (password == '') {
            alert('비밀번호를 제대로 입력해주세요!')
            return;
        }
        if (password !== passwordCheck) {
            alert('비밀번호와 재확인 비밀번호가 일치하지 않습니다.');
            return;
        }
        if (nickName == '') {
            alert('닉네임을 입력해주세요!');
            return;
        }
        if (!emailChecks(email)) {
            setEmailWarning('이메일 형식이 맞지않습니다.');
            return;
        }

        try {
            // 서버로 보낼 데이터 객체 생성
            const userData = {
                email: email,
                pw: password,
                nickName: nickName,
                gender: gender
            };

            // POST 요청 보내기
            const response = await axios.post('/signUp/register', userData);

            // 응답 처리
            if (response.status === 200) {
                alert('가입이 완료되었습니다.');
                navigate('/');
            }
        } catch (error) {
            console.error('가입 중 오류 발생:', error);
            alert('가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.joinContainer}>
            <div className={styles.topFont}>회원가입</div>
            <div className={styles.formGroup}>
                <p>이메일</p>
                <div className={styles.inputWrapper}>
                    <input
                        style={{ marginBottom: '10px' }}
                        type="email"
                        placeholder="사용할 이메일을 입력하세요"
                        value={email}
                        onChange={handleEmailChange}
                        className={styles.email}
                    />
                    <button className={`${styles.emailButton} ${email !== '' ? styles.active : ''}`} onClick={()=>{emailTest(email)}}>중복체크</button>
                </div> 
            </div>
            {
                emailWarning == '' ? <div style={{ marginBottom: '50px' }}></div> : <div className={`${styles.emailWarn} ${emailCheck ? styles.active : ''}`} style={{ marginBottom: '30px' }}>{emailWarning}</div>
            }
            <div className={styles.formGroup}>
                <p>이메일 인증</p>
                <div className={styles.inputWrapper}>
                    <input
                        style={{ marginBottom: '60px' }}
                        type="text"
                        placeholder="인증번호"
                        value={certification}
                        onChange={handleCertification}
                        className={styles.email}
                    />
                    <button className={`${styles.emailButton} ${certification !== '' ? styles.active : ''}`}>인증</button>
                </div>
            </div>
            <div className={styles.formGroup}>
                <p>비밀번호</p>
                <div className={styles.inputWrapper}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ marginBottom: '10px' }}
                    />
                    <img src={showPassword ? show : hide} className={styles.icon} onClick={toggleShowPassword} />
                </div>
            </div>
            {
                passwordWarning2 == '' ? <div style={{ marginBottom: '50px' }}></div> : <div className={styles.emailWarn} style={{ marginBottom: '30px' }}>{passwordWarning2}</div>
            }
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
            </div>
            {
                passwordWarning == '' ? <div style={{ marginBottom: '50px' }}></div> : <div className={styles.emailWarn} style={{ marginBottom: '30px' }}>{passwordWarning}</div>
            }
            <div className={styles.formGroup}>
                <p>닉네임</p>
                <div className={styles.inputWrapper}>
                    <input
                        style={{ marginBottom: '10px' }}
                        type="text"
                        placeholder="활동에 사용할 닉네임을 입력하세요."
                        value={nickName}
                        onChange={handleNickname}
                    />
                    {
                        userInput !== 0 ? <div className={styles.icon} style={{ color: '#999999' }}>{'('}{userInput}/8{')'}</div> : ''
                    }
                </div>
            </div>
            {
                nickNameWarning == '' ? <div style={{ marginBottom: '50px' }}></div> : <div className={`${styles.emailWarn} ${nickNameCheck ? styles.active : ''}`} style={{ marginBottom: '30px' }}>{nickNameWarning}</div>
            }
            <div className={styles.formGroup}>
                <p>성별</p>
                <label className={styles.customLabel}>
                    <input
                        type="radio"
                        value="비밀"
                        checked={gender === '비밀'}
                        onChange={handleGenderChange}
                        className={styles.customRadio}
                    />
                    비밀
                </label>
                <label className={styles.customLabel} style={{ marginLeft: '48px' }}>
                    <input
                        type="radio"
                        value="남성"
                        checked={gender === '남성'}
                        onChange={handleGenderChange}
                        className={styles.customRadio}
                    />
                    남성
                </label>
                <label className={styles.customLabel} style={{ marginLeft: '48px' }}>
                    <input
                        type="radio"
                        value="여성"
                        checked={gender === '여성'}
                        onChange={handleGenderChange}
                        className={styles.customRadio}
                    />
                    여성
                </label>
            </div>
            <button
                onClick={handleSubmit}
                className={`${styles.loginButton} ${isButtonActive ? styles.active : ''}`} >
                가입하기
            </button>
        </div>
    );
}


export default SignUp;