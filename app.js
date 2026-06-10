// --- Keyboard Layout Management ---
let currentLayoutMode = "nida";
let activeLayoutData = null;
let KHMER_TO_QWERTY = {};

async function loadLayout(layoutName) {
    try {
        const response = await fetch(`./layout_${layoutName}.json`);
        const data = await response.json();
        activeLayoutData = data;

        KHMER_TO_QWERTY = {};
        for (const [key, val] of Object.entries(activeLayoutData)) {
            let codeStr = 'Key' + key.toUpperCase();
            if (key >= '0' && key <= '9') codeStr = 'Digit' + key;
            if (key === 'space') codeStr = 'Space';
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

            if (val.normal) KHMER_TO_QWERTY[val.normal] = { qwerty: key, code: codeStr, shift: false, name: val.normal };
            if (val.shift) KHMER_TO_QWERTY[val.shift] = { qwerty: key, code: codeStr, shift: true, name: val.shift };
            if (val.altGr) KHMER_TO_QWERTY[val.altGr] = { qwerty: key, code: codeStr, shift: false, altGr: true, name: val.altGr };
        }

        // Add special combinations that output multiple codepoints (e.g. ាំ, េះ, ោះ)
        KHMER_TO_QWERTY['ាំ'] = { qwerty: 'A', code: 'KeyA', shift: true, name: 'ាំ (ស្រៈ ាំ)' };
        KHMER_TO_QWERTY['េះ'] = { qwerty: 'V', code: 'KeyV', shift: true, name: 'េះ (ស្រៈ េះ)' };
        KHMER_TO_QWERTY['ោះ'] = { qwerty: ':', code: 'Semicolon', shift: true, name: 'ោះ (ស្រៈ ោះ)' };

        if (window.gameInstance) {
            window.gameInstance.updateVirtualKeyboardLabels();
        }
    } catch (e) {
        console.error("Failed to load layout:", e);
    }
}


// --- Game Content Pool (Lessons & Sentences) ---
let GAME_LESSONS = {};

