import SEO from '../components/SEO';
import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'Cegrisa Import',
    description: 'Página Catálogo Para Empresa Vendedora De Cerámicas',
    image: '/cegrisa.webp',
    width: 600,
    height: 400,
    link: 'https://cegrisa.vercel.app',
    demo: 'https://cegrisa.vercel.app',
    github: 'https://github.com/zentpiper/cegrisa',
    tags: ['React', 'Django', 'PostgreSQL'],
    featured: true
  },
  {
    id: 2,
    title: 'H Y G',
    description: 'Página de administración y control para Call Centers',
    image: '/HYG.webp',
    width: 600,
    height: 400,
    link: 'https://ventacenter.vercel.app/home',
    demo: 'https://ventacenter.vercel.app/home',
    github: '',
    tags: ['React', 'Excel', 'JSON'],
    featured: true
  },
  {
    id: 3,
    title: 'Spanglish Academy',
    description: 'Escuela de idiomas en Rusia',
    image: '/Af-academy.png',
    width: 600,
    height: 400,
    link: 'https://af-academy.vercel.app',
    demo: 'https://af-academy.vercel.app',
    github: '',
    tags: ['React', 'Next.js', 'Tailwind'],
    featured: true
  },
];

// Componente para iconos SVG
const Icon = ({ name }) => {
  const icons = {
    external: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    ),
    github: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
    arrow: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    )
  };

  return icons[name] || null;
};

function Portfolio() {
  return (
    <>
      <SEO
        title="Portafolio | Zentpiper - Proyectos Web y Móviles"
        description="Conoce nuestros proyectos de diseño web, aplicaciones móviles y desarrollo de software. Casos de éxito de clientes satisfechos."
        keywords="portafolio web, proyectos desarrollo, diseño web ejemplos, aplicaciones móviles, casos de éxito, zentpiper proyectos"
        canonical="https://zentpiper.com/portafolio"
      />

      <section className="portfolio-section" aria-labelledby="portfolio-title">
        <div className="portfolio-container">
          <header className="portfolio-header">
            <div className="header-content">
              <h1 id="portfolio-title" className="portfolio-title">
                Nuestro Portafolio
              </h1>

              <div className="header-decoration">
                <div className="decoration-line"></div>
              </div>
            </div>
          </header>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-image-container">
                  <img
                    src={project.image}
                    alt={`Captura del proyecto ${project.title}`}
                    className="project-image"
                    loading="lazy"
                    width={project.width}
                    height={project.height}
                  />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.demo && (
                        <a
                          href={project.demo}
                          className="project-link project-link--demo"
                          aria-label={`Ver demo de ${project.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon name="external" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          className="project-link project-link--github"
                          aria-label={`Ver código de ${project.title} en GitHub`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon name="github" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>

                  <div className="project-footer">
                    <div className="project-tags">
                      {project.tags.map(tag => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-actions">
                      <a
                        href={project.link}
                        className="project-cta"
                        aria-label={`Ver detalles del proyecto ${project.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Explorar proyecto</span>
                        <Icon name="arrow" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Portfolio;