import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  FaEye, FaChartPie, FaRocket, FaExclamationTriangle, FaEdit, FaMapSigns, FaRobot, FaLightbulb, FaBookOpen
} from 'react-icons/fa';
import { API_BASE_URL } from '../../services/api';
import type { Habilidade, UsuarioHabilidade, ComparativoSkill, Curso } from '../../types';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Estados de Dados
  const [prontidao, setProntidao] = useState<number>(0);
  const [habilidadesEmergentes, setHabilidadesEmergentes] = useState<Habilidade[]>([]);
  const [lacunas, setLacunas] = useState<UsuarioHabilidade[]>([]);
  const [skillsComparison, setSkillsComparison] = useState<ComparativoSkill[]>([]);
  const [recomendacoes, setRecomendacoes] = useState<Curso[]>([]); // NOVO: Para guardar os cursos do Java

  // Estados de UI
  const [loadingPredict, setLoadingPredict] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fallback (Dados Mockados para o que o Java não tem)
  const useMockData = () => {
    setProntidao(72);
    setSkillsComparison([
      { nomeHabilidade: "React", nivelUsuario: 90, nivelMercado: 85 },
      { nomeHabilidade: "Java", nivelUsuario: 40, nivelMercado: 95 },
      { nomeHabilidade: "Scrum", nivelUsuario: 60, nivelMercado: 70 },
      { nomeHabilidade: "SQL", nivelUsuario: 75, nivelMercado: 60 }
    ]);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem('userId') || '1';

        // --- 1. HABILIDADES EMERGENTES (Real) ---
        try {
            const resSkills = await fetch(`${API_BASE_URL}/java/habilidade`);
            if (resSkills.ok) {
                const data: Habilidade[] = await resSkills.json();
                setHabilidadesEmergentes(data.slice(0, 3));
            }
        } catch (e) { console.log("Skills off"); }

        // --- 2. LACUNAS DO USUÁRIO (Real) ---
        try {
            const resGaps = await fetch(`${API_BASE_URL}/java/usuariohabilidade/usuario/${userId}`);
            if (resGaps.ok) {
                const data: UsuarioHabilidade[] = await resGaps.json();
                // Filtra skills com prioridade alta (ex: >= 3)
                const gaps = data.filter(item => item.prioridade >= 3);
                
                // Preenche nome se faltar
                const gapsComNome = gaps.map(gap => ({
                    ...gap,
                    nomeHabilidade: gap.nomeHabilidade || `Skill #${gap.idHabilidade}` 
                }));
                setLacunas(gapsComNome);
            }
        } catch (e) { console.log("Lacunas off"); }

        // --- 3. RECOMENDAÇÕES DE CURSOS (Real - Seu DashboardResource) ---
        try {
            // Rota: /java/dashboard/recomendacoes/{id}
            const resRec = await fetch(`${API_BASE_URL}/java/dashboard/recomendacoes/${userId}`);
            if (resRec.ok) {
                const data: Curso[] = await resRec.json();
                setRecomendacoes(data);
            }
        } catch (e) { console.log("Recomendações off"); }

        // --- 4. DADOS MOCKADOS (Score e Gráfico - O Java não tem endpoints para isso) ---
        useMockData();

      } catch (error) {
        console.warn("Erro geral na API");
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
            <strong>{localStorage.getItem('userName') || 'Visitante'}</strong>
          </div>
          <div className="avatar-circle">
             {localStorage.getItem('userName')?.substring(0,2).toUpperCase() || 'FL'}
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Painel de Controle</h1>
          <p>Visão estratégica da sua carreira.</p>
        </div>

        {/* Grid Principal */}
        <div className="kpi-grid">
          
          {/* Card 1: Prontidão (Mock) */}
          <div className="card">
            <div className="card-header"><FaRobot /> Prontidão Atual</div>
            <div className="readiness-circle" style={{ '--percentage': `${prontidao * 3.6}deg` } as React.CSSProperties}>
              <div className="readiness-inner">
                <span style={{fontSize: '2rem', fontWeight: 800, color: 'var(--text-dark)'}}>{prontidao}%</span>
                <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Match</span>
              </div>
            </div>
          </div>

          {/* Card 2: Habilidades Disponíveis (Real) */}
          <div className="card">
            <div className="card-header"><FaRocket /> Habilidades Disponíveis</div>
            <ul style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
              {habilidadesEmergentes.length > 0 ? habilidadesEmergentes.map(skill => (
                <li key={skill.idHabilidade} className="tag">
                  {skill.nomeHabilidade}
                </li>
              )) : <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Carregando catálogo...</span>}
            </ul>
          </div>

          {/* Card 3: Minhas Lacunas (Real) */}
          <div className="card">
            <div className="card-header" style={{color: 'var(--danger-color)'}}><FaExclamationTriangle /> Atenção (Prioridade Alta)</div>
            <ul>
              {lacunas.length > 0 ? lacunas.map(gap => (
                <li key={gap.idRelacao} style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10}}>
                  <FaExclamationTriangle color="var(--danger-color)" size={14} />
                  <span>
                    {gap.nomeHabilidade} 
                    <span style={{fontSize:'0.7rem', opacity:0.7, marginLeft: 6}}>
                       (Prio: {gap.prioridade})
                    </span>
                  </span>
                </li>
              )) : <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Nenhuma lacuna crítica encontrada.</span>}
            </ul>
          </div>
        </div>

        {/* --- NOVA SEÇÃO: RECOMENDAÇÕES DA API JAVA --- */}
        {recomendacoes.length > 0 && (
            <div style={{marginBottom: 30}}>
                <h3 style={{fontSize: '1.2rem', marginBottom: 15, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: 10}}>
                    <FaLightbulb style={{color: '#eab308'}} /> Recomendações para você
                </h3>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20}}>
                    {recomendacoes.map(curso => (
                        <div key={curso.idCurso} className="card" style={{padding: 20, borderLeft: '4px solid var(--primary-color)'}}>
                            <h4 style={{fontSize: '1rem', fontWeight: 700, marginBottom: 5}}>{curso.nomeDoCurso}</h4>
                            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 10}}>
                                {curso.plataforma} • {curso.cargaHoraria}h
                            </p>
                            <a href={curso.linkExterno} target="_blank" rel="noreferrer" 
                               style={{fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5}}>
                                <FaBookOpen /> Acessar Curso
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Gráfico Comparativo (Mock) */}
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
                        <span style={{ 
                            color: isPos ? 'var(--success-color)' : 'var(--danger-color)',
                            background: isPos ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                            padding: '2px 6px', borderRadius: 4, fontSize: '0.8rem'
                        }}>
                            {isPos ? '+' : ''}{diff}%
                        </span>
                    </div>
                    <div className="bar-wrapper"><div className="bar-fill personal" style={{width: `${item.nivelUsuario}%`}}></div></div>
                    <div className="bar-wrapper"><div className="bar-fill market" style={{width: `${item.nivelMercado}%`}}></div></div>
                </div>
               )
            })}
          </div>
        </div>

        <div className="actions-bar">
          <button className="btn-action btn-ai" onClick={handleAvaliarProntidao} disabled={loadingPredict}>
            {loadingPredict ? 'Calculando...' : <><FaRobot /> Avaliar Prontidão</>}
          </button>
          <button className="btn-action" onClick={() => navigate('/skills')}><FaEdit /> Gerenciar Skills</button>
          <button className="btn-action" onClick={() => navigate('/trilhas')}><FaMapSigns /> Ver Trilhas</button>
        </div>
      </div>
    </div>
  );
}