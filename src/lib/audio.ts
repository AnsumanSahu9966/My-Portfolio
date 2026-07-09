class AudioController {
  private ctx: AudioContext | null = null;
  private musicEnabled: boolean = true;
  private sfxEnabled: boolean = true;
  private ambientInterval: number | null = null;
  private mainGain: GainNode | null = null;

  constructor() {
    const savedMusic = localStorage.getItem('portfolio-music');
    if (savedMusic !== null) {
      this.musicEnabled = savedMusic === 'true';
    }
    
    const savedSfx = localStorage.getItem('portfolio-sfx');
    if (savedSfx !== null) {
      this.sfxEnabled = savedSfx === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public getMusicState(): boolean {
    return this.musicEnabled;
  }
  
  public getSfxState(): boolean {
    return this.sfxEnabled;
  }

  public toggleMusic(): boolean {
    this.musicEnabled = !this.musicEnabled;
    localStorage.setItem('portfolio-music', String(this.musicEnabled));
    
    if (!this.musicEnabled) {
      this.stopBackgroundMusic();
    } else {
      this.initCtx();
      if (!this.ambientInterval) {
        this.startBackgroundMusic();
      }
    }
    
    return this.musicEnabled;
  }
  
  public toggleSfx(): boolean {
    this.sfxEnabled = !this.sfxEnabled;
    localStorage.setItem('portfolio-sfx', String(this.sfxEnabled));
    return this.sfxEnabled;
  }

  // Soft hover chime (subtle fade in/out)
  public playHover() {
    if (!this.sfxEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.005, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      // Fail silently
    }
  }

  // Crisp woody tap (very different from hover)
  public playTap() {
    if (!this.sfxEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Triangle wave with a sharp frequency drop sounds like a wood block click
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Fail silently
    }
  }

  // Different sound for background ripples (like a water drop or soft chime)
  public playRipple() {
    if (!this.sfxEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // High pitch droplet sound that falls quickly
      osc.frequency.setValueAtTime(1200 + Math.random() * 400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {
      // Fail silently
    }
  }

  // Corporate Lofi ambient sequence
  public startBackgroundMusic() {
    if (!this.musicEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    if (this.ambientInterval) return;

    try {
      this.mainGain = this.ctx.createGain();
      this.mainGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.mainGain.gain.linearRampToValueAtTime(0.6, this.ctx.currentTime + 2.0); // Slightly louder for drums
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime); // Lofi muffled filter

      this.mainGain.connect(filter);
      filter.connect(this.ctx.destination);

      let step = 0;
      let measure = 0;

      const playDrum = (type: string, time: number) => {
        if (!this.ctx || !this.mainGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        if (type === 'kick') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(100, time);
          osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.3);
          gain.gain.setValueAtTime(0.1, time); // Subtle kick
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
        } else if (type === 'rim') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(300, time);
          gain.gain.setValueAtTime(0.03, time); // Very subtle rim
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        } else if (type === 'hat') {
          osc.type = 'square';
          osc.frequency.setValueAtTime(6000, time);
          gain.gain.setValueAtTime(0.005, time); // Subtle hat
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
        }
        
        osc.connect(gain);
        gain.connect(this.mainGain);
        osc.start(time);
        osc.stop(time + 0.3);
      };

      const chords = [
        [130.81, 164.81, 196.00, 246.94], // Cmaj7
        [110.00, 130.81, 164.81, 196.00], // Amin7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23], // G7
      ];

      const playChord = (freqs: number[], time: number) => {
        if (!this.ctx || !this.mainGain) return;
        freqs.forEach(freq => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          
          osc.type = 'triangle';
          // Tape warble effect
          osc.detune.setValueAtTime(Math.sin(time * 5) * 8, time);
          osc.frequency.setValueAtTime(freq, time);
          
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.02, time + 0.05); // softer chords
          gain.gain.exponentialRampToValueAtTime(0.001, time + 2.5); // longer tail for slower tempo
          
          osc.connect(gain);
          gain.connect(this.mainGain!);
          osc.start(time);
          osc.stop(time + 2.5);
        });
      };

      const scheduleStep = () => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const lookahead = 0.1; // Schedule slightly in advance
        
        // 8th note pattern (8 steps per measure)
        if (step === 0) {
          playDrum('kick', now + lookahead);
          playChord(chords[measure % 4], now + lookahead);
        }
        if (step === 1) playDrum('hat', now + lookahead);
        if (step === 2) {
          playDrum('rim', now + lookahead);
          playDrum('hat', now + lookahead);
        }
        if (step === 3) playDrum('hat', now + lookahead);
        if (step === 4) {
          playDrum('kick', now + lookahead);
          playDrum('hat', now + lookahead);
        }
        if (step === 5) playDrum('hat', now + lookahead);
        if (step === 6) {
          playDrum('rim', now + lookahead);
          playDrum('hat', now + lookahead);
        }
        if (step === 7) playDrum('hat', now + lookahead);
        
        // Occasional melody note on off-beats
        if (step % 2 !== 0 && Math.random() > 0.6) {
           const notes = [261.63, 293.66, 329.63, 392.00, 440.00]; // C, D, E, G, A
           const freq = notes[Math.floor(Math.random() * notes.length)] * 2;
           const osc = this.ctx.createOscillator();
           const gain = this.ctx.createGain();
           osc.type = 'sine';
           osc.frequency.setValueAtTime(freq, now + lookahead);
           gain.gain.setValueAtTime(0, now + lookahead);
           gain.gain.linearRampToValueAtTime(0.015, now + lookahead + 0.05); // softer melody
           gain.gain.exponentialRampToValueAtTime(0.001, now + lookahead + 0.8);
           osc.connect(gain);
           gain.connect(this.mainGain!);
           osc.start(now + lookahead);
           osc.stop(now + lookahead + 0.8);
        }

        step++;
        if (step >= 8) {
          step = 0;
          measure++;
        }
        
        // Slightly swung 8th notes, much slower now (~65 BPM)
        const isOffbeat = step % 2 !== 0;
        const nextTime = isOffbeat ? 430 : 490; // Avg 460ms per step
        this.ambientInterval = window.setTimeout(scheduleStep, nextTime);
      };

      scheduleStep();
    } catch (e) {
      // Fail silently
    }
  }

  public stopBackgroundMusic() {
    if (this.ambientInterval) {
      clearTimeout(this.ambientInterval);
      this.ambientInterval = null;
    }

    if (this.mainGain && this.ctx) {
      const now = this.ctx.currentTime;
      try {
        this.mainGain.gain.cancelScheduledValues(now);
        this.mainGain.gain.setValueAtTime(this.mainGain.gain.value, now);
        this.mainGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);
      } catch (e) {}
      this.mainGain = null;
    }
  }
}

export const audioController = new AudioController();


