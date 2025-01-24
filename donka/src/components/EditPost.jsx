import React, { useState } from 'react';
import styles from './EditPost.module.css';
import { IoMdCloseCircleOutline } from "react-icons/io";
import LoadingScreen from './LoadingScreen';
import { useLoading } from '../context/LoadingContext';
import usePetsContent from '../hooks/usePetsContent';
import { useMessage } from '../context/MessageContext';

const EditPost = ({ imageSrc, text, onClose, dia, id, state, reload, setReload }) => {
    const [legenda, setLegenda] = useState(text)
    const [day, setDay] = useState(dia)
    const { isLoading: loading } = useLoading()
    const { updatePost, deletePost } = usePetsContent()
    const { showMessage } = useMessage()
    const handleSubmit = async () => {
        try {
            await updatePost(id, day, legenda)
            state(false)
            setReload(!reload)
            showMessage("Post atualizado com sucesso", "success", 5000)
        } catch {
            showMessage("Erro ao atualizar o post ", "error", 5000)
        }
    }
    const handleDelete = async () => {
        try {
            await deletePost(id)
            showMessage("Post excluido com sucesso", "warning", 5000)
            state(false)
            setReload(!reload)
           
        } catch (err) {
            showMessage("Erro ao excluir o post", "error", 5000)
        }
    }
    return (
        <div className={styles.modal}>
            {loading && <LoadingScreen />}

            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={onClose}>
                    <IoMdCloseCircleOutline />
                </span>
                <img src={imageSrc} alt="Post Image" className={styles.modalImage} />
                <button onClick={handleDelete} className={styles.deletePost}>Excluir</button>
                <div className={styles.form}>
                    <input type="text" value={legenda} onChange={(e) => setLegenda(e.target.value)} />
                    <input type="date" value={day} onChange={(e) => setDay(e.target.value)} />
                </div>
                <div className={styles.btns}><button onClick={onClose}>Cancelar</button><button onClick={handleSubmit}>Salvar</button></div>
            </div>
        </div>
    );
};

export default EditPost;
