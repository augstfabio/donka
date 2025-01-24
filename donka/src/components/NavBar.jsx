import React from 'react'
import styles from './NavBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import Modal from './Modal'
import textLogo from '../assets/text-logo.png'
import logoImg from '../assets/logo.png'
import { useAuth } from '../context/AuthContext'
import LoadingScreen from './LoadingScreen'

export default function NavBar() {
    const [showMenu, setShowMenu] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const menuRef = useRef(null);
    const {logout, user, loading} = useAuth()
    const navigate = useNavigate()
    const handleShowMenu = () => {
        setShowMenu(!showMenu)

    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);
    const handleModalOpen = ()=>{
        setModalOpen(true)
    }
    const handleModalClosed = ()=>{
        setModalOpen(false)
    }
    const handleEndSection = async ()=>{
        await logout();
        handleModalClosed(true)
    }
    const handleNavigateHome = ()=>{
        navigate('/')
    }
    return (
        <div className={styles.navbarContainer}>
            {loading && <LoadingScreen/>}
            <div onClick={handleNavigateHome} className={styles.logo}>
                <img className={styles.logoImg} src={logoImg} alt="logo" />
                <img className={styles.logoText} src={textLogo} alt="Donka" />
            </div>
            {user ? (
                <div className={styles.options}>
                <div className={styles.profileOptions}>
                <img onClick={handleShowMenu} className={styles.imgProfile} src={user.photoURL } alt="perfil" />
                
                    {
                        showMenu && (
                            <div  ref={menuRef} className={styles.dropDown}>
                                <div className={styles.profileInfo}>
                                    <img src={user.photoURL} alt="perfil" />
                                    <div className={styles.Texts}>
                                        <p>{user.displayName}</p>
                                        <p><span>{user.email}</span></p>
                                    </div>
                                </div>
                                <ul>
                                    <Link onClick={handleShowMenu} to={'/perfil'}><li>Perfil</li></Link>
                                    <Link onClick={handleShowMenu} to={'/perfil/editar-perfil'}><li>Editar perfil</li></Link>
                                    <Link onClick={handleShowMenu} to={'/pet/novo-pet'}><li>Novo pet</li></Link>
                                    <Link><li onClick={setModalOpen}><span>Encerrar seção</span></li></Link>
                                </ul>
                            </div>
                        )
                    }


                </div>
            </div>
            ):(<div></div>)}
            
            
            {modalOpen && (
                <Modal cancelBtn={handleModalClosed} okBtn={handleEndSection} strongTitle={'Encerrar seção'} text={'Deseja sair? Seus pets ainda ficarão aqui quando voltar.'}/>
            )}
        </div>
    )
}
