/* eslint-disable */
// ^워링 업애주는 친구

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
    let navigate = useNavigate();
    return (
        <div>
            최지은fasfasfasfa
            <button onClick={()=>{navigate('/channel/'+'123')}}>채널 확인 URL</button>
        </div>
    );
}

export default Main;
