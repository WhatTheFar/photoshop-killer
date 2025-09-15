# Research Findings: AI Photo Generation and Album Management Application

## Technology Stack Decisions

### 1. Fal.ai Integration
**Decision**: Use fal-client with React hooks pattern
**Rationale**: Official SDK with built-in async support, event streaming for progress updates, and easy React integration
**Alternatives Considered**: Direct REST API (more complex), OpenAPI generated client (less maintained)

### 2. SQLite Integration  
**Decision**: better-sqlite3 with TypeScript wrappers
**Rationale**: 10-15x faster than node-sqlite3, synchronous API simplifies mental model, excellent TypeScript support
**Alternatives Considered**: node-sqlite3 (slower), Prisma (complex), IndexedDB (limited queries)

### 3. Drag and Drop
**Decision**: @dnd-kit/core with @dnd-kit/sortable
**Rationale**: Modern hooks-based architecture, built-in accessibility, excellent performance, active development
**Alternatives Considered**: react-beautiful-dnd (less maintained), react-dnd (complex), native HTML5 (limited)

### 4. Build Tool Configuration
**Decision**: Next.js 15 with Turbopack in existing Turborepo monorepo
**Rationale**: Already configured, excellent performance with Turbopack, seamless integration with existing @repo/ui package
**Alternatives Considered**: Vite (would require restructuring), Create React App (less flexible), staying with current setup (best choice)

### 5. UI Component Library
**Decision**: shadcn/ui with custom photo gallery components
**Rationale**: Consistent design system, Tailwind integration, customizable, TypeScript-first
**Alternatives Considered**: Chakra UI (different philosophy), Mantine (heavier), custom components (inconsistent)

### 6. Layout System
**Decision**: CSS Columns with responsive breakpoints
**Rationale**: Simple implementation, no JavaScript required, automatic masonry effect, excellent performance
**Alternatives Considered**: CSS Grid (complex responsive), Flexbox (not ideal for masonry), JavaScript libraries (unnecessary)

### 7. Error Handling
**Decision**: Error boundaries + custom hooks pattern with React 19 features
**Rationale**: Comprehensive coverage, graceful degradation, centralized patterns, modern React features
**Alternatives Considered**: Global handler only (less granular), try-catch only (misses render errors)

### 8. Testing Strategy
**Decision**: Jest + React Testing Library + MSW for API mocking (Next.js compatible)
**Rationale**: Industry standard, works with Next.js/Turborepo, realistic API mocking, built-in async support
**Alternatives Considered**: Vitest (good but Next.js has better Jest integration), Cypress only (slower), testing without mocks (unreliable)

## Architecture Decisions

### Project Structure
- Turborepo monorepo with Next.js app in apps/web
- Feature-based library organization in packages/ (@repo/photo-generation, @repo/album-management, @repo/sqlite-storage)
- No backend - pure frontend with SQLite storage

### Data Flow
- fal.ai returns image URLs (no local image storage)
- SQLite stores metadata and URL references
- React state manages UI interactions
- Custom hooks handle async operations

### Performance Optimizations
- Next.js 15 with Turbopack for fast development and optimized builds
- better-sqlite3 WAL mode for concurrent access
- CSS-only masonry layouts for gallery performance
- React 19 concurrent features for smooth interactions

All technology choices align with constitutional requirements of simplicity, direct framework usage, and minimal dependencies.