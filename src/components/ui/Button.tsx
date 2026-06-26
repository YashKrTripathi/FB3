import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brand disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-primary-brand text-white hover:bg-primary-brand/90 shadow-sm",
      secondary: "bg-accent-yellow text-primary-brand hover:bg-accent-yellow/90 shadow-sm",
      outline: "border border-primary-brand bg-transparent hover:bg-primary-brand/5 text-primary-brand",
      ghost: "hover:bg-primary-brand/5 text-primary-brand",
    };
    
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
