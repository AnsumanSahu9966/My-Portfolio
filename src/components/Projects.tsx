import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderCode,
  Terminal,
  Play,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Plus,
  Trash2,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  CheckCircle,
  AlertCircle,
  Layers,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import { projectsList } from '../data';
import { Project } from '../types';
import { audioController } from '../lib/audio';

export default function Projects() {
  const [filter, setFilter] = useState<string>('all');
  const [activeSim, setActiveSim] = useState<string | null>(null);

  // Filter projects list
  const filteredProjects = projectsList.filter((proj) => {
    if (filter === 'all') return true;
    return proj.category === filter;
  });

  // Get gradient border / icon background for card categories
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'academic':
        return 'from-neutral-700 to-neutral-900';
      case 'dsa':
        return 'from-neutral-800 to-zinc-950';
      case 'showcase':
        return 'from-zinc-700 to-neutral-800';
      case 'utility':
        return 'from-neutral-600 to-zinc-800';
      default:
        return 'from-neutral-500 to-neutral-700';
    }
  };

  return (
    <section id="projects" className="py-24 border-t border-neutral-200/20 dark:border-neutral-900/40 bg-neutral-50/10 dark:bg-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xxs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">My Codecraft</h2>
          <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
            Academic Projects & Toolkits
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3">
            A comprehensive showcase of custom-implemented Java software engineering. Click <span className="font-bold text-neutral-950 dark:text-white">Launch Simulation</span> on any project card to interact with real algorithms and data structures in real time.
          </p>
          <div className="h-1 w-12 bg-neutral-800 dark:bg-neutral-300 mx-auto mt-4 rounded-full" />
        </div>

        {/* Project Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { name: 'All Work', id: 'all' },
            { name: 'Singly Linked Lists', id: 'academic' },
            { name: 'DSA Toolkits', id: 'dsa' },
            { name: 'OOP Showcases', id: 'showcase' },
            { name: 'Utility Suites', id: 'utility' },
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

        {/* Projects Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Projects List column */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isSelected = activeSim === project.id;
                const theme = getCategoryTheme(project.category);
                
                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 p-6 backdrop-blur-sm transform-gpu hover:scale-[1.015] hover:-translate-y-0.5 ${
                      isSelected
                        ? 'border-neutral-800 dark:border-neutral-300 bg-neutral-100/50 dark:bg-neutral-900/40 ring-1 ring-neutral-800/30 shadow-lg shadow-neutral-500/5'
                        : 'border-neutral-200/50 dark:border-neutral-800/40 bg-neutral-50/10 dark:bg-neutral-900/10 hover:border-neutral-300 dark:hover:border-neutral-750 hover:bg-white dark:hover:bg-neutral-900/30 hover:shadow-xl'
                    }`}
                  >
                    {/* Category color tab */}
                    <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${theme}`} />

                    <div className="space-y-4 pl-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                            {project.category} Project
                          </span>
                          <h4 className="text-lg font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                            {project.title}
                          </h4>
                        </div>
                        
                        <button
                          onClick={() => {
                            audioController.playTap();
                            setActiveSim(isSelected ? null : project.id);
                          }}
                          onMouseEnter={() => audioController.playHover()}
                          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xxs font-extrabold tracking-wide uppercase border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-neutral-950 border-neutral-950 text-white dark:bg-neutral-100 dark:border-neutral-100 dark:text-neutral-950 shadow-md'
                              : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-850 text-neutral-700 dark:text-neutral-300 hover:border-neutral-450 hover:text-neutral-950 dark:hover:text-white'
                          }`}
                        >
                          <Terminal size={12} className={isSelected ? 'animate-pulse' : ''} />
                          <span>{isSelected ? 'Active Sim' : 'Launch Sim'}</span>
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-450 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-extrabold text-neutral-700 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200/20 dark:border-neutral-750/50 px-2.5 py-1 rounded-xl"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Skills learned */}
                      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
                        <span className="text-[9px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block mb-2">
                          Skills Demonstrated
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {project.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="text-xxs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-150/50 dark:bg-neutral-800/80 border border-neutral-200/40 dark:border-neutral-700/50 px-2 py-0.5 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Interactive Simulation Console (Right Column) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 shadow-2xl text-neutral-100 min-h-[500px] flex flex-col">
              
              {/* Terminal Window Header */}
              <div className="bg-neutral-900 px-5 py-3.5 flex items-center justify-between border-b border-neutral-800/80">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                  <div className="w-3 h-3 rounded-full bg-neutral-500" />
                  <div className="w-3 h-3 rounded-full bg-neutral-300" />
                  <span className="text-xxs font-bold text-neutral-400 font-mono pl-3">Java compiler (v22.0) - virtual-jvm</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="inline-block px-2 py-0.5 rounded bg-neutral-800 text-[9px] font-black font-mono tracking-widest text-emerald-400 animate-pulse">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Terminal Screen Body */}
              <div className="flex-1 p-6 font-mono text-xs overflow-y-auto space-y-6 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {activeSim ? (
                    <div className="flex-1 flex flex-col h-full justify-between">
                      {activeSim === 'student-record' && <StudentRecordSimulator />}
                      {activeSim === 'dsa-toolkit' && <DsaToolkitSimulator />}
                      {activeSim === 'java-oop-showcase' && <OopShowcaseSimulator />}
                      {activeSim === 'generic-library' && <GenericLibrarySimulator />}
                      {activeSim === 'java-utility-suite' && <UtilitySuiteSimulator />}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-16"
                    >
                      <div className="p-4 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800 animate-bounce">
                        <Terminal size={32} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-black text-white uppercase tracking-wider">
                          Select a Project
                        </p>
                        <p className="text-xxs text-neutral-400 max-w-xs mx-auto leading-relaxed font-mono">
                          Click "Launch Sim" on any card on the left to fire up the interactive Java runtime compiler simulator and visualizer.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* ============================================================================
   1. STUDENT RECORD SYSTEM SIMULATOR (Singly Linked List Visualizer)
   ============================================================================ */
function StudentRecordSimulator() {
  interface Student {
    id: number;
    name: string;
    cgpa: number;
  }

  const [students, setStudents] = useState<Student[]>([
    { id: 101, name: 'Ansuman Sahu', cgpa: 9.8 },
    { id: 102, name: 'Aryan Raj', cgpa: 7.9 },
    { id: 103, name: 'Prerna Das', cgpa: 8.6 },
  ]);

  const [newName, setNewName] = useState('');
  const [newCgpa, setNewCgpa] = useState('');
  const [log, setLog] = useState<string>('Singly Linked List initialized containing 3 elements.');
  const [highlightTopper, setHighlightTopper] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const addStudent = () => {
    if (!newName || !newCgpa) {
      setLog('⚠️ Error: Name and CGPA are required fields!');
      return;
    }
    const cgpaNum = parseFloat(newCgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      setLog('⚠️ Error: CGPA must be a decimal between 0.0 and 10.0!');
      return;
    }
    const nextId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 101;
    const newStudent = { id: nextId, name: newName, cgpa: cgpaNum };
    
    setStudents([...students, newStudent]);
    setNewName('');
    setNewCgpa('');
    setHighlightTopper(false);
    setLog(`✅ Node[ID: ${nextId}, Data: ${newName}] inserted successfully at end of Singly Linked List.`);
  };

  const deleteStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
    setLog(`🗑️ Node[ID: ${id}] pointer unlinked and removed. Garbage Collector will reclaim memory.`);
  };

  const findTopper = () => {
    if (students.length === 0) {
      setLog('⚠️ Singly Linked List is empty!');
      return;
    }
    const maxVal = Math.max(...students.map((s) => s.cgpa));
    const top = students.find((s) => s.cgpa === maxVal);
    setHighlightTopper(true);
    setLog(`Traversing: traversal completed! Found highest CGPA node: ${top?.name} (CGPA: ${top?.cgpa}).`);
  };

  const reverseList = () => {
    if (students.length <= 1) {
      setLog('⚠️ Not enough elements in the list to reverse!');
      return;
    }
    setStudents([...students].reverse());
    setIsReversed(!isReversed);
    setLog('🔄 list.reverse() called. Rearranged previous -> next pointer mappings in constant space.');
  };

  const getStats = () => {
    if (students.length === 0) {
      setLog('⚠️ No records to calculate stats.');
      return;
    }
    const sum = students.reduce((acc, curr) => acc + curr.cgpa, 0);
    const avg = (sum / students.length).toFixed(2);
    setLog(`Performance Statistics: Records Total: ${students.length} | Average CGPA: ${avg}/10`);
  };

  const resetAll = () => {
    setStudents([
      { id: 101, name: 'Ansuman Sahu', cgpa: 9.8 },
      { id: 102, name: 'Aryan Raj', cgpa: 7.9 },
      { id: 103, name: 'Prerna Das', cgpa: 8.6 },
    ]);
    setIsReversed(false);
    setHighlightTopper(false);
    setLog('🔄 Singly Linked List reset to standard compilation initial values.');
  };

  const topper = students.reduce((max, s) => (s.cgpa > max.cgpa ? s : max), { cgpa: 0 } as Student);

  return (
    <div className="space-y-4 flex flex-col justify-between h-full flex-1">
      
      {/* Console log display */}
      <div className="bg-black/40 p-3 rounded-xl border border-neutral-800 text-[10px] text-neutral-300 font-mono">
        <span className="text-neutral-450">root@ansuman:~$</span> java StudentRecordSystem
        <div className="mt-1.5 text-neutral-200 font-bold">{log}</div>
      </div>

      {/* Linked List Visualizer */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-neutral-450 uppercase tracking-wider block font-mono">Singly Linked List Node Map:</span>
        <div className="bg-black/60 p-4 rounded-2xl border border-neutral-850 flex flex-wrap items-center justify-start gap-y-4 gap-x-1.5 min-h-[90px]">
          {students.length > 0 ? (
            students.map((stud, idx) => {
              const isTopperNode = highlightTopper && stud.id === topper.id;
              return (
                <div key={stud.id} className="flex items-center">
                  
                  {/* Node representation */}
                  <motion.div
                    layout
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`p-3.5 rounded-xl border flex flex-col space-y-0.5 text-center transition-all ${
                      isTopperNode
                        ? 'bg-neutral-100 border-white text-black font-black scale-105 shadow-md'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-200'
                    }`}
                  >
                    <span className="text-[8px] font-mono text-neutral-500">Node @{stud.id}</span>
                    <span className="text-[10px] font-black tracking-tight font-mono">{stud.name}</span>
                    <span className="text-[10px] font-bold text-neutral-450 font-mono">{stud.cgpa} CGPA</span>
                    <button
                      onClick={() => {
                        audioController.playTap();
                        deleteStudent(stud.id);
                      }}
                      onMouseEnter={() => audioController.playHover()}
                      className="text-[8px] font-black text-neutral-450 hover:text-white hover:underline pt-1.5"
                    >
                      [Unlink]
                    </button>
                  </motion.div>

                  {/* Arrow pointer representation */}
                  <div className="flex items-center text-neutral-600 font-mono text-[9px] px-0.5">
                    <ChevronRight size={14} className="text-neutral-500" />
                  </div>

                </div>
              );
            })
          ) : (
            <span className="text-neutral-500 text-xxs italic font-mono">head -&gt; NULL (Empty List)</span>
          )}
          <div className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-600 text-[10px] font-mono font-bold text-center">
            NULL
          </div>
        </div>
      </div>

      {/* Control panel buttons */}
      <div className="space-y-3.5">
        
        {/* Input Form */}
        <div className="grid grid-cols-12 gap-2">
          <input
            type="text"
            placeholder="Student Name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onFocus={() => audioController.playHover()}
            className="col-span-6 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xxs text-white focus:outline-none focus:ring-1 focus:ring-neutral-500 font-mono"
          />
          <input
            type="text"
            placeholder="CGPA (eg. 8.5)"
            value={newCgpa}
            onChange={(e) => setNewCgpa(e.target.value)}
            onFocus={() => audioController.playHover()}
            className="col-span-3 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xxs text-white focus:outline-none focus:ring-1 focus:ring-neutral-500 font-mono"
          />
          <button
            onClick={() => {
              audioController.playTap();
              addStudent();
            }}
            onMouseEnter={() => audioController.playHover()}
            className="col-span-3 bg-neutral-100 hover:bg-white text-black font-bold rounded-xl text-[10px] uppercase flex items-center justify-center space-x-1 cursor-pointer"
          >
            <Plus size={10} />
            <span>Add Node</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => {
              audioController.playTap();
              findTopper();
            }}
            onMouseEnter={() => audioController.playHover()}
            className="px-2.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-[9px] font-black uppercase tracking-wide flex items-center justify-center space-x-1 cursor-pointer text-white"
          >
            <Award size={10} />
            <span>Find Topper</span>
          </button>
          <button
            onClick={() => {
              audioController.playTap();
              reverseList();
            }}
            onMouseEnter={() => audioController.playHover()}
            className="px-2.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-[9px] font-black uppercase tracking-wide flex items-center justify-center space-x-1 cursor-pointer text-neutral-300"
          >
            <RefreshCw size={10} />
            <span>Reverse SLL</span>
          </button>
          <button
            onClick={() => {
              audioController.playTap();
              getStats();
            }}
            onMouseEnter={() => audioController.playHover()}
            className="px-2.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-[9px] font-black uppercase tracking-wide flex items-center justify-center space-x-1 cursor-pointer text-neutral-400"
          >
            <Layers size={10} />
            <span>Get Stats</span>
          </button>
          <button
            onClick={() => {
              audioController.playTap();
              resetAll();
            }}
            onMouseEnter={() => audioController.playHover()}
            className="px-2.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-[9px] font-black uppercase tracking-wide flex items-center justify-center space-x-1 cursor-pointer text-neutral-500"
          >
            <RotateCcw size={10} />
            <span>Reset List</span>
          </button>
        </div>
      </div>

    </div>
  );
}

/* ============================================================================
   2. DSA TOOLKIT SIMULATOR (Stack & Queue Visualizers)
   ============================================================================ */
function DsaToolkitSimulator() {
  const [selectedAdt, setSelectedAdt] = useState<'stack' | 'queue'>('stack');
  const [stackData, setStackData] = useState<string[]>(['Node_C', 'Node_B', 'Node_A']);
  const [queueData, setQueueData] = useState<string[]>(['Queue_Front', 'Queue_Middle', 'Queue_Rear']);
  const [inputVal, setInputVal] = useState('');
  const [log, setLog] = useState('Data Structures Toolkit loaded. Choose STACK or QUEUE ADT below.');

  const handlePush = () => {
    if (!inputVal) return;
    if (stackData.length >= 5) {
      setLog('⚠️ Stack Overflow! Virtual limit reached to keep visualizer clean.');
      return;
    }
    setStackData([inputVal, ...stackData]);
    setLog(`📥 pushed(${inputVal}) successfully onto Stack. Decremented top memory address pointer.`);
    setInputVal('');
  };

  const handlePop = () => {
    if (stackData.length === 0) {
      setLog('⚠️ Stack Underflow! Cannot pop from an empty Stack structure.');
      return;
    }
    const popped = stackData[0];
    setStackData(stackData.slice(1));
    setLog(`📤 popped() returned element "${popped}". Incremented top memory pointer.`);
  };

  const handleEnqueue = () => {
    if (!inputVal) return;
    if (queueData.length >= 5) {
      setLog('⚠️ Queue full! Dequeue elements to clear space.');
      return;
    }
    setQueueData([...queueData, inputVal]);
    setLog(`📥 enqueue("${inputVal}") inserted at the REAR pointer boundary of the circular queue.`);
    setInputVal('');
  };

  const handleDequeue = () => {
    if (queueData.length === 0) {
      setLog('⚠️ Queue Underflow! No items in the queue to process.');
      return;
    }
    const dequeued = queueData[0];
    setQueueData(queueData.slice(1));
    setLog(`📤 dequeue() processed element "${dequeued}" from the FRONT pointer boundary.`);
    setInputVal('');
  };

  return (
    <div className="space-y-4 flex flex-col justify-between h-full flex-1 font-mono">
      
      {/* Switcher */}
      <div className="flex bg-neutral-900 p-1.5 rounded-xl border border-neutral-800">
        <button
          onClick={() => {
            audioController.playTap();
            setSelectedAdt('stack');
            setLog('Switched to STACK (Last In First Out) array representation.');
          }}
          onMouseEnter={() => audioController.playHover()}
          className={`flex-1 text-center py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${
            selectedAdt === 'stack' ? 'bg-neutral-100 text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Stack ADT
        </button>
        <button
          onClick={() => {
            audioController.playTap();
            setSelectedAdt('queue');
            setLog('Switched to QUEUE (First In First Out) circular representation.');
          }}
          onMouseEnter={() => audioController.playHover()}
          className={`flex-1 text-center py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${
            selectedAdt === 'queue' ? 'bg-neutral-100 text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Queue ADT
        </button>
      </div>

      {/* Terminal log */}
      <div className="bg-black/50 p-3 rounded-xl border border-neutral-800 text-[10px] text-neutral-300">
        <span className="text-neutral-400">root@ansuman:~$</span> java DsaToolkit {selectedAdt.toUpperCase()}
        <div className="mt-1.5 text-neutral-300 font-bold">{log}</div>
      </div>

      {/* Visual representations */}
      <div className="flex-1 flex flex-col justify-center py-2 bg-neutral-900/60 rounded-2xl border border-neutral-850 min-h-[160px]">
        {selectedAdt === 'stack' ? (
          /* STACK VISUALIZER (Vertical stack) */
          <div className="flex flex-col items-center justify-end h-full space-y-1.5 px-6">
            <AnimatePresence>
              {stackData.map((el, index) => (
                <motion.div
                  key={el + index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  className={`w-full max-w-[200px] py-2 px-4 rounded-xl text-center font-bold text-xxs border flex items-center justify-between ${
                    index === 0
                      ? 'bg-neutral-100 border-white text-black shadow-md'
                      : 'bg-neutral-950 border-neutral-850 text-neutral-400'
                  }`}
                >
                  <span className="text-[9px] opacity-50">Index {stackData.length - 1 - index}</span>
                  <span>{el}</span>
                  <span className="text-[9px] font-bold text-neutral-500">{index === 0 ? '← TOP' : ''}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {stackData.length === 0 && (
              <span className="text-neutral-500 text-xxs italic">Empty Stack [Underflow]</span>
            )}
          </div>
        ) : (
          /* QUEUE VISUALIZER (Horizontal line) */
          <div className="flex flex-row items-center justify-center h-full space-x-1.5 px-6">
            <AnimatePresence>
              {queueData.map((el, index) => (
                <motion.div
                  key={el + index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  className={`p-3 rounded-xl border flex flex-col text-center min-w-[75px] ${
                    index === 0
                      ? 'bg-neutral-100 border-white text-black'
                      : index === queueData.length - 1
                      ? 'bg-neutral-800 border-neutral-700 text-neutral-200'
                      : 'bg-neutral-950 border-neutral-850 text-neutral-500'
                  }`}
                >
                  <span className="text-[10px] font-bold">{el}</span>
                  <span className="text-[7px] font-mono opacity-60 mt-1 uppercase">
                    {index === 0 ? '← FRONT' : index === queueData.length - 1 ? '← REAR' : 'In-Line'}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {queueData.length === 0 && (
              <span className="text-neutral-500 text-xxs italic">Empty Queue [Underflow]</span>
            )}
          </div>
        )}
      </div>

      {/* Control elements */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Value (e.g. Node_Data)"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onFocus={() => audioController.playHover()}
          className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xxs text-white focus:outline-none"
        />
        {selectedAdt === 'stack' ? (
          <>
            <button
              onClick={() => {
                audioController.playTap();
                handlePush();
              }}
              onMouseEnter={() => audioController.playHover()}
              className="px-4 py-2 bg-neutral-100 hover:bg-white text-black font-bold rounded-xl text-xxs uppercase cursor-pointer"
            >
              Push
            </button>
            <button
              onClick={() => {
                audioController.playTap();
                handlePop();
              }}
              onMouseEnter={() => audioController.playHover()}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 font-bold border border-neutral-700 rounded-xl text-xxs uppercase cursor-pointer"
            >
              Pop
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                audioController.playTap();
                handleEnqueue();
              }}
              onMouseEnter={() => audioController.playHover()}
              className="px-4 py-2 bg-neutral-100 hover:bg-white text-black font-bold rounded-xl text-xxs uppercase cursor-pointer"
            >
              Enqueue
            </button>
            <button
              onClick={() => {
                audioController.playTap();
                handleDequeue();
              }}
              onMouseEnter={() => audioController.playHover()}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 font-bold border border-neutral-700 rounded-xl text-xxs uppercase cursor-pointer"
            >
              Dequeue
            </button>
          </>
        )}
      </div>

    </div>
  );
}

/* ============================================================================
   3. JAVA OOP SHOWCASE SIMULATOR (Polymorphism & Abstraction Visualizer)
   ============================================================================ */
function OopShowcaseSimulator() {
  const [selectedSub, setSelectedSub] = useState<'shape' | 'duck' | 'vehicle'>('shape');
  const [log, setLog] = useState('Select an entity above to visualize Object-Oriented Polymorphism, abstraction and overriding.');
  const [actionOutput, setActionOutput] = useState<{ speak: string; motion: string } | null>(null);

  return (
    <div className="space-y-4 flex flex-col justify-between h-full flex-1 font-mono">
      
      {/* Sub tabs */}
      <div className="flex bg-neutral-900 p-1.5 rounded-xl border border-neutral-800">
        {['Shape', 'Duck', 'Vehicle'].map((item) => (
          <button
            key={item}
            onClick={() => {
              audioController.playTap();
              setSelectedSub(item.toLowerCase() as 'shape' | 'duck' | 'vehicle');
              setActionOutput(null);
              setLog(`Selected OOP Category: ${item}. Simulating base abstract classes and polymorphic implementations.`);
            }}
            onMouseEnter={() => audioController.playHover()}
            className={`flex-1 text-center py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${
              selectedSub === item.toLowerCase()
                ? 'bg-neutral-100 text-black shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Terminal logs */}
      <div className="bg-black/50 p-3 rounded-xl border border-neutral-800 text-[10px] text-neutral-300">
        <span className="text-neutral-450">root@ansuman:~$</span> java PolymorphicShowcase {selectedSub.toUpperCase()}
        <div className="mt-1.5 text-neutral-200 font-bold">{log}</div>
      </div>

      {/* Main Sandbox Interactive Block */}
      <div className="flex-1 bg-neutral-900/40 p-4.5 rounded-2xl border border-neutral-800 flex flex-col items-center justify-center space-y-4 min-h-[160px]">
        {selectedSub === 'shape' && (
          <div className="space-y-4 w-full">
            <span className="text-[10px] font-bold text-neutral-450 block text-center">Polymorphism: Shape obj = new [ShapeType](...);</span>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  audioController.playTap();
                  setActionOutput({ speak: 'Shape obj = new Circle(7.0);', motion: 'obj.draw() -> ⭕ Rendering a Circle.\nobj.calculateArea() -> Area = 153.94 sq units.' });
                  setLog('Instantiated Circle class overriding standard draw() and calculateArea() methods.');
                }}
                onMouseEnter={() => audioController.playHover()}
                className="px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-xxs font-bold text-white uppercase cursor-pointer"
              >
                Circle Instance
              </button>
              <button
                onClick={() => {
                  audioController.playTap();
                  setActionOutput({ speak: 'Shape obj = new Rectangle(5.0, 10.0);', motion: 'obj.draw() -> ▭ Rendering a Rectangle.\nobj.calculateArea() -> Area = 50.00 sq units.' });
                  setLog('Instantiated Rectangle class overriding abstract area calculating methods.');
                }}
                onMouseEnter={() => audioController.playHover()}
                className="px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-xxs font-bold text-white uppercase cursor-pointer"
              >
                Rectangle Instance
              </button>
            </div>
          </div>
        )}

        {selectedSub === 'duck' && (
          <div className="space-y-4 w-full">
            <span className="text-[10px] font-bold text-neutral-450 block text-center">Overriding: Duck d = new [DuckType](); d.performQuack();</span>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => {
                  audioController.playTap();
                  setActionOutput({ speak: 'Duck d = new MallardDuck();', motion: 'd.quack() -> 🦆 "QUACK! QUACK!" (Vocalized quack)\nd.fly() -> 🪶 "Flapping wings gracefully up in sky!"' });
                  setLog('MallardDuck inherits Duck class, overriding standard fly() and quack() behaviors.');
                }}
                onMouseEnter={() => audioController.playHover()}
                className="px-3 py-2 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-xxs font-bold text-white uppercase cursor-pointer"
              >
                Mallard Duck
              </button>
              <button
                onClick={() => {
                  audioController.playTap();
                  setActionOutput({ speak: 'Duck d = new RubberDuck();', motion: 'd.quack() -> 🧸 "Squeak! Squeak!" (Toy squeak)\nd.fly() -> ❌ "Cannot fly! (Sinks silently into bath tub)"' });
                  setLog('RubberDuck overrides fly() with FlyNoWay behavior, exhibiting loose Strategy Pattern.');
                }}
                onMouseEnter={() => audioController.playHover()}
                className="px-3 py-2 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-xxs font-bold text-white uppercase cursor-pointer"
              >
                Rubber Duck
              </button>
            </div>
          </div>
        )}

        {selectedSub === 'vehicle' && (
          <div className="space-y-4 w-full">
            <span className="text-[10px] font-bold text-neutral-450 block text-center">Inheritance: Vehicle v = new [VehicleType]();</span>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => {
                  audioController.playTap();
                  setActionOutput({ speak: 'Vehicle v = new SportsCar();', motion: 'v.startEngine() -> 🏎️ "VROOOM! Petrol engine roars!"\nv.drive() -> "Sprinting from 0-100 km/h in 3.1s."' });
                  setLog('SportsCar overrides abstract engine mechanics, triggering internal combustion model.');
                }}
                onMouseEnter={() => audioController.playHover()}
                className="px-3 py-2 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-xxs font-bold text-white uppercase cursor-pointer"
              >
                Sports Car
              </button>
              <button
                onClick={() => {
                  audioController.playTap();
                  setActionOutput({ speak: 'Vehicle v = new ElectricCar();', motion: 'v.startEngine() -> ⚡ "Silent hum! Battery relays activated!"\nv.drive() -> "Instant electric torque dispatched to all 4 wheels."' });
                  setLog('ElectricCar extends Vehicle class, adapting drive() for direct current vectorization.');
                }}
                onMouseEnter={() => audioController.playHover()}
                className="px-3 py-2 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-xxs font-bold text-white uppercase cursor-pointer"
              >
                Electric Car
              </button>
            </div>
          </div>
        )}

        {/* Console Action Visual text box */}
        <AnimatePresence>
          {actionOutput && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full bg-black/60 p-3 rounded-xl border border-neutral-800 font-mono text-[10px] text-neutral-300 space-y-1.5"
            >
              <div className="text-neutral-500 border-b border-neutral-800 pb-1 font-bold">JVM Stack Allocation trace:</div>
              <div className="text-white font-bold">{actionOutput.speak}</div>
              <div className="whitespace-pre-line text-neutral-300 font-semibold">{actionOutput.motion}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

/* ============================================================================
   4. JAVA GENERIC LIBRARY SIMULATOR (Type-Safe Utilities & Recursive Search)
   ============================================================================ */
function GenericLibrarySimulator() {
  const [selectedType, setSelectedType] = useState<'Integer' | 'String'>('Integer');
  const [arrayData, setArrayData] = useState<any[]>([12, 34, 56, 78, 90]);
  const [searchVal, setSearchVal] = useState('');
  const [log, setLog] = useState('Type-safe Generics Library loaded. Choose array generic type.');

  const handleTypeChange = (type: 'Integer' | 'String') => {
    setSelectedType(type);
    setSearchVal('');
    if (type === 'Integer') {
      setArrayData([12, 34, 56, 78, 90]);
      setLog('Loaded type-safe GenericArrayList<Integer> instance.');
    } else {
      setArrayData(['Apple', 'Banana', 'Cherry', 'Dates', 'Elderberry']);
      setLog('Loaded type-safe GenericArrayList<String> instance.');
    }
  };

  const executeGenericSearch = () => {
    if (!searchVal) return;
    setLog(`🔍 Recursive binarySearch<T>(T target) starting...`);
    
    // Simulate generic search matching
    setTimeout(() => {
      const idx = arrayData.findIndex((el) => el.toString().toLowerCase() === searchVal.toLowerCase());
      if (idx !== -1) {
        setLog(`✅ Target "${searchVal}" found at generic index [${idx}]. Comparison successfully enforced type safety.`);
      } else {
        setLog(`❌ Target "${searchVal}" not found in current GenericArrayList<${selectedType}>.`);
      }
    }, 400);
  };

  const triggerGenericException = () => {
    setLog(`⚠️ java.lang.IndexOutOfBoundsException triggered! Custom Exception Handler captured type mismatch error.`);
  };

  return (
    <div className="space-y-4 flex flex-col justify-between h-full flex-1 font-mono">
      
      {/* Switcher */}
      <div className="flex bg-neutral-900 p-1.5 rounded-xl border border-neutral-800">
        <button
          onClick={() => {
            audioController.playTap();
            handleTypeChange('Integer');
          }}
          onMouseEnter={() => audioController.playHover()}
          className={`flex-1 text-center py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${
            selectedType === 'Integer' ? 'bg-neutral-100 text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          GenericList&lt;Integer&gt;
        </button>
        <button
          onClick={() => {
            audioController.playTap();
            handleTypeChange('String');
          }}
          onMouseEnter={() => audioController.playHover()}
          className={`flex-1 text-center py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${
            selectedType === 'String' ? 'bg-neutral-100 text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          GenericList&lt;String&gt;
        </button>
      </div>

      {/* Terminal log */}
      <div className="bg-black/50 p-3 rounded-xl border border-neutral-800 text-[10px] text-neutral-300">
        <span className="text-neutral-450">root@ansuman:~$</span> java GenericUtilityLibrary
        <div className="mt-1.5 text-neutral-300 font-bold">{log}</div>
      </div>

      {/* Visual representation of type-safe heap storage */}
      <div className="bg-neutral-900/40 p-4 rounded-2xl border border-neutral-800 text-center space-y-3">
        <span className="text-[9px] font-bold text-neutral-450 uppercase tracking-wider block">
          Generic Heap Storage Representation [Heap&lt;{selectedType}&gt;]:
        </span>
        <div className="flex justify-center space-x-1.5">
          {arrayData.map((val, idx) => (
            <div key={idx} className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-950 font-mono text-xxs text-neutral-200">
              <span className="block text-[8px] text-neutral-500">[{idx}]</span>
              <span className="font-extrabold">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input query and Exception button */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={selectedType === 'Integer' ? "Type integer (eg. 56)" : "Type string (eg. Cherry)"}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onFocus={() => audioController.playHover()}
            className="flex-1 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xxs text-white"
          />
          <button
            onClick={() => {
              audioController.playTap();
              executeGenericSearch();
            }}
            onMouseEnter={() => audioController.playHover()}
            className="px-4 py-2 bg-neutral-100 hover:bg-white text-black font-bold rounded-xl text-xxs uppercase cursor-pointer"
          >
            Type-Safe Find
          </button>
        </div>

        <button
          onClick={() => {
            audioController.playTap();
            triggerGenericException();
          }}
          onMouseEnter={() => audioController.playHover()}
          className="w-full py-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-350 font-bold border border-neutral-800 rounded-xl text-xxs uppercase cursor-pointer"
        >
          Simulate Generic Exception Throw
        </button>
      </div>

    </div>
  );
}

/* ============================================================================
   5. JAVA UTILITY SUITE SIMULATOR (Interactive Calculator & Password Checker)
   ============================================================================ */
function UtilitySuiteSimulator() {
  const [selectedTool, setSelectedTool] = useState<'calc' | 'pwd' | 'palindrome'>('calc');
  const [log, setLog] = useState('Utility Suite ready. Choose interactive application.');
  
  // Math tool states
  const [mathInput, setMathInput] = useState('');
  const [calcResult, setCalcResult] = useState<string | null>(null);

  // Password Strength states
  const [password, setPassword] = useState('');

  // Palindrome states
  const [strInput, setStrInput] = useState('');
  const [isPal, setIsPal] = useState<boolean | null>(null);

  const calculateResult = () => {
    try {
      // Simple safe evaluation replacing standard expressions
      const result = eval(mathInput.replace(/[^0-9+\-*/().]/g, ''));
      if (result !== undefined && !isNaN(result)) {
        setCalcResult(result.toString());
        setLog(`✅ Math engine evaluation success! Expression returned: ${result}`);
      } else {
        setCalcResult('Error');
        setLog('⚠️ Parsing error: Invalid mathematical expression format.');
      }
    } catch {
      setCalcResult('Error');
      setLog('⚠️ Exception in thread "main" java.lang.ArithmeticException');
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { label: 'Empty', color: 'text-neutral-500', pct: 0 };
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    if (score === 25) return { label: 'WEAK', color: 'text-neutral-500', pct: 25 };
    if (score === 50) return { label: 'MEDIUM', color: 'text-neutral-300', pct: 50 };
    if (score === 75) return { label: 'GOOD', color: 'text-neutral-200', pct: 75 };
    if (score === 100) return { label: 'STRONG', color: 'text-white font-extrabold', pct: 100 };
    return { label: 'VERY WEAK', color: 'text-neutral-600', pct: 10 };
  };

  const checkPalindrome = () => {
    if (!strInput) return;
    const clean = strInput.toLowerCase().replace(/[^a-z0-9]/g, '');
    const rev = clean.split('').reverse().join('');
    const result = clean === rev;
    setIsPal(result);
    setLog(`🔤 Palindrome Checker: "${strInput}" is ${result ? 'SUCCESSFULLY' : 'NOT'} a palindrome.`);
  };

  const pwdStrength = getPasswordStrength();

  return (
    <div className="space-y-4 flex flex-col justify-between h-full flex-1 font-mono">
      
      {/* Sub tabs */}
      <div className="flex bg-neutral-900 p-1.5 rounded-xl border border-neutral-800">
        {[
          { label: 'Calculator', id: 'calc' },
          { label: 'PWD strength', id: 'pwd' },
          { label: 'Palindrome', id: 'palindrome' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              audioController.playTap();
              setSelectedTool(item.id as 'calc' | 'pwd' | 'palindrome');
              setLog(`Selected utility sub-app: ${item.label}.`);
            }}
            onMouseEnter={() => audioController.playHover()}
            className={`flex-1 text-center py-1.5 rounded-lg text-xxs font-bold uppercase transition-all cursor-pointer ${
              selectedTool === item.id ? 'bg-neutral-100 text-black shadow-xs' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Terminal logs */}
      <div className="bg-black/50 p-3 rounded-xl border border-neutral-800 text-[10px] text-neutral-300">
        <span className="text-neutral-450">root@ansuman:~$</span> java UtilitySuite {selectedTool.toUpperCase()}
        <div className="mt-1.5 text-neutral-300 font-bold">{log}</div>
      </div>

      {/* Interactive Tool Area */}
      <div className="flex-1 bg-neutral-900/40 p-4 rounded-2xl border border-neutral-800 flex flex-col justify-center min-h-[165px]">
        {selectedTool === 'calc' && (
          <div className="space-y-3.5 w-full">
            <span className="text-[10px] font-bold text-neutral-450 text-center block">Scientific Calculator solver:</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Math (eg. 12 * (3 + 5))"
                value={mathInput}
                onChange={(e) => setMathInput(e.target.value)}
                onFocus={() => audioController.playHover()}
                className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xxs text-white"
              />
              <button
                onClick={() => {
                  audioController.playTap();
                  calculateResult();
                }}
                onMouseEnter={() => audioController.playHover()}
                className="px-3.5 bg-neutral-100 hover:bg-white text-black font-bold rounded-xl text-xxs uppercase cursor-pointer"
              >
                Solve
              </button>
            </div>
            {calcResult && (
              <div className="p-2 text-center rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-black text-neutral-200">
                OUTPUT RESULT: {calcResult}
              </div>
            )}
          </div>
        )}

        {selectedTool === 'pwd' && (
          <div className="space-y-3.5 w-full">
            <span className="text-[10px] font-bold text-neutral-450 block text-center">Regex Password Strength Validator:</span>
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => audioController.playHover()}
              className="w-full px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xxs text-white"
            />
            
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xxs font-bold">
                <span className="text-neutral-400">Strength Rating:</span>
                <span className={pwdStrength.color}>{pwdStrength.label}</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${pwdStrength.pct}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {selectedTool === 'palindrome' && (
          <div className="space-y-3.5 w-full">
            <span className="text-[10px] font-bold text-neutral-450 block text-center">String Palindrome Validator:</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="String (eg. Racecar)"
                value={strInput}
                onChange={(e) => setStrInput(e.target.value)}
                onFocus={() => audioController.playHover()}
                className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xxs text-white"
              />
              <button
                onClick={() => {
                  audioController.playTap();
                  checkPalindrome();
                }}
                onMouseEnter={() => audioController.playHover()}
                className="px-3.5 bg-neutral-100 hover:bg-white text-black font-bold rounded-xl text-xxs uppercase cursor-pointer"
              >
                Validate
              </button>
            </div>
            {isPal !== null && (
              <div className={`p-2.5 text-center rounded-xl border font-bold text-xxs flex items-center justify-center space-x-1.5 ${
                isPal
                  ? 'bg-neutral-800 border-neutral-700 text-white'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-450'
              }`}>
                {isPal ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                <span>{isPal ? 'String is a Valid Palindrome!' : 'String is NOT a Palindrome.'}</span>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
