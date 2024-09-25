import React, { useEffect, useRef, useState } from 'react';
import styles from './style/ReportModal.module.css';
import { openModal, offModal } from '../slice/ReportModalSlice.js'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import reportPopImg from '../icon/img/report-pop-img.png'
import closeImg from '../icon/24px/close.png'
// 알림 모달
function ReportModal() {
    const reportContentRef = useRef(null);
    let reportDto = useSelector((state) => { return state.reportDto })
    console.log(reportDto)
    const dispatch = useDispatch()
    const [reportAlarm, setReportAlarm] = useState(false);

    useEffect(() => {
        // 모달 열리면 스크롤 막음
        document.body.style.overflow = 'hidden';
        return () => {
            // 모달 닫히면 다시 돌려놓음
            document.body.style.overflow = 'auto';
        };
    }, []);

    let [dropdownOpen, setDropdownOpen] = useState(false);
    let [selectedOption, setSelectedOption] = useState("선택하세요");
    // 신고 택스트 길이
    const [content, setContent] = useState('');
    // 신고 내용 최대길이
    const contentLength = 200;
    // 신고하기 활성화 여부
    const [optionClicked, setOptionClicked] = useState(false);
    // 문의하기 종류 선택 모달
    const optionSelect = (option) => {
        setSelectedOption(option); // 드롭다운에서 선택한 옵션을 상태로 설정
        setDropdownOpen(false); // 드롭다운 닫기
        setOptionClicked(true); // 옵션 선택 여부
        setReportAlarm(false); // 옵션을 선택하지않고 신고하기 누를때
    };

    const onInputContent = (e) => {
        const textarea = reportContentRef.current;
        if (textarea) {
            // text 가 지워질때 높이를 초기화해주기위해
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
        setContent(e.target.value)
    }

    const reportSubmit = async () => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if (!sessionIdJson) {
            return alert("로그인되어있지않습니다.")
        }
        let sessionId = JSON.parse(sessionIdJson).sessionId

        if (!optionClicked) {
            return setReportAlarm(true);
        }

        const repotDto = {
            sessionId: sessionId,
            referenceType: reportDto.referenceType,
            referenceKey: reportDto.referenceKey,
            category: selectedOption,
            content: content
        }

        try {
            // 서버로 데이터 전달
            const { data } = await axios.post(`/report/submit`, repotDto);
            // 성공적으로 업로드된 경우 추가적인 처리
            console.log(data)
            if (!data.success) {
                // 버튼 하나짜리 알람창 필요합니다!
                return
            }
            dispatch(offModal())
            // 신고가 완료되었습니다 모달 띄우기
        } catch (error) {
            console.error('업로드 실패:', error);
        }
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <div className={styles.body}>
                    <div className={styles.reportTitle}>
                        <div className={styles.reportTitleLeft} />
                        <div className={styles.reportTitleMid}>
                            <div className={styles.reportTitleMidDiv}>
                                <img className={styles.reportTitleImg} src={reportPopImg} />
                                <div className={styles.reportTitleText}>신고하기</div>
                                <div className={styles.reportTitleExplanation}>해당 유저가 어떤 문제가 있는지 자세히 알려주세요.</div>
                            </div>
                        </div>
                        <div className={styles.reportTitleCloseBtn} onClick={() => dispatch(offModal())}><img src={closeImg} /></div>
                    </div>
                    <div className={styles.dashed} />
                    <div className={styles.contentDivBox}>
                        <div className={styles.reportUserName}>{reportDto.nickName}</div>
                        <div className={styles.inqField}>
                            <label>문의 종류</label>
                            <div onClick={() => setDropdownOpen(!dropdownOpen)} className={styles.inqSelect}>
                                <div className={styles.inqSelectOption}>{selectedOption}</div>
                                {dropdownOpen && (
                                    <div className={styles.dropdown}>
                                        {["음란성", "불법성", "청소년 부적합", "신고", "제안", "도용", "보안", "기타"].map((option, index) => (
                                            <div key={index} className={styles.dropdownItem} onClick={() => optionSelect(option)}>
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {reportAlarm && (
                            <div className={styles.reportAlarmText}>
                                신고 사유를 선택해 주세요
                            </div>
                        )}
                        <textarea
                            value={content}
                            className={styles.reportContent}
                            ref={reportContentRef}
                            placeholder='사유를 입력해주세요.'
                            onInput={onInputContent}
                        />
                        <div className={styles.contentLengthDiv} style={{ color: (content.length <= contentLength) ? '#BBBBBB' : '#EC000E' }}>({content.length}/{contentLength})</div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <button className={styles.okBtn} style={{ backgroundColor: optionClicked ? "#FF8901" : "#BBBBBB" }} onClick={() => reportSubmit()}>
                        <div className={styles.reportBtnText}>신고하기</div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportModal;
