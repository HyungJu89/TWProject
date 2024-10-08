import style from './style/CreateChannel.module.css'
import { useEffect, useRef, useState } from 'react';
import CreateChannelNext from './CreateChannelNext.js';
import { fetchChannel } from '../recycleCode/Api.js'
import styleManagement from './style/Management.module.css';
import helpIcon from '../icon/20px/help.png';
import helpImg from '../icon/img/help-img.png';
import '../App.css'
import axios from 'axios';
import { checkChannel } from '../recycleCode/ChannelAxios.js';

function CreateChannel({ManagementChannelId, openModal}) {
    const [channelUrl, setChannelUrl] = useState();
    const [channelInfo,setChannelInfo] = useState();
    const [sign, setSign] = useState(false);
    const [notice, setNotice] = useState(false);
    const [asd, setAsd] = useState(false);
    const [signText, setSignText] = useState('해당 스트리머의 게시판은 이미 존재합니다.');
    const [signColor, setSignColor] = useState('#EC000E');
    // 최소 팔로워수 
    const limitefollowerCount = 150;
    // 채널아이디 길이
    const channelLength = 32;

    const onChangeInput = async (e) => {
        const specialCharacters = /[^a-zA-Z0-9 ]/g;
        let value = e.target.value
        setChannelId(e.target.value);
        setSign(true)
        if (value.length != channelLength) {
            setSignText('올바르지 않은 채널 ID 입니다.')
            noticeFalse()
            return;
        }

        if (specialCharacters.test(value)) {
            setSignText('유효하지않은 문자가 입력되어있습니다.')
            noticeFalse()
            return;
        }
        try {
            // 추후 방송인의 간단한 정보를 띄울땐 이 data 를 사용하면된다
            let channelInfo = await fetchChannel(value); 
            if (channelInfo.channelId == null) {
                setSignText('해당 스트리머는 존재하지 않습니다.')
                noticeFalse()
                return;
            }

            if (channelInfo.followerCount < limitefollowerCount) {
                setSignText('해당 스트리머의 팔로우 수가 부족해 개설이 불가합니다. (최소 150명 필요)')
                noticeFalse()
                return;
            }

            let data = await checkChannel(value)
            
            if (data) {
                setSignText('해당 스트리머의 게시판 개설이 가능합니다.');
                setChannelUrl(value)
                setSignColor('#FF8901');
                setNotice(true);
                setChannelInfo(channelInfo);
            } else {
                setSignText('해당 스트리머의 게시판은 이미 존재합니다.')
                noticeFalse()
                return
            }
        } catch {
            setSignText('서버 통신중 에러가 발생하였습니다 다시한번 시도해주세요.')
            noticeFalse()
        }
    }

    const noticeFalse = () => {
        setSignColor('#EC000E')
        setNotice(false);
    }

    //ManagementChannelId :: 미개설된 채널을 추천 받아서 채널 개설로 들어올 경우 자동완성 활성화
    const [channelId, setChannelId] = useState('');
    useEffect(() => {
        async function fetchData() {
            if (ManagementChannelId) {
                try {
                    let channelInfo = await fetchChannel(ManagementChannelId); 
                    setChannelId(ManagementChannelId);
                    setSignText('해당 스트리머의 게시판 개설이 가능합니다.');
                    setChannelUrl(ManagementChannelId);
                    setSignColor('#FF8901');
                    setNotice(true);
                    setChannelInfo(channelInfo);
                } catch (error) {
                    console.error('Error fetching channel:', error);
                }
            }
        }
        fetchData();
    }, [ManagementChannelId]);

    return (
        <div className={style.createChannel}> {/*개설 할 스트리머 URL 입력부분 */}
            <div className={style.createChannelLine}>
                <div className={style.createChannelText}>개설 할 스트리머 URL입력</div>
                <img className={style.createHelpIcon} src={helpIcon} alt="도움아이콘" onClick={()=>{setAsd(Prev => !Prev)}}></img>
                    { 
                    asd && 
                    <div className={style.createHelpModal}>
                        <div className={style.createHelpModalTitle}>스트리머의 URL 중 ‘고유 코드’를 붙여 넣어주세요!</div>
                        <img className={style.createHelpModalImg} src={helpImg} alt="도움 이미지"></img>
                        <div className={style.createHelpModalText}>스트리머 채널 주소 입력 예시 이미지</div>
                    </div> 
                    }
            </div>
            <input value={channelId} className={styleManagement.channelInputBox} placeholder='개설하고 싶은 스트리머의 URL을 넣어주세요.' onChange={onChangeInput} />
            {sign && (
                <div className={style.warningText} style={{ color: `${signColor}` }}>{signText}</div>/*URL 검토하고 가능유무 안내Text*/
            )}
            {notice && (
                <CreateChannelNext notice = {notice} channelInfo={channelInfo} channelUrl={channelUrl} openModal={openModal}/>
            )}
        </div>
    )
}

export default CreateChannel;