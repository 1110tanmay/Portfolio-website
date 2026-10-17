import { useState } from 'react';
import { SHEETS } from './content';
import { useMouseVars } from './hooks';
import { Footer, Nav } from './sections/Layout';
import Hero from './sections/Hero';
import { HowIWork, Proof } from './sections/Proof';
import Journey from './sections/Journey';
import { Contact, Education, News } from './sections/Closing';
import StorySheet from './components/StorySheet';
import Martha from './components/Martha';

export default function App() {
  useMouseVars();
  const [sheetKey, setSheetKey] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [seed, setSeed] = useState(null);

  const sheet = sheetKey ? SHEETS[sheetKey] : null;
  const askAboutSheet = () => {
    setSeed(`Tell me more about ${sheet.title}.`);
    setSheetKey(null);
    setChatOpen(true);
  };

  return (
    <>
      <Nav />
      <main>
        <Hero onAsk={() => setChatOpen(true)} />
        <Proof onOpen={setSheetKey} />
        <HowIWork />
        <Journey onOpen={setSheetKey} />
        <Education />
        <News />
        <Contact />
      </main>
      <Footer />
      <StorySheet sheet={sheet} onClose={() => setSheetKey(null)} onAsk={askAboutSheet} />
      <Martha open={chatOpen} onOpenChange={setChatOpen} seed={seed} onSeedUsed={() => setSeed(null)} />
    </>
  );
}
