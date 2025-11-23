import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Rodape() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-copyright">
            © 2025 FutureLens - Todos os direitos reservados
        </p>
        
        <div className="footer-socials">
          <a href="#" className="footer-social-link" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" className="footer-social-link" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" className="footer-social-link" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="#" className="footer-social-link" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="#" className="footer-social-link" aria-label="Twitter">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};