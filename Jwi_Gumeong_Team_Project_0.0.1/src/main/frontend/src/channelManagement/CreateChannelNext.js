import { useState } from 'react';
import style from './style/CreateChannelNext.module.css'
import '../App.css'

function CreateChannelNext(){


    const [buttonColor, setButtonColor] = useState('#BBBBBB');
    
    const [checkBoxIcon, setCheckBoxIcon] = useState();

    const onClickCheckBoxIcon = () => {
        //checkBoxIcon ? setCheckBoxIcon : setCheckBoxIcon 삼항 연산자로 아이콘이비어있을때 부터 조작하면됨 

    }

    return(
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
            <div className={style.bottomCheckBox}><img src={checkBoxIcon} className={style.checkBoxIcon} onClick={onClickCheckBoxIcon} />위 주의사항을 숙지했으며 동의합니다.</div> {/*동의하기 체크박스*/}
        </div>
        <div className={style.createButton} style={{ backgroundColor: '#BBBBBB' }} onClick={() => console.log('채널 개설중')}> {/*개설하기 버튼*/}
            개설하기
        </div>
    </div>

    )
}

export default CreateChannelNext;