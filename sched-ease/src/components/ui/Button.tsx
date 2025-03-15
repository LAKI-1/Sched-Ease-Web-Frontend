import React from 'react';
import { cn } from '../../lib/utils';
import '../../css/Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    isLoading?: boolean;
}

export default function Button({
                                   children,
                                   className,
                                   variant = 'primary',
                                   isLoading,
                                   disabled,
                                   ...props
                               }: ButtonProps) {
    return (
        <button
            className={cn(
                'button',
                `button-${variant}`,
                (disabled || isLoading) && 'button-disabled',
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="button-loading flex items-center gap-1">
                    <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </span>            
            ) : children}
        </button>
    );
}