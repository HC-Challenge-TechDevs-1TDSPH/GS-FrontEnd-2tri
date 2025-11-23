import React, { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaGlobeAmericas,
  FaExclamationTriangle,
  FaCrown,
} from 'react-icons/fa';

interface TopSkill {
  name: string;
  userScore: number;
  marketAvg: number;
}
interface CriticalGap {
  name: string;
  relevancia: 'Alta' | 'Média' | 'Baixa';
}
interface SectorData {
  avgReadiness: number;
  topSkills: TopSkill[];
  criticalGaps: CriticalGap[];
}
interface DatabaseType {
  [key: string]: SectorData;
}

export default function MarketComparison() {
  const [sector, setSector] = useState<string>('Tecnologia');
  const [data, setData] = useState<SectorData | null>(null);
  const mockDatabase: DatabaseType = {
    Tecnologia: {
      avgReadiness: 72,
      topSkills: [
        { name: 'React / Frontend', userScore: 85, marketAvg: 70 },
        { name: 'Cloud (AWS)', userScore: 40, marketAvg: 75 },
        { name: 'DevOps', userScore: 50, marketAvg: 65 },
      ],
      criticalGaps: [
        { name: 'Kubernetes', relevancia: 'Alta' },
        { name: 'System Design', relevancia: 'Média' },
      ],
    },
    Marketing: {
      avgReadiness: 60,
      topSkills: [
        { name: 'Copywriting', userScore: 90, marketAvg: 75 },
        { name: 'Analytics (GA4)', userScore: 50, marketAvg: 85 },
        { name: 'SEO Técnico', userScore: 30, marketAvg: 80 },
      ],
      criticalGaps: [
        { name: 'Performance Ads', relevancia: 'Alta' },
        { name: 'CRM', relevancia: 'Alta' },
      ],
    },
  };
  useEffect(() => {
    setData(mockDatabase[sector] || null);
  }, [sector]);
  if (!data) return <div>Carregando...</div>;
  return (
    <div className="market-container">
      <div className="market-card">
        <div className="market-header">
          <div className="market-title">
            <h2>
              <FaGlobeAmericas style={{ color: '#4f46e5' }} />
              Visão de Mercado
              <span className="premium-badge">
                <FaCrown size={10} /> Premium
              </span>
            </h2>
          </div>
          <select
            className="sector-select"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            <option value="Tecnologia">Tecnologia & TI</option>
            <option value="Marketing">Marketing Digital</option>
          </select>
        </div>
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-value">{data.avgReadiness}%</span>
            <span className="metric-label">Sua Prontidão Média</span>
          </div>
          <div className="metric-card">
            <span className="metric-value" style={{ color: '#94a3b8' }}>
              68%
            </span>
            <span className="metric-label">Média do Setor</span>
          </div>
        </div>
        <div className="comparison-section">
          <h3>
            <FaChartLine /> Comparativo de Habilidades (Top 3)
          </h3>
          {data.topSkills.map((skill, idx) => (
            <div key={idx} className="skill-comp-row">
              <div className="comp-header">
                <span>{skill.name}</span>
              </div>
              <div className="double-bar">
                <div className="bar-track">
                  <div
                    className="bar-fill fill-user"
                    style={{ width: `${skill.userScore}%` }}
                  ></div>
                </div>
                <span className="legend-small">Você: {skill.userScore}%</span>
                <div className="bar-track" style={{ marginTop: '4px' }}>
                  <div
                    className="bar-fill fill-market"
                    style={{ width: `${skill.marketAvg}%` }}
                  ></div>
                </div>
                <span className="legend-small">
                  Mercado: {skill.marketAvg}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <hr style={{ margin: '32px 0', borderColor: '#e2e8f0' }} />
        <div className="gaps-section">
          <h3>
            <FaExclamationTriangle style={{ color: '#ef4444' }} /> Lacunas
            Críticas
          </h3>
          <div className="gaps-grid">
            {data.criticalGaps.map((gap, idx) => (
              <div key={idx} className="gap-card">
                <FaExclamationTriangle className="gap-icon" />
                <div className="gap-info">
                  <strong>{gap.name}</strong>
                  <span>Prioridade: {gap.relevancia}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};