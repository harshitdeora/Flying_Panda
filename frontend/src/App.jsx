import { useState } from 'react';
import AlertForm from './components/AlertForm';
import AlertList from './components/AlertList';
import './styles.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAlertCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="app">
      <header>
        <h1>🛫 Visa Slot Alert Tracker</h1>
        <p>The Flying Panda - Internal Tool</p>
      </header>
      <main>
        <AlertForm onAlertCreated={handleAlertCreated} />
        <AlertList refreshTrigger={refreshTrigger} />
      </main>
    </div>
  );
}

export default App;





