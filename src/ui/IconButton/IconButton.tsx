import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from './IconButton.module.scss';

type ButtonVariant = 'primary' | 'success' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

export const IconButton: FC<ButtonProps> = ({ variant = 'primary', icon, ...props }) => {
  console.log(variant);

  return (
    <button className={`${styles.button} ${styles[`button--${variant}`]}`} {...props}>
      {icon}
    </button>
  );
};
