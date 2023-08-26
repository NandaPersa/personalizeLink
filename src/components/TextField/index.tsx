import React, { type InputHTMLAttributes } from 'react';
import { type FormikProps } from 'formik';
import styles from './textField.module.css'

interface Props extends InputHTMLAttributes<HTMLElement> {
    label: string;
    placeholder: string;
    name: string,
    formik: FormikProps<any>;
}

const TextField = ({label, placeholder, name, formik}: Props) => {
  return (
    <div className={styles.container}>
        <label className={styles.label}>{label}</label>
        <input
        name={name}
        type='text'
        placeholder={placeholder}
        className={styles.inputText}
        value={formik.values[name]}
        onChange={formik.handleChange} 
      />
    </div>
  );
}

export default TextField;