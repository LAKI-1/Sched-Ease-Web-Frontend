import React from 'react';
import { cn } from '../../lib/utils';
import '../../css/Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({
                                  label,
                                  error,
                                  className,
                                  id,
                                  ...props
                              }: InputProps) {
    return (
        <div className="input-container">
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={cn(
                    'input-field',
                    error && 'error',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="input-error-message">{error}</p>
            )}
        </div>
    );
}