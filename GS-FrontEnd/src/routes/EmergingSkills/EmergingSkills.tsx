import { useState, useEffect } from 'react';
import { FaGlobe, FaArrowUp, FaPlus, FaCheck } from 'react-icons/fa';
import { API_BASE_URL } from '../../services/api';
import type { Habilidade } from '../../types';

export default function EmergingSkills() {
  const [skills, setSkills] = useState<Habilidade[]>([]);
  const [addedSkills, setAddedSkills] = useState<number[]>([]); 
  const [loading, setLoading] = useState(true);
  
  const userId = localStorage.getItem('userId') || '1'; 

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // ROTA CORRIGIDA: /java/habilidade
        const response = await fetch(`${API_BASE_URL}/java/habilidade`);
        if (response.ok) {
            const data = await response.json();
            setSkills(data);
        }
      } catch (error) {
        console.log("Erro ao buscar skills");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const handleAddSkill = async (habilidadeId: number) => {
    if (addedSkills.includes(habilidadeId)) return;

    try {
        const payload = {
            idUsuario: parseInt(userId),
            idHabilidade: habilidadeId,
            statusRelacao: "Interesse",
            nivel: 1,
            prioridade: 5,
            dataDeRegistro: new Date().toISOString().split('T')[0]
        };

        // ROTA CORRIGIDA: /java/usuariohabilidade
        const response = await fetch(`${API_BASE_URL}/java/usuariohabilidade`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok || response.status === 201) {
            setAddedSkills([...addedSkills, habilidadeId]);
            alert("Habilidade adicionada!");
        } else {
            alert("Erro ao adicionar (talvez já exista).");
        }
    } catch (error) {
        alert("Erro de conexão.");
    }
  };

  if (loading) return <div style={{padding:40, textAlign:'center'}}>Carregando tendências...</div>;

  return (
    <div className="emerging-container">
        <div className="page-header">
          <h1 className="page-title">Vitrine do Futuro</h1>
          <p className="page-subtitle">Habilidades disponíveis no sistema.</p>
        </div>

        <div className="skills-grid">
          {skills.map(skill => {
            const isAdded = addedSkills.includes(skill.idHabilidade);
            return (
              <div key={skill.idHabilidade} className="trend-card">
                <div>
                  <div className="card-top">
                    <span className="category-tag">{skill.categoria}</span>
                    <div className="trend-indicator"><FaArrowUp size={10} /> Alta</div>
                  </div>
                  <h3 className="skill-name">{skill.nomeHabilidade}</h3>
                  <p className="sector-name"><FaGlobe color="var(--text-muted)" /> Global</p>
                  <p style={{fontSize:'0.9rem', color:'var(--text-muted)'}}>{skill.descricao}</p>
                </div>
                <button 
                  className={`btn-add ${isAdded ? 'added' : ''}`}
                  onClick={() => handleAddSkill(skill.idHabilidade)}
                >
                  {isAdded ? <><FaCheck /> Adicionado</> : <><FaPlus /> Tenho interesse</>}
                </button>
              </div>
            );
          })}
        </div>
    </div>
  );
}