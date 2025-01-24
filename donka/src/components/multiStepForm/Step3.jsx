import React from 'react';
import styles from './Step3.module.css';

export default function Step3({ nextStep, backStep, sexo, setSexo, nascimento, setNascimento, castrado, setCastrado }) {
    return (
        <div className={`${styles.container} ${styles.slideEnter}`}>
            <div className={styles.upp}>
                <h2>Quase lá...</h2>
                <div className={styles.topSide}>
                    <div className={styles.firstInfo}>
                        <div className={styles.sexo}>
                            <span>Sexo</span>
                            <select
                                value={sexo}
                                onChange={(e) => setSexo(e.target.value)}
                            >
                                <option value="" disabled>
                                    Selecione...
                                </option>
                                <option value="Macho">Macho</option>
                                <option value="Fêmea">Fêmea</option>
                            </select>
                        </div>
                        <div className={styles.castrado}>
                            <span>Castrado</span>
                            <select
                                value={castrado}
                                onChange={(e) => setCastrado(e.target.value)}
                            >
                                <option value="" disabled>
                                    Selecione...
                                </option>
                                <option value="Castrado">Sim</option>
                                <option value="Não castrado">Não</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.nascimento}>
                        <span>Nascimento/Adoção</span>
                        <input
                            type="date"
                            value={nascimento}
                            onChange={(e) => setNascimento(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.btn}>
                <button onClick={backStep}>Voltar</button>
                <button onClick={nextStep}>Próximo</button>
            </div>
        </div>
    );
}
