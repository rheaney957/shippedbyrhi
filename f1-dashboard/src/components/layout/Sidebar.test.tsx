import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';

function renderSidebar(props = {}) {
  const defaultProps = {
    isOpen: false,
    onClose: vi.fn(),
  };
  
  return render(
    <BrowserRouter>
      <Sidebar {...defaultProps} {...props} />
    </BrowserRouter>
  );
}

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders navigation menu', () => {
    renderSidebar({ isOpen: true });
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders Quick Links section', () => {
    renderSidebar({ isOpen: true });
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
  });

  it('renders external link to OpenF1 API', () => {
    renderSidebar({ isOpen: true });
    const apiLink = screen.getByRole('link', { name: /OpenF1 API/i });
    expect(apiLink).toHaveAttribute('href', 'https://openf1.org');
    expect(apiLink).toHaveAttribute('target', '_blank');
    expect(apiLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders copyright footer', () => {
    renderSidebar({ isOpen: true });
    expect(screen.getByText(/© 2024 OpenF1 Dashboard/)).toBeInTheDocument();
  });

  it('applies translate-x-0 when isOpen is true', () => {
    const { container } = renderSidebar({ isOpen: true });
    const sidebar = container.querySelector('aside');
    expect(sidebar?.className).toContain('translate-x-0');
  });

  it('applies -translate-x-full when isOpen is false on mobile', () => {
    const { container } = renderSidebar({ isOpen: false });
    const sidebar = container.querySelector('aside');
    expect(sidebar?.className).toContain('-translate-x-full');
  });

  it('shows mobile header with close button when open', () => {
    renderSidebar({ isOpen: true });
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = renderSidebar({ isOpen: true, onClose });
    
    const overlay = container.querySelector('.fixed.inset-0.bg-black');
    if (overlay) {
      await user.click(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderSidebar({ isOpen: true, onClose });
    
    const closeButton = screen.getByRole('button', { name: /close menu/i });
    await user.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders mobile overlay when open', () => {
    const { container } = renderSidebar({ isOpen: true });
    const overlay = container.querySelector('.fixed.inset-0.bg-black');
    expect(overlay).toBeInTheDocument();
  });

  it('does not render mobile overlay when closed', () => {
    const { container } = renderSidebar({ isOpen: false });
    const overlay = container.querySelector('.fixed.inset-0.bg-black');
    expect(overlay).not.toBeInTheDocument();
  });

  it('highlights active route', () => {
    renderSidebar({ isOpen: true });
    const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });
    expect(dashboardLink.className).toContain('bg-f1-red');
  });

  it('has proper accessibility attributes', () => {
    const { container } = renderSidebar({ isOpen: true });
    const sidebar = container.querySelector('aside');
    expect(sidebar).toBeInTheDocument();
    
    const overlay = container.querySelector('[aria-hidden="true"]');
    expect(overlay).toBeInTheDocument();
  });
});
