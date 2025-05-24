import { useState, useEffect, useCallback } from "react";
import type { QuizQuestion, GameState, QuizResult } from "../types/quiz";

interface UseQuizGameProps {
  questions: QuizQuestion[];
  timePerQuestion?: number;
}

export const useQuizGame = ({
  questions,
  timePerQuestion = 30,
}: UseQuizGameProps) => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    timeLeft: timePerQuestion,
    isGameOver: false,
    isGameStarted: false,
    startTime: 0,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[gameState.currentQuestionIndex];

  // Timer logic
  useEffect(() => {
    if (!gameState.isGameStarted || gameState.isGameOver || showFeedback)
      return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft <= 1) {
          // Time's up, trigger timeout
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isGameStarted, gameState.isGameOver, showFeedback]);

  // Handle timeout when timeLeft reaches 0
  useEffect(() => {
    if (
      gameState.timeLeft === 0 &&
      gameState.isGameStarted &&
      !showFeedback &&
      !gameState.isGameOver
    ) {
      handleTimeUp();
    }
  }, [
    gameState.timeLeft,
    gameState.isGameStarted,
    showFeedback,
    gameState.isGameOver,
  ]);

  const startGame = useCallback(() => {
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      timeLeft: currentQuestion?.timeLimit || timePerQuestion,
      isGameOver: false,
      isGameStarted: true,
      startTime: Date.now(),
    });
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [questions, timePerQuestion]);

  const handleTimeUp = useCallback(() => {
    if (gameState.isGameOver) return;

    // Auto-submit with no answer selected (-1)
    setSelectedAnswer(-1);
    setShowFeedback(true);
  }, [gameState.isGameOver]);

  const submitAnswer = useCallback(
    (answerIndex: number) => {
      if (showFeedback || gameState.isGameOver) return;

      setSelectedAnswer(answerIndex);
      setShowFeedback(true);
    },
    [showFeedback, gameState.isGameOver]
  );

  const nextQuestion = useCallback(() => {
    if (!showFeedback || selectedAnswer === null) return;

    const answerIndex = selectedAnswer;
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newScore = isCorrect ? gameState.score + 1 : gameState.score;
    const newAnswers = [...gameState.answers, answerIndex];

    if (gameState.currentQuestionIndex >= questions.length - 1) {
      // Game over
      setGameState((prev) => ({
        ...prev,
        score: newScore,
        answers: newAnswers,
        isGameOver: true,
        endTime: Date.now(),
      }));
    } else {
      // Next question
      const nextQuestionData = questions[gameState.currentQuestionIndex + 1];
      setGameState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        score: newScore,
        answers: newAnswers,
        timeLeft: nextQuestionData?.timeLimit || timePerQuestion,
      }));
    }

    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [currentQuestion, gameState, questions, timePerQuestion, showFeedback, selectedAnswer]);

  const resetGame = useCallback(() => {
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      timeLeft: timePerQuestion,
      isGameOver: false,
      isGameStarted: false,
      startTime: 0,
    });
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [timePerQuestion]);

  const getQuizResult = useCallback((): QuizResult => {
    const timeTaken = gameState.endTime
      ? Math.floor((gameState.endTime - gameState.startTime) / 1000)
      : 0;
    const percentage = Math.round((gameState.score / questions.length) * 100);

    return {
      score: gameState.score,
      totalQuestions: questions.length,
      percentage,
      timeTaken,
      correctAnswers: questions.map((q) => q.correctAnswer),
      userAnswers: gameState.answers,
      questions,
    };
  }, [gameState, questions]);

  const isAnswerCorrect = (answerIndex: number): boolean => {
    return answerIndex === currentQuestion?.correctAnswer;
  };

  return {
    gameState,
    currentQuestion,
    selectedAnswer,
    showFeedback,
    startGame,
    submitAnswer,
    nextQuestion,
    resetGame,
    getQuizResult,
    isAnswerCorrect,
    progress: ((gameState.currentQuestionIndex + 1) / questions.length) * 100,
  };
};
