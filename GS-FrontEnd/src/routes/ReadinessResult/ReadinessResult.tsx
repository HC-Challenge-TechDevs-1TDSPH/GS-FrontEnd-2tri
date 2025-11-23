import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaChartBar,
  FaLightbulb,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLock,
  FaMagic,
} from 'react-icons/fa';


interface ComparisonItem {
  skill: string;
  user: number;
  market: number;
}
interface InsightItem {
  type: 'positive' | 'negative';
  title: string;
  text: string;
}
interface ResultData {
  score: number;
  summary: string;
  comparisons: ComparisonItem[];
  insights: InsightItem[];
}

export default function ReadinessResult() {
  const navigate = useNavigate();
  const resultData: ResultData = {
    score: 78,
    summary:
      'Você tem uma base técnica sólida, mas precisa alinhar suas habilidades de gestão às tendências atuais do mercado.',
    comparisons: [
      { skill: 'React & Frontend', user: 90, market: 85 },
      { skill: 'Backend (Python)', user: 65, market: 80 },
      { skill: 'Gestão Ágil', user: 40, market: 75 },
      { skill: 'UX Design', user: 70, market: 60 },
    ],
    insights: [
      {
        type: 'positive',
        title: 'Acima da Média',
        text: 'Sua proficiência em Frontend supera a média do mercado para sua senioridade.',
      },
      {
        type: 'negative',
        title: 'Lacuna Crítica',
        text: 'O mercado exige 35% mais conhecimento em Gestão Ágil do que você demonstrou.',
      },
      {
        type: 'negative',
        title: 'Oportunidade',
        text: 'Fortalecer seu Python pode abrir vagas em Fullstack com salários 20% maiores.',
      },
    ],
  };

  return (
    <div className="readiness-container">
      <div className="result-card">
        <header className="result-header">
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            title="Voltar"
          >
            <FaArrowLeft />
          </button>
          <h2 style={{ margin: 0, fontSize: '1.2rem' }}>
            Relatório de Análise
          </h2>
        </header>
        <section className="score-section">
          <div
            className="score-circle-lg"
            style={
              {
                '--percent': `${resultData.score * 3.6}deg`,
              } as React.CSSProperties
            }
          >
            <div className="score-inner-lg">
              <span className="big-number">{resultData.score}</span>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                Score Geral
              </span>
            </div>
          </div>
          <p className="score-message">"{resultData.summary}"</p>
        </section>
        <div className="analysis-grid">
          <div className="chart-block">
            <h3>
              <FaChartBar /> Comparativo de Mercado
            </h3>
            <div
              style={{
                display: 'flex',
                gap: 16,
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginBottom: 20,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--primary-color)',
                  }}
                ></span>{' '}
                Você
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--text-muted)',
                  }}
                ></span>{' '}
                Mercado
              </span>
            </div>
            <div>
              {resultData.comparisons.map((item, idx) => {
                const diff = item.user - item.market;
                const isPos = diff >= 0;
                return (
                  <div key={idx} style={{ marginBottom: 24 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                        fontSize: '0.95rem',
                        fontWeight: 600,
                      }}
                    >
                      <span>{item.skill}</span>
                      <span
                        style={{
                          color: isPos
                            ? 'var(--success-color)'
                            : 'var(--danger-color)',
                          fontSize: '0.8rem',
                          background: isPos
                            ? 'rgba(16,185,129,0.1)'
                            : 'rgba(239,68,68,0.1)',
                          padding: '2px 6px',
                          borderRadius: 4,
                        }}
                      >
                        {isPos ? '+' : ''}
                        {diff}%
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                      }}
                    >
                      <div
                        className="bar-wrapper"
                        style={{ height: 8, background: '#e2e8f0' }}
                      >
                        <div
                          className="bar-fill personal"
                          style={{ width: `${item.user}%` }}
                        ></div>
                      </div>
                      <div
                        className="bar-wrapper"
                        style={{
                          height: 6,
                          background: '#e2e8f0',
                          opacity: 0.6,
                        }}
                      >
                        <div
                          className="bar-fill market"
                          style={{
                            width: `${item.market}%`,
                            background: '#64748b',
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="insights-block">
            <h3>
              <FaLightbulb style={{ color: '#eab308' }} /> Insights da IA
            </h3>
            {resultData.insights.map((insight, idx) => (
              <div key={idx} className={`insight-card ${insight.type}`}>
                <div className="insight-icon">
                  {insight.type === 'positive' ? (
                    <FaCheckCircle />
                  ) : (
                    <FaExclamationTriangle />
                  )}
                </div>
                <div className="insight-text">
                  <h4>{insight.title}</h4>
                  <p>{insight.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className="premium-section">
          <div className="premium-content">
            <h3
              style={{
                fontSize: '1.8rem',
                marginBottom: '10px',
                fontWeight: 800,
              }}
            >
              Quer fechar essas lacunas?
            </h3>

            <p style={{ marginBottom: '24px', fontSize: '1.1rem' }}>
              Nossa IA pode criar um plano de estudos personalizado exato para o
              seu perfil.
            </p>
            <button
              className="premium-btn"
              onClick={() => navigate('/trilhas')}
            >
              <FaLock size={14} />
              <FaMagic size={14} />
              Gerar Trilhas Personalizadas
            </button>
            <p style={{ marginTop: '16px', fontSize: '0.8rem', opacity: 0.7 }}>
              Recurso exclusivo FutureLens Premium
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};