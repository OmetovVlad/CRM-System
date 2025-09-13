import type { FC, ReactNode } from 'react';
import { Button } from 'antd';

type ButtonVariant = 'default' | 'primary' | 'danger' | 'pink' | 'purple' | 'cyan';
type htmlType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps {
  color?: ButtonVariant;
  icon?: ReactNode;
  onClick?: () => void;
  htmlType?: htmlType;
}

export const IconButton: FC<ButtonProps> = ({ color = 'default', icon, ...props }) => {
  return <Button icon={icon} variant="filled" color={color} size={'large'} {...props}></Button>;
};
