import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for could not be found." noindex />
      <section className="on-dark flex min-h-[70vh] items-center bg-charcoal py-20 text-center">
        <div className="container-x">
          <p className="eyebrow !text-gold">Error 404</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold text-white sm:text-6xl">This page has slipped away</h1>
          <p className="mx-auto mt-5 max-w-md text-white/70">The page you are looking for does not exist or has moved. Let&rsquo;s get you back to the celebration.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn btn-gold">Back to Home</Link>
            <Link to="/decorations" className="btn btn-outline-light">Explore Decorations</Link>
            <Link to="/dj" className="btn btn-outline-light">DJ MAJHAESTIC</Link>
          </div>
        </div>
      </section>
    </>
  );
}
