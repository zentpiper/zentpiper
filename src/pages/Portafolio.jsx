import { useMemo, useState } from 'react';
import SEO from '../components/SEO';
import './Portfolio.css';

const projects = [
  // -- Proyectos de agencia Zentpiper --
  {
    id: 'naim-marchionni',
    title: 'Naim Marchionni',
    role: 'Sitio Web Artista',
    description: 'Sitio web para DJ & productor de Tech House.',
    image: '/Naim pág',
    link: 'https://www.naimmarchionni.com',
    github: '',
    tags: ['Next.js', 'React', 'CSS Modules'],
  },
  {
    id: 'cegrisa',
    title: 'Cegrisa Import',
    role: 'Catálogo Web',
    description: 'Página catálogo para empresa vendedora de cerámicas.',
    image: '/cegrisa.webp',
    link: 'https://cegrisa-one.vercel.app',
    github: 'https://github.com/zentpiper/cegrisa',
    tags: ['React', 'Django', 'PostgreSQL'],
  },
  {
    id: 'zentflow',
    title: 'ZentFlow',
    role: 'Plataforma CRM',
    description: 'Sistema CRM de ventas y gestión comercial.',
    image: '/HYG.webp',
    link: 'https://zent-flow.vercel.app',
    github: '',
    tags: ['Next.js', 'React', 'CRM'],
  },
  {
    id: 'spanglish-academy',
    title: 'Spanglish Academy',
    role: 'Sitio Institucional',
    description: 'Escuela de idiomas en Rusia.',
    image: '/Af-academy.png',
    link: 'https://www.spanglishac.com',
    github: '',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 'peruana-en-rusia',
    title: 'Peruana en Rusia',
    role: 'Blog / Comunidad',
    description: 'Blog y comunidad para peruanos residentes en Rusia.',
    image: '/peruanoenrusia_portada.jpg',
    link: 'https://www.peruanaenrusia.com',
    github: '',
    tags: ['React', 'Next.js', 'CSS Modules'],
  },
  {
    id: 'lima-moscow',
    title: 'Lima Moscow',
    role: 'Plataforma de Servicios',
    description: 'Plataforma de servicios y comunidad peruano-rusa.',
    image: '/Restaurantelimamoscow_imagen_portada.jpg',
    link: 'https://limamoscow.ru',
    github: '',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  // -- Proyectos de Barclay Leach / Cernext --
  {
    id: 'cernext',
    title: 'Cernext',
    role: 'Fundador · Full Stack',
    description:
      'Plataforma de agencia digital. Next.js 16, React 19, Supabase, Tailwind CSS y widget de chat con IA.',
    image: '/projects/cernext.webp',
    link: 'https://www.cernextec.com',
    github: '',
    tags: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'SEO'],
  },
  {
    id: 'tayoton',
    title: 'Tayoton Fest',
    role: 'Desarrollo Web · Cernext',
    description:
      'Sitio y venta de entradas para un festival de música. Entradas agotadas en menos de 24 horas.',
    image: '/projects/tayoton.webp',
    link: 'https://tayoton.com',
    github: '',
    tags: ['SEO', 'Ticketing', 'Google Ads'],
  },
  {
    id: 'ketbia',
    title: 'KetBia',
    role: 'Sistemas Web e Infraestructura',
    description:
      'Plataforma full-stack de coaching e influencia digital, con pagos, SEO técnico e infraestructura propia.',
    image: '/projects/ketbia.webp',
    link: 'https://www.ketbia.com/',
    github: '',
    tags: ['React', 'Node.js', 'Pagos', 'SEO'],
  },
  {
    id: 'baronclub',
    title: 'Barón Club',
    role: 'Desarrollo Web y Medios Pagados',
    description:
      'Barbería premium en España. Plugin de reservas en PHP con bot de Telegram, más Google y Meta Ads.',
    image: '/projects/baronclub.webp',
    link: 'https://baronclub.es/',
    github: '',
    tags: ['WordPress', 'PHP', 'Google Ads', 'Meta Ads'],
  },
  {
    id: 'aguxtin',
    title: 'Aguxtin',
    role: 'Desarrollo Frontend',
    description:
      'Landing de scrollytelling con animaciones GSAP, ciclo día/noche y secuencia de respiración guiada.',
    image: '/projects/aguxtin.webp',
    link: 'https://aguxtin.com',
    github: '',
    tags: ['Next.js', 'GSAP', 'WordPress', 'SEO'],
  },
  {
    id: 'lyfgolosinas',
    title: 'L & F Golosinas',
    role: 'Landing Page',
    description:
      'Dulcería en San Ramón, Chanchamayo. Catálogo mayorista y al detalle, conversión por WhatsApp.',
    image: '/projects/lyfgolosinas.webp',
    link: 'https://lyfgolosinas.com',
    github: '',
    tags: ['Next.js', 'Tailwind CSS', 'SEO', 'WhatsApp'],
  },
  {
    id: 'jhefbarberz',
    title: 'JHEF BARBERZ',
    role: 'Desarrollo Frontend',
    description:
      'Sitio de marca para barbería peruana. Framer Motion, reserva por WhatsApp con detección de horario.',
    image: '/projects/jhefbarberz.webp',
    link: 'https://jhefbarberz.vercel.app/',
    github: '',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'maxgrind',
    title: 'MaXGrind',
    role: 'Desarrollo de Apps Móviles',
    description:
      'App de seguimiento fitness para gimnasio, migrando a React Native con backend en Supabase.',
    image: '/projects/maxgrind.webp',
    link: 'https://www.maxgrind.app/es',
    github: '',
    tags: ['React Native', 'Expo', 'Supabase', 'PostgreSQL'],
    wip: true,
  },
  {
    id: 'artesana',
    title: 'El Hada Artesana',
    role: 'Desarrollo Frontend',
    description:
      'Landing page para negocio artesanal local, frontend responsive con arquitectura por componentes.',
    image: '/projects/artesana.webp',
    link: '',
    github: '',
    tags: ['React', 'SASS', 'JavaScript'],
    private: true,
  },
];

