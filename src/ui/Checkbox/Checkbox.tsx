import type { FC, InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, ...props }) => {
  return (
    <label className={styles.checkbox}>
      <input type={'checkbox'} checked={!!checked} onChange={onChange} {...props} />
      <div>
        <CheckCircleIcon className={styles.checked} />
      </div>
    </label>
  );
};
