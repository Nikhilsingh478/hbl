# HBL Engineering Loader Components

## Overview
Two premium SVG-based loader components designed specifically for HBL Engineering Limited, reflecting precision, innovation, and industrial elegance.

---

## Components

### 1. **HBLLoader** (Section Loader)
Use for lazy-loaded sections and component transitions.

**Features:**
- Compact design (w-48 h-48)
- Hexagonal gear ring with rotating animation
- Circuit path tracing with cyan glow
- Pulsing amber energy core
- "Engineering the Future" tagline
- Progress dots animation

**Usage:**
```tsx
import { HBLLoader } from './components/HBLLoader';

// In React Suspense fallback
<Suspense fallback={<HBLLoader />}>
  <YourComponent />
</Suspense>
```

---

### 2. **PageLoader** (Full-Page Loader)
Use for initial page load with progress tracking.

**Features:**
- Full viewport overlay
- Larger loader (w-56 to w-64)
- Simulated loading progress (0-100%)
- Progress ring visualization
- HBL branding with logo pulse at 70% load
- Smooth exit animation
- Gradient background with grid pattern

**Usage:**
```tsx
import { PageLoader } from './components/PageLoader';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      <YourApp />
    </>
  );
}
```

---

## Animation Details

### Outer Hexagonal Ring
- **Rotation**: 360° clockwise in 4s
- **Gear Teeth**: 6 teeth with pulsing opacity
- **Color**: Deep Navy (#0A1F44)

### Middle Circuit Ring
- **Rotation**: 360° counter-clockwise in 6s
- **Style**: Dashed circle with connection nodes
- **Color**: Electric Cyan (#00FFFF)
- **Nodes**: 4 pulsing points at 90° intervals

### Circuit Path Tracing
- **Animation**: Stroke dash offset creating "electric flow"
- **Duration**: 3s loop
- **Effect**: Glowing cyan trail with drop shadow

### Energy Core
- **Pulsing**: Scale 1 to 1.1 in 2s
- **Glow**: Expanding amber circle (blur effect)
- **Logo**: "H" or "HBL" text with cyan color

### Energy Particles
- **Count**: 8 particles in circular pattern
- **Animation**: Fade in/out with size pulse
- **Color**: Warm Amber (#FFB400)

### Scan Lines
- **Type**: Expanding concentric circles
- **Color**: Cyan with low opacity
- **Effect**: Radar-like scanning motion

---

## Customization

### Colors
All colors use CSS variables for easy theming:
```css
--primary: #0A1F44    /* Deep Navy */
--accent: #00FFFF     /* Electric Cyan */
--amber: #FFB400      /* Warm Amber */
```

### Timing
Adjust animation speeds in component:
```tsx
// Slower rotation
transition={{ duration: 6, repeat: Infinity }}

// Faster pulse
transition={{ duration: 1, repeat: Infinity }}
```

### Size
Change SVG viewBox or container classes:
```tsx
// Larger loader
<div className="w-64 h-64">  // was w-48 h-48
```

---

## Performance

### Optimization Tips
1. **Lazy Load**: Both components are tree-shakeable
2. **GPU Acceleration**: All animations use transform properties
3. **File Size**: ~5KB combined (uncompressed)
4. **No External Dependencies**: Pure SVG + Motion React

### Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12+)
- Mobile: ✅ Optimized with reduced particles on small screens

---

## Accessibility

- **Semantic HTML**: Proper ARIA roles for loaders
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Color Contrast**: WCAG AA compliant
- **Screen Readers**: Loading state announcements

### Adding Reduced Motion Support
```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Disable complex animations if user prefers
{!prefersReducedMotion && <ComplexAnimation />}
```

---

## Examples

### Inline Section Loader
```tsx
<div className="py-24">
  <Suspense fallback={<HBLLoader />}>
    <LazySection />
  </Suspense>
</div>
```

### Full App with Page Loader
```tsx
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum display time for branding
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      <Navigation />
      <HeroSection />
      {/* ... */}
    </>
  );
}
```

### Custom Loading States
```tsx
function DataComponent() {
  const { data, loading } = useFetch();

  if (loading) return <HBLLoader />;
  
  return <div>{data}</div>;
}
```

---

## Design Philosophy

**Hexagonal Gear Ring**
- Represents precision engineering
- Six-sided shape = six business units
- Gear teeth = mechanical excellence

**Circuit Tracing**
- Electronics and advanced systems
- Energy flow and connectivity
- Innovation and technology

**Pulsing Core**
- Heartbeat of the company
- Energy and power systems
- Mission-critical reliability

**Color Psychology**
- Navy: Trust, professionalism, aerospace
- Cyan: Innovation, technology, future
- Amber: Energy, warmth, excellence

---

## Future Enhancements

Possible additions:
- [ ] Progress callback for data loading
- [ ] Custom messages during load
- [ ] Sound effects option
- [ ] Dark mode variant
- [ ] Minimum display time option
- [ ] Skip button for repeat visitors

---

**Created for**: HBL Engineering Limited  
**Version**: 1.0.0  
**Last Updated**: October 2025
