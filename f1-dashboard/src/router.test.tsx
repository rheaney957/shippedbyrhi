import { describe, it, expect } from 'vitest';
import { router } from './router';

describe('Router Configuration', () => {
  it('should have route for Dashboard at /', () => {
    const route = router.routes.find((r) => r.path === '/');
    expect(route).toBeDefined();
    expect(route?.element).toBeDefined();
  });

  it('should have route for DriverProfile at /driver/:driverNumber', () => {
    const route = router.routes.find((r) => r.path === '/driver/:driverNumber');
    expect(route).toBeDefined();
    expect(route?.element).toBeDefined();
  });

  it('should have route for TeamPage at /team/:teamName', () => {
    const route = router.routes.find((r) => r.path === '/team/:teamName');
    expect(route).toBeDefined();
    expect(route?.element).toBeDefined();
  });

  it('should have catch-all route for NotFound at *', () => {
    const route = router.routes.find((r) => r.path === '*');
    expect(route).toBeDefined();
    expect(route?.element).toBeDefined();
  });

  it('should have exactly 4 routes', () => {
    expect(router.routes).toHaveLength(4);
  });
});
