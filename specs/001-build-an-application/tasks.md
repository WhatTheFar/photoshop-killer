# Tasks: AI Photo Generation and Album Management

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
   → Setup: project init, dependencies, linting, TypeScript strict mode
   → Quality: ESLint config, Prettier setup, dead code elimination
   → Tests: contract tests, integration tests, performance benchmarks
   → Core: models, services, UI components from @repo/ui
   → Performance: bundle optimization, Web Workers, memory management
   → Integration: package boundaries, accessibility, error handling
   → Polish: unit tests, documentation, visual regression tests
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

- **Monorepo**: Main application in `apps/web/` with shared packages in `packages/`
- **Tests**: Located in `apps/web/tests/` and root-level `tests/` for integration
- **Packages**: Shared code in `packages/ui/`, `packages/database/`, etc.

## Phase 3.1: Setup & Quality

- [ ] T001 Create Next.js application structure in apps/web/ with TypeScript strict mode
- [ ] T002 [P] Configure ESLint with zero warnings policy in apps/web/
- [ ] T003 [P] Configure Prettier formatting rules in apps/web/
- [ ] T004 [P] Setup Tailwind CSS and shadcn/ui components in apps/web/
- [ ] T005 [P] Create database package with SQLite setup in packages/database/
- [ ] T006 [P] Install and configure fal.ai SDK in packages/ai-generation/
- [ ] T007 [P] Configure Jest and React Testing Library in apps/web/

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [ ] T008 [P] Contract test for Projects API in apps/web/tests/contract/projects-api.test.ts
- [ ] T009 [P] Contract test for Albums API in apps/web/tests/contract/albums-api.test.ts
- [ ] T010 [P] Contract test for Photos API in apps/web/tests/contract/photos-api.test.ts
- [ ] T011 [P] Contract test for Prompt Templates API in apps/web/tests/contract/prompt-templates-api.test.ts
- [ ] T012 [P] Contract test for Fal.ai Integration in apps/web/tests/contract/fal-ai-integration.test.ts
- [ ] T013 [P] Integration test for project creation workflow in apps/web/tests/integration/project-management.test.ts
- [ ] T014 [P] Integration test for album organization in apps/web/tests/integration/album-organization.test.ts
- [ ] T015 [P] Integration test for photo generation workflow in apps/web/tests/integration/photo-generation.test.ts
- [ ] T016 [P] Integration test for drag-and-drop reordering in apps/web/tests/integration/drag-drop.test.ts
- [ ] T017 [P] Performance benchmark for photo tile rendering in tests/performance/photo-rendering.test.ts

## Phase 3.3: Database Models & Services (ONLY after tests are failing)

- [ ] T018 [P] User model with preferences in packages/database/src/models/user.ts
- [ ] T019 [P] Project model with display order in packages/database/src/models/project.ts
- [ ] T020 [P] Album model with project relations in packages/database/src/models/album.ts
- [ ] T021 [P] Photo model with metadata in packages/database/src/models/photo.ts
- [ ] T022 [P] PromptTemplate model with parameters in packages/database/src/models/prompt-template.ts
- [ ] T023 [P] Database migrations and schema setup in packages/database/src/migrations/
- [ ] T024 ProjectService with CRUD operations in packages/database/src/services/project-service.ts
- [ ] T025 AlbumService with reordering logic in packages/database/src/services/album-service.ts
- [ ] T026 PhotoService with bulk operations in packages/database/src/services/photo-service.ts
- [ ] T027 PromptTemplateService with search in packages/database/src/services/prompt-template-service.ts

## Phase 3.4: AI Integration & Core Components

- [ ] T028 [P] Fal.ai client wrapper in packages/ai-generation/src/fal-client.ts
- [ ] T029 [P] Photo generation queue manager in packages/ai-generation/src/generation-queue.ts
- [ ] T030 [P] Model discovery and caching in packages/ai-generation/src/model-manager.ts
- [ ] T031 [P] Project management UI components in packages/ui/src/project/
- [ ] T032 [P] Album grid and card components in packages/ui/src/album/
- [ ] T033 [P] Photo tile and gallery components in packages/ui/src/photo/
- [ ] T034 [P] Drag-and-drop components using @dnd-kit in packages/ui/src/dnd/
- [ ] T035 [P] Generation form and prompt builder in packages/ui/src/generation/

## Phase 3.5: API Routes & Page Implementation

