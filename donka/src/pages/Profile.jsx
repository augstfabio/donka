import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { MdModeEditOutline, MdOutlineEmail, MdPets } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ImagePreview from '../components/ImagePreview';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import ContainerLoading from '../components/ContainerLoading';

export default function Profile() {
    const { user } = useAuth();
    const [viewImage, setViewImage] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleViewImage = () => {
        setViewImage(!viewImage)
    }
    const [petCount, setPetCount] = useState(0);

    useEffect(() => {
        const fetchPetCount = async () => {
            try {
                setLoading(true)
                const petsQuery = query(
                    collection(db, "pets"),
                    where("tutor", "==", user.uid)
                );
                const querySnapshot = await getDocs(petsQuery);
                setPetCount(querySnapshot.size);
                setLoading(false)
            } catch (error) {
                console.error("Erro ao buscar quantidade de pets:", error);
            }
        };
        fetchPetCount();
    }, [user]);


    return (
        <div className={styles.profile}>
            {viewImage && <ImagePreview imageURL={user.photoURL} close={handleViewImage} />}
            <div className={styles.profileCard}>
                <div className={styles.topContainer}>
                    <div className={styles.profilePic}>
                        <img onClick={handleViewImage} src={user.photoURL} alt="Foto de perfil" />
                    </div>
                    <div className={styles.profileInfo}>
                        <h2>{user.displayName || "Usuário"}</h2>
                        <Link to="/perfil/editar-perfil" className={styles.editProfile}>Editar perfil</Link>
                    </div>
                </div>
                {
                    loading ? (
                        <div className={styles.loadingContainer}><ContainerLoading /></div>
                    ) : (
                        <div className={styles.bottomContainer}>
                            <div className={styles.infoText}>
                                <MdOutlineEmail />
                                <p>{user.email}</p>
                            </div>
                            <div className={styles.infoText}>
                                <MdPets />
                                <p>Meus pets: {petCount}</p>
                            </div>
                            <div className={styles.infoText}>
                                <MdPets />
                                <p>Casos para estudo: 3</p>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
}
