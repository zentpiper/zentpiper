import { usePais } from "../contexts/PaisContext";
import "./Footer.css";

function Footer() {
  const { paisData } = usePais();

  return (
    <footer className="footer">
      <div className="footer-content"></div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span className="footer-brand">ZENTPIPER SOFTWARE</span>
        </div>
        <div className="footer-bottom-center">
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
    </footer>
  );
}

export default Footer;
