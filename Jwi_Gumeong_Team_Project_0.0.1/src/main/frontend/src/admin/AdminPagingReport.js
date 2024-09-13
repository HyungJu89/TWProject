import React, { useEffect, useState } from 'react';
import styles from './style/AdminPaging.module.css';

function AdminPaging({ report, onItemsChange }) {
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const itemsPerPage = 10; // 페이지당 보여줄 항목 수

    // 총 페이지 수 계산
    const totalPages = Math.ceil(report.length / itemsPerPage);

    // 현재 페이지에서 보여줄 데이터 슬라이싱
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = report.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        if (onItemsChange) {
            onItemsChange(currentItems);
        }
        if(report.length < 11){
            setCurrentPage(1);
        }
    }, [currentPage,report]);

    // 다음 페이지로 이동
    const handleNextPage = () => {
        const newPage = Math.min(currentPage + 10, totalPages);
        setCurrentPage(newPage);
    };

    // 이전 페이지로 이동
    const handlePrevPage = () => {
        const newPage = Math.max(currentPage - 10, 1);
        setCurrentPage(newPage);
    };

    // 특정 페이지로 이동
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // 페이지 번호 배열 생성
    const generatePageNumbers = () => {
        // 현재 페이지를 중심으로 5페이지 전후
        let start = Math.max(1, currentPage - 4); 
        // 현재 페이지를 중심으로 10페이지 (끝 페이지는 총 페이지 수를 넘지 않음)
        let end = Math.min(totalPages, start + 9);
        // 만약 페이지 번호가 부족하면 앞에서부터 추가
        if (end - start < 9) {
            start = Math.max(1, end - 9);
        }
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className={styles.adminPageing}>
            <div className={styles.adminPageingPrevBtn} onClick={handlePrevPage}>
                이전
            </div>
            {pageNumbers.map((pageNumber)=>{
                return(
                    <div
                        key={pageNumber}
                        // className={`${styles.adminPageingNowBtn} ${currentPage === pageNumber ? styles.active : ''}`}
                        className={`${styles.adminPageingNowBtn} ${currentPage === pageNumber ? styles.active : ''}`}
                        onClick={() => handlePageClick(pageNumber)}
                    >
                    {pageNumber}
                    </div>
                )
            })}
            <div className={styles.adminPageingNextBtn} onClick={handleNextPage}>
                다음
            </div>
        </div>
    );
}

export default AdminPaging;