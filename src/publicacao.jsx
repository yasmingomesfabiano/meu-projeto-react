import { useState, useEffect } from "react";
import styles from "./publicacao.module.css";
import { supabase } from "./supabase";


export default function Publicacao() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [petMenuOpen, setPetMenuOpen] = useState(null);

  const [imagem, setImagem] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [especie, setEspecie] = useState("");
  const [sexo, setSexo] = useState("");

  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("");

  /* === CONFIRMAÇÃO DELETE === */
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [petParaExcluir, setPetParaExcluir] = useState(null);

  /* ================= FILTROS ================= */
  const petsFiltrados = pets.filter((pet) => {
    const busca =
      (pet.descricao || "").toLowerCase().includes(search.toLowerCase()) ||
      (pet.localizacao || "").toLowerCase().includes(search.toLowerCase());

    const especieOk = filtroEspecie === "" || pet.especie === filtroEspecie;

    return busca && especieOk;
  });

  /* ================= FETCH ================= */
  async function fetchPets() {
    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setPets(data || []);
  }

  useEffect(() => {
    fetchPets();
  }, []);

  /* ================= CREATE ================= */
  async function handleSubmit(e) {
    e.preventDefault();

    if (!imagem || !descricao || !localizacao || !telefone || !especie || !sexo) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const fileExt = imagem.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      await supabase.storage.from("pets").upload(fileName, imagem);
      const { data } = supabase.storage.from("pets").getPublicUrl(fileName);

      await supabase.from("pets").insert([
        {
          imagem: data.publicUrl,
          descricao,
          localizacao,
          telefone,
          especie,
          sexo,
        },
      ]);

      setModalOpen(false);
      setImagem(null);
      setDescricao("");
      setLocalizacao("");
      setTelefone("");
      setEspecie("");
      setSexo("");

      fetchPets();
    } catch (err) {
      console.error(err);
      alert("Erro ao publicar");
    }
  }

  /* ================= EDIT ================= */
  async function handleEditSubmit(e) {
    e.preventDefault();

    try {
      let imageUrl = editingPet.imagem;

      if (imagem) {
        const fileExt = imagem.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        await supabase.storage.from("pets").upload(fileName, imagem);
        const { data } = supabase.storage.from("pets").getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      await supabase
        .from("pets")
        .update({
          imagem: imageUrl,
          descricao,
          localizacao,
          telefone,
          especie,
          sexo,
        })
        .eq("id", editingPet.id);

      setEditModalOpen(false);
      setImagem(null);
      setDescricao("");
      setLocalizacao("");
      setTelefone("");
      setEspecie("");
      setSexo("");
      setEditingPet(null);

      fetchPets();
    } catch (err) {
      console.error(err);
      alert("Erro ao editar");
    }
  }

  /* ================= DELETE ================= */
  async function handleDelete(id) {
    const { error } = await supabase.from("pets").delete().eq("id", id);

    if (!error) {
      fetchPets();
      setPetMenuOpen(null);
    }
  }

  function openEdit(pet) {
    setEditingPet(pet);
    setDescricao(pet.descricao || "");
    setLocalizacao(pet.localizacao || "");
    setTelefone(pet.telefone || "");
    setEspecie(pet.especie || "");
    setSexo(pet.sexo || "");
    setImagem(null);
    setEditModalOpen(true);
    setPetMenuOpen(null);
  }

  function gerarLinkWhatsApp(telefone) {
    const numero = telefone.replace(/\D/g, "");
    return `https://wa.me/55${numero}?text=Olá! Tenho interesse no pet.`;
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>

        <nav className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
          <a href="/">Início</a>
          <a href="/adocao">Saiba Mais</a>
          <a href="/contato">Contato</a>
        </nav>

        <h1 className={styles.title}>PetWave</h1>
      </header>

      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          placeholder="Pesquisar por descrição ou localização..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        className={styles.selecao}
        value={filtroEspecie}
        onChange={(e) => setFiltroEspecie(e.target.value)}
      >
        <option value="">Todas as espécies</option>
        <option value="Cachorro">Cachorro</option>
        <option value="Gato">Gato</option>
        <option value="Gado">Gado</option>
        <option value="Equinos">Equinos</option>
        <option value="Repteis">Répteis</option>
        <option value="Roedores">Roedores</option>
        <option value="Outro">Outros</option>
      </select>

      <div className={styles.container}>
        <button className={styles.btnPublicar} onClick={() => setModalOpen(true)}>
          Faça uma publicação
        </button>
      </div>

      <div className={styles.cardsContainer}>
        {petsFiltrados.map((pet) => (
          <div key={pet.id} className={styles.cardPet}>
            <img src={pet.imagem} alt="Pet" />
            <p>{pet.descricao}</p>
            <p><strong>{pet.especie}</strong> • {pet.sexo}</p>
            <p>{pet.localizacao}</p>

            <a
              href={gerarLinkWhatsApp(pet.telefone)}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnWhatsapp}
            >
              Falar no WhatsApp
            </a>

            <div
              className={styles.hamburgerPet}
              onClick={() =>
                setPetMenuOpen(petMenuOpen === pet.id ? null : pet.id)
              }
            >
              <span /><span /><span />
            </div>

            {petMenuOpen === pet.id && (
              <div className={styles.petMenu}>
                <button onClick={() => openEdit(pet)}>Editar</button>
                <button
                  onClick={() => {
                    setPetParaExcluir(pet.id);
                    setConfirmOpen(true);
                  }}
                >
                  Deletar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL DE CRIAÇÃO */}
      {modalOpen && (
        <div className={`${styles.modalOverlay} ${styles.active}`}>
          <div className={styles.modalContent}>
            <h2>Nova Publicação</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagem(e.target.files[0])}
              />
              <input
                type="text"
                placeholder="Descrição do pet"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Localização"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Telefone (ex: 11999999999)"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
              <select
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                required
              >
                <option value="">Selecione a espécie</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Gado">Gado</option>
                <option value="Equinos">Equinos</option>
                <option value="Repteis">Répteis</option>
                <option value="Roedores">Roedores</option>
                <option value="Outro">Outros</option>
              </select>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                required
              >
                <option value="">Selecione o sexo</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
              <div className={styles.modalActions}>
                <button type="submit">Publicar</button>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setImagem(null);
                    setDescricao("");
                    setLocalizacao("");
                    setTelefone("");
                    setEspecie("");
                    setSexo("");
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE EDIÇÃO */}
      {editModalOpen && editingPet && (
        <div className={`${styles.modalOverlay} ${styles.active}`}>
          <div className={styles.modalContent}>
            <h2>Editar Publicação</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagem(e.target.files[0])}
              />
              <p><small>Imagem atual: {editingPet.imagem}</small></p>
              <input
                type="text"
                placeholder="Descrição do pet"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Localização"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
              <select
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                required
              >
                <option value="">Selecione a espécie</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Gado">Gado</option>
                <option value="Equinos">Equinos</option>
                <option value="Repteis">Répteis</option>
                <option value="Roedores">Roedores</option>
                <option value="Outro">Outros</option>
              </select>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                required
              >
                <option value="">Selecione o sexo</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
              <div className={styles.modalActions}>
                <button type="submit">Salvar Alterações</button>
                <button
                  type="button"
                  onClick={() => {
                    setEditModalOpen(false);
                    setImagem(null);
                    setDescricao("");
                    setLocalizacao("");
                    setTelefone("");
                    setEspecie("");
                    setSexo("");
                    setEditingPet(null);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMAÇÃO DELETE */}
      {confirmOpen && (
        <div className={`${styles.confirmOverlay} ${styles.active}`}>
          <div className={styles.confirmBox}>
            <p>Quer deletar essa publicação?</p>

            <div className={styles.confirmActions}>
              <button
                className={styles.confirmYes}
                onClick={() => {
                  handleDelete(petParaExcluir);
                  setConfirmOpen(false);
                }}
              >
                Sim
              </button>

              <button
                className={styles.confirmNo}
                onClick={() => setConfirmOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p>Criado por Yasmin Gomes Fabiano © 2025</p>
      </footer>
    </div>
  );
}
