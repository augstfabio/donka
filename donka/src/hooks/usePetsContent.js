import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, deleteDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useLoading } from '../context/LoadingContext';

export default function usePetsContent() {
    const [error, setError] = useState(null);
    const { setIsLoading, isLoading } = useLoading()

    const fetchPostsByPetId = async (petId) => {
        setIsLoading(true);
        setError(null);
        try {
            const q = query(collection(db, 'PetPosts'), where('pet', '==', petId));
            const querySnapshot = await getDocs(q);
            const fetchedPosts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return fetchedPosts

        } catch (err) {
            console.error('Erro ao buscar posts:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    const createVaccine = async (data) => {
        setIsLoading(true)
        try {
            await addDoc(collection(db, "PetsVaccines"), data);
        } catch (err) {
            console.error('erro ao cadastrar vacina: ', err)
        } finally {
            setIsLoading(false)
        }
    }
    const updatePost = async (id, dia, legenda) => {
        setIsLoading(true)
        try {
            const docRef = doc(db, "PetPosts", id);
            await updateDoc(docRef, {
                dia,
                legenda
            })
        } catch (err) {
            console.error('Erro ao atualizar o post' + err)
        } finally {
            setIsLoading(false)
        }
    }
    const deletePost = async (id) => {
        setIsLoading(true)
        try {
            const docRef = doc(db, "PetPosts", id);
            await deleteDoc(docRef);

        } catch (error) {
            console.error("Erro ao deletar o post:", error);
        } finally {
            setIsLoading(false)
        }

    }
    const createPost = async (data) => {
        try {
            const docRef = await addDoc(collection(db, "PetPosts"), data);
            const generatedId = docRef.id;
            await setDoc(docRef, { id: generatedId }, { merge: true });
        } catch (err) {
            setError(err.message || "Falha ao criar o post.");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };
    return {
        error,
        fetchPostsByPetId,
        createVaccine,
        updatePost,
        deletePost,
        createPost
    };
}
