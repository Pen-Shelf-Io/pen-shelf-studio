'use client';

import { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-border py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear !== null ? currentYear : new Date().getFullYear()} GlobeLynk. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          A minimalist e-commerce frontend for book enthusiasts.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
