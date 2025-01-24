import React, { useEffect, useState } from "react";
import styles from "./Vaccine.module.css";
import ExpandableCard from "../components/ExpandableCard";

import { useParams } from "react-router-dom";
import VaccineModal from "../components/VaccineModal";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import LoadingScreen from "../components/LoadingScreen";
import { IoReload } from "react-icons/io5";
import { useLoading } from "../context/LoadingContext";
import usePetsFetch from "../hooks/usePetsFetch";

export default function Vaccine() {
    const [vaccines, setVaccines] = useState([]);
    const [isCreateVaccineModalOpen, setIsVaccineModalOpen] = useState(false);
    const [pet, setPet] = useState([])
    const [filter, setFilter] = useState('aplicada');
    
    const {fetchPetById} = usePetsFetch()
    const {isLoading: loading, setIsLoading} = useLoading()
    const [reload, setReload] = useState(false)
     const { id } = useParams();
    const handleOnClose = () => {
        setIsVaccineModalOpen(false)
    }
    useEffect(() => {
        const fetchVaccines = async () => {
            setIsLoading(true)
            try {
                const fetchPet = await fetchPetById(id);
                setPet(fetchPet)
                const petsQuery = query(
                    collection(db, "PetsVaccines"),
                    where("petId", "==", id),
                    where("status", "==", filter)
                );
                const querySnapshot = await getDocs(petsQuery);
                const vaccinesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setVaccines(vaccinesData);
                setIsLoading(false)
            } catch (error) {
                console.error("Erro ao buscar vacinas:", error);


            }
        };
        fetchVaccines();
    }, [filter, reload]);

    if (!pet || loading) {
        return <div style={{ height: '100vh' }}><LoadingScreen /></div>;
    }

    return (
        <div className={styles.container}>
            <VaccineModal
                isOpen={isCreateVaccineModalOpen}
                onClose={handleOnClose}

            />
            <h1>Histórico de vacinas</h1>
            <div className={styles.topContainer}>
                {pet.foto && <img src={pet.foto} alt="perfil do pet" />}
                <div className={styles.profileInput}>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className={styles.select}
                    >
                        <option value="" disabled>
                            Selecione...
                        </option>
                        <option value="aplicada">Aplicadas</option>
                        <option value="agendada">Futuras</option>
                    </select>
                   
                </div>

            </div>
            <span className={styles.reloadBtn}><IoReload onClick={()=>setReload(!reload)}  />  <button onClick={() => setIsVaccineModalOpen(true)} className={styles.createVaccine}>Nova vacina</button></span>
            {vaccines.length === 0 && (
                <div className={styles.semVacinas}>
                    <p>Sem vacinas registradas</p>
                </div>
            )}
            <div className={styles.vaccines}>
               
                {
                    vaccines &&
                    vaccines.map((vaccine) => (
                        <ExpandableCard
                            key={vaccine.id}
                            title={vaccine.vaccineName}
                            date={vaccine.date}
                            doses={vaccine.dose}
                            status={vaccine.status}
                        />
                    ))}

            </div>
        </div>
    );
}
