import { useState } from "react";
import styles from "./contato.module.css";
import { Link } from "react-router-dom";

export default function Contato() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <header className= "header">
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

         <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/">Início</Link>
          <Link to="/adocao">Adoção</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        <h1>PetWave</h1>

        <Link to="/publicacao" className="btn-primary">
          Adote já
        </Link>
      </header>

      <div className={styles.container}>
        <p>Se você encontrou algum problema ao utilizar a PetWave, percebeu algo que pode ser melhorado ou deseja enviar uma sugestão ao desenvolvedor, ficaremos muito felizes em ouvir você.

        A sua opinião é extremamente importante para que possamos aprimorar continuamente a plataforma e oferecer uma experiência cada vez melhor para quem deseja ajudar os animais. Relatos de erros, ideias de novas funcionalidades ou qualquer outro feedback contribuem diretamente para o crescimento e evolução do projeto.

        Para entrar em contato, envie um e-mail detalhando sua mensagem para:</p>
      
        <strong>
          <a href="mailto:PetWare@gmail.com?subject=Contato%20PetWave">PetWare@gmail.com</a>
        </strong>

         <p>
          Sua mensagem será analisada com atenção e respondida o mais breve
          possível. Obrigado por ajudar a PetWave a crescer e a transformar
          vidas.
        </p>

      </div>

        <footer className="footer">
            <div className="footer-container">
              <p>Criado por Yasmin Gomes Fabiano © 2025</p>

              <a
                href="https://wa.me/5524999846875?text=Olá! Vim pelo site da PetWave!"
                target="_blank"
                rel="noopener noreferrer"
                className="wh-fab"
              >
                WhatsApp
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="in-fab"
              >
                Instagram
              </a>
        </div>
      </footer>
    </div>
  );
}
