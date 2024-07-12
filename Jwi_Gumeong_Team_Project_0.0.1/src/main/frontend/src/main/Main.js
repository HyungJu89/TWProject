/* eslint-disable */
// ^워링 업애주는 친구

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style/Main.module.css';
import '../App.css';
import PublicBoard from './PublicBoard.js'

function Main() {
    let navigate = useNavigate();
    return (
    <div className={styles.basic}> {/*전체 DIV*/}
        <div className={styles.leftDiv}>{/*게시판 영역*/}
            <div className={styles.hotBoard}></div>
            <div className={styles.Nav}></div>
            <button style={{width : '150px', height : '50px'}} onClick={()=>{navigate('/channel/'+'123')}}>채널 확인 URL</button>
        </div>
        <div className={styles.rightDiv}>{/*유저 영역 */}
            <div className={styles.userBefore}></div>   
        </div>
    </div>
    );
}

export default Main;
 