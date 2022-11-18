import { useState, useCallback } from "react";
import Cell from "./cell/Cell";
import QuestionBox from "./question/QuestionBox";
import QuestionList from "./question/QuestionList";
import { useTheme, useThemeUpdate } from "../ThemeContext";

import generateLayout from "../services/cw-generator";
import CellEmpty from "./cell/CellEmpty";
import CellRow from "./cell/CellRow";
import Indicator from "./indicator/Indicator";

var qs = [
  {
    clue: "that which is established as a rule or model by authority, custom, or general consent",
    answer: "standard",
  },
  { clue: "a machine that computes", answer: "computer" },
  {
    clue: "the collective designation of items for a particular purpose",
    answer: "equipment",
  },
  { clue: "an opening or entrance to an inclosed place", answer: "port" },
  {
    clue: "a point where two things can connect and interact",
    answer: "interface",
  },
];

export default function Game() {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const [currentQuestion, setCurrentQuestion] = useState(qs[0]);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelectQuestion = (question) => {
    setCurrentQuestion(question);
  };

  const handleShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const cellClickHandle = (x, y) => {
    result.result.forEach((element) => {
      element.positions.forEach((pos) => {
        if (x === pos.x && y === pos.y) {
          console.log(element.answer);
          setCurrentQuestion(element);
        }
      });
    });
  };

  function rendredCells(result) {
    const cells = [];
    if (!result) return cells;
    for (let column = 0; column < result.rows; column++) {
      const rows = [];
      for (let row = 0; row < result.cols; row++) {
        const char = result.table[column][row];
        if (char === "-") {
          rows.push(<CellEmpty key={column + row * 10} />);
          continue;
        }

        let ridge = false;
        if (
          currentQuestion.startx === row + 1 &&
          currentQuestion.starty === column + 1
        ) {
          ridge = true;
        }

        rows.push(
          <Cell
            ridge={ridge}
            orientation={currentQuestion.orientation}
            showAnswer={showAnswer}
            key={column + row * 10}
            answer={char.toUpperCase()}
            onClickSumbit={cellClickHandle}
            x={row + 1}
            y={column + 1}
          />
        );
      }
      cells.push(<CellRow key={(column + 1) * -1}>{rows}</CellRow>);
    }
    return cells;
  }

  var result = generateLayout(qs);
  return (
    <>
      <div className={darkTheme ? "app-dark" : ""}>
        <button onClick={handleShowAnswer}>Show Answers</button>
        <button onClick={toggleTheme}>Dark Mode</button>
        <hr />
        <QuestionList
          questions={result}
          onSelectQuestion={handleSelectQuestion}
        />
        <QuestionBox>{currentQuestion.clue}</QuestionBox>
        <Indicator row={result.rows} column={result.cols}>
          <div className="cell-wrapper">{rendredCells(result)}</div>
        </Indicator>
      </div>
    </>
  );
}
