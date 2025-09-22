/**
 * Projects API Contract
 * Manages project CRUD operations and organization
 */

export interface ProjectsAPI {
  // List all projects with album counts
  getProjects(): Promise<ProjectWithAlbumCount[]>;
  
  // Create new project
  createProject(data: CreateProjectRequest): Promise<Project>;
  
  // Update project details
  updateProject(id: string, data: UpdateProjectRequest): Promise<Project>;
  
  // Delete project (cascades to albums and photos)
  deleteProject(id: string): Promise<void>;
  
  // Reorder projects
  reorderProjects(data: ReorderProjectsRequest): Promise<void>;
}

// Request/Response Types
export interface CreateProjectRequest {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  color?: string;
}

export interface ReorderProjectsRequest {
  projectOrders: Array<{
    id: string;
    displayOrder: number;
  }>;
}

export interface ProjectWithAlbumCount extends Project {
  albumCount: number;
  albums?: AlbumPreview[]; // Optional preloaded albums
}

export interface AlbumPreview {
  id: string;
  name: string;
  photoCount: number;
  coverPhotoUrl?: string;
  displayOrder: number;
}

// Error Types
export interface ProjectError {
  code: 'PROJECT_NOT_FOUND' | 'INVALID_NAME' | 'DUPLICATE_ORDER';
  message: string;
  field?: string;
}
