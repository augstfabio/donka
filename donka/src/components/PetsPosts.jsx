import React from 'react';
import styles from './PetsPosts.module.css';
import { IoMdCloseCircleOutline } from "react-icons/io";
const PetsPosts = ({ imageSrc, text, onDelete, onClose, edit }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={onClose}>
                    <IoMdCloseCircleOutline />
                </span>
                <img src={imageSrc} alt="Post Image" className={styles.modalImage} />
                <p className={styles.modalText}>{text}</p>
                <button onClick={edit} className={styles.editBtn}>Editar</button>
            </div>
        </div>
    );
};

export default PetsPosts;
