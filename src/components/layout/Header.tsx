import Link from 'next/link';
import Logo from './Logo';
import SearchBar from '@/components/shared/SearchBar';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center space-x-4 md:space-x-6">
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <Link href="/books" passHref>
            <Button variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground">
              All Books
            </Button>
          </Link>
          {/* Add more nav links if needed, e.g., Categories, About */}
        </nav>
      </div>
      <div className="md:hidden p-4 border-t border-border">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
