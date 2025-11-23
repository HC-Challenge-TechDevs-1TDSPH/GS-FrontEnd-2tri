import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import para navegação interna
import { FaSearch, FaChevronDown, FaRegQuestionCircle, FaHeadset, FaArrowRight } from 'react-icons/fa';

// Interface mantida...
interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'Geral' | 'Técnico' | 'Planos e Empresas';
}

export default function FaqPage() {

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const faqData: FaqItem[] = [
    { id: 1, category: 'Geral', question: "O que é o FutureLens?", answer: "O FutureLens é uma plataforma de inteligência de carreira..." },
    { id: 2, category: 'Geral', question: "Frequência de atualização?", answer: "Nossos algoritmos varrem as tendências semanalmente..." },
    { id: 3, category: 'Técnico', question: "Nota de Prontidão?", answer: "Nossa IA compara suas habilidades cadastradas com os requisitos..." },
    { id: 4, category: 'Planos e Empresas', question: "Versão gratuita?", answer: "Sim! O plano gratuito permite cadastrar suas habilidades..." },
    { id: 5, category: 'Planos e Empresas', question: "Para empresas?", answer: "Temos o plano 'FutureLens Corporate'..." },
    { id: 6, category: 'Técnico', question: "Segurança de dados?", answer: "Segurança é nossa prioridade. Utilizamos criptografia..." }
  ];
  const filteredFaq = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  const toggleItem = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="faq-container">
      <div className="faq-content">
        <header className="faq-header">
          <div className="faq-icon-wrapper">
            <FaRegQuestionCircle />
          </div>
          <h1 className="faq-title">Como podemos ajudar?</h1>
          <p className="faq-subtitle">
            Explore nossa base de conhecimento ou tire suas dúvidas sobre como nossa IA trabalha para o seu futuro.
          </p>
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              className="faq-search-input"
              placeholder="Digite sua dúvida..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        <div className="category-tabs">
          {['Todos', 'Geral', 'Técnico', 'Planos e Empresas'].map(cat => (
            <button 
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="faq-list">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item) => (
              <div key={item.id} className={`faq-item ${openIndex === item.id ? 'open' : ''}`}>
                <div className="faq-question" onClick={() => toggleItem(item.id)}>
                  <span>{item.question}</span>
                  <FaChevronDown className="faq-toggle-icon" />
                </div>
                <div className="faq-answer">
                  <div className="answer-content">{item.answer}</div>
                </div>
              </div>
            ))
          ) : (
            <div style={{textAlign: 'center', padding: 40, color: 'var(--text-muted)'}}>
              Nenhuma dúvida encontrada. Tente outro termo.
            </div>
          )}
        </div>
        <div className="faq-footer">
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: 16, color: 'var(--primary-color)'}}>
            <FaHeadset size={40} />
          </div>
          <h3>Ainda tem dúvidas?</h3>
          <p>Não encontrou o que procurava? Nossa equipe especializada está pronta para te ajudar.</p>
          <Link to="/contato" className="contact-btn-link">
            Falar com o Suporte <FaArrowRight />
          </Link>
        </div>

      </div>
    </div>
  );
};