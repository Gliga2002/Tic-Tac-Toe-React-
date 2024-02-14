import './Player.css';
import { useState } from 'react';

export default function Player({
  defaultPlayerName,
  isActive,
  symbol,
  onChangePlayerName,
}) {
  const [playerName, setPlayerName] = useState(defaultPlayerName);
  const [isEditing, setIsEditing] = useState(false);
  function handleChangeInput(event) {
    setPlayerName(event.target.value);
  }

  function handleClickButton() {
    setIsEditing((prevState) => !prevState);

    if (isEditing) {
      onChangePlayerName(symbol, playerName);
    }
  }
  return (
    <li className={isActive ? 'player active' : 'player'}>
      <span>
        {isEditing && <input value={playerName} onChange={handleChangeInput} />}
        {!isEditing && <span className="player-name">{playerName}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClickButton}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
