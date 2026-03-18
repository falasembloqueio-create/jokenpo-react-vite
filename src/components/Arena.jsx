export default function Arena({ player, computer }) {
  if (!player || !computer) return null;

  return (
    <div className="arena">
      <div className="escolha-display">
        <span>{player.emoji}</span>
        <p>Sua Escolha</p>
      </div>
      <div className="vs-badge">VS</div>
      <div className="escolha-display">
        <span>{computer.emoji}</span>
        <p>Computador</p>
      </div>
    </div>
  );
}