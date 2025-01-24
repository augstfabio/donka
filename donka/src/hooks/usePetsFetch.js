import { useState } from "react";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useLoading } from "../context/LoadingContext";

const usePetsFetch = () => {
    const [error, setError] = useState(null);
    const { isLoading, setIsLoading } = useLoading()
    const fetchAllPets = async () => {
        try {
            setIsLoading(true);
            const q = collection(db, "pets");
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (err) {
            setError(err.message);
            return [];
        } finally {
            setIsLoading(false);
        }
    };


    const fetchPetById = async (petId) => {
        try {
            setIsLoading(true);
            const petDoc = doc(db, "pets", petId);
            const petSnapshot = await getDoc(petDoc);
            if (petSnapshot.exists()) {
                return { id: petSnapshot.id, ...petSnapshot.data() };
            } else {
                throw new Error("Pet não encontrado.");
            }
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPetsByOwnerId = async (ownerId) => {
        try {
            setIsLoading(true);
            const q = query(collection(db, "pets"), where("tutor", "==", ownerId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (err) {
            setError(err.message);
            return [];
        } finally {
            setIsLoading(false);
        }
    };
    const createPet = async (petData) => {
        try {
            setIsLoading(true)
            await addDoc(collection(db, "pets"), petData);
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
            setIsLoading(false)
        } finally {
            setIsLoading(false);
        }
    };
    const updatePet = async (id, updates) => {
            try {
                const docRef = doc(db, 'pets', id)
                await updateDoc(docRef, updates)
            }catch (err){
                console.error('erro ao atualizar pet: '+err)
            }
            
        }
    return { fetchAllPets, fetchPetById, fetchPetsByOwnerId, error, createPet, updatePet };
};

export default usePetsFetch;
