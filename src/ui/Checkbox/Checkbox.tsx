import type { FC } from 'react';
import styles from './Checkbox.module.scss';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface CheckboxProps {
  onChange: () => void;
  checked?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({ ...props }) => {
  return (
    <label className={styles.checkbox}>
      <input type={'checkbox'} {...props} />
      <div>
        <CheckCircleIcon className={styles.checked} />
      </div>
    </label>
  );
};
