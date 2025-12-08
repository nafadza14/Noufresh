import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'icon';
  children: React.ReactNode;
  withArrow?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  withArrow = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 ease-in-out font-medium rounded-full px-8 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-cyan";
  
  const variants = {
    // Dominant Cyan gradient
    primary: "bg-gradient-to-r from-primary-cyan via-[#4cc0e0] to-primary-cyan bg-[length:200%_auto] hover:bg-right text-white hover:shadow-lg hover:scale-105 hover:shadow-primary-cyan/30 border-0",
    outline: "bg-transparent border-2 border-primary-cyan text-primary-cyan hover:bg-primary-cyan hover:text-white",
    icon: "p-2 rounded-full hover:bg-primary-cyan/10 px-2 py-2 text-gray-600 hover:text-primary-cyan"
  };

  const finalClass = variant === 'icon' 
    ? `${variants.icon} ${className}` 
    : `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button className={finalClass} {...props}>
      {children}
      {withArrow && variant !== 'icon' && <ArrowRight className="ml-2 w-4 h-4" />}
    </button>
  );
};

export default Button;