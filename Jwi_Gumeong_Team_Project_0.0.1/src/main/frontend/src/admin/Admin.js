import { useEffect, useState } from 'react';
import { useLocation , Outlet, useNavigate } from 'react-router-dom';
import { getCookie } from '../cookies/Cookies.js'
import AdminMain from './AdminMain.js'
import axios from 'axios';
import AlarmModal from '../modal/AlarmModal.js';

function Admin(){
    
    // axios 통신 에러 나거나 코드적는 jwt 토큰 비교 후 일치하지 않을경우엔 에러뜨고 로그남기면 될듯?
    // csrf 인증문제 해결위해 헤더에 쿠키 저장기능은 ver2에서 진행하겠습니다.
    let location = useLocation();
    let navigate = useNavigate();
    let [onOff, setOnOff] = useState(false);
    const cookieCheck = getCookie('frontCookie');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        setModalOpen(true);
        setModalContent('관리자 로그인 페이지로 이동합니다.');
    }, []);

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(()=>{
        if ((location.pathname === '/admin/' || location.pathname === '/admin') && cookieCheck) {
            setModalOpen(false);
            setOnOff(true);
        } else {
            setOnOff(false);
            setModalOpen(true);
            setModalContent('관리자 로그인 페이지로 이동합니다.');
            navigate('/admin/login');
        }
    },[location.pathname, cookieCheck])
    
    return(
        <div>
            { onOff !== true ? <Outlet/> : <AdminMain/> }
            {
            modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    )
}

export default Admin;