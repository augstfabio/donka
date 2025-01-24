import React from "react";
import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Confirmar Alterações</h2>
        <p>Tem certeza de que deseja atualizar sua senha?</p>
        <div className={styles.btns}>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancelar
          </button>
          <button onClick={onConfirm}  className={styles.okBtn}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
