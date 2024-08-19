import React, { useEffect, useState } from 'react';
import styles from './style/ReportModal.module.css';

// 알림 모달
function ReportModal() {

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
    // 문의하기 종류 선택 모달
    const optionSelect = (option) => {
        setSelectedOption(option); // 드롭다운에서 선택한 옵션을 상태로 설정
        setDropdownOpen(false); // 드롭다운 닫기
    };

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <div className={styles.body}>
                    <div className={styles.reportTitle}>
                        <div /><div className={styles.reportTitleText}>신고하기</div><div className={styles.reportTitleCloseBtn}>x버튼</div>
                    </div>
                    <div className={styles.reportUserName}>신고하는 유저 닉네임</div>
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
                    <input/>
                </div>
                <div className={styles.footer}>
                    <button className={styles.closeBtn}>
                        취소
                    </button>
                    <button className={styles.okBtn}>
                        신고하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportModal;