async function loadLessons() {
    const lessonFiles = [
        'consonants', 'vowels', 'vowels_words', 'independent_vowels', 
        'independent_vowels_words', 'subscripts', 'words', 'sentences', 'endless'
    ];
    for (const file of lessonFiles) {
        try {
            const res = await fetch(`lessons/${file}.json`);
            if (res.ok) {
                GAME_LESSONS[file] = await res.json();
            } else {
                console.error(`Failed to load lesson: ${file}`);
            }
        } catch (e) {
            console.error(`Error loading lesson ${file}:`, e);
        }
    }
}


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
        this.successfulClears = 0;
        this.linearTargetIndex = 0;
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
        this.successfulClears = 0;
        this.linearTargetIndex = 0;

        this.dom = {
            wpm: document.querySelector('#stat-wpm .stat-value'),
            accuracy: document.querySelector('#stat-accuracy .stat-value'),
            time: document.querySelector('#stat-time .stat-value'),
            score: document.querySelector('#stat-score .stat-value'),
            errors: document.querySelector('#stat-errors .stat-value'),
            progressBarText: document.querySelector('.progress-text'),
            progressBarFill: document.querySelector('.progress-bar-fill'),
            levelSelect: document.getElementById('level-select'),
            layoutSelect: document.getElementById('layout-select'),
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
            pauseBtnRestart: document.getElementById('pause-btn-restart'),
            launchOverlay: document.getElementById('launch-menu-overlay'),
            launchLevelSelect: document.getElementById('launch-level-select'),
            launchBtnStart: document.getElementById('launch-btn-start'),
            levelCompleteOverlay: document.getElementById('level-complete-overlay'),
            completeScore: document.getElementById('complete-score'),
            completeWpm: document.getElementById('complete-wpm'),
            completeErrors: document.getElementById('complete-errors'),
            completeAccuracy: document.getElementById('complete-accuracy'),
            completeLevelSelect: document.getElementById('complete-level-select'),
            btnRestartLesson: document.getElementById('btn-restart-lesson'),
            btnNextLesson: document.getElementById('btn-next-lesson')
        };

        // Bind events
        this.dom.levelSelect.addEventListener('change', (e) => this.changeLesson(e.target.value));
        if (this.dom.layoutSelect) {
            this.dom.layoutSelect.addEventListener('change', async (e) => {
                currentLayoutMode = e.target.value;
                await loadLayout(currentLayoutMode);
                // The updateVirtualKeyboardLabels is called inside loadLayout
                // So no need to call it again, but if we need focus back, we can handle it
                this.dom.explorer.focus();
            });
        }
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
        // Boot directly into paused launch menu state
        this.isPaused = true;
        this.pauseRunnerAnimations();
        this.dom.launchOverlay.classList.remove('hide');
        this.restartStats();

        // Start Game Button Handler
        this.dom.launchBtnStart.addEventListener('click', () => {
            this.dom.launchOverlay.classList.add('hide');
            const selectedLesson = this.dom.launchLevelSelect.value;

            // Sync all dropdowns and init level
            this.dom.levelSelect.value = selectedLesson;
            this.dom.pauseLevelSelect.value = selectedLesson;
            this.changeLesson(selectedLesson);

            this.isPaused = false;
            this.resumeGame();
        });

        // Level Complete Buttons
        this.dom.btnRestartLesson.addEventListener('click', () => {
            this.dom.levelCompleteOverlay.classList.add('hide');
            this.restartGame();
            this.resumeGame();
        });

        this.dom.btnNextLesson.addEventListener('click', () => {
            this.dom.levelCompleteOverlay.classList.add('hide');
            const select = this.dom.launchLevelSelect;
            if (select.selectedIndex < select.options.length - 1) {
                select.selectedIndex++;
            } else {
                select.selectedIndex = 0; // Wrap around to start if it's the last lesson
            }
            const nextLesson = select.value;
            this.dom.levelSelect.value = nextLesson;
            this.dom.pauseLevelSelect.value = nextLesson;
            this.dom.completeLevelSelect.value = nextLesson;
            this.changeLesson(nextLesson);
            this.resumeGame();
        });

        // Change lesson from the complete menu dropdown
        this.dom.completeLevelSelect.addEventListener('change', (e) => {
            const selectedLesson = e.target.value;
            this.dom.levelSelect.value = selectedLesson;
            this.dom.pauseLevelSelect.value = selectedLesson;
            this.dom.launchLevelSelect.value = selectedLesson;
            this.changeLesson(selectedLesson);

            this.dom.levelCompleteOverlay.classList.add('hide');
            this.isPaused = false;
            this.resumeGame();
        });
    }

    updateVirtualKeyboardLabels(isAltGrActive = false) {
        if (!activeLayoutData) return;
        for (const [key, mapInfo] of Object.entries(activeLayoutData)) {
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
                const englishEl = keyEl.querySelector('.key-bottom-left');

                if (isAltGrActive) {
                    if (normalEl) normalEl.innerText = "";
                    if (shiftEl) shiftEl.innerText = "";
                    if (englishEl) englishEl.innerText = "";
                    if (altGrEl) {
                        if (mapInfo.altGr) {
                            altGrEl.innerText = mapInfo.altGr;
                            altGrEl.classList.add('purple');
                            // Scale and center the active AltGr symbol
                            altGrEl.style.fontSize = '1.75rem';
                            altGrEl.style.top = '50%';
                            altGrEl.style.left = '50%';
                            altGrEl.style.transform = 'translate(-50%, -50%)';
                            altGrEl.style.color = '#00e5ff';
                        } else {
                            altGrEl.innerText = "";
                        }
                    }
                } else {
                    if (normalEl) normalEl.innerText = mapInfo.normal || "";
                    if (shiftEl) shiftEl.innerText = mapInfo.shift || "";
                    // Restore English key logic
                    if (englishEl) {
                        if (key >= '0' && key <= '9') englishEl.innerText = key;
                        else if (key === '-') englishEl.innerText = "-";
                        else if (key === '=') englishEl.innerText = "=";
                        else if (key === '[') englishEl.innerText = "[";
                        else if (key === ']') englishEl.innerText = "]";
                        else if (key === '\\') englishEl.innerText = "\\";
                        else if (key === ';') englishEl.innerText = ";";
                        else if (key === '\'') englishEl.innerText = "'";
                        else if (key === ',') englishEl.innerText = ",";
                        else if (key === '.') englishEl.innerText = ".";
                        else if (key === '/') englishEl.innerText = "/";
                        else englishEl.innerText = key.toUpperCase();
                    }
                    if (altGrEl) {
                        // Reset centering and font scaling
                        altGrEl.style.fontSize = '';
                        altGrEl.style.top = '';
                        altGrEl.style.left = '';
                        altGrEl.style.transform = '';
                        altGrEl.style.color = '';
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
    }

    restartStats() {
        this.score = 0;
        this.correctCharsTyped = 0;
        this.totalCharsTyped = 0;
        this.errorsCount = 0;
        this.incorrectKeyPressCount = 0;
        this.elapsedSeconds = 0;
        this.startTime = null;
        this.successfulClears = 0;
        this.phrasesCleared = 0;
        this.linearTargetIndex = 0;

        if (this.dom.progressBarFill) {
            this.dom.progressBarFill.style.width = '0%';
            this.dom.progressBarText.innerText = '0%';
        }

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

        // Resume obstacle loop if consonants, vowels or independent vowels level
        if (['consonants', 'vowels', 'independent_vowels', 'subscripts'].includes(this.currentLesson)) {
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
        let pool = GAME_LESSONS[this.currentLesson];
        let text = "";

        const isIsolatedTargetMode = ['consonants', 'vowels', 'independent_vowels', 'subscripts'].includes(this.currentLesson);
        let parsed = [];

        if (this.currentLesson === 'endless') {
            // Endless mode compiles 4 random words separated by ZWSP
            const words = [];
            for (let i = 0; i < 4; i++) {
                words.push(pool[Math.floor(Math.random() * pool.length)]);
            }
            // Join words using Zero Width Space (ZWSP)
            text = words.join('\u200B');
        } else if (isIsolatedTargetMode) {
            if (this.currentLesson === 'consonants') {
                if (this.successfulClears >= 33) {
                    for (let i = 0; i < 33; i++) parsed.push(pool[Math.floor(Math.random() * pool.length)]);
                } else {
                    const activePhasePool = pool;
                    for (let i = 0; i < activePhasePool.length; i++) {
                        let currentTarget = activePhasePool[this.linearTargetIndex];
                        parsed.push(currentTarget);
                        this.linearTargetIndex++;
                        if (this.linearTargetIndex >= activePhasePool.length) this.linearTargetIndex = 0;
                    }
                }
            } else if (this.currentLesson === 'vowels') {
                if (this.successfulClears >= 23) {
                    pool = GAME_LESSONS['vowels_words'];
                    for (let i = 0; i < 15; i++) parsed.push(pool[Math.floor(Math.random() * pool.length)]);
                } else {
                    const activePhasePool = pool;
                    for (let i = 0; i < activePhasePool.length; i++) {
                        let currentTarget = activePhasePool[this.linearTargetIndex];
                        parsed.push(currentTarget);
                        this.linearTargetIndex++;
                        if (this.linearTargetIndex >= activePhasePool.length) this.linearTargetIndex = 0;
                    }
                }
            } else if (this.currentLesson === 'independent_vowels') {
                if (this.successfulClears >= 6) {
                    pool = GAME_LESSONS['independent_vowels_words'];
                    for (let i = 0; i < 15; i++) parsed.push(pool[Math.floor(Math.random() * pool.length)]);
                } else {
                    const activePhasePool = pool;
                    for (let i = 0; i < activePhasePool.length; i++) {
                        let currentTarget = activePhasePool[this.linearTargetIndex];
                        parsed.push(currentTarget);
                        this.linearTargetIndex++;
                        if (this.linearTargetIndex >= activePhasePool.length) this.linearTargetIndex = 0;
                    }
                }
            } else if (this.currentLesson === 'subscripts') {
                const activePhasePool = pool;
                for (let i = 0; i < activePhasePool.length; i++) {
                    let currentTarget = activePhasePool[this.linearTargetIndex];
                    parsed.push(currentTarget);
                    this.linearTargetIndex++;
                    if (this.linearTargetIndex >= activePhasePool.length) this.linearTargetIndex = 0;
                }
            }
            text = parsed.join('');
        } else {
            // Level mode picks a random sentence/block
            text = pool[Math.floor(Math.random() * pool.length)];
        }

        this.currentText = text;
        this.typedIndex = 0;

        // Clear active static obstacles from DOM to prevent state leakage
        if (this.activeObstacles) {
            this.activeObstacles.forEach(o => {
                if (o.el && o.el.parentNode) o.el.parentNode.removeChild(o.el);
            });
            this.activeObstacles = [];
        }

        if (!isIsolatedTargetMode) {
            // Parse text into codepoints, ensuring complex vowels remain single elements
            const compounds = ['ាំ', 'ុំ', 'ោះ', 'ុះ', 'េះ'];
            let tempArr = Array.from(text);
            for (let i = 0; i < tempArr.length; i++) {
                if (i < tempArr.length - 1) {
                    const combined = tempArr[i] + tempArr[i + 1];
                    if (compounds.includes(combined)) {
                        parsed.push(combined);
                        i++;
                        continue;
                    }
                }
                parsed.push(tempArr[i]);
            }
        }
        this.textCodepoints = parsed;

        // Update monster display label
        let monsterLabel = text.replace(/\u200B/g, ' ');
        if (monsterLabel.length > 12) {
            monsterLabel = monsterLabel.substring(0, 10) + '...';
        }

        if (['consonants', 'vowels', 'independent_vowels', 'subscripts'].includes(this.currentLesson)) {
            this.dom.monster.style.display = 'none'; // hide monster for basic linear progression
        } else {
            this.dom.monster.style.display = '';
            this.dom.monsterText.innerText = monsterLabel;
            this.dom.monster.className = 'monster';
        }

        this.renderPromptSlab();
        this.spawnStaticObstacles();
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

            // Dynamic obstacle type assignment based on character type
            const jumpChars = ['័', '៍', '៏', '៌', '៖', 'ៈ', 'ៗ', '(', ')', '៕', 'រួ', 'ួ', '!'];
            let type = '';
            let className = '';

            if (jumpChars.includes(char)) {
                type = 'gap';
                className = 'floor-gap';
            } else {
                type = (i % 2 === 0) ? 'sentinel' : 'crate';
                className = type === 'sentinel' ? 'robot-sentinel' : 'cyber-crate';
            }

            const el = document.createElement('div');
            el.className = `monster ${className}`;
            el.style.position = 'absolute';
            el.style.bottom = '30px';
            el.style.left = `${xPos}px`;
            el.style.right = 'auto';
            el.style.transition = 'none';
            el.style.zIndex = '1';

            const label = document.createElement('div');
            label.className = 'monster-label';
            label.innerText = char;
            label.style.fontSize = '2rem';
            label.style.fontWeight = 'bold';
            el.appendChild(label);

            if (['consonants', 'vowels', 'independent_vowels', 'subscripts'].includes(this.currentLesson)) {
                this.dom.explorer.parentElement.appendChild(el);
            }

            let sequence = null;
            const normChar = char.normalize('NFC');
            
            let hasShortcut = false;
            if (activeLayoutData) {
                for (const val of Object.values(activeLayoutData)) {
                    if (val.normal === normChar || val.shift === normChar || val.altGr === normChar) {
                        hasShortcut = true;
                        break;
                    }
                }
            }

            if (!hasShortcut && Array.from(normChar).length > 1) {
                let seq = [];
                let tempArr = Array.from(normChar);
                for (let i = 0; i < tempArr.length; i++) {
                    // Check 3-character compounds (like 'ោះ' which is េ + ោ + ះ)
                    if (i < tempArr.length - 2) {
                        const combined3 = tempArr[i] + tempArr[i+1] + tempArr[i+2];
                        let has3 = false;
                        if (activeLayoutData) {
                            for (const val of Object.values(activeLayoutData)) {
                                if (val.normal === combined3 || val.shift === combined3 || val.altGr === combined3) {
                                    has3 = true; break;
                                }
                            }
                        }
                        if (has3) {
                            seq.push(combined3);
                            i += 2;
                            continue;
                        }
                    }
                    // Check 2-character compounds (like 'ាំ', 'ុំ', 'េះ', 'ុះ')
                    if (i < tempArr.length - 1) {
                        const combined2 = tempArr[i] + tempArr[i + 1];
                        let has2 = false;
                        if (activeLayoutData) {
                            for (const val of Object.values(activeLayoutData)) {
                                if (val.normal === combined2 || val.shift === combined2 || val.altGr === combined2) {
                                    has2 = true; break;
                                }
                            }
                        }
                        if (has2) {
                            seq.push(combined2);
                            i++;
                            continue;
                        }
                    }
                    seq.push(tempArr[i]);
                }
                sequence = seq.map(s => s.normalize('NFC'));
            }

            this.activeObstacles.push({
                type: type,
                char: char.normalize('NFC'),
                sequence: sequence,
                currentStrokeIndex: 0,
                x: xPos,
                el: el
            });
        }

        if (this.obstacleFrameId) cancelAnimationFrame(this.obstacleFrameId);
        this.obstacleFrameId = requestAnimationFrame(() => this.obstacleUpdateLoop());
    }

    obstacleUpdateLoop() {
        if (this.isPaused || !['consonants', 'vowels', 'independent_vowels', 'subscripts'].includes(this.currentLesson)) {
            this.obstacleFrameId = null;
            return;
        }

        const speed = 0.2; // 10x slower to match floor parallax

        // Move ONLY the active target
        if (this.activeObstacles.length > 0 && this.typedIndex < this.activeObstacles.length) {
            const target = this.activeObstacles[this.typedIndex];

            // Ensure no CSS transitions fight with frame-by-frame sliding
            target.el.style.transition = 'none';

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
        if (!target.isCharging) {
            this.errorsCount++;
            this.incorrectKeyPressCount++;
            this.score = Math.max(0, this.score - 5);
            synth.playError();
        }
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

    showLevelCompleteScreen() {
        this.isPaused = true;
        this.pauseRunnerAnimations();
        clearInterval(this.timerInterval);

        synth.playSuccess();

        // Populate final stats
        this.dom.completeScore.innerText = this.score;
        this.dom.completeWpm.innerText = this.dom.wpm.innerText;
        this.dom.completeAccuracy.innerText = this.dom.accuracy.innerText;

        this.dom.levelCompleteOverlay.classList.remove('hide');
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
                html += `<span class="zwsp-visual-indicator ${classStr}" style="color: #00d2ff; margin: 0 4px; opacity: 0.6; font-weight: bold;">|</span>`;
            } else if (char === ' ') {
                html += `<span class="char-space-indicator ${classStr}">␣</span>`;
            } else {
                html += `<span class="${classStr}">${char}</span>`;
            }
        }

        this.dom.typingText.innerHTML = html;

        // Conditionally hide the slab for Lesson 1 & 2
        const slabContainer = this.dom.typingText.parentElement;
        if (['consonants', 'vowels', 'independent_vowels', 'subscripts'].includes(this.currentLesson)) {
            slabContainer.style.display = 'none';
        } else {
            slabContainer.style.display = '';
        }

        // After DOM update, slide the track to center the active target
        setTimeout(() => {
            const currentEl = this.dom.typingText.querySelector('.char-current');
            const slabWidth = this.dom.typingText.parentElement.offsetWidth;

            if (currentEl) {
                // Calculate exact offset to place the center of the active char in the center of the slab
                const centerOffset = (slabWidth / 2) - currentEl.offsetLeft - (currentEl.offsetWidth / 2);
                this.dom.typingText.style.transform = `translateX(${centerOffset}px)`;
            } else if (this.typedIndex === 0) {
                this.dom.typingText.style.transform = `translateX(${slabWidth / 2 - 15}px)`;
            }
        }, 0);
    }

    // Show hints for key combinations
    updateNextCharacterHint() {
        if (this.typedIndex >= this.textCodepoints.length) {
            this.dom.nextCharHint.innerHTML = "អបអរសាទរ! / Completed! 🎉";
            this.clearKeyHighlights();
            return;
        }

        let char = this.textCodepoints[this.typedIndex];
        let mapping = null;

        if (this.activeObstacles && this.typedIndex < this.activeObstacles.length) {
            const activeObstacle = this.activeObstacles[this.typedIndex];
            char = activeObstacle.char;

            let hasShortcut = false;
            if (activeLayoutData) {
                for (const val of Object.values(activeLayoutData)) {
                    if (val.normal === char || val.shift === char || val.altGr === char) {
                        hasShortcut = true;
                        break;
                    }
                }
            }

            // If there's no single-key shortcut (like "កា"), use the sequence substroke
            if (!hasShortcut && activeObstacle.sequence && activeObstacle.currentStrokeIndex < activeObstacle.sequence.length) {
                char = activeObstacle.sequence[activeObstacle.currentStrokeIndex];
            }

            // Explicit reverse lookup through active layout data
            if (activeLayoutData) {
                for (const [key, val] of Object.entries(activeLayoutData)) {
                    if (val.normal === char) {
                        mapping = { qwerty: key, shift: false, name: val.normal }; break;
                    } else if (val.shift === char) {
                        mapping = { qwerty: key, shift: true, name: val.shift }; break;
                    } else if (val.altGr === char) {
                        mapping = { qwerty: key, shift: false, altGr: true, name: val.altGr }; break;
                    }
                }
            }

            if (mapping) {
                let key = mapping.qwerty;
                let codeStr = 'Key' + key.toUpperCase();
                if (key >= '0' && key <= '9') codeStr = 'Digit' + key;
                if (key === 'space') codeStr = 'Space';
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
                mapping.code = codeStr;
            }
        }

        if (!mapping) {
            mapping = KHMER_TO_QWERTY[char];
        }

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

            // Highlight altGr key if needed
            if (mapping.altGr) {
                const altEl = document.getElementById('AltRight');
                const ctrlL = document.getElementById('ControlLeft');
                const altL = document.getElementById('AltLeft');
                if (altEl) altEl.classList.add('highlight-shift');
                if (ctrlL) ctrlL.classList.add('highlight-shift');
                if (altL) altL.classList.add('highlight-shift');
            }

            // Build human-readable instruction banner
            let keyCombo = mapping.shift ? `Shift + ${mapping.qwerty.toUpperCase()}` : mapping.qwerty.toUpperCase();
            if (mapping.altGr) {
                keyCombo = `AltGr + ${mapping.qwerty.toUpperCase()}`;
            }
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
        const altR = document.getElementById('AltRight');
        if (altR) altR.classList.remove('highlight-shift');
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
        const isIsolatedTargetMode = ['consonants', 'vowels', 'independent_vowels', 'subscripts'].includes(this.currentLesson);

        if (isIsolatedTargetMode) {
            let totalRequiredClears = 38;
            if (this.currentLesson === 'consonants') totalRequiredClears = 66;
            else if (this.currentLesson === 'independent_vowels') totalRequiredClears = 21;
            else if (this.currentLesson === 'subscripts') totalRequiredClears = 32;
            progressPercent = Math.min(100, Math.round((this.successfulClears / totalRequiredClears) * 100));
        } else {
            if (this.activeObstacles && this.activeObstacles.length > 0) {
                progressPercent = Math.min(100, Math.round((this.successfulClears / this.activeObstacles.length) * 100));
            }
        }

        this.dom.progressBarText.innerText = `${progressPercent}%`;
        this.dom.progressBarFill.style.width = `${progressPercent}%`;
    }

    // Intercept physical key presses
    handleKeyDown(e) {
        if (e.repeat) return; // Prevent held-down key repeats
        // Ignore inputs to selectors
        if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') return;

        // Diagnostic Console Tracker
        const activeObstacle = this.activeObstacles ? this.activeObstacles[this.typedIndex] : null;
        console.log(`[Diagnostic] typedInput: ${e.key}, currentLayoutMode: ${currentLayoutMode}, textCodepoint: ${this.textCodepoints ? this.textCodepoints[this.typedIndex] : undefined}, sequence: ${activeObstacle ? JSON.stringify(activeObstacle.sequence) : 'None'}, currentIndex: ${activeObstacle ? activeObstacle.currentStrokeIndex : 'None'}`);


        const isAltGrActive = (e.altKey && e.code === 'AltRight') || (e.ctrlKey && e.altKey);

        // Escape key toggles pause
        if (e.key === 'Escape') {
            this.togglePause();
            e.preventDefault();
            return;
        }

        // Block typing if paused
        if (this.isPaused) return;

        // Standard modifiers, function keys
        if (['Meta', 'CapsLock', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Dead', 'Enter', 'ContextMenu', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) return;

        // Shift modifier visual highlight
        if (e.key === 'Shift') {
            this.dom.keyboard.classList.add('shift-active');
            const shiftL = document.getElementById('ShiftLeft');
            const shiftR = document.getElementById('ShiftRight');
            if (shiftL) shiftL.classList.add('active');
            if (shiftR) shiftR.classList.add('active');
            return;
        }

        // Alt/AltGr/Ctrl modifier visual highlight
        if (e.key === 'Alt' || e.key === 'AltGraph' || e.key === 'Control') {
            if (isAltGrActive) {
                const altEl = document.getElementById('AltRight');
                if (altEl) altEl.classList.add('active');
                this.updateVirtualKeyboardLabels(true);
            }
            if (e.key !== 'Control') e.preventDefault();
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

        let physicalKey = "";
        if (e.code.startsWith('Key')) physicalKey = e.code.charAt(3).toLowerCase();
        else if (e.code.startsWith('Digit')) physicalKey = e.code.charAt(5);
        else if (e.code === 'Minus') physicalKey = '-';
        else if (e.code === 'Equal') physicalKey = '=';
        else if (e.code === 'BracketLeft') physicalKey = '[';
        else if (e.code === 'BracketRight') physicalKey = ']';
        else if (e.code === 'Backslash') physicalKey = '\\';
        else if (e.code === 'Semicolon') physicalKey = ';';
        else if (e.code === 'Quote') physicalKey = "'";
        else if (e.code === 'Comma') physicalKey = ',';
        else if (e.code === 'Period') physicalKey = '.';
        else if (e.code === 'Slash') physicalKey = '/';
        else if (e.code === 'Space') physicalKey = 'space';
        else physicalKey = e.key.toLowerCase();

        const mapInfo = activeLayoutData ? activeLayoutData[physicalKey] : null;
        if (mapInfo) {
            if (isAltGrActive && mapInfo.altGr) {
                typedChar = mapInfo.altGr;
            } else if (e.shiftKey && mapInfo.shift) {
                typedChar = mapInfo.shift;
            } else {
                typedChar = mapInfo.normal;
            }
        } else {
            // Try fallback translation
            typedChar = e.key;
        }

        // The Active Target Scope Fix: Validate we haven't passed the end of the obstacles
        if (!this.activeObstacles || this.typedIndex >= this.activeObstacles.length) return;

        // Validate character typed against current index
        const expectedChar = this.textCodepoints[this.typedIndex];

        // 1. Inject Binary/Hex Telemetry
        const activeObst = this.activeObstacles[this.typedIndex];
        console.log("Typed Hex:", escape(e.key));
        console.log("Target Hex:", escape(expectedChar));

        const normalizedTypedChar = typedChar ? typedChar.normalize('NFC') : '';
        const normalizedFallbackKey = e.key.normalize('NFC');

        let isCorrect = false;
        let isSubStrokeMatch = false;
        let isSequenceMismatch = false;

        if (activeObst && activeObst.sequence) {
            const expectedSubChar = activeObst.sequence[activeObst.currentStrokeIndex];
            
            if (normalizedTypedChar === expectedChar || normalizedFallbackKey === expectedChar) {
                isCorrect = true;
                activeObst.currentStrokeIndex = activeObst.sequence.length;
            } else if (normalizedTypedChar === expectedSubChar || normalizedFallbackKey === expectedSubChar) {
                isSubStrokeMatch = true;
                activeObst.currentStrokeIndex++;

                if (activeObst.currentStrokeIndex >= activeObst.sequence.length) {
                    isCorrect = true;
                }
            } else {
                isSequenceMismatch = true;
            }
        } else {
            // NIDA comma explicit check for legacy bypass, just in case
            if (currentLayoutMode === 'nida' && e.key === ',' && expectedChar && (expectedChar.includes('\u17BB') || expectedChar.includes('\u17C6') || expectedChar === 'ុំ')) {
                isCorrect = true;
            } else if (normalizedTypedChar === expectedChar || normalizedFallbackKey === expectedChar) {
                isCorrect = true;
            }
        }

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

        if (isCorrect) {
            if (keyEl) {
                keyEl.classList.add('glow-correct');
                setTimeout(() => keyEl.classList.remove('glow-correct'), 300);
            }
            if (isAltGrActive) {
                const altEl = document.getElementById('AltRight');
                const ctrlL = document.getElementById('ControlLeft');
                const altL = document.getElementById('AltLeft');
                if (altEl) {
                    altEl.classList.add('glow-correct');
                    setTimeout(() => altEl.classList.remove('glow-correct'), 300);
                }
                if (ctrlL) {
                    ctrlL.classList.add('glow-correct');
                    setTimeout(() => ctrlL.classList.remove('glow-correct'), 300);
                }
                if (altL) {
                    altL.classList.add('glow-correct');
                    setTimeout(() => altL.classList.remove('glow-correct'), 300);
                }
            }
            this.processCorrectKeystroke();
        } else if (isSubStrokeMatch) {
            // Correct partial stroke: glow green but do not process full correct keystroke yet
            this.correctCharsTyped++;
            this.updateStatsDisplay();
            synth.playClick();

            if (keyEl) {
                keyEl.classList.add('glow-correct');
                setTimeout(() => keyEl.classList.remove('glow-correct'), 300);
            }
            this.updateNextCharacterHint();
        } else if (isSequenceMismatch) {
            // Mismatch (The Fix): Immediately trigger the error counter and log penalty without secondary checks
            this.errorsCount++;
            this.incorrectKeyPressCount++;
            this.score = Math.max(0, this.score - 5);
            this.updateStatsDisplay();

            if (keyEl) {
                keyEl.classList.add('glow-incorrect');
                setTimeout(() => keyEl.classList.remove('glow-incorrect'), 300);
            }
            synth.playError();
            this.dom.typingText.parentElement.classList.add('shake');
            setTimeout(() => {
                this.dom.typingText.parentElement.classList.remove('shake');
            }, 200);
        } else {
            if (keyEl) {
                keyEl.classList.add('glow-incorrect');
                setTimeout(() => keyEl.classList.remove('glow-incorrect'), 300);
            }
            if (isAltGrActive) {
                const altEl = document.getElementById('AltRight');
                const ctrlL = document.getElementById('ControlLeft');
                const altL = document.getElementById('AltLeft');
                if (altEl) {
                    altEl.classList.add('glow-incorrect');
                    setTimeout(() => altEl.classList.remove('glow-incorrect'), 300);
                }
                if (ctrlL) {
                    ctrlL.classList.add('glow-incorrect');
                    setTimeout(() => ctrlL.classList.remove('glow-incorrect'), 300);
                }
                if (altL) {
                    altL.classList.add('glow-incorrect');
                    setTimeout(() => altL.classList.remove('glow-incorrect'), 300);
                }
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
        const isAltGrActive = (e.altKey && e.code === 'AltRight') || (e.ctrlKey && e.altKey);

        if (e.key === 'Shift') {
            this.dom.keyboard.classList.remove('shift-active');
            const shiftL = document.getElementById('ShiftLeft');
            const shiftR = document.getElementById('ShiftRight');
            if (shiftL) shiftL.classList.remove('active');
            if (shiftR) shiftR.classList.remove('active');
            return;
        }

        if (e.key === 'Alt' || e.key === 'AltGraph' || e.key === 'Control') {
            if (!isAltGrActive) {
                const altEl = document.getElementById('AltRight');
                if (altEl) altEl.classList.remove('active');
                this.updateVirtualKeyboardLabels(false);
            }
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
        this.successfulClears++;

        this.score += 10;
        synth.playClick();
        this.renderPromptSlab();

        if (['consonants', 'vowels', 'independent_vowels', 'subscripts'].includes(this.currentLesson)) {
            // Clear the static obstacle at this index
            if (this.activeObstacles && this.typedIndex - 1 < this.activeObstacles.length) {
                const target = this.activeObstacles[this.typedIndex - 1];
                if (target && target.el) {
                    target.el.classList.add('crumble');
                    // Play specific animation depending on type
                    if (target.type === 'gap' || target.type === 'spike') {
                        this.triggerExplorerAction('jump');
                    } else {
                        this.triggerExplorerAction(target.type === 'sentinel' ? 'attack' : 'smash');
                    }
                }

                // Shift the remaining queue forward by 150px smoothly
                for (let i = this.typedIndex; i < this.activeObstacles.length; i++) {
                    const o = this.activeObstacles[i];
                    o.x -= 150;
                    o.el.style.transition = 'left 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
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

        const isIsolatedTargetMode = ['consonants', 'vowels', 'independent_vowels', 'subscripts'].includes(this.currentLesson);
        if (isIsolatedTargetMode) {
            let totalRequiredClears = 38;
            if (this.currentLesson === 'consonants') totalRequiredClears = 66;
            else if (this.currentLesson === 'independent_vowels') totalRequiredClears = 21;
            else if (this.currentLesson === 'subscripts') totalRequiredClears = 32;
            
            if (this.successfulClears >= totalRequiredClears) {
                this.showLevelCompleteScreen();
            } else if (this.typedIndex >= this.textCodepoints.length) {
                this.loadNextText();
            } else {
                this.updateNextCharacterHint();
                this.updateStatsDisplay();
            }
        } else {
            if (this.typedIndex >= this.textCodepoints.length) {
                this.phrasesCleared++;
                let targetPhrases = 10;
                if (this.currentLesson === 'sentences') targetPhrases = 2;
                else if (this.currentLesson === 'words') targetPhrases = 10;
                
                if (this.currentLesson !== 'endless' && this.phrasesCleared >= targetPhrases) {
                    this.showLevelCompleteScreen();
                } else {
                    this.loadNextText();
                }
            } else {
                this.updateNextCharacterHint();
                this.updateStatsDisplay();
            }
        }
    }

    processIncorrectKeystroke() {
        // ALWAYS increment errors and penalize score immediately for all lessons
        this.errorsCount++;
        this.incorrectKeyPressCount++; 
        this.score = Math.max(0, this.score - 5);
        this.updateStatsDisplay();

        if (['consonants', 'vowels', 'independent_vowels', 'subscripts'].includes(this.currentLesson)) {
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
            
            synth.playError();
            return;
        }

        synth.playError();

        // Shake prompt slab
        this.dom.typingText.parentElement.classList.add('shake');
        setTimeout(() => {
            this.dom.typingText.parentElement.classList.remove('shake');
        }, 200);
    }

    showLevelCompleteScreen() {
        this.isPaused = true;
        this.pauseRunnerAnimations();
        clearInterval(this.timerInterval);

        synth.playSuccess();

        // Populate final stats
        this.dom.completeScore.innerText = this.score;
        this.dom.completeWpm.innerText = this.dom.wpm.innerText;
        this.dom.completeErrors.innerText = this.dom.errors ? this.dom.errors.innerText : this.errorsCount;
        this.dom.completeAccuracy.innerText = this.dom.accuracy.innerText;

        // Sync next lesson dropdown
        const select = this.dom.launchLevelSelect;
        let nextIndex = select.selectedIndex + 1;
        if (nextIndex >= select.options.length) nextIndex = 0;
        this.dom.completeLevelSelect.selectedIndex = nextIndex;

        this.dom.levelCompleteOverlay.classList.remove('hide');
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
                const mapping = Object.values(activeLayoutData || {}).find(k => k.code === keyId && k.shift === simulatedEvent.shiftKey);
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
window.addEventListener('DOMContentLoaded', async () => {
    await loadLayout('nida');
    await loadLessons();
    const game = new TypingAdventureGame();
    window.gameInstance = game;
    game.init();
});
