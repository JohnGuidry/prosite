import React, { useRef, useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export const Reveal: React.FC<Props> = ({ children, className = '', threshold = 0.15 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'revealed' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
};