import React, { useEffect, useState } from 'react';
import styles from './style/CustomerService.module.css';
import Header from '../header/Header.js';
import serviceLogo from '../icon/img/service-Illustration.png';

function CustomerServiceCenter() {

    return (
        <div>
            <div className={styles.serviceBanner}>
                <div className={styles.serviceBannerContents}>
                    <div className={styles.logoTitle}>고객센터</div>
                    <div className={styles.logoPosition}>
                        <img src={serviceLogo}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerServiceCenter;