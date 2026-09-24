export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: Difficulty;
  explanation: string;
}

export const mockQuestions: Question[] = [
  // Easy
  {
    id: 'q1',
    text: 'What is 1/2 as a decimal?',
    options: ['0.2', '0.5', '1.2', '0.05'],
    correctAnswer: '0.5',
    difficulty: 'easy',
    explanation: '1 divided by 2 is 0.5.'
  },
  {
    id: 'q2',
    text: 'Which is larger: 1/4 or 1/2?',
    options: ['1/4', '1/2', 'They are equal', 'Cannot be determined'],
    correctAnswer: '1/2',
    difficulty: 'easy',
    explanation: '1/2 is the same as 2/4, which is larger than 1/4.'
  },
  // Medium
  {
    id: 'q3',
    text: 'What is 3/4 + 1/4?',
    options: ['4/8', '1', '3/8', '1.5'],
    correctAnswer: '1',
    difficulty: 'medium',
    explanation: '3/4 + 1/4 = 4/4, which equals 1 whole.'
  },
  {
    id: 'q4',
    text: 'Convert 0.75 to a fraction.',
    options: ['3/4', '1/4', '7/5', '75/10'],
    correctAnswer: '3/4',
    difficulty: 'medium',
    explanation: '0.75 is 75/100, which simplifies to 3/4.'
  },
  // Hard
  {
    id: 'q5',
    text: 'What is 1/3 of 0.9?',
    options: ['0.3', '0.9', '3.0', '0.03'],
    correctAnswer: '0.3',
    difficulty: 'hard',
    explanation: '0.9 divided by 3 is 0.3.'
  },
  {
    id: 'q6',
    text: 'If you have 2.5 pizzas and eat 3/4 of a pizza, how much is left as a decimal?',
    options: ['1.25', '1.75', '1.5', '2.0'],
    correctAnswer: '1.75',
    difficulty: 'hard',
    explanation: '3/4 is 0.75. 2.5 - 0.75 = 1.75 pizzas left.'
  }
];
