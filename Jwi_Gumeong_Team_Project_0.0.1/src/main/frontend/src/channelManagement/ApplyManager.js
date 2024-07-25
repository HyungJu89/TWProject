import style from './style/ApplyManager.module.css'

import styleManagement from './style/Management.module.css';
import '../App.css'

function ApplyManager() {




    return (
        <div className={style.applyManagerMain}>
            <div>채널명</div>
            <input className={styleManagement.channelInputBox} placeholder='스트리머 채널명 입력...' />
            <div>관리자 신청 원하는 채널</div>
            <div>
                <div>채널 아이콘</div>
                <div>
                    <div>채널 이름</div>
                    <div>팔로워수 즐찾수</div>
                </div>
                <div>관리자 신청 전 주의사항</div>
                <div>
                    <ul>
                        <li>채널 관리자를 포기하면 신청한 사람에 한 해 관리자가 위임됩니다.</li>
                        <li>신고 혹은 제재를 받을 시 관리자 권한이 강제 박탈될 수 있습니다.</li>
                        <li>클린 한 쥐구멍 생활을 위해 채널 관리자의 운영 활동 기록이 일정 기간 동안 보관됩니다.</li>
                    </ul>
                </div>
                <div> 
                    <div>위 내용을 동의하십니까?</div>
                    <div>
                        <img></img>
                        <div>위 주의사항을 숙지했으며 동의합니다.</div>
                    </div>
                </div>
                <div>
                    채널 관리자 신청하기 버튼
                </div>
            </div>
        </div>
    )
}

export default ApplyManager;