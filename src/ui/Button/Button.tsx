import type { FC, ReactNode } from 'react';
import { Button as AntdButton } from 'antd';

type ButtonVariant = 'default' | 'primary' | 'danger' | 'pink' | 'purple' | 'cyan';
type htmlType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps {
  color?: ButtonVariant;
  icon?: ReactNode;
  onClick?: () => void;
  htmlType?: htmlType;
  children?: ReactNode;
}

export const Button: FC<ButtonProps> = ({ color = 'default', icon, children, ...props }) => {
  return (
    <AntdButton type="primary" icon={icon} color={color} size={'large'} {...props}>
      {children}
    </AntdButton>
  );
};
