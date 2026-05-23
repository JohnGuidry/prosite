import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { ProjectGrid } from './components/ProjectGrid';
import { Footer } from './components/Footer';
import { Reveal } from './components/Reveal';
import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Reveal><Timeline /></Reveal>
        <Reveal><ProjectGrid /></Reveal>
        <Reveal><Footer /></Reveal>
      </main>
    </>
  );
}

export default App;
