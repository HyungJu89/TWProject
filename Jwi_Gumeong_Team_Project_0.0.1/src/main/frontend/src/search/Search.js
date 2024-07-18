import BookmarkButton from '../channel/BookmarkButton.js';
import style from './style/Search.module.css';
import OpenChannel from '../icon/24px/Open-channel.png';
function Search() {






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
                <div className={style.searchChannelList}>                    {/*검색된 게시판 포문 돌려야함*/}
                    <div className={style.searchChannel}>
                        <div className={style.searchChannelIcon}>{/*게시판 아이콘 */}</div>
                        <div className={style.searchChannelInfo}>
                            <div className={style.searchChannelTitle}>{/*게시판 제목*/}제목</div>
                            <div className={style.searchChannelmark}>{/*게시판 팔로워,즐찾수*/}
                                <div className={style.searchChannelmarkText}>팔로워</div>
                                <div className={style.searchChannelmarkCount}>9만9천</div>
                                <div className={style.searchChannelmarkText}>즐겨찾기</div>
                                <div className={style.searchChannelmarkCount}>9만9천</div>
                            </div>
                        </div>
                        <div className={style.bookmark}>
                            <BookmarkButton />
                        </div>
                    </div>
                    <div className={style.dashed} />{/* 회색줄 */}
                </div>
                <div>{/*페이징*/}</div>
            </div>
        </div>

    )
}

export default Search;