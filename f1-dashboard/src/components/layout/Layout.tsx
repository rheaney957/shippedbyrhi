import type { ReactNode } from 'react';
import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Container } from './Container';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function Layout({ 
  children, 
  showSidebar = true,
  maxWidth = 'full' 
}: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header onMenuToggle={handleMenuToggle} />
      
      <div className="flex">
        {showSidebar && (
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={handleSidebarClose} 
          />
        )}
        
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          <Container maxWidth={maxWidth} className="py-6">
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
}
