import React from 'react';
import CountUp from 'react-countup';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
  separator = ',',
  className = ''
}) => {
  return (
    <CountUp
      start={start}
      end={end}
      duration={duration}
      delay={delay}
      suffix={suffix}
      prefix={prefix}
      separator={separator}
      className={className}
    />
  );
};

export default AnimatedCounter;