// --- Khmer Unicode Keymap Mapping (NiDA Layout) ---
const KHMER_KEYMAP = {
    // Row 1 (Numbers / Symbols)
    '`': { char: '«', code: 'Backquote', shift: false, name: '« (បើកសម្រង់)' },
    '~': { char: '»', code: 'Backquote', shift: true, name: '» (បិទសម្រង់)' },
    '1': { char: '១', code: 'Digit1', shift: false, name: '១ (មួយ)' },
    '!': { char: '!', code: 'Digit1', shift: true, name: '! (ឧទានសញ្ញា)' },
    '2': { char: '២', code: 'Digit2', shift: false, name: '២ (ពីរ)' },
    '@': { char: 'ៗ', code: 'Digit2', shift: true, name: 'ៗ (ឡេកទោ)' },
    '3': { char: '៣', code: 'Digit3', shift: false, name: '៣ (បី)' },
    '#': { char: '"', code: 'Digit3', shift: true, name: '" (សញ្ញាសម្រង់)' },
    '4': { char: '៤', code: 'Digit4', shift: false, name: '៤ (បួន)' },
    '$': { char: '៛', code: 'Digit4', shift: true, name: '៛ (សញ្ញារៀល)' },
    '5': { char: '៥', code: 'Digit5', shift: false, name: '៥ (ប្រាំ)' },
    '%': { char: 'ៈ', code: 'Digit5', shift: true, name: 'ៈ (យុគលពិន្ទុ)' },
    '6': { char: '៦', code: 'Digit6', shift: false, name: '៦ (ប្រាំមួយ)' },
    '^': { char: '់', code: 'Digit6', shift: true, name: '់ (បន្តក់)' },
    '7': { char: '៧', code: 'Digit7', shift: false, name: '៧ (ប្រាំពីរ)' },
    '&': { char: '៏', code: 'Digit7', shift: true, name: '៏ (លេខអស្ដា)' },
    '8': { char: '៨', code: 'Digit8', shift: false, name: '៨ (ប្រាំបី)' },
    '*': { char: '៌', code: 'Digit8', shift: true, name: '៌ (សញ្ញាគformatting)' },
    '9': { char: '៩', code: 'Digit9', shift: false, name: '៩ (ប្រាំបួន)' },
    '(': { char: '៍', code: 'Digit9', shift: true, name: '៍ (ទណ្ឌឃាត)' },
    '0': { char: '០', code: 'Digit0', shift: false, name: '០ (សូន្យ)' },
    ')': { char: '័', code: 'Digit0', shift: true, name: '័ (សំយោគសញ្ញា)' },
    '-': { char: 'ឥ', code: 'Minus', shift: false, name: 'ឥ (ស្រៈពេញតួ ឥ)' },
    '_': { char: 'ឦ', code: 'Minus', shift: true, name: 'ឦ (ស្រៈពេញតួ ឦ)' },
    '=': { char: 'ឰ', code: 'Equal', shift: false, name: 'ឰ (ស្រៈពេញតួ ឰ)' },
    '+': { char: '=', code: 'Equal', shift: true, name: '= (សញ្ញាស្មើ)' },

    // Row 2 (QWERTY Letters Top)
    'q': { char: 'ឆ', code: 'KeyQ', shift: false, name: 'ឆ (ឆោ)' },
    'Q': { char: 'ឈ', code: 'KeyQ', shift: true, name: 'ឈ (ឈើ)' },
    'w': { char: 'ឹ', code: 'KeyW', shift: false, name: 'ឹ (ស្រៈ ឹ)' },
    'W': { char: 'ឺ', code: 'KeyW', shift: true, name: 'ឺ (ស្រៈ ឺ)' },
    'e': { char: 'េ', code: 'KeyE', shift: false, name: 'េ (ស្រៈ េ)' },
    'E': { char: 'ែ', code: 'KeyE', shift: true, name: 'ែ (ស្រៈ ែ)' },
    'r': { char: 'រ', code: 'KeyR', shift: false, name: 'រ (រកា)' },
    'R': { char: 'ឬ', code: 'KeyR', shift: true, name: 'ឬ (ស្រៈពេញតួ ឬ)' },
    't': { char: 'ត', code: 'KeyT', shift: false, name: 'ត (តា)' },
    'T': { char: 'ទ', code: 'KeyT', shift: true, name: 'ទ (ទា)' },
    'y': { char: 'យ', code: 'KeyY', shift: false, name: 'យ (យក្ស)' },
    'Y': { char: 'ួ', code: 'KeyY', shift: true, name: 'ួ (ស្រៈ ួ)' },
    'u': { char: 'ុ', code: 'KeyU', shift: false, name: 'ុ (ស្រៈ ុ)' },
    'U': { char: 'ូ', code: 'KeyU', shift: true, name: 'ូ (ស្រៈ ូ)' },
    'i': { char: 'ិ', code: 'KeyI', shift: false, name: 'ិ (ស្រៈ ិ)' },
    'I': { char: 'ី', code: 'KeyI', shift: true, name: 'ី (ស្រៈ ី)' },
    'o': { char: 'ោ', code: 'KeyO', shift: false, name: 'ោ (ស្រៈ ោ)' },
    'O': { char: 'ៅ', code: 'KeyO', shift: true, name: 'ៅ (ស្រៈ ៅ)' },
    'p': { char: 'ផ', code: 'KeyP', shift: false, name: 'ផ (ផែន)' },
    'P': { char: 'ភ', code: 'KeyP', shift: true, name: 'ភ (ភ្នំ)' },
    '[': { char: 'ៀ', code: 'BracketLeft', shift: false, name: 'ៀ (ស្រៈ ៀ)' },
    '{': { char: 'ឿ', code: 'BracketLeft', shift: true, name: 'ឿ (ស្រៈ ឿ)' },
    ']': { char: 'ឲ', code: 'BracketRight', shift: false, name: 'ឲ (ស្រៈពេញតួ ឲ)' },
    '}': { char: 'ឱ', code: 'BracketRight', shift: true, name: 'ឱ (ស្រៈពេញតួ ឱ)' },
    '\\': { char: 'ឮ', code: 'Backslash', shift: false, name: 'ឮ (ស្រៈពេញតួ ឮ)' },
    '|': { char: 'ឡ', code: 'Backslash', shift: true, name: 'ឡ (ឡា)' },

    // Row 3 (QWERTY Letters Home)
    'a': { char: 'ា', code: 'KeyA', shift: false, name: 'ា (ស្រៈ ា)' },
    'A': { char: 'ាំ', code: 'KeyA', shift: true, name: 'ាំ (ស្រៈ ាំ)' },
    's': { char: 'ស', code: 'KeyS', shift: false, name: 'ស (សត្វ)' },
    'S': { char: 'ៃ', code: 'KeyS', shift: true, name: 'ៃ (ស្រៈ ៃ)' },
    'd': { char: 'ដ', code: 'KeyD', shift: false, name: 'ដ (ដំរី)' },
    'D': { char: 'ឌ', code: 'KeyD', shift: true, name: 'ឌ (ឌី)' },
    'f': { char: 'ថ', code: 'KeyF', shift: false, name: 'ថ (ថង់)' },
    'F': { char: 'ធ', code: 'KeyF', shift: true, name: 'ធ (ធ្នូ)' },
    'g': { char: 'ង', code: 'KeyG', shift: false, name: 'ង (ង៉ា)' },
    'G': { char: 'អ', code: 'KeyG', shift: true, name: 'អ (អូន)' },
    'h': { char: 'ហ', code: 'KeyH', shift: false, name: 'ហ (ហង្ស)' },
    'H': { char: 'ះ', code: 'KeyH', shift: true, name: 'ះ (រះមុខ)' },
    'j': { char: '្', code: 'KeyJ', shift: false, name: '្ (សញ្ញាជើង)' },
    'J': { char: 'ញ', code: 'KeyJ', shift: true, name: 'ញ (ញញឹម)' },
    'k': { char: 'ក', code: 'KeyK', shift: false, name: 'ក (ក្អែក)' },
    'K': { char: 'គ', code: 'KeyK', shift: true, name: 'គ (គោក)' },
    'l': { char: 'ល', code: 'KeyL', shift: false, name: 'ល (លលក)' },
    'L': { char: 'ឡ', code: 'KeyL', shift: true, name: 'ឡ (ឡា)' },
    ';': { char: 'ើ', code: 'Semicolon', shift: false, name: 'ើ (ស្រៈ ើ)' },
    ':': { char: 'ោះ', code: 'Semicolon', shift: true, name: 'ោះ (ស្រៈ ោះ)' },
    '\'': { char: '់', code: 'Quote', shift: false, name: '់ (បន្តក់)' },
    '"': { char: '៉', code: 'Quote', shift: true, name: '៉ (មូសិកទន្ត)' },

    // Row 4 (QWERTY Letters Bottom)
    'z': { char: 'ឋ', code: 'KeyZ', shift: false, name: 'ឋ (ឋាន)' },
    'Z': { char: 'ឍ', code: 'KeyZ', shift: true, name: 'ឍ (ឍី)' },
    'x': { char: 'ខ', code: 'KeyX', shift: false, name: 'ខ (ខែ)' },
    'X': { char: 'ឃ', code: 'KeyX', shift: true, name: 'ឃ (ឃ្មុំ)' },
    'c': { char: 'ច', code: 'KeyC', shift: false, name: 'ច (ចាប)' },
    'C': { char: 'ជ', code: 'KeyC', shift: true, name: 'ជ (ជើង)' },
    'v': { char: 'វ', code: 'KeyV', shift: false, name: 'វ (វល្លិ)' },
    'V': { char: 'េះ', code: 'KeyV', shift: true, name: 'េះ (ស្រៈ េះ)' },
    'b': { char: 'ប', code: 'KeyB', shift: false, name: 'ប (បក្សី)' },
    'B': { char: 'ព', code: 'KeyB', shift: true, name: 'ព (ពពក)' },
    'n': { char: 'ន', code: 'KeyN', shift: false, name: 'ន (នាង)' },
    'N': { char: 'ណ', code: 'KeyN', shift: true, name: 'ណ (ណី)' },
    'm': { char: 'ម', code: 'KeyM', shift: false, name: 'ម (មាន់)' },
    'M': { char: 'ំ', code: 'KeyM', shift: true, name: 'ំ (និគ្គហិត)' },
    ',': { char: ',', code: 'Comma', shift: false, name: ', (ក្បៀស)' },
    '<': { char: '<', code: 'Comma', shift: true, name: '< (តូចជាង)' },
    '.': { char: '។', code: 'Period', shift: false, name: '។ (ខណ្ឌសញ្ញា)' },
    '>': { char: '៕', code: 'Period', shift: true, name: '៕ (បរិយោសាន)' },
    '/': { char: '៊', code: 'Slash', shift: false, name: '៊ (ត្រីសព្ទ)' },
    '?': { char: '?', code: 'Slash', shift: true, name: '? (សញ្ញាសួរ)' },

    // Special Spaces
    ' ': { char: '\u200B', code: 'Space', shift: false, name: 'ដកឃ្លាមើលមិនឃើញ (ZWSP)' },
    'ShiftSpace': { char: ' ', code: 'Space', shift: true, name: 'ដកឃ្លា (Space)' }
};

