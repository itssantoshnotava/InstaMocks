import { PDFFile, RecentMock, ChatMessage, Question, MockConfig } from './types';

export const INITIAL_PDFS: PDFFile[] = [
  {
    id: 'pdf-1',
    name: 'JEE_Advanced_Physics_2024_Paper1.pdf',
    size: '4.8 MB',
    uploadedAt: 'May 20, 2026',
    pages: 32,
    status: 'processed',
    subject: 'Physics',
    questionsDetected: 18
  },
  {
    id: 'pdf-2',
    name: 'CBSE_Class12_Mathematics_Calculus.pdf',
    size: '2.1 MB',
    uploadedAt: 'May 18, 2026',
    pages: 15,
    status: 'processed',
    subject: 'Mathematics',
    questionsDetected: 12
  },
  {
    id: 'pdf-3',
    name: 'NEET_Biology_PastYear_CellBiology.pdf',
    size: '8.4 MB',
    uploadedAt: 'May 24, 2026',
    pages: 45,
    status: 'processing',
    subject: 'Biology',
    questionsDetected: 30
  },
  {
    id: 'pdf-4',
    name: 'SAT_Chemistry_Practice_Test_3.pdf',
    size: '3.2 MB',
    uploadedAt: 'May 25, 2026',
    pages: 20,
    status: 'ocr_pending',
    subject: 'Chemistry',
    questionsDetected: 0
  }
];

export const RECENT_MOCKS: RecentMock[] = [
  {
    id: 'mock-1',
    title: 'JEE Physics: Rotational Dynamics & Mechanics',
    subject: 'Physics',
    score: '32/40',
    percentage: 80,
    accuracy: 85,
    date: 'May 22, 2026',
    timeTaken: '28m 15s',
    questionsCount: 10
  },
  {
    id: 'mock-2',
    title: 'Matrices & Determinants High-Speed Drill',
    subject: 'Mathematics',
    score: '18/25',
    percentage: 72,
    accuracy: 78,
    date: 'May 19, 2026',
    timeTaken: '14m 40s',
    questionsCount: 5
  },
  {
    id: 'mock-3',
    title: 'Organic Chemistry: Reagents Practice Test',
    subject: 'Chemistry',
    score: '12/15',
    percentage: 80,
    accuracy: 92,
    date: 'May 14, 2026',
    timeTaken: '08m 10s',
    questionsCount: 5
  }
];

