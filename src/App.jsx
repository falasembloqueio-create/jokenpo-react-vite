import { useState } from "react";
import "./App.css";

export default function App() {
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);
  const [resultado, setResultado] = useState("Escolha sua arma!");
  const [jogando, setJogando] = useState(false); // Estado para o suspense
  const [placar, setPlacar] = useState({ player: 0, computer: 0 });

  const opcoes = [
    { nome: "Pedra", emoji: "✊" },
    { nome: "Papel", emoji: "✋" },
    { nome: "Tesoura", emoji: "✌️" },
  ];

  const jogar = (escolhaDoPlayer) => {
    if (jogando) return; // Impede clicar várias vezes durante o suspense

    setJogando(true);
    setResultado("O computador está pensando...");
    setPlayer(null);
    setComputer(null);

    // Efeito de suspense: o PC demora 1 segundo para decidir
    setTimeout(() => {
      const escolhaDoPC = opcoes[Math.floor(Math.random() * 3)];
      setPlayer(escolhaDoPlayer);
      setComputer(escolhaDoPC);

      // Lógica de Elite (Mapeamento)
      const regras = {
        Pedra: "Tesoura",
        Papel: "Pedra",
        Tesoura: "Papel",
      };

      if (escolhaDoPlayer.nome === escolhaDoPC.nome) {
        setResultado("Empate! 🤝");
      } else if (regras[escolhaDoPlayer.nome] === escolhaDoPC.nome) {
        setResultado("Você Ganhou! 🎉");
        setPlacar((p) => ({ ...p, player: p.player + 1 }));
      } else {
        setResultado("Você Perdeu! 💀");
        setPlacar((p) => ({ ...p, computer: p.computer + 1 }));
      }
      setJogando(false);
    }, 800);
  };

  return (
    <div className="container">
      <h1 className="titulo">Jokenpô 90D</h1>
      
      <div className="placar-topo">
        <span>VOCÊ: {placar.player}</span>
        <span>VS</span>
        <span>PC: {placar.computer}</span>
      </div>

      <h2 className="status-msg">{resultado}</h2>

      <div className="botoes-area">
        {opcoes.map((item) => (
          <button 
            key={item.nome} 
            className={`botao-jogar ${jogando ? "desativado" : ""}`}
            onClick={() => jogar(item)}
            disabled={jogando}
          >
            {item.emoji}
          </button>
        ))}
      </div>

      {player && computer && (
        <div className="arena">
          <div className="escolha-display">
             <span>{player.emoji}</span>
             <p>Sua Escolha</p>
          </div>
          <div className="vs-badge">VS</div>
          <div className="escolha-display">
             <span>{computer.emoji}</span>
             <p>PC</p>
          </div>
        </div>
    )}
    </div>
  );
}