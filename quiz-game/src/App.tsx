import React, { useState, useMemo } from "react";
import type { QuizSettings } from "./types/quiz";
import {
  quizQuestions,
  getQuestionsByCategory,
  getQuestionsByDifficulty,
  getRandomQuestions,
} from "./data/questions";
import { useQuizGame } from "./hooks/useQuizGame";
import { GameStart } from "./components/GameStart";
import { QuestionCard } from "./components/QuestionCard";
import { GameResult } from "./components/GameResult";
import { Leaderboard } from "./components/Leaderboard";

type GameScreen = "start" | "playing" | "result" | "leaderboard";

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("start");
  const [playerName, setPlayerName] = useState("");
  const [gameSettings, setGameSettings] = useState<QuizSettings | null>(null);

  // Generate questions based on settings
  const gameQuestions = useMemo(() => {
    if (!gameSettings) return [];

    let filteredQuestions = [...quizQuestions];

    // Filter by category if specified
    if (gameSettings.category) {
      filteredQuestions = getQuestionsByCategory(gameSettings.category);
    }

    // Filter by difficulty if specified
    if (gameSettings.difficulty) {
      const difficultyFiltered = getQuestionsByDifficulty(
        gameSettings.difficulty
      );
      if (gameSettings.category) {
        // Intersect category and difficulty filters
        filteredQuestions = filteredQuestions.filter((q) =>
          difficultyFiltered.some((dq) => dq.id === q.id)
        );
      } else {
        filteredQuestions = difficultyFiltered;
      }
    }

    // Return up to 10 random questions from filtered set
    if (filteredQuestions.length === 0) {
      // Fallback to all questions if filters result in no questions
      return getRandomQuestions(10);
    }

    // Shuffle and take up to 10 questions
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(10, shuffled.length));
  }, [gameSettings]);

  const {
    gameState,
    currentQuestion,
    selectedAnswer,
    showFeedback,
    startGame,
    submitAnswer,
    nextQuestion,
    resetGame,
    getQuizResult,
    progress,
  } = useQuizGame({
    questions: gameQuestions,
    timePerQuestion: gameSettings?.timePerQuestion || 30,
  });

  const handleStartGame = (settings: QuizSettings, name: string) => {
    setGameSettings(settings);
    setPlayerName(name);
    setCurrentScreen("playing");
    // Start the game after setting the screen
    setTimeout(() => startGame(), 100);
  };

  const handlePlayAgain = () => {
    if (gameSettings) {
      resetGame();
      setCurrentScreen("playing");
      setTimeout(() => startGame(), 100);
    }
  };

  const handleBackToMenu = () => {
    resetGame();
    setGameSettings(null);
    setPlayerName("");
    setCurrentScreen("start");
  };

  const handleShowLeaderboard = () => {
    setCurrentScreen("leaderboard");
  };

  // Handle game completion
  React.useEffect(() => {
    if (gameState.isGameOver && currentScreen === "playing") {
      setCurrentScreen("result");
    }
  }, [gameState.isGameOver, currentScreen]);

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "start":
        return (
          <GameStart
            onStartGame={handleStartGame}
            onShowLeaderboard={handleShowLeaderboard}
          />
        );

      case "playing":
        if (!currentQuestion || !gameState.isGameStarted) {
          return (
            <div className="quiz-container">
              <div className="card text-center">
                <div className="text-2xl font-semibold text-gray-800">
                  Preparing your quiz...
                </div>
                <div className="mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="quiz-container">
            <QuestionCard
              question={currentQuestion}
              questionNumber={gameState.currentQuestionIndex + 1}
              totalQuestions={gameQuestions.length}
              selectedAnswer={selectedAnswer}
              showFeedback={showFeedback}
              onAnswerSelect={submitAnswer}
              onNextQuestion={nextQuestion}
              timeLeft={gameState.timeLeft}
              progress={progress}
            />

            {/* Game Controls */}
            <div className="text-center mt-6">
              <button
                className="btn btn-outline"
                onClick={handleBackToMenu}
                disabled={showFeedback}
              >
                ⏹️ Quit Game
              </button>
            </div>
          </div>
        );

      case "result":
        return (
          <GameResult
            result={getQuizResult()}
            playerName={playerName}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={handleBackToMenu}
            onShowLeaderboard={handleShowLeaderboard}
          />
        );

      case "leaderboard":
        return <Leaderboard onBackToMenu={handleBackToMenu} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800">
      <div className="container mx-auto py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-4xl">🧠</div>
            <h1 className="text-3xl font-bold text-white">
              Quiz Game Challenge
            </h1>
            <div className="text-4xl">🎯</div>
          </div>
          <p className="text-white/80 text-lg">
            Test your knowledge • Compete with others • Have fun!
          </p>
        </header>

        {/* Game Content */}
        <main>{renderCurrentScreen()}</main>

        {/* Footer */}
        <footer className="text-center mt-12 text-white/60">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span>Built with React + TypeScript + Vite</span>
            <span>•</span>
            <span>Web3Bridge Cohort XIII</span>
          </div>
          <div className="text-sm">
            Created for the Pre-Qualification Exercise
          </div>
        </footer>
      </div>

      {/* Global Error Boundary */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 text-white/50 text-xs">
          Current Screen: {currentScreen}
        </div>
      )}
    </div>
  );
}

export default App;
