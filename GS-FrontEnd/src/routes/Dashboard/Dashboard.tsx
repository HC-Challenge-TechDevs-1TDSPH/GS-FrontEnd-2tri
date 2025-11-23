import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  FaEye, FaChartPie, FaRocket, FaExclamationTriangle, FaEdit, FaMapSigns, FaRobot 
} from 'react-icons/fa';
import { API_BASE_URL } from '../../services/api';
import type { Habilidade, UsuarioHabilidade, ComparativoSkill } from '../../types/index';

export default function Dashboard() {
  const navigate = useNavigate();
  const [prontidao, setProntidao] = useState<number>(0);
  const [habilidadesEmergentes, setHabilidadesEmergentes] = useState<Habilidade[]>([]);
  const [lacunas, setLacunas] = useState<UsuarioHabilidade[]>([]);
  const [skillsComparison, setSkillsComparison] = useState<ComparativoSkill[]>([]);
  const [loadingPredict, setLoadingPredict] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const useMockData = () => {
    setProntidao(62);
    setHabilidadesEmergentes([
      { idHabilidade: 1, nomeHabilidade: "IA Generativa", descricao: "LLMs", categoria: "Tech" },
      { idHabilidade: 2, nomeHabilidade: "Análise de Dados", descricao: "BI", categoria: "Dados" },
      { idHabilidade: 3, nomeHabilidade: "Liderança Ágil", descricao: "Soft Skill", categoria: "Gestão" }
    ]);
    setLacunas([
      { idRelacao: 1, idUsuario: 1, idHabilidade: 10, statusRelacao: "Pendente", nivel: 1, prioridade: 5, nomeHabilidade: "Inglês Técnico" },
      { idRelacao: 2, idUsuario: 1, idHabilidade: 12, statusRelacao: "Pendente", nivel: 2, prioridade: 3, nomeHabilidade: "Python Avançado" }
    ]);
    setSkillsComparison([
      { nomeHabilidade: "React", nivelUsuario: 90, nivelMercado: 85 },
      { nomeHabilidade: "Python", nivelUsuario: 40, nivelMercado: 95 },
      { nomeHabilidade: "Gestão", nivelUsuario: 60, nivelMercado: 70 },
      { nomeHabilidade: "UX Design", nivelUsuario: 75, nivelMercado: 60 }
    ]);
  };
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const resScore = await fetch(`${API_BASE_URL}/dashboard/score`);
        if (resScore.ok) {
            const data = await resScore.json();
            setProntidao(data.score);
        }
        const resSkills = await fetch(`${API_BASE_URL}/habilidades/emergentes`);
        if (resSkills.ok) {
            const data = await resSkills.json();
            setHabilidadesEmergentes(data);
        }
        const resGaps = await fetch(`${API_BASE_URL}/usuario/habilidades/lacunas`);
        if (resGaps.ok) {
            const data = await resGaps.json();
            setLacunas(data);
        }
        const resGraph = await fetch(`${API_BASE_URL}/dashboard/comparativo`);
        if (resGraph.ok) {
            const data = await resGraph.json();
            setSkillsComparison(data);
        } else {
            throw new Error("Falha parcial na API");
        }
      } catch (error) {
        console.warn("Usando dados locais (Mock) devido a erro na API.");
        useMockData();
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);
  const handleAvaliarProntidao = async () => {
    setLoadingPredict(true);
    setTimeout(() => {
        navigate('/analise');
        setLoadingPredict(false);
    }, 2000);
  };
  if (isLoading) return <div style={{padding: 40, textAlign: 'center'}}>Carregando Painel...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="brand">
          <FaEye />
          <span>FutureLens</span>
        </div>
        <div className="user-profile">
          <div className="user-info-text">
            <span>Olá,</span>
            <strong>Carlos</strong>
          </div>
          <div className="avatar-circle">CA</div>
        </div>
      </header>
      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Painel de Controle</h1>
          <p>Dados sincronizados com API Java.</p>
        </div>
        <div className="kpi-grid">
          <div className="card">
            <div className="card-header"><FaRobot /> Prontidão Atual</div>
            <div className="readiness-circle" style={{ '--percentage': `${prontidao * 3.6}deg` } as React.CSSProperties}>
              <div className="readiness-inner">
                <span style={{fontSize: '2rem', fontWeight: 800, color: 'var(--text-dark)'}}>{prontidao}%</span>
                <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Match</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><FaRocket /> Habilidades Emergentes</div>
            <ul style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
              {habilidadesEmergentes.map(skill => (
                <li key={skill.idHabilidade} className="tag">
                  {skill.nomeHabilidade}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className="card-header" style={{color: 'var(--danger-color)'}}><FaExclamationTriangle /> Lacunas</div>
            <ul>
              {lacunas.map(gap => (
                <li key={gap.idRelacao} style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10}}>
                  <FaExclamationTriangle color="var(--danger-color)" size={14} />
                  <span>
                    {gap.nomeHabilidade || `Skill #${gap.idHabilidade}`} 
                    <span style={{fontSize:'0.7rem', opacity:0.7, marginLeft: 6}}>
                       (Prioridade: {gap.prioridade})
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card" style={{marginBottom: 30}}>
          <div className="card-header"><FaChartPie /> Comparativo de Mercado</div>
          <div style={{marginTop: 20}}>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 15, marginBottom: 15, fontSize: '0.8rem', color: 'var(--text-muted)'}}>
              <span style={{display: 'flex', alignItems: 'center', gap: 5}}>
                <span style={{width: 8, height: 8, borderRadius: '50%', background: 'var(--primary-color)'}}></span> Você
              </span>
              <span style={{display: 'flex', alignItems: 'center', gap: 5}}>
                <span style={{width: 8, height: 8, borderRadius: '50%', background: '#64748b'}}></span> Mercado
              </span>
            </div>
            {skillsComparison.map((item, index) => {
               const diff = item.nivelUsuario - item.nivelMercado;
               const isPos = diff >= 0;
               return (
                <div key={index} style={{marginBottom: 20}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600, marginBottom: 6}}>
                        <span>{item.nomeHabilidade}</span>
                        <span style={{ color: isPos ? 'var(--success-color)' : 'var(--danger-color)' }}>
                            {isPos ? '+' : ''}{diff}%
                        </span>
                    </div>
                    <div className="bar-wrapper">
                        <div className="bar-fill personal" style={{width: `${item.nivelUsuario}%`}}></div>
                    </div>
                    <div className="bar-wrapper">
                        <div className="bar-fill market" style={{width: `${item.nivelMercado}%`}}></div>
                    </div>
                </div>
               )
            })}
          </div>
        </div>
        <div className="actions-bar">
          <button className="btn-action btn-ai" onClick={handleAvaliarProntidao} disabled={loadingPredict}>
            {loadingPredict ? 'Calculando...' : <><FaRobot /> Avaliar Prontidão</>}
          </button>
          <button className="btn-action" onClick={() => navigate('/trilhas')}><FaEdit /> Editar Habilidades</button>
          <button className="btn-action" onClick={() => navigate('/trilhas')}><FaMapSigns /> Ver Trilhas</button>
        </div>
      </div>
    </div>
  );
}