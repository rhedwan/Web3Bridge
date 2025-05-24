import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useQuizGame } from "../useQuizGame";
import type { QuizQuestion } from "../../types/quiz";

const mockQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "High Tech Modern Language"],
    correctAnswer: 0,
    category: "Web Development",
    difficulty: "easy",
    timeLimit: 30,
  },
  {
    id: 2,
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets"],
    correctAnswer: 0,
    category: "Web Development",
    difficulty: "easy",
    timeLimit: 30,
  },
];

describe("useQuizGame", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("initializes with correct default state", () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 30,
      })
    );

    expect(result.current.gameState.isGameStarted).toBe(false);
    expect(result.current.gameState.isGameOver).toBe(false);
    expect(result.current.gameState.currentQuestionIndex).toBe(0);
    expect(result.current.gameState.score).toBe(0);
    expect(result.current.selectedAnswer).toBe(null);
    expect(result.current.showFeedback).toBe(false);
  });

  it("starts game correctly", () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 30,
      })
    );

    act(() => {
      result.current.startGame();
    });

    expect(result.current.gameState.isGameStarted).toBe(true);
    expect(result.current.gameState.timeLeft).toBe(30);
    expect(result.current.currentQuestion).toEqual(mockQuestions[0]);
  });

  it("handles answer submission correctly", () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 30,
      })
    );

    act(() => {
      result.current.startGame();
    });

    act(() => {
      result.current.submitAnswer(0); // Correct answer
    });

    expect(result.current.selectedAnswer).toBe(0);
    expect(result.current.showFeedback).toBe(true);
  });

  it("moves to next question after feedback timeout", async () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 30,
      })
    );

    act(() => {
      result.current.startGame();
    });

    act(() => {
      result.current.submitAnswer(0); // Correct answer
    });

    // Fast forward 2 seconds for feedback timeout
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.gameState.currentQuestionIndex).toBe(1);
    expect(result.current.gameState.score).toBe(1);
    expect(result.current.selectedAnswer).toBe(null);
    expect(result.current.showFeedback).toBe(false);
  });

  it("ends game after last question", () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 30,
      })
    );

    act(() => {
      result.current.startGame();
    });

    // Answer first question
    act(() => {
      result.current.submitAnswer(0);
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Answer second question
    act(() => {
      result.current.submitAnswer(0);
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.gameState.isGameOver).toBe(true);
    expect(result.current.gameState.score).toBe(2);
  });

  it("handles timer countdown", () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 30,
      })
    );

    act(() => {
      result.current.startGame();
    });

    expect(result.current.gameState.timeLeft).toBe(30);

    act(() => {
      vi.advanceTimersByTime(5000); // 5 seconds
    });

    expect(result.current.gameState.timeLeft).toBe(25);
  });

  it("handles time up scenario", () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 5,
      })
    );

    act(() => {
      result.current.startGame();
    });

    // Let timer run out
    act(() => {
      vi.advanceTimersByTime(6000); // 6 seconds (more than 5)
    });

    expect(result.current.selectedAnswer).toBe(-1);
    expect(result.current.showFeedback).toBe(true);
  });

  it("calculates progress correctly", () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 30,
      })
    );

    act(() => {
      result.current.startGame();
    });

    expect(result.current.progress).toBe(50); // 1 of 2 questions = 50%

    // Move to next question
    act(() => {
      result.current.submitAnswer(0);
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.progress).toBe(100); // 2 of 2 questions = 100%
  });

  it("resets game correctly", () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 30,
      })
    );

    // Start and play game
    act(() => {
      result.current.startGame();
    });

    act(() => {
      result.current.submitAnswer(0);
    });

    // Reset game
    act(() => {
      result.current.resetGame();
    });

    expect(result.current.gameState.isGameStarted).toBe(false);
    expect(result.current.gameState.isGameOver).toBe(false);
    expect(result.current.gameState.currentQuestionIndex).toBe(0);
    expect(result.current.gameState.score).toBe(0);
    expect(result.current.selectedAnswer).toBe(null);
    expect(result.current.showFeedback).toBe(false);
  });

  it("generates correct quiz result", () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 30,
      })
    );

    act(() => {
      result.current.startGame();
    });

    // Complete the game
    act(() => {
      result.current.submitAnswer(0); // Correct
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.submitAnswer(1); // Incorrect
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const quizResult = result.current.getQuizResult();

    expect(quizResult.score).toBe(1);
    expect(quizResult.totalQuestions).toBe(2);
    expect(quizResult.percentage).toBe(50);
    expect(quizResult.userAnswers).toEqual([0, 1]);
    expect(quizResult.correctAnswers).toEqual([0, 0]);
  });

  it("identifies correct answers", () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 30,
      })
    );

    act(() => {
      result.current.startGame();
    });

    expect(result.current.isAnswerCorrect(0)).toBe(true); // Correct answer
    expect(result.current.isAnswerCorrect(1)).toBe(false); // Incorrect answer
  });

  it("prevents answer submission during feedback", () => {
    const { result } = renderHook(() =>
      useQuizGame({
        questions: mockQuestions,
        timePerQuestion: 30,
      })
    );

    act(() => {
      result.current.startGame();
    });

    act(() => {
      result.current.submitAnswer(0);
    });

    const currentAnswer = result.current.selectedAnswer;

    // Try to submit another answer during feedback
    act(() => {
      result.current.submitAnswer(1);
    });

    // Should still be the original answer
    expect(result.current.selectedAnswer).toBe(currentAnswer);
  });
});
