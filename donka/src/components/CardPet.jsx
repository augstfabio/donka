import React from 'react'
import styles from './CardPet.module.css'
import { useNavigate, useParams } from 'react-router-dom'
export default function CardPet({ imgUrl, name }) {
 
    return (
        <div  className={styles.card} >
            <img className={styles.img} src={imgUrl} alt={name} />
            <p className={styles.name}>{name}</p>
        </div>
    )
}
