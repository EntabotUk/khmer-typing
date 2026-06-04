// --- Khmer Unicode Keymap Mapping (NiDA Layout) ---
const KHMER_KEYMAP = {
    "q": { "normal": "ឆ", "shift": "ឈ", "altGr": "" },
    "w": { "normal": "ឹ", "shift": "ឺ", "altGr": "" },
    "e": { "normal": "េ", "shift": "ែ", "altGr": "ឯ" },
    "r": { "normal": "រ", "shift": "ឬ", "altGr": "" },
    "t": { "normal": "ត", "shift": "ទ", "altGr": "" },
    "y": { "normal": "យ", "shift": "ួ", "altGr": "" },
    "u": { "normal": "ុ", "shift": "ូ", "altGr": "" },
    "i": { "normal": "ិ", "shift": "ី", "altGr": "ឦ" },
    "o": { "normal": "ោ", "shift": "ៅ", "altGr": "ឱ" },
    "p": { "normal": "ផ", "shift": "ភ", "altGr": "ឰ" },
    "[": { "normal": "ៀ", "shift": "ឿ", "altGr": "ឩ" },
    "]": { "normal": "ឪ", "shift": "ឧ", "altGr": "ឳ" },
    "\\": { "normal": "ឮ", "shift": "ឭ", "altGr": "\\" },
    "a": { "normal": "ា", "shift": "ាំ", "altGr": "" },
    "s": { "normal": "ស", "shift": "ៃ", "altGr": "" },
    "d": { "normal": "ដ", "shift": "ឌ", "altGr": "" },
    "f": { "normal": "ថ", "shift": "ធ", "altGr": "" },
    "g": { "normal": "ង", "shift": "អ", "altGr": "" },
    "h": { "normal": "ហ", "shift": "ះ", "altGr": "" },
    "j": { "normal": "្", "shift": "ញ", "altGr": "" },
    "k": { "normal": "ក", "shift": "គ", "altGr": "" },
    "l": { "normal": "ល", "shift": "ឡ", "altGr": "" },
    ";": { "normal": "ើ", "shift": "ោះ", "altGr": "៖" },
    "'": { "normal": "់", "shift": "៉", "altGr": "ៈ" },
    "z": { "normal": "ឋ", "shift": "ឍ", "altGr": "" },
    "x": { "normal": "ខ", "shift": "ឃ", "altGr": "" },
    "c": { "normal": "ច", "shift": "ជ", "altGr": "" },
    "v": { "normal": "វ", "shift": "េះ", "altGr": "" },
    "b": { "normal": "ប", "shift": "ព", "altGr": "" },
    "n": { "normal": "ន", "shift": "ណ", "altGr": "" },
    "m": { "normal": "ម", "shift": "ំ", "altGr": "" },
    ",": { "normal": "ុំ", "shift": "ុះ", "altGr": "," },
    ".": { "normal": "។", "shift": "៕", "altGr": "" },
    "/": { "normal": "៊", "shift": "?", "altGr": "/" },
    "1": { "normal": "១", "shift": "!", "altGr": "" },
    "2": { "normal": "២", "shift": "ៗ", "altGr": "" },
    "3": { "normal": "៣", "shift": '"', "altGr": "" },
    "4": { "normal": "៤", "shift": "៛", "altGr": "៎" },
    "5": { "normal": "៥", "shift": "ឺ", "altGr": "៩" },
    "6": { "normal": "៦", "shift": "័", "altGr": "ៗ" },
    "7": { "normal": "៧", "shift": "៏", "altGr": "៳" },
    "8": { "normal": "៨", "shift": "ំ", "altGr": "៴" },
    "9": { "normal": "៩", "shift": "់", "altGr": "៵" },
    "0": { "normal": "០", "shift": ")", "altGr": "៶" },
    "-": { "normal": "ឥ", "shift": "៌", "altGr": "៷" },
    "=": { "normal": "ឲ", "shift": "=", "altGr": "៸" },
    "space": { "normal": "\u200B", "shift": " ", "altGr": "" }
};

// Create a reverse mapping (Khmer character -> QWERTY keystroke info)
const KHMER_TO_QWERTY = {};
for (const [key, val] of Object.entries(KHMER_KEYMAP)) {
    let codeStr = 'Key' + key.toUpperCase();
    if (key >= '0' && key <= '9') codeStr = 'Digit' + key;
    if (key === 'space') codeStr = 'Space';

    if (val.normal) KHMER_TO_QWERTY[val.normal] = { qwerty: key, code: codeStr, shift: false, name: val.normal };
    if (val.shift) KHMER_TO_QWERTY[val.shift] = { qwerty: key, code: codeStr, shift: true, name: val.shift };
    if (val.altGr) KHMER_TO_QWERTY[val.altGr] = { qwerty: key, code: codeStr, shift: false, altGr: true, name: val.altGr };
}

