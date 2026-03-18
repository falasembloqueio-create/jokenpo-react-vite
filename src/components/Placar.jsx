export default function Placar({ pontosPlayer, pontosComputer }) {
  return (
    <div className="placar-topo">
      <span>VOCÊ: {pontosPlayer}</span>
      <span>VS</span>
      <span>PC: {pontosComputer}</span>
    </div>
  );
}