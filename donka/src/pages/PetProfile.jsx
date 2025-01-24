import React, { useEffect, useState } from 'react';
import styles from './Petprofile.module.css';
import { PiIdentificationCard } from "react-icons/pi";
import { MdOutlinePets } from "react-icons/md";
import { LiaAwardSolid } from "react-icons/lia";
import { PiGenderIntersexBold } from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { RiScissorsLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import PetsNewPost from '../components/PetsNewPost';
import EditPost from '../components/EditPost';
import { useLoading } from '../context/LoadingContext';
import usePetsContent from '../hooks/usePetsContent';
import PetsPosts from '../components/PetsPosts';
import usePetsFetch from '../hooks/usePetsFetch';

export default function PetProfile() {
    const [posts, setPosts] = useState([])
    const [pet, setPet] = useState([])
    const [newPost, setNewPost] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null);
    const [reload, setReload] = useState(false)
    const { isLoading } = useLoading()

    const { fetchPostsByPetId } = usePetsContent()
    const { fetchPetById } = usePetsFetch()
    const { id } = useParams();
    const navigate = useNavigate()

    const openModal = (post) => {
        setIsEditModalOpen(false)
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const openEditModal = (post) => {
        setIsModalOpen(false);
        setIsEditModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    useEffect(() => {
        if (id) {
            const getPet = async () => {
                const fetchPet = await fetchPetById(id);
                const fetchPosts = await fetchPostsByPetId(id)
                setPet(fetchPet)
                setPosts(fetchPosts)
            };
            getPet();
        }

    }, [id, reload]);

    if (!pet || isLoading) {
        return <div style={{ height: '50vh' }}><LoadingScreen /></div>;
    }

    return (
        <div className={styles.container}>

            {!isLoading && <>
                <div className={styles.petProfile}>
                    <div className={styles.topContainer}>
                        <img
                            src={pet.foto}
                            alt="Foto do animal"
                        />
                        <div className={styles.sideInfo}>
                            <div className={styles.info}>
                                <h1>{pet.nome}</h1>
                            </div>
                            <button onClick={() => navigate(`/pet/${id}/editar-perfil`)}>Editar perfil</button>
                        </div>
                    </div>
                    <div className={styles.bottomContainer}>
                        {pet.nome && (
                            <div className={styles.info}>
                                <span><PiIdentificationCard /></span>
                                <p>{pet.nome}</p>
                            </div>
                        )}
                        {pet.especie && (
                            <div className={styles.info}>
                                <span><MdOutlinePets /></span>
                                <p>{pet.especie}</p>
                            </div>
                        )}
                        {pet.raca && (
                            <div className={styles.info}>
                                <span><LiaAwardSolid /></span>
                                <p>{pet.raca}</p>
                            </div>
                        )}
                        {pet.sexo && (
                            <div className={styles.info}>
                                <span><PiGenderIntersexBold /></span>
                                <p>{pet.sexo}</p>
                            </div>
                        )}
                        {pet.nascimento && (
                            <div className={styles.info}>
                                <span><CiCalendarDate /></span>
                                <p>{pet.nascimento}</p>
                            </div>
                        )}
                        {pet.castrado && (
                            <div className={styles.info}>
                                <span><RiScissorsLine /></span>
                                <p>{pet.castrado}</p>
                            </div>
                        )}

                    </div>

                </div>

                <div className={styles.timeline}>
                    <h2> <MdOutlinePets /> Linha do tempo</h2>
                    <div className={styles.timelineContainer}>
                        {!newPost && <button onClick={() => setNewPost(true)}>Nova memoria</button>}
                        {newPost && <div className={styles.petsNewPost}><PetsNewPost close={setNewPost} reload={reload} setReload={setReload} /></div>}

                        {posts.length > 0 ? <div className={styles.content}>
                            {posts.map((post) => (
                                <div className={styles.postContainer} key={post.id}>
                                    <div className={styles.topSideContent}>
                                        <span>{post.dia}</span>
                                    </div>
                                    <img onClick={() => openModal(post)} src={post.imageUrl} alt={post.data} />
                                    <p>{post.legenda}</p>
                                </div>
                            ))}
                        </div> : <h3>Nenhum post</h3>}
                    </div>
                </div>
                {isEditModalOpen && selectedPost && (
                    <EditPost
                        id={selectedPost.id}
                        dia={selectedPost.dia}
                        imageSrc={selectedPost.imageUrl}
                        text={selectedPost.legenda}
                        onClose={closeModal}
                        state={setIsEditModalOpen}
                        reload={reload}
                        setReload={setReload}
                    />

                )}
                {isModalOpen && selectedPost && (
                    <PetsPosts
                        id={selectedPost.id}
                        dia={selectedPost.dia}
                        imageSrc={selectedPost.imageUrl}
                        text={selectedPost.legenda}
                        onClose={closeModal}
                        edit={openEditModal}
                        reload={reload}
                        setReload={setReload}
                    />

                )}


            </>}



        </div>
    );
}