// Add special combinations that output multiple codepoints (e.g. ាំ, េះ, ោះ)
KHMER_TO_QWERTY['ាំ'] = { qwerty: 'A', code: 'KeyA', shift: true, name: 'ាំ (ស្រៈ ាំ)' };
KHMER_TO_QWERTY['េះ'] = { qwerty: 'V', code: 'KeyV', shift: true, name: 'េះ (ស្រៈ េះ)' };
KHMER_TO_QWERTY['ោះ'] = { qwerty: ':', code: 'Semicolon', shift: true, name: 'ោះ (ស្រៈ ោះ)' };



// --- Game Content Pool (Lessons & Sentences) ---
const GAME_LESSONS = {
    consonants: [
        "កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវសហឡអ"
    ],
    vowels: [
        "កាកិកីកឹកឺកុកូកួ",
        "កើកឿកៀកេកែកៃកោកៅ",
        "ចាចិជីចឹជឺចុចូចួ",
        "ទាទិទីទឹទឺទុទូទួ"
    ],
    subscripts: [
        "ខ្មែរ",
        "អង្គរវត្ត",
        "ភ្នំពេញ",
        "សាលារៀន",
        "គ្រូពេទ្យ",
        "ប្រាសាទបាយ័ន",
        "ប្រវត្តិសាស្ត្រ",
        "កម្ពុជា"
    ],
    words: [
        "ភាសាខ្មែរ",
        "អក្សរសាស្ត្រ",
        "មាតុភូមិ",
        "សន្តិភាព",
        "វប្បធម៌",
        "សិល្បៈ",
        "អរិយធម៌",
        "សេចក្តីស្រឡាញ់",
        "មិត្តភាព",
        "ចំណេះដឹង"
    ],
    sentences: [
        "ភាសាខ្មែរគឺជាអត្តសញ្ញាណជាតិរបស់យើង។",
        "ខ្ញុំស្រឡាញ់ប្រាសាទអង្គរវត្តខ្លាំងណាស់។",
        "ការរៀនសូត្រនាំមកនូវពន្លឺនៃជីវិត។",
        "ការពារព្រៃឈើដើម្បីសហគមន៍និងភពផែនដី។",
        "ប្រទេសកម្ពុជាល្បីល្បាញដោយសារវប្បធម៌ដ៏រុងរឿង។"
    ],
    endless: [
        "ភាសាខ្មែរ", "ខ្មែរ", "អង្គរវត្ត", "ប្រាសាទ", "កម្ពុជា", "ភ្នំពេញ", "សន្តិភាព", "វប្បធម៌",
        "អរិយធម៌", "សាលារៀន", "មិត្តភក្តិ", "គ្រួសារ", "សៀវភៅ", "ប៊ិច", "កុំព្យូទ័រ", "ហ្គេម"
    ]
};


// --- Synthesized Audio (Web Audio API) ---
class AudioSynth {
    constructor() {
        this.ctx = null;
        this.enabled = true;

        // Preload physical assets
        this.correctPopSound = new Audio('assets/sounds/correct_pop.mp3');
        this.vineBoomSound = new Audio('assets/sounds/vine_boom.mp3');
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playClick() {
        if (!this.enabled) return;
        this.correctPopSound.currentTime = 0;
        this.correctPopSound.play().catch(e => console.warn('Audio play failed:', e));
    }

    playError() {
        if (!this.enabled) return;
        this.vineBoomSound.currentTime = 0;
        this.vineBoomSound.play().catch(e => console.warn('Audio play failed:', e));
    }

    playSuccess() {
        if (!this.enabled) return;
        this.init();

        // Short double tone chime
        const playTone = (freq, time, duration) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);

            gain.gain.setValueAtTime(0.08, time);
            gain.gain.exponentialRampToValueAtTime(0.005, time + duration);

            osc.start(time);
            osc.stop(time + duration);
        };

        const now = this.ctx.currentTime;
        playTone(523.25, now, 0.1); // C5
        playTone(659.25, now + 0.08, 0.25); // E5
    }

    playDefeat() {
        if (!this.enabled) return;
        this.init();

        const now = this.ctx.currentTime;
        const playTone = (freq, start, duration) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.1, start);
            gain.gain.linearRampToValueAtTime(0.001, start + duration);
            osc.start(start);
            osc.stop(start + duration);
        };

        playTone(220, now, 0.15); // A3
        playTone(207.65, now + 0.12, 0.15); // G#3
        playTone(196, now + 0.24, 0.3); // G3
    }
}

const synth = new AudioSynth();


