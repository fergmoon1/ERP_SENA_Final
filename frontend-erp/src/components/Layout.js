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
          <div className="work-area-zoom">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout; 