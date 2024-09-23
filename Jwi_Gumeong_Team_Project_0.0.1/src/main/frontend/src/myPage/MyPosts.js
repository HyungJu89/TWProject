import React, { useEffect, useState } from 'react';
import styles from './style/MyPosts.module.css';
import { useQuery } from 'react-query';
import PublicBoard from '../main/PublicBoard.js';
import Paging from '../Paging/Paging.js'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlarmModal from '../modal/AlarmModal.js';

//내가 쓴 글 페이지
function MyPosts() {
    let navigate = useNavigate();
    const [channel, setChannel] = useState('');
    const [postList, setPostList] = useState([]);
    const [postPage, setPostPage] = useState(1);
    // 모달 상태
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    // 닫기
    const [onClose, setOnClose] = useState(null);


    const myPostSelect = async () => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        let sessionId = null;
        if (sessionIdJson) {
            sessionId = JSON.parse(sessionIdJson).sessionId
        }
        try {
            const { data } = await axios.get(`/post/myPost`, {
                params: {
                    sessionId: sessionId,
                    page: postPage
                }
            });
            setPostList(data)
            return data;
        } catch (error) {
            console.error('Channel API Error:', error);
            throw new Error('Failed to fetch post data');
        }
    };

    // 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
        if (onClose) {
            onClose();
        }
    }

    // 모달 열기
    const openModal = (content, close = null) => {
        setModalContent(content);
        // 닫으면 불러와 null을!
        setOnClose(() => close);
        setModalOpen(true);
    };

    useEffect(() => {
        let sessionIdJson = sessionStorage.getItem('sessionId');
        if (!sessionIdJson) {
            return openModal('로그인 되어있지않습니다. ', () => navigate(-1));
        }
        setPostList([]);
        myPostSelect()

    }, [postPage]);


    return (
        <div className={styles.MyPosts}>
            {postList.success &&
                <>{postList.search ?
                    <div className={styles.fadein}>
                        {postList.search.map((postInfo, index) =>
                            <PublicBoard key={index} postInfo={postInfo} />
                        )}
                    </div> :
                    <div className={styles.nonPostList}>게시글이 없습니다.</div>
                }</>
            }
            {(postList.success && postList.paging?.pageCount > 1) &&
                <Paging paging={postList.paging} postPage={postPage} setPostPage={setPostPage} />
            }
            {modalOpen &&
                <AlarmModal content={<div>{modalContent}</div>} onClose={closeModal} />
            }
        </div>
    );
}

export default MyPosts;