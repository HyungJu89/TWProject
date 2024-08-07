import { useState, useRef, useEffect  } from 'react';
import style from './style/CreateChannelNext.module.css'
import '../App.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import help from '../icon/20px/help.png'
import rule_add from '../icon/20px/rule-add.png'
import deletion from '../icon/14px/deletion.png'
import check_deactivation from '../icon/24px/check-deactivation.png'
import check_activation from '../icon/24px/check-activation.png'
import { useChannel } from '../recycleCode/ApiQuery.js';


function CreateChannelNext({ notice, channelInfo, channelUrl }) {
    let navigate = useNavigate();
    const [buttonColor, setButtonColor] = useState('#BBBBBB');
    const [iconColor, setIconColor] = useState(check_deactivation);
    const [checkBoxIcon, setCheckBoxIcon] = useState(false);

    const createChannel = async (channelCreate) => {
        try {
            //post 요청을 할때 Json 형식으로 데이터를 발송한다.
            const { data } = await axios.post(`/channel/create`, channelCreate);
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch channel data');
        }

    };

    const onClickCheckBoxIcon = () => {
        if (checkBoxIcon) {
            setIconColor(check_deactivation)
            setCheckBoxIcon(false)
        } else {
            setIconColor(check_activation)
            setCheckBoxIcon(true)
        }
        notice && !checkBoxIcon ? setButtonColor('#FF8901') : setButtonColor('#BBBBBB')
    }

    let [notUseNoticeValue, setNotUseNoticeValue] = useState('공지사항이 없습니다.');
    let [notUseNoticeColor, setNotUseNoticeColor] = useState('#fffff');
    let [notUseNoticeON, setNotUseNoticeON] = useState(false);
    const notUseNotice = () => {
        if (notUseNoticeValue){
            setNotUseNoticeValue('');
            setNotUseNoticeColor('#fffff');
            setNotUseNoticeON(false);
        }else{
            setNotUseNoticeValue('공지사항이 없습니다.');
            setNotUseNoticeColor('#F3F3F3');
            setNotUseNoticeON(true);
        }
    }
        // 입력 값이 변경될 때 상태를 업데이트하는 함수
        const handleChange = (event) => {
            setNotUseNoticeValue('');
        };

    const onClickButton = async () => {
        // 체크박스 예외처리
        if (!checkBoxIcon) {
            alert("주의사항 숙지후 체크버튼을 눌러주세요")
            return
        }

        //input 의 값과 API 의 값이 다를때 예외처리
        if (channelUrl != channelInfo.channelId) {
            alert("입력한 ID와 생성할 채널의 ID가 다릅니다.")
            return navigate("/channelManagement")
        }

        if (notice && checkBoxIcon) {
            let channelCreate = {
                id: channelInfo.channelId,
                name: channelInfo.channelName,
                imageUrl: channelInfo.channelImageUrl,
                followerCount: channelInfo.followerCount
            };
            try {
                let data = await createChannel(channelCreate);
                if(!data.success){
                    alert("이미 생성된 채널입니다. 해당 채널로 이동합니다.")
                }

                navigate(data.navigate)
            } catch (error) {
                console.error('Error creating channel:', error);
                alert('채널 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        }


    }
    const formatUnit = (number) => {
        let unit = ['만', '천']
        let num = [10000, 1000]


        if (number / num[0] >= 1) {
            let int = Math.floor(number / num[1]);

            return Math.floor(int / 10) + unit[0] + Math.floor(int % 10) + unit[1]
        }
        if (number / num[1] >= 1) {
            return Math.floor(number / num[1]) + unit[1];
        }
        return number
    }

    //규칙 추가하는 로직
    const [rulesAdd, setRulesAdd] = useState([]);
    const rulesAddArray = () => {
        return setRulesAdd([...rulesAdd, <AddRules rulesAdd={rulesAdd} setRulesAdd={setRulesAdd} length={lengthNum((rulesAdd.length)+2)} />])
    };
    const lengthNum = (num) => { // "01" 형태를 유지해주는 역할
        return num.toString().padStart(2, '0');
    };
    //Ref 기준으로 스크롤이 하단으로 내려가는 코드
    const rulesRef = useRef(null);
    useEffect(()=>{
        if (rulesRef.current){
            rulesRef.current.scrollTop  = rulesRef.current.scrollHeight;
        }
    },[rulesAdd])

    const { data: channelApi, isLoading: isLoadingChannel, isError: isErrorChannel } = useChannel(channelUrl);
    if (isLoadingChannel) {
        return <></>;
    }
    if (isErrorChannel) {
        return <></>;
    }

    return (
        <div className="fadein">{/*채널내 공지사항 작성부분*/}
            <div className={style.announcementTitle}>개설 할 채널 확인</div> {/*채널 공지사항 부분 Text */}
            <div className={style.announcementArea}>
                <div className={style.formGroup}>
                    <img src={channelApi.channelImageUrl} />
                    <div className={style.streammerInfo}>
                        <div className={style.channelName}>{channelApi.channelName}</div>
                        <div className={style.follower}>
                            <div className={style.markText}>팔로워</div>
                            <div className={style.markCount}> {formatUnit(channelApi.followerCount)}</div>
                            <div className={style.markText}>즐겨찾기</div>
                            <div className={style.markCount}> 10000만</div>
                        </div>
                    </div>
                </div>
            </div>{/*개설 할 채널 확인*/}
            <div className={style.announcementTitle}>
                <div>채널 내 공지사항 제목</div>
                <div onClick={notUseNotice}> <img style={{ marginRight: '4px' }} src={help} />공지사항 사용 안함</div>
            </div> {/*채널 내 공지사항 제목 */}
            <input className={style.noticeInputBox} style={{backgroundColor: {notUseNoticeColor}}} value={notUseNoticeValue} onChange={handleChange}
             placeholder='공지사항의 제목을 입력해주세요.' />

            <div className={style.announcementTitle}>채널 규칙</div> {/*채널 공지사항 부분 Text */}
            <div className={style.noticeRulesBox} ref={rulesRef}>
            <div className={style.noticeRules} style={{marginTop:'0px'}}>01.
                <input placeholder='채널 내 규칙을 입력해주세요.' />
            </div>
            {rulesAdd}
            </div>
            <div onClick={rulesAddArray} className={style.noticeRulesAdd}><img src={rule_add} />규칙 추가하기</div>

            <div className={style.announcementTitle}>공지사항 하고 싶은 말</div> {/*채널 공지사항 부분 Text */}
            <textarea className={style.moreText} placeholder='추가적으로 하고 싶은 말을 입력해주세요. (선택)'/>

            <div className={style.announcementText}>채널을 개설하기 전 주의 및 동의 사항!</div>{/* 채널 개설 설명 제목*/}
            <div className={style.precautions}>{/*채널 개설하기전 주의사항 문구*/}
                <ul className={style.precautionsText}>
                    <li className={style.precautionsLi}>최초로 게시판을 개설한 사람은 채널의 관리자가 됩니다.</li>
                    <li className={style.precautionsLi}>채널 관리자를 포기하면 신청한 사람에 한 해 관리자가 위임됩니다.</li>
                    <li className={style.precautionsLi}>신고 혹은 제재를 받을 시 관리자 권한이 강제 박탈될 수 있습니다.</li>
                    <li className={style.precautionsLi}>클린 한 쥐구멍 생활을 위해 채널 관리자의 운영 활동 기록이 일정 기간 동안 보관됩니다.</li>
                </ul>
            </div>
            <div className={style.bottom}>{/*하단 동의하기 체크*/}
                <div className={style.bottomText}>위 내용을 동의 하십니까?</div>{/* 동의하기부분 text*/}
                <div  onClick={onClickCheckBoxIcon} className={style.bottomCheckBox}><img className={style.checkBoxIcon} src={iconColor} />위 주의사항을 숙지했으며 동의합니다.</div> {/*동의하기 체크박스*/}
            </div>
            <div className={style.createButton} style={{ backgroundColor: buttonColor }} onClick={onClickButton}> {/*개설하기 버튼*/}
                개설하기
            </div>
        </div>

    )
}

function AddRules({length, rulesAdd, setRulesAdd}) {
    return (
        <div className={style.noticeRules}>{length}.
            <input placeholder='채널 내 규칙을 입력해주세요.' />
            <img onClick={()=>
                {   let copy = [...rulesAdd];
                    copy.slice(length-2, 1);
                    setRulesAdd(copy);                    
                }
            } className={style.hover_image} src={deletion}/>
        </div>
    )
}

export default CreateChannelNext;