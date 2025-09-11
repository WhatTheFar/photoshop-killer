# Data Model: AI Photo Generation and Album Management

## Entity Definitions

### Project Entity
**Purpose**: Top-level container for organizing related albums
**Fields**:
- `id`: string (UUID primary key)
- `name`: string (user-defined project name)
- `created_at`: timestamp (ISO 8601 string)
- `updated_at`: timestamp (ISO 8601 string)
- `description`: string (optional project description)

**Validation Rules**:
- `name` must be non-empty, max 100 characters
- `name` must be unique within user scope
- `description` max 500 characters

### Album Entity  
**Purpose**: Collection of photos within a project
**Fields**:
- `id`: string (UUID primary key)
- `project_id`: string (foreign key to Project)
- `name`: string (user-defined album name)
- `display_order`: integer (position within project)
- `created_at`: timestamp (ISO 8601 string)
- `updated_at`: timestamp (ISO 8601 string)
- `description`: string (optional album description)

**Validation Rules**:
- `name` must be non-empty, max 100 characters
- `name` must be unique within project scope
- `display_order` must be non-negative integer
- `description` max 500 characters

**Relationships**:
- Belongs to one Project (many-to-one)
- Contains many Photos (one-to-many)

### Photo Entity
**Purpose**: Generated image with metadata and organization
**Fields**:
- `id`: string (UUID primary key)  
- `album_id`: string (foreign key to Album)
- `prompt`: string (generation prompt used)
- `fal_url`: string (URL returned by fal.ai)
- `model_name`: string (AI model used for generation)
- `display_order`: integer (position within album)
- `created_at`: timestamp (ISO 8601 string)
- `generation_params`: string (JSON metadata for model parameters)
- `file_size`: integer (optional, in bytes)
- `dimensions`: string (optional, "widthxheight" format)

**Validation Rules**:
- `prompt` must be non-empty, max 1000 characters
- `fal_url` must be valid URL format
- `model_name` must be from supported models list
- `display_order` must be non-negative integer
- `generation_params` must be valid JSON

**Relationships**:
- Belongs to one Album (many-to-one)

### AI Model Entity (Reference Data)
**Purpose**: Available AI models for photo generation
**Fields**:
- `id`: string (fal.ai model identifier)
- `display_name`: string (user-friendly name)
- `description`: string (model capabilities description)
- `is_active`: boolean (currently available)
- `default_params`: string (JSON default parameters)

### Prompt Template Entity
**Purpose**: Reusable prompt structures for common scenarios
**Fields**:
- `id`: string (UUID primary key)
- `name`: string (template name)
- `template`: string (prompt template with placeholders)
- `category`: string (template category/type)
- `created_at`: timestamp (ISO 8601 string)
- `usage_count`: integer (how many times used)

**Validation Rules**:
- `name` must be unique, max 100 characters
- `template` must contain at least one placeholder `{variable}`
- `category` from predefined list

## Database Schema

### SQLite Tables

```sql
-- Projects table
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Albums table  
CREATE TABLE albums (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    name TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
    UNIQUE(project_id, name),
    UNIQUE(project_id, display_order)
);

-- Photos table
CREATE TABLE photos (
    id TEXT PRIMARY KEY,
    album_id TEXT NOT NULL,
    prompt TEXT NOT NULL,
    fal_url TEXT NOT NULL,
    model_name TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    generation_params TEXT, -- JSON
    file_size INTEGER,
    dimensions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (album_id) REFERENCES albums (id) ON DELETE CASCADE,
    UNIQUE(album_id, display_order)
);

-- AI Models reference table
CREATE TABLE ai_models (
    id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    default_params TEXT -- JSON
);

-- Prompt Templates table
CREATE TABLE prompt_templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    template TEXT NOT NULL,
    category TEXT NOT NULL,
    usage_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_albums_project_order ON albums(project_id, display_order);
CREATE INDEX idx_photos_album_order ON photos(album_id, display_order);  
CREATE INDEX idx_photos_created ON photos(created_at);
```

## State Transitions

### Album Display Order Changes
When albums are reordered via drag-and-drop:
1. Calculate new display_order values
2. Update all affected albums in single transaction
3. Maintain uniqueness constraint

### Photo Organization
When photos are moved between albums:
1. Remove from source album (update display_order gaps)
2. Insert into target album (shift existing orders)
3. Update photo.album_id and display_order

### Data Consistency Rules
- Cascade deletes: Project deletion removes albums and photos
- Order integrity: No duplicate display_order values within scope
- URL validation: Verify fal.ai URLs are accessible during save
- Concurrent access: Use SQLite WAL mode for better concurrency

## TypeScript Interfaces

```typescript
export interface Project {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Album {
  id: string;
  project_id: string;
  name: string;
  display_order: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Photo {
  id: string;
  album_id: string;
  prompt: string;
  fal_url: string;
  model_name: string;
  display_order: number;
  generation_params?: string;
  file_size?: number;
  dimensions?: string;
  created_at: string;
}

export interface AIModel {
  id: string;
  display_name: string;
  description: string;
  is_active: boolean;
  default_params?: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  template: string;
  category: string;
  usage_count: number;
  created_at: string;
}
```