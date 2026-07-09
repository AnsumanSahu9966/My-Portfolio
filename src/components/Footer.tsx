import { personalInfo } from '../data';
import { audioController } from '../lib/audio';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="bg-neutral-50 dark:bg-black/40 border-t border-neutral-200/30 dark:border-neutral-900/40 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo brand */}
          <div className="text-center md:text-left">
            <span className="text-sm font-black tracking-widest text-neutral-900 dark:text-white uppercase">
              {personalInfo.name}
            </span>
            <p className="text-[10px] font-black text-neutral-450 dark:text-neutral-500 uppercase tracking-widest mt-1">
              {personalInfo.title}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xxs font-extrabold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            <button
              onClick={() => {
                audioController.playTap();
                scrollToSection('home');
              }}
              onMouseEnter={() => audioController.playHover()}
              className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => {
                audioController.playTap();
                scrollToSection('about');
              }}
              onMouseEnter={() => audioController.playHover()}
              className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => {
                audioController.playTap();
                scrollToSection('certificates');
              }}
              onMouseEnter={() => audioController.playHover()}
              className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Certificates
            </button>
            <button
              onClick={() => {
                audioController.playTap();
                scrollToSection('projects');
              }}
              onMouseEnter={() => audioController.playHover()}
              className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => {
                audioController.playTap();
                scrollToSection('skills');
              }}
              onMouseEnter={() => audioController.playHover()}
              className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => {
                audioController.playTap();
                scrollToSection('contact');
              }}
              onMouseEnter={() => audioController.playHover()}
              className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Copyright details */}
          <div className="text-center md:text-right font-mono text-[10px] text-neutral-400 dark:text-neutral-500 flex flex-col gap-1">
            <span>Designed & Developed by Ansuman Sahu</span>
            <span>& assisted by Google AI Studio</span>
            <span>&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