export const SAMPLE_QUESTIONS_PHYSICS: Question[] = [
  {
    id: 1,
    text: 'A solid cylinder of mass M and radius R rolls without slipping down an inclined plane of angle θ. The acceleration of the cylinder is:',
    options: [
      'g sin θ',
      '(2/3) g sin θ',
      '(1/2) g sin θ',
      '(3/5) g sin θ'
    ],
    correctOptionIndex: 1,
    subTopic: 'Rotational Dynamics',
    explanation: 'From conservation of energy or torque equations, for a solid cylinder (I = 1/2 MR²), the acceleration rolling down an incline is a = g sin(θ) / (1 + I/MR²). With I/MR² = 1/2, a = (2/3) g sin(θ).'
  },
  {
    id: 2,
    text: 'Two bodies of masses 2kg and 4kg are connected by a light string passing over a frictionless pulley. If the system is released from rest, what is the acceleration of the 4kg mass?',
    options: [
      'g / 3',
      'g / 2',
      '2g / 3',
      'g'
    ],
    correctOptionIndex: 0,
    subTopic: 'Newton Laws of Motion',
    explanation: 'Using Atwood machine formula: a = (m2 - m1)g / (m1 + m2) = (4 - 2)g / (4 + 2) = 2g / 6 = g/3.'
  },
  {
    id: 3,
    text: 'A thermodynamic engine undergoes a Carnot cycle between temperatures T1 = 600 K and T2 = 300 K. What is the efficiency of this Carnot engine?',
    options: [
      '25%',
      '33.3%',
      '50%',
      '75%'
    ],
    correctOptionIndex: 2,
    subTopic: 'Thermodynamics',
    explanation: 'Carnot efficiency η = 1 - T_low/T_high = 1 - 300/600 = 1 - 0.5 = 50%.'
  },
  {
    id: 4,
    text: 'An electron enters a uniform magnetic field B directed perpendicular to its initial velocity v. The path of the electron in the magnetic field is a:',
    options: [
      'Straight line',
      'Parabola',
      'Helix with uniform pitch',
      'Circle'
    ],
    correctOptionIndex: 3,
    subTopic: 'Magnetism',
    explanation: 'Since the force F = q(v x B) is always perpendicular to velocity v, the acceleration is strictly centripetal, resulting in a circular trajectory.'
  },
  {
    id: 5,
    text: 'The work function of a metal surface is 2.0 eV. Photons of energy 3.5 eV strike the metal surface. What is the maximum kinetic energy of the emitted photoelectrons?',
    options: [
      '1.0 eV',
      '1.5 eV',
      '2.0 eV',
      '5.5 eV'
    ],
    correctOptionIndex: 1,
    subTopic: 'Modern Physics',
    explanation: 'By Einsteins photoelectric equation: K_max = hν - Φ = 3.5 eV - 2.0 eV = 1.5 eV.'
  },
  {
    id: 6,
    text: 'An object of mass m is attached to a vertical spring of spring constant k and set into simple harmonic motion. If the mass of the object is quadrupled (4m), the period of oscillation will:',
    options: [
      'Double',
      'Halve',
      'Quadruple',
      'Remain unchanged'
    ],
    correctOptionIndex: 0,
    subTopic: 'Oscillations',
    explanation: 'The time period of a mass-spring system is T = 2π √(m/k). If m becomes 4m, T becomes proportional to √4, which doubles the period.'
  },
  {
    id: 7,
    text: 'The speed of sound in an ideal gas at temperature T is proportional to:',
    options: [
      'T',
      '√T',
      'T²',
      '1 / T'
    ],
    correctOptionIndex: 1,
    subTopic: 'Wave Optics & Acoustics',
    explanation: 'The speed of sound in gas is v = √(γRT/M). Therefore, sound speed is directly proportional to the square root of absolute temperature (√T).'
  },
  {
    id: 8,
    text: 'What is the electrostatic potential energy stored in a sphere of radius R carrying a total charge Q distributed uniformly throughout its volume?',
    options: [
      '3Q² / (20πε₀R)',
      'Q² / (8πε₀R)',
      '3Q² / (10πε₀R)',
      '3Q² / (5πε₀R)'
    ],
    correctOptionIndex: 0,
    subTopic: 'Electrostatics',
    explanation: 'The self-energy of a uniformly charged solid sphere of charge Q and radius R is U = (3 / 5) * (Q² / (8πε₀R)) = 3Q² / (20πε₀R).'
  },
  {
    id: 9,
    text: 'A wire of resistance R is stretched uniformly to twice its original length. What is its new resistance?',
    options: [
      'R / 2',
      'R',
      '2R',
      '4R'
    ],
    correctOptionIndex: 3,
    subTopic: 'Current Electricity',
    explanation: 'Stretching the wire to 2x its length halves its cross-sectional area (since volume remains constant). Since R = ρ * (L / A), the new resistance R\' = ρ * (2L / (A/2)) = 4 * (ρL/A) = 4R.'
  },
  {
    id: 10,
    text: 'An ideal transformer has 500 turns in the primary coil and 100 turns in the secondary coil. If the primary voltage is 220V, what is the secondary voltage?',
    options: [
      '1100 V',
      '220 V',
      '44 V',
      '22 V'
    ],
    correctOptionIndex: 2,
    subTopic: 'Electromagnetic Induction',
    explanation: 'By the transformer turn ratio formula: V_s / V_p = N_s / N_p => V_s / 220 = 100 / 500 = 1 / 5 => V_s = 220 / 5 = 44V.'
  }
];