// --- Game Engine Class ---
class TypingAdventureGame {
    constructor() {
        // Stats & Tracking
        this.score = 0;
        this.correctCharsTyped = 0;
        this.totalCharsTyped = 0;
        this.errorsCount = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.elapsedSeconds = 0;

        // Game state
        this.isPaused = false;

        // Lesson state
        this.currentLesson = 'consonants';
        this.currentText = "";
        this.textCodepoints = []; // Array of unicode codepoints to type
        this.typedIndex = 0; // Current index in textCodepoints

        // Level 1 dynamic obstacle state
        this.obstacleFrameId = null;
        this.obstacleType = ''; // 'sentinel', 'crate', 'gap'
        this.obstacleChar = '';
        this.obstacleX = 800;
        this.consonantProgress = 0;
        this.consonantTarget = 20;
        this.activeObstacles = [];
        this.crumblingElements = [];
        this.incorrectKeyPressCount = 0;

        // DOM elements
        this.dom = {
            wpm: document.querySelector('#stat-wpm .stat-value'),
            accuracy: document.querySelector('#stat-accuracy .stat-value'),
            time: document.querySelector('#stat-time .stat-value'),
            score: document.querySelector('#stat-score .stat-value'),
            errors: document.querySelector('#stat-errors .stat-value'),
            progressBarText: document.querySelector('.progress-text'),
            progressBarFill: document.querySelector('.progress-bar-fill'),
            levelSelect: document.getElementById('level-select'),
            btnRestart: document.getElementById('btn-restart'),
            btnSound: document.getElementById('btn-sound'),
            btnKeyboardToggle: document.getElementById('btn-keyboard-toggle'),
            explorer: document.getElementById('explorer'),
            monster: document.getElementById('monster'),
            monsterText: document.getElementById('monster-text'),
            typingText: document.getElementById('typing-text'),
            nextCharHint: document.getElementById('next-char-hint'),
            keyboard: document.getElementById('virtual-keyboard'),

            // Pause overlay elements
            pauseOverlay: document.getElementById('pause-overlay'),
            pauseToggleKeyboard: document.getElementById('pause-toggle-keyboard'),
            pauseToggleSound: document.getElementById('pause-toggle-sound'),
            pauseLevelSelect: document.getElementById('pause-level-select'),
            pauseBtnResume: document.getElementById('pause-btn-resume'),
            pauseBtnRestart: document.getElementById('pause-btn-restart')
        };

        // Bind events
        this.dom.levelSelect.addEventListener('change', (e) => this.changeLesson(e.target.value));
        this.dom.btnRestart.addEventListener('click', () => this.restartGame());
        this.dom.btnSound.addEventListener('click', () => this.toggleSound());
        this.dom.btnKeyboardToggle.addEventListener('click', () => this.toggleKeyboard());

        // Bind pause overlay events
        this.dom.pauseToggleKeyboard.addEventListener('change', (e) => this.setKeyboardVisibility(e.target.checked));
        this.dom.pauseToggleSound.addEventListener('change', (e) => this.setSoundEnabled(e.target.checked));
        this.dom.pauseLevelSelect.addEventListener('change', (e) => {
            this.changeLesson(e.target.value);
            this.resumeGame();
        });
        this.dom.pauseBtnResume.addEventListener('click', () => this.resumeGame());
        this.dom.pauseBtnRestart.addEventListener('click', () => {
            this.restartGame();
            this.resumeGame();
        });

        // Handle physical keyboard inputs
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Setup Virtual Keyboard click events
        this.setupVirtualKeyboardClicks();

        // Dynamically update virtual keyboard labels to match KHMER_KEYMAP
        this.updateVirtualKeyboardLabels();

        // Parallax background speed control
        this.isRunnerActive = true;
    }

    init() {
        this.changeLesson(this.dom.levelSelect.value);
        this.restartStats();
    }

    updateVirtualKeyboardLabels() {
        for (const [key, mapInfo] of Object.entries(KHMER_KEYMAP)) {
            if (key === 'space') continue;
            let codeStr = 'Key' + key.toUpperCase();
            if (key >= '0' && key <= '9') codeStr = 'Digit' + key;
            if (key === '-') codeStr = 'Minus';
            if (key === '=') codeStr = 'Equal';
            if (key === '[') codeStr = 'BracketLeft';
            if (key === ']') codeStr = 'BracketRight';
            if (key === '\\') codeStr = 'Backslash';
            if (key === ';') codeStr = 'Semicolon';
            if (key === '\'') codeStr = 'Quote';
            if (key === ',') codeStr = 'Comma';
            if (key === '.') codeStr = 'Period';
            if (key === '/') codeStr = 'Slash';

            const keyEl = document.getElementById(codeStr);
            if (keyEl) {
                const normalEl = keyEl.querySelector('.key-bottom-right.purple');
                const shiftEl = keyEl.querySelector('.key-top-right.purple');
                const altGrEl = keyEl.querySelector('.key-top-left');

                if (normalEl) normalEl.innerText = mapInfo.normal;
                if (shiftEl) shiftEl.innerText = mapInfo.shift;

                if (altGrEl) {
                    if (mapInfo.altGr) {
                        altGrEl.innerText = mapInfo.altGr;
                        altGrEl.classList.add('purple');
                    } else {
                        altGrEl.innerText = "";
                    }
                }
            }
        }
    }

