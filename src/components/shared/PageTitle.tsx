import type { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

const PageTitle = ({ children, className }: PageTitleProps) => {
  return (
    <h1 className={`text-3xl md:text-4xl font-bold font-headline text-primary mb-8 ${className || ''}`}>
      {children}
    </h1>
  );
};

export default PageTitle;
