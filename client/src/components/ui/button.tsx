// src/components/ui/Button.tsx
'use client';
import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <button className={classNames('h-10 p-2 ', className)
        }
            {...props}
        >
            {children}
        </button >
    );
};

