import React, { useState } from 'react';
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
    const sanctions = [
        {
            date: "9999.12.12",
            title: "재열님은 댓글달기 정지 30일을 받았어요.",
            reason: "욕설, 악의적인 주도, 선동"
        },
        {
            date: "9999.12.12",
            title: "재열님은 댓글달기 정지 30일을 받았어요.",
            reason: "욕설, 악의적인 주도, 선동"
        },
        {
            date: "9999.12.12",
            title: "재열님은 댓글달기 정지 30일을 받았어요.",
            reason: "욕설, 악의적인 주도, 선동"
        },
        {
            date: "9999.12.12",
            title: "재열님은 댓글달기 정지 30일을 받았어요.",
            reason: "욕설, 악의적인 주도, 선동"
        },
        {
            date: "9999.12.12",
            title: "재열님은 댓글달기 정지 30일을 받았어요.",
            reason: "욕설, 악의적인 주도, 선동"
        },
        {
            date: "9999.12.12",
            title: "재열님은 댓글달기 정지 30일을 받았어요.",
            reason: "욕설, 악의적인 주도, 선동"
        },
        {
            date: "9999.12.12",
            title: "재열님은 댓글달기 정지 30일을 받았어요.",
            reason: "욕설, 악의적인 주도, 선동"
        },
        {
            date: "9999.12.12",
            title: "재열님은 댓글달기 정지 30일을 받았어요.",
            reason: "욕설, 악의적인 주도, 선동"
        },
        {
            date: "9999.12.12",
            title: "재열님은 댓글달기 정지 30일을 받았어요.",
            reason: "욕설, 악의적인 주도, 선동"
        },
        {
            date: "9999.12.12",
            title: "재열님은 댓글달기 정지 30일을 받았어요.",
            reason: "욕설, 악의적인 주도, 선동"
        },
        {
            date: "9999.12.12",
            title: "재열님은 댓글달기 정지 30일을 받았어요.",
            reason: "욕설, 악의적인 주도, 선동"
        }
    ];
    let [currentPage, setCurrentPage] = useState(1);
    let [isDropdownOpen, setIsDropdownOpen] = useState(false);
    let [selectedOption, setSelectedOption] = useState("선택하세요");
    const sanctionsPerPage = 10;
    const indexOfLastSanction = currentPage * sanctionsPerPage;
    const indexOfFirstSanction = indexOfLastSanction - sanctionsPerPage;
    const currentSanctions = sanctions.slice(indexOfFirstSanction, indexOfLastSanction);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    const renderTabContent = () => {
        switch (tab) {
            case 0:
                return (
                    <div className={styles.faqContainer}>
                        <div className={styles.faqTitle}>자주 묻는 질문</div>
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className={styles.faqItem}>
                                <div className={styles.faqQuestion}>자주 묻는 질문 {index + 1}</div>
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
                                    <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={styles.inqSelect}>
                                        {selectedOption}
                                    </div>
                                    {isDropdownOpen && (
                                        <ul className={styles.dropdown}>
                                            {["시스템 관련", "오류", "이용 제한", "요청", "도용.보안", "권리 보호", "계정 관리"].map((option, index) => (
                                                <div key={index} className={styles.dropdownItem} onClick={() => handleOptionSelect(option)}>
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
                                    <textarea className={styles.inqTextarea} placeholder="문의 내용을 입력하세요.&#13;&#13;내용 중 욕설, 비판, 악의적인 글, 악의적인 신고 등은 역제제 당할 수 있습니다. 올바른 문의 내용을 입력해주시기 바랍니다."></textarea>
                                </div>
                                <div className={styles.inqField}>
                                    <div className={styles.fileUpload}>
                                        <img src={addIcon} alt="추가 아이콘" className={styles.uploadIcon} />
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
                            <div className={styles.inquiryList}>
                                {[
                                    {
                                        date: "24.06.09",
                                        title: "테스트1"
                                    },
                                    {
                                        date: "24.06.09",
                                        title: "테스트2"
                                    },
                                    {
                                        date: "24.06.09",
                                        title: "테스트3"
                                    }
                                ].map((inquiry, index) => (
                                    <div key={index} className={styles.inquiryItem}>
                                        <img src={reply} className={styles.inquiryIcon} alt="답변 아이콘"/>
                                        <div className={styles.inquiryDetails}>
                                            <div className={styles.inquiryTitle}>문의하신 내용을 답변 받았습니다. ({inquiry.date})</div>
                                            <div className={styles.inquirySubtitle}>문의 제목: {inquiry.title}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <div className={styles.sanctionContainer}>
                            <div className={styles.sanctionList}>
                                {currentSanctions.map((sanction, index) => (
                                    <div key={index} className={styles.sanctionItem}>
                                        <img src={report} className={styles.sanctionIcon} alt="제재 아이콘"/>
                                        <div className={styles.sanctionDetails}>
                                            <div className={styles.sanctionTitle}>{sanction.title}</div>
                                            <div className={styles.sanctionContent}>
                                                <div className={styles.sanctionSubtitle}>신고내용: {sanction.reason}</div>
                                                <div className={styles.sanctionDate}>~ {sanction.date} 까지</div>
                                            </div>
                                        </div>
                                        {index < currentSanctions.length - 1 && <div className={styles.sanctionDivider}></div>}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.pagination}>
                                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={styles.pagePreButton}>
                                    <img src={btnLeft} alt="Previous Page" />
                                </button>
                                <span className={styles.pageInfo}>{currentPage} / {Math.ceil(sanctions.length / sanctionsPerPage)}</span>
                                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(sanctions.length / sanctionsPerPage)} className={styles.pageNextButton}>
                                    <img src={btnRight} alt="Next Page" />
                                </button>
                            </div>
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
                        <img src={serviceLogo} alt="고객센터 로고"/>
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
                            내 제제 내역
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