// Create a reverse mapping (Khmer character -> QWERTY keystroke info)
const KHMER_TO_QWERTY = {};
for (const [key, val] of Object.entries(KHMER_KEYMAP)) {
    // Ensure we don't overwrite standard space mapping if we process ShiftSpace
    if (key === 'ShiftSpace') {
        KHMER_TO_QWERTY[' '] = val;
    } else {
        KHMER_TO_QWERTY[val.char] = {
            qwerty: key,
            code: val.code,
            shift: val.shift,
            name: val.name
        };
    }
}

// Ensure Zero Width Space maps correctly to Spacebar without Shift
KHMER_TO_QWERTY['\u200B'] = { qwerty: ' ', code: 'Space', shift: false, name: 'ដកឃ្លាមើលមិនឃើញ (ZWSP)' };
// Explicitly define visible space mapping
KHMER_TO_QWERTY[' '] = { qwerty: ' ', code: 'Space', shift: true, name: 'ដកឃ្លា (Space)' };

// Add special combinations that output multiple codepoints (e.g. ាំ, េះ, ោះ)
// Since the prompt strings might contain these precomposed or decomposed, we should support them!
KHMER_TO_QWERTY['ាំ'] = { qwerty: 'A', code: 'KeyA', shift: true, name: 'ាំ (ស្រៈ ាំ)' };
KHMER_TO_QWERTY['េះ'] = { qwerty: 'V', code: 'KeyV', shift: true, name: 'េះ (ស្រៈ េះ)' };
KHMER_TO_QWERTY['ោះ'] = { qwerty: ':', code: 'Semicolon', shift: true, name: 'ោះ (ស្រៈ ោះ)' };


