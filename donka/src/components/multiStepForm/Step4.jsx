import React, { useEffect, useState } from 'react';
import styles from './Step4.module.css';
import { IoMdPhotos } from "react-icons/io";

export default function Step4({ handleSubmit, backStep, nome, setImagem, imagem }) {

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagem(file);
        }
    };

    return (
        <div className={`${styles.container} ${styles.slideEnter}`}>
            <div className={styles.picture}>
                <h2>Agora escolha a foto mais bonita do(da) {nome}</h2>
                <label className={styles.photoContainer}>
                    {imagem && <img src={URL.createObjectURL(imagem)} alt="Foto do Pet" />}
                    {!imagem && <>
                        <IoMdPhotos />
                        <span>Escolha uma foto</span>

                    </>
                    }
                    <input onChange={handleFileChange} accept='image/*' type="file" />
                </label>
            </div>
            <div className={styles.btn}>
                <button onClick={backStep}>Voltar</button>
                <button className={styles.finalizar} onClick={handleSubmit}>Finalizar</button>
            </div>
        </div>
    );
}
