import React from "react";
import type { QuizQuestion } from "../types/quiz";

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  onNextQuestion?: () => void;
  timeLeft: number;
  progress: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showFeedback,
  onAnswerSelect,
  onNextQuestion,
  timeLeft,
  progress,
}) => {
  const getTimerClass = () => {
    if (timeLeft <= 5) return "timer danger";
    if (timeLeft <= 10) return "timer warning";
    return "timer";
  };

  const getOptionClass = (optionIndex: number) => {
    let baseClass = "option-button";

    if (showFeedback) {
      if (optionIndex === question.correctAnswer) {
        baseClass += " correct";
      } else if (
        optionIndex === selectedAnswer &&
        optionIndex !== question.correctAnswer
      ) {
        baseClass += " incorrect";
      }
    } else if (selectedAnswer === optionIndex) {
      baseClass += " selected";
    }

    return baseClass;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="question-card fade-in">
      {/* Header */}
      <div className="flex justify-between align-center mb-6">
        <div className="text-sm text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </div>
        <div className={getTimerClass()}>⏱️ {formatTime(timeLeft)}</div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar mb-6">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {question.question}
      </h2>

      {/* Category and Difficulty */}
      <div className="flex gap-4 mb-6">
        <span className="bg-primary text-white px-3 py-1 rounded text-sm">
          {question.category}
        </span>
        <span
          className={`px-3 py-1 rounded text-sm text-white ${
            question.difficulty === "easy"
              ? "bg-secondary"
              : question.difficulty === "medium"
              ? "bg-warning"
              : "bg-danger"
          }`}
        >
          {question.difficulty.charAt(0).toUpperCase() +
            question.difficulty.slice(1)}
        </span>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(index)}
            onClick={() => !showFeedback && onAnswerSelect(index)}
            disabled={showFeedback}
          >
            <span className="font-medium text-gray-700 mr-3">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="mt-6 p-4 rounded-lg slide-in">
          {selectedAnswer === question.correctAnswer ? (
            <div className="bg-secondary text-white p-4 rounded-lg">
              <div className="flex align-center gap-2">
                <span className="text-xl">✅</span>
                <span className="font-semibold">Correct!</span>
              </div>
              <p className="mt-2">Well done! You selected the right answer.</p>
            </div>
          ) : (
            <div className="bg-danger text-white p-4 rounded-lg">
              <div className="flex align-center gap-2">
                <span className="text-xl">❌</span>
                <span className="font-semibold">
                  {selectedAnswer === -1 ? "Time's up!" : "Incorrect"}
                </span>
              </div>
              <p className="mt-2">
                The correct answer is:{" "}
                <strong>
                  {String.fromCharCode(65 + question.correctAnswer)}.{" "}
                  {question.options[question.correctAnswer]}
                </strong>
              </p>
            </div>
          )}

          {/* Next Button */}
          {onNextQuestion && (
            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={onNextQuestion}>
                {questionNumber === totalQuestions
                  ? "Finish Quiz"
                  : "Next Question"}{" "}
                →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
