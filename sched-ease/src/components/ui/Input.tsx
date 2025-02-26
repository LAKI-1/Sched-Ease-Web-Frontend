import React from 'react';
import { cn } from '../../lib/utils';

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
        <div className="space-y-1">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={cn(
                    'block w-full rounded-md border-gray-300 shadow-sm',
                    'focus:border-blue-500 focus:ring-blue-500',
                    error && 'border-red-300',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}