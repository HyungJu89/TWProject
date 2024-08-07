import { useState } from 'react';
import style from './style/CreateChannelNext.module.css'
import '../App.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateChannelNext({notice,channelInfo,channelUrl}) {
    let navigate = useNavigate();

    const [buttonColor, setButtonColor] = useState('#BBBBBB');
    const [iconColor, setIconColor] = useState('#BBBBBB');
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
            setIconColor('#BBBBBB')
            setCheckBoxIcon(false)
        } else { 
            setIconColor('#FF8901')
            setCheckBoxIcon(true)
        }

        notice && !checkBoxIcon ? setButtonColor('#FF8901') : setButtonColor('#BBBBBB')
        
    }


    const onClickButton = async() => {
        // 체크박스 예외처리
        if(!checkBoxIcon){
            alert("주의사항 숙지후 체크버튼을 눌러주세요")
            return
        }

        //input 의 값과 API 의 값이 다를때 예외처리
        if(channelUrl != channelInfo.channelId){
            alert("입력한 ID와 생성할 채널의 ID가 다릅니다.")
            return navigate("/channelManagement")
        }

        if(notice && checkBoxIcon){
            let channelCreate = {
                id : channelInfo.channelId,
                name : channelInfo.channelName,
                imageUrl : channelInfo.channelImageUrl,
                followerCount : channelInfo.followerCount
            };
            try{
                let data = await createChannel(channelCreate);
                if(!data.success){
                    alert("이미 생성된 채널입니다. 해당 채널로 이동합니다.")
                }

                navigate(data.navigate)
            }catch (error){
            console.error('Error creating channel:', error);
            alert('채널 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        }


    }

    return (
        <div className={style.createChannelNext}>{/*채널내 공지사항 작성부분*/}
            <div className={style.announcementTitle}>채널 내 공지사항</div> {/*채널 공지사항 부분 Text */}
            <div className={style.announcementArea}></div>{/* 게시글 작성*/}
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
                <div className={style.bottomCheckBox}><img  className={style.checkBoxIcon} onClick={onClickCheckBoxIcon} style={{ backgroundColor: iconColor }} />위 주의사항을 숙지했으며 동의합니다.</div> {/*동의하기 체크박스*/}
            </div>
            <div className={style.createButton} style={{ backgroundColor: buttonColor }} onClick={onClickButton}> {/*개설하기 버튼*/}
                개설하기
            </div>
        </div>

    )
}

export default CreateChannelNext;