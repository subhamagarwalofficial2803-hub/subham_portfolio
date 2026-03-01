"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Briefcase, 
  Layers, 
  FileText, 
  MessageSquare,
  Menu,
  Target,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const navItems = [
  { name: 'Home', icon: Home, href: '#home' },
  { name: 'Experience', icon: Briefcase, href: '#experience' },
  { name: 'Expertise', icon: Target, href: '#expertise' },
  { name: 'Leadership', icon: ShieldCheck, href: '#leadership' },
  { name: 'Portfolio', icon: Layers, href: '#portfolio' },
  { name: 'Resume', icon: FileText, href: '#resume' },
  { name: 'Hobbies', icon: Heart, href: '#hobbies' },
  { name: 'Contact', icon: MessageSquare, href: '#contact' },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      setIsMobileMenuOpen(false);
      const offset = 80;
      const elementPosition = elem.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md border-b shadow-lg py-3" 
        : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, '#home')}
            className={cn(
              "font-headline font-extrabold text-2xl tracking-tighter transition-colors",
              isScrolled ? "text-brand-dark" : "text-white"
            )}
          >
            SA<span className="text-brand-teal">.</span>
          </a>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={cn(
                  "px-4 py-2 rounded-full text-[11px] xl:text-xs font-bold transition-all flex items-center gap-1.5",
                  isActive 
                    ? (isScrolled ? "bg-brand-dark text-white" : "bg-white text-brand-dark") 
                    : (isScrolled ? "text-muted-foreground hover:text-brand-dark hover:bg-brand-teal/5" : "text-gray-300 hover:text-white hover:bg-white/10")
                )}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </a>
            );
          })}
          <div className="ml-2 pl-4 border-l border-gray-200">
            <Button 
              className={cn(
                "rounded-full px-6 font-bold uppercase tracking-[0.15em] text-[9px] h-9 transition-all shadow-md",
                isScrolled ? "bg-brand-teal hover:bg-brand-teal/90 text-white" : "bg-white text-brand-dark hover:bg-gray-100"
              )}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Hire Me
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn(isScrolled ? "text-brand-dark" : "text-white")}>
                <Menu className="w-8 h-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-[400px] bg-brand-dark border-brand-teal/10 p-0 flex flex-col">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Access different sections of Subham Agarwal's portfolio</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full pt-20 px-8 space-y-2 overflow-y-auto">
                <div className="mb-10">
                   <span className="font-headline font-extrabold text-3xl tracking-tighter text-white">
                    SA<span className="text-brand-teal">.</span>
                  </span>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-2">Senior Backend Engineer</p>
                </div>
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={cn(
                        "flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-bold transition-all",
                        isActive 
                          ? "bg-brand-teal text-white shadow-lg shadow-brand-teal/20" 
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </a>
                  );
                })}
              </div>
              <div className="mt-auto p-8 border-t border-white/5 bg-brand-darker">
                 <Button 
                  className="w-full h-14 bg-brand-teal hover:bg-brand-teal/90 text-white rounded-2xl font-bold text-base shadow-xl shadow-brand-teal/10"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get In Touch
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
