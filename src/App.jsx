import CertificateGenerator from './components/CertificateGenerator';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Automatic Certificate Generator</h1>
        <p>Enter your name and course to generate a personalized certificate</p>
      </header>
      <main>
        <CertificateGenerator />
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Certificate Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
