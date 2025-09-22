# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
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

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup & Quality

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize TypeScript project with strict mode enabled
- [ ] T003 [P] Configure ESLint with zero warnings policy
- [ ] T004 [P] Configure Prettier formatting rules
- [ ] T005 [P] Configure package dependencies and workspace structure

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3

**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

- [ ] T006 [P] Contract test POST /api/users in tests/contract/test_users_post.ts
- [ ] T007 [P] Contract test GET /api/users/{id} in tests/contract/test_users_get.ts
- [ ] T008 [P] Integration test user registration in tests/integration/test_registration.ts
- [ ] T009 [P] Integration test auth flow with accessibility validation in tests/integration/test_auth.ts
- [ ] T010 [P] Performance benchmark test for image processing in tests/performance/test_image_processing.ts

## Phase 3.3: Core Implementation (ONLY after tests are failing)

- [ ] T011 [P] User model with TypeScript strict typing in src/models/user.ts
- [ ] T012 [P] UserService CRUD with error handling in src/services/user_service.ts
- [ ] T013 [P] UI components using @repo/ui design system in src/components/
- [ ] T014 POST /api/users endpoint with input validation
- [ ] T015 GET /api/users/{id} endpoint with error states
- [ ] T016 Loading states for operations >200ms
- [ ] T017 Error handling with user feedback

## Phase 3.4: Performance & Integration

- [ ] T018 Bundle size optimization (chunks ≤500KB)
- [ ] T019 Web Workers for CPU-intensive operations
- [ ] T020 Memory usage optimization for large files
- [ ] T021 Package boundary validation (no circular dependencies)
- [ ] T022 Keyboard navigation and accessibility implementation
- [ ] T023 Core Web Vitals optimization

## Phase 3.5: Polish & Validation

- [ ] T024 [P] Unit tests achieving ≥80% coverage in tests/unit/test_validation.ts
- [ ] T025 [P] Visual regression tests for UI components
- [ ] T026 [P] Dead code elimination and cleanup
- [ ] T027 [P] Documentation updates with API contracts
- [ ] T028 Cross-package validation and testing
- [ ] T029 Final constitutional compliance review

## Dependencies

- Setup & Quality (T001-T005) before Tests (T006-T010)
- Tests (T006-T010) before implementation (T011-T017)
- Core Implementation (T011-T017) before Performance & Integration (T018-T023)
- All phases before Polish & Validation (T024-T029)

## Parallel Example

```
# Launch T006-T010 together:
Task: "Contract test POST /api/users in tests/contract/test_users_post.ts"
Task: "Contract test GET /api/users/{id} in tests/contract/test_users_get.ts"
Task: "Integration test registration in tests/integration/test_registration.ts"
Task: "Integration test auth with accessibility in tests/integration/test_auth.ts"
Task: "Performance benchmark for image processing in tests/performance/test_image_processing.ts"
```

## Notes

- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules

_Applied during main() execution_

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task
2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks
3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist

_GATE: Checked by main() before returning_

**Constitutional Compliance**:

- [ ] TypeScript strict mode setup included
- [ ] ESLint zero warnings policy configured
- [ ] TDD approach with tests before implementation
- [ ] ≥80% test coverage targets set
- [ ] @repo/ui design system usage planned
- [ ] Performance benchmarks defined
- [ ] Accessibility validation included
- [ ] Package boundary respect verified

**Task Quality**:

- [ ] All contracts have corresponding tests
- [ ] All entities have model tasks
- [ ] All tests come before implementation
- [ ] Parallel tasks truly independent
- [ ] Each task specifies exact file path
- [ ] No task modifies same file as another [P] task
- [ ] Bundle size optimization included
- [ ] Dead code elimination planned
