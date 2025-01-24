import React, { useEffect, useState } from 'react';
import styles from './Register.module.css';
import logoImg from '../assets/logo.png';
import logoTxt from '../assets/text-logo.png';
import google from '../assets/google-logo.png';
import facebook from '../assets/face-logo.png';
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { GoLock } from "react-icons/go";
import { LuUnlock } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingScreen from '../components/LoadingScreen';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false); 
    const { register, error: registerError, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            return;
        }
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        setError('');
        await register(email, password, name);
    };

    return (
        <div className={styles.container}>
            {loading && <LoadingScreen />}
            <div className={styles.logo}>
                <img className={styles.logoImg} src={logoImg} alt="logo" />
                <div className={styles.logoText}>
                    <img className={styles.logoTxt} src={logoTxt} alt="logo" />
                    <p>Diário do seu pet</p>
                </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.formContainer}>
                <div className={styles.formInfo}>
                    <span><FaUserCircle /></span>
                    <h1>Cadastrar-se</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.field}>
                        <span><FaRegUser /></span>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label className={styles.field}>
                        <span><IoMailOutline /></span>
                        <input
                            type='email'
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className={styles.field}>
                        <span><LuUnlock /></span>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label className={styles.field}>
                        <span><GoLock /></span>
                        <input
                            type="password"
                            placeholder="Confirme sua senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    {error && <p className={styles.error}>{error}</p>}
                    {(registerError && !error) && <p className={styles.error}>{registerError}</p>}
                    
               
                    <div className={styles.termsContainer}>
                        <input
                            type="checkbox"
                            id="terms"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                        />
                        <label htmlFor="terms">
                            Eu li e concordo com os <Link to="/termos-de-serviço">Termos de Serviço</Link>.
                        </label>
                    </div>

           
                    <button type="submit" disabled={!acceptedTerms}>Cadastrar</button>
                </form>
                <p className={styles.shortTexts}>Ou</p>
                <div className={styles.googleAndFacebook}>
                    <div className={styles.loginGoogle}>
                        <img src={google} alt="google" />
                    </div>
                    <div className={styles.loginFacebook}>
                        <img src={facebook} alt="facebook" />
                    </div>
                </div>
                <p className={styles.shortTexts}>Já possui uma conta?</p>
                <Link to={'/login'}>Acesse aqui</Link>
            </div>
        </div>
    );
}
