import React, { useState } from "react";
import styles from "./ExpandableCard.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbVaccine } from "react-icons/tb";
import { TiInputChecked } from "react-icons/ti";
import { MdCropSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ExpandableCard = ({ title, date, doses, status }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={toggleExpand}
      className={`${styles.card} ${isExpanded ? styles.cardExpanded : styles.cardClosed}`}
    >
      <div className={styles.header}>
        {!isExpanded && (
          <span className={styles.datePrevius}>
            {status === "aplicada" ? (
              <span className={styles.checked}><TiInputChecked /></span>
            ) : (
              <span className={styles.noChecked}><MdCropSquare /></span>
            )} {date}
          </span>
        )}
        <span className={styles.title}>
          <TbVaccine /> {isExpanded ? title : title.length > 17 ? `${title.slice(0, 17)}...` : title}
        </span>
        <button className={styles.toggleButton}>
          {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>
      <div className={styles.content}>
        <p>Data: {date}</p>
        <p>Dose: {doses}</p>
        <p>Status: {status} {status === "aplicada" ? (
          <span className={styles.checked}><TiInputChecked /></span>
        ) : (
          <span className={styles.noChecked}><MdCropSquare /></span>
        )}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/");
          }}
          className={styles.editButton}
        >
          Editar
        </button>
      </div>
    </div>
  );
};

export default ExpandableCard;