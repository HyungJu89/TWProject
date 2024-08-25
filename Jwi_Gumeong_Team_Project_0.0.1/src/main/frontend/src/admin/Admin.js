import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '../cookies/Cookies.js';
import AlarmModal from '../modal/AlarmModal.js';
import AdminMain from './AdminMain.js';
import styles from './style/Admin.module.css';

function Admin(){
    
    // axios 통신 에러 나거나 코드적는 jwt 토큰 비교 후 일치하지 않을경우엔 에러뜨고 로그남기면 될듯?
    // csrf 인증문제 해결위해 헤더에 쿠키 저장기능은 ver2에서 진행하겠습니다.
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