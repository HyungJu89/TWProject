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
import CustomerService from './customerService/CustomerServiceCenter.js';
import ChannelManagement from './channelManagement/ChannelManagement.js';
import ImgUi from './imgModal/imgModal.js';
import { setSessionId, setUserKey, clearSession } from './slice/sessionSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    let state = useSelector((state)=>{ return state })
    //---------------------------------- 검색 부분
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const storeSessionId = window.sessionStorage.getItem("sessionId");
        if (storeSessionId) {
            dispatch(setSessionId(storeSessionId));
            userKey(storeSessionId);
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
                <Header onClickSearch={onClickSearch} onLogout={onLogout}/> {/* 상단 공통 부분 디자인 */}
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
                    <Route path='/admin' element={<>ㅋㅋ</>}/>{/*관리자*/}
                    <Route path="*" element={<div>404 넣으면 됩니다!</div>}></Route>
                </Routes>
                <Bottom/> {/* 하단 공통 부분 디자인 */}
            </Suspense>
        </div>
    );
}

export default App;