import React, { useEffect, useState } from 'react';
import styles from './style/ReportModal.module.css';
import {openModal, offModal} from '../slice/ReportModalSlice.js'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

// 알림 모달
function ReportModal() {
    let reportDto = useSelector((state)=>{ return state.reportDto })
    console.log(reportDto)
    const dispatch = useDispatch()
    const [reportAlarm,setReportAlarm] = useState(false);

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
    const [content,setContent] = useState('');
    // 신고 내용 최대길이
    const contentLength = 200;
    // 상태 content 색깔
    const [contentColor, setContentColor] = useState('#BBBBBB');
    // 문의하기 종류 선택 모달
    const optionSelect = (option) => {
        setSelectedOption(option); // 드롭다운에서 선택한 옵션을 상태로 설정
        setDropdownOpen(false); // 드롭다운 닫기
        setReportAlarm(false);
    };

    const onInputContent = (e) =>{

        setContent(e.target.value)
        setContentColor((content.length <= contentLength)? '#BBBBBB' : '#EC000E')
    }



    const reportSubmit = async() =>{
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if(!sessionIdJson){
            return alert("로그인되어있지않습니다.")
        } 
        let sessionId = JSON.parse(sessionIdJson).sessionId

        if(selectedOption == "선택하세요"){
            return setReportAlarm(true);
        }

        const repotDto = {
            sessionId : sessionId,
            referenceType : reportDto.referenceType,
            referenceKey : reportDto.referenceKey,
            category : selectedOption,
            content : content
        }

        try{
            // 서버로 데이터 전달
            const {data} = await axios.post(`/report/submit`,repotDto);
            // 성공적으로 업로드된 경우 추가적인 처리
            if(!data.success){
                // 버튼 하나짜리 알람창 필요합니다!
                return 
            }
            offModal()
        } catch (error) {
            console.error('업로드 실패:', error);
        }



    }


    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <div className={styles.body}>
                    <div className={styles.reportTitle}>
                        <div /><div className={styles.reportTitleText}>신고하기</div><div className={styles.reportTitleCloseBtn} onClick={()=>dispatch(offModal())}>x버튼</div>
                    </div>
                    <div className={styles.reportUserName}>{reportDto.nickName}</div>
                    <div className={styles.inqField}>
                        <label>문의 종류</label>
                        <div onClick={() => setDropdownOpen(!dropdownOpen)} className={styles.inqSelect}>
                            {selectedOption}
                        </div>
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
                    {reportAlarm && (
                        <div className={styles.reportAlarmText}>
                            신고 사유를 선택해 주세요
                        </div>
                    )} 
                    <div className={styles.contentDivBox}>
                    <input value={content} className={styles.reportContent} onInput={onInputContent}/>
                    <div className={styles.contentLengthDiv} style={{color : contentColor}}>{content.length}/{contentLength}</div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <button className={styles.closeBtn} onClick={()=>dispatch(offModal())}>
                        취소
                    </button>
                    <button className={styles.okBtn} onClick={()=>reportSubmit()}>
                        신고하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportModal;
