import React, { type ButtonHTMLAttributes } from 'react';

import styles from './button.module.css'
interface Props extends ButtonHTMLAttributes<HTMLElement> {
    text: string;
    type: "button" | "submit" | "reset";
}
const Button = ({text, type, ...rest}: Props) => {
  return (
    <button className={styles.button} type={type} {...rest}>
        {text}
    </button>
  );
}

export default Button;