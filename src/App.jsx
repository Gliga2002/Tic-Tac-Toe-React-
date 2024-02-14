import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard';
import GameOver from './components/GameOver/GameOver';
import { useState } from 'react';
import Log from './components/Log/Log';
import { WINNING_COMBINATIONS } from './winning-combinattion';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];

  // if turns is empty array this for loop simply wont execute, thats how JS works
  for (const turn of gameTurns) {
    const {
      square: { row, col },
      activePlayer: activePlayerSymbol,
    } = turn;

    gameBoard[row][col] = activePlayerSymbol;
  }

  return gameBoard;
}

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  // Always latest turn
  if (gameTurns.length > 0 && gameTurns[0].activePlayer === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = firstSymbol;
    }
  }

  return winner;
}

function App() {
  const [player, setPlayer] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = player[deriveWinner(gameBoard)];

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const activePlayer = derivedActivePlayer(prevGameTurns);
      return [
        {
          square: { row: rowIndex, col: colIndex },
          activePlayer: activePlayer,
        },
        ...prevGameTurns,
      ];
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handleChangePlayerName(symbol, newName) {
    setPlayer((prevState) => {
      return {
        ...prevState,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div className="game-container">
        <ul className="players">
          <Player
            defaultPlayerName={PLAYERS.X}
            isActive={activePlayer === 'X'}
            symbol="X"
            onChangePlayerName={handleChangePlayerName}
          />
          <Player
            defaultPlayerName={PLAYERS.O}
            isActive={activePlayer === 'O'}
            symbol="O"
            onChangePlayerName={handleChangePlayerName}
          />
        </ul>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard turns={gameBoard} onSelect={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
