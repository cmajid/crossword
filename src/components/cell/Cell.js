import { useEffect, useState, useRef } from "react";

export default function Cell({
  guess,
  answer,
  showAnswer,
  ridge,
  orientation,
  onClickSumbit,
  x,
  y,
}) {
  const [char, setChar] = useState(guess);
  const [correctCell, setCorrectCell] = useState(false);

  useEffect(() => {
    if (showAnswer) {
      setChar(answer);
    } else {
      setChar(cellRef.current.getAttribute("quess"));
    }
  }, [showAnswer, answer]);

  useEffect(() => {
    if (char === answer) {
      setCorrectCell(true);
      return;
    }
    setCorrectCell(false);
  }, [answer, char]);

  const onKeyPressed = (e) => {
    if (e.keyCode === 27 || e.keyCode === 8) {
      setChar("");
      return;
    }
    if (e.keyCode < 65 || e.keyCode > 90) return;

    const keyPressed = e.nativeEvent.key.toUpperCase();
    setChar(keyPressed);
    cellRef.current.setAttribute("quess", keyPressed);
  };

  let className = "cell pointer ";
  className += correctCell ? " correct " : "";
  if (ridge) {
    className += orientation === "down" ? " ridge orientation-down " : "";
    className += orientation === "across" ? " ridge orientation-across " : "";
  }

  const cellRef = useRef();
  return (
    <div
      ref={cellRef}
      className={className}
      onKeyDown={onKeyPressed}
      tabIndex="0"
      onClick={() => onClickSumbit(x, y)}
    >
      {char}
    </div>
  );
}
