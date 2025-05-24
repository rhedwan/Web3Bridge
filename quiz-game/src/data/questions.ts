import type { QuizQuestion } from "../types/quiz";

export const quizQuestions: QuizQuestion[] = [
  // Web Development Questions
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language",
    ],
    correctAnswer: 0,
    category: "Web Development",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: 2,
    question: "Which CSS property is used to control the text size?",
    options: ["font-size", "text-size", "font-style", "text-style"],
    correctAnswer: 0,
    category: "Web Development",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: 3,
    question: "What is the correct way to create a function in JavaScript?",
    options: [
      "function = myFunction() {}",
      "function myFunction() {}",
      "create myFunction() {}",
      "def myFunction() {}",
    ],
    correctAnswer: 1,
    category: "Web Development",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: 4,
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["String", "Boolean", "Float", "Undefined"],
    correctAnswer: 2,
    category: "Web Development",
    difficulty: "medium",
    timeLimit: 45,
  },
  {
    id: 5,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: 1,
    category: "Web Development",
    difficulty: "easy",
    timeLimit: 30,
  },

  // Programming Questions
  {
    id: 6,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    category: "Programming",
    difficulty: "medium",
    timeLimit: 45,
  },
  {
    id: 7,
    question:
      "Which of the following is a principle of Object-Oriented Programming?",
    options: ["Compilation", "Encryption", "Inheritance", "Recursion"],
    correctAnswer: 2,
    category: "Programming",
    difficulty: "medium",
    timeLimit: 45,
  },
  {
    id: 8,
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Integration",
      "Automated Program Interaction",
      "Application Process Integration",
    ],
    correctAnswer: 0,
    category: "Programming",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: 9,
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
    category: "Programming",
    difficulty: "medium",
    timeLimit: 45,
  },
  {
    id: 10,
    question:
      "What is the purpose of a constructor in Object-Oriented Programming?",
    options: [
      "To destroy objects",
      "To initialize objects",
      "To copy objects",
      "To compare objects",
    ],
    correctAnswer: 1,
    category: "Programming",
    difficulty: "medium",
    timeLimit: 45,
  },

  // Blockchain/Web3 Questions
  {
    id: 11,
    question: "What is blockchain?",
    options: [
      "A type of database",
      "A distributed ledger technology",
      "A programming language",
      "A web framework",
    ],
    correctAnswer: 1,
    category: "Blockchain",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: 12,
    question: "What does 'decentralized' mean in the context of blockchain?",
    options: [
      "Controlled by one entity",
      "Distributed across multiple nodes",
      "Stored in the cloud",
      "Managed by governments",
    ],
    correctAnswer: 1,
    category: "Blockchain",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: 13,
    question: "What is a smart contract?",
    options: [
      "A legal document",
      "Self-executing code on blockchain",
      "A type of cryptocurrency",
      "A mining algorithm",
    ],
    correctAnswer: 1,
    category: "Blockchain",
    difficulty: "medium",
    timeLimit: 45,
  },
  {
    id: 14,
    question: "Which blockchain platform is known for smart contracts?",
    options: ["Bitcoin", "Ethereum", "Litecoin", "Dogecoin"],
    correctAnswer: 1,
    category: "Blockchain",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: 15,
    question: "What is the consensus mechanism used by Bitcoin?",
    options: [
      "Proof of Stake",
      "Proof of Work",
      "Delegated Proof of Stake",
      "Proof of Authority",
    ],
    correctAnswer: 1,
    category: "Blockchain",
    difficulty: "medium",
    timeLimit: 45,
  },

  // General Technology Questions
  {
    id: 16,
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Program Unit",
      "Computer Processing Unit",
    ],
    correctAnswer: 0,
    category: "Technology",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: 17,
    question: "What is the main purpose of an operating system?",
    options: [
      "To browse the internet",
      "To manage computer hardware and software",
      "To create documents",
      "To play games",
    ],
    correctAnswer: 1,
    category: "Technology",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: 18,
    question: "Which of the following is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correctAnswer: 2,
    category: "Technology",
    difficulty: "medium",
    timeLimit: 45,
  },
  {
    id: 19,
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "High Tech Transfer Protocol",
      "HyperText Transport Protocol",
      "High Transfer Text Protocol",
    ],
    correctAnswer: 0,
    category: "Technology",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: 20,
    question: "Which programming paradigm does React follow?",
    options: [
      "Object-Oriented Programming",
      "Functional Programming",
      "Component-Based Architecture",
      "Procedural Programming",
    ],
    correctAnswer: 2,
    category: "Web Development",
    difficulty: "hard",
    timeLimit: 60,
  },
];

// Helper functions for filtering and managing questions
export const getQuestionsByCategory = (category: string): QuizQuestion[] => {
  return quizQuestions.filter((question) => question.category === category);
};

export const getQuestionsByDifficulty = (
  difficulty: "easy" | "medium" | "hard"
): QuizQuestion[] => {
  return quizQuestions.filter((question) => question.difficulty === difficulty);
};

export const getRandomQuestions = (count: number = 10): QuizQuestion[] => {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getAllCategories = (): string[] => {
  return [...new Set(quizQuestions.map((question) => question.category))];
};

export const getAllDifficulties = (): ("easy" | "medium" | "hard")[] => {
  return ["easy", "medium", "hard"];
};

export const getQuestionById = (id: number): QuizQuestion | undefined => {
  return quizQuestions.find((question) => question.id === id);
};
