import { useState, useRef, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style/ApplyManagerNext.module.css'
import styleManagement from './style/Management.module.css';
import check_deactivation from '../icon/24px/check-deactivation.png'
import check_activation from '../icon/24px/check-activation.png'
import checklist from '../icon/24px/checklist.png'
import '../App.css'

function ApplyManagerNext({ selectCreatorInfo, route }) {
    let navigate = useNavigate();
    const [buttonColor, setButtonColor] = useState('#BBBBBB');
    const [iconColor, setIconColor] = useState(check_deactivation);
    const [checkBoxIcon, setCheckBoxIcon] = useState(false);

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

    const onClickCheckBoxIcon = () => {
        if (checkBoxIcon) {
            setIconColor(check_deactivation)
            setCheckBoxIcon(false)
        } else {
            setIconColor(check_activation)
            setCheckBoxIcon(true)
        }
        !checkBoxIcon ? setButtonColor('#FF8901') : setButtonColor('#BBBBBB')
    }

    const onClickButton = async () => {
        // 체크박스 예외처리
        if (!checkBoxIcon) {
            alert("주의사항 숙지후 체크버튼을 눌러주세요")
            return
        }
        alert("정상적으로 관리자 신청이 완료되었습니다.")
        navigate('/')
    }
    
    let [routeText, setRouteText] = useState([]);
    useEffect(()=>{
        if(route === 'giveUp'){
            setRouteText([
                '관리자 포기를 원하는 채널', 
                '채널을 포기하기 전 주의 및 동의 사항!',
                '채널 관리자 포기 신청 시 철회는 불과합니다.',
                '채널 관리자를 포기 시 관리자를 신청한 사람이 생길 때 까지 유지됩니다. (만약, 포기 이후 신청한 관리자가 없다면 공지사항에 자동으로 모집이 올라갑니다. 다음 관리자가 생기지 않으면 포기 신청 기준 n일까지 관리자해야합니다. 어쩌구 저쩌구?)',
                '채널 관리자 포기하기'
            ]);
        }
    },[])
    return (
        <div>
            <div className={style.announcementTitle}>{routeText[0]}</div> {/*선택한 스트리머 정보 */}
            <div className={style.announcementArea}>
                <div className={style.formGroup}>
                    <img src='https://health.chosun.com/site/data/img_dir/2024/02/20/2024022002560_0.jpg' />
                    <div className={style.streammerInfo}>
                        <div className={style.channelName}>이름</div>
                        <div className={style.follower}>
                            <div className={style.markText}>팔로워</div>
                            <div className={style.markCount}> {formatUnit(123123)}</div>
                            <div className={style.markText}>즐겨찾기</div>
                            <div className={style.markCount}> 10000만</div>
                        </div>
                    </div>
                </div>
            </div>{/*개설 할 채널 확인*/}
            <div className={style.announcementTitle}><img src={checklist}/>{routeText[1]}</div>{/* 채널 개설 설명 제목*/}
            <div className={style.precautions}>{/*채널 개설하기전 주의사항 문구*/}
                <ul className={style.precautionsText}>
                    <li className={style.precautionsLi}>{routeText[2]}</li>
                    <li className={style.precautionsLi}>{routeText[3]}</li>
                </ul>
            </div>
            <div className={style.bottom}>{/*하단 동의하기 체크*/}
                <div className={style.bottomText}>위 내용을 동의 하십니까?</div>{/* 동의하기부분 text*/}
                <div onClick={onClickCheckBoxIcon} className={style.bottomCheckBox}><img className={style.checkBoxIcon} src={iconColor} />위 주의사항을 숙지했으며 동의합니다.</div> {/*동의하기 체크박스*/}
            </div>
            <div className={style.createButton} style={{ backgroundColor: buttonColor }} onClick={onClickButton}> {/*개설하기 버튼*/}
            {routeText[4]}
            </div>
        </div>
    )
}

export default ApplyManagerNext;