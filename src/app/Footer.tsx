import { apiUrl } from '../shared/api-client'
import { PhotoCredits } from '../modules/catalog/PhotoCredits'
export function Footer() {
  return (
    <footer className="site-footer" id="about">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={apiUrl('art/logo.svg')} alt="" />
          <h2>
            LET'S BUILD
            <br />
            SOMETHING RAD.
          </h2>
        </div>
        <div>
          <h3>A little about us</h3>
          <p>
            Shopboard-PcParts is a learning project celebrating modern hardware
            and the playful early web.
          </p>
        </div>
        <div className="footer-links">
          <h3>Good to know</h3>
          <a href="#catalog">Explore the parts ↑</a>
          <p>
            Photos represent hardware categories; specifications and USD prices
            are sample data. No real orders.
          </p>
        </div>
      </div>
      <PhotoCredits />
      <div className="footer-bottom container">
        MADE WITH CURIOSITY <span aria-hidden="true">♥</span> AND PIXELS ·
        SHOPBOARD-PCPARTS
      </div>
    </footer>
  )
}
