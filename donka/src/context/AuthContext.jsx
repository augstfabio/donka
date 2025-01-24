import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";


const AuthContext = createContext();

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "O endereço de e-mail não é válido.";
    case "auth/user-disabled":
      return "Este usuário foi desabilitado.";
    case "auth/user-not-found":
      return "Credenciais incorretas. Tente novamente.";
    case "auth/wrong-password":
      return "Senha incorreta. Tente novamente.";
    case "auth/weak-password":
      return "A senha precisa ter pelo menos 6 caracteres.";
    default:
      return "Ocorreu um erro. Tente novamente.";
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const reauthenticate = async (password) => {
    if (!user) {
      throw new Error("Nenhum usuário logado.");
    }
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch {
      setError("Senha incorreta. Tente novamente.");
      return false;
    }
  };
  const register = async (email, password, displayName) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        const photoURL = "https://i.ibb.co/9vqftwp/default-Profile-Pic.png";
        await updateProfile(userCredential.user, { displayName, photoURL });
        setUser({ ...userCredential.user, displayName, photoURL });
      }
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };
  const updateUser = async (updates) => {
    setLoading(true);
    try {
      await updateProfile(user, updates);
      setUser({ ...user, ...updates });
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const updateUserPassword = async (password, newPassword) => {
    if (!auth.currentUser) {
      throw new Error("Usuário não está autenticado.");
    }
    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
    try {

      await reauthenticateWithCredential(auth.currentUser, credential);

      await updatePassword(auth.currentUser, newPassword);
      alert("Senha atualizada com sucesso.Faça login novamente");
    } catch (error) {

      const errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        throw new Error("Senha antiga incorreta.");
      } else if (errorCode === "auth/weak-password") {
        throw new Error("A nova senha deve conter pelo menos 6 caracteres.");
      } else {
        throw new Error("Erro ao atualizar senha. Tente novamente.");
      }
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Email de redefinição de senha enviado. Verifique sua caixa de entrada.");
      setError(null);
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };
  const updateUserPhoto = async (file) => {
    if (!file) throw new Error("Nenhum arquivo selecionado.");
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

    try {
      const response = await fetch( `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao enviar a imagem.");

      const data = await response.json();
      const imageUrl = data.data.url;
      await updateUser({ photoURL: imageUrl });
      return imageUrl;
    } catch (err) {
      setError(err.message || "Falha ao atualizar a imagem.");
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        updateUser,
        updateUserPassword,
        logout,
        reauthenticate, login, register,
        resetPassword, updateUserPhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
