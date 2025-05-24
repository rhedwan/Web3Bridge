import React, { useState } from "react";
import type { QuizSettings } from "../types/quiz";
import { getAllCategories } from "../data/questions";

interface GameStartProps {
  onStartGame: (settings: QuizSettings, playerName: string) => void;
  onShowLeaderboard: () => void;
}

export const GameStart: React.FC<GameStartProps> = ({
  onStartGame,
  onShowLeaderboard,
}) => {
  const [playerName, setPlayerName] = useState("");
  const [settings, setSettings] = useState<QuizSettings>({
    timePerQuestion: 30,
    category: undefined,
    difficulty: undefined,
  });

  const categories = getAllCategories();

  const handleStartGame = () => {
    if (playerName.trim()) {
      onStartGame(settings, playerName.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && playerName.trim()) {
      handleStartGame();
    }
  };

  return (
    <div className="quiz-container">
      <div className="card text-center">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🧠 Quiz Game Challenge
          </h1>
          <p className="text-lg text-gray-600">
            Test your knowledge across various topics and climb the leaderboard!
          </p>
        </div>

        {/* Player Name Input */}
        <div className="mb-6">
          <label
            htmlFor="playerName"
            className="block text-left font-semibold mb-2 text-gray-700"
          >
            Enter Your Name
          </label>
          <input
            id="playerName"
            type="text"
            className="input"
            placeholder="Your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={20}
          />
        </div>

        {/* Game Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Time Per Question */}
          <div>
            <label className="block text-left font-semibold mb-2 text-gray-700">
              Time per Question
            </label>
            <select
              className="select"
              value={settings.timePerQuestion}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  timePerQuestion: Number(e.target.value),
                }))
              }
            >
              <option value={15}>15 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={45}>45 seconds</option>
              <option value={60}>60 seconds</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-left font-semibold mb-2 text-gray-700">
              Category
            </label>
            <select
              className="select"
              value={settings.category || ""}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  category: e.target.value || undefined,
                }))
              }
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-left font-semibold mb-2 text-gray-700">
              Difficulty
            </label>
            <select
              className="select"
              value={settings.difficulty || ""}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  difficulty: e.target.value as
                    | "easy"
                    | "medium"
                    | "hard"
                    | undefined,
                }))
              }
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Game Info */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <h3 className="font-semibold mb-2 text-gray-800">Game Rules:</h3>
          <ul className="text-sm text-gray-600 text-left space-y-1">
            <li>• Answer questions within the time limit</li>
            <li>• Each correct answer earns you 1 point</li>
            <li>• Questions get progressively challenging</li>
            <li>• Your score will be saved to the leaderboard</li>
            <li>• Try to achieve the highest percentage!</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleStartGame}
            disabled={!playerName.trim()}
          >
            🚀 Start Quiz
          </button>
          <button
            className="btn btn-outline btn-lg"
            onClick={onShowLeaderboard}
          >
            🏆 View Leaderboard
          </button>
        </div>

        {!playerName.trim() && (
          <p className="text-sm text-gray-500 mt-4">
            Please enter your name to start the quiz
          </p>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl mb-2">⏱️</div>
            <h4 className="font-semibold text-gray-800">Timed Questions</h4>
            <p className="text-sm text-gray-600">Race against the clock</p>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-semibold text-gray-800">Live Feedback</h4>
            <p className="text-sm text-gray-600">Instant answer validation</p>
          </div>
          <div className="p-4">
            <div className="text-2xl mb-2">🏆</div>
            <h4 className="font-semibold text-gray-800">Leaderboard</h4>
            <p className="text-sm text-gray-600">Compete with others</p>
          </div>
        </div>
      </div>
    </div>
  );
};
