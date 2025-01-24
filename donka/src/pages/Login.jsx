import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import logoImg from '../assets/logo.png'
import logoTxt from '../assets/text-logo.png'
import google from '../assets/google-logo.png'
import facebook from '../assets/face-logo.png'
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import { RiLockUnlockLine } from "react-icons/ri";
import { PiLockSimpleBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingScreen from '../components/LoadingScreen'
import { useMessage } from '../context/MessageContext'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, user, loading, error } = useAuth();
    const [err, setErr] = ('')
    const {showMessage} = useMessage()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Há campos não preenchidos');
            return;
        } else {
            try {
                await login(email, password);
            } catch (erro) {
                setErr('Credenciais incorretas')
            }
        }
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
                    <h1>Login</h1>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.field}>
                        <span><FaRegUser /></span>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Digite seu email' required />
                    </label>
                    <label className={styles.field}>
                        <span><RiLockUnlockLine /></span>

                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Digite sua senha' required />
                    </label>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    {loading ? (<button disabled type='submit'>Entrando...</button>) : (<button type='submit'>Login</button>)}
                </form>
                <Link to={'/restaurar-senha'} >esqueci a senha</Link>
                <p className={styles.shortTexts}>Ou</p>
                <div className={styles.googleAndFacebook}>
                    <div className={styles.loginGoogle}>
                        <img src={google} alt="google" />
                    </div>
                    <div className={styles.loginFacebook}>
                        <img src={facebook} alt="facebook" />
                    </div>
                </div>
                 
                <p className={styles.shortTexts}>Ainda nao tem uma conta?</p>
                <Link to={'/register'} >Cadastre-se aqui</Link>
            </div>
        </div>
    )
}
