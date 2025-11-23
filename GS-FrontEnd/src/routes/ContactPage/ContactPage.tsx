import React, { useState } from 'react';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaTwitter, FaLinkedinIn, FaInstagram, FaPaperPlane 
} from 'react-icons/fa';

export default function ContactPage(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Mensagem enviada com sucesso!');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <div className="contact-info">
          <div>
            <h2>Fale Conosco</h2>
            <p>Estamos prontos para ajudar sua carreira ou sua empresa a atingir o próximo nível. Envie uma mensagem!</p>
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon-box"><FaPhone /></div>
                <div className="info-text">
                  <h4>Telefone</h4>
                  <p>+55 (11) 99999-8888</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon-box"><FaEnvelope /></div>
                <div className="info-text">
                  <h4>Email</h4>
                  <p>contato@futurelens.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon-box"><FaMapMarkerAlt /></div>
                <div className="info-text">
                  <h4>Escritório</h4>
                  <p>Av. Paulista, 1000 - São Paulo, SP</p>
                </div>
              </div>
            </div>
          </div>
          <div className="social-links-row">
            <a href="#" className="social-btn-circle"><FaTwitter /></a>
            <a href="#" className="social-btn-circle"><FaLinkedinIn /></a>
            <a href="#" className="social-btn-circle"><FaInstagram /></a>
          </div>
        </div>
        <div className="contact-form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Seu Nome</label>
              <input 
                type="text" name="name" className="form-input" 
                placeholder="Ex: João Silva" required
                value={formData.name} onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Seu Email</label>
              <input 
                type="email" name="email" className="form-input" 
                placeholder="joao@exemplo.com" required
                value={formData.email} onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Assunto</label>
              <input 
                type="text" name="subject" className="form-input" 
                placeholder="Ex: Dúvida sobre o plano Premium"
                value={formData.subject} onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mensagem</label>
              <textarea 
                name="message" className="form-textarea" 
                placeholder="Como podemos ajudar você hoje?" required
                value={formData.message} onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : <><FaPaperPlane /> Enviar Mensagem</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};