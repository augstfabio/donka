import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import { Link, useParams } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { TbVaccine } from "react-icons/tb";
import { RiMedicineBottleLine } from "react-icons/ri";
import { MdOutlineDynamicFeed } from "react-icons/md";
import { LuDog } from "react-icons/lu";
import { GiScalpel } from "react-icons/gi";
import { TbStethoscope } from "react-icons/tb";
import { GiMicroscope } from "react-icons/gi";
import gsap from 'gsap';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { id } = useParams();

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {

        gsap.fromTo(
            '.menuItem',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
    }, []);

    return (
        <div className={`${styles.sidebarContainer} ${isExpanded ? styles.expanded : ''}`}>
            <div className={styles.sidebar}>
                <button onClick={toggleSidebar} className={styles.toggleButton}>
                    <RxHamburgerMenu />
                </button>
                <ul className={styles.menu}>
                    <li>
                        <Link to={`pet/${id}/perfil-do-pet`} className={`${styles.menuItem} menuItem`}>
                            <MdOutlineDynamicFeed />
                            {isExpanded && <span>Linha do tempo</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to={`pet/${id}/vacinas`} className={`${styles.menuItem} menuItem`}>
                            <TbVaccine />
                            {isExpanded && <span>Vacinas</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to={`/pet/${id}/consultas/nova-consulta`} className={`${styles.menuItem} menuItem`}>
                            <TbStethoscope />
                            {isExpanded && <span>Consultas</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/subscriptions" className={`${styles.menuItem} menuItem`}>
                            <GiMicroscope />
                            {isExpanded && <span>Exames</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/library" className={`${styles.menuItem} menuItem`}>
                            <RiMedicineBottleLine />
                            {isExpanded && <span>Medicamentos</span>}
                        </Link>
                    </li>

                    <li>
                        <Link to={`/pet/${id}/training`} className={`${styles.menuItem} menuItem`}>
                            <LuDog />
                            {isExpanded && <span>Treinamento</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to={`${id}/training`} className={`${styles.menuItem} menuItem`}>
                            <GiScalpel />
                            {isExpanded && <span>Necropsia</span>}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
