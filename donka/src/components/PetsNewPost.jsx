import React, { useEffect, useState } from 'react'
import styles from './PetsNewPost.module.css'
import { IoMdPhotos } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

import useImage from '../hooks/useImage';
import usePetsContent from '../hooks/usePetsContent';
import { useMessage } from '../context/MessageContext';
export default function PetsNewPost({ close, reload, setReload }) {
    const { isLoading, setIsLoading } = useLoading()
    const [imagem, setImagem] = useState(null);
    const [legenda, setLegenda] = useState('')
    const [data, setData] = useState('')
    const { id } = useParams()
    const { createPost } = usePetsContent()
    const { getImageUrl } = useImage()
    const {showMessage} = useMessage()
    const [errors, setErrors] = useState('');
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagem(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors('');
        if (!legenda) {
            setErrors('Legenda é obrigatória.');
            return
        }
        if (!data) {
            setErrors('Data é obrigatória.');
            return
        }
        if (!imagem) {
            setErrors('Imagem é obrigatória.');
            return
        }
        setIsLoading(true)
        try {
            const imageUrl = await getImageUrl(imagem)
            await createPost({
                dia: data,
                imageUrl,
                legenda,
                pet: id
            });
            showMessage("Post feito", "success", 5000)
        } catch {
            showMessage("Erro ao fazer o post", "error", 5000)
        } finally {
            setIsLoading(false)
            close(false);
            setReload(!reload)
        }
    };
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
                <textarea value={legenda} onChange={(e) => setLegenda(e.target.value)} name="legenda" placeholder='Digite a legenda da foto' />
            </label>
            <label className={styles.label} >
                <span>Data da foto</span>
                <input value={data} onChange={(e) => setData(e.target.value)} type="date" />
            </label>
            <label className={styles.photoContainer}>
                {imagem && <img src={URL.createObjectURL(imagem)} alt="Foto do Pet" />}
                {!imagem && <>

                    <span>Escolha uma foto</span>
                    <IoMdPhotos />
                </>
                }
                <input onChange={handleFileChange} accept='image/*' type="file" />
            </label>
            {errors && <p className={styles.erros}>{errors}</p>}
            <button className={styles.createPost}>Criar</button>
        </form>
    )
}
