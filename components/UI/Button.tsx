'use client';

import Image from 'next/image';
import { ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({ clickHandler, title, className }) => {
  return (
    <button
      onClick={clickHandler}
      type={`button`}
      className={`custom-btn ${className}`}
      disabled={false}
    >
      <span className={`flex-1`}>{title}</span>
    </button>
  );
};

export default Button;
