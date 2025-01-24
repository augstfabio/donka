import React, { useEffect, useState } from 'react'
import styles from './MultiStepForm.module.css'
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';
import usePetsFetch from '../../hooks/usePetsFetch';
import { useLoading } from '../../context/LoadingContext';
import useImage from '../../hooks/useImage';
import { useMessage } from '../../context/MessageContext';


export default function MultiStepForm() {
    const { isLoading: loading } = useLoading()
    const { createPet } = usePetsFetch()
    const { user } = useAuth()
    const [currentStep, setCurrentStep] = useState(1);
    const [especie, setEspecie] = useState('')
    const [nome, setNome] = useState('')
    const [raca, setRaca] = useState('')
    const [sexo, setSexo] = useState('');
    const [nascimento, setNascimento] = useState('')
    const [castrado, setCastrado] = useState('')
    const [foto, setFoto] = useState(null)
    const {getImageUrl} = useImage()
    const {showMessage} = useMessage()
    const navigate = useNavigate()
    const handleNextStep = () => {
        setCurrentStep((prev) => prev + 1)
    }

    const handleBackStep = () => {
        setCurrentStep((prev) => prev - 1)
    }

    const handleSubmit = async () => {
        if (!foto) {
            try {
                await createPet({
                    castrado,
                    nome,
                    especie,
                    raca,
                    sexo,
                    nascimento,
                    foto: 'https://i.ibb.co/zGj5H48/image.png',
                    tutor: user.uid,
                });
                navigate('/');
                showMessage("Perfil do pet criado", "success", 5000)
            } catch {
                showMessage("Erro ao criar o pet", "error", 5000)
            }

        } else {
            try {

                const imageUrl = await getImageUrl(foto);

                await createPet({
                    castrado,
                    nome,
                    especie,
                    raca,
                    sexo,
                    nascimento,
                    foto: imageUrl,
                    tutor: user.uid,
                });
                navigate('/');
                showMessage("Perfil do pet criado", "success", 5000)
            } catch {
                showMessage("Erro ao criar o pet", "error", 5000)
            }
        };
    }


    return (
        <div className={styles.form}>
            {loading && <LoadingScreen />}
            <div className={styles.formContainer}>
                <h1>Novo amigo</h1>
                <div className={styles.stepsProgress}>
                    <div onClick={() => setCurrentStep(1)} className={`${styles.steps} ${currentStep === 1 ? styles.active : ''}`}><span>1</span></div>
                    <div onClick={() => nome && setCurrentStep(2)} className={`${styles.steps} ${currentStep === 2 ? styles.active : ''}`}><span>2</span></div>
                    <div onClick={() => nome && setCurrentStep(3)} className={`${styles.steps} ${currentStep === 3 ? styles.active : ''}`}><span>3</span></div>
                    <div onClick={() => nome && setCurrentStep(4)} className={`${styles.steps} ${currentStep === 4 ? styles.active : ''}`}><span>4</span></div>
                </div>
                {currentStep === 1 && <Step1 nextStep={handleNextStep} nome={nome} setNome={setNome} />}
                {currentStep === 2 && <Step2 nextStep={handleNextStep} backStep={handleBackStep} especie={especie} setEspecie={setEspecie} raca={raca} setRaca={setRaca} nome={nome} />}
                {currentStep === 3 && <Step3 nextStep={handleNextStep} backStep={handleBackStep} sexo={sexo} setSexo={setSexo} nascimento={nascimento} setNascimento={setNascimento} castrado={castrado} setCastrado={setCastrado} />}
                {currentStep === 4 && <Step4 backStep={handleBackStep} nome={nome} setImagem={setFoto} imagem={foto} handleSubmit={handleSubmit} />}
            </div>
            <div className={styles.line}></div>
        </div>
    )
}
