import React from 'react';
import Dashboard from '../src/components/Dashboard';
import Layout from './_layout';

function Index() {
  return (
    <Layout title="Панель управления">
      <Dashboard />
    </Layout>
  );
}

export default Index;