// --- Game Content Pool (Lessons & Sentences) ---
const GAME_LESSONS = {
    consonants: [
        "កខគឃង",
        "ចឆជឈញ",
        "ដឋឌឍណ",
        "តថទធន",
        "បផពភម",
        "យរលវសហឡអ"
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
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playError() {
        if (!this.enabled) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
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
        this.currentLesson = 'words';
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

        // Parallax background speed control
        this.isRunnerActive = true;
    }

    init() {
        this.changeLesson(this.dom.levelSelect.value);
        this.restartStats();
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
        
        // Cancel obstacle loop
        if (this.obstacleFrameId) {
            cancelAnimationFrame(this.obstacleFrameId);
            this.obstacleFrameId = null;
        }
        
        // Clear active and crumbling obstacle elements from DOM
        if (this.activeObstacles) {
            this.activeObstacles.forEach(o => {
                if (o.el && o.el.parentNode) o.el.parentNode.removeChild(o.el);
            });
            this.activeObstacles = [];
        }
        if (this.crumblingElements) {
            this.crumblingElements.forEach(o => {
                if (o.el && o.el.parentNode) o.el.parentNode.removeChild(o.el);
            });
            this.crumblingElements = [];
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
        
        // Cancel obstacle loop
        if (this.obstacleFrameId) {
            cancelAnimationFrame(this.obstacleFrameId);
            this.obstacleFrameId = null;
        }
        
        // Pause running animations
        this.pauseRunnerAnimations();
        
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
        if (this.currentLesson === 'consonants') {
            this.initObstacleQueue();
            return;
        }

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
        // We need to parse codepoint-by-codepoint, but also account for combined marks in display.
        this.textCodepoints = Array.from(text);

        // Update monster display label (shorten if too long)
        let monsterLabel = text.replace(/\u200B/g, ' '); // Replace ZWSP with space for label display
        if (monsterLabel.length > 12) {
            monsterLabel = monsterLabel.substring(0, 10) + '...';
        }
        this.dom.monsterText.innerText = monsterLabel;
        this.dom.monster.className = 'monster';

        this.renderPromptSlab();
        this.updateNextCharacterHint();
    }

    // --- LEVEL 1 MULTI-OBSTACLE QUEUE ENGINE FUNCTIONS ---
    initObstacleQueue() {
        // Clear existing obstacles
        if (this.activeObstacles) {
            this.activeObstacles.forEach(o => {
                if (o.el && o.el.parentNode) o.el.parentNode.removeChild(o.el);
            });
        }
        if (this.crumblingElements) {
            this.crumblingElements.forEach(o => {
                if (o.el && o.el.parentNode) o.el.parentNode.removeChild(o.el);
            });
        }

        this.activeObstacles = [];
        this.crumblingElements = [];

        // Hide original monster
        if (this.dom.monster) {
            this.dom.monster.style.display = 'none';
        }

        // Pre-spawn 4 spaced out obstacles
        let startX = 500;
        for (let i = 0; i < 4; i++) {
            this.spawnObstacleAt(startX);
            startX += 300;
        }

        this.updateActiveTarget();
    }

    spawnObstacleAt(x) {
        const consonantsPool = "កខគឃងចឆជឈញដឋឌឍណតថទធនបផពភមយរលវសហឡអ";
        const randomChar = consonantsPool[Math.floor(Math.random() * consonantsPool.length)];
        const types = ['sentinel', 'crate', 'gap'];
        const type = types[Math.floor(Math.random() * types.length)];

        // Create DOM element
        const el = document.createElement('div');
        el.className = `monster ${type === 'sentinel' ? 'robot-sentinel' : type === 'crate' ? 'cyber-crate' : 'floor-gap'}`;
        el.style.position = 'absolute';
        el.style.bottom = '30px';
        el.style.left = `${x}px`;
        el.style.right = 'auto';
        el.style.transition = 'none'; // disable frame transit delay

        const label = document.createElement('div');
        label.className = 'monster-label';
        label.innerText = randomChar;
        el.appendChild(label);

        this.dom.explorer.parentElement.appendChild(el);

        this.activeObstacles.push({
            type: type,
            char: randomChar,
            x: x,
            el: el
        });
    }

    updateActiveTarget() {
        if (this.activeObstacles.length === 0) return;

        const target = this.activeObstacles[0];
        this.obstacleType = target.type;
        this.obstacleChar = target.char;
        this.obstacleX = target.x;

        this.currentText = target.char;
        this.textCodepoints = [target.char];
        this.typedIndex = 0;

        // Visual distinction for the current target obstacle
        this.activeObstacles.forEach((o, index) => {
            const labelEl = o.el.querySelector('.monster-label');
            if (labelEl) {
                if (index === 0) {
                    labelEl.style.borderColor = 'var(--primary-cyan)';
                    labelEl.style.boxShadow = '0 0 15px var(--primary-cyan)';
                } else {
                    labelEl.style.borderColor = '';
                    labelEl.style.boxShadow = '';
                }
            }
        });

        this.renderPromptSlab();
        this.updateNextCharacterHint();
    }

    obstacleUpdateLoop() {
        if (this.isPaused || this.currentLesson !== 'consonants') {
            this.obstacleFrameId = null;
            return;
        }

        const speed = 2.5 + (this.consonantProgress * 0.15);

        // Move active obstacles
        this.activeObstacles.forEach(o => {
            o.x -= speed;
            o.el.style.left = `${o.x}px`;
        });

        // Move and garbage-collect crumbling obstacles
        for (let i = this.crumblingElements.length - 1; i >= 0; i--) {
            const c = this.crumblingElements[i];
            c.x -= speed;
            c.el.style.left = `${c.x}px`;
            if (c.x < -100) {
                if (c.el && c.el.parentNode) c.el.parentNode.removeChild(c.el);
                this.crumblingElements.splice(i, 1);
            }
        }

        // Maintain the obstacle queue ahead of explorer
        if (this.activeObstacles.length > 0) {
            const lastObstacle = this.activeObstacles[this.activeObstacles.length - 1];
            const stageWidth = this.dom.explorer.parentElement.clientWidth || 900;
            if (lastObstacle.x < stageWidth) {
                this.spawnObstacleAt(lastObstacle.x + 300);
            }
        }

        // Verify collision on active target
        if (this.activeObstacles.length > 0) {
            const target = this.activeObstacles[0];
            this.obstacleX = target.x;
            if (target.x <= 140) {
                this.handleObstacleMiss(target);
                return;
            }
        }

        this.obstacleFrameId = requestAnimationFrame(() => this.obstacleUpdateLoop());
    }

    handleObstacleMiss(target) {
        this.incorrectKeyPressCount++;
        this.score = Math.max(0, this.score - 5);
        
        synth.playError();
        this.triggerPlayerDamage();

        // Remove from active queue and let it pass through
        const shifted = this.activeObstacles.shift();
        if (shifted) {
            this.crumblingElements.push(shifted); // scrolls off-screen without crumble class
        }

        this.updateStatsDisplay();
        this.updateActiveTarget();
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
        
        // Translate Space inputs: ZWSP vs visible space
        if (e.code === 'Space') {
            typedChar = e.shiftKey ? ' ' : '\u200B';
        } else {
            // Find key character mapping
            let physicalKey = e.key;
            // Map standard keys
            const mapInfo = KHMER_KEYMAP[physicalKey];
            if (mapInfo) {
                typedChar = mapInfo.char;
            } else {
                // Try fallback QWERTY translation (when OS layout is already set to Khmer)
                // If they type Khmer directly, e.key is already Khmer character!
                typedChar = e.key;
            }
        }

        // Validate character typed against current index
        const expectedChar = this.textCodepoints[this.typedIndex];
        
        if (typedChar === expectedChar || e.key === expectedChar) {
            this.processCorrectKeystroke();
        } else {
            this.processIncorrectKeystroke();
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
        
        if (this.currentLesson === 'consonants') {
            this.score += 15;
            synth.playClick();
            
            // Trigger correct explorer action based on obstacle type
            if (this.obstacleType === 'sentinel') {
                this.triggerExplorerAction('attack');
            } else if (this.obstacleType === 'crate') {
                this.triggerExplorerAction('smash');
            } else if (this.obstacleType === 'gap') {
                this.triggerExplorerAction('jump');
            }

            // Move current target to crumbling list
            const target = this.activeObstacles.shift();
            if (target) {
                target.el.classList.add('crumble');
                this.crumblingElements.push(target);
            }

            this.consonantProgress++;
            this.updateStatsDisplay();

            // Check if level completed
            if (this.consonantProgress >= this.consonantTarget) {
                synth.playSuccess();
                this.clearKeyHighlights();
                
                // Clear remaining obstacles
                this.activeObstacles.forEach(o => {
                    if (o.el && o.el.parentNode) o.el.parentNode.removeChild(o.el);
                });
                this.activeObstacles = [];

                this.dom.nextCharHint.innerHTML = "អបអរសាទរ! Level 1 Completed! 🎉";
                this.pauseRunnerAnimations();

                if (this.obstacleFrameId) {
                    cancelAnimationFrame(this.obstacleFrameId);
                    this.obstacleFrameId = null;
                }

                setTimeout(() => {
                    this.changeLesson('vowels'); // auto progress to vowels
                }, 1500);
            } else {
                // Instantly update active target and keep moving
                this.updateActiveTarget();
            }
            return;
        }

        this.score += 10;
        
        synth.playClick();
        this.renderPromptSlab();

        // Jump Explorer on typing vowels/combining signs, jump/attack on consonants
        const char = this.textCodepoints[this.typedIndex - 1];
        if (['ក','ខ','គ','ឃ','ង','ច','ឆ','ជ','ឈ','ញ','ដ','ឋ','ឌ','ឍ','ណ','ត','ថ','ទ','ធ','ន','ប','ផ','ព','ភ','ម','យ','រ','ល','វ','ស','ហ','ឡ','អ'].includes(char)) {
            this.triggerExplorerAction('attack');
        } else if (['ា','ិ','ី','ឹ','ឺ','ុ','ូ','ួ','ើ','ឿ','ៀ','េ','ែ','ៃ','ោ','ៅ','្','់','ំ','ះ'].includes(char)) {
            this.triggerExplorerAction('jump');
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
        this.errorsCount++;
        this.incorrectKeyPressCount++; // Increment target error counter
        this.score = Math.max(0, this.score - 5);
        
        synth.playError();
        
        if (this.currentLesson === 'consonants') {
            this.triggerPlayerDamage();

            // Shake prompt slab
            this.dom.typingText.parentElement.classList.add('shake');
            setTimeout(() => {
                this.dom.typingText.parentElement.classList.remove('shake');
            }, 200);

            // Remove current target from active queue and let it pass through
            const target = this.activeObstacles.shift();
            if (target) {
                this.crumblingElements.push(target); // scrolls off-screen without crumble class
            }

            this.updateStatsDisplay();
            this.updateActiveTarget();
            return;
        }

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
        
        // Defeat monster animation
        this.dom.monster.classList.add('crumble');
        this.pauseRunnerAnimations();
        
        synth.playSuccess();

        setTimeout(() => {
            this.loadNextText();
            this.resumeRunnerAnimations();
        }, 1200);
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
                    preventDefault: () => {},
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
