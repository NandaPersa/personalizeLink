/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { type TextareaHTMLAttributes } from 'react';
import { type FormikProps } from 'formik';
import styles from './textField.module.css';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder: string;
  name: string;
  formik: FormikProps<any>;
  hint?: string;
}

const Textarea = ({
  label,
  placeholder,
  name,
  formik,
  hint,
  rows = 3,
  ...rest
}: Props) => {
  const value = formik.values[name] ?? '';

  return (
    <div className={styles.container}>
      <div className={styles.labelRow}>
        {label && <label htmlFor={name} className={styles.label}>{label}</label>}
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
      <div className={styles.inputWrapper}>
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          className={styles.inputText}
          value={value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Textarea;