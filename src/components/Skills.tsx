import { motion } from 'motion/react';
import {
  Code,
  ShieldCheck,
  Brain,
  Wrench,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { skillCategories } from '../data';
import { audioController } from '../lib/audio';

export default function Skills() {
  
  // Custom course work tiles
  const relevantCoursework = [
    { title: 'Programming in Java', code: 'CSE-101', icon: '☕' },
    { title: 'Object-Oriented Programming', code: 'CSE-102', icon: '📦' },
    { title: 'Data Structures & Algorithms', code: 'CSE-201', icon: '🌳' },
    { title: 'Database Fundamentals', code: 'CSE-202', icon: '🗄️' },
    { title: 'Computer Organization', code: 'CSE-203', icon: '🖥️' },
    { title: 'Operating Systems (Learning)', code: 'CSE-301', icon: '💿' },
    { title: 'Machine Learning Fundamentals', code: 'CSE-302', icon: '🤖' },
    { title: 'Engineering Mathematics', code: 'MTH-101', icon: '📐' },
  ];

  // Core competencies list
  const coreCompetencies = [
    'Object-Oriented Programming',
    'Analytical Thinking',
    'Logical Reasoning',
    'Problem Solving',
    'Continuous Learning',
    'Adaptability',
    'Team Collaboration',
    'Effective Communication',
    'Time Management',
    'Research Mindset',
  ];

  // Map category header icons
  const getCategoryIcon = (title: string) => {
    if (title.toLowerCase().includes('programming')) {
      return <Code size={20} className="text-neutral-600 dark:text-neutral-400" />;
    }
    if (title.toLowerCase().includes('oop')) {
      return <Brain size={20} className="text-neutral-600 dark:text-neutral-400" />;
    }
    if (title.toLowerCase().includes('cyber') || title.toLowerCase().includes('system')) {
      return <ShieldCheck size={20} className="text-neutral-600 dark:text-neutral-400" />;
    }
    return <Wrench size={20} className="text-neutral-600 dark:text-neutral-400" />;
  };

  return (
    <section id="skills" className="py-24 border-t border-neutral-200/20 dark:border-neutral-900/40 bg-neutral-50/10 dark:bg-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xxs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">My Toolkit</h2>
          <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
            Technical Skills & Coursework
          </h3>
          <div className="h-1 w-12 bg-neutral-800 dark:bg-neutral-300 mx-auto mt-4 rounded-full" />
        </div>

        {/* Skills Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white dark:bg-neutral-900/40 border border-neutral-200/40 dark:border-neutral-800/40 rounded-3xl p-6.5 shadow-xs hover:shadow-md transition-all backdrop-blur-sm"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800/60">
                <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800/60">
                  {getCategoryIcon(cat.title)}
                </div>
                <h4 className="text-base font-extrabold text-neutral-800 dark:text-neutral-100 font-sans">
                  {cat.title}
                </h4>
              </div>

              {/* Individual skill bars */}
              <div className="space-y-4.5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center space-x-2">
                        <span className="text-neutral-800 dark:text-neutral-200">{skill.name}</span>
                        <span className="text-[9px] font-black text-neutral-400 bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.2 rounded border border-neutral-100 dark:border-neutral-850 font-mono">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {/* Progress tracking container */}
                    <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-950 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: sIdx * 0.05 }}
                        className="h-full rounded-full bg-gradient-to-r from-neutral-800 via-neutral-550 to-neutral-700 dark:from-neutral-400 dark:via-neutral-200 dark:to-neutral-600"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Coursework Block */}
        <div className="mt-20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <BookOpen size={21} />
            </div>
            <h4 className="text-xl font-bold text-neutral-900 dark:text-white">Relevant University Coursework</h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relevantCoursework.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                onMouseEnter={() => audioController.playHover()}
                onClick={() => audioController.playTap()}
                className="bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/40 rounded-2xl p-4.5 shadow-xs hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-600 hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xl">{course.icon}</span>
                  <span className="text-[9px] font-mono font-black tracking-widest text-neutral-450 dark:text-neutral-500">
                    {course.code}
                  </span>
                </div>
                <div className="mt-4">
                  <h5 className="text-xs sm:text-sm font-extrabold text-neutral-800 dark:text-neutral-100 leading-snug">
                    {course.title}
                  </h5>
                  <span className="text-[9px] font-bold text-neutral-450 dark:text-neutral-500 mt-1.5 inline-block font-mono">
                    SOA ITER
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Competencies badges */}
        <div className="mt-20">
          <div className="bg-neutral-100/30 dark:bg-neutral-900/20 border border-neutral-200/40 dark:border-neutral-800/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Sparkles size={16} className="text-neutral-500 dark:text-neutral-400" />
                  <span className="text-xxs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Essential Skills</span>
                </div>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white">Core Professional Competencies</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed">
                  Foundational pillars backing my academic and technical performance.
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-end gap-2.5 max-w-2xl">
                {coreCompetencies.map((comp, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => audioController.playHover()}
                    onClick={() => audioController.playTap()}
                    className="text-xxs font-extrabold text-neutral-700 dark:text-neutral-300 bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/50 dark:border-neutral-800/40 px-3.5 py-1.8 rounded-xl shadow-xs cursor-pointer"
                  >
                    {comp}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
