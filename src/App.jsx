import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Gamepad2, 
  BookOpen, 
  Award, 
  Volume2, 
  VolumeX, 
  PenTool, 
  RefreshCw,
  PlusCircle,
  Target
} from 'lucide-react';

// Expanded Addition Bank (40 Problems)
const ADDITION_BANK = [
  { id: 'add-1', expr: '13 + 5', ans: 18 },
  { id: 'add-2', expr: '12 + 7', ans: 19 },
  { id: 'add-3', expr: '8 + 6', ans: 14 },
  { id: 'add-4', expr: '9 + 9', ans: 18 },
  { id: 'add-5', expr: '14 + 3', ans: 17 },
  { id: 'add-6', expr: '11 + 8', ans: 19 },
  { id: 'add-7', expr: '7 + 5', ans: 12 },
  { id: 'add-8', expr: '6 + 8', ans: 14 },
  { id: 'add-9', expr: '15 + 4', ans: 19 },
  { id: 'add-10', expr: '10 + 7', ans: 17 },
  { id: 'add-11', expr: '5 + 9', ans: 14 },
  { id: 'add-12', expr: '8 + 8', ans: 16 },
  { id: 'add-13', expr: '12 + 6', ans: 18 },
  { id: 'add-14', expr: '16 + 3', ans: 19 },
  { id: 'add-15', expr: '7 + 7', ans: 14 },
  { id: 'add-16', expr: '9 + 4', ans: 13 },
  { id: 'add-17', expr: '14 + 5', ans: 19 },
  { id: 'add-18', expr: '13 + 6', ans: 19 },
  { id: 'add-19', expr: '11 + 7', ans: 18 },
  { id: 'add-20', expr: '15 + 3', ans: 18 },
  { id: 'add-21', expr: '12 + 8', ans: 20 },
  { id: 'add-22', expr: '9 + 8', ans: 17 },
  { id: 'add-23', expr: '8 + 7', ans: 15 },
  { id: 'add-24', expr: '6 + 9', ans: 15 },
  { id: 'add-25', expr: '17 + 2', ans: 19 },
  { id: 'add-26', expr: '18 + 1', ans: 19 },
  { id: 'add-27', expr: '10 + 9', ans: 19 },
  { id: 'add-28', expr: '11 + 9', ans: 20 },
  { id: 'add-29', expr: '13 + 7', ans: 20 },
  { id: 'add-30', expr: '14 + 6', ans: 20 },
  { id: 'add-31', expr: '15 + 5', ans: 20 },
  { id: 'add-32', expr: '16 + 4', ans: 20 },
  { id: 'add-33', expr: '7 + 9', ans: 16 },
  { id: 'add-34', expr: '8 + 9', ans: 17 },
  { id: 'add-35', expr: '9 + 7', ans: 16 },
  { id: 'add-36', expr: '6 + 7', ans: 13 },
  { id: 'add-37', expr: '5 + 8', ans: 13 },
  { id: 'add-38', expr: '4 + 9', ans: 13 },
  { id: 'add-39', expr: '12 + 9', ans: 21 },
  { id: 'add-40', expr: '13 + 8', ans: 21 },
];