    restartStats() {
        this.score = 0;
        this.correctCharsTyped = 0;
        this.totalCharsTyped = 0;
        this.errorsCount = 0;
        this.incorrectKeyPressCount = 0;
        this.elapsedSeconds = 0;
        this.startTime = null;

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        this.updateStatsDisplay();
    }

    restartGame() {
        this.isPaused = false;
        this.dom.pauseOverlay.classList.add('hide');
        this.restartStats();

        // Reset explorer progression and camera
        const explorerEl = this.dom.explorer;
        if (explorerEl) {
            explorerEl.style.transform = 'translateX(0px)';
            explorerEl.parentElement.style.transform = 'translateX(0px)';
            explorerEl.classList.remove('stumble', 'flash-red');
        }

        // Clear active static obstacles from DOM
        if (this.activeObstacles) {
            this.activeObstacles.forEach(o => {
                if (o.el && o.el.parentNode) o.el.parentNode.removeChild(o.el);
            });
            this.activeObstacles = [];
        }

        // Reset original monster styling
        const monsterEl = this.dom.monster;
        if (monsterEl) {
            monsterEl.style.display = '';
            monsterEl.style.left = '';
            monsterEl.style.right = '';
            monsterEl.className = 'monster';
        }

        this.consonantProgress = 0;
        this.consonantTarget = 20;

        this.loadNextText();
        this.dom.explorer.className = 'explorer'; // Reset animations
        this.resumeRunnerAnimations();
        synth.playSuccess();
    }

    changeLesson(lessonKey) {
        this.currentLesson = lessonKey;
        this.dom.levelSelect.value = lessonKey;
        this.dom.pauseLevelSelect.value = lessonKey;
        this.restartGame();
    }

    setSoundEnabled(enabled) {
        synth.enabled = enabled;
        if (enabled) {
            this.dom.btnSound.classList.add('active');
            this.dom.pauseToggleSound.checked = true;
            synth.init();
        } else {
            this.dom.btnSound.classList.remove('active');
            this.dom.pauseToggleSound.checked = false;
        }
    }

    setKeyboardVisibility(visible) {
        if (visible) {
            this.dom.keyboard.classList.remove('hide');
            this.dom.btnKeyboardToggle.classList.add('active');
            this.dom.pauseToggleKeyboard.checked = true;
        } else {
            this.dom.keyboard.classList.add('hide');
            this.dom.btnKeyboardToggle.classList.remove('active');
            this.dom.pauseToggleKeyboard.checked = false;
        }
    }

    toggleSound() {
        this.setSoundEnabled(!synth.enabled);
    }

    toggleKeyboard() {
        const keyboardHidden = this.dom.keyboard.classList.contains('hide');
        this.setKeyboardVisibility(keyboardHidden);
    }

    pauseGame() {
        if (this.isPaused) return;
        this.isPaused = true;

        // Stop timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        // Pause running animations
        this.pauseRunnerAnimations();

        // Pause obstacle loop if consonants level
        if (this.currentLesson === 'consonants') {
            if (this.obstacleFrameId) {
                cancelAnimationFrame(this.obstacleFrameId);
                this.obstacleFrameId = null;
            }
        }

        // Show pause overlay
        this.dom.pauseOverlay.classList.remove('hide');
    }

    resumeGame() {
        if (!this.isPaused) return;
        this.isPaused = false;

        // Resume timer if game was already started
        if (this.startTime) {
            this.startTime = Date.now() - (this.elapsedSeconds * 1000);
            this.timerInterval = setInterval(() => {
                this.elapsedSeconds++;
                this.updateStatsDisplay();
            }, 1000);
        }

        // Resume running animations
        this.resumeRunnerAnimations();

        // Resume obstacle loop if consonants level
        if (this.currentLesson === 'consonants') {
            if (this.obstacleFrameId) cancelAnimationFrame(this.obstacleFrameId);
            this.obstacleFrameId = requestAnimationFrame(() => this.obstacleUpdateLoop());
        }

        // Hide pause overlay
        this.dom.pauseOverlay.classList.add('hide');
    }

    togglePause() {
        if (this.isPaused) {
            this.resumeGame();
        } else {
            this.pauseGame();
        }
    }

