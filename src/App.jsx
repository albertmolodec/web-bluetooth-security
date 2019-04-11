import React from 'react';
import './App.css';
import Bulb from './components/Bulb';

function App() {
  return (
    <div className="app">
      <header>
        Лампочка{' '}
        <span role="img" aria-label="лампочка">
          💡
        </span>
      </header>
      <main>
        <Bulb />
      </main>
      <footer>Альберт Абдульманов, 2019</footer>
    </div>
  );
}

export default App;
