    import React, { useEffect, useState } from 'react';
    import styles from './Step1.module.css';

    export default function Step1({ nextStep, nome, setNome }) {
        const [allowNext, setAllowNext] = useState(false)
        useEffect(() => {
            if (nome.length > 0) {
                setAllowNext(true); 
            } else {
                setAllowNext(false);  
            }
        }, [nome, allowNext]);  

        return (
            <div className={`${styles.container} ${styles.slideEnter}`}>
                <div>
                    <h2>Vamos começar com o nome</h2>
                    <input 
                        className={styles.name}
                        type="text"
                        placeholder="Nome do pet"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                
                <button disabled={!allowNext} className={styles.nextBtn} onClick={nextStep}>
                    Próximo
                </button>
            </div>
        );
    }
