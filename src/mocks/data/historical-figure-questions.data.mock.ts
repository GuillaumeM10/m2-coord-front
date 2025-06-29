import { QuestionModel } from '@app/models/question.model';

export const historicalFigureQuestionsDataMock: QuestionModel[] = [
  {
    id: '1',
    image: 'https://picsum.photos/400/400',
    choices: ['Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Nikola Tesla'],
    correctAnswer: 'Isaac Newton',
  },
  {
    id: '2',
    image: 'https://picsum.photos/400/500',
    choices: ['Marie Curie', 'Rosalind Franklin', 'Ada Lovelace', 'Grace Hopper'],
    correctAnswer: 'Ada Lovelace',
  },
  {
    id: '3',
    image: 'https://picsum.photos/400/600',
    choices: ['Nelson Mandela', 'Martin Luther King Jr.', 'Mahatma Gandhi', 'Malala Yousafzai'],
    correctAnswer: 'Mahatma Gandhi',
  },
  {
    id: '4',
    image: 'https://picsum.photos/400/700',
    choices: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'],
    correctAnswer: 'Vincent van Gogh',
  },
  {
    id: '5',
    image: 'https://picsum.photos/400/800',
    choices: ['Cleopatra', 'Queen Elizabeth I', 'Marie Antoinette', 'Catherine the Great'],
    correctAnswer: 'Cleopatra',
  },
];
