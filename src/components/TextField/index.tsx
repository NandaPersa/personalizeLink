/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { type InputHTMLAttributes, type ReactNode } from 'react';
import { type FormikProps } from 'formik';
import styles from './textField.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  name: string;
  formik: FormikProps<any>;
  isLinkValid?: boolean;
  icon?: ReactNode;
  hint?: string;
}

const TextField = ({
  label,
  placeholder,
  name,
  formik,
  isLinkValid = true,
  icon,
  hint,
  type = 'text',
  ...rest
}: Props) => {
  const value = formik.values[name] ?? '';
  const hasError = !isLinkValid;

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name} className={styles.label}>{label}</label>}
      <div className={`${styles.inputWrapper} ${hasError ? styles.hasError : ''}`}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`${styles.inputText} ${icon ? styles.withIcon : ''}`}
          value={value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={hasError}
          {...rest}
        />
        {value && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              void formik.setFieldValue(name, '');
            }}
            aria-label="Limpar campo"
          >
            ✕
          </button>
        )}
      </div>
      {hint && !hasError && <span className={styles.hint}>{hint}</span>}
      {hasError && (
        <p className={styles.error} role="alert">
          <span className={styles.errorDot} />
          Por favor, insira um link válido começando com http:// ou https://
        </p>
      )}
    </div>
  );
};

export default TextField;