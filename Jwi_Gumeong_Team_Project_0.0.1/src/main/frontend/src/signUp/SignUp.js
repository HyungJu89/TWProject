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
               AgreeCheck ? <Join/> : <Agree setAgreeCheck={setAgreeCheck} />
           }
        </div>
    );
}




// 필수 동의 사항 페이지

function Agree({ setAgreeCheck }) {
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false); //비밀번호 보임,안보임 state
    const [selectedOption, setSelectedOption] = useState(true);
    const [selectedOption2, setSelectedOption2] = useState(true);

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
    return(
        <div className={styles.joinContainer}>
                <div className={styles.topFont}>회원가입</div>
                {/* 필수 동의 항목 */}
                <div className={styles.topAgreeFont} >필수 동의 항목</div>
                <div className={styles.agree} style={{ marginBottom: '20px'}}>
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
                        <input style={{ marginRight: '8px'}}
                            type="radio"
                            value="true"
                            checked={selectedOption === true}
                            onChange={handleOptionChange}
                            className={styles.customRadio}
                        />
                        동의 합니다.
                    </label>
                    <label>
                        <input style={{ marginLeft: '48px' , marginRight: '8px' }}
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
                        <input style={{ marginRight: '8px'}}
                            type="radio"
                            value="true"
                            checked={selectedOption2 === true}
                            onChange={handleOptionChange2}
                            className={styles.customRadio}
                        />
                        동의 합니다.
                    </label>
                    <label>
                        <input style={{ marginLeft: '48px', marginRight: '8px'}}
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
                    if(selectedOption && selectedOption2)
                    {
                        setAgreeCheck(true);
                    }
                    else{alert('동의사항에 동의하지 않으면 회원가입 할 수 없습니다.')}}} 
                    className={`${styles.loginButton} ${isButtonActive ? styles.active : ''}`} >
                다음
                </button>
            </div>
    );
}




//회원가입 페이지

function Join() {
    //유저입력 state
    const [email, setEmail] = useState('');
    const [emailCheck, setEmailCheck] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setpasswordCheck] = useState('');
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('');
    const [certification, setCertification] = useState('인증번호');
    const [userInput,setUserInput] = useState(0);
    
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false); //비밀번호 보임,안보임 state
    const [showPasswordCheck, setShowPasswordCheck] = useState(false); //비밀번호 보임,안보임 state
    let navigate = useNavigate();
    // 눈 아이콘 클릭시 바꾸게 설정하기

    const handleGenderChange = (event) => {
        setGender(event.target.value);
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
        } else {
            setIsButtonActive(false);
        }
    }, [email, password]);
    //input에 넣는값으로 state바꿔주는 함수
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    //input에 넣는값으로 state바꿔주는 함수
    const handleEmailCheckChange = (e) => {
        setEmailCheck(e.target.value);
    };
    //input에 넣는값으로 state바꿔주는 함수
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    //input에 넣는값으로 state바꿔주는 함수
    const handlepasswordCheckChange = (e) => {
        setpasswordCheck(e.target.value);
    };
    //input에 넣는값으로 state바꿔주는 함수
    const handleNickname = (e) => {
        if( e.target.value.length == 0 || e.target.value.length<=8){
            setNickname(e.target.value);
            setUserInput(e.target.value.length);
        } 
        if(e.target.value.length >= 9){
            alert('닉네임은 8자 이하만 사용가능 합니다!');
        }
    };



    return(
    <div className={styles.joinContainer}>
        <div className={styles.topFont}>회원가입</div>
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
                <div className={styles.formGroup}>
                    <p>비밀번호</p>
                    <div className={styles.inputWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={handlePasswordChange}
                            style={{marginBottom : '60px'}}
                        />
                        <img src={showPassword ? show : hide} className={styles.icon} onClick={toggleShowPassword}/>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <p>비밀번호 재확인</p>
                    <div className={styles.inputWrapper}>
                        <input
                            style={{marginBottom : '60px'}}
                            type={showPasswordCheck ? "text" : "password"}
                            placeholder="비밀번호를 한번 더 입력하세요."
                            value={passwordCheck}
                            onChange={handlepasswordCheckChange}
                        />
                        <img src={showPasswordCheck ? show : hide} className={styles.icon} onClick={toggleShowPasswordCheck}/>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <p>닉네임</p>
                    <div className={styles.inputWrapper}>
                        <input
                            style={{marginBottom : '60px'}}
                            type="text"
                            placeholder="활동에 사용할 닉네임을 입력하세요."
                            value={nickname}
                            onChange={handleNickname}
                        />
                        {
                            userInput !== 0 ? <div className={styles.icon} style={{color : '#999999'}}>{'('}{userInput}/8{')'}</div> : ''
                        }
                    </div>
                </div>

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
                    className={`${styles.loginButton} ${isButtonActive ? styles.active : ''}`} >
                가입하기
        </button>
    </div>
    );
}


export default SignUp;