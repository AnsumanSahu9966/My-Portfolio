import { useState, useEffect, useRef } from 'react';
import { ArrowUp, Volume2, VolumeX, Music, Bell } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AbstractBackground from './components/AbstractBackground';
import { audioController } from './lib/audio';

export default function App() {
  // Theme state defaulting to dark mode for that vibrant glowing look, synced with localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved ? saved === 'dark' : true; // Default to dark for colorful glowing aesthetics
  });

  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const [musicEnabled, setMusicEnabled] = useState(() => audioController.getMusicState());
  const [sfxEnabled, setSfxEnabled] = useState(() => audioController.getSfxState());
  const [isAudioExpanded, setIsAudioExpanded] = useState(false);
  const audioMenuRef = useRef<HTMLDivElement>(null);

  // Sync theme with body and html tags
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [darkMode]);

  // Start background music on first interaction
  useEffect(() => {
    const startMusicOnInteraction = () => {
      audioController.startBackgroundMusic();
      window.removeEventListener('click', startMusicOnInteraction);
      window.removeEventListener('scroll', startMusicOnInteraction);
      window.removeEventListener('mouseenter', startMusicOnInteraction);
    };
    
    window.addEventListener('click', startMusicOnInteraction);
    window.addEventListener('scroll', startMusicOnInteraction);
    window.addEventListener('mouseenter', startMusicOnInteraction);
    
    return () => {
      window.removeEventListener('click', startMusicOnInteraction);
      window.removeEventListener('scroll', startMusicOnInteraction);
      window.removeEventListener('mouseenter', startMusicOnInteraction);
    };
  }, []);

  // Scroll spy observer to highlight correct section in the navbar on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    
    const observers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-40% 0px -40% 0px', // trigger near center of screen
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  // Monitor scroll height to show Back to Top button past hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close audio menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (audioMenuRef.current && !audioMenuRef.current.contains(event.target as Node)) {
        setIsAudioExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    }
  };

  const toggleMusic = () => {
    setMusicEnabled(audioController.toggleMusic());
    audioController.playTap();
  };

  const toggleSfx = () => {
    setSfxEnabled(audioController.toggleSfx());
    audioController.playTap();
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-800 dark:text-neutral-100 transition-colors duration-300 overflow-x-hidden selection:bg-neutral-500/30">
      
      {/* Abstract Background behind frosted glass with cursor movement and ripples */}
      <AbstractBackground />

      {/* Main layout container */}
      <div className="relative z-10">
        
        {/* Navigation header */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Portfolio Content Blocks */}
        <main>
          <Hero scrollToSection={scrollToSection} />
          
          <About />
          
          <Projects />
          
          <Skills />
          
          <Contact />
        </main>

        {/* Footer */}
        <Footer scrollToSection={scrollToSection} />

        {/* Floating Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              id="back-to-top"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 0.6, y: 0, scale: 1 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              onClick={() => {
                audioController.playTap();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={() => audioController.playHover()}
              className="fixed bottom-18 right-6 z-50 p-2.5 rounded-full bg-neutral-900/50 text-white/90 dark:bg-neutral-100/50 dark:text-neutral-950/90 border border-neutral-200/20 dark:border-neutral-800/20 shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center backdrop-blur-xs"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Audio Controls */}
        <div ref={audioMenuRef} className="fixed bottom-6 right-6 z-50 flex items-end justify-end">
          <AnimatePresence>
            {isAudioExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-14 right-0 mb-2 flex flex-col gap-2 p-2 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-700/50 shadow-xl"
              >
                <button
                  onClick={toggleMusic}
                  onMouseEnter={() => audioController.playHover()}
                  className={`flex items-center justify-between w-32 px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                    musicEnabled
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'bg-transparent text-neutral-500 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <span>Music</span>
                  {musicEnabled ? <Music size={14} /> : <VolumeX size={14} />}
                </button>
                
                <button
                  onClick={toggleSfx}
                  onMouseEnter={() => audioController.playHover()}
                  className={`flex items-center justify-between w-32 px-3 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                    sfxEnabled
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'bg-transparent text-neutral-500 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  <span>UI Sounds</span>
                  {sfxEnabled ? <Bell size={14} /> : <VolumeX size={14} />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => {
              setIsAudioExpanded(!isAudioExpanded);
              audioController.playTap();
            }}
            onMouseEnter={() => audioController.playHover()}
            className={`p-3 rounded-full text-white dark:text-neutral-950 border border-neutral-200/30 dark:border-neutral-800/30 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center backdrop-blur-xs ${
              !musicEnabled && !sfxEnabled 
                ? 'bg-neutral-600/80 dark:bg-neutral-400/80' 
                : 'bg-neutral-900/80 dark:bg-neutral-100/80'
            }`}
            aria-label="Toggle Audio Menu"
          >
            {!musicEnabled && !sfxEnabled ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

      </div>
    </div>
  );
}
