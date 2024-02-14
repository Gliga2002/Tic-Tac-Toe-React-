import './GameOver.css';

export default function GameOver({ winner, onRestart }) {
  return (
    <div className="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} is won!</p>}
      {!winner && <p>It's draw</p>}
      <button onClick={onRestart}>Rematch!</button>
    </div>
  );
}
