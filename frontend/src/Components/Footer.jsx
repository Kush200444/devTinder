const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="app-footer__glow" aria-hidden="true" />
      <div className="app-footer__content">
        <div className="app-footer__brand-block">
          <a href="/feed" className="app-footer__brand">DevTinder</a>
          <p className="app-footer__tagline">
            Match with developers who build fast, think deep, and ship clean.
          </p>
          <div className="app-footer__socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">X</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>

        <nav className="app-footer__links" aria-label="Footer links">
          <h6>Product</h6>
          <a href="/feed">Discover</a>
          <a href="/connections">Connections</a>
          <a href="/requests">Requests</a>
        </nav>

        <nav className="app-footer__links" aria-label="Company links">
          <h6>Company</h6>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </nav>

        <nav className="app-footer__links" aria-label="Legal links">
          <h6>Legal</h6>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookie Policy</a>
        </nav>
      </div>

      <div className="app-footer__bottom">
        <p>Copyright {currentYear} DevTinder. All rights reserved.</p>
        <p>Built for meaningful developer networking.</p>
      </div>
    </footer>
  );
};

export default Footer;