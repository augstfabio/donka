import React from 'react';
import styles from './ContainerLoading.module.css';

export default function ContainerLoading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
}
