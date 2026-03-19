import { useState, useEffect } from "react";
import confetti from "canvas-confetti"; 
import "./App.css";
import Placar from "./components/Placar";
import Arena from "./components/Arena";

export default function App() {
  const [player, setPlayer] = useState(null);
  const [computer, setComputer] = useState(null);
  const [resultado, setResultado] = useState("Escolha sua arma!");
  const [jogando, setJogando] = useState(false);
  
  // Inicia o placar lendo do LocalStorage
  const [placar, setPlacar] = useState(() => {
    const salvo = localStorage.getItem("placar-jokenpo");
    return salvo ? JSON.parse(salvo) : { player: 0, computer: 0 };
  });

  // Salva o placar sempre que ele mudar
  useEffect(() => {
    localStorage.setItem("placar-jokenpo", JSON.stringify(placar));
  }, [placar]);

  const opcoes = [
    { nome: "Pedra", emoji: "✊" },
    { nome: "Papel", emoji: "✋" },
    { nome: "Tesoura", emoji: "✌️" },
  ];

  const jogar = (escolhaDoPlayer) => {
    if (jogando) return;
    setJogando(true);
    setResultado("O computador está pensando...");
    setPlayer(null);
    setComputer(null);
 
    setTimeout(() => {
      const escolhaDoPC = opcoes[Math.floor(Math.random() * 3)];
      setPlayer(escolhaDoPlayer);
      setComputer(escolhaDoPC);

      const regras = { Pedra: "Tesoura", Papel: "Pedra", Tesoura: "Papel" };

      if (escolhaDoPlayer.nome === escolhaDoPC.nome) {
        setResultado("Empate! 🤝");
      } else if (regras[escolhaDoPlayer.nome] === escolhaDoPC.nome) {
        setResultado("Você Ganhou! 🎉");
        setPlacar((p) => ({ ...p, player: p.player + 1 }));
        
        // DISPARA OS CONFETES NA VITÓRIA
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00d1ff', '#ffffff', '#00ff88']
        });

      } else {
        setResultado("Você Perdeu! 💀");
        setPlacar((p) => ({ ...p, computer: p.computer + 1 }));
      }
      setJogando(false);
    }, 800);
  };

  const resetarPlacar = () => {
    setPlacar({ player: 0, computer: 0 });
  };

  return (
    <div className="container">
      <h1 className="titulo">Jokenpô 90D</h1>
      
      <Placar pontosPlayer={placar.player} pontosComputer={placar.computer} />

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

      <Arena player={player} computer={computer} />

      <button className="btn-reset" onClick={resetarPlacar}>Resetar Placar</button>
    </div>
  );
}