
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">CharityConnect</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/campaigns" className="text-foreground/80 hover:text-primary transition-colors">
            Campaigns
          </Link>
          <Link to="/leaderboard" className="text-foreground/80 hover:text-primary transition-colors">
            Leaderboard
          </Link>
          <Link to="/profile" className="text-foreground/80 hover:text-primary transition-colors">
            My Profile
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {/* <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button> */}
          <Link to="/create-campaign">
  <Button variant="default">Create Campaign</Button>
</Link>
        </div>
        
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-20 px-4 md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-6 text-lg">
            <Link 
              to="/" 
              className="py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/campaigns" 
              className="py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Campaigns
            </Link>
            <Link 
              to="/leaderboard" 
              className="py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link 
              to="/profile" 
              className="py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              My Profile
            </Link>
            <Link 
              to="/create-campaign" 
              className="py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="w-full">Create Campaign</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
