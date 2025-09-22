/**
 * Photos API Contract
 * Manages photo CRUD operations and organization within albums
 */

export interface PhotosAPI {
  // List photos in album with pagination
  getPhotosByAlbum(albumId: string, options?: PhotoListOptions): Promise<PhotoListResponse>;
  
  // Get single photo with metadata
  getPhoto(id: string): Promise<PhotoDetail>;
  
  // Generate new photo using AI
  generatePhoto(data: GeneratePhotoRequest): Promise<GeneratePhotoResponse>;
  
  // Save generated photo to album
  savePhoto(data: SavePhotoRequest): Promise<Photo>;
  
  // Update photo metadata
  updatePhoto(id: string, data: UpdatePhotoRequest): Promise<Photo>;
  
  // Delete photo
  deletePhoto(id: string): Promise<void>;
  
  // Reorder photos within album
  reorderPhotos(albumId: string, data: ReorderPhotosRequest): Promise<void>;
  
  // Bulk operations
  movePhotos(data: MovePhotosRequest): Promise<void>;
  deletePhotos(photoIds: string[]): Promise<void>;
}

// Request/Response Types
export interface PhotoListOptions {
  page?: number;
  limit?: number;
  sortBy?: 'created' | 'name' | 'order';
  sortDirection?: 'asc' | 'desc';
}

export interface PhotoListResponse {
  photos: PhotoPreview[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface GeneratePhotoRequest {
  prompt: string;
  model: string;
  parameters?: Record<string, any>;
  albumId?: string; // Optional target album
}

export interface GeneratePhotoResponse {
  id: string; // Generation job ID
  status: 'pending' | 'generating' | 'completed' | 'failed';
  url?: string; // Available when completed
  error?: string; // Available when failed
  estimatedTime?: number; // Seconds
}

export interface SavePhotoRequest {
  url: string;
  prompt: string;
  model: string;
  parameters: Record<string, any>;
  albumId: string;
  width: number;
  height: number;
  generationTime?: number;
}

export interface UpdatePhotoRequest {
  albumId?: string; // Move to different album
  displayOrder?: number;
}

export interface ReorderPhotosRequest {
  photoOrders: Array<{
    id: string;
    displayOrder: number;
  }>;
}

export interface MovePhotosRequest {
  photoIds: string[];
  targetAlbumId: string;
}

export interface PhotoDetail extends Photo {
  album: {
    id: string;
    name: string;
    projectId: string;
  };
  generationMetadata?: {
    processingTime: number;
    modelVersion: string;
    cost?: number;
  };
}

// Error Types
export interface PhotoError {
  code: 'PHOTO_NOT_FOUND' | 'ALBUM_NOT_FOUND' | 'GENERATION_FAILED' | 'INVALID_URL' | 'DUPLICATE_ORDER';
  message: string;
  field?: string;
}