// Expanded Subtraction Bank (40 Problems)
const SUBTRACTION_BANK = [
  { id: 'sub-1', expr: '18 - 7', ans: 11 },
  { id: 'sub-2', expr: '16 - 5', ans: 11 },
  { id: 'sub-3', expr: '20 - 9', ans: 11 },
  { id: 'sub-4', expr: '15 - 8', ans: 7 },
  { id: 'sub-5', expr: '19 - 4', ans: 15 },
  { id: 'sub-6', expr: '17 - 6', ans: 11 },
  { id: 'sub-7', expr: '14 - 8', ans: 6 },
  { id: 'sub-8', expr: '13 - 7', ans: 6 },
  { id: 'sub-9', expr: '18 - 9', ans: 9 },
  { id: 'sub-10', expr: '15 - 5', ans: 10 },
  { id: 'sub-11', expr: '12 - 4', ans: 8 },
  { id: 'sub-12', expr: '11 - 6', ans: 5 },
  { id: 'sub-13', expr: '17 - 8', ans: 9 },
  { id: 'sub-14', expr: '16 - 9', ans: 7 },
  { id: 'sub-15', expr: '20 - 5', ans: 15 },
  { id: 'sub-16', expr: '14 - 6', ans: 8 },
  { id: 'sub-17', expr: '19 - 7', ans: 12 },
  { id: 'sub-18', expr: '18 - 6', ans: 12 },
  { id: 'sub-19', expr: '17 - 5', ans: 12 },
  { id: 'sub-20', expr: '16 - 8', ans: 8 },
  { id: 'sub-21', expr: '15 - 7', ans: 8 },
  { id: 'sub-22', expr: '14 - 7', ans: 7 },
  { id: 'sub-23', expr: '13 - 6', ans: 7 },
  { id: 'sub-24', expr: '12 - 7', ans: 5 },
  { id: 'sub-25', expr: '11 - 5', ans: 6 },
  { id: 'sub-26', expr: '20 - 8', ans: 12 },
  { id: 'sub-27', expr: '20 - 7', ans: 13 },
  { id: 'sub-28', expr: '19 - 8', ans: 11 },
  { id: 'sub-29', expr: '18 - 5', ans: 13 },
  { id: 'sub-30', expr: '17 - 9', ans: 8 },
  { id: 'sub-31', expr: '16 - 7', ans: 9 },
  { id: 'sub-32', expr: '15 - 6', ans: 9 },
  { id: 'sub-33', expr: '14 - 5', ans: 9 },
  { id: 'sub-34', expr: '13 - 8', ans: 5 },
  { id: 'sub-35', expr: '12 - 5', ans: 7 },
  { id: 'sub-36', expr: '11 - 4', ans: 7 },
  { id: 'sub-37', expr: '20 - 6', ans: 14 },
  { id: 'sub-38', expr: '19 - 9', ans: 10 },
  { id: 'sub-39', expr: '18 - 8', ans: 10 },
  { id: 'sub-40', expr: '17 - 7', ans: 10 },
];

// Expanded Word Problems Bank (24 Problems)
const WORD_PROBLEMS_BANK = [
  {
    id: 'wp-1',
    text: "Liam has 11 toy cars. He bought 7 more cars today. How many toy cars does he have in all now?",
    ans: 18
  },
  {
    id: 'wp-2',
    text: "There were 16 birds on the fence. 9 birds flew away. How many birds are left?",
    ans: 7
  },
  {
    id: 'wp-3',
    text: "Maya baked 12 chocolate cookies. She baked 6 vanilla cookies. How many cookies did she bake in total?",
    ans: 18
  },
  {
    id: 'wp-4',
    text: "15 children were playing in the park. 7 went home for dinner. How many children stayed in the park?",
    ans: 8
  },
  {
    id: 'wp-5',
    text: "Leo found 8 red marbles. Then he found 5 blue marbles. How many marbles did he find altogether?",
    ans: 13
  },
  {
    id: 'wp-6',
    text: "A pet shop had 14 hamsters. 6 hamsters were adopted. How many hamsters are still at the shop?",
    ans: 8
  },
  {
    id: 'wp-7',
    text: "Chloe has 9 sticker sheets. Her brother gives her 8 more sticker sheets. How many sticker sheets does Chloe have now?",
    ans: 17
  },
  {
    id: 'wp-8',
    text: "A fruit basket had 18 apples. The family ate 10 of them. How many apples are left in the basket?",
    ans: 8
  },
  {
    id: 'wp-9',
    text: "Noah collected 14 shiny rocks. He gave 5 rocks to his sister. How many rocks does Noah have left?",
    ans: 9
  },
  {
    id: 'wp-10',
    text: "Sophia has 7 pink balloons and 8 purple balloons. How many balloons does she have in total?",
    ans: 15
  },
  {
    id: 'wp-11',
    text: "A library had 19 storybooks on the table. Students checked out 8 books. How many books are left on the table?",
    ans: 11
  },
  {
    id: 'wp-12',
    text: "Ethan picked 9 red strawberries and 6 wild blueberries. How many berries did he pick altogether?",
    ans: 15
  },
  {
    id: 'wp-13',
    text: "There were 15 frogs resting on a log. 8 frogs jumped into the pond. How many frogs remained on the log?",
    ans: 7
  },
  {
    id: 'wp-14',
    text: "Ava put 12 colored pencils in her pencil case. She found 7 more under her desk. How many pencils does she have now?",
    ans: 19
  },
  {
    id: 'wp-15',
    text: "A bakery made 17 glazed donuts. They sold 9 donuts in the morning. How many glazed donuts are left?",
    ans: 8
  },
  {
    id: 'wp-16',
    text: "Oliver saw 8 ducks swimming in the lake. Then 9 more ducks flew down to join them. How many ducks are swimming now?",
    ans: 17
  },
  {
    id: 'wp-17',
    text: "Hannah had 16 crayons in her art box. 7 crayons were broken. How many crayons were not broken?",
    ans: 9
  },
  {
    id: 'wp-18',
    text: "Lucas caught 10 fireflies in a glass jar. Later he caught 6 more fireflies. How many fireflies did he catch in total?",
    ans: 16
  },
  {
    id: 'wp-19',
    text: "A farm had 20 yellow chicks. 9 chicks ran into the barn. How many chicks are outside?",
    ans: 11
  },
  {
    id: 'wp-20',
    text: "Emma planted 11 sunflower seeds on Monday and 8 seeds on Tuesday. How many seeds did she plant in total?",
    ans: 19
  },
  {
    id: 'wp-21',
    text: "There were 18 fish in an aquarium. 6 fish were moved to another tank. How many fish are left in the aquarium?",
    ans: 12
  },
  {
    id: 'wp-22',
    text: "Jackson had 9 game tokens. He won 9 more tokens playing ring toss. How many tokens does he have now?",
    ans: 18
  },
  {
    id: 'wp-23',
    text: "14 monkeys were swinging on vines. 8 monkeys climbed up a palm tree. How many monkeys stayed on the vines?",
    ans: 6
  },
  {
    id: 'wp-24',
    text: "Isabella assembled 13 puzzle pieces. Her brother added 6 more pieces. How many puzzle pieces are placed now?",
    ans: 19
  }
];

