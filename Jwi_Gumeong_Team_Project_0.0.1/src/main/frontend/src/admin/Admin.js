import { useState } from 'react';
import { useLocation , Outlet } from 'react-router-dom';
import AdminMain from './AdminMain.js';

function Admin(){
    let location = useLocation();
    let [onOff] = useState(false);
    if(location.pathname === '/admin' ){
        onOff = true
    }
    return(
        <div>
            { onOff !== true ? <Outlet/> : <AdminMain/>}
        </div>
    )
}

export default Admin;