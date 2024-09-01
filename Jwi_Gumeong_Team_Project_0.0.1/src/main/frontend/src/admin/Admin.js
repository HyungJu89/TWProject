import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '../cookies/Cookies.js';
import AlarmModal from '../modal/AlarmModal.js';
import AdminMain from './AdminMain.js';
import styles from './style/Admin.module.css';

function Admin(){
    
    // axios 통신 에러 나거나 코드적는 jwt 토큰 비교 후 일치하지 않을경우엔 에러뜨고 로그남기면 될듯?
    // csrf 인증문제 해결위해 헤더에 쿠키 저장기능은 ver2에서 진행하겠습니다.
    /**
        TODO:Ver2 
        컴포넌트 별 나누기
        재원이형 더미 기능 지우기
     
        BackEnd JWT 필터 관련 인증처리 (제일 오래걸릴꺼같음)

        - AdminKey를 가져와 기록하는 모든곳에 필터 처리 된 AdminKey 입력
        - AdminLog작성

        채널관련 기능 (여기쪽 프론트는 생각을 좀 해봐야할꺼같음. )

        - 채널 관리자 임명 및 철회
        - 채널 관리자 신청관련 관리
        - 채널 개설 내역 확인
        - 채널 유저 관리자의 내역 확인 (글 삭제 횟수,글 작성 횟수, 공지사항 작성관련)
        - 채널 삭제
        - 모든 새 글 내역 (글마다 연산자 넣어서 확인하면 될듯?)

        페이징 기능

        - 질문 답변
        - 신고 내역 (프론트 정리 및 도 필요)

        공지사항 관련

        - x일 동안 안봅니다 이런거 넣으면 괜찮을듯?
        - 입력 기능도 관리자 페이지에서 특정 버튼 누르면 작동되게 하면 좋을꺼같음.

        재밌는기능

        - 오늘 총 누적 접속자수 같은거?

        광고 관련 기능

        - 광고 문의관련 고객센터에 마련하기
        - 광고 배너 수정하는곳 운영자 게시판 쪽에 마련하기
     * 
     */
    let location = useLocation();
    let navigate = useNavigate();
    let [onOff, setOnOff] = useState(false);
    const cookieCheck = getCookie('frontCookie');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    // GPT 쓰면서 알게된 사실: 스테이트 내부에서 재밌는짓 가능하다는점
    const endTime = localStorage.getItem('endTime');
    const timeLeft = endTime ? endTime - Date.now() : 0;
    const [count, setCount] = useState(0);
    
    let 분 = parseInt(count / 60);
    let 초 = count % 60;
    
    useEffect(() => {
        if(count <= 0){
            if(!cookieCheck) {
                setModalOpen(true);
                setModalContent('시간이 만료되었습니다. 로그인 페이지로 이동합니다.');
                localStorage.removeItem('endTime');
                return navigate('/admin/login');
            }
            setCount(Math.max(Math.floor(timeLeft / 1000), 0))
        }
            
        const id = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);
        
        return () => clearInterval(id);

    },[count,navigate,cookieCheck,timeLeft])
    
    const closeModal = () => {
        setModalOpen(false);
    };
    
    useEffect(()=>{
        if ((location.pathname === '/admin/' || location.pathname === '/admin') && cookieCheck !== undefined) {
            setModalOpen(false);
            setOnOff(true);
        } else {
            setOnOff(false);
            setModalOpen(true);
            setModalContent('관리자 로그인 페이지로 이동합니다.');
            return navigate('/admin/login');
        }
    },[location.pathname,cookieCheck,navigate])
    
    return(
        <div>
            {
                onOff === true ? (
                    count >= 60 ? (
                    <div className={styles.nowTimes}>
                        로그인 만료까지 {분}분 {초}초 남았습니다.
                    </div>
                    ) : (
                    <div className={styles.nowTimesSec}>
                        로그인 만료까지 {초}초 남았습니다.
                    </div>
                    )
                ) : null
            }
            { onOff !== true ? <><Outlet/></> : <AdminMain/> }
            {
                modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    )
}

export default Admin;