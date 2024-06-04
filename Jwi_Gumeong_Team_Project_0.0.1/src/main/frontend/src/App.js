// src/main/frontend/src/App.js

import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
   const [hello, setHello] = useState('')
   const [nuna, setNamhwi] = useState('')
   const hi = "마라";

    useEffect(() => {
        axios.get('/babo/jieun')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);
    useEffect(() => {
        axios.get('/babo/hyungju')
        .then(response => setNamhwi(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
        	백엔드에서 가져온 데이터입니다 : {hello}
            <p>
            
            백엔드에서 가져온 데이터입니다 : {hi}
            </p>
            <span onClick={() => {setNamhwi("안하지..연락만 안끊기면")}}>
            	형주가 남희누나한테 한 말: {nuna}
            </span>
        </div>
    );
}

export default App;