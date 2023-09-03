/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { type InputHTMLAttributes } from 'react';
import { type FormikProps } from 'formik';
import styles from './textField.module.css'

interface Props extends InputHTMLAttributes<HTMLElement> {
    label: string;
    placeholder: string;
    name: string,
    formik: FormikProps<any>;
    isLinkValid: boolean,
}

const TextField = ({label, placeholder, name, formik, isLinkValid}: Props) => {
  return (
    <div className={styles.container}>
        <label className={styles.label}>{label}</label>
        <input
        name={name}
        type='text'
        placeholder={placeholder}
        className={isLinkValid ? styles.inputText : styles.inputTextError}
        value={formik.values[name]}
        onChange={formik.handleChange} 
      />
       {!isLinkValid && <p className={styles.error}>Link inválido. Por favor, insira um link válido.</p>}
    </div>
  );
}

export default TextField;