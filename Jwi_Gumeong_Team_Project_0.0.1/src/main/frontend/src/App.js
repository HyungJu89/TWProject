/* eslint-disable */

import { Routes, Route} from 'react-router-dom';
import Main from './main/Main.js'
import Header from './header/Header.js'
import ChannelHome from './channel/ChannelHome.js';
import SignIn from './signIn/SignIn.js';
import SignUp from './signUp/SignUp.js';
import PwInquiry from './pwInquiry/PwInquiry.js';
import Search from './search/Search.js'
import ImgUi from './imgModal/imgModal.js'
import { useSelector } from 'react-redux';

function App() {
    let state = useSelector((state)=>{ return state })
    return (
        <div>
        <Header/> {/* 상단 공통 부분 디자인 */}
        {state.imgUiModal.popUp && <ImgUi/>}
        <Routes>
            <Route path='/' element={<Main/>}/> {/* 메인(홈) 접속 페이지 */}
            <Route path='/channel/:channelId' element={<ChannelHome/>}/>
            <Route path='/signIn' element={<SignIn/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/pwInquiry' element={<PwInquiry/>}/>
            <Route path='/search' element={<Search/>}/>
        </Routes>
        </div>
    );
}

export default App;