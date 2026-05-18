import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import './index.css';

function App() {
  const handleDeepDive = (id: string) => {
    console.log("Deep dive for:", id);
  };

  return (
    <main>
      <Hero />
      <Timeline onDeepDive={handleDeepDive} />
    </main>
  );
}

export default App;
