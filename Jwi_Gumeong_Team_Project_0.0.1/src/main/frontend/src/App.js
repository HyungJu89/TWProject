/* eslint-disable */

import { Routes, Route, useNavigate} from 'react-router-dom';
import Main from './main/Main.js'
import AllTopic from './allTopic/AllTopic.js'
import Header from './header/Header.js'
import Bottom from './bottom/Bottom.js'
import ChannelHome from './channel/ChannelHome.js';
import SignIn from './signIn/SignIn.js';
import SignUp from './signUp/SignUp.js';
import PwInquiry from './pwInquiry/PwInquiry.js';
import MyPage from './myPage/MyPage.js';
import Search from './search/Search.js';
import BlinkPage from './blinkPage/BlinkPage.js';
import CustomerService from './customerService/CustomerServiceCenter.js';
import ChannelManagement from './channelManagement/ChannelManagement.js';
import ImgUi from './imgModal/imgModal.js';
import Admin from './admin/Admin.js';
import AdminMain from './admin/AdminMain.js';
import AdminLogin from './admin/AdminLogin.js';
import NotFound from './notFound/NotFound.js';
import { setSessionId, setUserKey, clearSession, setLoggedIn } from './slice/sessionSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    let state = useSelector((state)=>{ return state })
    //---------------------------------- 검색 부분
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const storeSessionId = sessionStorage.getItem("sessionId");
        var sessionInfo = JSON.parse(storeSessionId);
        if (sessionInfo) {
            dispatch(setSessionId(sessionInfo.sessionId));
            userKey(sessionInfo.sessionId);
            dispatch(setLoggedIn(true));
        }
    }, [dispatch]);

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
        sessionStorage.removeItem('sessionId');
        dispatch(clearSession());
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
            <Suspense fallback={<div>로딩중임</div>}>
                <Header onClickSearch={onClickSearch} onLogout={onLogout} isLoggedIn = {isLoggedIn}/> {/* 상단 공통 부분 디자인 */}
                {state.imgUiModal.popUp && <ImgUi/>}{/*이미지 팝업*/}
                <Routes>
                    <Route path='/' element={<Main/>}/> {/* 메인(홈) 접속 페이지 */}
                    <Route path='/allTopic' element={<AllTopic/>}/> {/* 전체 채널 */}
                    <Route path='/channel/:channelId' element={<ChannelHome/>}/>{/*채널*/}
                    <Route path='/signIn' element={<SignIn/>}/>
                    <Route path='/signUp' element={<SignUp/>}/>
                    <Route path='/myPage' element={<MyPage/>}/>
                    <Route path='/pwInquiry' element={<PwInquiry/>}/>
                    <Route path='/search' element={<Search search={searchText}/>}/>{/*채널 검색*/}
                    <Route path='/channelManagement' element={<ChannelManagement/>}/>
                    <Route path='/customerService' element={<CustomerService/>}/>{/*고객센터*/}
                    <Route path="/pageCheck" element={<BlinkPage/>}></Route>{/*채널 존재 여부 확인 게시판*/}
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