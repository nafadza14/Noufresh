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
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 ease-in-out font-bold text-[17px] rounded-full px-8 py-4 focus:outline-none";
  
  const variants = {
    primary: "bg-primary-cyan text-white hover:bg-primary-dark shadow-lg shadow-primary-cyan/20",
    outline: "bg-transparent border-2 border-primary-cyan text-primary-cyan hover:bg-primary-cyan hover:text-white",
    icon: "p-2 rounded-full hover:bg-primary-cyan/10 text-primary-dark"
  };

  const finalClass = variant === 'icon' 
    ? `${variants.icon} ${className}` 
    : `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button className={finalClass} {...props}>
      {children}
      {withArrow && variant !== 'icon' && <ArrowRight className="ml-2 w-5 h-5" />}
    </button>
  );
};

export default Button;