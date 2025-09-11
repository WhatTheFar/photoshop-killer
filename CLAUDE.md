# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a Turborepo monorepo using pnpm as the package manager. The project follows a workspace-based architecture with:

- **Apps**: Next.js applications located in `apps/`
  - `web`: Main web application (port 3000)
  - `docs`: Documentation site (port 3001)
- **Packages**: Shared packages in `packages/`
  - `@repo/ui`: Shared React component library
  - `@repo/eslint-config`: ESLint configurations
  - `@repo/typescript-config`: TypeScript configurations

## Development Commands

### Root Level Commands (run from project root)
- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Run linting across all workspaces
- `pnpm check-types` - Run TypeScript type checking across all workspaces
- `pnpm format` - Format code using Prettier

### Turbo Commands
- `turbo dev` - Start development servers for all apps
- `turbo build` - Build all apps and packages with dependency graph
- `turbo lint` - Run linting with proper dependency order
- `turbo check-types` - Type check all packages

### Filtering for Specific Apps/Packages
Use Turbo filters to work with specific workspaces:
- `turbo dev --filter=web` - Only start the web app
- `turbo build --filter=docs` - Only build the docs app
- `turbo lint --filter=@repo/ui` - Only lint the UI package

### Individual App Commands
Navigate to app directories and run:
- Web app: `cd apps/web && pnpm dev` (port 3000)
- Docs app: `cd apps/docs && pnpm dev` (port 3001)

## Technology Stack

- **Framework**: Next.js 15+ with Turbopack
- **Language**: TypeScript 5.9
- **Package Manager**: pnpm 9.0+
- **Monorepo Tool**: Turborepo
- **React**: Version 19+
- **Linting**: ESLint with strict configurations (`--max-warnings 0`)
- **Formatting**: Prettier

## Development Workflow

1. Use `pnpm dev` to start all services during development
2. The project uses workspace dependencies (`workspace:*`) for internal packages
3. Both apps use Turbopack for faster development builds
4. Type checking is strict - use `pnpm check-types` before committing
5. Linting enforces zero warnings policy