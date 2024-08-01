import React, { useEffect } from 'react';
import styles from './style/AlarmModal.module.css';

// 알림 모달
function AlarmTwoModal({ content, onClose }) {

    useEffect(() => {
        // 모달 열리면 스크롤 막음
        document.body.style.overflow = 'hidden';
        return () => {
            // 모달 닫히면 다시 돌려놓음
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <div className={styles.body}>
                    {/* 모달 내용 */}
                    {content}
                </div>
                <div className={styles.footer}>
                    <button className={styles.okBtn} onClick={() => onClose('confirm')}>
                        확인
                    </button>
                    <button className={styles.closeBtn} onClick={() => onClose('cancel')}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlarmTwoModal;
