import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaLayerGroup, FaSave, FaExclamationCircle } from 'react-icons/fa';
import { API_BASE_URL } from '../../services/api';
import type { UsuarioHabilidade, Habilidade } from '../../types';

export default function SkillsPage() {
  // Pega o ID do usuário logado ou usa 1 como teste
  const userId = localStorage.getItem('userId') || '1';

  const [userSkills, setUserSkills] = useState<UsuarioHabilidade[]>([]);
  const [catalogSkills, setCatalogSkills] = useState<Habilidade[]>([]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    idHabilidade: 0,
    nivel: 1,
    prioridade: 1
  });

  // --- 1. GET (Listar) ---
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // ROTA CORRIGIDA: /java/usuariohabilidade/usuario/{id}
      const resUserSkills = await fetch(`${API_BASE_URL}/java/usuariohabilidade/usuario/${userId}`);
      
      // ROTA CORRIGIDA: /java/habilidade (Baseado no HabilidadeResource anterior)
      const resCatalog = await fetch(`${API_BASE_URL}/java/habilidade`);

      if (resUserSkills.ok && resCatalog.ok) {
        const mySkillsData = await resUserSkills.json();
        const catalogData = await resCatalog.json();
        
        setUserSkills(mySkillsData);
        setCatalogSkills(catalogData);
      }
    } catch (error) {
      console.log("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLERS ---
  const openCreateForm = () => {
    setEditingId(null);
    setFormData({ idHabilidade: 0, nivel: 1, prioridade: 1 });
    setIsFormOpen(true);
  };

  const openEditForm = (skill: UsuarioHabilidade) => {
    setEditingId(skill.idRelacao);
    setFormData({
        idHabilidade: skill.idHabilidade,
        nivel: skill.nivel,
        prioridade: skill.prioridade
    });
    setIsFormOpen(true);
  };

  // --- SALVAR (POST / PUT) ---
const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if ((formData.idHabilidade === 0 && !editingId) || !userId) {
      alert("Selecione uma habilidade ou faça login novamente.");
      return;
    }

    // Data de hoje (Segura)
    const today = new Date().toISOString().split('T')[0];

    const payload = {
        idRelacao: editingId || 0,
        idUsuario: parseInt(userId),
        idHabilidade: formData.idHabilidade,
        statusRelacao: "ATUAL", 
        nivel: Number(formData.nivel),
        prioridade: Number(formData.prioridade),
        dataDeRegistro: today
    };

    console.log("Enviando Payload:", payload);

    try {
        if (editingId) {
            // PUT
            const response = await fetch(`${API_BASE_URL}/java/usuariohabilidade/${editingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Habilidade atualizada!");
                fetchData();
                setIsFormOpen(false);
            } else {
                alert("Erro ao atualizar. Verifique os dados.");
            }

        } else {
            // POST
            const response = await fetch(`${API_BASE_URL}/java/usuariohabilidade`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok || response.status === 201) {
                alert("Habilidade adicionada!");
                fetchData();
                setIsFormOpen(false);
            } else {
                // Mensagem específica baseada na lógica do seu BO
                alert("Erro ao adicionar. Possíveis causas:\n1. Você já possui essa habilidade (Duplicada).\n2. Usuário inválido.");
            }
        }
    } catch (error) {
        console.error(error);
        alert("Erro de conexão com a API.");
    }
  };

  // --- DELETE ---
  const handleDelete = async (idRelacao: number) => {
    if (window.confirm("Remover esta habilidade?")) {
      try {
        // DELETE CORRIGIDO: /java/usuariohabilidade/{id}
        const response = await fetch(`${API_BASE_URL}/java/usuariohabilidade/${idRelacao}`, {
            method: 'DELETE'
        });

        if (response.ok || response.status === 204) {
            setUserSkills(prev => prev.filter(skill => skill.idRelacao !== idRelacao));
        } else { alert("Erro ao deletar."); }
      } catch (error) { alert("Erro de conexão."); }
    }
  };

  // Helper para o nome
  const getSkillName = (id: number) => {
    const skill = catalogSkills.find(s => s.idHabilidade === id);
    return skill ? skill.nomeHabilidade : `Skill #${id}`;
  };

  if (loading) return <div style={{padding:40, textAlign:'center'}}>Carregando...</div>;

  return (
    <div className="skills-page-container" style={{padding: '40px 20px', background: 'var(--bg-color)', minHeight: '100vh'}}>
      <div className="skills-card" style={{maxWidth: 800, margin: '0 auto', background: 'var(--card-bg)', borderRadius: 16, padding: 30, border: '1px solid var(--border-color)'}}>
        
        <div className="skills-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, borderBottom: '1px solid var(--border-color)', paddingBottom: 20}}>
          <div>
            <h2 style={{display: 'flex', alignItems: 'center', gap: 10, margin: 0, color: 'var(--text-dark)'}}>
              <FaLayerGroup /> Minhas Habilidades
            </h2>
          </div>
          {!isFormOpen && (
            <button className="btn-primary" onClick={openCreateForm}>
              <FaPlus /> Nova Habilidade
            </button>
          )}
        </div>

        {isFormOpen && (
          <form onSubmit={handleSave} style={{background: 'var(--acc-bar-bg)', padding: 20, borderRadius: 12, marginBottom: 30}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 15, marginBottom: 20}}>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontSize: '0.85rem', fontWeight: 'bold'}}>Habilidade</label>
                <select 
                    className="input-field"
                    value={formData.idHabilidade}
                    disabled={!!editingId}
                    onChange={e => setFormData({...formData, idHabilidade: Number(e.target.value)})}
                    required
                >
                    <option value={0}>Selecione...</option>
                    {catalogSkills.map(s => (
                        <option key={s.idHabilidade} value={s.idHabilidade}>{s.nomeHabilidade}</option>
                    ))}
                </select>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontSize: '0.85rem', fontWeight: 'bold'}}>Nível (1-5)</label>
                <input type="number" min="1" max="5" className="input-field" value={formData.nivel} onChange={e => setFormData({...formData, nivel: Number(e.target.value)})} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontSize: '0.85rem', fontWeight: 'bold'}}>Prioridade</label>
                <input type="number" min="1" max="5" className="input-field" value={formData.prioridade} onChange={e => setFormData({...formData, prioridade: Number(e.target.value)})} />
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 10}}>
              <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>Cancelar</button>
              <button type="submit" className="btn-primary"><FaSave /> Salvar</button>
            </div>
          </form>
        )}

        <ul style={{listStyle: 'none', padding: 0}}>
          {userSkills.length === 0 ? (
            <div style={{textAlign: 'center', padding: 30, color: 'var(--text-muted)'}}>
                <FaExclamationCircle size={30} style={{marginBottom: 10, opacity: 0.5}} />
                <p>Nenhuma habilidade cadastrada.</p>
            </div>
          ) : (
            userSkills.map(skill => (
              <li key={skill.idRelacao} style={{
                  background: 'var(--card-bg)', border: '1px solid var(--border-color)', 
                  borderRadius: 12, padding: '15px 20px', marginBottom: 12, 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                    <div style={{fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-dark)'}}>
                        {getSkillName(skill.idHabilidade)}
                    </div>
                    <div style={{fontSize:'0.85rem', color:'var(--text-muted)'}}>
                        Nível: {skill.nivel} • Prioridade: {skill.prioridade}
                    </div>
                </div>
                <div style={{display: 'flex', gap: 8}}>
                  <button onClick={() => openEditForm(skill)} style={{background:'transparent', border:'none', color:'var(--primary-color)', cursor:'pointer'}}><FaEdit size={18}/></button>
                  <button onClick={() => handleDelete(skill.idRelacao)} style={{background:'transparent', border:'none', color:'var(--danger-color)', cursor:'pointer'}}><FaTrash size={18}/></button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}