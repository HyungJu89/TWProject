import style from './style/CreateChannel.module.css'
import { useEffect, useRef, useState } from 'react';
import CreateChannelNext from './CreateChannelNext.js';

import styleManagement from './style/Management.module.css';
import '../App.css'

function CreateChannel() {

    const [channelUrl, setChannelUrl] = useState();
    const [sign, setSign] = useState(true);
    const [notice, setNotice] = useState(true);
    const [signText, setSignText] = useState('해당 스트리머의 게시판은 이미 존재합니다.');
    const [signColor, setSignColor] = useState('#EC000E');


    return (

        <div className={style.createChannel}> {/*개설 할 스트리머 URL 입력부분 */}
            <div className={style.createChannelText}>개설 할 스트리머 URL입력</div>
            <input className={styleManagement.channelInputBox} placeholder='개설하고 싶은 스트리머의 URL을 넣어주세요.' />
            {sign && (
                <div className={style.warningText} style={{ color: `${signColor}` }}>{signText}</div>/*URL 검토하고 가능유무 안내Text*/
            )}
            {notice && (
                <CreateChannelNext />
            )}
        </div>

    )
}



export default CreateChannel;