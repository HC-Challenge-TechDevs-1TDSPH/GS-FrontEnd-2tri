'use client';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaEye } from 'react-icons/fa';


export default function Header() {
    const location = useLocation();
    
    const [fontSize, setFontSize] = useState<number>(16);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkTheme(true);
        }
    }, []);

    const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
    const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const isActive = (path: string) => location.pathname === path;
    const getLinkClassName = (path: string) => `nav-link ${isActive(path) ? 'nav-link-active' : ''}`;
    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/trilhas', label: 'Trilhas' },
        { path: '/tendencias', label: 'Tendências' },
        { path: '/comparativo', label: 'Mercado' },
        { path: '/b2b', label: 'Empresas' },
        { path: '/integrantes', label: 'Equipe' },
        { path: '/sobre', label: 'Sobre' },
        { path: '/faq', label: 'FAQ' },
        { path: '/contato', label: 'Contato' },
    ];

    return (
        <>
            <div className="accessibility-bar">
                <div className="accessibility-bar-container">
                    <span>Acessibilidade e Preferências</span>
                    <div className="acc-controls">
                        <button onClick={decreaseFontSize} className="accessibility-button" title="Diminuir fonte">A-</button>
                        <button onClick={increaseFontSize} className="accessibility-button" title="Aumentar fonte">A+</button>
                        <button onClick={toggleTheme} className="theme-toggle-button" title="Alternar tema">
                            {isDarkTheme ? <FaSun color="#f59e0b" /> : <FaMoon />}
                            <span>{isDarkTheme ? 'Modo Claro' : 'Modo Escuro'}</span>
                        </button>
                    </div>
                </div>
            </div>
            <header className="header">
                <div className="header-container">
                    <Link to="/" className="header-logo-link" onClick={closeMenu}>
                        <FaEye className="logo-icon" size={32} />
                        <span>FutureLens</span>
                    </Link>
                    <nav className="nav-desktop">
                        <div className="nav-links-group">
                            {navLinks.map(link => (
                                <Link 
                                    key={link.path} 
                                    to={link.path} 
                                    className={getLinkClassName(link.path)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="auth-buttons-group">
                            <Link to='/login' className="btn-login-ghost">
                                Entrar
                            </Link>
                            <Link to='/cadastro' className="btn-register-solid">
                                Iniciar
                            </Link>
                        </div>
                    </nav>
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className={`hamburger-button ${isMenuOpen ? 'open' : ''}`} 
                        aria-label="Menu"
                    >
                        <span></span>
                    </button>
                </div>
                {isMenuOpen && (
                    <nav className="nav-mobile">
                        {navLinks.map(link => (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                onClick={closeMenu} 
                                className={getLinkClassName(link.path)}
                                style={{padding: '12px 0', borderBottom: '1px solid var(--border-color)'}}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:10}}>
                            <Link to='/login' onClick={closeMenu} className="btn-login-ghost" style={{textAlign:'center', background:'var(--bg-color)'}}>Entrar</Link>
                            <Link to='/cadastro' onClick={closeMenu} className="btn-register-solid" style={{textAlign:'center'}}>Criar Conta</Link>
                        </div>
                    </nav>
                )}
            </header>
        </>
    );
}