    // Load next text block based on selected lesson
    loadNextText() {
        const pool = GAME_LESSONS[this.currentLesson];
        let text = "";

        if (this.currentLesson === 'endless') {
            // Endless mode compiles 4 random words separated by ZWSP
            const words = [];
            for (let i = 0; i < 4; i++) {
                words.push(pool[Math.floor(Math.random() * pool.length)]);
            }
            // Join words using Zero Width Space (ZWSP)
            text = words.join('\u200B');
        } else {
            // Level mode picks a random sentence/block
            text = pool[Math.floor(Math.random() * pool.length)];
        }

        this.currentText = text;
        this.typedIndex = 0;

        // Parse text into codepoints. 
        this.textCodepoints = Array.from(text);

        // Update monster display label
        let monsterLabel = text.replace(/\u200B/g, ' ');
        if (monsterLabel.length > 12) {
            monsterLabel = monsterLabel.substring(0, 10) + '...';
        }

        if (this.currentLesson === 'consonants') {
            this.dom.monster.style.display = 'none'; // hide monster for basic linear progression
            this.spawnStaticObstacles();
        } else {
            this.dom.monster.style.display = '';
            this.dom.monsterText.innerText = monsterLabel;
            this.dom.monster.className = 'monster';
        }

        this.renderPromptSlab();
        this.updateNextCharacterHint();
    }

    spawnStaticObstacles() {
        if (this.activeObstacles) {
            this.activeObstacles.forEach(o => {
                if (o.el && o.el.parentNode) o.el.parentNode.removeChild(o.el);
            });
        }
        this.activeObstacles = [];

        const startX = 500; // Explorer's start + lead time
        const gap = 150; // Horizontal distance padding between obstacles

        for (let i = 0; i < this.textCodepoints.length; i++) {
            const char = this.textCodepoints[i];
            const xPos = startX + (i * gap);

            // Alternating visuals for consonants
            const type = (i % 2 === 0) ? 'sentinel' : 'crate';

            const el = document.createElement('div');
            el.className = `monster ${type === 'sentinel' ? 'robot-sentinel' : 'cyber-crate'}`;
            el.style.position = 'absolute';
            el.style.bottom = '30px';
            el.style.left = `${xPos}px`;
            el.style.right = 'auto';
            el.style.transition = 'none';
            el.style.zIndex = '1';

            const label = document.createElement('div');
            label.className = 'monster-label';
            label.innerText = char;
            el.appendChild(label);

            this.dom.explorer.parentElement.appendChild(el);

            this.activeObstacles.push({
                type: type,
                char: char,
                x: xPos,
                el: el
            });
        }

        if (this.obstacleFrameId) cancelAnimationFrame(this.obstacleFrameId);
        this.obstacleFrameId = requestAnimationFrame(() => this.obstacleUpdateLoop());
    }

    obstacleUpdateLoop() {
        if (this.isPaused || this.currentLesson !== 'consonants') {
            this.obstacleFrameId = null;
            return;
        }

        const speed = 0.2; // 10x slower to match floor parallax

        // Move ONLY the active target
        if (this.activeObstacles.length > 0 && this.typedIndex < this.activeObstacles.length) {
            const target = this.activeObstacles[this.typedIndex];

            if (target.isBouncing) {
                target.x += 15.0; // move quickly back
                if (target.x >= 500) {
                    target.x = 500;
                    target.isBouncing = false;
                }
            } else if (target.isCharging) {
                target.x -= 15.0; // speed up towards player
                if (target.x <= 140) {
                    this.handleObstacleMiss(target);
                }
            } else {
                target.x -= speed;
                if (target.x <= 140) {
                    this.handleObstacleMiss(target);
                }
            }

            target.el.style.left = `${target.x}px`;
        }

        this.obstacleFrameId = requestAnimationFrame(() => this.obstacleUpdateLoop());
    }

    handleObstacleMiss(target) {
        this.incorrectKeyPressCount++;
        this.score = Math.max(0, this.score - 5);

        synth.playError();
        this.triggerPlayerDamage();

        // Stop charge, trigger smooth bounce back
        target.isCharging = false;
        target.isBouncing = true;

        // Shake prompt slab
        this.dom.typingText.parentElement.classList.add('shake');
        setTimeout(() => {
            this.dom.typingText.parentElement.classList.remove('shake');
        }, 200);

        this.updateStatsDisplay();
    }

    triggerPlayerDamage() {
        this.dom.explorer.classList.remove('jump', 'attack', 'smash', 'stumble', 'flash-red');
        void this.dom.explorer.offsetWidth;
        this.dom.explorer.classList.add('flash-red');
        setTimeout(() => {
            this.dom.explorer.classList.remove('flash-red');
        }, 500);
    }

    // Render text with highlighting (grapheme-segmented for visual clarity)
    renderPromptSlab() {
        // We want to highlight character-by-character based on typedIndex.
        // We will build the HTML string directly.
        let html = "";

        for (let i = 0; i < this.textCodepoints.length; i++) {
            const char = this.textCodepoints[i];
            let classStr = "";

            if (i < this.typedIndex) {
                classStr = "char-correct";
            } else if (i === this.typedIndex) {
                classStr = "char-current";
            } else {
                classStr = "char-future";
            }

            // Visually display ZWSP and standard Space
            if (char === '\u200B') {
                html += `<span class="char-space-indicator ${classStr}">⎵</span>`;
            } else if (char === ' ') {
                html += `<span class="char-space-indicator ${classStr}">␣</span>`;
            } else {
                html += `<span class="${classStr}">${char}</span>`;
            }
        }

        this.dom.typingText.innerHTML = html;
    }

