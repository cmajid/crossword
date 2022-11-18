import React from "react";

function QuestionList({ questions, onSelectQuestion }) {
  return (
    <>
      <ul>
        {questions.result.map((item) => (
          <li key={item.clue} onClick={() => onSelectQuestion(item)}>
            {item.position}: (Vertical:{item.starty} Horizental:{item.startx}){" "}
            {item.clue}
          </li>
        ))}
      </ul>
    </>
  );
}

export default QuestionList;
