import BookmarkButton from '../channel/BookmarkButton.js';
import style from './style/Search.module.css';
import OpenChannel from '../icon/24px/Open-channel.png';
import btnLeft from '../icon/btn/btn-left.png'
import btnRight from '../icon/btn/btn-right.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import PublicBoard from '../main/PublicBoard.js'
import {formatUnit} from '../recycleCode/FormatUnit.js';
import {searchPost} from '../recycleCode/postAxios.js'
function Search({ search }) {

    let navigate = useNavigate();

    const [channelList, setChannelList] = useState([]);
    const [postList, setPostList] = useState([]);
    const [channelPage, setChannePage] = useState(1);
    const [postPage, setPostPage] = useState(1);

    // 채널이 생성되어 있는지 확인
    //get 요청을 할때 params 로 데이터를 실어서 보낼수 있다.
    const searchChannel = async (search, channelPage) => {
        try {
            const { data } = await axios.get(`/search/channel`, {
                params: {
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

    useEffect(() => {
        const fetchData = async () => {
            const channelListData = await searchChannel(search, channelPage);
            setChannelList(channelListData)
        };

        fetchData();
        
    }, [search,channelPage])

    useEffect(() => {
        const fetchData = async () => {
            const postListData = await searchPost('search',search,postPage);
            setPostList(postListData)
        };
        fetchData();
    }, [search,postPage])

    const pageUp = () => {
        setChannePage(prevState => channelList.paging.pageUp ? (prevState + 1) : prevState)
    }

    const pageDown = () =>{
        setChannePage(prevState => (prevState - 1) >= 1 ? prevState - 1 : prevState = 1)
    }
    return (
        <div className={style.searchMain}>
            <div>
                <div className={style.searchBody}>
                    <div className={style.searchBodyTop}>
                        {/*상단 제목*/}
                        <div className={style.searchTitle}>토픽 게시판</div>
                        <div className={style.creactChannel}>
                            <img className={style.creactChannelIcon} src={OpenChannel} />
                            <div className={style.creactChannelText} onClick={() => navigate(`/channelManagement`)}>토픽 게시판 만들기</div>
                        </div>
                    </div>
                    {channelList.success ?
                        <div className={style.searchChannelList}>                    {/*검색된 게시판 포문 돌려야함 1번 돌아가는대 8번*/}
                            {channelList.search.map((channelInfo, index) =>
                                <div key={index}>
                                    <div className={style.searchChannel}>
                                        <div className={style.sratchChannelIconInfo} onClick={() => navigate(`/channel/${channelInfo.id}`)}>
                                            <div className={style.searchChannelIcon}>
                                                <img src={channelInfo.imageUrl}/>
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
                                                    {formatUnit(channelInfo.favoriteCount)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.bookmark}>
                                            <BookmarkButton />
                                        </div>
                                    </div>
                                    <div className={style.dashed} />{/* 회색줄 */}
                                </div>
                            )}

                        </div>
                        : <div className={style.nonPostText}>만들어진 토픽 게시판이 없어요</div>}
                        {(channelList.success && channelList.paging.pagingBut) &&
                            <div className={style.pageing}>
                                <div className={style.pageBtn}>
                                    <img src={btnLeft} style={style.btnLeft} onClick={pageDown}/> {channelPage}/{channelList.paging.pageCount} <img src={btnRight} style={style.btnRight} onClick={pageUp}/>
                                </div>
                            </div>
                        }     
                </div>
                <div className={style.searchBodybottom}>
                    <div className={style.searchBodybottomText}>
                        검색어와 관련된 토픽
                    </div>
                </div>
                {postList.success && 
                <>
                {postList.search.map((postInfo,index)=>
                <PublicBoard key={index} postInfo = {postInfo}/>
                )}
                </>
                }
            </div>
        </div>

    )
}

export default Search;