import React from 'react'
import styles from './Button.module.css';
export const Button = ({text,onclick}) => {
  return (
    <button onClick={onclick} className={styles.button}>
    <span>{text}</span>
    <img className={styles.arrow} src="/images/arrow-forward.png" alt="arrow" />
  </button>
  )
}