    // Show hints for key combinations
    updateNextCharacterHint() {
        if (this.typedIndex >= this.textCodepoints.length) {
            this.dom.nextCharHint.innerHTML = "អបអរសាទរ! / Completed! 🎉";
            this.clearKeyHighlights();
            return;
        }

        const char = this.textCodepoints[this.typedIndex];
        const mapping = KHMER_TO_QWERTY[char];

        this.clearKeyHighlights();

        if (mapping) {
            // Highlight virtual keyboard
            const keyEl = document.getElementById(mapping.code);
            if (keyEl) {
                keyEl.classList.add('highlight-next');
            }

            // Highlight shift key if needed
            if (mapping.shift) {
                document.getElementById('ShiftLeft').classList.add('highlight-shift');
                document.getElementById('ShiftRight').classList.add('highlight-shift');
            }

            // Build human-readable instruction banner
            let keyCombo = mapping.shift ? `Shift + ${mapping.qwerty.toUpperCase()}` : mapping.qwerty.toUpperCase();
            if (mapping.code === 'Space') {
                keyCombo = mapping.shift ? 'Shift + Space' : 'Space';
            }
            this.dom.nextCharHint.innerHTML = `<span style="color:#00e5ff">${char}</span> &nbsp;→&nbsp; <span style="color:#ffd000">${keyCombo}</span> (${mapping.name})`;
        } else {
            // Fallback for symbols or unmapped characters
            this.dom.nextCharHint.innerHTML = `<span style="color:#00e5ff">${char}</span> (ស្វែងរកនៅលើក្តារចុច / Type Character)`;
        }
    }

    clearKeyHighlights() {
        document.querySelectorAll('.key').forEach(key => {
            key.classList.remove('highlight-next', 'highlight-shift');
        });
    }

