const express = require('express');
const router = express.Router();

const mathQuestions = [
  { id: 'q1', text: 'What is 1/2 as a decimal?', options: ['0.2', '0.5', '1.2', '0.05'], correctAnswer: '0.5', difficulty: 'easy', explanation: '1 divided by 2 is 0.5.' },
  { id: 'q2', text: 'Which is larger: 1/4 or 1/2?', options: ['1/4', '1/2', 'They are equal', 'Cannot be determined'], correctAnswer: '1/2', difficulty: 'easy', explanation: '1/2 is the same as 2/4, which is larger than 1/4.' },
  { id: 'q3', text: 'What is 3/4 + 1/4?', options: ['4/8', '1', '3/8', '1.5'], correctAnswer: '1', difficulty: 'medium', explanation: '3/4 + 1/4 = 4/4, which equals 1 whole.' }
];

const scienceQuestions = [
  { id: 's1', text: 'Which planet is closest to the Sun?', options: ['Venus', 'Earth', 'Mercury', 'Mars'], correctAnswer: 'Mercury', difficulty: 'easy', explanation: 'Mercury is the innermost planet in our solar system.' },
  { id: 's2', text: 'What do plants need for photosynthesis?', options: ['Oxygen & Sugar', 'Sunlight, Water, CO2', 'Nitrogen & Soil', 'Heat & Wind'], correctAnswer: 'Sunlight, Water, CO2', difficulty: 'easy', explanation: 'Plants convert sunlight, water, and carbon dioxide into energy.' },
  { id: 's3', text: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Gd', 'Go'], correctAnswer: 'Au', difficulty: 'medium', explanation: 'Au comes from the Latin word for gold, aurum.' }
];

const historyQuestions = [
  { id: 'h1', text: 'Who was the first President of the United States?', options: ['Abraham Lincoln', 'Thomas Jefferson', 'George Washington', 'John Adams'], correctAnswer: 'George Washington', difficulty: 'easy', explanation: 'George Washington was the first U.S. President.' },
  { id: 'h2', text: 'In what year did World War II end?', options: ['1940', '1945', '1950', '1939'], correctAnswer: '1945', difficulty: 'easy', explanation: 'WWII ended in 1945 with the surrender of Axis powers.' },
  { id: 'h3', text: 'Who built the Great Pyramid of Giza?', options: ['Ramses II', 'Cleopatra', 'Khufu', 'Tutankhamun'], correctAnswer: 'Khufu', difficulty: 'medium', explanation: 'Pharaoh Khufu commissioned the Great Pyramid.' }
];

const geographyQuestions = [
  { id: 'g1', text: 'What is the capital of France?', options: ['London', 'Berlin', 'Paris', 'Madrid'], correctAnswer: 'Paris', difficulty: 'easy', explanation: 'Paris is the capital of France.' },
  { id: 'g2', text: 'Which is the largest continent?', options: ['Africa', 'Asia', 'North America', 'Europe'], correctAnswer: 'Asia', difficulty: 'easy', explanation: 'Asia is the largest continent by land mass.' },
  { id: 'g3', text: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], correctAnswer: 'Nile', difficulty: 'medium', explanation: 'The Nile is traditionally considered the longest river in the world.' }
];

const literatureQuestions = [
  { id: 'l1', text: 'Who wrote Romeo and Juliet?', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'], correctAnswer: 'William Shakespeare', difficulty: 'easy', explanation: 'Shakespeare wrote Romeo and Juliet in the late 16th century.' },
  { id: 'l2', text: 'What is the past tense of "run"?', options: ['Runned', 'Ran', 'Running', 'Run'], correctAnswer: 'Ran', difficulty: 'easy', explanation: '"Ran" is the past tense of run.' },
  { id: 'l3', text: 'What is a metaphor?', options: ['A literal statement', 'A comparison using like or as', 'A direct comparison', 'A rhyming word'], correctAnswer: 'A direct comparison', difficulty: 'medium', explanation: 'A metaphor directly compares two things without using like or as.' }
];

const codingQuestions = [
  { id: 'c1', text: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink and Text Markup Language', 'Home Tool Markup Language'], correctAnswer: 'Hyper Text Markup Language', difficulty: 'easy', explanation: 'HTML stands for Hyper Text Markup Language.' },
  { id: 'c2', text: 'Which symbol is used for single line comments in JavaScript?', options: ['<!--', '/*', '//', '#'], correctAnswer: '//', difficulty: 'easy', explanation: 'Double slashes (//) are used for single-line comments in JS.' },
  { id: 'c3', text: 'What does CSS do?', options: ['Structure web pages', 'Style web pages', 'Add interactivity', 'Manage databases'], correctAnswer: 'Style web pages', difficulty: 'medium', explanation: 'CSS is used to style and layout web pages.' }
];

router.get('/:id', (req, res) => {
  const lessonId = req.params.id;
  
  let selectedQuestions = mathQuestions;
  let lessonTitle = 'Fractions & Decimals';
  
  if (lessonId === 'science') {
    selectedQuestions = scienceQuestions;
    lessonTitle = 'Solar System Explorer';
  } else if (lessonId === 'history') {
    selectedQuestions = historyQuestions;
    lessonTitle = 'Ancient Civilizations';
  } else if (lessonId === 'geography') {
    selectedQuestions = geographyQuestions;
    lessonTitle = 'World Geography';
  } else if (lessonId === 'literature') {
    selectedQuestions = literatureQuestions;
    lessonTitle = 'Literature & Grammar';
  } else if (lessonId === 'coding') {
    selectedQuestions = codingQuestions;
    lessonTitle = 'Logic & Coding Basics';
  }

  res.json({
    id: lessonId,
    title: lessonTitle,
    questions: selectedQuestions
  });
});

module.exports = router;
