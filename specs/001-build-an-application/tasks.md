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
- **Single project**: `src/`, `tests/` at repository root
- Paths assume single project structure from plan.md

## Phase 3.1: Setup

- [ ] **T001** Create project structure with src/, tests/, and public/ directories at repository root
- [ ] **T002** Initialize Vite + React + TypeScript project with package.json dependencies: React 19, TypeScript 5.9+, Vite, shadcn/ui, Tailwind CSS, better-sqlite3, fal.ai SDK, @dnd-kit/core, @dnd-kit/sortable
- [ ] **T003** [P] Configure ESLint, Prettier, and TypeScript strict mode in config files
- [ ] **T004** [P] Set up Vitest configuration in vitest.config.ts for unit/integration testing
- [ ] **T005** [P] Configure Tailwind CSS with shadcn/ui in tailwind.config.js and install shadcn/ui components
- [ ] **T006** [P] Initialize SQLite database schema in src/database/schema.sql based on data model
- [ ] **T007** [P] Configure Playwright for E2E testing in playwright.config.ts

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Contract Tests
- [ ] **T008** [P] Contract test photo generation API in tests/contract/photo-generation.test.ts - verify POST /api/photos/generate request/response schemas
- [ ] **T009** [P] Contract test album management API in tests/contract/album-management.test.ts - verify all album and project endpoint schemas
- [ ] **T010** [P] Contract test photo status API in tests/contract/photo-status.test.ts - verify GET /api/photos/status/{id} schema

### Integration Tests (from quickstart scenarios)
- [ ] **T011** [P] Integration test photo generation flow in tests/integration/photo-generation.test.ts - full fal.ai generation + SQLite storage
- [ ] **T012** [P] Integration test project/album creation in tests/integration/project-album.test.ts - create project → create album → verify database
- [ ] **T013** [P] Integration test photo-to-album assignment in tests/integration/photo-organization.test.ts - add generated photo to album
- [ ] **T014** [P] Integration test drag-drop reordering in tests/integration/drag-drop.test.ts - album reordering with dnd-kit
- [ ] **T015** [P] Integration test tile-based photo viewing in tests/integration/photo-gallery.test.ts - masonry layout rendering
- [ ] **T016** [P] Integration test error handling in tests/integration/error-handling.test.ts - API failures, database issues

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Data Models & Database
- [ ] **T017** [P] Project model in src/models/Project.ts with TypeScript interface and validation
- [ ] **T018** [P] Album model in src/models/Album.ts with TypeScript interface and validation  
- [ ] **T019** [P] Photo model in src/models/Photo.ts with TypeScript interface and validation
- [ ] **T020** [P] AIModel and PromptTemplate models in src/models/AIModel.ts and src/models/PromptTemplate.ts
- [ ] **T021** Database service in src/services/DatabaseService.ts with better-sqlite3 connection and WAL mode
- [ ] **T022** Database initialization service in src/services/DatabaseInit.ts to create tables and indexes

### Core Services
- [ ] **T023** [P] Photo generation service in src/services/PhotoGenerationService.ts integrating fal.ai SDK with error handling
- [ ] **T024** [P] Project management service in src/services/ProjectService.ts with CRUD operations
- [ ] **T025** [P] Album management service in src/services/AlbumService.ts with CRUD and reordering
- [ ] **T026** [P] Photo storage service in src/services/PhotoStorageService.ts for SQLite operations and URL management

### React Components & UI
- [ ] **T027** [P] Photo generation component in src/components/PhotoGenerator.tsx with form, model selection, and progress
- [ ] **T028** [P] Project management components in src/components/ProjectManager.tsx for project CRUD operations
- [ ] **T029** [P] Album management components in src/components/AlbumManager.tsx for album creation and editing
- [ ] **T030** [P] Photo tile component in src/components/PhotoTile.tsx with shadcn/ui Card and drag handle
- [ ] **T031** [P] Photo gallery component in src/components/PhotoGallery.tsx with CSS masonry layout
- [ ] **T032** [P] Drag-drop provider in src/components/DragDropProvider.tsx using @dnd-kit/core
- [ ] **T033** Main app component in src/App.tsx integrating all components with routing

### Custom Hooks
- [ ] **T034** [P] Photo generation hook in src/hooks/useFalGeneration.ts for async state management
- [ ] **T035** [P] Database operations hook in src/hooks/useDatabase.ts for SQLite interactions
- [ ] **T036** [P] Drag-drop hook in src/hooks/useDragDrop.ts for album/photo reordering

## Phase 3.4: Integration & Features

- [ ] **T037** Error boundary component in src/components/ErrorBoundary.tsx for graceful error handling
- [ ] **T038** Toast notification system in src/components/ToastProvider.tsx using shadcn/ui Toast
- [ ] **T039** Loading states and progress indicators in src/components/LoadingIndicator.tsx
- [ ] **T040** Responsive design implementation across all components with Tailwind breakpoints
- [ ] **T041** Photo metadata display and editing in src/components/PhotoDetails.tsx
- [ ] **T042** Prompt template system in src/components/PromptTemplates.tsx for reusable prompts