export const OTHER_QUESTIONS: { [key: string]: Question[] } = {
  Mathematics: [
    {
      id: 1,
      text: 'Find the limit as x approaches 0 of (sin x) / x:',
      options: ['0', '1', 'Infinity', 'Undefined'],
      correctOptionIndex: 1,
      subTopic: 'Calculus',
      explanation: 'By standard limit theorems or L-Hopitals rule, lim(x->0) (sin x)/x = lim(x->0) (cos x)/1 = cos(0) = 1.'
    },
    {
      id: 2,
      text: 'If A and B are symmetric matrices of same order, then AB - BA is a:',
      options: ['Symmetric matrix', 'Skew-symmetric matrix', 'Zero matrix', 'Identity matrix'],
      correctOptionIndex: 1,
      subTopic: 'Algebra',
      explanation: '(AB - BA)^T = (AB)^T - (BA)^T = B^T A^T - A^T B^T. Since A and B are symmetric, A^T=A and B^T=B, giving BA - AB = -(AB - BA). Hence, skew-symmetric.'
    },
    {
      id: 3,
      text: 'What is the probability of drawing an Ace or a Club from a standard deck of 52 cards?',
      options: ['4/13', '17/52', '16/52', '13/52'],
      correctOptionIndex: 0,
      subTopic: 'Probability',
      explanation: 'P(Ace) = 4/52, P(Club) = 13/52, P(Ace of Clubs) = 1/52. Total probability P(Ace U Club) = 4/52 + 13/52 - 1/52 = 16/52 = 4/13.'
    },
    {
      id: 4,
      text: 'The value of the integral of 1/(1 + x²) dx from x=0 to x=1 is:',
      options: ['π/2', 'π/4', '1', 'log(2)'],
      correctOptionIndex: 1,
      subTopic: 'Calculus',
      explanation: 'The integral is [arctan(x)] from 0 to 1, which equals arctan(1) - arctan(0) = π/4 - 0 = π/4.'
    },
    {
      id: 5,
      text: 'The order and degree of the differential equation (d²y/dx²)³ + (dy/dx)² + sin(y) = 0 are respectively:',
      options: ['2 and 3', '2 and 2', '3 and 2', '1 and 3'],
      correctOptionIndex: 0,
      subTopic: 'Differential Equations',
      explanation: 'The highest order derivative is d²y/dx², which has power 3. Hence, order is 2 and degree is 3.'
    }
  ],
  Chemistry: [
    {
      id: 1,
      text: 'Which of the following molecules has a linear molecular shape?',
      options: ['H₂O', 'CO₂', 'SO₂', 'O₃'],
      correctOptionIndex: 1,
      subTopic: 'Chemical Bonding',
      explanation: 'CO₂ has sp hybridization for carbon, with zero lone pairs on carbon, giving a symmetrical linear shape with bond angle 180°.'
    },
    {
      id: 2,
      text: 'The conjugate base of HSO₄⁻ is:',
      options: ['H₂SO₄', 'SO₄²⁻', 'HSO₄⁺', 'H⁺'],
      correctOptionIndex: 1,
      subTopic: 'Equilibrium',
      explanation: 'A conjugate base is formed by removing a proton (H⁺) from the acid. HSO₄⁻ loses H⁺ to become SO₄²⁻.'
    },
    {
      id: 3,
      text: 'Which of the following is an example of an outer orbital complex with sp³d² hybridization?',
      options: ['[Fe(CN)₆]³⁻', '[Co(NH₃)₆]³⁺', '[FeF₆]³⁻', '[Ni(CN)₄]²⁻'],
      correctOptionIndex: 2,
      subTopic: 'Coordination Chemistry',
      explanation: 'Fluoride (F⁻) is a weak field ligand and cannot cause pairing of 3d electrons in Fe³⁺, resulting in high spin outer orbital complex utilizing 4d orbitals: sp³d².'
    },
    {
      id: 4,
      text: 'In electrochemical terms, Rusting of iron is catalyzed by which of the following?',
      options: ['H⁺', 'OH⁻', 'Fe²⁺', 'O₂'],
      correctOptionIndex: 0,
      subTopic: 'Electrochemistry',
      explanation: 'Rusting of iron is an electrochemical process. The presence of acidic substances supplying H⁺ ions accelerates the reduction of Oxygen, accelerating the cell performance.'
    },
    {
      id: 5,
      text: 'The principal quantum number (n) describes which of the following?',
      options: ['Shape of the orbital', 'Orientation of the orbital in space', 'The main energy level or shell', 'Electron spin state'],
      correctOptionIndex: 2,
      subTopic: 'Atomic Structure',
      explanation: 'The principal quantum number n represents the main electronic shell or distance from nucleus (energy level).'
    }
  ],
  Biology: [
    {
      id: 1,
      text: 'Which of the following organelles is known as the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'],
      correctOptionIndex: 1,
      subTopic: 'Cell Biology',
      explanation: 'Mitochondria generate ATP through cellular respiration, making them the powerhouses.'
    },
    {
      id: 2,
      text: 'Who proposed the fluid mosaic model of the cell membrane?',
      options: ['Singer and Nicolson', 'Watson and Crick', 'Robert Brown', 'Schleiden and Schwann'],
      correctOptionIndex: 0,
      subTopic: 'Cell Structure',
      explanation: 'Singer and Nicolson in 1972 proposed the fluid mosaic model describing lipids and proteins structure of biological membranes.'
    },
    {
      id: 3,
      text: 'The primary site of gas exchange in the human lungs is the:',
      options: ['Bronchi', 'Bronchioles', 'Alveoli', 'Trachea'],
      correctOptionIndex: 2,
      subTopic: 'Human Physiology',
      explanation: 'The alveoli are microscopic air sacs lined with capillaries where oxygen and carbon dioxide diffusion occurs.'
    },
    {
      id: 4,
      text: 'In plants, water is transported upward from roots to leaves primarily through:',
      options: ['Phloem', 'Xylem', 'Stomata', 'Cortex'],
      correctOptionIndex: 1,
      subTopic: 'Plant Physiology',
      explanation: 'Xylem tissue consists of tracheids and vessel elements that transport water and minerals unidirectionally upwards.'
    },
    {
      id: 5,
      text: 'Double fertilization is a unique characteristic feature of:',
      options: ['Gymnosperms', 'Bryophytes', 'Pteridophytes', 'Angiosperms'],
      correctOptionIndex: 3,
      subTopic: 'Plant Reproduction',
      explanation: 'Angiosperms (flowering plants) undergo double fertilization, where one male gamete fertilizes the egg, and the other fuses with the polar nuclei to form endosperm.'
    }
  ]
};

