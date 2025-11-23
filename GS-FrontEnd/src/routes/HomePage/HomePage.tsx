import { Link } from 'react-router-dom'; // Import crucial
import {
  FaRocket,
  FaChartLine,
  FaBrain,
  FaArrowRight,
  FaPlay,
} from 'react-icons/fa';

export default function HomePage()  {
  return (
    <div className="home-container">
      <section className="home-hero">
        <div className="hero-badge">🚀 AI-Powered Career Intelligence</div>
        <h1>
          O Futuro do Trabalho <br />
          <span style={{ color: 'var(--primary-color)' }}>Decodificado.</span>
        </h1>
        <p>
          Não adivinhe qual habilidade aprender. O FutureLens analisa milhões de
          dados de mercado para construir o mapa exato do seu sucesso
          profissional.
        </p>
        <div className="hero-buttons">
          <Link to="/cadastro" className="btn-primary">
            Começar Agora <FaArrowRight style={{ marginLeft: 8 }} />
          </Link>
          <Link to="/dashboard" className="btn-secondary">
            <FaPlay style={{ marginRight: 8, fontSize: '0.8em' }} /> Ver Demo
          </Link>
        </div>
      </section>
      <section className="logo-cloud">
        <p
          style={{
            marginBottom: 20,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Confiança de times inovadores em
        </p>
        <div className="logos">
          <span>ACME Corp</span>
          <span>GlobalBank</span>
          <span>TechStart</span>
          <span>InovaLab</span>
          <span>FutureSystems</span>
        </div>
      </section>
      <section className="value-section">
        <div className="value-grid">
          <div className="value-card">
            <div
              style={{
                fontSize: '2rem',
                color: 'var(--primary-color)',
                marginBottom: 15,
              }}
            >
              <FaBrain />
            </div>
            <h3>IA que entende você</h3>
            <p>
              Nossos algoritmos analisam seu perfil atual e identificam lacunas
              invisíveis que impedem sua promoção.
            </p>
          </div>
          <div className="value-card">
            <div
              style={{
                fontSize: '2rem',
                color: 'var(--primary-color)',
                marginBottom: 15,
              }}
            >
              <FaChartLine />
            </div>
            <h3>Dados em Tempo Real</h3>
            <p>
              Conectado ao LinkedIn e O*NET. Se o mercado mudar hoje, sua trilha
              de aprendizado muda amanhã.
            </p>
          </div>
          <div className="value-card">
            <div
              style={{
                fontSize: '2rem',
                color: 'var(--primary-color)',
                marginBottom: 15,
              }}
            >
              <FaRocket />
            </div>
            <h3>Aceleração B2B</h3>
            <p>
              Para empresas: mapeie a força de trabalho inteira e identifique
              quem está pronto para o próximo desafio.
            </p>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <h2>Pronto para evoluir?</h2>
        <p>
          Junte-se a mais de 10.000 profissionais que já estão construindo o
          futuro de suas carreiras com dados, não achismos.
        </p>
        <Link
          to="/cadastro"
          className="btn-primary"
          style={{ backgroundColor: 'white', color: '#0f172a' }}
        >
          Criar Conta Grátis
        </Link>
      </section>
    </div>
  );
};