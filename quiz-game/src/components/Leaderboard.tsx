import React from "react";
import { useLeaderboard } from "../hooks/useLeaderboard";

interface LeaderboardProps {
  onBackToMenu: () => void;
  highlightEntryId?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  onBackToMenu,
  highlightEntryId,
}) => {
  const { leaderboard, clearLeaderboard } = useLeaderboard();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRankClass = (rank: number) => {
    if (rank === 1) return "rank gold";
    if (rank === 2) return "rank silver";
    if (rank === 3) return "rank bronze";
    return "rank";
  };

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}`;
  };

  const handleClearLeaderboard = () => {
    if (
      window.confirm(
        "Are you sure you want to clear the leaderboard? This action cannot be undone."
      )
    ) {
      clearLeaderboard();
    }
  };

  return (
    <div className="quiz-container">
      <div className="card">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-lg text-gray-600">
            Top performers in the Quiz Game Challenge
          </p>
        </div>

        {/* Statistics */}
        {leaderboard.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">
                {leaderboard[0]?.percentage}%
              </div>
              <div className="text-sm">Best Score</div>
              <div className="text-xs opacity-75">
                {leaderboard[0]?.playerName}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">{leaderboard.length}</div>
              <div className="text-sm">Total Players</div>
            </div>

            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">
                {Math.round(
                  leaderboard.reduce(
                    (acc, entry) => acc + entry.percentage,
                    0
                  ) / leaderboard.length
                ) || 0}
                %
              </div>
              <div className="text-sm">Average Score</div>
            </div>
          </div>
        )}

        {/* Leaderboard List */}
        {leaderboard.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No scores yet!
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to complete a quiz and claim the top spot.
            </p>
            <button className="btn btn-primary btn-lg" onClick={onBackToMenu}>
              🚀 Start First Quiz
            </button>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                <div className="col-span-1 text-center">Rank</div>
                <div className="col-span-3">Player</div>
                <div className="col-span-2 text-center">Score</div>
                <div className="col-span-2 text-center">Percentage</div>
                <div className="col-span-2 text-center">Time</div>
                <div className="col-span-2 text-center">Date</div>
              </div>
            </div>

            {/* Leaderboard Entries */}
            <div className="space-y-2 mb-8">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`leaderboard-entry ${
                    entry.id === highlightEntryId ? "highlight" : ""
                  }`}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Rank */}
                    <div className="col-span-1 text-center">
                      <span className={getRankClass(index + 1)}>
                        {getRankEmoji(index + 1)}
                      </span>
                    </div>

                    {/* Player Name */}
                    <div className="col-span-3">
                      <div className="font-semibold text-gray-800">
                        {entry.playerName}
                      </div>
                    </div>

                    {/* Score */}
                    <div className="col-span-2 text-center">
                      <div className="font-bold text-primary">
                        {entry.score}/{entry.totalQuestions}
                      </div>
                    </div>

                    {/* Percentage */}
                    <div className="col-span-2 text-center">
                      <div
                        className={`font-bold ${
                          entry.percentage >= 90
                            ? "text-yellow-600"
                            : entry.percentage >= 80
                            ? "text-green-600"
                            : entry.percentage >= 70
                            ? "text-blue-600"
                            : entry.percentage >= 60
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      >
                        {entry.percentage}%
                      </div>
                    </div>

                    {/* Time */}
                    <div className="col-span-2 text-center">
                      <div className="text-gray-600">
                        {formatTime(entry.timeTaken)}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 text-center">
                      <div className="text-sm text-gray-500">
                        {formatDate(entry.date)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4 mb-8">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`leaderboard-entry ${
                    entry.id === highlightEntryId ? "highlight" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className={getRankClass(index + 1)}>
                        {getRankEmoji(index + 1)}
                      </span>
                      <div>
                        <div className="font-semibold text-gray-800">
                          {entry.playerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(entry.date)}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        entry.percentage >= 90
                          ? "text-yellow-600"
                          : entry.percentage >= 80
                          ? "text-green-600"
                          : entry.percentage >= 70
                          ? "text-blue-600"
                          : entry.percentage >= 60
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {entry.percentage}%
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      {entry.score}/{entry.totalQuestions} correct
                    </span>
                    <span>{formatTime(entry.timeTaken)}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary btn-lg" onClick={onBackToMenu}>
            🏠 Back to Menu
          </button>
          {leaderboard.length > 0 && (
            <button
              className="btn btn-danger btn-lg"
              onClick={handleClearLeaderboard}
            >
              🗑️ Clear Leaderboard
            </button>
          )}
        </div>

        {/* Help Text */}
        {leaderboard.length > 0 && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-sm text-gray-600">
              Rankings are based on percentage score, with time taken as a
              tiebreaker.
              <br />
              Faster completion times rank higher when scores are equal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
