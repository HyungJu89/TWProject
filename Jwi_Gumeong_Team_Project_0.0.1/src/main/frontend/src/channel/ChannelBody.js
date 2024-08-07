import { useParams } from 'react-router-dom';
import style from './style/ChannelBody.module.css';
import axios from 'axios';
import '../App.css'
import BookmarkButton from './BookmarkButton.js';
import announcement from '../icon/20px/announcement.png';
import { useChannel } from '../recycleCode/ApiQuery.js';
import { useQuery } from 'react-query';
import { useState } from 'react';
import {formatUnit} from '../recycleCode/FormatUnit.js';

function ChannelBody() {


    let { channelId } = useParams();




    // 첫 번째 쿼리: 채널 정보를 가져오기.
    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useChannel(channelId);

    if (isLoadingChannel) {
        return <div>채널바디 로딩중</div>;
    }

    if (isErrorChannel) {
        return <div>에러남</div>;
    }






    return (
        <div className={style.channelBody}>{/* 채널 정보 bar */}
            <div className={style.channelInfo}>
                <div className={style.iconBack}>
                    <div className={style.channelIcon}>
                        <img className={style.icon} src={channelApi?.channelImageUrl} alt="Channel Icon" />
                    </div>
                </div>
                <div className={style.iconRight}>
                    <div className={style.iconRightTop}>
                        <div className={style.imageBackground}>
                            <div className={style.channelTop}>
                                <div className={style.channelName}>{channelApi.channelName}</div>
                                <div className={style.announcement}><img src={announcement} />[필수!]우리 토픽의 공지사항</div>
                            </div>
                            <div  className={style.bookmark}>
                                <BookmarkButton/>
                            </div>
                        </div>
                    </div>
                    <div className={style.whiteBackground}>
                        <div className={style.mark}>
                            <div className={style.markText}>팔로워</div>
                            <div className={style.markCount}> {formatUnit(channelApi.followerCount)}</div>
                            <div className={style.markText}>즐겨찾기</div>
                            <div className={style.markCount}> 10000만</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.channelInfoBackgroundColor}></div>
        </div>
    )
}

export default ChannelBody;