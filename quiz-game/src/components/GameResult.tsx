import React, { useState, useEffect } from "react";
import type { QuizResult } from "../types/quiz";
import { useLeaderboard } from "../hooks/useLeaderboard";

interface GameResultProps {
  result: QuizResult;
  playerName: string;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
  onShowLeaderboard: () => void;
}

export const GameResult: React.FC<GameResultProps> = ({
  result,
  playerName,
  onPlayAgain,
  onBackToMenu,
  onShowLeaderboard,
}) => {
  const { saveScore, isHighScore } = useLeaderboard();
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);

  useEffect(() => {
    // Auto-submit score on component mount
    if (!hasSubmittedScore) {
      saveScore(playerName, result);
      setHasSubmittedScore(true);
    }
  }, [playerName, result, saveScore, hasSubmittedScore]);

  const getPerformanceMessage = () => {
    const percentage = result.percentage;
    if (percentage >= 90)
      return { message: "Outstanding! 🏆", color: "text-yellow-600" };
    if (percentage >= 80)
      return { message: "Excellent! 🌟", color: "text-green-600" };
    if (percentage >= 70)
      return { message: "Great job! 👏", color: "text-blue-600" };
    if (percentage >= 60)
      return { message: "Good effort! 👍", color: "text-orange-600" };
    if (percentage >= 50)
      return { message: "Not bad! 💪", color: "text-yellow-600" };
    return { message: "Keep practicing! 📚", color: "text-red-600" };
  };

  const performance = getPerformanceMessage();
  const isNewHighScore = isHighScore(result.percentage, result.timeTaken);
  const averageTimePerQuestion = Math.round(
    result.timeTaken / result.totalQuestions
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="quiz-container">
      <div className="card text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Quiz Complete! 🎉
          </h1>
          <p className="text-lg text-gray-600">Well done, {playerName}!</p>
          {isNewHighScore && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800 font-semibold">
                🎉 New High Score! 🎉
              </p>
            </div>
          )}
        </div>

        {/* Score Display */}
        <div className="mb-8">
          <div className="text-6xl font-bold text-primary mb-2">
            {result.percentage}%
          </div>
          <div className={`text-xl font-semibold ${performance.color} mb-4`}>
            {performance.message}
          </div>
          <div className="text-lg text-gray-600">
            {result.score} out of {result.totalQuestions} questions correct
          </div>
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">
              {result.score}
            </div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-warning mb-2">
              {formatTime(result.timeTaken)}
            </div>
            <div className="text-sm text-gray-600">Total Time</div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-secondary mb-2">
              {averageTimePerQuestion}s
            </div>
            <div className="text-sm text-gray-600">Avg. per Question</div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Question Review
          </h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {result.questions.map((question, index) => {
              const userAnswer = result.userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              const wasTimedOut = userAnswer === -1;

              return (
                <div
                  key={question.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Question {index + 1}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        isCorrect
                          ? "bg-green-100 text-green-800"
                          : wasTimedOut
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {isCorrect
                        ? "✓ Correct"
                        : wasTimedOut
                        ? "⏰ Time Out"
                        : "✗ Incorrect"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-800 mb-2">
                    {question.question}
                  </p>

                  <div className="text-xs text-gray-600">
                    <div>
                      <strong>Correct:</strong>{" "}
                      {String.fromCharCode(65 + question.correctAnswer)}.{" "}
                      {question.options[question.correctAnswer]}
                    </div>
                    {userAnswer !== -1 &&
                      userAnswer !== question.correctAnswer && (
                        <div className="text-red-600">
                          <strong>Your answer:</strong>{" "}
                          {String.fromCharCode(65 + userAnswer)}.{" "}
                          {question.options[userAnswer]}
                        </div>
                      )}
                    {wasTimedOut && (
                      <div className="text-yellow-600">
                        <strong>Time expired before answering</strong>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary btn-lg" onClick={onPlayAgain}>
            🔄 Play Again
          </button>
          <button
            className="btn btn-secondary btn-lg"
            onClick={onShowLeaderboard}
          >
            🏆 View Leaderboard
          </button>
          <button className="btn btn-outline btn-lg" onClick={onBackToMenu}>
            🏠 Main Menu
          </button>
        </div>

        {/* Share Results */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            Share Your Results
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            I scored {result.percentage}% on the Quiz Game Challenge! 🧠
          </p>
          <div className="flex justify-center gap-2">
            <button
              className="btn btn-sm"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Quiz Game Results",
                    text: `I scored ${result.percentage}% on the Quiz Game Challenge!`,
                    url: window.location.href,
                  });
                } else {
                  // Fallback to clipboard
                  navigator.clipboard.writeText(
                    `I scored ${result.percentage}% on the Quiz Game Challenge! ${window.location.href}`
                  );
                  alert("Results copied to clipboard!");
                }
              }}
            >
              📤 Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
