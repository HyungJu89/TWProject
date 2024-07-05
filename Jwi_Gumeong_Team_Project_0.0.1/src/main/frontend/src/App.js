// src/main/frontend/src/App.js

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Routes, Route, Link, useNavigate , Outlet, json } from 'react-router-dom';
import Main from './main/Main.js'
import Basic from './basic/Basic.js'

function App() {
   const [hello, setHello] = useState('')
   const [nuna, setNamhwi] = useState('')
   const hi = "마라";

    useEffect(() => {
        axios.get('/babo/jieun')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);
    useEffect(() => {
        axios.get('/babo/hyungju')
        .then(response => setNamhwi(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
        {/* 백엔드 데이터 연결 더미입니다. 코드 참고를 위해 남겨놓습니다. */}
        	백엔드에서 가져온 데이터입니다 : {hello}
            <p/>
            <span onClick={() => {setNamhwi("안하지..연락만 안끊기면")}}>
            	형주가 남희누나한테 한 말: {nuna}
            </span>
        {/* 임시 연결용 라우터입니다. */}
        <Basic/> {/* 상단 공통 부분 디자인 */}
        <Routes>
            <Route path='/' element={<Main/>}/> {/* 메인(홈) 접속 페이지 */}
        </Routes>
        </div>
    );
}

export default App;