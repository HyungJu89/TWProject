import React, {  useEffect, useState } from 'react';
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
import closeModalIcon from '../icon/btn/btn-image-Close.png';
import closeModalIconHover from '../icon/btn/btn-image-Close-a.png';
import leftIcon from '../icon/40px/chevron-left-w.png';
import rightIcon from '../icon/40px/chevron-right-w.png';
import removeIcon from '../icon/btn/bnt_img_x.png';

function CustomerServiceCenter() {
    const [tab, setTab] = useState(0);
    const userKey = useSelector((state) => state.session.userKey); // Redux에서 userKey 가져오기
    const [sanctions, setSanctions] = useState([]); // 제재 내역
    // const userState = useSelector((state) => state.userState); // 로그인한 유저 정보??
    const [inquiries, setInquiries] = useState([]); // 문의 내역
    const [inquiryResponses, setInquiryResponses] = useState({}); // 문의 답변
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [dropdownOpen, setDropdownOpen] = useState(false); // 문의 종류 드롭다운
    const [selectedOption, setSelectedOption] = useState("선택하세요"); // 문의 종류 최초 상태
    const [faqs, setFaqs] = useState([]); // 자주 묻는 질문 리스트
    const [faqContent, setFaqContent] = useState(null); // 자주 묻는 질문 내용
    const [inquiryContent, setInquiryContent] = useState(null); // 문의 내역 내용
    const [nickName, setNickName] = useState(null);
    // 문의 내용이 전부 있는지
    const [inputComplete, setInputComplete] = useState(false);
    // 알림 모달
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    // 이미지 모달
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [imageList, setImageList] = useState([]);
    const [closeButtonHovered, setCloseButtonHovered] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        setCloseButtonHovered(false); // 버튼 호버초기화
    }, [imageModalOpen]);

    useEffect(() => {
        // 자주 묻는 질문 리스트 불러오기
        axios.get('/faq/list')
            .then(response => {
                if (response.data.result === "success") {
                    setFaqs(response.data.list);
                } else {
                    console.log("FAQ 리스트 불러오기 실패");
                }
            })
            .catch(error => {
                console.log("자주묻는 질문 불러오기 오류: " + error.message);
            });
    }, []);

    useEffect(() => {
        if (userKey) {
            if (tab === 2) {
                // 문의 내역
                axios.post('/inquiry/list', null, {
                    params: { userKey }
                })
                .then(response => {
                    if (response.data.result === "success") {
                        setInquiries(response.data.inquiryList);

                        // 문의 답변
                        response.data.inquiryList.forEach(inquiry => {
                            axios.post('/inquiry/response', null, {
                                params: { inquiryKey: inquiry.inquiryKey }
                            })
                            .then(respon => {
                                if (respon.data.result === "success") {
                                    setInquiryResponses(prevResponses => ({
                                        ...prevResponses,
                                        [inquiry.inquiryKey]: respon.data.response // 각 문의마다 응답 저장
                                    }));
                                }
                            })
                            .catch(error => {
                                console.log("문의 답변 가져오기 실패: " + error.message);
                            });
                        });
                    } else {
                        // 문의 내역이 없을 경우 길이 0으로 초기화
                        setInquiries([]);
                    }
                })
                .catch(error => {
                    console.log("문의 내역 가져오기 실패: " + error.message);
                });
            } else if (tab === 3) {
                // 제재내역
                axios.post('/sanction/list', null, {
                    params: { userKey, page: currentPage, limitPage: 10 }
                })
                .then(response => {
                    if (response.data.result === "success") {
                        setSanctions(response.data.sanctionList); // 제재 내역 불러와서 저장
                        setTotalPages(response.data.paging.pageCount); // 총 페이지 수 설정
                    } else {
                        setSanctions([]);
                    }
                })
                .catch(error => {
                    console.log("제재내역 불러오기 오류: " + error.message);
                });

                axios.post('/sanction/user', null, {params: {userKey: userKey}})
                .then(response => {
                    if(response.data.result === "success") {
                        setNickName(response.data.nickName);
                    } else {
                        setNickName("알수없음");
                    }
                })
                .catch(error => {
                    console.log("닉네임 불러오기 오류: " + error.message);
                })
            }
        }
    }, [userKey, tab, currentPage]);

    // 문의 하기 내용
    const [files, setFiles] = useState([]); // 문의 넣을 때 이미지
    const [form, setForm] = useState({
        title: '', // 문의 제목
        category: '', // 문의 종류
        details: '' // 문의 내용
    });
    // 문의 종류 선택
    const optionSelect = (option) => {
        setSelectedOption(option);
        setForm({ ...form, category: option });
        setDropdownOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // 제목, 내용, 종류에 전부 입력 했을 시 문의넣기 버튼 활성화
    useEffect(() => {
        if (form.title && form.category && form.details) {
            setInputComplete(true);
        } else {
            setInputComplete(false);
        }
    }, [form]);

    // 이미지 추가
    const fileChange = (event) => {
        // 이미지 최대 사이즈 정의 (안하면 몇몇 이미지 크다고 안 들어감)
        const maxSize = 10 * 1024 * 1024;
        const selectedFiles = Array.from(event.target.files);
        // 이미지가 너무 큰 파일인지
        for (let file of selectedFiles) {
            if (file.size > maxSize) {
                setModalContent("파일 크기는 10MB를 초과할 수 없습니다.");
                setModalOpen(true);
                return;
            }
        }
        // 이미지 개수 제한
        if (files.length + selectedFiles.length > 5) {
            setModalContent("최대 5개의 파일만 업로드할 수 있습니다.");
            setModalOpen(true);
            return;
        }
        // 위 조건 만족시 이미지 저장
        const previewFiles = selectedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setFiles([...files, ...previewFiles]);
    };

    // 이미지 제거
    const removeImage = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    // 문의 제출
    const submit = (event) => {
        event.preventDefault();
        if (!inputComplete) return;
        // 위에서 설정한 데이터들을 하나에 저장
        const formData = new FormData();
        formData.append("userKey", userKey);
        formData.append("title", form.title);
        formData.append("category", form.category);
        formData.append("details", form.details);
        files.forEach(file => formData.append("files", file.file));

        axios.post('/inquiry/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', //이미지 때문에 넣음
            }
        })
        .then(response => {
            if(response.data.result === "success") {
                // 성공 시 접수 성공 모달 띄우기
                setModalContent("문의가 성공적으로 접수되었습니다.");
                setModalOpen(true);
                // 모달 닫으면 적었던 내용 초기화
                setForm({
                    title: '',
                    category: '',
                    details: ''
                });
                setFiles([]);
                setSelectedOption("선택하세요");
            } else {
                // 실패 시
                setModalContent("문의 등록에 실패하였습니다.");
                setModalOpen(true);
            }
        })
        .catch(error => {
            console.log("문의 등록 실패: " + error.message);
        });
    };

    // faq 클릭시 상세 내용 표시
    const openedFaq = (idx) => {
        setFaqContent(faqContent === idx ? null : idx);
    };
    // 문의 내역 클릭시 상새 내용 표시
    const openedInquiry = (idx) => {
        setInquiryContent(inquiryContent === idx ? null : idx);
    };
    // 문의 내역 이미지 클릭시 모달 오픈
    const openImageModal = (images, index) => {
        setImageList(images);
        setSelectedImageIndex(index);
        setImageModalOpen(true);
    };
    // 닫기 버튼 누를 시 모달 닫힘
    const closeImageModal = () => {
        setImageModalOpen(false);
    };
    // 모달에서 이전 버튼 누를 시 이미지 이전 이미지로 바뀜
    const previousImage = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };
    // 모달에서 다음 버튼 누를 시 이미지 다음 이미지로 바뀜
    const nextImage = () => {
        if (selectedImageIndex < imageList.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };
    // 각 탭 별 화면
    const renderTabContent = () => {
        switch (tab) {
            // 자주묻는 질문
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
                                {faqContent === idx && (
                                    <div>
                                        <div className={styles.faqDivider}></div>
                                        {/* 자주 묻는 질문 이미지 넣어 놨는데 안 쓸거 같음 */}
                                        <div className={styles.faqContent}>
                                            {faq.image && <img src={faq.image} className={styles.faqContentImage} alt="FAQ 이미지" />}
                                            <div className={styles.faqContentText}>{faq.content}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );
            // 문의하기
            case 1:
                return (
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
                                {/* 문의 종류 선택 드롭다운 */}
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
                            {/* 내용 입력 칸 */}
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
                                    {/* 이미지 미리 보기 */}
                                    {files.map((fileObj, index) => (
                                        <div key={index} className={styles.uploadedFile}>
                                            <img src={fileObj.preview} alt={fileObj.file.name} style={{maxWidth: "100px", maxHeight: "100px"}} />
                                            {/* 이미지 제거 버튼 */}
                                            <button className={styles.removeButton} onClick={() => removeImage(index)}>
                                                <img src={removeIcon} alt="이미지 제거" />
                                            </button>
                                        </div>
                                    ))}
                                    {/* 이미지가 5개보다 적을 때 추가 버튼 보임  */}
                                    {/* 이미지 넣을 때마다 한칸씩 오른쪽으로 */}
                                    {files.length < 5 && (
                                        <div className={styles.fileUpload} onClick={() => document.getElementById('file-upload').click()}>
                                            <img src={addIcon} className={styles.uploadIcon} alt="파일 추가 버튼 아이콘" />
                                            <input id="file-upload" type="file" accept="image/*" onChange={fileChange}
                                                multiple style={{ display: 'none' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.submitButtonContainer}>
                                {/* 문의 내용이 전부 입력이 안 되었을 때 버튼 비 활성화 */}
                                <button onClick={submit} 
                                    className={inputComplete ? styles.activeSubmitButton : styles.disabledSubmitButton}
                                    disabled={!inputComplete}>
                                    문의 넣기
                                </button>
                            </div>
                        </div>
                    </div>
                );
            //문의 내역
            case 2:
                return (
                    <div className={styles.inquiryContainer}>
                        {/* 문의 내용이 없을 시 */}
                        {inquiries.length === 0 ? (
                            <div className={styles.noHistory}>문의 내역이 없습니다.</div>
                        ) : (
                            inquiries.map((inquiry, idx) => {
                                const response = inquiryResponses[inquiry.inquiryKey];
                                // 날짜 형식 변경 2024년 O월 O일
                                const formattedDate = response ? new Intl.DateTimeFormat('ko', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                }).format(new Date(response.createdAt)) : '-'; // 날짜가 없으면 - 로 표시
                                
                                return (
                                    <div key={idx} className={styles.inquiryItem}>
                                        {/* 클릭한 내역 내용 오픈 */}
                                        <div onClick={() => openedInquiry(idx)}>
                                            <div className={styles.inquiryHeader}>
                                                <img src={reply} className={styles.inquiryIcon} alt="답변 아이콘"/>
                                                <div className={styles.inquiryDetails}>
                                                    <div className={styles.inquiryTitleContainer}>
                                                        <div className={styles.inquiryTitle}>{inquiry.title}</div>
                                                        {response && (
                                                            <div className={styles.inquiryResponse}>답변완료</div>
                                                        )}
                                                    </div>
                                                    <div className={styles.inquirySubtitle}>답변 받은 날짜: {formattedDate}</div>
                                                </div>
                                            </div>
                                        </div>
                                        {inquiryContent === idx && (
                                            <div>
                                                <div className={styles.faqDivider}></div>
                                                <div className={styles.faqContent}>
                                                    <div className={styles.faqContentText}>{inquiry.details}</div>
                                                    <div className={styles.inquiryImageBox}>
                                                        {/* 이미지 목록에서 , 를 기준으로 자름 */}
                                                        {inquiry.image && inquiry.image.split(',').map((imgUrl, imgIdx) => (
                                                            // 이미지 링크 앞 뒤 공백 제거 해서 표시
                                                            <img key={imgIdx} 
                                                                src={`http://localhost:9090/images/${imgUrl.trim()}`}
                                                                className={styles.inquiryContentImage}
                                                                onClick={() => openImageModal(inquiry.image.split(','), imgIdx)}
                                                                alt="문의 이미지"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                {response && (
                                                    <div>
                                                        <div className={styles.faqDivider}></div>
                                                        <div className={styles.responsHeader}>답변</div>
                                                        <div className={styles.responseContent}>
                                                            <div className={styles.responseContentText}>
                                                                {response.responseText}
                                                            </div>
                                                            {response.image && (
                                                                <div className={styles.inquiryImageBox}>
                                                                    {/* 이미지 목록에서 , 를 기준으로 자름 */}
                                                                    {response.image.split(',').map((imgUrl, imgIdx) => (
                                                                        // 이미지 링크 앞 뒤 공백 제거 해서 표시
                                                                        <img key={imgIdx} 
                                                                            src={`http://localhost:9090/images/${imgUrl.trim()}`}
                                                                            className={styles.inquiryContentImage}
                                                                            onClick={() => openImageModal(response.image.split(','), imgIdx)}
                                                                            alt="답변 이미지"
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                );
            // 제재 내역
            case 3:
                return (
                    <div className={styles.sanctionContainer}>
                        <div className={styles.sanctionList}>
                            {/* 내역이 없을 시 */}
                            {sanctions.length === 0 ? (
                                <div className={styles.noHistory}>제재 받은 내역이 없습니다.</div>
                            ) : (
                                // 제재 내역이 있을 시
                                sanctions.map((sanction, index) => (
                                    <div key={index} className={styles.sanctionItem}>
                                        <img src={report} className={styles.sanctionIcon} alt="제재 아이콘"/>
                                        <div className={styles.sanctionDetails}>
                                            <div className={styles.sanctionTitle}>{nickName}님은 계정 정지 {sanction.date}일을 받았어요.</div>
                                            <div className={styles.sanctionContent}>
                                                <div className={styles.sanctionSubtitle}>신고내용: {sanction.reason}</div>
                                                <div className={styles.sanctionDate}>~ {sanction.endDate} 까지</div>
                                            </div>
                                        </div>
                                        {index < sanctions.length - 1 && <div className={styles.sanctionDivider}></div>}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 페이징 */}
                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className={styles.pagePreButton}>
                                    <img src={btnLeft} alt="이전 페이지" />
                                </button>
                                {/* 현재 페이지 / 전체 페이지 */}
                                <div className={styles.pageInfo}>{currentPage} / {totalPages}</div>
                                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className={styles.pageNextButton}>
                                    <img src={btnRight} alt="다음 페이지" />
                                </button>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    // 고객센터 전체 화면
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
            {/* 알람 모달 */}
            {modalOpen && 
                <AlarmModal content={<div className={styles.alarmModal}>{modalContent}</div>} onClose={closeModal} />
            }
            {/* 이미지 모달 */}
            {imageModalOpen && (
                <div className={styles.imageModalContainer}>
                    {/* 닫기 버튼 */}
                    <button onClick={closeImageModal} className={styles.imageModalCloseButton}
                    onMouseEnter={() => setCloseButtonHovered(true)} onMouseLeave={() => setCloseButtonHovered(false)}>
                        <img src={closeButtonHovered ? closeModalIconHover : closeModalIcon} alt="닫기" />
                    </button>
                    <div className={styles.imageModalContent}>
                        {/* 이미지가 맨 처음일 때 이전 버튼 안 보임 */}
                        {selectedImageIndex === 0 && (
                            <button onClick={previousImage} className={styles.imageModalPrevButton}>
                                <img src={leftIcon} alt="공백 이미지" className={styles.airBox}/>
                            </button>
                        )}  
                        {/* 이미지가 맨 처음이 아닐 때 이전버튼 */}
                        {selectedImageIndex > 0 && (
                            <button onClick={previousImage} className={styles.imageModalPrevButton}>
                                <img src={leftIcon} alt="이전 이미지" />
                            </button>
                        )}  
                        {/* 이미지 */}
                        <div className={styles.imageModalImage} >
                            <img src={`http://localhost:9090/images/${imageList[selectedImageIndex].trim()}`} alt="문의 이미지 확대" />
                        </div>
                        {/* 이미지가 마지막이 아닐때 다음 버튼 표시 */}
                        {selectedImageIndex < imageList.length - 1 && (
                            <button onClick={nextImage} className={styles.imageModalNextButton}>
                                <img src={rightIcon} alt="다음 이미지" />
                            </button>
                        )}
                        {/* 이미지가 마지막일 때 다음 버튼 안 보임 */}
                        {selectedImageIndex === imageList.length - 1 && (
                            <button onClick={nextImage} className={styles.imageModalNextButton}>
                                <img src={rightIcon} className={styles.airBox} alt="공백 이미지" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerServiceCenter;
