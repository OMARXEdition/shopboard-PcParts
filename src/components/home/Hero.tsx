import { apiUrl } from '../../shared/api-client'
import { ReactiveBackground } from './ReactiveBackground'
export function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <ReactiveBackground />
        <div className="container">
          <div className="hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true">✦</span> YOUR NEXT BUILD STARTS HERE
            </p>
            <h1 className="hero-title">
              MODERN PARTS.
              <br />
              <span>
                OLD-SCHOOL
                <br />
                SOUL.
              </span>
            </h1>
            <p>
              Big ideas. Little pixels. All the parts for your next great PC
              adventure.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#catalog">
                ✦ Browse parts
              </a>
              <a className="secondary-button" href="#about">
                Our story ↗
              </a>
            </div>
            <p className="hero-caption">
              <span className="numeric">100%</span> pixel personality. Zero
              floppy disks required.
            </p>
          </div>
          <div className="hero-art-wrap">
            <span className="hero-spark spark-one" aria-hidden="true">
              ✦
            </span>
            <img
              className="hero-art"
              src={apiUrl('art/hero.svg')}
              alt="Detailed pixel-art CRT desktop computer, keyboard, and retro case"
            />
            <div className="hero-tag">
              BUILT FOR YOUR
              <br />
              <strong>NEXT LEVEL</strong>
            </div>
          </div>
        </div>
      </section>
      <div className="intro-strip">
        <div className="container">
          <div className="intro-greeting">
            <span aria-hidden="true">☺</span>
            <strong>HELLO, BUILDER!</strong>
          </div>
          <p>
            A fresh start.
            <br />
            One good part at a time.
          </p>
          <div className="benefits">
            <div className="benefit">
              ◇<span>REAL POSSIBILITIES</span>
            </div>
            <div className="benefit">
              ▧<span>PIXEL PERFECT</span>
            </div>
            <div className="benefit">
              ✦<span>BUILD YOUR WAY</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
