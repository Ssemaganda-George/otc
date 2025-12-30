import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const H1: React.FC<TypographyProps> = ({ children, className, as: Component = 'h1' }) => (
  <Component className={cn("text-4xl md:text-5xl lg:text-6xl font-bold leading-tight", className)}>
    {children}
  </Component>
);

const H2: React.FC<TypographyProps> = ({ children, className, as: Component = 'h2' }) => (
  <Component className={cn("text-3xl md:text-4xl font-bold leading-tight", className)}>
    {children}
  </Component>
);

const H3: React.FC<TypographyProps> = ({ children, className, as: Component = 'h3' }) => (
  <Component className={cn("text-2xl md:text-3xl font-semibold leading-tight", className)}>
    {children}
  </Component>
);

const Body: React.FC<TypographyProps> = ({ children, className, as: Component = 'p' }) => (
  <Component className={cn("text-base leading-relaxed", className)}>
    {children}
  </Component>
);

const Small: React.FC<TypographyProps> = ({ children, className, as: Component = 'small' }) => (
  <Component className={cn("text-sm text-gray-600", className)}>
    {children}
  </Component>
);

export { H1, H2, H3, Body, Small };