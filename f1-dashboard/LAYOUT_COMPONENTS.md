# Layout Components Implementation - Task 1.6

This document describes the implementation of the basic layout components for the OpenF1 Dashboard.

## Components Implemented

### 1. Header Component
- **Location**: `src/components/layout/Header.tsx`
- **Features**:
  - App title and F1 logo
  - Responsive navigation (desktop horizontal bar, mobile hamburger menu)
  - Sticky positioning at top of viewport
  - External link to OpenF1 API
  - Mobile menu toggle with animation

### 2. Container Component
- **Location**: `src/components/layout/Container.tsx`
- **Features**:
  - Consistent horizontal spacing across breakpoints
  - Configurable max-width constraints (sm, md, lg, xl, 2xl, full)
  - Responsive padding (px-4 on mobile, px-6 on tablet, px-8 on desktop)
  - Centered content with mx-auto

### 3. Sidebar Component
- **Location**: `src/components/layout/Sidebar.tsx`
- **Features**:
  - Desktop: sticky sidebar with navigation
  - Mobile: slide-in drawer with overlay
  - Active route highlighting
  - Quick links section
  - Smooth transitions
  - Close button and overlay for mobile

### 4. Layout Component
- **Location**: `src/components/layout/Layout.tsx`
- **Features**:
  - Wraps Header, Sidebar, and Container
  - Manages sidebar state
  - Configurable max-width
  - Optional sidebar visibility
  - Responsive structure

## Responsive Breakpoint Strategy

The implementation follows Requirement 16 specifications:

| Breakpoint | Screen Width | Behavior |
|------------|--------------|----------|
| Mobile | < 768px | Single column, hamburger menu, drawer sidebar |
| Tablet | 768px - 1023px | Responsive padding, condensed layout |
| Desktop | ≥ 1024px | Full navigation, sticky sidebar |

### Tailwind Breakpoints Used
- Base (mobile): Default styles
- `sm:` (640px): Intermediate breakpoint for padding
- `md:` (768px): Tablet styles
- `lg:` (1024px): Desktop styles

## Files Created

```
src/components/layout/
├── Header.tsx              # Header with navigation
├── Header.test.tsx         # Header unit tests
├── Container.tsx           # Container with spacing
├── Container.test.tsx      # Container unit tests
├── Sidebar.tsx             # Responsive sidebar
├── Sidebar.test.tsx        # Sidebar unit tests
├── Layout.tsx              # Main layout wrapper
├── Layout.test.tsx         # Layout unit tests
├── index.ts                # Exports all components
└── README.md               # Component documentation
```

## Test Coverage

All components have comprehensive unit tests covering:
- ✅ Rendering and basic functionality
- ✅ Responsive behavior
- ✅ User interactions (clicks, toggles)
- ✅ Accessibility attributes
- ✅ Prop handling
- ✅ Edge cases

**Test Results**: 39 tests passing in layout components + 151 total tests passing

## Integration

The Dashboard page has been updated to use the new Layout component:

```tsx
import { Layout } from '../components/layout';

function Dashboard() {
  return (
    <Layout>
      {/* Page content */}
    </Layout>
  );
}
```

## Accessibility

All components follow accessibility best practices:
- ✅ Semantic HTML (`header`, `nav`, `aside`, `main`)
- ✅ ARIA attributes (`aria-expanded`, `aria-label`, `aria-hidden`)
- ✅ Keyboard navigation support
- ✅ Screen reader friendly structure

## Requirements Satisfied

- ✅ **Req 16.1**: Desktop layout (≥ 1024px) - Sticky sidebar, full navigation
- ✅ **Req 16.2**: Tablet layout (768px - 1023px) - Responsive padding
- ✅ **Req 16.3**: Mobile layout (< 768px) - Drawer sidebar, hamburger menu
- ✅ **Req 16.4**: Functionality maintained across all breakpoints

## Usage Examples

### Basic Layout
```tsx
import { Layout } from './components/layout';

function MyPage() {
  return (
    <Layout>
      <h1>My Page</h1>
      <p>Content here</p>
    </Layout>
  );
}
```

### Layout Without Sidebar
```tsx
import { Layout } from './components/layout';

function LandingPage() {
  return (
    <Layout showSidebar={false}>
      <h1>Welcome</h1>
    </Layout>
  );
}
```

### Layout with Constrained Width
```tsx
import { Layout } from './components/layout';

function ArticlePage() {
  return (
    <Layout maxWidth="lg">
      <article>
        <h1>Article Title</h1>
        <p>Content...</p>
      </article>
    </Layout>
  );
}
```

### Individual Components
```tsx
import { Header, Container, Sidebar } from './components/layout';

function CustomLayout() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar isOpen={true} onClose={() => {}} />
        <main>
          <Container maxWidth="xl">
            <p>Custom layout content</p>
          </Container>
        </main>
      </div>
    </>
  );
}
```

## Visual Preview

### Desktop (≥ 1024px)
```
┌──────────────────────────────────────────────┐
│  F1  OpenF1 Dashboard    Dashboard  API      │  ← Header (sticky)
├──────────┬───────────────────────────────────┤
│          │                                   │
│ Dashbrd  │   Main Content Area              │  ← Sidebar + Content
│ -------  │   (Container with padding)        │
│ Links    │                                   │
│ API      │                                   │
│          │                                   │
│ © 2024   │                                   │
└──────────┴───────────────────────────────────┘
```

### Mobile (< 768px)
```
┌──────────────────────────────┐
│ F1 OpenF1 dash...     ☰      │  ← Header
├──────────────────────────────┤
│                              │
│   Main Content               │
│   (Full width)               │
│                              │
│                              │
└──────────────────────────────┘

When menu opened:
┌─────────┐
│ Menu  × │  ← Sidebar drawer
├─────────┤     (slides in from left
│ Dashbrd │      with overlay)
│ -------│
│ Links   │
│ © 2024  │
└─────────┘
```

## Next Steps

These layout components provide the foundation for:
- Future timing display components
- Track map visualization
- Weather module
- Radio feed
- Pit stop analysis
- And all other dashboard features

The responsive structure ensures all features will work seamlessly across mobile, tablet, and desktop devices.
