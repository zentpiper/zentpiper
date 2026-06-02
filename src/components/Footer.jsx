import { usePais } from "../contexts/PaisContext";
import "./Footer.css";

function Footer() {
  const { paisData } = usePais();

  return (
    <footer className="footer">
      <div className="footer-content"></div>

      <div className="footer-bottom">
        <div className="footer-local-seo" style={{ textAlign: 'center', marginBottom: '1.5rem', opacity: '0.8', fontSize: '0.85rem' }}>
          <p><strong>Agencia de Diseño Web, Software y SEO</strong></p>
          <p>Atendiendo desde Santiago de Surco, Lima - Perú y todo Chile.</p>
        </div>
        <div className="footer-bottom-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingRight: '80px', paddingLeft: '20px' }}>
          <div className="footer-bottom-left">
            <a href={`mailto:${paisData.email}`} className="footer-logo">
              <span>{paisData.email}</span>
            </a>
          </div>
          <div className="footer-bottom-right">
            <div className="contact-info-bottom">
              <p>{paisData.telefono}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
