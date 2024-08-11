import React, { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className=''>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;