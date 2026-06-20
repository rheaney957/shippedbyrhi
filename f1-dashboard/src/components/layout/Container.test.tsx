import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders children', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default full width', () => {
    const { container } = render(
      <Container>
        <div>Content</div>
      </Container>
    );
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain('max-w-full');
  });

  it('applies custom max width', () => {
    const { container } = render(
      <Container maxWidth="lg">
        <div>Content</div>
      </Container>
    );
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain('max-w-screen-lg');
  });

  it('applies all max width options correctly', () => {
    const maxWidths: Array<'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'> = 
      ['sm', 'md', 'lg', 'xl', '2xl', 'full'];
    
    maxWidths.forEach(maxWidth => {
      const { container } = render(
        <Container maxWidth={maxWidth}>
          <div>Content</div>
        </Container>
      );
      const containerDiv = container.firstChild as HTMLElement;
      
      const expectedClass = maxWidth === 'full' 
        ? 'max-w-full' 
        : `max-w-screen-${maxWidth}`;
      
      expect(containerDiv.className).toContain(expectedClass);
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Content</div>
      </Container>
    );
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain('custom-class');
  });

  it('applies responsive padding classes', () => {
    const { container } = render(
      <Container>
        <div>Content</div>
      </Container>
    );
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain('px-4');
    expect(containerDiv.className).toContain('sm:px-6');
    expect(containerDiv.className).toContain('lg:px-8');
  });

  it('centers content with mx-auto', () => {
    const { container } = render(
      <Container>
        <div>Content</div>
      </Container>
    );
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv.className).toContain('mx-auto');
  });
});
