"use client"

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', isSection: true },
    { name: 'About Us', href: '/about', isSection: true },
    { name: 'Contact Us', href: '/contact', isSection: true }
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleGetStartedClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = document.querySelector('#main-section');
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-transparent backdrop-blur-none' 
        : 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 group">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl transition-all duration-300 ${
                  scrolled ? 'bg-white/10 backdrop-blur-sm' : 'bg-white/10'
                } backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3`}>
                  <Image 
                    src="/logo3.png" 
                    alt="Logo" 
                    width={48}
                    height={48}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                scrolled ? 'text-white' : 'text-white'
              }`}>
                Open Mail
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    scrolled 
                      ? 'text-white hover:text-purple-300' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className={`absolute inset-0 rounded-lg transition-all duration-300 transform scale-0 group-hover:scale-100 ${
                    scrolled 
                      ? 'bg-white/10 backdrop-blur-sm' 
                      : 'bg-white/10 backdrop-blur-sm'
                  }`}></div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></div>
                </Link>
              ))}
              
              <div className="ml-6">
                <button
                  onClick={handleGetStartedClick}
                  className="relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 group overflow-hidden"
                  style={{ cursor: 'pointer !important' }}
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                scrolled 
                  ? 'text-white hover:text-purple-300 hover:bg-white/10' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                }`} />
                <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                }`} />
              </div>
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className={`px-2 pt-2 pb-3 space-y-1 ${
            scrolled ? 'bg-black/20 backdrop-blur-sm' : 'bg-slate-900/95'
          } backdrop-blur-sm rounded-b-lg`}>
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  handleSmoothScroll(e, item.href);
                  setIsOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 transform ${
                  scrolled 
                    ? 'text-white hover:text-purple-300 hover:bg-white/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                } hover:translate-x-2`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <button
                onClick={(e) => {
                  handleGetStartedClick(e);
                  setIsOpen(false);
                }}
                className="block w-full text-center px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ cursor: 'pointer !important' }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}