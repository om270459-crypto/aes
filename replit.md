# Replit.md - Digital Neon Valentine

## Overview

A romantic futuristic Valentine's website featuring heavy animations, cinematic motion, neon love aesthetics, and an immersive digital sanctuary experience. The application combines a React frontend with an Express backend, PostgreSQL database, and extensive 3D visual effects using Three.js. It serves as a cinematic Valentine experience with interactive pages including games, poetic messages, countdown timers, and memory galleries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, bundled via Vite
- **Routing**: Wouter for client-side routing with animated page transitions
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming, shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for page transitions and UI animations
- **3D Graphics**: React Three Fiber (@react-three/fiber) with Drei helpers for particle backgrounds and floating heart effects

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Structure**: RESTful endpoints defined in `shared/routes.ts` with Zod schema validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Build System**: Custom build script using esbuild for server and Vite for client

### Data Layer
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema**: Defined in `shared/schema.ts` using Drizzle with Zod validation via drizzle-zod
- **Migrations**: Managed through drizzle-kit with migrations output to `./migrations`

### Project Structure
\`\`\`
client/           # React frontend
  src/
    components/   # Reusable UI components (shadcn/ui, custom)
    pages/        # Route pages (Home, Games, Messages, Countdown, Memories)
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Shared code between client/server
  schema.ts       # Drizzle database schema
  routes.ts       # API route contracts with Zod
\`\`\`

### Design Patterns
- **Type-Safe API Contracts**: Routes defined with Zod schemas in shared folder, used by both client and server
- **Repository Pattern**: Storage interface abstracts database operations
- **Component Composition**: UI built from shadcn/ui primitives with custom styling

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Frontend Libraries
- **Three.js ecosystem**: @react-three/fiber, @react-three/drei, maath for 3D particle effects
- **Framer Motion**: Complex animations and page transitions
- **Radix UI**: Accessible component primitives (dialog, dropdown, tabs, etc.)
- **TanStack Query**: Async state management and caching

### Backend Libraries
- **Express**: HTTP server framework
- **connect-pg-simple**: PostgreSQL session store
- **Zod**: Runtime schema validation

### Build Tools
- **Vite**: Frontend bundler with HMR
- **esbuild**: Server bundling for production
- **drizzle-kit**: Database migration tooling
