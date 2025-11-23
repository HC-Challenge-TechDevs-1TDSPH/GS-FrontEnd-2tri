import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEnvelope, FaLock, FaUser } from 'react-icons/fa'; 
import { API_BASE_URL } from '../../services/api';
import type { Usuario, LoginRequest } from '../../types';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '',
    username: '', 
    email: '',
    senha: '',
    confirmarSenha: '',
    aceitaTermos: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
        if (isLogin) {
            const loginData: LoginRequest = {
                login: formData.email, 
                senha: formData.senha
            };

            const response = await fetch(`${API_BASE_URL}/usuarios/login`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('userId', user.idUsuario.toString());
                localStorage.setItem('userName', user.nome);
                navigate('/dashboard');
            } else {
                alert('Email ou senha inválidos.');
            }

        } else {
            if (formData.senha !== formData.confirmarSenha) {
                alert("Senhas não conferem!");
                setIsLoading(false);
                return;
            }

            const novoUsuario: Usuario = {
              nome: formData.nome,
              username: formData.email.split('@')[0],
              email: formData.email,
              senha: formData.senha,
              dataDeCadastro: new Date().toISOString().split('T')[0],
              idUsuario: 0 
            };

            const response = await fetch(`${API_BASE_URL}/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoUsuario)
            });

            if (response.ok) {
                alert("Conta criada com sucesso! Faça login.");
                setIsLogin(true); // Troca para a tela de login automaticamente
                // Limpa a senha para o usuário digitar novamente (segurança)
                setFormData(prev => ({ ...prev, senha: '', confirmarSenha: '' }));
            } else {
                alert("Erro ao criar conta. Verifique os dados.");
            }
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Erro de conexão com o servidor.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{display:'flex', justifyContent:'center', gap:10, alignItems:'center', fontSize:'1.5rem', fontWeight:'bold', marginBottom:10}}>
            <FaEye style={{color:'var(--primary-color)'}} />
            <span>FutureLens</span>
          </div>
          <h2>{isLogin ? 'Bem-vindo' : 'Crie sua conta'}</h2>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <FaUser className="input-icon" />
              <input type="text" name="nome" placeholder="Nome completo" className="form-input" value={formData.nome} onChange={handleChange} required />
            </div>
          )}
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input type="email" name="email" placeholder="Email" className="form-input" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="password" name="senha" placeholder="Senha" className="form-input" value={formData.senha} onChange={handleChange} required />
          </div>
          {!isLogin && (
            <>
              <div className="input-group">
                <FaLock className="input-icon" />
                <input type="password" name="confirmarSenha" placeholder="Confirme a senha" className="form-input" value={formData.confirmarSenha} onChange={handleChange} required />
              </div>
              <label style={{display:'flex', gap:10, fontSize:'0.9rem', marginBottom:15}}>
                <input type="checkbox" name="aceitaTermos" checked={formData.aceitaTermos} onChange={handleChange} required />
                Li e aceito os Termos de Uso.
              </label>
            </>
          )}
          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
          </button>
          <div className="auth-footer">
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="link-toggle">
              {isLogin ? 'Não tem conta? Crie agora' : 'Já tem conta? Entre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}