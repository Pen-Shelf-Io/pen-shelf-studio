'use client';

import { useState, useEffect } from 'react';

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-border py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {year !== null ? year : ''} PageTurner. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          A minimalist e-commerce frontend for book enthusiasts.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
