import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { VoiceReader } from '@/components/VoiceReader';
import type { Difficulty, Question } from '@/data/mockQuiz';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from 'lucide-react';

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  // Adaptive State
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>('easy');
  const [questionsAnswered, setQuestionsAnswered] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // Feedback State
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Quiz Data State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`/api/lessons/${id}`);
        const data = await response.json();
        if (data && data.questions) {
          setQuestions(data.questions);
        }
      } catch (error) {
        console.error("Failed to load lesson:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchLesson();
  }, [id]);

  // Get next question based on current difficulty
  const currentQuestion = useMemo(() => {
    const available = questions.filter(q => 
      q.difficulty === currentDifficulty && !questionsAnswered.includes(q.id)
    );
    
    // If we run out of questions in this difficulty, just take any available question
    if (available.length === 0) {
      const anyAvailable = questions.filter(q => !questionsAnswered.includes(q.id));
      if (anyAvailable.length === 0) return null; // Quiz done
      return anyAvailable[0];
    }
    
    return available[0];
  }, [currentDifficulty, questionsAnswered, questions]);

  const handleAnswer = (answer: string) => {
    if (!currentQuestion || selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 10);
    }
  };

  const handleNext = () => {
    if (!currentQuestion) return;
    
    setQuestionsAnswered([...questionsAnswered, currentQuestion.id]);
    setSelectedAnswer(null);
    setIsCorrect(null);
    
    if (questionsAnswered.length >= 4) {
      // Finish quiz after 5 questions (or whatever max)
      setIsFinished(true);
      return;
    }

    // Adaptive Logic: Adjust difficulty based on this answer
    if (isCorrect) {
      if (currentDifficulty === 'easy') setCurrentDifficulty('medium');
      else if (currentDifficulty === 'medium') setCurrentDifficulty('hard');
    } else {
      if (currentDifficulty === 'hard') setCurrentDifficulty('medium');
      else if (currentDifficulty === 'medium') setCurrentDifficulty('easy');
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-transparent p-4 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-surface backdrop-blur-2xl p-8 rounded-[2rem] text-center max-w-md w-full shadow-2xl border border-white/20"
        >
          <Trophy className="h-20 w-20 text-accent mx-auto mb-4 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
          <h1 className="text-3xl font-bold font-heading mb-2 text-white">Lesson Complete!</h1>
          <p className="text-white/70 mb-6">Great job completing the {id} module.</p>
          <div className="bg-primary/20 backdrop-blur-md border border-primary/30 rounded-2xl p-6 mb-8 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
            <p className="text-4xl font-bold text-white drop-shadow-md">+{score} XP</p>
          </div>
          <Button size="lg" className="w-full" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="min-h-screen bg-transparent flex items-center justify-center font-bold text-white/50 tracking-widest uppercase">Loading lesson...</div>;
  }

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-5 w-5 mr-2" /> Back
        </Button>
        <div className="font-bold text-white/70 tracking-widest uppercase text-xs">
          Question {questionsAnswered.length + 1} of 5
        </div>
        <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase text-white shadow-inner">
          Level: <span className={
            currentDifficulty === 'easy' ? 'text-primary' :
            currentDifficulty === 'medium' ? 'text-accent' : 'text-danger'
          }>{currentDifficulty}</span>
        </div>
      </header>

      {/* Main Lesson Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="bg-surface backdrop-blur-2xl p-8 rounded-[2rem] shadow-2xl border border-white/20 mb-8"
            >
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-2xl font-bold font-heading text-white drop-shadow-sm leading-relaxed">
                  {currentQuestion.text}
                </h2>
                <VoiceReader text={currentQuestion.text} />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selectedAnswer === opt;
                  const isActuallyCorrect = opt === currentQuestion.correctAnswer;
                  
                  let btnState = "border-white/10 hover:border-white/30 hover:bg-white/10 text-white bg-white/5 shadow-sm";
                  if (selectedAnswer) {
                    if (isActuallyCorrect) {
                      btnState = "border-primary bg-primary/20 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]";
                    } else if (isSelected && !isActuallyCorrect) {
                      btnState = "border-danger bg-danger/20 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]";
                    } else {
                      btnState = "border-white/5 opacity-40 bg-transparent";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswer(opt)}
                      className={`p-6 rounded-2xl border text-lg font-medium transition-all text-left backdrop-blur-md ${btnState}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Section */}
              <AnimatePresence>
                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`mt-8 p-6 rounded-2xl flex items-start gap-4 overflow-hidden backdrop-blur-md border ${
                      isCorrect ? 'bg-primary/20 border-primary/30 text-white' : 'bg-danger/20 border-danger/30 text-white'
                    }`}
                  >
                    {isCorrect ? <CheckCircle2 className="h-6 w-6 mt-1 flex-shrink-0 text-primary" /> : <XCircle className="h-6 w-6 mt-1 flex-shrink-0 text-danger" />}
                    <div>
                      <h3 className="font-bold text-lg mb-1">{isCorrect ? 'Awesome job!' : 'Not quite right'}</h3>
                      <p className="opacity-90">{currentQuestion.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          {selectedAnswer && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
              <Button size="lg" className="px-8 shadow-[0_0_20px_rgba(124,58,237,0.4)]" onClick={handleNext}>
                Continue
              </Button>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
