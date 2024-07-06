/* eslint-disable */

import { Routes, Route} from 'react-router-dom';
import Main from './main/Main.js'
import Basic from './basic/Basic.js'

function App() {
    return (
        <div>
        <Basic/> {/* 상단 공통 부분 디자인 */}
        <Routes>
            <Route path='/' element={<Main/>}/> {/* 메인(홈) 접속 페이지 */}
        </Routes>
        </div>
    );
}

export default App;