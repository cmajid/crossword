import { useState, useEffect } from "react";
import Cell from "./cell/Cell";
import QuestionBox from "./question/QuestionBox";
import QuestionList from "./question/QuestionList";
import { useTheme, useThemeUpdate } from "../ThemeContext";

import generateLayout from "../services/cw-generator";
import CellEmpty from "./cell/CellEmpty";
import CellRow from "./cell/CellRow";
import Indicator from "./indicator/Indicator";

export default function Game() {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const [data, setData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [showAnswer, setShowAnswer] = useState(false);

  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        if (myJson) {
          let qs = generateLayout(myJson);
          setData(qs);
        }
      });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      setCurrentQuestion(data.result[0]);
    }
  }, [data]);

  const handleSelectQuestion = (question) => {
    setCurrentQuestion(question);
  };

  const handleShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const cellClickHandle = (x, y) => {
    data.result.forEach((element) => {
      element.positions.forEach((pos) => {
        if (x === pos.x && y === pos.y) {
          setCurrentQuestion(element);
        }
      });
    });
  };

  function rendredCells(result) {
    if (!currentQuestion) return;

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

  return (
    <>
      <div className={darkTheme ? "app-dark" : ""}>
        <button onClick={handleShowAnswer}>Show Answers</button>
        <button onClick={toggleTheme}>Dark Mode</button>
        <hr />
        {data && data.result.length ? (
          <div>
            <QuestionList
              questions={data}
              onSelectQuestion={handleSelectQuestion}
            />

            {currentQuestion ? (
              <QuestionBox>{currentQuestion.clue} </QuestionBox>
            ) : (
              <div></div>
            )}

            <Indicator row={data.rows} column={data.cols}>
              <div className="cell-wrapper">{rendredCells(data)}</div>
            </Indicator>
          </div>
        ) : (
          <b>Loading...</b>
        )}
      </div>
    </>
  );
}
