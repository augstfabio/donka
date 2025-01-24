import React from "react";
import styles from "./ImagePreview.module.css";
import { IoCloseCircleOutline } from "react-icons/io5";


export default function ImagePreview({ imageURL, close }) {
    return (
        <div className={styles.previewContainer}>
          
            {imageURL ? (
                <img className={styles.previewImage} src={imageURL} alt="Preview" />
            ) : (
                <p className={styles.placeholder}>Selecione uma imagem para visualizar</p>
            )}
              <div onClick={close} className={styles.closeBtn}><IoCloseCircleOutline /></div>
        </div>
    );
}