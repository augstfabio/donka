import React from 'react'
import styles from './LoadingScreen.module.css'
import { MdOutlinePets } from "react-icons/md";
export default function LoadingScreen() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loading}>
            </div>
            <div className={styles.loadingIcon}><MdOutlinePets /></div>
        </div>
    )
}
