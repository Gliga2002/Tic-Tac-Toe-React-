import './Log.css';

export default function Log({ turns }) {
  return (
    <ul className="logs">
      {turns.map((turn) => {
        const {
          square: { row, col },
          activePlayer,
        } = turn;
        return (
          <li key={`${row}${col}`}>
            {`[${row} ${col}] is played by ${activePlayer}`}
          </li>
        );
      })}
    </ul>
  );
}
