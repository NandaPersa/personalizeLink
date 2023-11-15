import React, { type ButtonHTMLAttributes } from 'react';

import styles from './button.module.css'
interface Props extends ButtonHTMLAttributes<HTMLElement> {
    text: string;
    outline?: boolean;
    type: "button" | "submit" | "reset";
   
}
const Button = ({text, type, outline=false, ...rest}: Props) => {
  return (
    <button className={outline ? styles.buttonOutiline : styles.button} type={type} {...rest}>
        {text}
    </button>
  );
}

export default Button;