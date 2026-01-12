import { useState } from "react";
import styles from "./adocao.module.css";
import { Link } from "react-router-dom";

export default function Saibamais() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.app}>
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

      <div className={styles.container}>
        <p>
          A PetWave nasceu do amor pelos animais e da necessidade urgente de criar uma ponte entre eles e pessoas dispostas a oferecer cuidado, respeito e um lar cheio de afeto. Todos os dias, milhares de cães e gatos são abandonados ou vivem em situações de vulnerabilidade, seja nas ruas, em abrigos superlotados ou em lares temporários que, apesar de muito amorosos, não conseguem atender a todos. Diante dessa realidade, surgiu o desejo de criar um espaço digital que pudesse gerar impacto real e positivo na vida desses animais. <br />

          O site foi criado com o propósito de facilitar a adoção responsável, conscientizar a sociedade sobre a importância do cuidado com os animais e dar visibilidade a histórias que muitas vezes passam despercebidas. A PetWave acredita que cada animal tem uma história única e merece a chance de viver com dignidade, segurança e amor. Nosso objetivo não é apenas encontrar lares, mas promover conexões verdadeiras entre pessoas e pets, baseadas em responsabilidade e compromisso. <br />

          A adoção é um ato de amor que transforma vidas, tanto a do animal quanto a de quem adota. Ao escolher adotar, você oferece uma segunda chance a um pet que, muitas vezes, já passou por abandono, maus-tratos ou negligência. Além disso, a adoção ajuda a reduzir o número de animais nas ruas e em abrigos, contribuindo diretamente para o bem-estar coletivo e para o controle populacional de forma ética. <br />

          Na PetWave, buscamos informar e orientar os adotantes durante todo o processo. Acreditamos que adotar vai muito além de levar um animal para casa: envolve preparo, paciência, cuidado veterinário, tempo, atenção e, principalmente, amor. Por isso, incentivamos a adoção consciente, garantindo que cada decisão seja feita com responsabilidade e respeito à vida animal. <br />

          Existem várias formas de ajudar os animais, mesmo para quem não pode adotar no momento. Compartilhar anúncios de adoção, apoiar ONGs e protetores independentes, denunciar maus-tratos, contribuir com doações ou oferecer lar temporário são atitudes que fazem toda a diferença. Pequenas ações, quando somadas, geram uma grande onda de mudança, e é exatamente isso que a PetWave representa: uma onda de empatia, solidariedade e transformação. <br />

          Acreditamos que um mundo melhor começa com escolhas mais humanas. Ao adotar um animal, você não apenas salva uma vida, mas também ganha um companheiro fiel, capaz de oferecer amor incondicional e alegria diária. A PetWave existe para tornar esse encontro possível e para lembrar que todo animal merece ser visto, cuidado e amado.

          Junte-se a nós nessa missão. Seja adotando, apoiando ou compartilhando, você também faz parte dessa mudança. <br />
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
