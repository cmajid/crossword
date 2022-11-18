import CellIndicator from "./components/CellIndicator";

function Indicator({ children, row, column }) {
  const rows = [];
  for (let i = 0; i < column + 1; i++) {
    rows.push(<CellIndicator key={"indicator-row" + i}>{i}</CellIndicator>);
  }

  const columns = [];
  for (let i = 1; i < row + 1; i++) {
    columns.push(
      <CellIndicator key={"indicator-column" + i}>{i}</CellIndicator>
    );
  }

  return (
    <div>
      <div> {rows}</div>
      <div className="indicator-column"> {columns}</div>
      {children}
    </div>
  );
}
export default Indicator;
