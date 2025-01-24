import React, { useEffect, useState } from "react";
import styles from "./EditPetProfile.module.css";
import { MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import usePetsFetch from "../hooks/usePetsFetch";
import useImage from "../hooks/useImage";
import { useLoading } from "../context/LoadingContext";
import LoadingScreen from "../components/LoadingScreen";
import { useMessage } from "../context/MessageContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function EditPetProfile() {
    const {isLoading} = useLoading()
    const [pet, setPet] = useState([])
    const { id } = useParams()
    const { fetchPetById, updatePet } = usePetsFetch()
    const {showMessage} = useMessage()
    const { getImageUrl } = useImage()
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [sex, setSex] = useState("");
    const [castrated, setCastrated] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [species, setSpecies] = useState("");
    const [perfil, setPerfil] = useState(null)
    const [profileUrl, setProfileUrl] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchPet = async () => {
            try {
                const fetchMyPet = await fetchPetById(id);
                if (fetchMyPet) {
                    setPet(fetchMyPet);
                    setName(fetchMyPet.nome);
                    setBreed(fetchMyPet.raca);
                    setSex(fetchMyPet.sexo);
                    setCastrated(fetchMyPet.castrado);
                    setBirthDate(fetchMyPet.nascimento);
                    setSpecies(fetchMyPet.especie);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchPet();

    }, [id]);
    const handleSave = async () => {
        try {
            let imageUrl = profileUrl;
            if (perfil) {
                imageUrl = await getImageUrl(perfil);
            }
            await updatePet(id, {
                nome: name,
                raca: breed,
                sexo: sex,
                castrado: castrated,
                nascimento: birthDate,
                especie: species,
                foto: imageUrl || pet.foto,
            });
            navigate(`/pet/${id}/perfil-do-pet`)
            showMessage("Perfil atualizado com sucesso", "success", 5000)
        } catch (error) {
            console.error(error);
            showMessage("Perfil atualizado com sucesso", "error", 5000)
        }
    };
    const handleDelete = async () => {
        try {
            const petRef = doc(db, 'pets', id);
            await deleteDoc(petRef);
            showMessage("Perfil do pet excluído", "warning", 5000);
            navigate('/');
        } catch (err) {
            showMessage("Erro ao excluir o perfil", "error", 5000);
        }
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPerfil(file);
        }
    };
    return (
        <div className={styles.container}>
            {isLoading && <LoadingScreen/>}
            <h1>Editar perfil do pet</h1>
            <div className={styles.title}>
                <div className={styles.profileImage}>
                    {perfil ? (<img src={URL.createObjectURL(perfil)} alt="Foto de perfil" />) : ((pet && !perfil) && <img src={pet.foto} alt="Foto de perfil" />)}
                    <label htmlFor="fileInput" className={styles.editIcon}>
                        <MdEdit />
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className={styles.hiddenInput}
                        onChange={handleFileChange}

                    />
                </div>

                <button onClick={handleDelete} className={styles.buttonRed}>Excluir perfil</button>
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Nome</label>
                <input
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Raça</label>
                <input
                    className={styles.input}
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />
            </div>

            <div className={styles.row}>
                <div className={styles.column}>
                    <label className={styles.label}>Sexo</label>
                    <select
                        className={styles.input}
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                    >
                        <option value="fêmea">Fêmea</option>
                        <option value="macho">Macho</option>
                    </select>
                </div>
                <div className={styles.column}>
                    <label className={styles.label}>Castrado</label>
                    <select
                        className={styles.input}
                        value={castrated}
                        onChange={(e) => setCastrated(e.target.value)}
                    >
                        <option value="" disabled>
                            Selecione...
                        </option>
                        <option>Castrado</option>
                        <option>Não Castrado</option>
                    </select>
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.column}>
                    <label className={styles.label}>Nascimento</label>
                    <input
                        type="date"
                        className={styles.date}
                        defaultValue={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>
                <div className={styles.column}>
                    <label className={styles.label}>Espécie</label>
                    <select
                        className={styles.input}
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                    >
                        <option value="" disabled>
                            Selecione...
                        </option>
                        <option value="Canino">Canino</option>
                        <option value="Felino">Felino</option>
                        <option value="Equino">Equino</option>
                        <option value="Asinino">Asinino</option>
                        <option value="Muar">Muar</option>
                        <option value="Lagomorfo">Lagomorfo</option>
                        <option value="Hamster">Hamster</option>
                        <option value="Porquinho da Índia">Porquinho da Índia</option>
                    </select>
                </div>
            </div>
            <div className={styles.btns}>
                <button className={styles.cancel}>
                    Cancelar
                </button>
                <button className={styles.button} onClick={handleSave}>
                    Salvar
                </button>
            </div>

        </div>
    );
}

export default EditPetProfile;