    // Start timer on first keystroke
    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            this.elapsedSeconds++;
            this.updateStatsDisplay();
        }, 1000);
    }

    updateStatsDisplay() {
        // Calculate WPM: Net WPM = (typedCorrect / 5 - errors) / minutes
        const minutes = this.elapsedSeconds > 0 ? this.elapsedSeconds / 60 : 0.01;
        const errors = this.currentLesson === 'consonants' ? this.incorrectKeyPressCount : this.errorsCount;
        const wpmVal = Math.max(0, Math.round(((this.correctCharsTyped / 5) - errors) / minutes));
        this.dom.wpm.innerText = wpmVal;

        // Accuracy
        let accuracyVal = 100;
        if (this.currentLesson === 'consonants') {
            const totalAttempts = this.correctCharsTyped + this.incorrectKeyPressCount;
            accuracyVal = totalAttempts > 0 ? Math.round((this.correctCharsTyped / totalAttempts) * 100) : 100;
        } else {
            accuracyVal = this.totalCharsTyped > 0
                ? Math.round((this.correctCharsTyped / this.totalCharsTyped) * 100)
                : 100;
        }
        this.dom.accuracy.innerText = `${accuracyVal}%`;

        // Update Errors live counter
        if (this.dom.errors) {
            this.dom.errors.innerText = errors;
        }

        // Time format MM:SS
        const mm = String(Math.floor(this.elapsedSeconds / 60)).padStart(2, '0');
        const ss = String(this.elapsedSeconds % 60).padStart(2, '0');
        this.dom.time.innerText = `${mm}:${ss}`;

        // Score
        this.dom.score.innerText = this.score;

        // Progress Bar
        let progressPercent = 0;
        if (this.currentLesson === 'consonants') {
            progressPercent = Math.max(0, Math.min(100, Math.round((this.consonantProgress / this.consonantTarget) * 100)));
        } else {
            progressPercent = this.textCodepoints.length > 0
                ? Math.round((this.typedIndex / this.textCodepoints.length) * 100)
                : 0;
        }
        this.dom.progressBarText.innerText = `${progressPercent}%`;
        this.dom.progressBarFill.style.width = `${progressPercent}%`;
    }

    // Intercept physical key presses
    handleKeyDown(e) {
        // Ignore inputs to selectors
        if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;

        // Escape key toggles pause
        if (e.key === 'Escape') {
            this.togglePause();
            e.preventDefault();
            return;
        }

        // Block typing if paused
        if (this.isPaused) return;

        // Standard modifiers, function keys
        if (e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') return;

        // Shift modifier visual highlight
        if (e.key === 'Shift') {
            this.dom.keyboard.classList.add('shift-active');
            const shiftL = document.getElementById('ShiftLeft');
            const shiftR = document.getElementById('ShiftRight');
            if (shiftL) shiftL.classList.add('active');
            if (shiftR) shiftR.classList.add('active');
            return;
        }

        // Prevent standard scroll keys, tab defaults in browser
        if (e.key === 'Tab' || e.key === ' ' || e.key === 'Backspace') {
            e.preventDefault();
        }

        // Play sounds and start timer
        if (!this.startTime) {
            this.startTimer();
        }

        // Match key code to virtual key and press it
        const keyEl = document.getElementById(e.code);
        if (keyEl) {
            keyEl.classList.add('active');
        }

        this.totalCharsTyped++;

        // Determine typed character based on QWERTY layout key mapping
        let typedChar = "";

        let physicalKey = e.key.toLowerCase();
        if (e.code === 'Space') physicalKey = 'space';

        const mapInfo = KHMER_KEYMAP[physicalKey];
        if (mapInfo) {
            if (e.altKey && mapInfo.altGr) {
                typedChar = mapInfo.altGr;
            } else if (e.shiftKey && mapInfo.shift) {
                typedChar = mapInfo.shift;
            } else {
                typedChar = mapInfo.normal;
            }
        } else {
            // Try fallback QWERTY translation
            typedChar = e.key;
        }

        // Validate character typed against current index
        const expectedChar = this.textCodepoints[this.typedIndex];

        // --- VISUAL FEEDBACK LOGIC ---
        if (typedChar && typedChar !== ' ' && typedChar !== '\u200B') {
            const feedbackBox = document.getElementById('stat-last-pressed');
            const feedbackChar = document.getElementById('last-pressed-char');
            if (feedbackBox && feedbackChar) {
                feedbackChar.innerText = typedChar;
                feedbackBox.style.borderColor = '#00e5ff';
                feedbackBox.style.color = '#00e5ff';
            }
        }

        if (typedChar === expectedChar || e.key === expectedChar) {
            if (keyEl) {
                keyEl.classList.add('glow-correct');
                setTimeout(() => keyEl.classList.remove('glow-correct'), 300);
            }
            this.processCorrectKeystroke();
        } else {
            if (keyEl) {
                keyEl.classList.add('glow-incorrect');
                setTimeout(() => keyEl.classList.remove('glow-incorrect'), 300);
            }
            this.processIncorrectKeystroke();

            if (typedChar && typedChar !== ' ' && typedChar !== '\u200B') {
                const feedbackBox = document.getElementById('stat-last-pressed');
                if (feedbackBox) {
                    feedbackBox.style.borderColor = '#ff3333';
                    feedbackBox.style.color = '#ff3333';
                    setTimeout(() => {
                        if (feedbackBox.style.borderColor === 'rgb(255, 51, 51)' || feedbackBox.style.borderColor === '#ff3333') {
                            feedbackBox.style.borderColor = '#00e5ff';
                            feedbackBox.style.color = '#00e5ff';
                        }
                    }, 400);
                }
            }
        }
    }

    handleKeyUp(e) {
        if (e.key === 'Shift') {
            this.dom.keyboard.classList.remove('shift-active');
            const shiftL = document.getElementById('ShiftLeft');
            const shiftR = document.getElementById('ShiftRight');
            if (shiftL) shiftL.classList.remove('active');
            if (shiftR) shiftR.classList.remove('active');
            return;
        }

        const keyEl = document.getElementById(e.code);
        if (keyEl) {
            keyEl.classList.remove('active');
        }
    }

    processCorrectKeystroke() {
        this.correctCharsTyped++;
        this.typedIndex++;

        this.score += 10;
        synth.playClick();
        this.renderPromptSlab();

        if (this.currentLesson === 'consonants') {
            // Clear the static obstacle at this index
            if (this.activeObstacles && this.typedIndex - 1 < this.activeObstacles.length) {
                const target = this.activeObstacles[this.typedIndex - 1];
                if (target && target.el) {
                    target.el.classList.add('crumble');
                    // Play specific animation depending on type
                    this.triggerExplorerAction(target.type === 'sentinel' ? 'attack' : 'smash');
                }

                // Shift the remaining queue forward by 150px since the obstacle was completed
                for (let i = this.typedIndex; i < this.activeObstacles.length; i++) {
                    const o = this.activeObstacles[i];
                    o.x -= 150;
                    o.el.style.left = `${o.x}px`;
                }
            } else {
                this.triggerExplorerAction('attack');
            }
        } else {
            // Jump Explorer on typing vowels/combining signs, jump/attack on consonants
            const char = this.textCodepoints[this.typedIndex - 1];
            if (['ក', 'ខ', 'គ', 'ឃ', 'ង', 'ច', 'ឆ', 'ជ', 'ឈ', 'ញ', 'ដ', 'ឋ', 'ឌ', 'ឍ', 'ណ', 'ត', 'ថ', 'ទ', 'ធ', 'ន', 'ប', 'ផ', 'ព', 'ភ', 'ម', 'យ', 'រ', 'ល', 'វ', 'ស', 'ហ', 'ឡ', 'អ'].includes(char)) {
                this.triggerExplorerAction('attack');
            } else if (['ា', 'ិ', 'ី', 'ឹ', 'ឺ', 'ុ', 'ូ', 'ួ', 'ើ', 'ឿ', 'ៀ', 'េ', 'ែ', 'ៃ', 'ោ', 'ៅ', '្', '់', 'ំ', 'ះ'].includes(char)) {
                this.triggerExplorerAction('jump');
            }
        }

        // Calculate progress and end text
        if (this.typedIndex >= this.textCodepoints.length) {
            this.processTextCompletion();
        } else {
            this.updateNextCharacterHint();
            this.updateStatsDisplay();
        }
    }

    processIncorrectKeystroke() {
        if (this.currentLesson === 'consonants') {
            // Trigger enemy charge instead of instant damage/bounce
            if (this.activeObstacles && this.typedIndex < this.activeObstacles.length) {
                const target = this.activeObstacles[this.typedIndex];
                if (target && !target.isCharging && !target.isBouncing) {
                    target.isCharging = true;
                }
            }

            // Shake prompt slab for immediate visual feedback of typo
            this.dom.typingText.parentElement.classList.add('shake');
            setTimeout(() => {
                this.dom.typingText.parentElement.classList.remove('shake');
            }, 200);

            // Defers score penalty and audio to handleObstacleMiss collision
            return;
        }

        this.errorsCount++;
        this.incorrectKeyPressCount++; // Increment target error counter
        this.score = Math.max(0, this.score - 5);

        synth.playError();

        // Shake prompt slab
        this.dom.typingText.parentElement.classList.add('shake');
        setTimeout(() => {
            this.dom.typingText.parentElement.classList.remove('shake');
        }, 200);

        this.updateStatsDisplay();
    }

    processTextCompletion() {
        this.score += 100; // Bonus points for completion
        this.updateStatsDisplay();
        this.clearKeyHighlights();

        this.pauseRunnerAnimations();
        synth.playSuccess();

        if (this.currentLesson === 'consonants') {
            this.dom.nextCharHint.innerHTML = "អបអរសាទរ! Level 1 Completed! 🎉";
            setTimeout(() => {
                this.changeLesson('vowels'); // auto progress to vowels
            }, 1500);
        } else {
            // Defeat monster animation
            if (this.dom.monster) {
                this.dom.monster.classList.add('crumble');
            }
            setTimeout(() => {
                this.loadNextText();
                this.resumeRunnerAnimations();
            }, 1200);
        }
    }

    triggerExplorerAction(action) {
        this.dom.explorer.classList.remove('jump', 'attack', 'smash', 'stumble');
        // Force reflow
        void this.dom.explorer.offsetWidth;
        this.dom.explorer.classList.add(action);

        const duration = action === 'stumble' ? 700 : 500;
        setTimeout(() => {
            this.dom.explorer.classList.remove(action);
        }, duration);
    }

    pauseRunnerAnimations() {
        this.isRunnerActive = false;
        // Pause parallax scrolling by adding animation-play-state: paused
        document.querySelectorAll('.parallax-bg, .stone-path').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }

    resumeRunnerAnimations() {
        this.isRunnerActive = true;
        document.querySelectorAll('.parallax-bg, .stone-path').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }

    // Allow virtual keyboard mouse/touch clicks
    setupVirtualKeyboardClicks() {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            key.addEventListener('mousedown', () => {
                // Simulate typing based on key code
                const keyId = key.id;
                let simulatedEvent = {
                    code: keyId,
                    key: "",
                    shiftKey: this.dom.keyboard.classList.contains('shift-active'),
                    preventDefault: () => { },
                    target: document.body
                };

                // Find English key key-mappings
                const mapping = Object.values(KHMER_KEYMAP).find(k => k.code === keyId && k.shift === simulatedEvent.shiftKey);
                if (mapping) {
                    simulatedEvent.key = mapping.char;
                } else {
                    // Fallbacks for special keys
                    if (keyId === 'Space') simulatedEvent.key = ' ';
                    else if (keyId === 'Backspace') simulatedEvent.key = 'Backspace';
                    else if (keyId === 'Enter') simulatedEvent.key = 'Enter';
                }

                this.handleKeyDown(simulatedEvent);
            });

            key.addEventListener('mouseup', () => {
                const keyId = key.id;
                this.handleKeyUp({ code: keyId, key: "" });
            });
        });
    }
}

// Instantiate game engine on page load
window.addEventListener('DOMContentLoaded', () => {
    const game = new TypingAdventureGame();
    game.init();
});
