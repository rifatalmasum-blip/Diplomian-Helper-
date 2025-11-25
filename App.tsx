import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import RoutineMaker from './components/RoutineMaker';
import Reminder from './components/Reminder';
import Books from './components/Books';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/routine" element={<RoutineMaker />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
