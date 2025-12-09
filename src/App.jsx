import "./App.css";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import ScrollRestoration from "./components/ScrollRestoration";

// Lazy loading de páginas para mejor rendimiento
const Home = lazy(() => import("./pages/Home"));
const Planes = lazy(() => import("./pages/Planes"));
const Contacto = lazy(() => import("./pages/Contacto"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Portafolio = lazy(() => import("./pages/Portafolio"));
const Mobile = lazy(() => import("./pages/Mobile"));
const Proyecto = lazy(() => import("./pages/Proyecto"));

// Componente de carga
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    color: 'var(--accent-color)',
    fontSize: '1.2rem'
  }}>
    <div className="loading-spinner">Cargando...</div>
  </div>
);

function App() {
  return (
    <Layout>
      <ScrollRestoration />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/portafolio" element={<Portafolio />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/proyecto" element={<Proyecto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