// Concise steps for crisp header alignment
const PRACTICE_STEPS = [
  {
    id: 0,
    stepNum: 'Step 1',
    title: 'Setup & Goal Setting',
    shortName: 'Setup',
    subtitle: 'Review today\'s math practice map and set your goals!',
    color: '#6366f1',
    icon: '🎯',
    type: 'setup'
  },
  {
    id: 1,
    stepNum: 'Step 2',
    title: 'Addition Sprint',
    shortName: 'Addition',
    subtitle: 'Solve addition math facts to warm up!',
    color: '#0284c7',
    icon: '⚡',
    type: 'addition'
  },
  {
    id: 2,
    stepNum: 'Step 3',
    title: 'Subtraction Challenge',
    shortName: 'Subtraction',
    subtitle: 'Test your subtraction skills with challenges!',
    color: '#0d9488',
    icon: '🧩',
    type: 'subtraction'
  },
  {
    id: 3,
    stepNum: 'Step 4',
    title: 'Review & Grade',
    shortName: 'Review',
    subtitle: 'Check your Sprint & Challenge answers with instant feedback!',
    color: '#eab308',
    icon: '📝',
    type: 'review_sprint'
  },
  {
    id: 4,
    stepNum: 'Step 5',
    title: 'Toy Break',
    shortName: 'Toy Break',
    subtitle: 'Rest your brain! Take a quick break with fun animations!',
    color: '#10b981',
    icon: '🧸',
    type: 'toy_break'
  },
  {
    id: 5,
    stepNum: 'Step 6',
    title: 'Guided Word Problem',
    shortName: 'Guided WP',
    subtitle: 'Read one sentence at a time using Sentence Chunking!',
    color: '#f97316',
    icon: '📖',
    type: 'wp_guided'
  },
  {
    id: 6,
    stepNum: 'Step 7',
    title: 'Independent Word Problem',
    shortName: 'Indep WP',
    subtitle: 'Read and solve independently using Sentence Chunking!',
    color: '#d97706',
    icon: '🚀',
    type: 'wp_indep'
  },
  {
    id: 7,
    stepNum: 'Step 8',
    title: 'Final Push',
    shortName: 'Final Push',
    subtitle: 'Solve final word problems and grade your worksheet!',
    color: '#8b5cf6',
    icon: '🏆',
    type: 'final_push'
  },
  {
    id: 8,
    stepNum: 'Step 9',
    title: 'Lesson Complete & Reward',
    shortName: 'Complete',
    subtitle: 'Awesome job! You completed all practice modules!',
    color: '#ec4899',
    icon: '🎉',
    type: 'play_time'
  }
];

