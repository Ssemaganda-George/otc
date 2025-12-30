import React from 'react';
import { cn } from '@/lib/utils';

interface AOSWrapperProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'slide-up' | 'slide-down';
  delay?: number;
  duration?: number;
  className?: string;
}

const AOSWrapper: React.FC<AOSWrapperProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  className
}) => {
  return (
    <div
      data-aos={animation}
      data-aos-delay={delay}
      data-aos-duration={duration}
      className={cn(className)}
    >
      {children}
    </div>
  );
};

export default AOSWrapper;