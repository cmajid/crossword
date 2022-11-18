export default function QuestionBox({ children }) {
  return (
    <p>
      <b>Selected Question: </b>
      <span>{children}</span>
    </p>
  );
}
