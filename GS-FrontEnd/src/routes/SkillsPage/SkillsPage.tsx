import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaLayerGroup, FaSave, FaExclamationCircle } from 'react-icons/fa';
import { API_BASE_URL } from '../../services/api';
import type { UsuarioHabilidade, Habilidade } from '../../types';

export default function SkillsPage() {
  const userId = localStorage.getItem('userId') || '1';

  // Listas de dados
  const [userSkills, setUserSkills] = useState<UsuarioHabilidade[]>([]);
  const [catalogSkills, setCatalogSkills] = useState<Habilidade[]>([]); // Para o dropdown (autocomplete)
  
  // Controle de formulário
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Estado do formulário
  const [formData, setFormData] = useState({
    idHabilidade: 0, // O ID da skill selecionada no dropdown
    nivel: 1,        // 1 a 5
    prioridade: 1    // 1 a 5
  });

  // --- 1. GET (Listar) ---
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Busca as skills do usuário
      const resUserSkills = await fetch(`${API_BASE_URL}/usuario/habilidades`); // Ajuste rota se necessário (ex: /usuarios/{id}/habilidades)
      
      // Busca todas as skills do sistema para o dropdown
      const resCatalog = await fetch(`${API_BASE_URL}/habilidades`);

      if (resUserSkills.ok && resCatalog.ok) {
        const mySkillsData = await resUserSkills.json();
        const catalogData = await resCatalog.json();
        
        setUserSkills(mySkillsData);
        setCatalogSkills(catalogData);
      }
    } catch (error) {
      console.log("API Offline ou rota incorreta. Usando dados locais.");
      // Fallback para não quebrar a tela
      setUserSkills([
        { idRelacao: 1, idUsuario: 1, idHabilidade: 1, nomeHabilidade: "Java", nivel: 3, prioridade: 5, statusRelacao: "Estudando" }
      ]);
      setCatalogSkills([
        { idHabilidade: 1, nomeHabilidade: "Java", descricao: "Backend", categoria: "Tech" },
        { idHabilidade: 2, nomeHabilidade: "React", descricao: "Frontend", categoria: "Tech" },
        { idHabilidade: 3, nomeHabilidade: "Scrum", descricao: "Agile", categoria: "Gestão" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS DO FORMULÁRIO ---
  const openCreateForm = () => {
    setEditingId(null);
    setFormData({ idHabilidade: 0, nivel: 1, prioridade: 1 });
    setIsFormOpen(true);
  };

  const openEditForm = (skill: UsuarioHabilidade) => {
    setEditingId(skill.idRelacao);
    // Ao editar, preenchemos com os dados atuais
    setFormData({
        idHabilidade: skill.idHabilidade,
        nivel: skill.nivel,
        prioridade: skill.prioridade
    });
    setIsFormOpen(true);
  };

  // --- AÇÃO DE SALVAR (POST ou PUT) ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.idHabilidade === 0 && !editingId) {
      alert("Selecione uma habilidade da lista.");
      return;
    }

    const payload = {
        idUsuario: parseInt(userId),
        idHabilidade: formData.idHabilidade,
        statusRelacao: "Em Progresso", // Valor padrão
        nivel: Number(formData.nivel),
        prioridade: Number(formData.prioridade),
        dataDeRegistro: new Date().toISOString().split('T')[0]
    };

    try {
        if (editingId) {
            // --- 3. PUT (Atualizar) ---
            // Rota esperada: /usuario/habilidades/{idRelacao}
            const response = await fetch(`${API_BASE_URL}/usuario/habilidades/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...payload, idRelacao: editingId }) // Inclui ID no corpo se o Java exigir
            });

            if (response.ok) {
                alert("Habilidade atualizada!");
                fetchData(); // Recarrega a lista
                setIsFormOpen(false);
            } else {
                alert("Erro ao atualizar.");
            }

        } else {
            // --- 2. POST (Criar) ---
            // Rota esperada: /usuario/habilidades
            const response = await fetch(`${API_BASE_URL}/usuario/habilidades`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok || response.status === 201) {
                alert("Habilidade adicionada!");
                fetchData(); // Recarrega a lista
                setIsFormOpen(false);
            } else {
                alert("Erro ao adicionar (Verifique se já não possui essa skill).");
            }
        }
    } catch (error) {
        alert("Erro de conexão com a API.");
    }
  };

  // --- 4. DELETE (Remover) ---
  const handleDelete = async (idRelacao: number) => {
    if (window.confirm("Tem certeza que deseja remover esta habilidade do seu perfil?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/usuario/habilidades/${idRelacao}`, {
            method: 'DELETE'
        });

        if (response.ok || response.status === 204) {
            // Remove da lista visualmente sem precisar recarregar tudo
            setUserSkills(prev => prev.filter(skill => skill.idRelacao !== idRelacao));
        } else {
            alert("Erro ao deletar.");
        }
      } catch (error) {
        alert("Erro de conexão ao deletar.");
      }
    }
  };

  // Helper de cores para badges
  const getLevelBadge = (nivel: number) => {
    if (nivel <= 2) return { label: 'Iniciante', bg: '#dbeafe', color: '#1e40af' };
    if (nivel <= 4) return { label: 'Intermediário', bg: '#fef3c7', color: '#92400e' };
    return { label: 'Avançado', bg: '#dcfce7', color: '#166534' };
  };

  if (loading) return <div style={{padding:40, textAlign:'center'}}>Carregando habilidades...</div>;

  return (
    <div className="skills-page-container" style={{padding: '40px 20px', background: 'var(--bg-color)', minHeight: '100vh'}}>
      <div className="skills-card" style={{maxWidth: 800, margin: '0 auto', background: 'var(--card-bg)', borderRadius: 16, padding: 30, border: '1px solid var(--border-color)'}}>
        
        {/* HEADER */}
        <div className="skills-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, borderBottom: '1px solid var(--border-color)', paddingBottom: 20}}>
          <div>
            <h2 style={{display: 'flex', alignItems: 'center', gap: 10, margin: 0, color: 'var(--text-dark)'}}>
              <FaLayerGroup /> Minhas Habilidades
            </h2>
            <p style={{margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem'}}>Gerencie suas competências técnicas.</p>
          </div>
          {!isFormOpen && (
            <button className="btn-primary" onClick={openCreateForm}>
              <FaPlus /> Nova Habilidade
            </button>
          )}
        </div>

        {/* FORMULÁRIO (POST/PUT) */}
        {isFormOpen && (
          <form onSubmit={handleSave} style={{background: 'var(--acc-bar-bg)', padding: 20, borderRadius: 12, marginBottom: 30, animation: 'slideDown 0.3s'}}>
            <h3 style={{marginTop: 0, marginBottom: 15, fontSize: '1.1rem', color: 'var(--text-dark)'}}>
                {editingId ? 'Editar Habilidade' : 'Adicionar Nova Habilidade'}
            </h3>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 15, marginBottom: 20}}>
              {/* Select Habilidade (Do Catálogo) */}
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontSize: '0.85rem', fontWeight: 'bold', marginBottom: 5}}>Habilidade</label>
                <select 
                    className="input-field"
                    value={formData.idHabilidade}
                    disabled={!!editingId} // Não pode mudar a skill na edição, só o nível
                    onChange={e => setFormData({...formData, idHabilidade: Number(e.target.value)})}
                    required
                >
                    <option value={0}>Selecione...</option>
                    {catalogSkills.map(s => (
                        <option key={s.idHabilidade} value={s.idHabilidade}>{s.nomeHabilidade}</option>
                    ))}
                </select>
              </div>

              {/* Input Nível */}
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontSize: '0.85rem', fontWeight: 'bold', marginBottom: 5}}>Nível (1-5)</label>
                <input 
                    type="number" min="1" max="5"
                    className="input-field"
                    value={formData.nivel}
                    onChange={e => setFormData({...formData, nivel: Number(e.target.value)})}
                />
              </div>

              {/* Input Prioridade */}
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontSize: '0.85rem', fontWeight: 'bold', marginBottom: 5}}>Prioridade (1-5)</label>
                <input 
                    type="number" min="1" max="5"
                    className="input-field"
                    value={formData.prioridade}
                    onChange={e => setFormData({...formData, prioridade: Number(e.target.value)})}
                />
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 10}}>
              <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                <FaSave /> Salvar
              </button>
            </div>
          </form>
        )}

        {/* LISTA DE HABILIDADES (GET + DELETE) */}
        <ul style={{listStyle: 'none', padding: 0}}>
          {userSkills.length === 0 ? (
            <div style={{textAlign: 'center', padding: 30, color: 'var(--text-muted)'}}>
                <FaExclamationCircle size={30} style={{marginBottom: 10, opacity: 0.5}} />
                <p>Você ainda não cadastrou nenhuma habilidade.</p>
            </div>
          ) : (
            userSkills.map(skill => {
                const badge = getLevelBadge(skill.nivel);
                // Tenta achar o nome no catálogo se não vier na skill do usuário
                const nomeExibicao = skill.nomeHabilidade || catalogSkills.find(c => c.idHabilidade === skill.idHabilidade)?.nomeHabilidade || `ID: ${skill.idHabilidade}`;

                return (
                  <li key={skill.idRelacao} style={{
                      background: 'var(--card-bg)', border: '1px solid var(--border-color)', 
                      borderRadius: 12, padding: '15px 20px', marginBottom: 12, 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      transition: 'transform 0.2s'
                  }}>
                    
                    <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
                        <div style={{fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-dark)'}}>
                            {nomeExibicao}
                        </div>
                        <span style={{
                            fontSize: '0.75rem', padding: '4px 10px', borderRadius: 20, 
                            fontWeight: 700, textTransform: 'uppercase',
                            backgroundColor: badge.bg, color: badge.color
                        }}>
                            {badge.label} ({skill.nivel})
                        </span>
                        <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>
                            Prioridade: {skill.prioridade}
                        </span>
                    </div>

                    <div style={{display: 'flex', gap: 8}}>
                      <button 
                        onClick={() => openEditForm(skill)}
                        style={{background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', padding: 8}}
                        title="Editar"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(skill.idRelacao)}
                        style={{background: 'transparent', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', padding: 8}}
                        title="Excluir"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </li>
                );
            })
          )}
        </ul>

      </div>
    </div>
  );
}