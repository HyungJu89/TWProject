function Search() {






    return (
        <div className="searchMain">
            <div className="searchBody">
                <div className="searchBodyTop">
                    {/*상단 제목*/}
                    <div className="searchTitle">토픽게시판</div>
                    <div className="creactChannel">토픽게시판 만들기</div>
                </div>
                <div>
                    {/*검색된 게시판 포문 돌려야함*/}
                    <div className="searchBoard">
                        <div className="searchChannelIcon">{/*게시판 아이콘 */}</div>
                        <div className="searchChannelInfo">
                            <div className="searchChannelTitle">{/*게시판 제목*/}</div>
                            <div className="searchChannelmark">{/*게시판 팔로워,즐찾수*/}
                                <div className="searchChannelFollower">팔로워</div>
                                <div className="searchChannelBookmark">즐겨찾기</div>
                            </div>
                        </div>
                        <div>{/*즐겨찾기 아이콘*/}</div>
                    </div>
                </div>
                <div>{/*페이징*/}</div>
            </div>
        </div>

    )
}