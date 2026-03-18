import { useState } from "react";
import "./App.css"; // ESSA LINHA É A PONTE ENTRE OS DOIS ARQUIVOS

export default function App() {
  const [player, setPlayer] = useState("");
  const [computer, setComputer] = useState("");
  const [resultado, setResultado] = useState("");
  const [placar, setPlacar] = useState({ player: 0, computer: 0 });

  const jogar = (escolha) => {
    const opcoes = ["Pedra", "Papel", "Tesoura"];
    const escolhaComp = opcoes[Math.floor(Math.random() * 3)];
    setPlayer(escolha);
    setComputer(escolhaComp);

    if (escolha === escolhaComp) setResultado("Empate!");
    else if (
      (escolha === "Pedra" && escolhaComp === "Tesoura") ||
      (escolha === "Papel" && escolhaComp === "Pedra") ||
      (escolha === "Tesoura" && escolhaComp === "Papel")
    ) {
      setResultado("Você ganhou!");
      setPlacar(p => ({ ...p, player: p.player + 1 }));
    } else {
      setResultado("PC ganhou!");
      setPlacar(p => ({ ...p, computer: p.computer + 1 }));
    }
  };

  return (
    <div className="container">
      <h1 className="titulo">Jokenpô 90 Dias</h1>
      
      <div>
        <button className="botao-jogar" onClick={() => jogar("Pedra")}>Pedra</button>
        <button className="botao-jogar" onClick={() => jogar("Papel")}>Papel</button>
        <button className="botao-jogar" onClick={() => jogar("Tesoura")}>Tesoura</button>
      </div>

      {player && (
        <div className="resultado-card">
          <p>Você: {player} | PC: {computer}</p>
          <h2>{resultado}</h2>
        </div>
      )}

      <div className="placar-area">
        <h3>Placar: {placar.player} x {placar.computer}</h3>
      </div>
    </div>
  );
}