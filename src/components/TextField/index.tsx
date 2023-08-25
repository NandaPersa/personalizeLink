import React from 'react';
import { ErrorMessage, Field, FormikProps } from 'formik';
import styles from './textField.module.css'

interface Props {
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