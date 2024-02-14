import './GameBoard.css';

export default function GameBoard({ turns, onSelect }) {
  return (
    <ul className="game-board">
      {turns.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ul>
              {row.map((playerSymbol, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      disabled={playerSymbol}
                      onClick={() => onSelect(rowIndex, colIndex)}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
