import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, MapPin, Ruler, GraduationCap } from 'lucide-react';
import { personalInfo } from '../data';
import { audioController } from '../lib/audio';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  // Titles to rotate through
  const roles = ['Sophomore CSE Student', 'Java Developer', 'AI Prompting Practitioner', 'Cybersecurity Learner'];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [roles.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Decorative Glowing Blobs (Sleek Unsaturated Neutral & Grey) */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-neutral-300/15 dark:bg-neutral-800/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-neutral-400/5 dark:bg-neutral-900/5 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-neutral-200/10 dark:bg-neutral-950/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-16 lg:pt-4">
          
          {/* Profile Picture with Faded Edges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative shrink-0 lg:mt-2"
          >
            <div 
              className="w-56 h-56 sm:w-64 sm:h-64 lg:w-[26rem] lg:h-[26rem] rounded-2xl overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                maskComposite: 'intersect',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                WebkitMaskComposite: 'source-in'
              }}
            >
              <img 
                src="https://i.postimg.cc/FF6mWWcp/IMG-20260709-022241.jpg" 
                alt="Profile"
                className="w-full h-full object-cover grayscale-[10%]"
              />
            </div>
          </motion.div>

          {/* Main Hero Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl">
            
            {/* Title / Name */}
            <div className="space-y-3">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg sm:text-xl font-medium text-neutral-500 dark:text-neutral-400"
              >
                Hello, I am
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
              >
                <span className="bg-gradient-to-r from-neutral-950 via-neutral-750 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </motion.h1>
            </div>

            {/* Rotator/Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-10 text-xl sm:text-2xl font-bold text-neutral-700 dark:text-neutral-200 flex items-center justify-center lg:justify-start space-x-2"
            >
              <span className="text-neutral-400 font-normal">I am a</span>
              <div className="relative overflow-hidden h-10 w-[260px] sm:w-[320px] text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[currentRoleIndex]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-y-0 left-0 flex items-center text-neutral-850 dark:text-neutral-100 whitespace-nowrap overflow-visible"
                  >
                    {roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed"
            >
              {personalInfo.summary}
            </motion.p>

            {/* Tag / Metadata (Glassmorphism tags) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-2.5 justify-center lg:justify-start pt-2"
            >
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-100/80 dark:bg-neutral-900/60 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/40 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-sm">
                <MapPin size={13} className="text-neutral-500" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-100/80 dark:bg-neutral-900/60 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/40 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-sm">
                <GraduationCap size={13} className="text-neutral-500" />
                <span>Sophomore</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-100/80 dark:bg-neutral-900/60 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/40 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-sm">
                <span className="text-neutral-400 dark:text-neutral-500">Gender:</span>
                <span>{personalInfo.gender}</span>
                <span className="text-neutral-300 dark:text-neutral-700">|</span>
                <span className="text-neutral-400 dark:text-neutral-500">Pronouns:</span>
                <span>{personalInfo.pronouns}</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-100/80 dark:bg-neutral-900/60 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/40 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-sm">
                <Ruler size={13} className="text-neutral-500" />
                <span>176 cm (5'9")</span>
              </div>
            </motion.div>

            {/* Interactive Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-sm pt-4 mx-auto lg:mx-0"
            >
              <div className="bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200/40 dark:border-neutral-800/40 rounded-2xl p-3 text-center backdrop-blur-sm hover:border-neutral-400 transition-all group">
                <span className="block text-2xl sm:text-3xl font-black text-neutral-800 dark:text-neutral-200 group-hover:scale-105 transition-transform duration-300">
                  5+
                </span>
                <span className="text-xxs sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase font-bold tracking-wider">
                  Core Java Apps
                </span>
              </div>
              <div className="bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200/40 dark:border-neutral-800/40 rounded-2xl p-3 text-center backdrop-blur-sm hover:border-neutral-400 transition-all group">
                <span className="block text-2xl sm:text-3xl font-black text-neutral-800 dark:text-neutral-200 group-hover:scale-105 transition-transform duration-300">
                  18+
                </span>
                <span className="text-xxs sm:text-xs text-neutral-500 dark:text-neutral-400 uppercase font-bold tracking-wider">
                  Certs Earned
                </span>
              </div>
            </motion.div>

            {/* Buttons (Cta) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full pt-4"
            >
              <button
                onClick={() => {
                  audioController.playTap();
                  scrollToSection('projects');
                }}
                onMouseEnter={() => audioController.playHover()}
                className="px-8 py-3.5 rounded-full bg-neutral-950 hover:bg-black dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-neutral-950 font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Explore Projects
              </button>

              <button
                onClick={() => {
                  audioController.playTap();
                  scrollToSection('contact');
                }}
                onMouseEnter={() => audioController.playHover()}
                className="px-8 py-3.5 rounded-full bg-white/40 dark:bg-neutral-900/40 text-neutral-800 dark:text-neutral-200 font-semibold border border-neutral-200/60 dark:border-neutral-800/50 hover:bg-white/60 dark:hover:bg-neutral-800/60 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-sm backdrop-blur-md"
              >
                Get In Touch
              </button>
            </motion.div>
          </div>

        </div>

        {/* Floating Indicator for Scrolling down */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            onClick={() => {
              audioController.playTap();
              scrollToSection('about');
            }}
            onMouseEnter={() => audioController.playHover()}
            className="flex flex-col items-center space-y-1.5 text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-xxs font-bold uppercase tracking-widest">About Me</span>
            <ArrowDown size={16} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