## Phase 3.5: CLI & Development Tools

- [ ] **T043** [P] Photo generation CLI in src/cli/photo-cli.ts with --generate, --prompt, --model flags
- [ ] **T044** [P] Album management CLI in src/cli/album-cli.ts with --create-project, --create-album flags
- [ ] **T045** [P] Database management CLI in src/cli/db-cli.ts with --init, --backup, --restore flags

## Phase 3.6: Polish & Optimization

- [ ] **T046** [P] Unit tests for validation logic in tests/unit/validation.test.ts
- [ ] **T047** [P] Unit tests for utility functions in tests/unit/utils.test.ts
- [ ] **T048** [P] Performance optimization for large photo galleries (virtualization if needed)
- [ ] **T049** [P] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] **T050** [P] Error handling improvements with user-friendly messages
- [ ] **T051** [P] Database performance optimization (indexes, query optimization)
- [ ] **T052** [P] Update project documentation in README.md with setup and usage instructions
- [ ] **T053** End-to-end testing with Playwright covering full user journeys from quickstart.md
- [ ] **T054** Performance testing to verify <2s generation, <100ms UI interactions targets
- [ ] **T055** Manual testing execution following quickstart.md scenarios

## Dependencies

### Critical Dependencies (must complete in order)
1. **Setup (T001-T007)** before everything
2. **Tests (T008-T016)** before implementation - tests MUST FAIL first
3. **Models (T017-T020)** before services
4. **Database setup (T021-T022)** before services
5. **Services (T023-T026)** before components  
6. **Components (T027-T033)** before integration
7. **Hooks (T034-T036)** before or with components

### Blocking Relationships
- T021 blocks T022 (database connection before initialization)
- T017-T020 block T023-T026 (models before services)
- T023-T026 block T027-T033 (services before UI components)
- T034-T036 can run parallel with T027-T033 (hooks with components)
- T008-T016 must complete and FAIL before T017-T055

## Parallel Execution Examples

### Setup Phase (after T001-T002)
```bash
# Launch T003-T007 together:
Task: "Configure ESLint, Prettier, and TypeScript strict mode in config files"
Task: "Set up Vitest configuration in vitest.config.ts for unit/integration testing"  
Task: "Configure Tailwind CSS with shadcn/ui in tailwind.config.js"
Task: "Initialize SQLite database schema in src/database/schema.sql"
Task: "Configure Playwright for E2E testing in playwright.config.ts"
```

### Contract Tests Phase
```bash
# Launch T008-T010 together:
Task: "Contract test photo generation API in tests/contract/photo-generation.test.ts"
Task: "Contract test album management API in tests/contract/album-management.test.ts"
Task: "Contract test photo status API in tests/contract/photo-status.test.ts"
```

### Integration Tests Phase  
```bash
# Launch T011-T016 together:
Task: "Integration test photo generation flow in tests/integration/photo-generation.test.ts"
Task: "Integration test project/album creation in tests/integration/project-album.test.ts"
Task: "Integration test photo-to-album assignment in tests/integration/photo-organization.test.ts"
Task: "Integration test drag-drop reordering in tests/integration/drag-drop.test.ts"
Task: "Integration test tile-based photo viewing in tests/integration/photo-gallery.test.ts"
Task: "Integration test error handling in tests/integration/error-handling.test.ts"
```

### Models Phase
```bash
# Launch T017-T020 together:
Task: "Project model in src/models/Project.ts with TypeScript interface and validation"
Task: "Album model in src/models/Album.ts with TypeScript interface and validation"
Task: "Photo model in src/models/Photo.ts with TypeScript interface and validation"
Task: "AIModel and PromptTemplate models in src/models/AIModel.ts and src/models/PromptTemplate.ts"
```

## Validation Checklist
*GATE: Checked before execution*

- [x] All contracts have corresponding tests (T008-T010 cover both contract files)
- [x] All entities have model tasks (T017-T020 cover Project, Album, Photo, AIModel, PromptTemplate)
- [x] All tests come before implementation (T008-T016 before T017+)
- [x] Parallel tasks truly independent (different files, no shared dependencies)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Quickstart scenarios covered by integration tests (T011-T015)
- [x] TDD workflow enforced (tests must fail before implementation)

## Notes
- **[P] tasks** = different files, no dependencies - can run in parallel
- **Critical**: Verify tests fail before implementing (RED-GREEN-Refactor)
- **Database**: WAL mode for concurrent access, proper transaction handling
- **Performance**: CSS masonry for layouts, React.memo for optimization
- **Testing**: Real SQLite database and fal.ai integration in tests (no mocks)
- **CLI tools**: Each library gets CLI with --help, --version, --format options
- Commit after each completed task for version control