export const CHAT_HISTORY: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: 'Hello! I am your AI Mock Test Architect. Upload any Chapter PDF, Past Year Question paper, or textbook snippet, and I can generate realistic mock tests with step-by-step explanations.\n\nYou can also type a direct request here!',
    timestamp: 'May 25, 2026, 10:00 AM'
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Can you generate a quick Physics test focused on Mechanics from my uploaded JEE paper?',
    timestamp: 'May 25, 2026, 10:02 AM'
  },
  {
    id: 'msg-3',
    sender: 'ai',
    text: 'Sure! I parsed your uploaded `"JEE_Advanced_Physics_2024_Paper1.pdf"` and detected several high-quality questions on Rotational Dynamics and Newton Laws. I have prepared a mock test configuration for you.',
    timestamp: 'May 25, 2026, 10:02 AM',
    suggestedConfig: {
      subject: 'Physics',
      title: 'JEE Mechanics Focus Mock',
      numQuestions: 10,
      difficulty: 'Hard',
      timeLimitMinutes: 30,
      markingScheme: { positive: 4, negative: -1 }
    }
  }
];

export const WEAK_TOPICS = [
  { name: 'Rotational Dynamics', percentage: 45, subject: 'Physics', count: 12 },
  { name: 'Organic Reaction Mechanisms', percentage: 55, subject: 'Chemistry', count: 8 },
  { name: 'Definite Integration', percentage: 60, subject: 'Mathematics', count: 10 },
  { name: 'Genetics & Molecular Basis', percentage: 65, subject: 'Biology', count: 6 },
];
