import React, { useEffect } from "react";
import styles from "./BannerAlert.module.css";

const BannerAlert = ({ message, type = "info", onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer); 
  }, [duration, onClose]);

  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <span>{message}</span>
    </div>
  );
};

export default BannerAlert;
