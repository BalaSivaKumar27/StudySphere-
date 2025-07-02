import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Award, Clock } from 'lucide-react';

const QuizComponent = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * quiz.questions.length); // 30 seconds per question
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleQuizComplete = () => {
    const correctAnswers = quiz.questions.reduce((acc, question) => {
      return selectedAnswers[question.id] === question.correct ? acc + 1 : acc;
    }, 0);
    
    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    if (onComplete) {
      onComplete(finalScore);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeLeft(30 * quiz.questions.length);
    setQuizStarted(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return { text: 'Excellent!', color: 'bg-green-500' };
    if (score >= 80) return { text: 'Great!', color: 'bg-blue-500' };
    if (score >= 70) return { text: 'Good', color: 'bg-yellow-500' };
    if (score >= 60) return { text: 'Pass', color: 'bg-orange-500' };
    return { text: 'Try Again', color: 'bg-red-500' };
  };

  if (!quizStarted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {quiz.title}
        </h2>
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{quiz.questions.length}</span>
              <span>Questions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeLeft)} Total</span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Answer all questions to test your knowledge. You'll have 30 seconds per question.
          </p>
        </div>
        <button
          onClick={() => setQuizStarted(true)}
          className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (showResults) {
    const badge = getScoreBadge(score);
    const correctCount = quiz.questions.reduce((acc, question) => {
      return selectedAnswers[question.id] === question.correct ? acc + 1 : acc;
    }, 0);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className={`w-24 h-24 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <Award className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Quiz Complete!
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </span>
            <span className={`px-3 py-1 ${badge.color} text-white text-sm font-medium rounded-full`}>
              {badge.text}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            You got {correctCount} out of {quiz.questions.length} questions correct
          </p>
        </div>

        {/* Question Results */}
        <div className="space-y-4 mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Question Results:</h3>
          {quiz.questions.map((question, index) => {
            const userAnswer = selectedAnswers[question.id];
            const isCorrect = userAnswer === question.correct;
            
            return (
              <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">
                      {index + 1}. {question.question}
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className="text-green-600 dark:text-green-400">
                        ✓ Correct: {question.options[question.correct]}
                      </p>
                      {!isCorrect && userAnswer !== undefined && (
                        <p className="text-red-600 dark:text-red-400">
                          ✗ Your answer: {question.options[userAnswer]}
                        </p>
                      )}
                      {userAnswer === undefined && (
                        <p className="text-gray-500 dark:text-gray-400">
                          No answer selected
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={resetQuiz}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
          <button
            onClick={() => onComplete && onComplete(score)}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Continue Learning
          </button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      {/* Quiz Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {quiz.title}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span className={timeLeft < 60 ? 'text-red-600 font-medium' : ''}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {question.question}
        </h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedAnswers[question.id] === index
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={index}
                checked={selectedAnswers[question.id] === index}
                onChange={() => handleAnswerSelect(question.id, index)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                selectedAnswers[question.id] === index
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                {selectedAnswers[question.id] === index && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="text-gray-900 dark:text-white">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex space-x-2">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200 ${
                index === currentQuestion
                  ? 'bg-primary-600 text-white'
                  : selectedAnswers[quiz.questions[index].id] !== undefined
                  ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedAnswers[question.id] === undefined}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === quiz.questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;