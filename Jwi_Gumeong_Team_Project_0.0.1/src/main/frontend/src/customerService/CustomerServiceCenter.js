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
import AlarmModal from '../modal/AlarmModal.js';

function CustomerServiceCenter() {
    let [tab, setTab] = useState(0);
    const userKey = useSelector((state) => state.session.userKey); // Redux에서 userKey 가져오기
    const [sanctions, setSanctions] = useState([]); // 제재 내역
    const userState = useSelector((state) => state.userState);  // 로그인한 유저 정보??
    const [inquiries, setInquiries] = useState([]); // 문의 내역

    // 알림 모달
    const [modalOpen, setModalOpen] = useState(false);
    // 모달 내용
    const [modalContent, setModalContent] = useState('');

    const closeModal = () => {
        setModalOpen(false);
    };

    // 제재 내역
    useEffect(() => {
        if (userKey) {
            // userKey가 있을 때만 API 호출
            axios.post('/sanction/list', null, {
                params: { userKey }
            })
            .then(response => {
                if (response.data.result === "success") {
                    setSanctions(response.data.sanctionList);
                }
            })
            .catch(error => {
                console.log("API 호출 오류: " + error.message);
            });

            // 문의 내역
            axios.post('/inquiry/list', { userKey }) 
            .then(response => {
                if (response.data.result === "success") {
                    setInquiries(response.data.inquiryList);
                }
            })
            .catch(error => {
                console.log("문의 내역 가져오기 실패: " + error.message);
            });
        }
    }, [userKey]); // userKey가 변경될 때마다 호출

    // 문의하기
    // 파일 업로드 상태 및 문의
    const [files, setFiles] = useState([]);
    const [form, setForm] = useState({
        title: '',
        category: '',
        details: ''
    });
    const [inputComplete, setInputComplete] = useState(false);

    // 입력 창 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        // 전부 입력 했는지 확인
        if (form.title && form.category && form.details) {
            setInputComplete(true);
        } else {
            setInputComplete(false);
        }
    }, [form]);

    // 파일 변경
    const fileChange = (event) => {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const selectedFiles = Array.from(event.target.files);

        for (let file of selectedFiles) {
            if (file.size > maxSize) {
                setModalContent("파일 크기는 10MB를 초과할 수 없습니다.");
                setModalOpen(true);
                return;
            }
        }

        if (files.length + selectedFiles.length > 5) {
            setModalContent("최대 5개의 파일만 업로드할 수 있습니다.");
            setModalOpen(true);
            return;
        }

        const previewFiles = selectedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setFiles([...files, ...previewFiles]);
    };
    // 문의 제출
    const submit = (event) => {
        event.preventDefault();
        if (!inputComplete) return; // 내용을 다 입력하지 않으면 버튼 작동 X

        const formData = new FormData();
        formData.append("userKey", userKey);
        formData.append("title", form.title);
        formData.append("category", form.category);
        formData.append("details", form.details);
        files.forEach(file => formData.append("files", file.file));
        
        axios.post('/inquiry/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            if(response.data.result == "success") {
                setModalContent("문의가 성공적으로 접수되었습니다.");
                setModalOpen(true);
                // 내용 비우기
                setForm({
                    title: '',
                    category: '',
                    details: ''
                });
                setFiles([]);
                setSelectedOption("선택하세요");
            } else {
                setModalContent("문의 등록에 실패하였습니다.");
                setModalOpen(true);
            }
        })
        .catch(error => {
            console.log("문의 등록 실패: " + error.message);
        });
    };

    const [faqs, setFaqs] = useState([]);
    // 자주 묻는 질문 Axios
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
        setSelectedOption(option); // 드롭다운에서 선택한 옵션을 상태로 설정
        setForm({ ...form, category: option }); // 선택한 옵션을 category에 설정
        setDropdownOpen(false); // 드롭다운 닫기
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
                                        <div className={styles.dropdown}>
                                            {["시스템 관련", "본인인증", "오류/버그", "신고", "제안", "도용", "보안", "기타"].map((option, index) => (
                                                <div key={index} className={styles.dropdownItem} onClick={() => optionSelect(option)}>
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.inqField}>
                                    <label>제목: </label>
                                    <input 
                                        type="text" 
                                        name="title"
                                        value={form.title} 
                                        onChange={handleInputChange} 
                                        placeholder="문의 제목을 입력하세요." 
                                        className={styles.inqInput} 
                                    />
                                </div>
                                <div className={styles.inqField}>
                                    <textarea 
                                        name="details"
                                        value={form.details} 
                                        onChange={handleInputChange}
                                        className={styles.inqTextarea} 
                                        placeholder="문의 내용을 입력하세요."
                                    ></textarea>
                                </div>
                                <div className={styles.inqField}>
                                    <div className={styles.imageBox}>
                                        {files.map((fileObj, index) => (
                                            <div key={index} className={styles.uploadedFile}>
                                                <img src={fileObj.preview} alt={fileObj.file.name} style={{maxWidth: "100px", maxHeight: "100px"}} />
                                            </div>
                                        ))}
                                        {files.length < 5 && (
                                            <div className={styles.fileUpload}>
                                                <label htmlFor="file-upload">
                                                    <img src={addIcon} className={styles.uploadIcon} alt="파일 추가 버튼 아이콘" />
                                                </label>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={fileChange}
                                                    multiple
                                                    style={{ display: 'none' }}/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.submitButtonContainer}>
                                    <button 
                                        onClick={submit} 
                                        className={inputComplete ? styles.activeSubmitButton : styles.disabledSubmitButton}
                                        disabled={!inputComplete}>
                                        문의 넣기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div className={styles.inquiryContainer}>
                            {inquiries.length === 0 ? (
                                <div className={styles.noHistory}>문의 내역이 없습니다.</div>
                            ) : (
                                inquiries.map((inquiry, idx) => (
                                    <div onClick={() => openedInquiry(idx)} className={styles.inquiryItem} key={idx}>
                                        <div className={styles.inquiryHeader}>
                                            <img src={reply} className={styles.inquiryIcon} alt="답변 아이콘"/>
                                            <div className={styles.inquiryDetails}>
                                                <div className={styles.inquiryTitleContainer}>
                                                    <div className={styles.inquiryTitle}>{inquiry.title}</div>
                                                    <div className={styles.inquiryResponse}>{inquiry.responseStatus}</div>
                                                </div>
                                                <div className={styles.inquirySubtitle}>문의 날짜: {inquiry.createdAt}</div>
                                            </div>
                                        </div>
                                        {inquiryContent === idx && (
                                            <div>
                                                <div className={styles.faqDivider}></div>
                                                <div className={styles.faqContent}>
                                                    <div className={styles.faqContentText}>{inquiry.details}</div>
                                                    {inquiry.image && <img src={inquiry.image} className={styles.faqContentImage} alt="첨부 이미지" />}
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
            {modalOpen && 
                <AlarmModal content={<div className={styles.alarmModal}>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    );
}

export default CustomerServiceCenter;
