/* eslint-disable */

import { Routes, Route} from 'react-router-dom';
import Main from './main/Main.js'
import AllTopic from './allTopic/AllTopic.js'
import Header from './header/Header.js'
import Bottom from './bottom/Bottom.js'
import ChannelHome from './channel/ChannelHome.js';
import SignIn from './signIn/SignIn.js';
import SignUp from './signUp/SignUp.js';
import PwInquiry from './pwInquiry/PwInquiry.js';
import MyPage from './myPage/MyPage.js';
import Search from './search/Search.js'
import ChannelManagement from './channelManagement/ChannelManagement.js'
import ImgUi from './imgModal/imgModal.js'
import { useSelector } from 'react-redux';

function App() {
    let state = useSelector((state)=>{ return state })
    return (
        <div>
        <Header/> {/* 상단 공통 부분 디자인 */}
        {state.imgUiModal.popUp && <ImgUi/>}{/*이미지 팝업*/}
        <Routes>
            <Route path='/' element={<Main/>}/> {/* 메인(홈) 접속 페이지 */}
            <Route path='/allTopic' element={<AllTopic/>}/> {/* 전체 채널 */}
            <Route path='/channel/:channelId' element={<ChannelHome/>}/>{/*채널*/}
            <Route path='/signIn' element={<SignIn/>}/>
            <Route path='/signUp' element={<SignUp/>}/>
            <Route path='/myPage' element={<MyPage/>}/>
            <Route path='/pwInquiry' element={<PwInquiry/>}/>
            <Route path='/search' element={<Search page={1} search={1}/>}/>{/*채널 검색*/}
            <Route path='/channelManagement' element={<ChannelManagement/>}/>
        </Routes>
        <Bottom/> {/* 하단 공통 부분 디자인 */}
        </div>
    );
}

export default App;