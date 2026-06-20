import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';

function renderLayout(props = {}) {
  const defaultProps = {
    children: <div>Test Content</div>,
  };
  
  return render(
    <BrowserRouter>
      <Layout {...defaultProps} {...props} />
    </BrowserRouter>
  );
}

describe('Layout', () => {
  it('renders children content', () => {
    renderLayout();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Header component', () => {
    renderLayout();
    expect(screen.getByText('OpenF1 Dashboard')).toBeInTheDocument();
  });

  it('renders Sidebar by default', () => {
    renderLayout();
    // Check for Quick Links which is unique to sidebar
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
  });

  it('does not render Sidebar when showSidebar is false', () => {
    renderLayout({ showSidebar: false });
    // Dashboard link in sidebar should not be present, but header still shows it
    const dashboardLinks = screen.getAllByText('Dashboard');
    // Only the header link should be present (in desktop nav)
    expect(dashboardLinks.length).toBeLessThan(2);
  });

  it('toggles sidebar when header menu button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = renderLayout();
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    
    // Sidebar should be closed initially on mobile
    const sidebar = container.querySelector('aside');
    expect(sidebar?.className).toContain('-translate-x-full');
    
    // Click to open
    await user.click(menuButton);
    expect(sidebar?.className).toContain('translate-x-0');
  });

  it('applies custom maxWidth to Container', () => {
    const { container } = renderLayout({ maxWidth: 'lg' });
    const containerDiv = container.querySelector('.max-w-screen-lg');
    expect(containerDiv).toBeInTheDocument();
  });

  it('renders main content area', () => {
    const { container } = renderLayout();
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main?.className).toContain('flex-1');
  });

  it('has proper responsive layout structure', () => {
    const { container } = renderLayout();
    const flexContainer = container.querySelector('.flex');
    expect(flexContainer).toBeInTheDocument();
  });

  it('applies min-height to prevent short content issues', () => {
    const { container } = renderLayout();
    const main = container.querySelector('main');
    expect(main?.className).toContain('min-h-[calc(100vh-64px)]');
  });

  it('applies background color classes', () => {
    const { container } = renderLayout();
    const wrapper = container.querySelector('.min-h-screen');
    expect(wrapper?.className).toContain('bg-gray-50');
    expect(wrapper?.className).toContain('dark:bg-gray-950');
  });
});
