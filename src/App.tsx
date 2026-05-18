import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { ProjectGrid } from './components/ProjectGrid';
import { Footer } from './components/Footer';
import './index.css';

function App() {
  return (
    <main>
      <Hero />
      <Timeline />
      <ProjectGrid />
      <Footer />
    </main>
  );
}

export default App;
