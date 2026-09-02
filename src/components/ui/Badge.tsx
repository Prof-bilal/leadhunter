import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
}

const variantStyles = {
  default: 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]',
  success: 'bg-[rgba(63,185,80,0.15)] text-[var(--color-success)]',
  warning: 'bg-[rgba(210,153,34,0.15)] text-[var(--color-warning)]',
  danger: 'bg-[rgba(248,81,73,0.15)] text-[var(--color-danger)]',
  info: 'bg-[rgba(88,166,255,0.15)] text-[var(--color-info)]',
};

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center font-medium rounded-[var(--radius-sm)] ${size === 'sm' ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-0.5 text-xs'} ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}
