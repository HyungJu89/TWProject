import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './style/PwInquiry.module.css';
import { useNavigate } from 'react-router-dom';

//비밀번호 찾기 페이지
function PwInquiry() {
    //이메일 인증 유효성 검사 완료체크
    const [emailCerti, setEmailCerti] = useState(false); 
        
    return(
        <div className={styles.PwInquiryContainer}>
            <div className={styles.topFont}>비밀번호 찾기</div>
            {
                emailCerti ? '' : <PwIssue/>
            }
        </div>
    );
}

function EmailAvailable({ setEmailCerti }) {
            //email 관련 state
            const [email, setEmail] = useState('');
            const [emailWarning, setEmailWarning] = useState('');
            const [emailCheck, setEmailCheck] = useState(false); 
            //랜덤으로 발송한 인증번호
            const [certification, setCertification] = useState('');
            //유저가 친 인증번호 
            const [userCertification, setUserCertification] = useState('');
            //인증번호 확인
            const [checkCerti, SetCheckCerti] = useState(false);
            //인증상태 보여주기 
            const [showCerti, SetShowCerti] = useState(false);
            //인증횟수 확인
            const [countCerti, setCountCerti] = useState(true);
            const [modalOpen, setModalOpen] = useState(false);
            //이메일 비밀번호 유효성 검사
            const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    
            const handleEmailChange = (e) => {
            const value = e.target.value.replace(/\s/g, '');
            setEmail(value);
            };
            const handleUserCertification = (e) => {
                const value = e.target.value.replace(/\s/g, '');
                setUserCertification(value);
            };
    
            //이메일 인증번호 발송 로직
            const handleEmailCheck = () => {
                if(countCerti){
                    axios.get('/certification2', { params: { email: email } }).then((response) => {
                        setCertification(response.data);
                    })
                        .catch(error => {
                            console.error('Channel API Error:', error);
                            throw error;
                        })
                    setCountCerti(false);
                }
                if(!countCerti){
                    setEmailWarning('이미 인증번호를 보냈습니다. 이메일을 확인 해주세요.');
                    setModalOpen(true);
                }    
            }
    
            //인증번호 대조로직
            const contrastCertification = () => {
                if (certification == userCertification) {
                SetCheckCerti(true);
                } else {
                SetCheckCerti(false);
                }
            }
    
        
    
            //이메일 중복검사 로직
            const emailTest = async (userEmail) => {
                if (!email == '') {
                    axios.get('/signUp/emailTest', { params: { email: userEmail } }).then((response) => {
                        if (!response.data) {
                            setEmailWarning('인증번호를 전송했습니다. 메일함에서 확인해주세요.');
                            handleEmailCheck();
                            setEmailCheck(!response.data);
                        }
                        else if(!emailChecks(email)){
                            setEmailWarning('이메일 형식이 맞지 않습니다.')
                            return;
                        }
                        else if(response.data){
                            setEmailWarning('존재하지 않는 이메일입니다.');
                            setEmailCheck(!response.data);
                        }else{
                            alert('올바르지 않은 접근방식 입니다.');
                        }
                    })
                        .catch(error => {
                            console.error('Channel API Error:', error);
                            throw error;
                        })
                }
            }
            //이메일 유효성 검사로직
            const emailChecks = (email) => {
                if (emailRegEx.test(email)) {
                    setEmailWarning('');
                    return true;
                } else {
                    return false; 
                }
            }
        return(
            <>
            <div className={styles.formGroup}>
                <p>이메일</p>
                <div className={styles.inputWrapper}>
                    <input
                        style={{marginBottom : '10px'}}
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={handleEmailChange}
                        className={styles.email}
                    />
                    <button onClick={()=>{emailTest(email)}} className={`${styles.emailButton} ${email !== '' ? styles.active : ''}`}>이메일 인증</button>
                </div>
            </div>
            {
            emailWarning == '' ? <div style={{ marginBottom: '50px' }}></div> : <div className={`${styles.emailWarn} ${emailCheck ? styles.active : ''}`} style={{ marginBottom: '30px' }}>{emailWarning}</div>
            }
            <div className={styles.formGroup}>
            <p>이메일 인증</p>
            <div className={styles.inputWrapper}>
                <input
                    style={{ marginBottom: '10px' }}
                    type="text"
                    placeholder="인증번호"
                    value={userCertification}
                    onChange={handleUserCertification}
                    className={styles.email}
                />
                <button onClick={() => { contrastCertification(); SetShowCerti(true); }} className={`${styles.emailButton} ${userCertification !== '' ? styles.active : ''}`}>인증</button>
            </div>
            </div>
            {
                showCerti ? checkCerti && userCertification !='' ? <div className={styles.certifiOk} style={{ marginBottom: '30px' }}>인증되었습니다.</div> : <div className={styles.emailWarn} style={{ marginBottom: '30px' }}>인증번호가 알맞지 않습니다.</div> : <div style={{ marginBottom: '50px' }}></div>
            }
            <button onClick={()=>{if(checkCerti){ setEmailCerti(true) } else{alert('이메일을 인증 해주세요!')}}} className={`${styles.loginButton} ${checkCerti ? styles.active : ''}`}>다음</button>
            </>
        );
}

function PwIssue() {
    return(
        <div>
            <div className={styles.pwIssueInform}>임시 발행 비밀번호 입니다. 로그인 후 꼭 비밀번호를 변경해주세요.</div>
            <div className={styles.pwIssue}>a123123124</div>
            <button className={`${styles.loginButton} ${styles.active}`} onClick={()=>{}}>로그인하러가기</button>
        </div>
    );
}

export default PwInquiry;