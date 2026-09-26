import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button component adhering to EcomGyan design tokens.
 * Supports primary, secondary, outline, ghost variants and responsive sizing.
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  href,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 border border-brand-400/30',
    secondary: 'bg-surface-raised hover:bg-surface-elevated text-content-primary border border-border-default hover:border-border-strong',
    outline: 'bg-transparent hover:bg-surface-raised text-content-primary border border-border-default hover:border-brand-500/50',
    ghost: 'bg-transparent hover:bg-surface-raised text-content-secondary hover:text-content-primary',
    accent: 'bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 hover:opacity-95',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-lg gap-2 font-medium',
    lg: 'text-base px-6 py-3.5 rounded-lg gap-2.5 font-semibold',
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : LeftIcon ? (
        <LeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      ) : null}
      <span>{children}</span>
      {!isLoading && RightIcon && (
        <RightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
