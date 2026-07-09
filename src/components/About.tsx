import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Award,
  Users,
  Search,
  ExternalLink,
  Languages,
  Film,
  BookOpen,
  TrendingUp,
  Camera,
  Gamepad2,
  Cpu,
  BookMarked,
} from 'lucide-react';
import { educationHistory, certificationsList, volunteerExp, otherDetails } from '../data';
import { Certification } from '../types';
import { audioController } from '../lib/audio';

export default function About() {
  const [certSearch, setCertSearch] = useState('');
  const [certCategory, setCertCategory] = useState<string>('all');
  const [expandedCert, setExpandedCert] = useState<string | null>(null);

  // Group certificates into custom filter tags
  const getCategory = (cert: Certification): string => {
    const title = cert.title.toLowerCase();
    const issuer = cert.issuer.toLowerCase();
    if (title.includes('ai') || title.includes('prompting') || title.includes('llm') || title.includes('workflows') || title.includes('agents')) return 'ai';
    if (title.includes('cyber') || title.includes('security') || title.includes('networking')) return 'cyber';
    if (issuer.includes('forage') || issuer.includes('simulation') || issuer.includes('datacom')) return 'simulations';
    if (title.includes('nss') || title.includes('participation') || title.includes('codex') || title.includes('acm')) return 'activities';
    return 'other';
  };

  const filteredCerts = certificationsList.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(certSearch.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(certSearch.toLowerCase()) ||
      cert.skills.some((skill) => skill.toLowerCase().includes(certSearch.toLowerCase()));

    const category = getCategory(cert);
    const matchesCategory = certCategory === 'all' || category === certCategory;

    return matchesSearch && matchesCategory;
  });

  // Map icon strings to Lucide components
  const getInterestIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film': return <Film size={20} className="text-neutral-600 dark:text-neutral-400" />;
      case 'BookOpen': return <BookOpen size={20} className="text-neutral-600 dark:text-neutral-400" />;
      case 'TrendingUp': return <TrendingUp size={20} className="text-neutral-600 dark:text-neutral-400" />;
      case 'Camera': return <Camera size={20} className="text-neutral-600 dark:text-neutral-400" />;
      case 'Gamepad2': return <Gamepad2 size={20} className="text-neutral-600 dark:text-neutral-400" />;
      case 'Cpu': return <Cpu size={20} className="text-neutral-600 dark:text-neutral-400" />;
      default: return <Cpu size={20} className="text-neutral-600 dark:text-neutral-400" />;
    }
  };

  const getCertLogo = (logoType: string) => {
    const base = "flex items-center justify-center w-10 h-10 rounded-xl font-bold text-xs shadow-inner backdrop-blur-md border ";
    return <div className={`${base} bg-neutral-100/50 text-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-200 border-neutral-200/40 dark:border-neutral-800/40`}>{logoType.toUpperCase().substring(0, 3)}</div>;
  };

  return (
    <>
      {/* 1. SEPARATE ABOUT SECTION */}
      <section id="about" className="py-24 border-t border-neutral-200/30 dark:border-neutral-900/30 bg-neutral-50/10 dark:bg-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xxs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">My Journey</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
              About Me & Education
            </h3>
            <div className="h-1 w-12 bg-gradient-to-r from-neutral-800 to-neutral-400 dark:from-white dark:to-neutral-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Education */}
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-800/50 shadow-xs">
                    <GraduationCap size={22} />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white">Education</h4>
                </div>

                <div className="relative border-l border-neutral-200 dark:border-neutral-850 pl-6 ml-3 space-y-8">
                  {educationHistory.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Ring indicator */}
                      <div className="absolute -left-9.5 top-1.5 w-7 h-7 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-400 dark:border-neutral-600 flex items-center justify-center shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-600 dark:bg-neutral-400" />
                      </div>

                      <div className="bg-white/40 dark:bg-neutral-900/30 border border-neutral-200/40 dark:border-neutral-800/30 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all backdrop-blur-md">
                        <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800/60 px-2.5 py-1 rounded-full uppercase tracking-wider border border-neutral-200/40 dark:border-neutral-700/30">
                          {edu.duration}
                        </span>
                        <h5 className="text-base font-bold text-neutral-900 dark:text-white mt-3">
                          {edu.degree}
                        </h5>
                        <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300 mt-1">
                          {edu.institution}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center mt-1">
                          📍 {edu.location}
                        </p>
                        
                        {edu.highlights && (
                          <div className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 space-y-1 bg-neutral-100/20 dark:bg-neutral-950/20 p-2.5 rounded-xl border border-neutral-200/30 dark:border-neutral-800/30">
                            {edu.highlights.map((h, i) => (
                              <div key={i} className="flex items-start">
                                <span className="text-neutral-500 mr-1.5">•</span>
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Leadership & Community and Languages */}
            <div className="lg:col-span-6 space-y-10">
              {/* Volunteering (NSS) Sub-section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-800/50 shadow-xs">
                    <Users size={21} />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white">Leadership & Community</h4>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/40 dark:bg-neutral-900/30 border border-neutral-200/40 dark:border-neutral-800/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="text-base font-bold text-neutral-900 dark:text-white">
                      {volunteerExp.role}
                    </h5>
                    <span className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 uppercase">NSS</span>
                  </div>
                  <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-0.5">{volunteerExp.organization}</p>
                  
                  <ul className="mt-4 space-y-2.5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {volunteerExp.description.map((desc, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-neutral-500 mr-2 mt-0.5">✔</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Languages Sub-section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-800/50 shadow-xs">
                    <Languages size={20} />
                  </div>
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white">Languages</h4>
                </div>

                <div className="bg-white/40 dark:bg-neutral-900/30 border border-neutral-200/40 dark:border-neutral-800/30 rounded-2xl p-5 shadow-sm backdrop-blur-md grid grid-cols-2 gap-4">
                  {otherDetails.languages.map((lang, i) => (
                    <div key={i} className="p-2 rounded-xl bg-neutral-100/20 dark:bg-neutral-950/30 border border-neutral-200/20 dark:border-neutral-800/20">
                      <span className="block text-sm font-bold text-neutral-800 dark:text-white">{lang.name}</span>
                      <span className="text-xxs text-neutral-500 dark:text-neutral-400">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Hobbies & Interests Grid at the bottom of About */}
          <div className="mt-20">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-800/50 shadow-xs">
                <BookMarked size={21} />
              </div>
              <h4 className="text-xl font-bold text-neutral-900 dark:text-white">Hobbies & Personal Interests</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherDetails.interests.map((interest, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white/40 dark:bg-neutral-900/30 border border-neutral-200/40 dark:border-neutral-800/30 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-700 hover:-translate-y-0.5 transition-all flex items-start space-x-4 backdrop-blur-md"
                >
                  <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/30 dark:border-neutral-800/30 flex-shrink-0">
                    {getInterestIcon(interest.icon)}
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-neutral-800 dark:text-neutral-100 leading-snug">
                      {interest.name}
                    </h5>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                      {interest.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. SEPARATE CERTIFICATES SECTION */}
      <section id="certificates" className="py-24 border-t border-neutral-200/30 dark:border-neutral-900/30 bg-neutral-50/5 dark:bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xxs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">Verified Badges</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
              Certifications & Training
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">Total of {certificationsList.length} accredited digital certificates</p>
            <div className="h-1 w-12 bg-gradient-to-r from-neutral-800 to-neutral-400 dark:from-white dark:to-neutral-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Search and Category Filter Toolbar */}
            <div className="bg-white/40 dark:bg-neutral-900/30 border border-neutral-200/40 dark:border-neutral-800/30 rounded-2xl p-4 shadow-sm space-y-3 backdrop-blur-md">
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 text-neutral-450 dark:text-neutral-500" size={16} />
                <input
                  type="text"
                  placeholder="Search certificate title, issuer or skills..."
                  value={certSearch}
                  onChange={(e) => setCertSearch(e.target.value)}
                  onFocus={() => audioController.playHover()}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-100/30 dark:bg-neutral-950/40 text-sm text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500/20 transition-all placeholder:text-neutral-450 dark:placeholder:text-neutral-500"
                />
              </div>

              {/* Categorization Quick Filters */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { name: 'All Badges', id: 'all' },
                  { name: 'AI & Prompts', id: 'ai' },
                  { name: 'Cybersecurity', id: 'cyber' },
                  { name: 'Job Simulations', id: 'simulations' },
                  { name: 'Activities & Chapters', id: 'activities' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      audioController.playTap();
                      setCertCategory(cat.id);
                    }}
                    onMouseEnter={() => audioController.playHover()}
                    className={`px-3 py-1.5 rounded-xl text-xxs font-bold tracking-wide uppercase transition-all cursor-pointer ${
                      certCategory === cat.id
                        ? 'bg-neutral-950 dark:bg-neutral-100 text-white dark:text-neutral-950 shadow-md border border-neutral-800 dark:border-white'
                        : 'bg-neutral-100/50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 border border-neutral-200/30 dark:border-neutral-800/30'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Certificates List */}
            <div className="space-y-3.5 max-h-[640px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              <AnimatePresence mode="popLayout">
                {filteredCerts.length > 0 ? (
                  filteredCerts.map((cert) => {
                    const isExpanded = expandedCert === cert.id;
                    return (
                      <motion.div
                        layout
                        key={cert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={`group bg-white/40 dark:bg-neutral-900/20 border transition-all duration-300 rounded-2xl p-4.5 cursor-pointer shadow-sm hover:shadow-xl backdrop-blur-md transform-gpu hover:scale-[1.015] hover:-translate-y-0.5 ${
                          isExpanded
                            ? 'border-neutral-800 dark:border-neutral-300 ring-1 ring-neutral-800/30 dark:ring-neutral-300/30'
                            : 'border-neutral-200/50 dark:border-neutral-800/40 hover:border-neutral-300 dark:hover:border-neutral-700'
                        }`}
                        onClick={() => {
                          audioController.playTap();
                          setExpandedCert(isExpanded ? null : cert.id);
                        }}
                        onMouseEnter={() => audioController.playHover()}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Logo badge */}
                          {getCertLogo(cert.logoType)}
  
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-black text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                                {cert.issuer}
                              </span>
                              <span className="text-xxs font-semibold text-neutral-500 dark:text-neutral-400">
                                {cert.issuedDate}
                              </span>
                            </div>
                            <h5 className="text-sm font-extrabold text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors mt-1 leading-snug">
                              {cert.title}
                            </h5>
 
                            {/* Skills teaser */}
                            {!isExpanded && (
                              <div className="flex flex-wrap gap-1 mt-2.5">
                                {cert.skills.slice(0, 3).map((skill, index) => (
                                  <span
                                    key={index}
                                    className="text-[9px] font-bold text-neutral-600 dark:text-neutral-400 bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/20 dark:border-neutral-800/20 px-2 py-0.5 rounded"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {cert.skills.length > 3 && (
                                  <span className="text-[9px] font-extrabold text-neutral-500 dark:text-neutral-450 px-1 mt-0.5">
                                    +{cert.skills.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Collapsible expansion details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: 'auto', opacity: 1, marginTop: 14 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden border-t border-neutral-200/50 dark:border-neutral-800/50 pt-4"
                            >
                              <div className="space-y-3.5">
                                {cert.credentialId && (
                                  <div className="text-xxs font-mono text-neutral-600 dark:text-neutral-400 flex items-center bg-neutral-100/30 dark:bg-neutral-950/30 p-2 rounded-xl border border-neutral-200/30 dark:border-neutral-800/30 w-fit">
                                    <span className="font-bold text-neutral-500 mr-2 uppercase">Credential ID:</span>
                                    <span>{cert.credentialId}</span>
                                  </div>
                                )}

                                <div>
                                  <span className="block text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">
                                    Skills & Experience Gained
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {cert.skills.map((skill, index) => (
                                      <span
                                        key={index}
                                        className="text-xxs font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200/40 dark:border-neutral-800/40 px-2.5 py-1 rounded-xl"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {cert.credentialUrl && (
                                  <div className="flex justify-end pt-1">
                                    <a
                                      href={cert.credentialUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onMouseEnter={() => audioController.playHover()}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        audioController.playTap();
                                      }}
                                      className="text-xxs font-bold text-neutral-800 dark:text-neutral-200 flex items-center space-x-1 hover:underline cursor-pointer bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200/40 dark:border-neutral-800/40 px-3 py-1.5 rounded-xl shadow-xs"
                                    >
                                      <span>View Credential</span>
                                      <ExternalLink size={11} />
                                    </a>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 bg-white/40 dark:bg-neutral-900/20 rounded-2xl border border-dashed border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-md">
                    <p className="text-sm text-neutral-500 dark:text-neutral-450">No certificates found matching your criteria.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
