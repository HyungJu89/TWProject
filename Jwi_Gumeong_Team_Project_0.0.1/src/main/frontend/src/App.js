/* eslint-disable */

import { Routes, Route} from 'react-router-dom';
import Main from './main/Main.js'
import Header from './header/Header.js'
import ChannelHome from './channel/ChannelHome.js';
import SignIn from './signIn/SignIn.js';
import SignUp from './signUp/SignUp.js';

function App() {
    return (
        <div>
        <Header/> {/* 상단 공통 부분 디자인 */}
        <Routes>
            <Route path='/' element={<Main/>}/> {/* 메인(홈) 접속 페이지 */}
            <Route path='/channel/:id' element={<ChannelHome/>}/>
            <Route path='/signIn' element={<SignIn/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
        </Routes>
        </div>
    );
}

export default App;