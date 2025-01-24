import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';

import CardPet from '../components/CardPet';
import CardCreatePet from '../components/CardCreatePet';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import gato from '../assets/gato.png'
import cachorro from '../assets/cachorro.png'
import usePetsFetch from '../hooks/usePetsFetch';


export default function HomePage() {
  const { user } = useAuth();
  const [pets, setPet] = useState([])

  const { fetchPetsByOwnerId } = usePetsFetch()
  // teste
  const data = [
    { id: 1, petName: 'Animal', foto: 'https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2015/06/30/cachorromaconha.jpg' },
    { id: 2, petName: 'animal', foto: 'https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2015/06/30/cachorromaconha.jpg' },
    { id: 3, petName: 'Animal', foto: 'https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2015/06/30/cachorromaconha.jpg' },


  ];
  const navigate = useNavigate();
  const handleOnClick = (idPet) => {
    navigate(`/pet/${idPet}/perfil-do-pet`);
  };

  useEffect(() => {
    const getPets = async () => {
      const userPets = await fetchPetsByOwnerId(user.uid);
      setPet(userPets)
    };
    getPets();
  }, []);



  return (
    <div className={styles.home}>

      <section className={styles.texts}>
        <div className={styles.text}>
          <h1>Seu <span className={styles.blue}>pet</span>. <br /> Seu <span className={styles.pink}>mundo</span>. <br /> Tudo organizado.</h1>
        </div>
        <div className={styles.banner}>
          <img src={gato} alt="gato" />
          <img src={cachorro} alt="cachorro " />
        </div>

      </section>
      <section className={styles.cardsSection}>
        <h2>Meus pets</h2>
        {pets &&
          <div className={styles.petsContainer}>
            {pets.map((pet) => (
              <div key={pet.id} onClick={() => handleOnClick(pet.id)} className="card">
                <CardPet  {...(pet.foto && { imgUrl: pet.foto })} name={pet.nome} id={pet.id} />
              </div>
            ))}
            <div className={styles.cardCreatePet}>
              <CardCreatePet />
            </div>
          </div>}

      </section>
      <section className={styles.cardsSection}>
        <h2>Casos para estudos</h2>

        {pets && <div className={styles.petsContainer}>
          {data.map((pet) => (
            <div key={pet.id} className="card">
              <CardPet imgUrl={pet.foto} name={pet.petName} id={pet.id} />
            </div>
          ))}
          <div className={styles.cardCreatePet}>
            <CardCreatePet />
          </div>
        </div>}

      </section>
    </div>
  );
}