- [ ] T036 Projects API routes in apps/web/app/api/projects/
- [ ] T037 Albums API routes in apps/web/app/api/albums/
- [ ] T038 Photos API routes in apps/web/app/api/photos/
- [ ] T039 Prompt Templates API routes in apps/web/app/api/prompt-templates/
- [ ] T040 Fal.ai proxy endpoints in apps/web/app/api/fal/
- [ ] T041 Main dashboard page in apps/web/app/page.tsx
- [ ] T042 Project detail page in apps/web/app/projects/[id]/page.tsx
- [ ] T043 Album detail page in apps/web/app/albums/[id]/page.tsx
- [ ] T044 Photo generation page in apps/web/app/generate/page.tsx

## Phase 3.6: Performance & Accessibility

- [ ] T045 [P] Image lazy loading and optimization in packages/ui/src/image/
- [ ] T046 [P] Virtual scrolling for large photo collections in packages/ui/src/virtual-grid/
- [ ] T047 [P] Bundle size optimization and code splitting in apps/web/
- [ ] T048 [P] Web Worker for image processing tasks in apps/web/public/workers/
- [ ] T049 [P] Keyboard navigation implementation in packages/ui/src/keyboard/
- [ ] T050 [P] Screen reader support and ARIA labels in packages/ui/src/accessibility/
- [ ] T051 [P] Loading states for operations >200ms in packages/ui/src/loading/
- [ ] T052 [P] Error boundaries and error handling in packages/ui/src/error/

## Phase 3.7: Polish & Validation

- [ ] T053 [P] Unit tests achieving ≥80% coverage in apps/web/tests/unit/
- [ ] T054 [P] Visual regression tests for UI components in tests/visual/
- [ ] T055 [P] E2E tests with Playwright in tests/e2e/
- [ ] T056 [P] Performance monitoring and Core Web Vitals in apps/web/app/monitoring/
- [ ] T057 [P] Dead code elimination and bundle analysis in apps/web/
- [ ] T058 [P] API documentation generation from OpenAPI specs
- [ ] T059 Cross-package validation and dependency checks
- [ ] T060 Final constitutional compliance review and optimization

## Dependencies

**Critical Path**:

- Setup & Quality (T001-T007) before Tests (T008-T017)
- Tests (T008-T017) before Models & Services (T018-T027)
- Models before Services (T018-T022 before T024-T027)
- Services before API Routes (T024-T027 before T036-T040)
- Core Components (T031-T035) before Pages (T041-T044)
- All core functionality before Performance & Polish (T045-T060)

**Parallel Blocks**:

- Database models (T018-T022) can run in parallel
- Services (T024-T027) can run in parallel after models complete
- UI components (T031-T035) can run in parallel with services
- Performance tasks (T045-T052) can run in parallel

## Parallel Example

```bash
# Launch T008-T012 together (Contract tests):
Task: "Contract test for Projects API in apps/web/tests/contract/projects-api.test.ts"
Task: "Contract test for Albums API in apps/web/tests/contract/albums-api.test.ts"
Task: "Contract test for Photos API in apps/web/tests/contract/photos-api.test.ts"
Task: "Contract test for Prompt Templates API in apps/web/tests/contract/prompt-templates-api.test.ts"
Task: "Contract test for Fal.ai Integration in apps/web/tests/contract/fal-ai-integration.test.ts"

# Launch T018-T022 together (Database models):
Task: "User model with preferences in packages/database/src/models/user.ts"
Task: "Project model with display order in packages/database/src/models/project.ts"
Task: "Album model with project relations in packages/database/src/models/album.ts"
Task: "Photo model with metadata in packages/database/src/models/photo.ts"
Task: "PromptTemplate model with parameters in packages/database/src/models/prompt-template.ts"
```

## Notes

- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Follow constitutional principles: TDD, accessibility, performance
- Use shadcn/ui components consistently
- Maintain bundle size limits (chunks ≤500KB)

## Task Generation Rules

_Applied during main() execution_

1. **From Contracts**:
   - Each contract YAML file → contract test task [P]
   - Each API endpoint → implementation task
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
3. **From User Stories**:
   - Each workflow → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → UI → API → Performance → Polish
   - Dependencies block parallel execution

## Validation Checklist

_GATE: Checked by main() before returning_

**Constitutional Compliance**:

- [x] TypeScript strict mode setup included
- [x] ESLint zero warnings policy configured
- [x] TDD approach with tests before implementation
- [x] ≥80% test coverage targets set
- [x] @repo/ui design system usage planned
- [x] Performance benchmarks defined
- [x] Accessibility validation included
- [x] Package boundary respect verified

**Task Quality**:

- [x] All 5 contracts have corresponding tests (T008-T012)
- [x] All 5 entities have model tasks (T018-T022)
- [x] All tests come before implementation (Phase 3.2 before 3.3)
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] Bundle size optimization included (T047, T057)
- [x] Dead code elimination planned (T057)
