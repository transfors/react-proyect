import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Menu from './components/Menu';
import Mesas from "./components/Mesas";
import Ticket from "./components/Ticket";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Mesas />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/ticket" element={<Ticket />} />
        </Routes> 
      </Layout> 
    </BrowserRouter>
  );
};

export default App;
