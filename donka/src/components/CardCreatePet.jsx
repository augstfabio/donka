import React from 'react'
import styles from './CardCreatePet.module.css'
import { useNavigate } from 'react-router-dom'
import { TbPaw } from "react-icons/tb";
import Icon from '../assets/createPet.png'
export default function CardCreatePet() {
 
    const navigate = useNavigate()
    const handleNavigate = ()=>{
        navigate(`/pet/novo-pet`)
    }
    return (
        <div onClick={handleNavigate} className={styles.card} >
            <img src={Icon} alt="new pet" />
        </div>
    )
}