const getDomain = (url) => {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, '').toUpperCase();
  } catch {
    return null;
  }
};

// Componente para iconos SVG
const Icon = ({ name }) => {
  const icons = {
    external: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    ),
    github: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
  };

  return icons[name] || null;
};

function Portfolio() {
  const [activeTag, setActiveTag] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allTags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const visibleProjects = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  const toggleTag = (tag) => {
    setActiveTag((current) => (current === tag ? null : tag));
  };

  return (
    <>
      <SEO
        title="Portafolio | Zentpiper - Proyectos Web y Móviles"
        description="Conoce nuestros proyectos de diseño web, aplicaciones móviles y desarrollo de software. Casos de éxito de clientes satisfechos."
        keywords="portafolio web, proyectos desarrollo, diseño web ejemplos, aplicaciones móviles, casos de éxito, zentpiper proyectos"
        canonical="https://zentpiper.com/portafolio"
      />

      <section className="folio-section" aria-labelledby="folio-title">
        <div className="folio-container">
          <header className="folio-bar">
            <span id="folio-title" className="folio-brand">ZTP&nbsp;//&nbsp;PORTAFOLIO</span>

            <div className="folio-filter">
              <button
                type="button"
                className={`folio-filter-toggle ${filtersOpen ? 'is-open' : ''}`}
                onClick={() => setFiltersOpen((v) => !v)}
                aria-expanded={filtersOpen}
              >
                [{filtersOpen ? '-' : '+'}] FILTRAR TAGS
              </button>

              {filtersOpen && (
                <div className="folio-filter-panel">
                  <button
                    type="button"
                    className={`folio-chip ${activeTag === null ? 'is-active' : ''}`}
                    onClick={() => setActiveTag(null)}
                  >
                    TODOS
                  </button>
                  {allTags.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      className={`folio-chip ${activeTag === tag ? 'is-active' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="folio-count">{visibleProjects.length} PROYECTOS</span>

            <a href="/contacto" className="folio-about">[?]&nbsp;CONTACTO</a>
          </header>

          <div className="folio-grid">
            {visibleProjects.map((project) => {
              const domain = getDomain(project.link);
              const rightMeta = project.private
                ? 'PRIVADO'
                : project.wip
                  ? 'EN PROGRESO'
                  : domain || 'PRIVADO';

              return (
                <article className="folio-card" key={project.id}>
                  <div className="folio-image-wrap">
                    <img
                      src={project.image}
                      alt={`Captura del proyecto ${project.title}`}
                      className="folio-image"
                      loading="lazy"
                    />
                    <div className="folio-image-actions">
                      {project.link && (
                        <a
                          href={project.link}
                          className="folio-icon-link"
                          aria-label={`Ver sitio de ${project.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon name="external" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          className="folio-icon-link"
                          aria-label={`Ver código de ${project.title} en GitHub`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon name="github" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="folio-info">
                    <h3 className="folio-name">{project.title}</h3>
                    <p className="folio-desc">{project.description}</p>

                    <div className="folio-tags">
                      {project.tags.map((tag) => (
                        <button
                          type="button"
                          key={tag}
                          className={`folio-tagpill ${activeTag === tag ? 'is-active' : ''}`}
                          onClick={() => toggleTag(tag)}
                        >
                          [{tag.toUpperCase()}]
                        </button>
                      ))}
                    </div>

                    <div className="folio-meta">
                      <span className="folio-meta-marker">&lt;</span>
                      <span className="folio-meta-role">{project.role}</span>
                      <span className="folio-meta-sep">/</span>
                      <span className="folio-meta-domain">{rightMeta}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Portfolio;
