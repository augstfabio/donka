import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import styles from "./ConsultaForm.module.css";
import { db } from "../firebase/firebaseConfig";
import useImage from "../hooks/useImage";
import { useParams } from 'react-router-dom'
import { MdAddPhotoAlternate } from "react-icons/md";
const ConsultaForm = () => {
    const [data, setData] = useState("");
    const [causa, setCausa] = useState("");
    const [doutor, setDoutor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [images, setImages] = useState([]);
    const [legendas, setLegendas] = useState([]);
    const [nome, setNome] = useState("")
    const [status, setStatus] = useState('')
    const [imageUrls, setImageUrls] = useState([]);
    const { id } = useParams()
    const { getImageUrl } = useImage();

    const handleImageChange = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files);
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleLegendaChange = (index, e) => {
        const newLegendas = [...legendas];
        newLegendas[index] = e.target.value;
        setLegendas(newLegendas);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        const updatedLegendas = legendas.filter((_, i) => i !== index);
        setImages(updatedImages);
        setLegendas(updatedLegendas);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const urls = await Promise.all(
            images.map(async (image) => {
                const url = await getImageUrl(image);
                return url;
            })
        );

        setImageUrls(urls);

        const imagensComLegendas = urls.map((url, index) => ({
            url,
            legenda: legendas[index] || "",
        }));

        try {
            await addDoc(collection(db, "consultas"), {
                data,
                causa,
                doutor,
                descricao,
                imagens: imagensComLegendas,
                pet: id
            });

            alert("Consulta registrada com sucesso!");
            setData("");
            setCausa("");
            setDoutor("");
            setDescricao("");
            setImages([]);
            setLegendas([]);
            setImageUrls([]);
        } catch (e) {
            console.error("Erro ao registrar consulta: ", e);
            alert("Erro ao registrar consulta.");
        }
    };

    return (
        <div className={styles.consultaForm}>
            <h2>Nova Consulta</h2>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <label className={styles.label}>
                        <span>Nome</span>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome da consulta"
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        <span>Data da consulta</span>
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        <span>Status</span>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="" disabled>
                                Selecione...
                            </option>
                            <option>Realizada</option>
                            <option>Agendada</option>
                        </select>
                    </label>

                    <label className={styles.label}>
                        <span>Queixa</span>
                        <input
                            type="text"
                            value={causa}
                            onChange={(e) => setCausa(e.target.value)}
                            placeholder="Queixa"
                            required
                        />
                    </label>


                    <label className={styles.label}>
                        <span>Doutor</span>
                        <input
                            type="text"
                            value={doutor}
                            onChange={(e) => setDoutor(e.target.value)}
                            placeholder="Veterinário"
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        <span>Descrição</span>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descrição"
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        <span>Imagens do exame</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        <div className={styles.imageInput}>
                            <MdAddPhotoAlternate />
                        </div>
                    </label>



                    <button type="submit">Salvar Consulta</button>
                </form>
                <div className={styles.previewContainer}>
                    {images.length > 0 &&
                        images.map((image, index) => {
                            const imageUrl = URL.createObjectURL(image);
                            return (
                                <div key={index} className={styles.imagePreview}>
                                    <img src={imageUrl} alt={`preview-${index}`} className={styles.previewImage} />
                                    <input
                                        type="text"
                                        placeholder="Nome do Exame"
                                        value={legendas[index] || ""}
                                        onChange={(e) => handleLegendaChange(index, e)}
                                        className={styles.legendInput}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className={styles.removeButton}
                                    >
                                        Remover
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>



        </div>
    );
};

export default ConsultaForm;
