# Layout Components

This directory contains the basic layout components for the OpenF1 Dashboard application.

## Components

### Header

The Header component displays the app title, logo, and navigation. It includes responsive behavior with a mobile menu.

**Props:**
- `onMenuToggle?: () => void` - Optional callback when the mobile menu button is clicked

**Features:**
- Sticky positioning at top of viewport
- Mobile hamburger menu (< 1024px)
- Desktop navigation bar (≥ 1024px)
- Link to home page and external OpenF1 API

**Usage:**
```tsx
import { Header } from './components/layout';

function App() {
  return <Header onMenuToggle={() => console.log('Menu toggled')} />;
}
```

### Container

The Container component provides consistent horizontal spacing and max-width constraints for content areas.

**Props:**
- `children: ReactNode` - Content to be wrapped
- `className?: string` - Additional CSS classes
- `maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'` - Maximum width constraint (default: 'full')

**Features:**
- Responsive padding (4 on mobile, 6 on tablet, 8 on desktop)
- Centered content with `mx-auto`
- Configurable max-width constraints

**Usage:**
```tsx
import { Container } from './components/layout';

function Page() {
  return (
    <Container maxWidth="lg">
      <h1>Page Content</h1>
    </Container>
  );
}
```

### Sidebar

The Sidebar component provides desktop navigation and a mobile drawer menu.

**Props:**
- `isOpen: boolean` - Controls sidebar visibility (primarily for mobile)
- `onClose: () => void` - Callback when sidebar should close

**Features:**
- Fixed position with overlay on mobile (< 1024px)
- Sticky position on desktop (≥ 1024px)
- Smooth slide-in/out transitions
- Active route highlighting
- Quick links section

**Usage:**
```tsx
import { Sidebar } from './components/layout';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Sidebar 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
    />
  );
}
```

### Layout

The Layout component is a wrapper that combines Header, Sidebar, and Container into a complete page layout.

**Props:**
- `children: ReactNode` - Page content
- `showSidebar?: boolean` - Whether to show the sidebar (default: true)
- `maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'` - Max width for content container (default: 'full')

**Features:**
- Manages sidebar open/close state
- Coordinates Header and Sidebar interaction
- Applies consistent background colors
- Responsive layout structure

**Usage:**
```tsx
import { Layout } from './components/layout';

function DashboardPage() {
  return (
    <Layout maxWidth="xl">
      <h1>Dashboard</h1>
      <p>Your content here</p>
    </Layout>
  );
}

// Without sidebar
function LandingPage() {
  return (
    <Layout showSidebar={false}>
      <h1>Welcome</h1>
    </Layout>
  );
}
```

## Responsive Breakpoint Strategy

The layout components implement the following responsive breakpoints as specified in Requirement 16:

### Breakpoints

| Device | Screen Width | Tailwind Prefix | Behavior |
|--------|-------------|-----------------|----------|
| Mobile | < 768px | (base) | Single column, hamburger menu, mobile sidebar drawer |
| Tablet | 768px - 1023px | `md:` | Responsive padding, condensed layout |
| Desktop | ≥ 1024px | `lg:` | Full navigation, sticky sidebar, expanded layout |

### Implementation Details

**Header:**
- Mobile: Hamburger menu button visible, navigation hidden
- Desktop: Full horizontal navigation bar, menu button hidden

**Sidebar:**
- Mobile: Fixed position drawer with overlay, slides in from left
- Desktop: Sticky sidebar, always visible, no overlay

**Container:**
- Mobile: `px-4` (16px horizontal padding)
- Tablet: `sm:px-6` (24px horizontal padding)
- Desktop: `lg:px-8` (32px horizontal padding)

**Layout Structure:**
```
Desktop (≥ 1024px):
┌─────────────────────────────┐
│         Header              │
├──────┬──────────────────────┤
│      │                      │
│ Side │   Main Content       │
│ bar  │   (Container)        │
│      │                      │
└──────┴──────────────────────┘

Mobile (< 1024px):
┌─────────────────────────────┐
│  Header (+ Menu Button)     │
├─────────────────────────────┤
│                             │
│      Main Content           │
│      (Full Width)           │
│                             │
└─────────────────────────────┘
[Sidebar slides in as drawer]
```

## Testing

All components have comprehensive unit tests covering:
- Rendering and basic functionality
- Responsive behavior
- User interactions (clicks, toggles)
- Accessibility attributes
- Proper prop handling
- Edge cases

Run tests with:
```bash
npm test src/components/layout
```

## Accessibility

The layout components follow accessibility best practices:
- Semantic HTML elements (`header`, `nav`, `aside`, `main`)
- ARIA attributes (`aria-expanded`, `aria-label`, `aria-hidden`)
- Keyboard navigation support
- Proper focus management
- Screen reader friendly structure

## Requirements Validation

These components satisfy the following requirements:

- **Req 16.1**: Desktop layout adapts for screens ≥ 1024px
- **Req 16.2**: Tablet layout adapts for screens 768px - 1023px
- **Req 16.3**: Mobile layout adapts for screens < 768px
- **Req 16.4**: Full functionality maintained across all screen sizes
