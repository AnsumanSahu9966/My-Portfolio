import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, MapPin, Github, Linkedin, CheckCircle2, Terminal, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data';
import { audioController } from '../lib/audio';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [sendLogs, setSendLogs] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: false });
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
      message: !formData.message.trim() || formData.message.length < 10,
    };
    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.message;
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSendStatus('sending');
    setSendLogs(['Initializing contact daemon...']);

    const logs = [
      'Establishing TLS handshakes with mailserver...',
      'Validating client credentials and MIME headers...',
      `SMTP Relay: MAIL FROM:<${formData.email}> RCPT TO:<${personalInfo.email}>`,
      'Compiling content blocks and checking payloads...',
    ];

    logs.forEach((logText, idx) => {
      setTimeout(() => {
        setSendLogs((prev) => [...prev, logText]);
      }, (idx + 1) * 600);
    });

    try {
      await emailjs.send(
        'service_ob559qk',
        'template_1vrw6df',
        {
          from_name: formData.name,
          reply_to: formData.email,
          title: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'PCco-iEGPoie95Vqz'
      );

      setTimeout(() => {
        setSendLogs((prev) => [...prev, 'Queue dispatched! Message relayed successfully.']);
        setTimeout(() => {
          setSendStatus('sent');
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 600);
      }, logs.length * 600);
    } catch (error) {
      console.error('Email sending failed:', error);
      setTimeout(() => {
        setSendLogs((prev) => [...prev, 'Error: Connection failed. Please try again later.']);
        setTimeout(() => {
          setSendStatus('idle');
        }, 2000);
      }, logs.length * 600);
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-neutral-200/20 dark:border-neutral-900/40 bg-neutral-50/10 dark:bg-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xxs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">Connect</h2>
          <h3 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
            Get in Touch with Me
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3">
            Open for internships, project collaborations, or technical discussion. Drop a message!
          </p>
          <div className="h-1 w-12 bg-neutral-800 dark:bg-neutral-300 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Direct info details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 order-2 lg:order-1">
            
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-neutral-900 dark:text-white">Contact Information</h4>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Feel free to contact me via email or social media. I usually respond within a few hours.
              </p>

              <div className="space-y-4">
                {/* Email item */}
                <div className="flex items-center space-x-4 p-4.5 rounded-2xl bg-neutral-100/30 dark:bg-neutral-900/40 border border-neutral-200/40 dark:border-neutral-800/40 shadow-xs hover:border-neutral-500/30 transition-all">
                  <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60 shadow-xs">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Email address</span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      onMouseEnter={() => audioController.playHover()}
                      onClick={() => audioController.playTap()}
                      className="text-xs sm:text-sm font-extrabold text-neutral-800 dark:text-neutral-100 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Location item */}
                <div className="flex items-center space-x-4 p-4.5 rounded-2xl bg-neutral-100/30 dark:bg-neutral-900/40 border border-neutral-200/40 dark:border-neutral-800/40 shadow-xs hover:border-neutral-500/30 transition-all">
                  <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700/60 shadow-xs">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Headquarters</span>
                    <span className="text-xs sm:text-sm font-extrabold text-neutral-800 dark:text-neutral-100">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social profiles card */}
            <div className="p-6 rounded-3xl bg-neutral-100/30 dark:bg-neutral-900/40 border border-neutral-200/40 dark:border-neutral-800/40 shadow-xs">
              <span className="block text-[10px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                Other Networks
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => audioController.playHover()}
                  onClick={() => audioController.playTap()}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-800/40 text-[11px] font-bold hover:scale-102 hover:border-black dark:hover:border-white transition-all shadow-sm cursor-pointer"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => audioController.playHover()}
                  onClick={() => audioController.playTap()}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-800/40 text-[11px] font-bold hover:scale-102 hover:border-blue-500 transition-all shadow-sm text-blue-500 cursor-pointer"
                >
                  <Linkedin size={14} className="text-blue-500" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => audioController.playHover()}
                  onClick={() => audioController.playTap()}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-800/40 text-[11px] font-bold hover:scale-102 hover:border-pink-500 transition-all shadow-sm text-pink-500 cursor-pointer"
                >
                  <Instagram size={14} className="text-pink-500" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact form with Glassmorphism */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="h-full bg-neutral-100/20 dark:bg-neutral-900/10 border border-neutral-200/50 dark:border-neutral-800/40 rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-md relative flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {sendStatus === 'idle' && (
                  /* Form Input View */
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xxs font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => audioController.playHover()}
                          placeholder="Example Name - Sam, Ram,...."
                          className={`w-full px-4 py-3 rounded-xl text-xs border bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500/40 transition-all ${
                            formErrors.name ? 'border-rose-500 ring-1 ring-rose-500/20' : 'border-neutral-200 dark:border-neutral-800'
                          }`}
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xxs font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => audioController.playHover()}
                          placeholder="example@gmail.com"
                          className={`w-full px-4 py-3 rounded-xl text-xs border bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500/40 transition-all ${
                            formErrors.email ? 'border-rose-500 ring-1 ring-rose-500/20' : 'border-neutral-200 dark:border-neutral-800'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-xxs font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onFocus={() => audioController.playHover()}
                        placeholder="Enquiring about xyz,..."
                        className="w-full px-4 py-3 rounded-xl text-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500/40 transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xxs font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                        Message Content
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => audioController.playHover()}
                        placeholder="Hi Ansuman, I want to know more about your xyz project,....."
                        className={`w-full px-4 py-3 rounded-xl text-xs border bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500/40 transition-all resize-none ${
                          formErrors.message ? 'border-rose-500 ring-1 ring-rose-500/20' : 'border-neutral-200 dark:border-neutral-800'
                        }`}
                      />
                      {formErrors.message && (
                        <span className="text-[10px] text-rose-500 font-bold block pt-0.5">⚠️ Message must be at least 10 characters.</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      onMouseEnter={() => audioController.playHover()}
                      onClick={() => audioController.playTap()}
                      className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 hover:scale-[1.01] active:scale-[0.99] text-white dark:text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Send size={14} />
                      <span>Transmit Message</span>
                    </button>
                  </motion.form>
                )}

                {sendStatus === 'sending' && (
                  /* Sending Simulator Screen */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 font-mono text-xs text-neutral-300 bg-neutral-950 p-5 rounded-2xl border border-neutral-800"
                  >
                    <div className="flex items-center space-x-2 border-b border-neutral-800 pb-2.5">
                      <Terminal size={14} className="text-neutral-400 animate-pulse" />
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Transmission Shell Console</span>
                    </div>
                    <div className="space-y-1.5 h-[180px] overflow-y-auto font-mono text-xxs scrollbar-none">
                      {sendLogs.map((log, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-neutral-500 mr-2">&gt;</span>
                          <span className="text-emerald-400 font-medium">{log}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center pt-2">
                      <div className="w-5 h-5 rounded-full border-2 border-neutral-800 border-t-neutral-450 animate-spin" />
                    </div>
                  </motion.div>
                )}

                {sendStatus === 'sent' && (
                  /* Success Screen */
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="text-center space-y-4 py-8"
                  >
                    <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 animate-bounce">
                      <CheckCircle2 size={36} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-neutral-900 dark:text-white uppercase tracking-wider">
                        Message Transmitted!
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
                        The simulated mail has successfully relayed directly to Ansuman at <span className="font-semibold text-neutral-800 dark:text-neutral-200">ansuman.slplindia@gmail.com</span>.<br />Thank you for contacting!
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        audioController.playTap();
                        setSendStatus('idle');
                      }}
                      onMouseEnter={() => audioController.playHover()}
                      className="px-6 py-2 rounded-xl bg-neutral-150 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xxs uppercase tracking-wider border border-neutral-200 dark:border-neutral-700/50 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all cursor-pointer"
                    >
                      Send Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
