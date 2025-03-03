import React, { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import ChatComponent from '@/components/Chat';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className=''>{children}</main>
      <ChatComponent />
      <Footer />
    </div>
  );
};

export default Layout;
