import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './style/CustomerService.module.css';
import serviceLogo from '../icon/img/service-Illustration.png';
import asking from '../icon/img/ask-ing.png';
import reply from '../icon/img/reply-ing.png';
import report from '../icon/img/report-ing.png';
import btnLeft from '../icon/btn/btn-left.png';
import btnRight from '../icon/btn/btn-right.png';
import inquireIcon from '../icon/32px/inquire.png';
import addIcon from '../icon/40px/add.png';

function CustomerServiceCenter() {
    let [tab, setTab] = useState(0);
    const userKey = useSelector((state) => state.session.userKey); // Redux에서 userKey 가져오기
    const [sanctions, setSanctions] = useState([]); // 제재 내역 상태
    const userState = useSelector((state) => state.userState);  // 로그인한 유저 정보??

    useEffect(() => {
        if (userKey) {
            // userKey가 있을 때만 API 호출
            axios.post('/sanction/list', null, {
                params: { userKey }
            })
            .then(response => {
                if (response.data.result === "success") {
                    console.log(response.data.sanctionList);
                    setSanctions(response.data.sanctionList);
                }
            })
            .catch(error => {
                console.log("API 호출 오류: " + error.message);
            });
        }
    }, [userKey]); // userKey가 변경될 때마다 호출

    // 문의 내역
    const inquiryList = [
        // 비워둔거임!!
        {
            content:"aa",
            title:"aa"
        }
    ]

    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        axios.get('/faq/list')
            .then(response => {
                if (response.data.result === "success") {
                    setFaqs(response.data.list);
                } else {
                    console.log("FAQ 리스트 불러오기 실패");
                }
            })
            .catch(error => {
                console.log("API 호출 오류: " + error.message);
            });
    }, []);

    let [currentPage, setCurrentPage] = useState(1);
    let [dropdownOpen, setDropdownOpen] = useState(false);
    let [selectedOption, setSelectedOption] = useState("선택하세요");
    let [faqContent, setFaqContent] = useState(null);
    let [inquiryContent, setInquiryContent] = useState(null);
    /* 임시 페이징(백엔드로 바꿀 예정) */
    const sectionsPerPage = 10;
    const indexOfLastSanction = currentPage * sectionsPerPage;
    const indexOfFirstSanction = indexOfLastSanction - sectionsPerPage;
    const currentSanctions = sanctions.slice(indexOfFirstSanction, indexOfLastSanction);

    // 문의하기 종류 선택 모달
    const optionSelect = (option) => {
        setSelectedOption(option);
        setDropdownOpen(false);
    };

    /* FAQ 클릭시 열림 */
    const openedFaq = (idx) => { // idx = 인덱스
        setFaqContent(faqContent === idx ? null : idx);
    };

    /* 문의 내역 클릭시 열림 */
     const openedInquiry = (idx) => { // idx = 인덱스
        setInquiryContent(inquiryContent === idx ? null : idx);
    };

    const renderTabContent = () => {
        switch (tab) {
            case 0:
                return (
                    <div className={styles.faqContainer}>
                        {faqs.map((faq, idx) => (
                            <div key={idx} onClick={() => openedFaq(idx)} className={styles.faqItem}>
                                <div className={styles.faqHeader}>
                                    <img src={asking} className={styles.faqIcon} alt="자주묻는 질문 아이콘"/>
                                    <div className={styles.faqDetails}>
                                        <div className={styles.faqTitle}>{faq.title}</div>
                                        <div className={styles.faqSubtitle}>{faq.category}</div>
                                    </div>
                                </div>
                                {/* FAQ의 번호와 인덱스가 같으면 열림 */}
                                {faqContent === idx && (
                                    <div>
                                        {/* 선 */}
                                        <div className={styles.faqDivider}></div>
                                        <div className={styles.faqContent}>
                                            {/* 일단 이미지 넣었는데 내용 중간에 넣는건 아직 현재 내용 맨위 */}
                                            {faq.image && <img src={faq.image} className={styles.faqContentImage} alt="FAQ 이미지" />}
                                            <div className={styles.faqContentText}>{faq.content}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        
                    </div>
                );
            case 1:
                return (
                    <div>
                        <div className={styles.inqContainer}>
                            <div className={styles.inyHeader}>
                                <img src={inquireIcon} className={styles.inqIcon} alt="문의하기 아이콘" />
                                <span>문의하기</span>
                            </div>
                            <div className={styles.inqDivider}></div>
                            <div className={styles.inqForm}>
                                <div className={styles.inqField}>
                                    <label>문의 종류</label>
                                    <div onClick={() => setDropdownOpen(!dropdownOpen)} className={styles.inqSelect}>
                                        {selectedOption}
                                    </div>
                                    {dropdownOpen && (
                                        <ul className={styles.dropdown}>
                                            {["시스템 관련", "오류", "이용 제한", "요청", "도용.보안", "권리 보호", "계정 관리"].map((option, index) => (
                                                <div key={index} className={styles.dropdownItem} onClick={() => optionSelect(option)}>
                                                    {option}
                                                </div>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className={styles.inqField}>
                                    <label>제목: </label>
                                    <input type="text" placeholder="문의 제목을 입력하세요." className={styles.inqInput} />
                                </div>
                                <div className={styles.inqField}>
                                    {/* &#13; = 엔터 */}
                                    <textarea className={styles.inqTextarea} 
                                    placeholder="문의 내용을 입력하세요.&#13;&#13;내용 중 욕설, 비판, 악의적인 글, 악의적인 신고 등은 역제제 당할 수 있습니다. 올바른 문의 내용을 입력해주시기 바랍니다."></textarea>
                                </div>
                                <div className={styles.inqField}>
                                    <div className={styles.fileUpload}>
                                        <img src={addIcon} className={styles.uploadIcon} alt="파일 추가 버튼 아이콘" />
                                    </div>
                                </div>
                                <div className={styles.submitButtonContainer}>
                                    <button className={styles.submitButton}>문의 넣기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className={styles.inquiryContainer}>
                            {inquiryList.length === 0 ? (
                                <div className={styles.noHistory}>문의 내역이 없습니다.</div>
                            ) : (
                            inquiryList.map((inquiry, idx) => (
                                    <div onClick={() => openedInquiry(idx)} className={styles.inquiryItem}>
                                        <div className={styles.inquiryHeader}>
                                            <img src={reply} className={styles.inquiryIcon} alt="답변 아이콘"/>
                                            <div className={styles.inquiryDetails}>
                                                <div className={styles.inquiryTitleContainer}>
                                                    <div className={styles.inquiryTitle}>문의하신 내용을 답변 받았습니다.</div>
                                                    <div className={styles.inquiryResponse}>답변완료</div>
                                                </div>
                                                <div className={styles.inquirySubtitle}>문의 제목: {inquiry.title}</div>
                                            </div>
                                        </div>
                                        {inquiryContent === idx && (
                                            <div>
                                                {/* 선 */}
                                                <div className={styles.faqDivider}></div>
                                                <div className={styles.faqContent}>
                                                    {/* 일단 이미지 넣었는데 내용 중간에 넣는건 아직 현재 내용 맨위 */}
                                                    {inquiry.image && <img src={inquiry.image} className={styles.faqContentImage} alt="FAQ 이미지" />}
                                                    <div className={styles.faqContentText}>{inquiry.content}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div className={styles.sanctionContainer}>
                            <div className={styles.sanctionList}>
                                {currentSanctions.length === 0 ? (
                                    <div className={styles.noHistory}>제재 받은 내역이 없습니다.</div>
                                ) : (
                                    currentSanctions.map((sanction, index) => (
                                        <div key={index} className={styles.sanctionItem}>
                                            <img src={report} className={styles.sanctionIcon} alt="제재 아이콘"/>
                                            <div className={styles.sanctionDetails}>
                                                <div className={styles.sanctionTitle}>{userState.nickName}님은 계정 정지 {sanction.date}일을 받았어요.</div>
                                                <div className={styles.sanctionContent}>
                                                    <div className={styles.sanctionSubtitle}>신고내용: {sanction.reason}</div>
                                                    <div className={styles.sanctionDate}>~ {sanction.endDate} 까지</div>
                                                </div>
                                            </div>
                                            {index < currentSanctions.length - 1 && <div className={styles.sanctionDivider}></div>}
                                        </div>
                                    ))
                                )}
                            </div>
                            {Math.ceil(sanctions.length / sectionsPerPage) > 1 && (
                                <div className={styles.pagination}>
                                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={styles.pagePreButton}>
                                        <img src={btnLeft} alt="Previous Page" />
                                    </button>
                                    <span className={styles.pageInfo}>{currentPage} / {Math.ceil(sanctions.length / sectionsPerPage)}</span>
                                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(sanctions.length / sectionsPerPage)} className={styles.pageNextButton}>
                                        <img src={btnRight} alt="Next Page" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.serviceBanner}>
                <div className={styles.bannerPosition}>
                    <div className={styles.logoTitle}>고객센터</div>
                    <div className={styles.logoPosition}>
                        <img src={serviceLogo} className={styles.serviceLogo} alt="고객센터 로고"/>
                    </div>
                </div>
            </div>
            <div className={styles.serviceContents}>
                <div className={styles.serviceNav}>
                    <div className={styles.navContent}>
                        <div className={`${styles.navItems} ${tab === 0 ? styles.active : ''}`} 
                            onClick={() => setTab(0)}>
                            자주묻는 질문
                        </div>
                        <div className={`${styles.navItems} ${tab === 1 ? styles.active : ''}`} 
                            onClick={() => setTab(1)}>
                            문의하기
                        </div>
                        <div className={`${styles.navItems} ${tab === 2 ? styles.active : ''}`} 
                            onClick={() => setTab(2)}>
                            문의 내역
                        </div>
                        <div className={`${styles.navItems} ${tab === 3 ? styles.active : ''}`} 
                            onClick={() => setTab(3)}>
                            내 제재 내역
                        </div>
                    </div>
                </div>
                <div className={styles.serviceTabContent}>
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}

export default CustomerServiceCenter;
