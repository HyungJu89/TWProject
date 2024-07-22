import { useEffect, useRef, useState } from 'react';
import style from './style/CreateChannel.module.css';

function CreateChannel() {

    const [channelUrl, setChannelUrl] = useState();
    const [sign, setSign] = useState(true);
    const [notice, setNotice] = useState(true);
    const [signText, setSignText] = useState('해당 스트리머의 게시판은 이미 존재합니다.');
    const [signColor, setSignColor] = useState('#EC000E');

    return (
        <div className={style.createMain}>
            <div className={style.createBody}>
                <div className={style.create}>{/* 채널 생성 상단 */}
                    <div className={style.createChannelTitle}>{/* 채널 개설하기 제목 */}
                        <img src='' />
                        <div className={style.createChannelTitleText}>채널 개설하기</div>
                    </div>
                    <div className={style.dashed} />{/* 회색줄 */}
                    <div className={style.createChannel}> {/*개설 할 스트리머 URL 입력부분 */}
                        <div className={style.createChannelText}>개설 할 스트리머 URL입력</div>
                        <input className={style.createChannelInput} placeholder='개설하고 싶은 스트리머의 URL을 넣어주세요.' />
                        {sign && (
                            <div className={style.warningText} style={{ color: `${signColor}` }}>{signText}</div>
                        )}
                        {notice && (
                            <div>
                                <div>채널 내 공지사항</div> {/*채널 공지사항 부분 Text */}
                                <div></div>{/* 섬머노트 에디터 연결*/}
                                <div>채널을 개설하기 전 주의 및 동의 사항!</div>{/* 채널 개설 설명 제목*/}
                                <div>
                                    <div>
                                    <div><div /> 최초로 게시판을 개설한 사람은 채널의 관리자가 됩니다.</div>
                                    <div><div /> 채널 관리자를 포기하면 신청한 사람에 한 해 관리자가 위임됩니다.</div>
                                    <div><div /> 신고 혹은 제재를 받을 시 관리자 권한이 강제 박탈될 수 있습니다.</div>
                                    <div><div /> 클린 한 쥐구멍 생활을 위해 채널 관리자의 운영 활동 기록이 일정 기간 동안 보관됩니다.</div>
                                    </div>
                                </div>
                                <div>
                                    <div>위 내용을 동의 하십니까?</div>
                                    <div>위 주의사항을 숙지했으며 동의합니다.</div>
                                </div>
                                <div>
                                    개설하기
                                </div>
                            </div>

                        )}
                    </div>

                </div>
                <div className={style.createManager}>{/* 관리자 신청 */}
                    <div className={style.createManagerTitle}>채널 관리자 신청하기</div>
                </div>
                <div className={style.deleteManager}>{/* 관리자 포기 */}
                    <div className={style.deleteManagerTitle}> 채널 관리자 포기하기</div>
                </div>
            </div>
        </div>
    )
}

export default CreateChannel;