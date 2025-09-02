import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ icon, children, disabled, ...props }) => {
  return (
    <button className={styles.button} disabled={disabled} {...props}>
      {icon}
      {children}
    </button>
  );
};