function getRandomSample(array, count, excludeIds = []) {
  const available = array.filter(item => !excludeIds.includes(item.id));
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getSentences(text) {
  return text
    .split(/(?<=[.?!])\s+/)
    .filter(s => s.trim().length > 0);
}

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Expanded set per session: 8 addition, 8 subtraction, 6 word problems
  const [additionQuestions, setAdditionQuestions] = useState([]);
  const [subtractionQuestions, setSubtractionQuestions] = useState([]);
  const [wordProblems, setWordProblems] = useState([]);

  // User answers
  const [userAnswers, setUserAnswers] = useState({});

  // Sentence chunking state: question ID -> revealed count
  const [revealedChunks, setRevealedChunks] = useState({});

  // Grading states
  const [gradedBlocks, setGradedBlocks] = useState({
    reviewSprintGraded: false,
    finalPushGraded: false
  });

  // Scratchpad
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchNotes, setScratchNotes] = useState('');

  const audioCtxRef = useRef(null);

  const playSound = (freq = 523.25, type = 'sine', duration = 0.2) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio playback error', e);
    }
  };

  const initLesson = () => {
    const adds = getRandomSample(ADDITION_BANK, 8);
    const subs = getRandomSample(SUBTRACTION_BANK, 8);
    const wps = getRandomSample(WORD_PROBLEMS_BANK, 6);

    setAdditionQuestions(adds);
    setSubtractionQuestions(subs);
    setWordProblems(wps);
    setUserAnswers({});

    const initialChunks = {};
    wps.forEach(wp => {
      initialChunks[wp.id] = 1;
    });
    setRevealedChunks(initialChunks);

    setGradedBlocks({ reviewSprintGraded: false, finalPushGraded: false });
    setCurrentStepIndex(0);
  };

  // Add more addition questions on demand
  const handleLoadMoreAddition = () => {
    const currentIds = additionQuestions.map(q => q.id);
    const newItems = getRandomSample(ADDITION_BANK, 4, currentIds);
    if (newItems.length > 0) {
      setAdditionQuestions(prev => [...prev, ...newItems]);
      playSound(600, 'sine', 0.15);
    }
  };

  // Add more subtraction questions on demand
  const handleLoadMoreSubtraction = () => {
    const currentIds = subtractionQuestions.map(q => q.id);
    const newItems = getRandomSample(SUBTRACTION_BANK, 4, currentIds);
    if (newItems.length > 0) {
      setSubtractionQuestions(prev => [...prev, ...newItems]);
      playSound(600, 'sine', 0.15);
    }
  };

  useEffect(() => {
    initLesson();
  }, []);

  // Confetti on complete step
  useEffect(() => {
    if (currentStepIndex === 8) {
      playSound(523.25, 'sine', 0.2);
      setTimeout(() => playSound(659.25, 'sine', 0.2), 150);
      setTimeout(() => playSound(783.99, 'sine', 0.3), 300);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [currentStepIndex]);

  const activeStep = PRACTICE_STEPS[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < PRACTICE_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      playSound(587.33, 'sine', 0.15);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      playSound(440, 'sine', 0.15);
    }
  };

  const handleAnswerChange = (qId, val) => {
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleReadNextSentence = (wpId, totalSentences) => {
    setRevealedChunks(prev => {
      const current = prev[wpId] || 1;
      if (current < totalSentences) {
        playSound(493.88, 'sine', 0.15);
        return { ...prev, [wpId]: current + 1 };
      }
      return prev;
    });
  };

  const handleGradeSprintReview = () => {
    setGradedBlocks(prev => ({ ...prev, reviewSprintGraded: true }));
    playSound(783.99, 'triangle', 0.3);
  };

  const handleGradeFinalPush = () => {
    setGradedBlocks(prev => ({ ...prev, finalPushGraded: true }));
    playSound(880, 'triangle', 0.35);
  };

  const totalPercent = Math.round(((currentStepIndex + 1) / PRACTICE_STEPS.length) * 100);

  return (
    <div className="app-container">
      {/* Header with Step Progress Track */}
      <header className="top-header">
        <div className="header-top-row">
          <div className="app-logo">
            <div className="logo-badge">
              <Sparkles size={18} />
              <span>GUIDED MATH</span>
            </div>
            <div className="logo-title">Interactive Practice Worksheet</div>
          </div>

          <div className="header-controls-group">
            <button 
              className="nav-step-btn"
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
            >
              <ChevronLeft size={16} />
              <span>Prev</span>
            </button>

            <button 
              className="nav-step-btn primary"
              onClick={handleNextStep}
              disabled={currentStepIndex === PRACTICE_STEPS.length - 1}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>

            <button 
              className="scratchpad-toggle"
              onClick={() => setShowScratchpad(!showScratchpad)}
              title="Toggle Math Scratchpad"
            >
              <PenTool size={16} />
              <span>{showScratchpad ? 'Hide Scratchpad' : 'Scratchpad'}</span>
            </button>

            <button 
              className="nav-step-btn"
              onClick={initLesson}
              title="Reset Practice Questions"
            >
              <RefreshCw size={16} />
              <span>New Set</span>
            </button>

            <button 
              className="nav-step-btn"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title="Toggle Sound Effects"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </div>

        {/* Crisp Step Track Grid without clipping */}
        <div className="step-track-container">
          <div className="step-progress-bar-bg">
            <div className="step-progress-bar-fill" style={{ width: `${totalPercent}%` }} />
          </div>

          <div className="steps-grid">
            {PRACTICE_STEPS.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isCompleted = idx < currentStepIndex;
              return (
                <div
                  key={step.id}
                  className={`step-card-pill ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    playSound(440, 'sine', 0.1);
                  }}
                  style={{
                    borderColor: isActive ? step.color : '#e2e8f0'
                  }}
                >
                  <div className="step-number">{step.stepNum}</div>
                  <div className="step-name" style={{ color: isActive ? step.color : '#334155' }}>
                    {step.icon} {step.shortName}
                  </div>
                  <div 
                    className="step-indicator-dot"
                    style={{ background: isCompleted ? '#22c55e' : (isActive ? step.color : '#cbd5e1') }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Optional Scratchpad */}
      {showScratchpad && (
        <div className="scratchpad-area">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              <PenTool size={16} /> Visual Scratchpad / Calculation Notes
            </span>
            <button 
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              onClick={() => setScratchNotes('')}
            >
              Clear Notes
            </button>
          </div>
          <textarea
            style={{
              width: '100%',
              height: '80px',
              background: '#0f172a',
              color: '#38bdf8',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '10px',
              fontFamily: 'monospace',
              fontSize: '1rem',
              resize: 'vertical'
            }}
            placeholder="Type notes, draw numbers, or work out calculations here..."
            value={scratchNotes}
            onChange={(e) => setScratchNotes(e.target.value)}
          />
        </div>
      )}

      {/* Main Practice Content */}
      <main className="main-content-area">
        {/* Step Header */}
        <div className="step-header">
          <div className="step-title-tag">
            <div className="step-icon-box" style={{ background: activeStep.color }}>
              <span>{activeStep.icon}</span>
            </div>
            <div>
              <div className="step-title-text">{activeStep.title}</div>
              <div className="step-subtitle">{activeStep.subtitle}</div>
            </div>
          </div>

          <div 
            className="step-badge-pill" 
            style={{ background: `${activeStep.color}20`, color: activeStep.color }}
          >
            {activeStep.stepNum} of 9
          </div>
        </div>

        {/* STEP 1: SETUP */}
        {activeStep.type === 'setup' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 16, border: '2px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, color: '#1e293b' }}>
                <Target color="#6366f1" /> Today's Practice Sequence
              </h3>
              <p style={{ color: '#64748b', marginBottom: 18 }}>
                Work step-by-step through addition sprints, subtraction challenges, guided word problems, and instant grading!
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
                {PRACTICE_STEPS.map((s) => (
                  <div 
                    key={s.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 12, 
                      padding: '12px 16px', 
                      background: 'white', 
                      borderRadius: 12,
                      borderLeft: `5px solid ${s.color}`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>{s.title}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{s.stepNum}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16 }}>
              <button 
                className="nav-step-btn primary" 
                onClick={handleNextStep}
                style={{ fontSize: '1.1rem', padding: '14px 28px' }}
              >
                <span>Start Practice (Addition Sprint)</span>
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ADDITION SPRINT */}
        {activeStep.type === 'addition' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="questions-grid">
              {additionQuestions.map((q, idx) => {
                const val = userAnswers[q.id] || '';
                return (
                  <div key={q.id} className="math-card">
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284c7' }}>
                      Addition Problem #{idx + 1}
                    </div>
                    <div className="math-expression">
                      <span>{q.expr} =</span>
                    </div>
                    <div className="math-input-wrapper">
                      <input
                        type="number"
                        className="math-input"
                        placeholder="?"
                        value={val}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, flexWrap: 'wrap', gap: 12 }}>
              <button className="more-questions-btn" onClick={handleLoadMoreAddition}>
                <PlusCircle size={18} />
                <span>Add 4 More Addition Problems ({additionQuestions.length} Total)</span>
              </button>

              <button className="nav-step-btn primary" onClick={handleNextStep}>
                <span>Next: Subtraction Challenge</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUBTRACTION CHALLENGE */}
        {activeStep.type === 'subtraction' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="questions-grid">
              {subtractionQuestions.map((q, idx) => {
                const val = userAnswers[q.id] || '';
                return (
                  <div key={q.id} className="math-card">
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0d9488' }}>
                      Subtraction Problem #{idx + 1}
                    </div>
                    <div className="math-expression">
                      <span>{q.expr} =</span>
                    </div>
                    <div className="math-input-wrapper">
                      <input
                        type="number"
                        className="math-input"
                        placeholder="?"
                        value={val}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, flexWrap: 'wrap', gap: 12 }}>
              <button className="more-questions-btn" onClick={handleLoadMoreSubtraction}>
                <PlusCircle size={18} />
                <span>Add 4 More Subtraction Problems ({subtractionQuestions.length} Total)</span>
              </button>

              <button className="nav-step-btn primary" onClick={handleNextStep}>
                <span>Next: Review & Grade</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & GRADE */}
        {activeStep.type === 'review_sprint' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {!gradedBlocks.reviewSprintGraded ? (
              <div style={{ background: '#fefce8', padding: 24, borderRadius: 16, border: '2px solid #fef08a' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#a16207', marginBottom: 8 }}>Grade Addition & Subtraction Answers</h3>
                <p style={{ color: '#ca8a04', marginBottom: 16 }}>
                  Click the button below to check your answers! Correct answers turn green, and errors turn red for a retry.
                </p>
                <button className="grade-btn" onClick={handleGradeSprintReview}>
                  <CheckCircle2 size={24} />
                  <span>Check Answers Now</span>
                </button>
              </div>
            ) : null}

            {/* Addition Sprint Grading */}
            <div>
              <h4 style={{ fontSize: '1.2rem', color: '#0284c7', marginBottom: 12 }}>Addition Results ({additionQuestions.length} Problems)</h4>
              <div className="questions-grid">
                {additionQuestions.map((q, idx) => {
                  const val = userAnswers[q.id] || '';
                  const numVal = parseInt(val, 10);
                  const isCorrect = gradedBlocks.reviewSprintGraded && numVal === q.ans;
                  const isGraded = gradedBlocks.reviewSprintGraded;

                  return (
                    <div 
                      key={q.id} 
                      className={`math-card ${isGraded ? (isCorrect ? 'graded-correct' : 'graded-incorrect') : ''}`}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>Addition #{idx + 1}</span>
                        {isGraded && (
                          isCorrect ? (
                            <span style={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <CheckCircle2 size={18} /> Correct!
                            </span>
                          ) : (
                            <span style={{ color: '#dc2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <XCircle size={18} /> Retry (Ans: {q.ans})
                            </span>
                          )
                        )}
                      </div>
                      <div className="math-expression">
                        <span>{q.expr} =</span>
                      </div>
                      <div className="math-input-wrapper">
                        <input
                          type="number"
                          className="math-input"
                          value={val}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subtraction Challenge Grading */}
            <div>
              <h4 style={{ fontSize: '1.2rem', color: '#0d9488', marginBottom: 12 }}>Subtraction Results ({subtractionQuestions.length} Problems)</h4>
              <div className="questions-grid">
                {subtractionQuestions.map((q, idx) => {
                  const val = userAnswers[q.id] || '';
                  const numVal = parseInt(val, 10);
                  const isCorrect = gradedBlocks.reviewSprintGraded && numVal === q.ans;
                  const isGraded = gradedBlocks.reviewSprintGraded;

                  return (
                    <div 
                      key={q.id} 
                      className={`math-card ${isGraded ? (isCorrect ? 'graded-correct' : 'graded-incorrect') : ''}`}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>Subtraction #{idx + 1}</span>
                        {isGraded && (
                          isCorrect ? (
                            <span style={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <CheckCircle2 size={18} /> Correct!
                            </span>
                          ) : (
                            <span style={{ color: '#dc2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <XCircle size={18} /> Retry (Ans: {q.ans})
                            </span>
                          )
                        )}
                      </div>
                      <div className="math-expression">
                        <span>{q.expr} =</span>
                      </div>
                      <div className="math-input-wrapper">
                        <input
                          type="number"
                          className="math-input"
                          value={val}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {gradedBlocks.reviewSprintGraded && (
                <button 
                  className="nav-step-btn"
                  onClick={() => setGradedBlocks(prev => ({ ...prev, reviewSprintGraded: false }))}
                >
                  <RefreshCw size={16} /> Re-grade
                </button>
              )}
              <button className="nav-step-btn primary" onClick={handleNextStep} style={{ marginLeft: 'auto' }}>
                <span>Next: Toy Break! 🧸</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: TOY BREAK */}
        {activeStep.type === 'toy_break' && (
          <div className="toy-break-screen">
            <div className="bouncing-toy-wrapper">
              <Gamepad2 size={64} color="white" />
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Toy Break Time! 🧸</h2>
            <p style={{ fontSize: '1.2rem', maxWidth: 500, opacity: 0.95 }}>
              Math hides! Rest your eyes and take a quick brain break.
            </p>
            <button 
              className="nav-step-btn primary" 
              onClick={handleNextStep}
              style={{ background: 'white', color: '#059669', padding: '14px 28px', fontSize: '1.1rem' }}
            >
              <span>Ready for Word Problems? Continue</span>
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* STEP 6: WORD PROBLEM GUIDED */}
        {activeStep.type === 'wp_guided' && wordProblems.length >= 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[wordProblems[0], wordProblems[1]].map((wp, idx) => {
              const sentences = getSentences(wp.text);
              const visibleCount = revealedChunks[wp.id] || 1;
              const isFullyRevealed = visibleCount >= sentences.length;
              const val = userAnswers[wp.id] || '';

              return (
                <div key={wp.id} className="word-problem-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ background: '#ffedd5', color: '#c2410c', padding: '4px 12px', borderRadius: 10, fontWeight: 700, fontSize: '0.85rem' }}>
                      Guided Problem #{idx + 1}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                      Sentence {visibleCount} of {sentences.length}
                    </span>
                  </div>

                  <div className="chunked-story-container">
                    {sentences.slice(0, visibleCount).map((sentence, sIdx) => (
                      <div key={sIdx} className="sentence-chunk">
                        {sentence}
                      </div>
                    ))}
                  </div>

                  <div className="chunk-action-area">
                    {!isFullyRevealed ? (
                      <button 
                        className="read-next-btn"
                        onClick={() => handleReadNextSentence(wp.id, sentences.length)}
                      >
                        <BookOpen size={20} />
                        <span>Read Next Sentence</span>
                      </button>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#1e293b' }}>
                          What is your answer?
                        </span>
                        <input
                          type="number"
                          className="math-input"
                          placeholder="?"
                          value={val}
                          onChange={(e) => handleAnswerChange(wp.id, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button className="nav-step-btn primary" onClick={handleNextStep}>
                <span>Next: Independent Word Problems</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: WORD PROBLEM INDEPENDENT */}
        {activeStep.type === 'wp_indep' && wordProblems.length >= 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[wordProblems[2], wordProblems[3]].map((wp, idx) => {
              const sentences = getSentences(wp.text);
              const visibleCount = revealedChunks[wp.id] || 1;
              const isFullyRevealed = visibleCount >= sentences.length;
              const val = userAnswers[wp.id] || '';

              return (
                <div key={wp.id} className="word-problem-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ background: '#fef3c7', color: '#b45309', padding: '4px 12px', borderRadius: 10, fontWeight: 700, fontSize: '0.85rem' }}>
                      Independent Problem #{idx + 3}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                      Sentence {visibleCount} of {sentences.length}
                    </span>
                  </div>

                  <div className="chunked-story-container">
                    {sentences.slice(0, visibleCount).map((sentence, sIdx) => (
                      <div key={sIdx} className="sentence-chunk" style={{ borderLeftColor: '#d97706' }}>
                        {sentence}
                      </div>
                    ))}
                  </div>

                  <div className="chunk-action-area">
                    {!isFullyRevealed ? (
                      <button 
                        className="read-next-btn"
                        style={{ background: 'linear-gradient(135deg, #d97706, #b45309)' }}
                        onClick={() => handleReadNextSentence(wp.id, sentences.length)}
                      >
                        <BookOpen size={20} />
                        <span>Read Next Sentence</span>
                      </button>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#1e293b' }}>
                          What is your answer?
                        </span>
                        <input
                          type="number"
                          className="math-input"
                          placeholder="?"
                          value={val}
                          onChange={(e) => handleAnswerChange(wp.id, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
              <button className="nav-step-btn primary" onClick={handleNextStep}>
                <span>Next: Final Push</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: FINAL PUSH */}
        {activeStep.type === 'final_push' && wordProblems.length >= 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {!gradedBlocks.finalPushGraded && (
              <div style={{ background: '#f3e8ff', padding: 20, borderRadius: 16, border: '2px solid #e9d5ff' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#7e22ce', marginBottom: 6 }}>Final Push Word Problems</h3>
                <p style={{ color: '#6b21a8' }}>
                  Read through each word problem, enter your answers, and click "Grade All Word Problems" when finished!
                </p>
              </div>
            )}

            {[wordProblems[4], wordProblems[5]].map((wp, idx) => {
              const sentences = getSentences(wp.text);
              const visibleCount = revealedChunks[wp.id] || 1;
              const isFullyRevealed = visibleCount >= sentences.length;
              const val = userAnswers[wp.id] || '';
              const numVal = parseInt(val, 10);
              const isCorrect = gradedBlocks.finalPushGraded && numVal === wp.ans;
              const isGraded = gradedBlocks.finalPushGraded;

              return (
                <div 
                  key={wp.id} 
                  className="word-problem-card"
                  style={{
                    borderColor: isGraded ? (isCorrect ? '#22c55e' : '#ef4444') : '#e2e8f0',
                    background: isGraded ? (isCorrect ? '#f0fdf4' : '#fef2f2') : '#f8fafc'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '4px 12px', borderRadius: 10, fontWeight: 700, fontSize: '0.85rem' }}>
                      Final Push Problem #{idx + 5}
                    </span>
                    {isGraded && (
                      isCorrect ? (
                        <span style={{ color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <CheckCircle2 size={18} /> Correct! (Ans: {wp.ans})
                        </span>
                      ) : (
                        <span style={{ color: '#dc2626', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <XCircle size={18} /> Retry (Correct Ans: {wp.ans})
                        </span>
                      )
                    )}
                  </div>

                  <div className="chunked-story-container">
                    {sentences.slice(0, visibleCount).map((sentence, sIdx) => (
                      <div key={sIdx} className="sentence-chunk" style={{ borderLeftColor: '#8b5cf6' }}>
                        {sentence}
                      </div>
                    ))}
                  </div>

                  <div className="chunk-action-area">
                    {!isFullyRevealed ? (
                      <button 
                        className="read-next-btn"
                        style={{ background: 'linear-gradient(135deg, #8b5cf6, #6b21a8)' }}
                        onClick={() => handleReadNextSentence(wp.id, sentences.length)}
                      >
                        <BookOpen size={20} />
                        <span>Read Next Sentence</span>
                      </button>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#1e293b' }}>
                          What is your answer?
                        </span>
                        <input
                          type="number"
                          className="math-input"
                          placeholder="?"
                          value={val}
                          onChange={(e) => handleAnswerChange(wp.id, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                className="grade-btn" 
                onClick={handleGradeFinalPush}
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
              >
                <CheckCircle2 size={24} />
                <span>Grade All Word Problems</span>
              </button>

              <button className="nav-step-btn primary" onClick={handleNextStep}>
                <span>Claim Reward! 🎉</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 9: COMPLETE */}
        {activeStep.type === 'play_time' && (
          <div className="play-time-screen">
            <div className="bouncing-toy-wrapper">
              <Award size={64} color="white" />
            </div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 800 }}>Practice Complete! 🎉</h2>
            <p style={{ fontSize: '1.2rem', maxWidth: 550, opacity: 0.95 }}>
              Awesome job! You completed all 9 practice steps of today's guided math lesson!
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                className="nav-step-btn primary"
                style={{ background: 'white', color: '#db2777', padding: '14px 28px', fontSize: '1.1rem' }}
                onClick={() => {
                  confetti({ particleCount: 120, spread: 80 });
                  playSound(783.99, 'sine', 0.2);
                }}
              >
                <Sparkles size={20} />
                <span>Celebrate Confetti!</span>
              </button>

              <button 
                className="nav-step-btn"
                style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white', padding: '14px 28px', fontSize: '1.1rem' }}
                onClick={initLesson}
              >
                <RefreshCw size={20} />
                <span>Start New Practice Session</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
