import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLeaderboard } from "../useLeaderboard";
import type { QuizResult } from "../../types/quiz";

const mockQuizResult: QuizResult = {
  score: 8,
  totalQuestions: 10,
  percentage: 80,
  timeTaken: 120,
  correctAnswers: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  userAnswers: [0, 1, 0, 1, 0, 2, 0, 1, 0, 1],
  questions: [],
};

describe("useLeaderboard", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("initializes with empty leaderboard", () => {
    const { result } = renderHook(() => useLeaderboard());

    expect(result.current.leaderboard).toEqual([]);
  });

  it("saves score to leaderboard", () => {
    const { result } = renderHook(() => useLeaderboard());

    let savedEntry: any;
    act(() => {
      savedEntry = result.current.saveScore("TestPlayer", mockQuizResult);
    });

    expect(savedEntry).toBeDefined();
    expect(savedEntry?.playerName).toBe("TestPlayer");
    expect(savedEntry?.percentage).toBe(80);
    expect(result.current.leaderboard).toHaveLength(1);
    expect(result.current.leaderboard[0].playerName).toBe("TestPlayer");
  });

  it("handles anonymous player name", () => {
    const { result } = renderHook(() => useLeaderboard());

    let savedEntry: any;
    act(() => {
      savedEntry = result.current.saveScore("   ", mockQuizResult);
    });

    expect(savedEntry?.playerName).toBe("Anonymous");
  });

  it("sorts leaderboard by percentage desc, then by time asc", () => {
    const { result } = renderHook(() => useLeaderboard());

    const result1: QuizResult = {
      ...mockQuizResult,
      percentage: 70,
      timeTaken: 100,
    };
    const result2: QuizResult = {
      ...mockQuizResult,
      percentage: 80,
      timeTaken: 120,
    };
    const result3: QuizResult = {
      ...mockQuizResult,
      percentage: 80,
      timeTaken: 90,
    };

    act(() => {
      result.current.saveScore("Player1", result1);
      result.current.saveScore("Player2", result2);
      result.current.saveScore("Player3", result3);
    });

    expect(result.current.leaderboard).toHaveLength(3);
    expect(result.current.leaderboard[0].playerName).toBe("Player3"); // 80%, 90s
    expect(result.current.leaderboard[1].playerName).toBe("Player2"); // 80%, 120s
    expect(result.current.leaderboard[2].playerName).toBe("Player1"); // 70%, 100s
  });

  it("limits leaderboard to max entries", () => {
    const { result } = renderHook(() => useLeaderboard());

    // Add 12 entries (more than the limit of 10)
    act(() => {
      for (let i = 0; i < 12; i++) {
        const testResult = { ...mockQuizResult, percentage: 50 + i };
        result.current.saveScore(`Player${i}`, testResult);
      }
    });

    expect(result.current.leaderboard).toHaveLength(10);
    // Should keep the highest scores
    expect(result.current.leaderboard[0].percentage).toBe(61);
    expect(result.current.leaderboard[9].percentage).toBe(52);
  });

  it("clears leaderboard", () => {
    const { result } = renderHook(() => useLeaderboard());

    // Add an entry first
    act(() => {
      result.current.saveScore("TestPlayer", mockQuizResult);
    });

    expect(result.current.leaderboard).toHaveLength(1);

    // Clear leaderboard
    act(() => {
      result.current.clearLeaderboard();
    });

    expect(result.current.leaderboard).toHaveLength(0);
  });

  it("identifies high scores correctly", () => {
    const { result } = renderHook(() => useLeaderboard());

    // Add some scores
    act(() => {
      result.current.saveScore("Player1", {
        ...mockQuizResult,
        percentage: 90,
      });
      result.current.saveScore("Player2", {
        ...mockQuizResult,
        percentage: 80,
      });
      result.current.saveScore("Player3", {
        ...mockQuizResult,
        percentage: 70,
      });
    });

    expect(result.current.isHighScore(95, 100)).toBe(true); // Better percentage
    expect(result.current.isHighScore(90, 80)).toBe(true); // Same percentage, better time
    expect(result.current.isHighScore(60, 100)).toBe(false); // Worse percentage
    expect(result.current.isHighScore(90, 150)).toBe(false); // Same percentage, worse time
  });

  it("returns correct player rank", () => {
    const { result } = renderHook(() => useLeaderboard());

    let entry1: any, entry2: any, entry3: any;

    act(() => {
      entry1 = result.current.saveScore("Player1", {
        ...mockQuizResult,
        percentage: 90,
      });
      entry2 = result.current.saveScore("Player2", {
        ...mockQuizResult,
        percentage: 80,
      });
      entry3 = result.current.saveScore("Player3", {
        ...mockQuizResult,
        percentage: 70,
      });
    });

    expect(result.current.getPlayerRank(entry1!.id)).toBe(1);
    expect(result.current.getPlayerRank(entry2!.id)).toBe(2);
    expect(result.current.getPlayerRank(entry3!.id)).toBe(3);
    expect(result.current.getPlayerRank("nonexistent")).toBe(-1);
  });

  it("handles localStorage errors gracefully", () => {
    // Mock localStorage to throw an error
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = vi.fn(() => {
      throw new Error("localStorage error");
    });

    const { result } = renderHook(() => useLeaderboard());

    let savedEntry: any;
    act(() => {
      savedEntry = result.current.saveScore("TestPlayer", mockQuizResult);
    });

    expect(savedEntry).toBe(null);

    // Restore original localStorage
    localStorage.setItem = originalSetItem;
  });

  it("loads existing leaderboard from localStorage", () => {
    // Pre-populate localStorage
    const existingData = [
      {
        id: "1",
        playerName: "ExistingPlayer",
        score: 9,
        totalQuestions: 10,
        percentage: 90,
        timeTaken: 100,
        date: new Date().toISOString(),
      },
    ];
    localStorage.setItem("quiz-game-leaderboard", JSON.stringify(existingData));

    const { result } = renderHook(() => useLeaderboard());

    expect(result.current.leaderboard).toHaveLength(1);
    expect(result.current.leaderboard[0].playerName).toBe("ExistingPlayer");
  });

  it("handles corrupted localStorage data", () => {
    // Set invalid JSON in localStorage
    localStorage.setItem("quiz-game-leaderboard", "invalid json");

    const { result } = renderHook(() => useLeaderboard());

    // Should initialize with empty array when localStorage data is corrupted
    expect(result.current.leaderboard).toEqual([]);
  });

  it("refreshes leaderboard from localStorage", () => {
    const { result } = renderHook(() => useLeaderboard());

    // Manually add data to localStorage
    const newData = [
      {
        id: "1",
        playerName: "ManualPlayer",
        score: 7,
        totalQuestions: 10,
        percentage: 70,
        timeTaken: 150,
        date: new Date().toISOString(),
      },
    ];
    localStorage.setItem("quiz-game-leaderboard", JSON.stringify(newData));

    // Refresh leaderboard
    act(() => {
      result.current.refreshLeaderboard();
    });

    expect(result.current.leaderboard).toHaveLength(1);
    expect(result.current.leaderboard[0].playerName).toBe("ManualPlayer");
  });
});
