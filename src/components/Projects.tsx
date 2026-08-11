import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  Code2,
} from 'lucide-react';
import { projectsList } from '../data';
import { audioController } from '../lib/audio';

export default function Projects() {
  const [filter, setFilter] = useState<string>('all');

  // Filter projects list
  const filteredProjects = projectsList.filter((proj) => {
    if (filter === 'all') return true;
    if (filter === 'java') {
      return (
        proj.category === 'academic' ||
        proj.category === 'dsa' ||
        proj.category === 'showcase' ||
        proj.category === 'utility'
      );
    }
    return proj.category === filter;
  });

  // Get gradient border / theme for card categories
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'academic':
      case 'dsa':
        return 'from-amber-500 to-orange-600';
      case 'showcase':
      case 'utility':
        return 'from-blue-500 to-indigo-600';
      case 'cybersecurity':
        return 'from-teal-500 to-emerald-700';
      case 'python':
        return 'from-emerald-500 to-cyan-600';
      default:
        return 'from-neutral-500 to-neutral-700';
    }
  };

  const getCategoryBadgeLabel = (category: string) => {
    switch (category) {
      case 'academic':
        return 'Java • Data Structures';
      case 'dsa':
        return 'Java • DSA Toolkit';
      case 'showcase':
        return 'Java • OOP Architecture';
      case 'utility':
        return 'Java • Utility Library';
      case 'cybersecurity':
        return 'Cybersecurity Lab';
      case 'python':
        return 'Python Project';
      default:
        return `${category} Project`;
    }
  };

  return (
    <section id="projects" className="py-24 border-t border-neutral-200/20 dark:border-neutral-900/40 bg-neutral-50/10 dark:bg-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xxs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">My Codecraft</h2>
          <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
            Projects & Software Repositories
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3">
            A comprehensive showcase of custom-built Java software engineering, Python game engines & NLP models, and virtual cybersecurity lab implementations. Click <span className="font-bold text-neutral-950 dark:text-white">Project Link</span> on any card to view the repository code.
          </p>
          <div className="h-1 w-12 bg-neutral-800 dark:bg-neutral-300 mx-auto mt-4 rounded-full" />
        </div>

        {/* Project Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { name: 'All Work', id: 'all' },
            { name: 'Java Projects', id: 'java' },
            { name: 'Python Projects', id: 'python' },
            { name: 'Cybersecurity Labs', id: 'cybersecurity' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                audioController.playTap();
                setFilter(cat.id);
              }}
              onMouseEnter={() => audioController.playHover()}
              className={`px-4.5 py-2.5 rounded-2xl text-xs font-bold tracking-wide uppercase transition-all cursor-pointer ${
                filter === cat.id
                  ? 'bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 shadow-md border border-neutral-800 dark:border-white'
                  : 'bg-neutral-150 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200/30 dark:border-neutral-800/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const theme = getCategoryTheme(project.category);
              
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  className="group relative overflow-hidden rounded-3xl border border-neutral-200/60 dark:border-neutral-800/50 bg-white/60 dark:bg-neutral-900/30 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-900/60 transition-all duration-300 p-6 backdrop-blur-sm flex flex-col justify-between hover:shadow-xl"
                >
                  {/* Category color accent bar */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${theme}`} />

                  <div className="space-y-4">
                    {/* Header & Link */}
                    <div className="flex items-start justify-between gap-3 pt-1">
                      <div>
                        <span className="text-[10px] font-black tracking-widest text-neutral-400 dark:text-neutral-500 uppercase block mb-1">
                          {getCategoryBadgeLabel(project.category)}
                        </span>
                        <h4 className="text-base font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                          {project.title}
                        </h4>
                      </div>
                      
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => audioController.playTap()}
                          onMouseEnter={() => audioController.playHover()}
                          title="View Repository Code"
                          className="flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xxs font-extrabold tracking-wide uppercase border border-neutral-200 dark:border-neutral-750 bg-neutral-100 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 hover:border-neutral-950 dark:hover:border-white transition-all cursor-pointer shadow-xs"
                        >
                          <Github size={12} />
                          <span>Project Link</span>
                          <ExternalLink size={10} className="opacity-70" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-extrabold text-neutral-800 dark:text-neutral-200 bg-white/60 dark:bg-white/10 border border-neutral-200/70 dark:border-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-2xs group-hover:border-neutral-300 dark:group-hover:border-white/25 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills demonstrated */}
                  <div className="mt-5 pt-3 border-t border-neutral-100/80 dark:border-neutral-800/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.skills.slice(0, 4).map((skill, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-xxs font-semibold text-neutral-700 dark:text-neutral-300 bg-white/40 dark:bg-neutral-800/30 border border-neutral-200/60 dark:border-white/10 backdrop-blur-md px-2.5 py-1 rounded-full shadow-2xs hover:bg-white/70 dark:hover:bg-white/10 hover:border-neutral-300 dark:hover:border-white/20 transition-all"
                        >
                          <span className="w-1 h-1 rounded-full bg-teal-500/80 dark:bg-teal-400/80" />
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 4 && (
                        <span className="inline-flex items-center text-xxs font-extrabold text-neutral-500 dark:text-neutral-400 bg-white/30 dark:bg-neutral-800/20 border border-neutral-200/50 dark:border-white/10 backdrop-blur-md px-2 py-1 rounded-full">
                          +{project.skills.length - 4}
                        </span>
                      )}
                    </div>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors p-1"
                        title="View Code"
                      >
                        <Code2 size={14} />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
