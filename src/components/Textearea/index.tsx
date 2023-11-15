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
}

const Textarea = ({label, placeholder, name, formik}: Props) => {
  return (
    <div className={styles.container}>
        <label className={styles.label}>{label}</label>
        <textarea
          name={name}
          placeholder={placeholder}
          className={styles.inputText}
          value={formik.values[name]}
          onChange={formik.handleChange} 
      />
    </div>
  );
}

export default Textarea;