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

function ChannelBody({channelInfo}) {


    return (
        <div className={style.channelBody}>{/* 채널 정보 bar */}
            <div className={style.channelInfo}>
                <div className={style.iconBack}>
                    <div className={style.channelIcon}>
                        <img className={style.icon} src={channelInfo?.imageUrl} alt="Channel Icon" />
                    </div>
                </div>
                <div className={style.iconRight}>
                    <div className={style.iconRightTop}>
                        <div className={style.imageBackground}>
                            <div className={style.channelTop}>
                                <div className={style.channelName}>{channelInfo.name}</div>
                                <div className={style.announcement}><img src={announcement} />[필수!]우리 토픽의 공지사항</div>
                            </div>
                            <div  className={style.bookmark}>
                                <BookmarkButton favorite={channelInfo.favorite}/>
                            </div>
                        </div>
                    </div>
                    <div className={style.whiteBackground}>
                        <div className={style.mark}>
                            <div className={style.markText}>팔로워</div>
                            <div className={style.markCount}> {formatUnit(channelInfo.followerCount)}</div>
                            <div className={style.markText}>즐겨찾기</div>
                            <div className={style.markCount}> {formatUnit(channelInfo.favoriteCount)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.channelInfoBackgroundColor}></div>
        </div>
    )
}

export default ChannelBody;