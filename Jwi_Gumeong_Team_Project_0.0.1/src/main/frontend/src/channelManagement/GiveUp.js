import style from './style/ApplyManager.module.css'
import styleManagement from './style/Management.module.css';
import ApplyManagerNext from'./ApplyManagerNext.js';
import { useEffect, useRef, useState } from 'react';
import '../App.css'

function GiveUp() {

    let [searchPopOpen, setSearchPopOpen] = useState(false);
    let popModalRef = useRef(null);
    let popinputRef = useRef(null);

    useEffect(()=>{//모달창 :: 다른 곳누르면 닫히는 코드
        const popRefSearchEvent = (e) =>{
            if(searchPopOpen && 
                !popModalRef.current.contains(e.target) && !popinputRef.current.contains(e.target))
                {setSearchPopOpen(false);}
        };
            document.addEventListener('mousedown',popRefSearchEvent);
            //HTML 전체에서. 이벤트를 등록('마우스 클릭 시', 앞서 설정한 내용);
            return()=>{ //클린업
            document.removeEventListener('mousedown',popRefSearchEvent);
            //HTML 전체에서. 이벤트를 삭제('마우스 클릭 시', 앞서 설정한 내용);
        };
    },[searchPopOpen])

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

    let [applyNext, setApplyNext] = useState(false); //스트리머 선택 여부
    let [selectCreatorInfo, setSelectCreatorInfo] = useState('')//선택 스트리머 정보
    return (
        <div className={style.applyManagerMain}>
            <div>채널명</div>
            <div ref={popinputRef}  onClick={()=>{setSearchPopOpen(true)}} className={styleManagement.channelInputBox} placeholder='스트리머 채널명 입력...' />
            {searchPopOpen &&
            <div ref={popModalRef} className={style.searchPopUp}>
                <div className={style.scroll}>
                    <SearchPop setSearchPopOpen={setSearchPopOpen} formatUnit={formatUnit} setApplyNext={setApplyNext} setSelectCreatorInfo={setSelectCreatorInfo}/>
                </div>
            </div>
            }
            {applyNext && <ApplyManagerNext route={'giveUp'}/>}
        </div>
    )
}

function SearchPop({formatUnit,setApplyNext,setSelectCreatorInfo,setSearchPopOpen}) {
        return(
        <div onClick={()=>{setApplyNext(true); setSearchPopOpen(false); setSelectCreatorInfo('DB에서꺼내올거');}} className={style.result}>
            <div className={style.formGroup}>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNBZACXy5wU8XOrMUB87u_xKqwtUTNSj9LMQ&s' />
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
    </div>
    )
}


export default GiveUp;