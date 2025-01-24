import React from 'react';
import styles from './Step2.module.css';

export default function Step2({ nextStep, especie, setEspecie, raca, setRaca, backStep, nome }) {
    return (
        <div className={`${styles.container} ${styles.slideEnter}`}>
            <div className={styles.topSide}>
                <h2>Vamos conhecer melhor o(a) {nome}!</h2>
                <div className={styles.inputs}>
                    <div className={styles.especie}>
                        <span>Espécie</span>
                        <select
                            value={especie}
                            onChange={(e) => setEspecie(e.target.value)}
                            required
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
                    <div className={styles.raca}>
                        <span>Raça</span>
                        <input type="text" value={raca} onChange={(e) => setRaca(e.target.value)} />
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
