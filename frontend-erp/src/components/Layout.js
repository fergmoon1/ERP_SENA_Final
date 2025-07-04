import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../styles/Layout.css';

const Layout = ({ children, title, subtitle }) => {
  return (
    <div className="container-fluid">
      <Sidebar />
      <main className="contenido">
        <Navbar title={title} subtitle={subtitle} />
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