/* eslint-disable */

import { Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Main from './main/Main.js'
import AllTopic from './allTopic/AllTopic.js'
import Header from './header/Header.js'
import Bottom from './bottom/Bottom.js'
import ChannelHome from './channel/ChannelHome.js';
import SignIn from './signIn/SignIn.js';
import SignUp from './signUp/SignUp.js';
import PwInquiry from './pwInquiry/PwInquiry.js';
import MyPage from './myPage/MyPage.js';
import Resign from './resign/Resign.js';
import Search from './search/Search.js';
import PageCheck from './pageCheck/PageCheck.js';
import CustomerService from './customerService/CustomerServiceCenter.js';
import ChannelManagement from './channelManagement/ChannelManagement.js';
import ImgUi from './imgModal/imgModal.js';
import Admin from './admin/Admin.js';
import Loading from './loading/Loading.js';
import AdminMain from './admin/AdminMain.js';
import AdminLogin from './admin/AdminLogin.js';
import NotFound from './notFound/NotFound.js';
import Report from './modal/ReportModal.js';
import { setSessionId,setUserKey,setLoggedIn,logout } from './slice/sessionSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    let reportState = useSelector((state) => state.reportModal)
    let imgState = useSelector((state) => state.imgUiModal)
    //---------------------------------- 검색 부분
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const storeSessionId = sessionStorage.getItem("sessionId");
    var sessionInfo = JSON.parse(storeSessionId);
    //세션화
    useEffect(() => {
        if (sessionInfo) {
            dispatch(setSessionId(sessionInfo.sessionId));
            userKey(sessionInfo.sessionId);
            dispatch(setLoggedIn(true));
        }
    }, [sessionInfo]);

    const userKey = async (sessionId) => {
        try {
            const response = await axios.post('/user/key', null, {
                params: { sessionId }
            });
            if (response.data.result === 'success') {
                dispatch(setUserKey(response.data.userKey));
            }
        } catch (error) {
            console.error('userKey Axios 에러임:', error);
        }
    };
    
    const isLoggedIn = useSelector((state) => state.session.isLoggedIn); // 로그인 상태
    const onLogout = () => { // 로그아웃 기능 (세션 아이디 지움)
        dispatch(logout());
        if (location.pathname === '/myPage') {
            navigate('/');
        }else{
            navigate(0);
        }
    };

    let [searchText,setSearchText] = useState('');

    const onClickSearch= (text) => {
        setSearchText(text)
        navigate('/search')
    }

    //----------------------------------
    return (
        <div>
            {/* Suspense 의 기능은 컴포넌트가 불러오는 도중일때 fallback 에 등록한 Div 및 컴포넌트를 보여줌 */}
            <Suspense fallback={<Loading />}>
                <Header onClickSearch={onClickSearch} onLogout={onLogout} isLoggedIn = {isLoggedIn}/> {/* 상단 공통 부분 디자인 */}
                {reportState && <Report />}{/*신고하기 팝업*/}
                {imgState.popUp && <ImgUi/>}{/*이미지 팝업*/}
                <Routes>
                    <Route path='/' element={<Main onLogout={onLogout} isLoggedIn = {isLoggedIn}/>}/> {/* 메인(홈) 접속 페이지 */}
                    <Route path='/allTopic' element={<AllTopic onLogout={onLogout} isLoggedIn = {isLoggedIn}/>}/> {/* 전체 채널 */}
                    <Route path='/channel/:channelId' element={<ChannelHome/>}/>{/*채널*/}
                    <Route path='/signIn' element={<SignIn/>}/>
                    <Route path='/signUp' element={<SignUp/>}/>
                    <Route path='/myPage' element={<MyPage/>}/>
                    <Route path='/pwInquiry' element={<PwInquiry onLogout = {onLogout}/>}/>
                    <Route path='/resign' element={<Resign onLogout = {onLogout}/>}/>
                    <Route path='/search' element={<Search search={searchText}/>}/>{/*채널 검색*/}
                    <Route path='/channelManagement' element={<ChannelManagement/>}/>
                    <Route path='/customerService' element={<CustomerService/>}/>{/*고객센터*/}
                    <Route path="/pageCheck/:channelId" element={<PageCheck/>}></Route>{/*채널 존재 여부 확인 게시판*/}
                    <Route path="*" element={<NotFound/>}></Route>
                    <Route path='/admin' element={<Admin/>}>
                        <Route path='login' element={<AdminLogin/>}></Route>{/*관리자*/}
                    </Route>
                </Routes>
                <Bottom/> {/* 하단 공통 부분 디자인 */}
            </Suspense>

        </div>
    );
}

export default App;