import { configureStore } from '@reduxjs/toolkit'
import imgUiModal from './slice/mainSlice'
import userState from './slice/loginSlice'
import session from './slice/sessionSlice';
/**
 * -리덕스 쓰는이유 
 * -컴포넌트간 state 공유 편해짐
 * -작은 프로젝트면 props 사용하는게 더 편함
 * -컴포넌트간 공유가 필요없으면 useState() 그냥 써도 상관없슴
 * -프롭스 사용해도 상관없습니다!
 * 
 * 
 * Redux의 State를 수정하는방법
 * 1.state 수정하는 함수 만들기
 * 2.만든 함수를 export 해야됨
 * 3.만든 함수 import 해서 사용
 * 4.disPatch 라는 redux 내장객체도 필요함. disPatch 호출 후 disPatch(함수명) 이런식을 사용하면 됨.
 * 
 * 방식은 Cart에서 요청-> store.js에서 changeName()실행해달라고 부탁 -> Cart로 전송
 * 버그추적에 용이함
 */

export default configureStore({
  reducer: { 
    imgUiModal : imgUiModal.reducer,
    userState : userState.reducer,
    session: session,
  }
}) 