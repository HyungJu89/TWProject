import BookmarkButton from '../channel/BookmarkButton.js';
import style from './style/Search.module.css';
import OpenChannel from '../icon/24px/Open-channel.png';
import btnLeft from '../icon/btn/btn-left.png'
import btnRight from '../icon/btn/btn-right.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import PublicBoard from '../main/PublicBoard.js'
import { formatUnit } from '../recycleCode/FormatUnit.js';
import Paging from '../Paging/Paging.js'

import AlarmModal from '../modal/AlarmModal.js';

function Search({ search }) {

    let navigate = useNavigate();

    const [channelList, setChannelList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [channelPage, setChannePage] = useState(1);
    const [postPage, setPostPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    //get 요청을 할때 params 로 데이터를 실어서 보낼수 있다.
    const searchChannel = async (search, channelPage) => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null;
        if (sessionIdJson) {
            sessionId = JSON.parse(sessionIdJson).sessionId
        }
        try {
            const { data } = await axios.get(`/search/channel`, {
                params: {
                    sessionId: sessionId,
                    search: search,
                    page: channelPage
                }
            });
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }
    };

    const searchPost = async (search, channelPage) => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null;
        if (sessionIdJson) {
            sessionId = JSON.parse(sessionIdJson).sessionId
        }
        try {
            const { data } = await axios.get(`/search/post`, {
                params: {
                    sessionId: sessionId,
                    search: search,
                    page: channelPage
                }
            });
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const createChannelOnClick = () =>{
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if (!sessionIdJson) {
            setModalContent('로그인 되어 있지 않습니다.');
            setModalOpen(true);
            return;
        }

        navigate(`/channelManagement`)
    }

    useEffect(() => {
        const fetchData = async () => {
            const channelListData = await searchChannel(search, channelPage);
            setChannelList(channelListData)
        };

        fetchData();

    }, [search, channelPage])

    useEffect(() => {
        const fetchData = async () => {
            const postListData = await searchPost(search, postPage);
            setPostList(postListData)
        };
        fetchData();

    }, [search, postPage])

    const pageUp = () => {
        setChannePage(prevState => channelList.paging.pageUp ? (prevState + 1) : prevState)
    }

    const pageDown = () => {
        setChannePage(prevState => (prevState - 1) >= 1 ? prevState - 1 : prevState = 1)
    }

    let id = sessionStorage.getItem('sessionId');

    return (
        <div className={style.searchMain}>
            <div>
                <div className={style.searchBody}>
                    <div className={style.searchBodyTop}>
                        {/*상단 제목*/}
                        <div className={style.searchTitle}>토픽 게시판</div>
                        {id && <div className={style.createChannel}>
                            <img className={style.createChannelIcon} src={OpenChannel} />
                            <div className={style.createChannelText} onClick={createChannelOnClick}>토픽 게시판 만들기</div>
                        </div>}
                    </div>
                    {channelList.success && channelList.search ?
                        <div className={style.searchChannelList}>                    {/*검색된 게시판 포문 돌려야함 1번 돌아가는대 8번*/}
                            {channelList.search.map((channelInfo, index) =>
                                <div key={index}>
                                    <SearchChannel channelInfo={channelInfo} />

                                </div>
                            )}
                        </div>
                        : <div className={style.nonPostText}>만들어진 토픽 게시판이 없어요</div>}
                    {(channelList.success && channelList.paging) &&
                        <div className={style.pageing}>
                            <div className={style.pageBtn}>
                                <img src={btnLeft} style={style.btnLeft} onClick={pageDown} /> {channelPage}/{channelList.paging.pageCount} <img src={btnRight} style={style.btnRight} onClick={pageUp} />
                            </div>
                        </div>
                    }
                </div>
                <div className={style.searchBodybottom}>
                    <div className={style.searchBodybottomText}>
                        검색어와 관련된 토픽
                    </div>
                </div>
                {(postList.success && postList.search) ?
                    <div>
                        {postList.search.map((postInfo, index) =>
                            <PublicBoard key={index} postInfo={postInfo} />
                        )}
                    </div> : <div className={style.nullPublicBoard}>검색어와 관련된 토픽이 없어요</div>
                }
                {(postList.success && postList.paging?.pageCount > 1) &&
                        <Paging paging={postList.paging} postPage={postPage} setPostPage={setPostPage} />
                }
            </div>
            {modalOpen && 
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    )
}

function SearchChannel({ channelInfo }) {

    let navigate = useNavigate();
    const [favoriteCount, setFavoriteCount] = useState(channelInfo.favoriteCount);

    return (
        <>
            <div className={style.searchChannel}>
                <div className={style.sratchChannelIconInfo} onClick={() => navigate(`/channel/${channelInfo.id}`)}>
                    <div className={style.searchChannelIcon}>
                        <img src={channelInfo.imageUrl} />
                    </div>
                    <div className={style.searchChannelInfo}>
                        <div className={style.searchChannelTitle}>{/*게시판 제목*/}{channelInfo.name}</div>
                        <div className={style.searchChannelmark}>{/*게시판 팔로워,즐찾수*/}
                            <div className={style.searchChannelmarkText}>팔로워</div>
                            <div className={style.searchChannelmarkCount}>
                                {formatUnit(channelInfo.followerCount)}
                            </div>
                            <div className={style.searchChannelmarkText}>즐겨찾기</div>
                            <div className={style.searchChannelmarkCount}>
                                {formatUnit(favoriteCount)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.bookmark}>
                    <BookmarkButton channelInfo={channelInfo} setFavoriteCount={setFavoriteCount} />
                </div>
            </div>
            <div className={style.dashed} />{/* 회색줄 */}
        </>
    )
}

export default Search;