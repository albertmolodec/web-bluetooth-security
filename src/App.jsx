import React from 'react';
import './App.css';
import MainPage from './pages/main';

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
        <MainPage />
      </main>
      <footer>Альберт Абдульманов, 2019</footer>
    </div>
  );
}

export default App;
