import React, { useState } from "react";
import styles from "./VaccineModal.module.css";
import { useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

import { useLoading } from "../context/LoadingContext";
import usePetsContent from "../hooks/usePetsContent";

const VaccineModal = ({ isOpen, onClose, onSubmit }) => {
    const [vaccineName, setVaccineName] = useState("");
    const [dose, setDose] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("")
    const { id: petId } = useParams()
    const { createVaccine } = usePetsContent()
    const {isLoading: loading} = useLoading()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVaccine({
                vaccineName,
                dose,
                date,
                status,
                petId
            })
            onClose();

        } catch (err) {
            console.error('erro ao criar a vacina' + err)
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            {loading && <LoadingScreen />}
            <div className={styles.modal}>
                <h2>Cadastro de Vacina</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label>Nome da Vacina:</label>
                        <input
                            type="text"
                            value={vaccineName}
                            onChange={(e) => setVaccineName(e.target.value)}
                            required
                            placeholder="Digite o nome da vacina"
                        />
                    </div>

                    <div className={styles.container}>
                        <div className={styles.fieldContainer}>
                            <label>Status:</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Selecione
                                </option>
                                <option value="aplicada">Aplicada</option>
                                <option value="agendada">Agendada</option>

                            </select>
                        </div>
                        <div className={styles.fieldContainer}>
                            <label>Dose:</label>
                            <select
                                value={dose}
                                onChange={(e) => setDose(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Selecione
                                </option>
                                <option value="1ª">1ª Dose</option>
                                <option value="2ª">2ª Dose</option>
                                <option value="3ª">3ª Dose</option>
                                <option value="reforço anual">Reforço Anual</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label>Dia:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.actions}>
                        <button type="submit">Salvar</button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VaccineModal;
