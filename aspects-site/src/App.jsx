import { useEffect } from 'react';
import { Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Prism from './pages/Prism';
import Chapter from './pages/Chapter';
import About from './pages/About';
import Manifesto from './pages/Manifesto';
import Music from './pages/Music';
import Journal from './pages/Journal';
import Film from './pages/Film';
import Contact from './pages/Contact';
import { getChapter } from './data/chapters';

// Dark-surface routes get the dark nav/footer treatment.
const DARK_ROUTES = ['/chapters/reason', '/chapters/art', '/film'];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function ChapterRoute() {
  const { slug } = useParams();
  const chapter = getChapter(slug);
  if (!chapter) return <Navigate to="/prism" replace />;
  return <Chapter key={slug} chapter={chapter} />;
}

export default function App() {
  const { pathname } = useLocation();
  const dark = DARK_ROUTES.includes(pathname);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Nav dark={dark} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/prism" element={<Prism />} />
          <Route path="/chapters/:slug" element={<ChapterRoute />} />
          <Route path="/about" element={<About />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/music" element={<Music />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/film" element={<Film />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer dark={dark} />
    </>
  );
}
