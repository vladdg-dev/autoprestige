'use client';

import Image from 'next/image';
import { ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
  textStyles?: string;
  icon?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  clickHandler,
  title,
  type,
  className,
  textStyles,
  icon,
  disabled,
}) => {
  return (
    <button
      onClick={clickHandler}
      type={type}
      className={`custom-btn ${className}`}
      disabled={false}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {icon && (
        <div className="relative w-6 h-6">
          <Image src={icon} alt="right icon" fill className="object-contain" />
        </div>
      )}
    </button>
  );
};

export default Button;
