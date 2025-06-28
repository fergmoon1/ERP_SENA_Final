import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <Sidebar />
      <main className="contenido">
        <Navbar />
        <section className="work-area">
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout; 