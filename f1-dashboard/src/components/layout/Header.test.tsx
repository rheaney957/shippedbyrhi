import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

function renderHeader(props = {}) {
  return render(
    <BrowserRouter>
      <Header {...props} />
    </BrowserRouter>
  );
}

describe('Header', () => {
  it('renders the app title', () => {
    renderHeader();
    expect(screen.getByText('OpenF1 Dashboard')).toBeInTheDocument();
  });

  it('renders the F1 logo', () => {
    renderHeader();
    expect(screen.getByText('F1')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    renderHeader();
    const dashboardLinks = screen.getAllByText('Dashboard');
    expect(dashboardLinks.length).toBeGreaterThan(0);
    
    const apiLinks = screen.getAllByText('OpenF1 API');
    expect(apiLinks.length).toBeGreaterThan(0);
  });

  it('has link to home page', () => {
    renderHeader();
    const homeLinks = screen.getAllByRole('link', { name: /OpenF1 Dashboard/i });
    expect(homeLinks[0]).toHaveAttribute('href', '/');
  });

  it('has external link to OpenF1 API', () => {
    renderHeader();
    const apiLinks = screen.getAllByRole('link', { name: /OpenF1 API/i });
    const externalLink = Array.from(apiLinks).find(
      link => link.getAttribute('href') === 'https://openf1.org'
    );
    expect(externalLink).toBeDefined();
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders mobile menu button', () => {
    renderHeader();
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    
    // Menu should be closed initially
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    // Click to open
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    // Click to close
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls onMenuToggle callback when menu button is clicked', async () => {
    const user = userEvent.setup();
    const onMenuToggle = vi.fn();
    renderHeader({ onMenuToggle });
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    await user.click(menuButton);
    
    expect(onMenuToggle).toHaveBeenCalledTimes(1);
  });

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup();
    renderHeader();
    
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    
    // Open menu
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    // Click a nav link in mobile menu
    const dashboardLinks = screen.getAllByText('Dashboard');
    const mobileLink = dashboardLinks.find(link => 
      link.closest('nav')?.classList.contains('lg:hidden')
    );
    
    if (mobileLink) {
      await user.click(mobileLink);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    }
  });
});
