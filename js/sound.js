// Procedural Web Audio API Arcade Sound Synthesizer
// Provides 100% self-contained retro arcade sounds without external MP3 files.

class ArcadeAudio {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('arcade_muted') === 'true';
    this.volume = 0.25;
    this.initOnFirstInteraction = this.initOnFirstInteraction.bind(this);

    // Auto initialize on first user gesture
    window.addEventListener('click', this.initOnFirstInteraction, { once: true });
    window.addEventListener('keydown', this.initOnFirstInteraction, { once: true });
  }

  initOnFirstInteraction() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('arcade_muted', this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Quick crisp blip when moving cursor or hovering menu items
  playHover() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(this.volume * 0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Audio context may be restricted
    }
  }

  // Classic confirmation / select chime (2 rising tones)
  playSelect() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.18); // C6

      gain.gain.setValueAtTime(this.volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  // Cancel / back sound (falling tone)
  playBack() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);

      gain.gain.setValueAtTime(this.volume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  // Dramatic Boss Encounter Alert Siren
  playBossAlert() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Heavy bass rumble
      const bass = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bass.type = 'sawtooth';
      bass.frequency.setValueAtTime(80, now);
      bass.frequency.exponentialRampToValueAtTime(40, now + 0.5);
      bassGain.gain.setValueAtTime(this.volume * 0.5, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      bass.connect(bassGain);
      bassGain.connect(this.ctx.destination);
      bass.start(now);
      bass.stop(now + 0.5);

      // Warning siren
      const siren = this.ctx.createOscillator();
      const sirenGain = this.ctx.createGain();
      siren.type = 'square';
      siren.frequency.setValueAtTime(600, now);
      siren.frequency.linearRampToValueAtTime(900, now + 0.15);
      siren.frequency.linearRampToValueAtTime(600, now + 0.3);
      siren.frequency.linearRampToValueAtTime(950, now + 0.45);

      sirenGain.gain.setValueAtTime(this.volume * 0.25, now);
      sirenGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      siren.connect(sirenGain);
      sirenGain.connect(this.ctx.destination);
      siren.start(now);
      siren.stop(now + 0.5);
    } catch (e) {}
  }

  // Punch / Strike Hit sound when attacking a boss
  playHit() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Noise burst for impact
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.08);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(this.volume * 0.6, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);
    } catch (e) {}
  }

  // Victory / Level Up Jingle
  playVictory() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C, E, G, C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const noteTime = now + (idx * 0.09);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(this.volume * 0.35, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.2);
      });
    } catch (e) {}
  }

  // Tactical Missile Launch Audio (swept resonant white noise + rising tone)
  playMissileLaunch() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Rising whistling rocket motor
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.45);

      gain.gain.setValueAtTime(this.volume * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  }

  // Plasma Missile Explosion (deep sub boom + crackle)
  playMissileExplosion() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Low boom
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);

      oscGain.gain.setValueAtTime(this.volume * 0.45, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);

      // Noise burst
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.3);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.3);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(this.volume * 0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);
    } catch (e) {}
  }

  // Supersonic Jet Flyby (aerodynamic rush with engine rumble)
  playJetFlyby() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.8);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const progress = i / bufferSize;
        const envelope = Math.sin(progress * Math.PI);
        data[i] = (Math.random() * 2 - 1) * envelope;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.35);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.8);
      filter.Q.value = 2;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
    } catch (e) {}
  }
}

// Global instance
window.arcadeAudio = new ArcadeAudio();
