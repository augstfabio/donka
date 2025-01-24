import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import styles from './ForgotPassword.module.css'
import { Link, useNavigate } from "react-router-dom";
const ForgotPassword = () => {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await resetPassword(email);
            navigate('/login')
            
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Esqueci minha senha</h2>
               
                <label className={styles.label}>
                    <span>Email:</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Redefinir Senha</button>
                <p>Um link de recuperação será encaminhado para seu email</p>
                <Link to={'/login'}>Ou faça login</Link>
            </form>
        </div>

    );
};

export default ForgotPassword;