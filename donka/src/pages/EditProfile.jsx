import React, { useState } from "react";
import styles from "./EditProfile.module.css";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../context/MessageContext";

export default function EditProfile() {
    const { user, updateUser, updateUserPassword, logout, updateUserPhoto } = useAuth();
    const { showMessage } = useMessage()
    const [name, setName] = useState(user.displayName || "");
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
    const handleReload = () => {
        window.location.reload();
    };

    const handleNameChange = async () => {
        setLoading(true);
        setError("");
        try {
            await updateUser({ displayName: name }).finally(navigate('/perfil'));

        } catch {
            setError("Erro ao atualizar o nome. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = () => {
        setIsModalOpen(false)
        if (newPassword.length < 6) {
            setError("A nova senha deve conter no mínimo 6 caracteres.");
            return false;
        }
        if (oldPassword === newPassword) {
            setError("A nova senha não pode ser igual à senha atual.");
            return false;
        }
        return true;
    };

    const handlePasswordChange = async () => {
        if (!validatePassword()) return;

        setLoading(true);
        setError("");
        try {
            await updateUserPassword(oldPassword, newPassword);
            setOldPassword("");
            setNewPassword("");
            await logout()

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    const handleUpdatePhoto = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Por favor, selecione um arquivo antes de enviar.");
            return;
        }

        setUploading(true);


        try {
            await updateUserPhoto(file);
            setFile(null);
        } catch (err) {
            setError("Erro ao atualizar a foto.");
        } finally {
            setUploading(false);
        }
        handleReload()
    };
    return (
        <div className={styles.editProfilePage}>
            {loading && <LoadingScreen />}
            <div className={styles.profileContainer}>
                <div className={styles.profileInfo}>
                    <img src={user.photoURL} alt="perfil" />
                    <h2>{user.email}</h2>
                </div>

                <div className={styles.editSections}>

                    <section className={styles.editSection}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleNameChange();
                            }}
                        >
                            <label className={styles.field}>
                                <span>Nome</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Digite seu novo nome"
                                    required
                                />
                            </label>
                            <p className={styles.aviso}>O nome só pode ser alterado uma vez por seção</p>
                            <button type="submit" className={styles.btn}>
                                Atualizar Nome
                            </button>
                        </form>
                    </section>


                    <section className={styles.editSection}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setIsModalOpen(true);
                            }}
                        >
                            <label className={styles.field}>
                                <span>Senha Atual</span>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Digite sua senha atual"
                                    autoComplete="password"
                                    required
                                />
                            </label>
                            <label className={styles.field}>
                                <span>Nova Senha</span>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Digite sua nova senha"
                                    required
                                    autoComplete="new-passsword"
                                />
                            </label>
                            <button type="submit" className={styles.btn}>
                                Atualizar Senha
                            </button>
                        </form>
                    </section>
                    <section className={styles.editSection}>
                        <form onSubmit={handleUpdatePhoto}>
                            <label className={styles.field} >
                                <span>Foto de perfil</span>
                                <input accept="image/*" onChange={handleFileChange} type="file" disabled={loading} />
                            </label>
                            <button type="submit" className={styles.btn}>
                                Atualizar foto
                            </button>
                        </form>
                    </section>
                </div>


                {error && <div className={styles.error}>{error}</div>}
            </div>


            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handlePasswordChange}
            />
        </div>
    );
}
