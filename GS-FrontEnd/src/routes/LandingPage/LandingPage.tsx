import { useState } from 'react';
import {
  FaEye,
  FaBars,
  FaTimes,
  FaArrowRight,
  FaChartLine,
  FaCheckCircle,
  FaStar,
} from 'react-icons/fa';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <FaEye />
            <span>FutureLens</span>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">
              Recursos
            </a>
            <a href="#how-it-works" className="nav-link">
              Como funciona
            </a>
            <div className="divider"></div>
            <button className="btn-text">Entrar</button>
            <button className="btn-primary">Criar conta</button>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#features" className="nav-link">
              Recursos
            </a>
            <button className="btn-text" style={{ textAlign: 'left' }}>
              Entrar
            </button>
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Criar conta
            </button>
          </div>
        )}
      </nav>
      <section className="hero-section">
        <div className="badge">
          <span className="dot"></span>
          Novidade: Integração com AI 2.0
        </div>
        <h1 className="headline">
          Foque no que importa. <br />
          <span className="highlight">Prepare-se para o futuro.</span>
        </h1>
        <p className="sub-headline">
          A plataforma completa para gerenciar sua visão estratégica e antecipar
          tendências antes que elas aconteçam.
        </p>
        <div className="cta-group">
          <button className="btn-primary btn-large">
            Começar agora <FaArrowRight />
          </button>
          <button className="btn-secondary">Ver demonstração</button>
        </div>
      </section>
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">O que o FutureLens faz</h2>
            <p className="section-desc">
              Transformamos dados complexos em clareza para sua tomada de
              decisão.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-box">
                <FaChartLine />
              </div>
              <h3 className="feature-title">Análise Preditiva</h3>
              <p className="feature-desc">
                Antecipe cenários de mercado com nossos algoritmos avançados de
                projeção.
              </p>
            </div>
            <div className="feature-card">
              <div className="icon-box">
                <FaEye />
              </div>
              <h3 className="feature-title">Visão 360º</h3>
              <p className="feature-desc">
                Tenha controle total sobre todas as métricas que impactam o seu
                negócio em um só lugar.
              </p>
            </div>
            <div className="feature-card">
              <div className="icon-box">
                <FaCheckCircle />
              </div>
              <h3 className="feature-title">Foco no Essencial</h3>
              <p className="feature-desc">
                Filtros inteligentes que eliminam o ruído e mostram apenas o que
                precisa de atenção.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{ color: 'white' }}>
              Como funciona
            </h2>
            <p className="section-desc" style={{ color: '#cbd5e1' }}>
              Simples, rápido e eficiente. Em apenas 3 passos.
            </p>
          </div>
          <div className="how-grid">
            <div className="step-item">
              <div className="step-number">01</div>
              <h3 className="step-title">Conecte seus dados</h3>
              <p className="step-desc">
                Integre suas fontes de dados em segundos com nossa API segura.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">02</div>
              <h3 className="step-title">Defina seus objetivos</h3>
              <p className="step-desc">
                Configure o que é sucesso para você e deixe a IA calibrar as
                metas.
              </p>
            </div>
            <div className="step-item">
              <div className="step-number">03</div>
              <h3 className="step-title">Acompanhe a evolução</h3>
              <p className="step-desc">
                Receba insights diários e ajuste a rota em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">O que dizem sobre nós</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="quote">
                "O FutureLens mudou completamente a forma como planejamos nosso
                trimestre. O foco no que importa é real."
              </p>
              <div className="author">
                <div className="avatar"></div>
                <div className="author-info">
                  <strong>Ana Silva</strong>
                  <span>CEO, TechStart</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="quote">
                "Simplesmente essencial. A interface é limpa e os 3 passos de
                configuração foram muito rápidos."
              </p>
              <div className="author">
                <div className="avatar"></div>
                <div className="author-info">
                  <strong>Carlos Mendes</strong>
                  <span>Diretor de Produto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <p>&copy; 2024 FutureLens. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};