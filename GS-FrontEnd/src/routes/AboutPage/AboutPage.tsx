import React from 'react';
import { FaLightbulb, FaUsers, FaGlobeAmericas, FaLock } from 'react-icons/fa';
import equipeImg from '/img/equipe.jpeg';


export default function AboutPage() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>Decodificando o Futuro do Trabalho</h1>
        <p>
          Nossa missão é iluminar o caminho profissional de cada indivíduo através de dados globais, inteligência artificial e foco humano.
        </p>
      </section>
      <section className="story-section">
        <div className="story-content">
          <span style={{color: 'var(--primary-color)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: 10}}>Nossa Jornada</span>
          <h2>Como tudo começou</h2>
          <p>
            O FutureLens nasceu em 2024 de uma frustração simples: o mercado de trabalho muda mais rápido do que as universidades conseguem atualizar seus currículos.
          </p>
          <p>
            Percebemos que profissionais talentosos estavam perdendo oportunidades não por falta de capacidade, mas por falta de <strong>direção estratégica</strong>.
          </p>
          <p>
            Decidimos unir IA com bases de dados reais para criar uma bússola de carreira que se adapta em tempo real.
          </p>
        </div>
        <div className="story-image-side">
          <img 
            src={equipeImg} 
            alt="Equipe do FutureLens trabalhando" 
          />
        </div>
      </section>
      <section className="stats-container">
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">+150k</span>
            <span className="stat-label">Vidas Impactadas</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">50M+</span>
            <span className="stat-label">Dados Analisados</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">25</span>
            <span className="stat-label">Países Atendidos</span>
          </div>
        </div>
      </section>
      <section className="values-section">
        <h2 className="section-title-center">Nossos Pilares</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon-box"><FaLightbulb /></div>
            <h3>Dados, não opinião</h3>
            <p>Não damos conselhos baseados em "feeling". Tudo o que sugerimos é respaldado por tendências de mercado quantificáveis.</p>
          </div>
          <div className="value-card">
            <div className="value-icon-box"><FaUsers /></div>
            <h3>Centrado no Humano</h3>
            <p>A tecnologia é o meio, não o fim. Nosso objetivo final é a realização profissional e o bem-estar das pessoas.</p>
          </div>
          <div className="value-card">
            <div className="value-icon-box"><FaGlobeAmericas /></div>
            <h3>Democratização</h3>
            <p>A inteligência de carreira de alto nível costumava ser exclusiva de executivos. Nós a tornamos acessível a todos.</p>
          </div>
          <div className="value-card">
            <div className="value-icon-box"><FaLock /></div>
            <h3>Privacidade Absoluta</h3>
            <p>Seus dados de carreira são seus. Nunca vendemos informações pessoais para recrutadores ou terceiros.</p>
          </div>
        </div>
      </section>
    </div>
  );
};