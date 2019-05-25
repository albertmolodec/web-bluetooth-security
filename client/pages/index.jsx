import React from 'react';
import Dashboard from '../src/components/Dashboard';
import Main from './_layout';

function Index() {
  return (
    <Main title="Панель управления">
      <Dashboard />
    </Main>
  );
}

export default Index;
