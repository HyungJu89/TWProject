import BookmarkButton from '../channel/BookmarkButton.js';
import style from './style/Search.module.css';
import OpenChannel from '../icon/24px/Open-channel.png';
import btnLeft from '../icon/btn/btn-left.png'
import btnRight from '../icon/btn/btn-right.png'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Search() {

const [searchChannelList,setSearchChannelList] = useState([]);


let navigate = useNavigate();
//임시 변수
let postTrue = true; 

useEffect(()=>{
    //ajax 로 서버에서 글 리스트 요청

    //글 리스트 요청 받은뒤 

    //글 리스트 사이즈 확인하면 됨
})

    return (
        <div className={style.searchMain}>
            <div className={style.searchBody}>
                <div className={style.searchBodyTop}>
                    {/*상단 제목*/}
                    <div className={style.searchTitle}>토픽 게시판</div>
                    <div className={style.creactChannel}>
                        <img className={style.creactChannelIcon} src={OpenChannel} />
                        <div className={style.creactChannelText}>토픽 게시판 만들기</div>
                    </div>
                </div>
                {postTrue ? 
                <div className={style.searchChannelList}>                    {/*검색된 게시판 포문 돌려야함 1번 돌아가는대 8번*/}
                    <div className={style.searchChannel}>
                        <div className={style.sratchChannelIconInfo}>
                            <div className={style.searchChannelIcon}>{/*게시판 아이콘 */}</div>
                            <div className={style.searchChannelInfo}>
                                <div className={style.searchChannelTitle} onClick={()=>navigate('/channel/123')}>{/*게시판 제목*/}제목</div>
                                <div className={style.searchChannelmark}>{/*게시판 팔로워,즐찾수*/}
                                    <div className={style.searchChannelmarkText}>팔로워</div>
                                    <div className={style.searchChannelmarkCount}>9만9천</div>
                                    <div className={style.searchChannelmarkText}>즐겨찾기</div>
                                    <div className={style.searchChannelmarkCount}>9만9천</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.bookmark}>
                            <BookmarkButton />
                        </div>
                    </div>
                    <div className={style.dashed} />{/* 회색줄 */}
                </div>
                : <div className={style.nonPostText}>만들어진 토픽 게시판이 없어요</div>}
                <div className={style.pageing}>
                    <div className={style.pageBtn}>
                        <img src={btnLeft} style={style.btnLeft}></img> 1/5 <img src={btnRight} style={style.btnRight}></img>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Search;