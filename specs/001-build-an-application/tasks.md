# Tasks: AI Photo Generation and Album Management Application

**Input**: Design documents from `/Users/far/Projects/what_the_far/photoshop-killer/specs/001-build-an-application/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Turborepo monorepo**: `apps/web/` for Next.js app, `packages/*/` for libraries
- **New packages**: `packages/photo-generation/`, `packages/album-management/`, `packages/sqlite-storage/`
- **Tests**: Distributed per package in `packages/*/src/__tests__/`

## Phase 3.1: Setup

- [ ] **T001** [P] Create new package structure: packages/photo-generation/, packages/album-management/, packages/sqlite-storage/
- [ ] **T002** [P] Initialize @repo/photo-generation package.json with fal.ai SDK and TypeScript dependencies
- [ ] **T003** [P] Initialize @repo/album-management package.json with @dnd-kit dependencies  
- [ ] **T004** [P] Initialize @repo/sqlite-storage package.json with better-sqlite3 dependencies
- [ ] **T005** [P] Configure Jest testing in each new package with __tests__/ directories
- [ ] **T006** Add new packages to apps/web dependencies (workspace:* references)
- [ ] **T007** [P] Configure Tailwind CSS with shadcn/ui in apps/web (if not already done)
- [ ] **T008** [P] Initialize SQLite database schema in packages/sqlite-storage/src/schema.sql based on data model

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Contract Tests
- [ ] **T009** [P] Contract test photo generation API in packages/photo-generation/src/__tests__/contract/api.test.ts - verify fal.ai integration schemas
- [ ] **T010** [P] Contract test album management API in packages/album-management/src/__tests__/contract/api.test.ts - verify CRUD operation schemas
- [ ] **T011** [P] Contract test storage API in packages/sqlite-storage/src/__tests__/contract/database.test.ts - verify SQLite schema operations

### Integration Tests (from quickstart scenarios)  
- [ ] **T012** [P] Integration test photo generation flow in packages/photo-generation/src/__tests__/integration/generation.test.ts - full fal.ai generation workflow
- [ ] **T013** [P] Integration test project/album creation in packages/album-management/src/__tests__/integration/crud.test.ts - create project → create album
- [ ] **T014** [P] Integration test photo-to-album assignment in packages/album-management/src/__tests__/integration/organization.test.ts - add photo to album
- [ ] **T015** [P] Integration test drag-drop reordering in packages/album-management/src/__tests__/integration/drag-drop.test.ts - album reordering with dnd-kit
- [ ] **T016** [P] Integration test SQLite operations in packages/sqlite-storage/src/__tests__/integration/database.test.ts - full CRUD with real database
- [ ] **T017** [P] Integration test Next.js app in apps/web/__tests__/integration/app.test.ts - full user journeys from quickstart

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Data Models & Database (in packages/sqlite-storage)
- [ ] **T018** [P] Project model in packages/sqlite-storage/src/models/Project.ts with TypeScript interface and validation
- [ ] **T019** [P] Album model in packages/sqlite-storage/src/models/Album.ts with TypeScript interface and validation  
- [ ] **T020** [P] Photo model in packages/sqlite-storage/src/models/Photo.ts with TypeScript interface and validation
- [ ] **T021** [P] AIModel and PromptTemplate models in packages/sqlite-storage/src/models/AIModel.ts and PromptTemplate.ts
- [ ] **T022** Database service in packages/sqlite-storage/src/DatabaseService.ts with better-sqlite3 connection and WAL mode
- [ ] **T023** Database initialization service in packages/sqlite-storage/src/DatabaseInit.ts to create tables and indexes
- [ ] **T024** Export main API from packages/sqlite-storage/src/index.ts

### Core Services (in respective packages)
- [ ] **T025** [P] Photo generation service in packages/photo-generation/src/PhotoGenerationService.ts integrating fal.ai SDK
- [ ] **T026** [P] Photo generation hooks in packages/photo-generation/src/hooks/useFalGeneration.ts for React integration
- [ ] **T027** Export photo-generation API from packages/photo-generation/src/index.ts
- [ ] **T028** [P] Album management service in packages/album-management/src/AlbumService.ts with CRUD operations  
- [ ] **T029** [P] Project management service in packages/album-management/src/ProjectService.ts with CRUD operations
- [ ] **T030** [P] Drag-drop service in packages/album-management/src/DragDropService.ts for reordering logic
- [ ] **T031** Export album-management API from packages/album-management/src/index.ts

### React Components & UI (in apps/web)
- [ ] **T032** [P] Photo generation component in apps/web/components/PhotoGenerator.tsx with form, model selection, and progress
- [ ] **T033** [P] Project management components in apps/web/components/ProjectManager.tsx for project CRUD operations
- [ ] **T034** [P] Album management components in apps/web/components/AlbumManager.tsx for album creation and editing
- [ ] **T035** [P] Photo tile component in apps/web/components/PhotoTile.tsx with @repo/ui Card components
- [ ] **T036** [P] Photo gallery component in apps/web/components/PhotoGallery.tsx with CSS masonry layout
- [ ] **T037** [P] Drag-drop provider in apps/web/components/DragDropProvider.tsx using @dnd-kit/core
- [ ] **T038** Update Next.js pages in apps/web/app/ to integrate components (page.tsx, layout.tsx)

### Custom Hooks (already covered in packages)
- Photo generation hooks: already included in T026
- Database hooks: will be exported from @repo/sqlite-storage  
- Drag-drop hooks: will be exported from @repo/album-management

## Phase 3.4: Integration & Features

- [ ] **T039** [P] Error boundary component in apps/web/components/ErrorBoundary.tsx for graceful error handling
- [ ] **T040** [P] Toast notification system in apps/web/components/ToastProvider.tsx using shadcn/ui Toast
- [ ] **T041** [P] Loading states and progress indicators in apps/web/components/LoadingIndicator.tsx
- [ ] **T042** Responsive design implementation across all components with Tailwind breakpoints
- [ ] **T043** [P] Photo metadata display and editing in apps/web/components/PhotoDetails.tsx
- [ ] **T044** [P] Prompt template system in apps/web/components/PromptTemplates.tsx for reusable prompts

## Phase 3.5: CLI & Development Tools

- [ ] **T045** [P] Photo generation CLI in packages/photo-generation/src/cli.ts with --generate, --prompt, --model flags
- [ ] **T046** [P] Album management CLI in packages/album-management/src/cli.ts with --create-project, --create-album flags
- [ ] **T047** [P] Database management CLI in packages/sqlite-storage/src/cli.ts with --init, --backup, --restore flags

## Phase 3.6: Polish & Optimization

- [ ] **T048** [P] Unit tests for validation logic in packages/*/src/__tests__/unit/validation.test.ts
- [ ] **T049** [P] Unit tests for utility functions in packages/*/src/__tests__/unit/utils.test.ts
- [ ] **T050** [P] Performance optimization for large photo galleries in apps/web (virtualization if needed)
- [ ] **T051** [P] Accessibility improvements (ARIA labels, keyboard navigation) across apps/web components
- [ ] **T052** [P] Error handling improvements with user-friendly messages in all packages
- [ ] **T053** [P] Database performance optimization (indexes, query optimization) in @repo/sqlite-storage
- [ ] **T054** [P] Update package documentation with README.md files for each new package
- [ ] **T055** End-to-end testing with Playwright in apps/web/__tests__/e2e/ covering quickstart.md journeys
- [ ] **T056** Performance testing to verify <2s generation, <100ms UI interactions targets
- [ ] **T057** Manual testing execution following quickstart.md scenarios in apps/web

## Dependencies

### Critical Dependencies (must complete in order)
1. **Setup (T001-T008)** before everything
2. **Tests (T009-T017)** before implementation - tests MUST FAIL first
3. **Models (T018-T021)** before services (within sqlite-storage package)
4. **Database setup (T022-T024)** before services
5. **Package Services (T025-T031)** before web components  
6. **Web Components (T032-T038)** before integration
7. **Integration (T039-T044)** before CLI and polish

### Blocking Relationships
- T022 blocks T023 (database connection before initialization)
- T018-T021 block T025-T031 (models before services)
- T025-T031 block T032-T038 (package services before UI components)
- T006 blocks T032-T038 (workspace dependencies before using packages)
- T009-T017 must complete and FAIL before T018-T057

## Parallel Execution Examples

### Setup Phase (after basic structure)
```bash
# Launch T002-T005 together:
Task: "Initialize @repo/photo-generation package.json with fal.ai SDK and TypeScript dependencies"
Task: "Initialize @repo/album-management package.json with @dnd-kit dependencies"
Task: "Initialize @repo/sqlite-storage package.json with better-sqlite3 dependencies"
Task: "Configure Jest testing in each new package with __tests__/ directories"
```

### Contract Tests Phase
```bash
# Launch T009-T011 together:
Task: "Contract test photo generation API in packages/photo-generation/src/__tests__/contract/api.test.ts"
Task: "Contract test album management API in packages/album-management/src/__tests__/contract/api.test.ts"
Task: "Contract test storage API in packages/sqlite-storage/src/__tests__/contract/database.test.ts"
```

### Integration Tests Phase  
```bash
# Launch T012-T017 together:
Task: "Integration test photo generation flow in packages/photo-generation/src/__tests__/integration/generation.test.ts"
Task: "Integration test project/album creation in packages/album-management/src/__tests__/integration/crud.test.ts"
Task: "Integration test photo-to-album assignment in packages/album-management/src/__tests__/integration/organization.test.ts"
Task: "Integration test drag-drop reordering in packages/album-management/src/__tests__/integration/drag-drop.test.ts"
Task: "Integration test SQLite operations in packages/sqlite-storage/src/__tests__/integration/database.test.ts"
Task: "Integration test Next.js app in apps/web/__tests__/integration/app.test.ts"
```

### Models Phase (in sqlite-storage package)
```bash
# Launch T018-T021 together:
Task: "Project model in packages/sqlite-storage/src/models/Project.ts"
Task: "Album model in packages/sqlite-storage/src/models/Album.ts"
Task: "Photo model in packages/sqlite-storage/src/models/Photo.ts"
Task: "AIModel and PromptTemplate models in packages/sqlite-storage/src/models/"
```

### Service Implementation Phase
```bash
# Launch T025-T031 together (different packages):
Task: "Photo generation service in packages/photo-generation/src/PhotoGenerationService.ts"
Task: "Album management service in packages/album-management/src/AlbumService.ts"
Task: "Project management service in packages/album-management/src/ProjectService.ts"
Task: "Drag-drop service in packages/album-management/src/DragDropService.ts"
```

### React Components Phase (in apps/web)
```bash
# Launch T032-T037 together:
Task: "Photo generation component in apps/web/components/PhotoGenerator.tsx"
Task: "Project management components in apps/web/components/ProjectManager.tsx"
Task: "Album management components in apps/web/components/AlbumManager.tsx"
Task: "Photo tile component in apps/web/components/PhotoTile.tsx"
Task: "Photo gallery component in apps/web/components/PhotoGallery.tsx"
Task: "Drag-drop provider in apps/web/components/DragDropProvider.tsx"
```

## Validation Checklist
*GATE: Checked before execution*

- [x] All contracts have corresponding tests (T009-T011 cover all APIs)
- [x] All entities have model tasks (T018-T021 cover Project, Album, Photo, AIModel, PromptTemplate)
- [x] All tests come before implementation (T009-T017 before T018+)
- [x] Parallel tasks truly independent (different packages/files, no shared dependencies)
- [x] Each task specifies exact file path within monorepo structure
- [x] No task modifies same file as another [P] task
- [x] Quickstart scenarios covered by integration tests (T012-T017)
- [x] TDD workflow enforced (tests must fail before implementation)
- [x] Monorepo structure respected (packages for libraries, apps/web for Next.js app)
- [x] Existing project bootstrap leveraged (no unnecessary project creation)

## Notes
- **[P] tasks** = different packages/files, no dependencies - can run in parallel
- **Critical**: Verify tests fail before implementing (RED-GREEN-Refactor)
- **Monorepo**: Use `turbo run` commands for cross-package builds and tests
- **Workspace dependencies**: Use `workspace:*` for internal package references
- **Database**: WAL mode for concurrent access, proper transaction handling
- **Performance**: CSS masonry for layouts, React.memo for optimization  
- **Testing**: Real SQLite database and fal.ai integration in tests (no mocks)
- **CLI tools**: Each library gets CLI with --help, --version, --format options
- **Next.js**: Leverage existing Next.js 15 setup with Turbopack for fast development
- Commit after each completed task for version control