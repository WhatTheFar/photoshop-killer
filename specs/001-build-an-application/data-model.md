# Data Model: AI Photo Generation and Album Management

## Core Entities

### User
**Purpose**: Represents the application user and their preferences
```typescript
interface User {
  id: string;
  preferences: {
    defaultModel: string;
    gridSize: 'small' | 'medium' | 'large';
    theme: 'light' | 'dark' | 'system';
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Project
**Purpose**: Top-level organizational container for albums
```typescript
interface Project {
  id: string;
  name: string;
  description?: string;
  color?: string; // For visual distinction
  displayOrder: number;
  albumCount: number; // Computed field
  createdAt: Date;
  updatedAt: Date;
}
```

### Album
**Purpose**: Collection of photos with organizational metadata
```typescript
interface Album {
  id: string;
  name: string;
  description?: string;
  projectId: string; // Foreign key to Project
  displayOrder: number; // Order within project
  coverPhotoId?: string; // Optional cover photo
  photoCount: number; // Computed field
  createdAt: Date;
  updatedAt: Date;
}
```

### Photo
**Purpose**: Generated image with metadata and album assignment
```typescript
interface Photo {
  id: string;
  albumId: string; // Foreign key to Album
  url: string; // fal.ai hosted URL
  prompt: string; // Original generation prompt
  model: string; // AI model used
  parameters: Record<string, any>; // Model-specific parameters
  displayOrder: number; // Order within album
  width: number;
  height: number;
  fileSize?: number; // If available from fal.ai
  generationTime?: number; // Time to generate in seconds
  createdAt: Date;
}
```

### PromptTemplate
**Purpose**: Reusable prompt configurations for photo generation
```typescript
interface PromptTemplate {
  id: string;
  name: string;
  description?: string;
  basePrompt: string;
  parameters: PromptParameter[];
  model: string; // Preferred model for this template
  tags: string[]; // For categorization
  usageCount: number; // Track popularity
  createdAt: Date;
  updatedAt: Date;
}

interface PromptParameter {
  name: string;
  type: 'text' | 'number' | 'select';
  defaultValue: any;
  options?: string[]; // For select type
  description?: string;
}
```

### AIModel
**Purpose**: Available AI models for photo generation
```typescript
interface AIModel {
  id: string;
  name: string;
  displayName: string;
  description: string;
  capabilities: ModelCapability[];
  parameters: ModelParameter[];
  isActive: boolean;
  costPerImage?: number;
  averageGenerationTime?: number;
}

interface ModelCapability {
  name: string;
  description: string;
}

interface ModelParameter {
  name: string;
  type: 'number' | 'text' | 'select' | 'boolean';
  defaultValue: any;
  min?: number;
  max?: number;
  options?: string[];
  description: string;
}
```

## Relationships

### One-to-Many Relationships
- **Project → Albums**: One project contains many albums
- **Album → Photos**: One album contains many photos
- **User → Projects**: One user owns many projects (future multi-user support)

### Constraints
- **Album nesting prevention**: Albums cannot contain other albums (flat structure)
- **Display order uniqueness**: Within each container (project/album), display orders must be unique
- **Cascade deletions**: Deleting project removes all albums and photos; deleting album removes all photos

## State Transitions

### Photo Generation Workflow
1. **Draft**: User configures prompt and model
2. **Generating**: Request sent to fal.ai
3. **Success**: Photo URL received and saved
4. **Failed**: Error state with retry option

### Album Management
1. **Created**: Empty album in project
2. **Populated**: Contains photos
3. **Reorganized**: Display order changed via drag/drop

### Project Organization
1. **Active**: Normal state with albums
2. **Archived**: Hidden from main view but preserved
3. **Deleted**: Soft delete with recovery option

## Validation Rules

### Project Validation
- Name: Required, 1-100 characters
- Description: Optional, max 500 characters
- Display order: Must be unique within user scope

### Album Validation
- Name: Required, 1-100 characters
- Project assignment: Must reference existing project
- Display order: Must be unique within project

### Photo Validation
- URL: Must be valid fal.ai URL format
- Prompt: Required, 1-2000 characters
- Model: Must reference known AI model
- Album assignment: Must reference existing album

### Prompt Template Validation
- Name: Required, unique within user scope
- Base prompt: Required, 1-2000 characters
- Parameters: Valid parameter definitions

## Performance Considerations

### Indexing Strategy
- Primary keys on all id fields
- Indexes on foreign keys (projectId, albumId)
- Composite index on (projectId, displayOrder)
- Composite index on (albumId, displayOrder)
- Text search index on photo prompts

### Query Optimization
- Use pagination for large photo collections
- Preload album counts for project display
- Cache frequently accessed templates
- Lazy load photo metadata vs. full objects

### Storage Estimates
- 100 projects × 50 albums × 1000 photos = 5M photo records
- Average record size ~500 bytes = 2.5GB database
- Well within SQLite limits and performance range
