import "./home.css";
import { useState, useEffect } from "react";
import img1 from "./assets/cachorro_gato.png";
import img2 from "./assets/cachorro.png";
import img3 from "./assets/gato.png";
import card1 from "./assets/pet-ideal.png";
import card2 from "./assets/patas.png";
import card3 from "./assets/pessoa-pet.png";
import card4 from "./assets/pet-brincar.png";
import { Link } from "react-router-dom";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const imagens = [img1, img2, img3];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
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

        {/* Botão que navega para /publicacao */}
        <Link to="/publicacao" className="btn-primary">
          Adote já
        </Link>
      </header>

      {/* SLIDER */}
      <section className="slider">
        <img src={imagens[index]} alt="PetWave" />
        <div className="dots">
          {imagens.map((_, i) => (
            <span key={i} className={`dot ${i === index ? "active" : ""}`}></span>
          ))}
        </div>
      </section>

      {/* DESCRIÇÃO */}
      <section className="descricao">
        <h2>Adoção PetWave — Encontrando o par perfeito</h2>
        <div className="box-descricao">
          <p>
            A PetWave acredita que todo animal merece um lar cheio de amor. Por isso, nossa plataforma conecta pessoas dispostas a adotar com pets que aguardam uma segunda chance. Muitos deles vêm de situações de abandono e precisam apenas de cuidado, carinho e responsabilidade para recomeçar.
            Ao adotar, você transforma a vida de um animal e ganha um companheiro fiel. A PetWave existe para tornar esse encontro possível e incentivar a adoção consciente.
          </p>
        </div>
      </section>

      {/* PASSO A PASSO */}
      <h2>Como vai ser o processo?</h2>
      <section className="passo-passo">

        <div className="cards">
          <h3>Encontre o Pet Ideal</h3>
          <img src={card1} alt="pet ideal" />
          <p>
            Conheça os animais disponíveis para adoção, veja fotos, perfis e descubra
            qual pet mais combina com você e com sua rotina.
          </p>
        </div>

        <div className="cards">
          <h3>Conheça a História</h3>
          <img src={card2} alt="história" />
          <p>
            Acesse informações completas sobre o pet, incluindo sua história,
            personalidade, necessidades especiais e cuidados recomendados.
          </p>
        </div>

        <div className="cards">
          <h3>Solicite a Adoção</h3>
          <img src={card3} alt="adoção" />
          <p>
            Preencha um formulário rápido com seus dados e demonstre seu interesse
            em oferecer um lar seguro e responsável.
          </p>
        </div>

        <div className="cards">
          <h3>Leve Amor Para Casa</h3>
          <img src={card4} alt="amor" />
          <p>
            Finalize o processo e receba seu novo amigo, pronto para compartilhar
            momentos de carinho, companheirismo e amor.
          </p>
</div>


      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
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
