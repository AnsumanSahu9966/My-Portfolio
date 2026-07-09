import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { personalInfo } from '../data';
import { audioController } from '../lib/audio';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ darkMode, setDarkMode, activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Certificates', id: 'certificates' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/70 dark:bg-black/70 backdrop-blur-md shadow-lg border-b border-neutral-200/40 dark:border-neutral-800/30'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => {
              audioController.playTap();
              scrollToSection('home');
            }}
            onMouseEnter={() => audioController.playHover()}
          >
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-neutral-950 via-neutral-750 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  audioController.playTap();
                  scrollToSection(item.id);
                }}
                onMouseEnter={() => audioController.playHover()}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'text-neutral-950 dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/60 -z-10 rounded-full border border-neutral-300/40 dark:border-neutral-700/50"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </button>
            ))}
          </div>

          {/* Action buttons (Theme and social) */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => {
                audioController.playTap();
                setDarkMode(!darkMode);
              }}
              onMouseEnter={() => audioController.playHover()}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 border border-neutral-200/50 dark:border-neutral-700/50 transition-all shadow-sm cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -10, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 10, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  {darkMode ? <AnimatePresence><Sun size={18} className="text-amber-400" /></AnimatePresence> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => audioController.playHover()}
              onClick={() => audioController.playTap()}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 border border-neutral-200/50 dark:border-neutral-700/50 transition-all shadow-sm"
              title="GitHub"
            >
              <Github size={18} />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => audioController.playHover()}
              onClick={() => audioController.playTap()}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 border border-neutral-200/50 dark:border-neutral-700/50 transition-all shadow-sm"
              title="LinkedIn"
            >
              <Linkedin size={18} className="text-blue-500" />
            </a>

            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => audioController.playHover()}
              onClick={() => audioController.playTap()}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 border border-neutral-200/50 dark:border-neutral-700/50 transition-all shadow-sm"
              title="Instagram"
            >
              <Instagram size={18} className="text-pink-500" />
            </a>
          </div>

          {/* Mobile hamburger menu / theme toggle */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={() => {
                audioController.playTap();
                setDarkMode(!darkMode);
              }}
              onMouseEnter={() => audioController.playHover()}
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/50"
            >
              {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => {
                audioController.playTap();
                setIsOpen(!isOpen);
              }}
              onMouseEnter={() => audioController.playHover()}
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/50 dark:border-neutral-700/50 cursor-pointer"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-neutral-200/50 dark:border-neutral-800/50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-lg"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    audioController.playTap();
                    scrollToSection(item.id);
                  }}
                  onMouseEnter={() => audioController.playHover()}
                  className={`flex w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              <div className="pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-around">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => audioController.playHover()}
                  onClick={() => audioController.playTap()}
                  className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                >
                  <Github size={20} />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => audioController.playHover()}
                  onClick={() => audioController.playTap()}
                  className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  <Linkedin size={20} className="text-blue-500" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => audioController.playHover()}
                  onClick={() => audioController.playTap()}
                  className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-pink-500 dark:hover:text-pink-400"
                >
                  <Instagram size={20} className="text-pink-500" />
                  <span className="text-sm font-medium">Instagram</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  onMouseEnter={() => audioController.playHover()}
                  onClick={() => audioController.playTap()}
                  className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400 hover:text-rose-500 dark:hover:text-rose-400"
                >
                  <Mail size={20} />
                  <span className="text-sm font-medium">Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
