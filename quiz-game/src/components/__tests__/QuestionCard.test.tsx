import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QuestionCard } from "../QuestionCard";
import type { QuizQuestion } from "../../types/quiz";

const mockQuestion: QuizQuestion = {
  id: 1,
  question: "What does HTML stand for?",
  options: [
    "HyperText Markup Language",
    "High Tech Modern Language",
    "Home Tool Markup Language",
    "Hyperlink and Text Markup Language",
  ],
  correctAnswer: 0,
  category: "Web Development",
  difficulty: "easy",
  timeLimit: 30,
};

const defaultProps = {
  question: mockQuestion,
  questionNumber: 1,
  totalQuestions: 10,
  selectedAnswer: null,
  showFeedback: false,
  onAnswerSelect: vi.fn(),
  timeLeft: 30,
  progress: 10,
};

describe("QuestionCard", () => {
  it("renders question text correctly", () => {
    render(<QuestionCard {...defaultProps} />);

    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
  });

  it("renders all answer options", () => {
    render(<QuestionCard {...defaultProps} />);

    mockQuestion.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("displays question number and total", () => {
    render(<QuestionCard {...defaultProps} />);

    expect(screen.getByText("Question 1 of 10")).toBeInTheDocument();
  });

  it("displays category and difficulty", () => {
    render(<QuestionCard {...defaultProps} />);

    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Easy")).toBeInTheDocument();
  });

  it("displays timer correctly", () => {
    render(<QuestionCard {...defaultProps} />);

    const timer = document.querySelector(".timer");
    expect(timer).toBeInTheDocument();
    expect(timer?.textContent).toContain("0:30");
  });

  it("applies warning class when time is low", () => {
    render(<QuestionCard {...defaultProps} timeLeft={8} />);

    const timer = document.querySelector(".timer");
    expect(timer).toHaveClass("timer", "warning");
    expect(timer?.textContent).toContain("0:08");
  });

  it("applies danger class when time is very low", () => {
    render(<QuestionCard {...defaultProps} timeLeft={3} />);

    const timer = document.querySelector(".timer");
    expect(timer).toHaveClass("timer", "danger");
    expect(timer?.textContent).toContain("0:03");
  });

  it("calls onAnswerSelect when option is clicked", () => {
    const mockOnAnswerSelect = vi.fn();
    render(
      <QuestionCard {...defaultProps} onAnswerSelect={mockOnAnswerSelect} />
    );

    const firstOption = screen.getByText(mockQuestion.options[0]);
    fireEvent.click(firstOption);

    expect(mockOnAnswerSelect).toHaveBeenCalledWith(0);
  });

  it("highlights selected answer", () => {
    render(<QuestionCard {...defaultProps} selectedAnswer={0} />);

    const firstOption = screen
      .getByText(mockQuestion.options[0])
      .closest("button");
    expect(firstOption).toHaveClass("option-button", "selected");
  });

  it("shows correct feedback when answer is correct", () => {
    render(
      <QuestionCard {...defaultProps} selectedAnswer={0} showFeedback={true} />
    );

    expect(screen.getByText("Correct!")).toBeInTheDocument();
    expect(
      screen.getByText("Well done! You selected the right answer.")
    ).toBeInTheDocument();
  });

  it("shows incorrect feedback when answer is wrong", () => {
    render(
      <QuestionCard {...defaultProps} selectedAnswer={1} showFeedback={true} />
    );

    expect(screen.getByText("Incorrect")).toBeInTheDocument();
    expect(screen.getByText(/The correct answer is:/)).toBeInTheDocument();
  });

  it("shows timeout feedback when time runs out", () => {
    render(
      <QuestionCard {...defaultProps} selectedAnswer={-1} showFeedback={true} />
    );

    expect(screen.getByText("Time's up!")).toBeInTheDocument();
  });

  it("disables option buttons when showing feedback", () => {
    render(<QuestionCard {...defaultProps} showFeedback={true} />);

    const buttons = screen.getAllByRole("button");
    const optionButtons = buttons.filter((btn) =>
      btn.classList.contains("option-button")
    );

    optionButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("applies correct styling to correct answer in feedback", () => {
    render(
      <QuestionCard {...defaultProps} selectedAnswer={1} showFeedback={true} />
    );

    const correctOption = screen
      .getByText(mockQuestion.options[0])
      .closest("button");
    expect(correctOption).toHaveClass("option-button", "correct");
  });

  it("applies incorrect styling to wrong answer in feedback", () => {
    render(
      <QuestionCard {...defaultProps} selectedAnswer={1} showFeedback={true} />
    );

    const wrongOption = screen
      .getByText(mockQuestion.options[1])
      .closest("button");
    expect(wrongOption).toHaveClass("option-button", "incorrect");
  });

  it("renders progress bar with correct width", () => {
    render(<QuestionCard {...defaultProps} progress={25} />);

    const progressFill = document.querySelector(".progress-bar-fill");
    expect(progressFill).toHaveStyle({ width: "25%" });
  });
});
