import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaSignOutAlt, FaChartPie, FaBriefcase } from 'react-icons/fa';
import { API_BASE_URL } from '../../services/api';
import type { Demanda } from '../../types';

export default function B2BArea() {
  const navigate = useNavigate();
  const [vagas, setVagas] = useState<Demanda[]>([]);
  useEffect(() => {
    const fetchDemandas = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/demandas`);
            if (res.ok) {
                const data = await res.json();
                setVagas(data);
            }
        } catch (e) { console.log("Erro ao buscar demandas"); }
    };
    fetchDemandas();
  }, []);
  return (
    <div className="b2b-container">
      <div className="b2b-wrapper">
        <header className="b2b-header">
          <div className="company-info">
            <div className="company-logo-box"><FaBuilding /></div>
            <div className="company-details">
              <h1>Área Corporativa</h1>
              <p><span className="plan-badge">Admin</span> Gestão de Demandas</p>
            </div>
          </div>
          <button className="btn-logout" onClick={() => navigate('/')}><FaSignOutAlt /> Sair</button>
        </header>
        <h2 style={{marginBottom: 20, color:'var(--text-dark)'}}>Vagas e Demandas Abertas</h2>
        <div className="modules-grid">
            {vagas.length > 0 ? vagas.map((vaga) => (
                <div key={vaga.idDemanda} className="module-card" style={{height:'auto'}}>
                    <div className="module-content-top">
                        <div className="module-icon-box"><FaBriefcase /></div>
                        <h3>Vaga #{vaga.idDemanda}</h3>
                        <p><strong>Senioridade:</strong> {vaga.senioridade}</p>
                        <p><strong>Vagas:</strong> {vaga.qtdVagas}</p>
                        <p><strong>Prioridade:</strong> {vaga.prioridade}</p>
                        <p style={{marginTop:8, fontSize:'0.8rem'}}>{vaga.statusRemoto}</p>
                    </div>
                </div>
            )) : (
                <p style={{color:'var(--text-muted)'}}>Nenhuma demanda cadastrada na API ainda.</p>
            )}
            <div className="module-card" onClick={() => alert('Funcionalidade Premium')}>
                <div className="module-content-top">
                    <div className="module-icon-box"><FaChartPie /></div>
                    <h3>Gap Analysis</h3>
                    <p>Relatório de lacunas do mercado vs. candidatos.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}