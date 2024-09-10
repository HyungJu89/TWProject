import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCookie } from '../cookies/Cookies.js';
import search from '../icon/24px/search.png';
import addIcon from '../icon/40px/add.png';
import leftIcon from '../icon/40px/chevron-left-w.png';
import rightIcon from '../icon/40px/chevron-right-w.png';
import removeIcon from '../icon/btn/bnt_img_x.png';
import closeModalIconHover from '../icon/btn/btn-image-Close-a.png';
import closeModalIcon from '../icon/btn/btn-image-Close.png';
import reply from '../icon/img/reply-ing.png';
import serviceLogo from '../icon/img/service-Illustration.png';
import AlarmModal from '../modal/AlarmModal.js';
import AdminPaging from './AdminPaging.js';
import styles from './style/AdminMain.module.css';

function AdminMain() {
    
    const [tab, setTab] = useState(0);
    const userKey = useSelector((state) => state.session.userKey); // Redux에서 userKey 가져오기
    const [sanctions, setSanctions] = useState([]); // 제재 내역
    const [inquiries, setInquiries] = useState([]); // 문의 내역
    const [inquiryResponses, setInquiryResponses] = useState({}); // 문의 답변
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [dropdownOpen, setDropdownOpen] = useState(false); // 문의 종류 드롭다운
    const [dropdownOpen2, setDropdownOpen2] = useState(false); // 문의 종류 드롭다운2
    const [dropdownOpen3, setDropdownOpen3] = useState(false); // 검색 종류 드롭다운
    const [selectedOption, setSelectedOption] = useState("선택하세요"); // 문의 종류 최초 상태
    const [selectedOption2, setSelectedOption2] = useState("선택하세요"); // 문의 종류 최초 상태
    const [selectedOption3, setSelectedOption3] = useState("닉네임"); // 문의 종류 최초 상태
    const [faqContent, setFaqContent] = useState(null); // 자주 묻는 질문 내용
    const [inquiryContent, setInquiryContent] = useState(null); // 문의 내역 내용
    const [nickName, setNickName] = useState(null);
    const [searchUserInput,setSearchUserInput] = useState(''); // 유저 검색
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
    const cookieCheck = getCookie('frontCookie');
    const [users, setUsers] = useState([]);
    const [usersCopy, setUsersCopy] = useState([]);
    const [moreBtnOption,setMoreBtnOption] = useState(false);
    const [banned, setBanned] = useState([]);
    const [revertBtn,setRevertBtn] = useState(false);
    const [update,setUpdate] = useState(false);
    const [report,setReport] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);

    const handleItemsChange = (items) => {
        setCurrentItems(items);
    };

    const handleEnter = (e) => {
        console.log(e);
        if (e.key === "Enter" || e === "enter") {
            switch (selectedOption3) {
                case "닉네임":
                    setUsers(usersCopy.filter(userData => userData.nickName.includes(searchUserInput)));
                    break;
                case "이메일":
                    setUsers(usersCopy.filter(userData => userData.email.includes(searchUserInput)));
                    break;
                default:
                    break;
            }    
        }
    };

    const searchUser = (userData)=>{

    }

    useEffect(() => {
        if(cookieCheck){
            axios.get('/admin/report')
            .then(response => {
                if (response.data) {
                    setReport(response.data);
                } else {
                    console.log("유저 리스트 불러오기 실패");
                }
                })
                .catch(error => {
                    console.log("API 호출 오류: " + error.message);
                });
        }
    }, [cookieCheck,update]);

    useEffect(() => {
        if(cookieCheck){
            axios.get('/admin/findAllUser')
                .then(response => {
                    if (response.data) {
                        setUsers(response.data);
                        setUsersCopy(response.data);
                    } else {
                        console.log("유저 리스트 불러오기 실패");
                    }
                })
                .catch(error => {
                    console.log("API 호출 오류: " + error.message);
                });
        }
    }, [cookieCheck,update]);

    useEffect(() => {
        if(cookieCheck){
            axios.get('/admin/findAllSanction')
                .then(response => {
                    if (response.data) {
                        setBanned(response.data);
                    } else {
                        console.log("밴 리스트 불러오기 실패");
                    }
                })
                .catch(error => {
                    console.log("API 호출 오류: " + error.message);
                });
        }
    }, [cookieCheck,update]);
    
    const removeImage = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };
    
    let sortRun = (btnData) =>{
        if(users){
            if(btnData === "reset"){
                return setUsers(usersCopy);
            }
            let copy = usersCopy.filter(item => item.state === btnData);
            setUsers(copy);
        }
    }
    
    // 중복제거 나중에할꺼야 개짜증남 ㅡㅡ
    // 내일합시다.
    // ㅋㅋ .some 함수를 왜 생각 못하고있었지 배열 2개 비교할때 너무좋음

    let sortRunReport = () =>{
        // 필터 사용해서 state가 unprocessed (신고접수) 값인 객체 데이터 전부 호출
        let reportData = report.filter(repot => repot.state === 'unprocessed');
        // 추가용 배열 선언
        let userReportData = [];
        // reportData(신고접수) 의 길이 만큼 반복문 진행
        for(let i = 0 ; i < reportData.length ; i++){
            // .some()함수 활용해서 미리 배열 선언한곳에 userKey와 reportData의 userKey를 비교 후
            // false로 반환된 데이터만 userReportData에 push
            // 즉 중복값이 없는 데이터만 들어가게끔
            if(!userReportData.some(data => data.userKey === reportData[i].reportUser.userKey)){
                userReportData.push(reportData[i].reportUser)
            }
        }
        // 예외처리
        if (userReportData.length > 0) {
            setUsers(userReportData);
        } else {
            alert("깨끗합니다");
        }
    }
    
    const updateBannedAct = (userKey) =>{
        if(cookieCheck){
            axios.get('/admin/revertBan',{params:{userKey : userKey}})
                .then(()=>{
                    setModalOpen(true);
                    setModalContent('밴 되돌리기에 성공하였습니다!');
                    setUpdate(prev => !prev);
                })
                .catch(error => {
                    console.log("API 호출 오류: " + error.message);
                });
        }
    }
    
    function updateBannedDeAct(userKeys){
        if(selectedOption !== "선택하세요"){
            if(selectedOption2 !== "선택하세요"){
                let dates = selectedOption2;
                if(selectedOption2 === "영구"){
                    dates = "99999";
                }
                let banData = {
                    userKey : userKeys,
                    reason : selectedOption,
                    date : dates
                }
                if(cookieCheck){
                    axios.post('/admin/banndUser',banData)
                        .then(()=>{
                            setModalOpen(true);
                            setModalContent('제재 처리가 완료되었습니다!');
                            setUpdate(prev => !prev);
                        })
                        .catch(error => {
                            console.log("API 호출 오류: " + error.message);
                        });
                }
            } else {
                setModalOpen(true);
                setModalContent('제재하실 날짜를 선택하세요!');
            }
        } else {
            setModalOpen(true);
            setModalContent('제재하실 목록을 선택하세요!');
        }
    }

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        setCloseButtonHovered(false); // 버튼 호버초기화
    }, [imageModalOpen]);

    useEffect(() => {
        if (tab === 2) {
            // 문의 내역
            axios.get('/admin/findInquiryAll')
            .then(response => {
                if (response.data) {
                    setInquiries(response.data);
                    // 문의 답변
                    response.data.forEach(inquiry => {
                        axios.post('/inquiry/response', null, {
                            params: { inquiryKey: inquiry.inquiryKey }
                        })
                        .then(respon => {
                            if (respon.data.result === "success") {
                                setInquiryResponses(
                                    prevResponses => ({
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
    }, [tab, currentPage, userKey, update]);

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
    // 문의 종류 선택
    const optionSelect2 = (option) => {
        setSelectedOption2(option);
        setForm({ ...form, category: option });
        setDropdownOpen2(false);
    };

    const optionSelect3 = (option) => {
        setSelectedOption3(option);
        setForm({ ...form, category: option });
        setDropdownOpen3(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // 제목, 내용, 종류에 전부 입력 했을 시 문의넣기 버튼 활성화
    // useEffect(() => {
    //     if (form.title && form.category && form.details ) {
    //         setInputComplete(true);
    //     } else {
    //         setInputComplete(false);
    //     }
    // }, [form]);

    useEffect(() => {
        if (form.responseText) {
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

    const submitResponse = (event,inquiryKey) => {
        console.log(inquiryKey);
        event.preventDefault();
        if (!inputComplete) return;
        // 위에서 설정한 데이터들을 하나에 저장
        const formData = new FormData();
        formData.append("inquiryKey", inquiryKey);
        formData.append("responseText", form.responseText);
        files.forEach(file => formData.append("files", file.file));

        axios.post('/admin/inquiryResp', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', //이미지 때문에 넣음
            }
        })

        .then(response => {
            if(response.data.result === "success") {
                // 성공 시 접수 성공 모달 띄우기
                setModalContent("문의답변 등록에 성공적으로 접수되었습니다.");
                setModalOpen(true);
                // 모달 닫으면 적었던 내용 초기화
                setForm({
                    title: '',
                    category: '',
                    details: ''
                });
                setFiles([]);
                setSelectedOption("선택하세요");
                setUpdate(prev => !prev);
            } else {
                // 실패 시
                setModalContent("문의답변 등록에 실패하였습니다.");
                setModalOpen(true);
            }
        })
        .catch(error => {
            console.log("문의답변 등록 실패: " + error.message);
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

    // gpt 코드지만 나중에 쓸듯?
    const renderReportCategory = (reportDataCategory, categoryName, displayName) => {
        const categoryReports = reportDataCategory(categoryName);
        if (categoryReports.length === 0) return null;
        return (
            <div className={styles.faqContentText}>
                {displayName} 콘텐츠입니다 {categoryReports[0].user.email} 등 {categoryReports.length}명 ( {categoryReports.length} )
            </div>
        );
    };

    // 각 탭 별 화면
    const renderTabContent = () => {
        switch (tab) {
            // 자주묻는 질문
            case 0:
                return (
                    <div className={styles.faqContainer}>
                        {/* 이거 순번체킹 말고 key값 받아와서 체킹하는걸로 해야할듯? */}
                        {currentItems.map((users, idx) => {
                            let banData = banned.find(ban => ban.userKey === parseInt(users.userKey));
                            let reportData = report.filter(repot => repot.reportUser.userKey === parseInt(users.userKey));
                            let reportDataCategory = (categorys) =>{
                                return reportData.filter(data => data.category === categorys);
                            }
                            return(
                                <div key={users.userKey} className={styles.faqItem}>
                                        <div className={styles.faqHeader} onClick={() => openedFaq(idx)}>
                                            <div className={styles.faqDetails}>
                                                <div className={styles.faqTitle}>{users.userKey} . {users.email}</div>
                                                <div className={styles.faqSubtitle}>{users.nickName}</div>
                                                <div className={styles.userStateLine}>
                                                    {/* 제제 완료했을때 빨강색 */}
                                                    { users.state === "deactivate" && banData?.state === "activate" ? <div className={styles.userStateactivate}>제재완료</div> : null}
                                                    {/* 신고 접수 된 상태 파란색 */}
                                                    {/* 여기는 스테이트에서 조정하는게 아니라 신고 테이블쪽 에서 값 있으면 이거 활성화 시키는게 맞을듯 */}
                                                    {/* 데이터가 오브젝트 배열인데 일단 한개만임시로 참조하게끔 해놨음. */}
                                                    {/* 나중에 하나하나 처리할 예정 */}
                                                    { reportData.length !== 0 
                                                        && reportData.find(prev => prev.state === "unprocessed")?.state === "unprocessed" 
                                                        ? <div className={styles.userStatedeactivate}>신고접수</div> 
                                                        : null}
                                                    {/* 신고 처리 완료 딱지도 만들면 좋을듯? */}
                                                    {/* 자살중인 계정은 회색? */}
                                                    { users.state === "secession" ? <div className={styles.userStatedeling}>비활성화</div> : null}
                                                    {/* 탈퇴계정은 안나옴 ㅅㄱ */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* FAQ의 번호와 인덱스가 같으면 열림 */}
                                        { faqContent === idx && (
                                            <div>
                                                {
                                                    // 데이터가 오브젝트 배열인데 일단 한개만임시로 참조하게끔 해놨음.
                                                    reportData.length !== 0 && reportData.find(prev => prev.state === "unprocessed")?.state === "unprocessed" ?
                                                    <div className={styles.faqContent}>
                                                        {/* 신고받은거 넣으면 될듯 */}
                                                        {/* 네비게이트로 신고 내역쪽으로 리다이렉트 */}
                                                        <div className={styles.faqContentText}> 전체 신고 갯수 ( {reportData.length}개 ) </div>
                                                        {/* 전체참조문으로 만들 필요성이 있음. */}
                                                        {/* ㅋㅋ 그럴필요 없었음 */}
                                                        { renderReportCategory(reportDataCategory,'보안','보안') }
                                                        { renderReportCategory(reportDataCategory,'불법성','불법성') }
                                                        { renderReportCategory(reportDataCategory,'청소년','청소년') }
                                                        { renderReportCategory(reportDataCategory,'사회/질서','사회/질서') }
                                                        { renderReportCategory(reportDataCategory,'기준위반','기준위반') }
                                                        { renderReportCategory(reportDataCategory,'욕설/혐오','욕설/혐오') }
                                                    </div>
                                                    : null
                                                }

                                                {
                                                users.state !== "activate" && banData?.state === "activate" ?
                                                    <div className={styles.userOption}>
                                                        {/* 신고 테이블 조회해서 신고 수리내역 표기 */}
                                                        <div className={styles.userOptionReport}>신고접수일 : 2024-08-17</div>
                                                        {/* 신고 내역같은것도 여기다가 추가하면 좋을꺼같음 */}

                                                        {/* 여기에 제재 했을경우 3항 연산자 하면될꺼같고 */}
                                                        {/* banned 테이블 조회해서 날짜 표기 */}
                                                        <div className={styles.userOptionBlock}>제재일 : {banData?.reasonDate.substr(0,10)} ~ {banData?.endDate.substr(0,10)} / {banData?.date}일</div>
                                                        <div className={styles.userOptionBlockBtn} onClick={()=>{setRevertBtn(prev => !prev)}}>되돌리기</div>
                                                    </div>
                                                    : 
                                                    <div className={styles.userOption}>
                                                        <div className={styles.userOptionBlockBtn} onClick={()=>{setMoreBtnOption(prev => !prev)}}>더보기▽</div>
                                                    </div>
                                                }
                                                
                                                {
                                                moreBtnOption === true && users.state !== "deactivate" && banData?.state !== "activate" ?
                                                    <div className={styles.inqFieldUser}>
                                                        <label>제재 종류</label>
                                                        <div onClick={() => setDropdownOpen(!dropdownOpen)} className={styles.inqSelect}>
                                                            {selectedOption}
                                                        </div>
                                                        <label>제재 일수</label>
                                                        <div onClick={() => setDropdownOpen2(!dropdownOpen2)} className={styles.inqSelect}>
                                                            {
                                                            selectedOption2 === "영구" || selectedOption2 === "선택하세요"
                                                                ? selectedOption2 : <div>{selectedOption2} 일</div>
                                                            }

                                                        </div>
                                                        {/* 문의 종류 선택 드롭다운 */}
                                                        {
                                                            dropdownOpen &&
                                                                <div className={styles.dropdown}>
                                                                    {["약관 위반", "도배", "욕설", "다메닝겐", "바보"].map((option, index) => (
                                                                        <div key={index} className={styles.dropdownItem} onClick={() => optionSelect(option)}>
                                                                            {option}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                        }
                                                        {
                                                            dropdownOpen2 &&
                                                                <div className={styles.dropdown2}>
                                                                    {["1", "7", "14", "30", "60", "90", "365", "영구"].map((option, index) => (
                                                                        <div key={index} className={styles.dropdownItem} onClick={() => optionSelect2(option)}>
                                                                            {option} 일 제재
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                        }
                                                        {/* 여기에서 오브젝트 생성해서 넣으면될듯????????????? */}
                                                        <div className={styles.bannedBtn} onClick={()=>{updateBannedDeAct(users.userKey)}}>제재</div>
                                                    </div>
                                                    : null
                                                }
                                                {
                                                    revertBtn === true && users.state !== "activate" && banData?.state === "activate" ?
                                                    <div className={styles.revertOption}>
                                                        진짜로 밴 취소할꺼에요?
                                                        <div className={styles.revertSelect}>
                                                            <div className={styles.revertSelectYes} onClick={()=>{updateBannedAct(users.userKey)}}>YES</div>
                                                            <div className={styles.revertSelectNo} onClick={()=>{setRevertBtn(prev => !prev)}}>NO</div>
                                                        </div>
                                                    </div>
                                                    :null
                                                }
                                            </div>
                                        )}
                                    </div>
                            )})}
                    </div>
                );
            // 문의하기
            case 1:
                return (
                    <div className={styles.inqContainer}>
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
                                // const response = inquiryResponses.find(responseData => responseData.inquiryKey === inquiry.inquiryKey );
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
                                                {/* 데이터 넣는거 어차피 금방함 ㅅㄱ */}
                                                {/* 구라임 */}
                                                {
                                                    response ? (
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
                                                    ) : (
                                                        <div>
                                                            <div className={styles.faqDivider}></div>
                                                            {/* 답변 내용 입력 칸 */}
                                                            <div className={styles.responseContent}>
                                                                <div className={styles.inqField}>
                                                                    <textarea 
                                                                        name="responseText"
                                                                        value={form.responseText}
                                                                        onChange={handleInputChange}
                                                                        className={styles.inqTextarea}
                                                                        placeholder="답변 내용을 입력하세요."
                                                                    ></textarea>
                                                                </div>
                                                                {/* 답변 이미지 추가 */}
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
                                                                                <input id="file-upload" type="file" accept="image/*" onChange={fileChange} multiple style={{ display: 'none' }} />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {/* 답변 제출 버튼 */}
                                                                <div className={styles.submitButtonContainer}>
                                                                    {/* 답변 내용이 전부 입력이 안 되었을 때 버튼 비 활성화 */}
                                                                    <button onClick={(event) => submitResponse(event,inquiry.inquiryKey)} 
                                                                        className={inputComplete ? styles.activeSubmitButton : styles.disabledSubmitButton}
                                                                        disabled={!inputComplete}>
                                                                        답변 등록
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
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
                    <div className={styles.inqContainer}>
                    </div>
                );
            case 4:
                return (
                    <div className={styles.sanctionContainer}>
                        <div className={styles.sanctionList}>
                            {/* 내역이 없을 시 */}
                            {
                                report.length === 0 ? (
                                    <div className={styles.noHistory}>신고 받은 내역이 없습니다.</div>
                                ) : (
                                    // 제재 내역이 있을 시
                                    report.map((a,i)=>{
                                        return(
                                            <div className={styles.reportItem}>
                                                    {
                                                        report[i].state === "unprocessed" ?
                                                            <div className={styles.reportLine}>
                                                                {/* 검색기능 및 정렬기능 처리중인것 등등 표기하는것도괜찮을꺼같다. */}
                                                                <div className={styles.reportContent}>신고내용 : {report[i].content.substr(0,80)}</div>
                                                                <div className={styles.reportCategory}>카테고리 : {report[i].category}</div>
                                                                <div className={styles.reportReportUser}>신고받은사람 : {report[i].reportUser.nickName} ( {report[i].reportUser.email} ) </div>
                                                                <div className={styles.reportUser}>신고자 :{report[i].user.nickName} ( {report[i].user.email} ) </div>
                                                            </div>
                                                            :null
                                                    }
                                            </div>
                                        )
                                    })    
                                )
                            }
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    // 어드민 전체 화면
    return (
        <div className={styles.pageContainer}>
            <div className={styles.serviceBanner}>
                <div className={styles.bannerPosition}>
                    <div className={styles.logoTitle}>어드민</div>
                    <div className={styles.logoPosition}>
                        <img src={serviceLogo} className={styles.serviceLogo} alt="고객센터 로고"/>
                    </div>
                </div>
            </div>

            {
                tab === 0 ?
                <div className={styles.sortBtn}>
                    <div className={styles.userStateResetBtn} onClick={()=>{sortRun("reset")}}>리셋</div>
                    <div className={styles.userStateactivateBtn} onClick={()=>{sortRun("deactivate")}}>제재완료</div>
                    {/* 신고 기능완성후 수정 예정 */}
                    <div className={styles.userStatedeactivateBtn} onClick={()=>{sortRunReport()}}>신고접수</div>
                    <div className={styles.userStatedelingBtn} onClick={()=>{sortRun("secession")}}>비활성화</div>
                    {/* 검색기능 만들면 여기다가 추가 하면될듯 */}
                </div>
                : null
            }

            <div className={styles.serviceContents}>
                <div className={styles.serviceNav}>
                    <div className={styles.navContent}>
                        <div className={`${styles.navItems} ${tab === 0 ? styles.active : ''}`} 
                            onClick={() => setTab(0)}>
                            회원 정보
                        </div>
                        <div className={`${styles.navItems} ${tab === 1 ? styles.active : ''}`} 
                            onClick={() => setTab(1)}>
                            채널 관리
                        </div>
                        <div className={`${styles.navItems} ${tab === 2 ? styles.active : ''}`} 
                            onClick={() => setTab(2)}>
                            질문 답변
                        </div>
                        <div className={`${styles.navItems} ${tab === 3 ? styles.active : ''}`} 
                            onClick={() => setTab(3)}>
                            더미 파일
                        </div>
                        <div className={`${styles.navItems} ${tab === 4 ? styles.active : ''}`} 
                            onClick={() => setTab(4)}>
                            신고 내역
                        </div>
                    </div>
                </div>
                <div className={styles.serviceTabContent}>
                    {renderTabContent()}
                </div>

                {/* 유저탭일때 보여줄 내용 */}
                {
                    tab === 0 ?
                    <div>
                        <AdminPaging users={users} onItemsChange={handleItemsChange}/>
                        <div className={styles.userSearch}>
                            <div className={styles.userSearchList}>리스트</div>
                            <div onClick={() => setDropdownOpen3(!dropdownOpen3)} className={styles.inqSelect}>
                                {selectedOption3}
                            </div>
                            {
                                dropdownOpen3 &&
                                    <div className={styles.dropdown3}>
                                        {["닉네임", "이메일"].map((option, index) => (
                                            <div key={index} className={styles.dropdownItem} onClick={() => optionSelect3(option)}>
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                            }
                            <div className={styles.inputDiv}>
                                <input onClick={()=>{}} onBlur={()=>{}} placeholder='검색어를 입력하세요' onChange={(e)=>setSearchUserInput(e.target.value)} onKeyDown={handleEnter}/>
                                <img style={{cursor: 'pointer'}} src={search} onClick={()=>{handleEnter("enter")}}/>
                            </div>
                        </div>
                    </div>
                    : null
                }
                {/* 질문 답변 탭일떄 보여줄 내용 */}
                {
                    tab === 2 ?
                    <div>
                        <div className={styles.userSearch}>
                            <div className={styles.userSearchList}>리스트</div>
                            <div onClick={() => setDropdownOpen3(!dropdownOpen3)} className={styles.inqSelect}>
                                {selectedOption3}
                            </div>
                            {
                                dropdownOpen3 &&
                                    <div className={styles.dropdown3}>
                                        {["닉네임", "이메일"].map((option, index) => (
                                            <div key={index} className={styles.dropdownItem} onClick={() => optionSelect3(option)}>
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                            }
                            <div className={styles.inputDiv}>
                                <input onClick={()=>{}} onBlur={()=>{}} placeholder='검색어를 입력하세요' onChange={()=>{}} />
                                <img style={{cursor: 'pointer'}} src={search} onClick={()=>{}}/>
                            </div>
                        </div>
                    </div>
                    : null
                }
                {/* 신고 내역 탭일때 보여줄 내용 */}
                {
                    tab === 4 ?
                    <div>
                        <div className={styles.userSearch}>
                            <div className={styles.userSearchList}>리스트</div>
                            <div onClick={() => setDropdownOpen3(!dropdownOpen3)} className={styles.inqSelect}>
                                {selectedOption3}
                            </div>
                            {
                                dropdownOpen3 &&
                                    <div className={styles.dropdown3}>
                                        {["닉네임", "이메일"].map((option, index) => (
                                            <div key={index} className={styles.dropdownItem} onClick={() => optionSelect3(option)}>
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                            }
                            <div className={styles.inputDiv}>
                                <input onClick={()=>{}} onBlur={()=>{}} placeholder='검색어를 입력하세요' onChange={()=>{}} />
                                <img style={{cursor: 'pointer'}} src={search} onClick={()=>{}}/>
                            </div>
                        </div>
                    </div>
                    :null
                }

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

export default AdminMain;