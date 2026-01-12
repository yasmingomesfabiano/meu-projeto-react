import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Publicacao from "./publicacao";
import Adocao from "./adocao";
import Contato from "./contato";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publicacao" element={<Publicacao />} />
        <Route path="/adocao" element={<Adocao />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
    </BrowserRouter>
  );
}
