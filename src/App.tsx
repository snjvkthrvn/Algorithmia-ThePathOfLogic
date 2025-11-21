import { PhaserGame } from './components/PhaserGame';
import { useGameStore } from './store/gameStore';

function App() {
  const { puzzlesCompleted, codexEntriesUnlocked } = useGameStore();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <PhaserGame />

      {/* Debug info overlay - remove in production */}
      <div className="absolute top-4 right-4 bg-black/70 text-white p-4 rounded-lg text-sm font-mono">
        <div className="text-xs text-gray-400 mb-2">Debug Info</div>
        <div>Puzzles: {puzzlesCompleted}</div>
        <div>Codex Entries: {codexEntriesUnlocked}</div>
      </div>
    </div>
  );
}

export default App;
