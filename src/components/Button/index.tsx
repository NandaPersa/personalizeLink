import React from 'react';

import styles from './button.module.css'
interface Props {
    text: string;
    type: "button" | "submit" | "reset";
}
const Button = ({text, type}: Props) => {
  return (
    <button className={styles.button} type={type}>
        {text}
    </button>
  );
}

export default Button;