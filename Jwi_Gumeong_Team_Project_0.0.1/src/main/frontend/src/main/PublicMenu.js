/* eslint-disable */
// ^워링 업애주는 친구

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useChannel } from '../recycleCode/ApiQuery.js';
import styles from './style/PublicMenu.module.css';
import '../App.css';
import edit from '../icon/20px/edit.png';
import add from '../icon/40px/add.png';
import btn_left from '../icon/btn/btn-left.png';
import btn_right from '../icon/btn/btn-right.png';
import { getUserInfo } from '../slice/loginSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { setSessionId, setUserKey, logout, setLoggedIn, fetchUserKey } from '../slice/sessionSlice.js';

function PublicMenu({ isLoggedIn, onLogout }) {
    var jsonSessionInfo = sessionStorage.getItem('sessionId');
    var sessionInfo = JSON.parse(jsonSessionInfo);
    const dispatch = useDispatch();
    useEffect(() => {
        if(sessionInfo){
            dispatch(getUserInfo(sessionInfo.sessionId));
        }
    }, [dispatch,sessionInfo]); 
    let navigate = useNavigate();

    
    //추천 게시판 :: 개설된 채널 중 무작위 10개 가져오기
    const [randomBoard, setRandomBoard] = useState();
    useEffect(() => {
        const randomBoard = async () => {
            try {
                const {data} = await axios.get(`/channel/randomBoard`);
                setRandomBoard(data);
            } catch (error) {
                console.error('Channel API Error:', error);
            }
        };
        randomBoard();
    }, []);

    return (
        <div className={styles.rightDiv}>{/*유저 영역 */}
            {isLoggedIn ? <UserAfter onLogout={onLogout}/> : <UserBefore/>}
            <div className={styles.recommendation}>{/* 추천 */}
                <p style={{ margin: '0px', marginLeft: '21px' }}>추천</p>
                <div className={styles.list}>
                        {randomBoard && randomBoard.success &&
                        <>
                            {randomBoard.info.map((item, i)=>
                            <div onClick={()=>{navigate(`/channel/${item.id}`); window.scrollTo(0, 0) }} className={styles.reChannel} key={i}>
                                <img src={item.imageUrl} />
                                {item.name}
                            </div>
                            )}
                        </>
                        }
                </div>
            </div>
        </div>
    )
}

function UserAfter({ onLogout }) {
    let navigate = useNavigate();
    const userState = useSelector((state) => state.userState);  
    let sessionIdJson = sessionStorage.getItem('sessionId');
    let sessionId = JSON.parse(sessionIdJson).sessionId;

        //즐겨찾기 게시판  :: 무작위 7개 가져오기 더 많으면 페이징으로 넘겨야함 하는 중~
        const [favoritesList, setFavoritesList] = useState(); //즐겨찾기 key
        useEffect(() => {
            const favorites = async () => {
                try {
                    const {data} = await axios.get(`/myPage/favorites`,{params:{userKey : 1}});
                    setFavoritesList(data);
                    console.log(data);
                } catch (error) {
                    console.error('Channel API Error:', error);
                }
            };
            favorites();
        }, []);

        const [channelList, setChannelList] = useState(); //즐겨찾기에서 찾은key를 기반으로 채널 정보 가져오기
        useEffect(()=>{
            const channel = async () => {
                try {
                    const { data } = await axios.get('/channel/findKey', {
                        params: { channelKeys : 1 }
                    });
                    setChannelList(data);
                    console.log('Channel List:', data);
                } catch (error) {
                    console.error('Channel API Error:', error);
                }
            };

            channel();
        },[favoritesList]);


    return (
        <div className={styles.fadein}>
            <div className={styles.userAfter} style={{ borderRadius: '20px 20px 0px 0px' }}>
                <div className={styles.userInfo}>
                    <div>
                        {userState.nickName} 님
                        <p>{userState.email}</p>
                    </div>
                    <button onClick={() => { onLogout() }} >로그아웃</button>
                </div>
                <button onClick={() => { navigate('/myPage') }} className={styles.myPage}>마이페이지</button>
            </div>
            <div className={styles.dashed} />{/* 회색줄 */}
            <div className={styles.userAfter} style={{ borderRadius: '00px 00px 20px 20px' }}>
                <div className={styles.Bookmark}>즐겨찾기<img src={edit} /></div>
                <div className={styles.recommendation} style={{ marginTop: '0px', paddingTop: '20px' }}>{/* 즐찾 */}
                    <div className={styles.list} style={{ marginTop: '0px' }}>
                        {favoritesList &&
                        <>
                            {favoritesList.map((item, i)=>
                            <div onClick={()=>{navigate(`/channel/${item.id}`); window.scrollTo(0, 0) }} className={styles.reChannel} key={i}>
                                <img src='https://nng-phinf.pstatic.net/MjAyNDAyMDNfMTI5/MDAxNzA2OTI5NjEwNTg0.8eH_yzVzbSiZMgD9X7NYPk-r66ZqrNZspDlCeGmfVKwg.UgTLf2pU2tue6CbLhU8jx7Ogk2TbRYyt2rjHDGYMQQwg.PNG/%EB%8B%B4%EC%9C%A0%EC%9D%B4_%ED%94%84%EB%A1%9C%ED%95%84_%EC%82%AC%EC%A7%84%EC%9A%A9.png' />
                                {item.channelKey}
                            </div>
                            )}
                        </>
                        }     
                    </div>
                </div>
                <div className={styles.bottom}>
                    <img src={btn_left} />
                    1/5
                    <img src={btn_right} />
                </div>
            </div>
        </div>
    )
}

function UserBefore() {
    let navigate = useNavigate();
    return (
        <div>
            <div className={styles.userBefore}>
                스트리머 덕후들이 모이는 쥐구멍!
                <button onClick={() => { navigate('/signIn') }} style={{ width: '318px', height: '63px' }}>로그인</button>
                <div>
                    <div onClick={() => { navigate('/signUp') }} className={styles.loginMenu} style={{ borderRight: '1px solid #999999' }}>회원가입</div>
                    <div className={styles.loginMenu} onClick={() => { navigate('/pwInquiry') }}>비밀번호 찾기</div>
                </div>
            </div>
        </div>
    )
}


export default PublicMenu;