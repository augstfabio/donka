import React from 'react'
import styles from './Footer.module.css'
import logoImg from '../assets/logo.png'
import logoTxt from '../assets/text-logo.png'
import { GrLinkTop } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
      const toTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
      }
    return (
        <footer className={styles.footer}>
            <div className={styles.topContainer}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <img className={styles.logoImg} src={logoImg} alt="logo" />
                        <img className={styles.logoTxt} src={logoTxt} alt="donka" />
                    </div>
                    <button onClick={toTop} className={styles.top}>Voltar ao Topo <GrLinkTop /></button>

                </div>
                <div className={styles.container}>
                    <h2>Sobre nós</h2>
                    <ul className={styles.options}>
                        <li><Link to={'https://github.com/augstfabio/'}>Github</Link></li>
                        <li><Link>Sobre nós</Link></li>
                        <li><Link>Contato</Link></li>
                    </ul>
                </div>
                <div className={styles.container}>
                    <h2>Termos</h2>
                    <ul className={styles.options}>
                        <li><Link to={'/termos-de-serviço'}>Termos de uso</Link></li>
                        <li><Link>Politica de privacidade</Link></li>
                    </ul>
                </div>
                <div className={styles.container}>
                    <h2>Acesso rápido</h2>
                    <ul className={styles.options}>
                        <li><Link>Perfil</Link></li>
                        <li><Link>Editar perfil</Link></li>
                        <li><Link>Novo pet</Link></li>
                        <li><Link>Timeline</Link></li>
                        <li><Link>Excluir perfil</Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottomContainer}>
                <div className={styles.icons}>
                    <FaGithub />
                    <FaInstagram />
                </div>
                <p>2024, &copy;DoNKa. Todos os direitos reservados.</p>
                <p>Feito por <a href="https://github.com/augstfabio/">Fabio Augusto</a> e Kami</p>
            </div>
        </footer>
    )
}
