import { useState, useEffect, useCallback } from "react";
import type { LeaderboardEntry, QuizResult } from "../types/quiz";

const LEADERBOARD_KEY = "quiz-game-leaderboard";
const MAX_ENTRIES = 10;

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = useCallback(() => {
    try {
      const stored = localStorage.getItem(LEADERBOARD_KEY);
      if (stored) {
        const entries = JSON.parse(stored) as LeaderboardEntry[];
        // Sort by percentage, then by time taken (lower is better)
        const sorted = entries.sort((a, b) => {
          if (a.percentage === b.percentage) {
            return a.timeTaken - b.timeTaken;
          }
          return b.percentage - a.percentage;
        });
        setLeaderboard(sorted);
      }
    } catch (error) {
      console.error("Error loading leaderboard:", error);
      setLeaderboard([]);
    }
  }, []);

  const saveScore = useCallback((playerName: string, result: QuizResult) => {
    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      playerName: playerName.trim() || "Anonymous",
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentage: result.percentage,
      timeTaken: result.timeTaken,
      date: new Date().toISOString(),
    };

    try {
      // Get current entries from localStorage to ensure we have the latest data
      const stored = localStorage.getItem(LEADERBOARD_KEY);
      const currentEntries = stored
        ? (JSON.parse(stored) as LeaderboardEntry[])
        : [];
      currentEntries.push(newEntry);

      // Sort and keep only top entries
      const sorted = currentEntries
        .sort((a, b) => {
          if (a.percentage === b.percentage) {
            return a.timeTaken - b.timeTaken;
          }
          return b.percentage - a.percentage;
        })
        .slice(0, MAX_ENTRIES);

      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sorted));
      setLeaderboard(sorted);

      return newEntry;
    } catch (error) {
      console.error("Error saving score:", error);
      return null;
    }
  }, []);

  const clearLeaderboard = useCallback(() => {
    try {
      localStorage.removeItem(LEADERBOARD_KEY);
      setLeaderboard([]);
    } catch (error) {
      console.error("Error clearing leaderboard:", error);
    }
  }, []);

  const isHighScore = useCallback(
    (percentage: number, timeTaken: number): boolean => {
      if (leaderboard.length < MAX_ENTRIES) return true;

      const worstEntry = leaderboard[leaderboard.length - 1];
      if (percentage > worstEntry.percentage) return true;
      if (
        percentage === worstEntry.percentage &&
        timeTaken < worstEntry.timeTaken
      )
        return true;

      return false;
    },
    [leaderboard]
  );

  const getPlayerRank = useCallback(
    (entryId: string): number => {
      const index = leaderboard.findIndex((entry) => entry.id === entryId);
      return index === -1 ? -1 : index + 1;
    },
    [leaderboard]
  );

  return {
    leaderboard,
    saveScore,
    clearLeaderboard,
    isHighScore,
    getPlayerRank,
    refreshLeaderboard: loadLeaderboard,
  };
};
