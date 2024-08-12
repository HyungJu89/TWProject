import { useState } from 'react';
import { useLocation , Outlet } from 'react-router-dom';
import AdminMain from './AdminMain.js';
import axios from 'axios';

function Admin(){
    let location = useLocation();
    let [onOff] = useState(false);
    // axios 통신 에러 나거나 코드적는 jwt 토큰 비교 후 일치하지 않을경우엔 에러뜨고 로그남기면 될듯?
    // 

    if(location.pathname === '/admin/' || location.pathname === '/admin'){
        onOff = true
    }
    return(
        <div>
            { onOff !== true ? <Outlet/> : <AdminMain/>}
        </div>
    )
}

export default Admin;