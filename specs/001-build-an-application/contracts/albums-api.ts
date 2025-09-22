/**
 * Albums API Contract
 * Manages album CRUD operations and photo organization
 */

export interface AlbumsAPI {
  // List albums for a project
  getAlbumsByProject(projectId: string): Promise<AlbumWithPhotoCount[]>;
  
  // Get single album with photos
  getAlbum(id: string): Promise<AlbumDetail>;
  
  // Create new album
  createAlbum(data: CreateAlbumRequest): Promise<Album>;
  
  // Update album details
  updateAlbum(id: string, data: UpdateAlbumRequest): Promise<Album>;
  
  // Delete album (cascades to photos)
  deleteAlbum(id: string): Promise<void>;
  
  // Reorder albums within project
  reorderAlbums(projectId: string, data: ReorderAlbumsRequest): Promise<void>;
  
  // Set album cover photo
  setCoverPhoto(albumId: string, photoId: string): Promise<void>;
}

// Request/Response Types
export interface CreateAlbumRequest {
  name: string;
  description?: string;
  projectId: string;
}

export interface UpdateAlbumRequest {
  name?: string;
  description?: string;
}

export interface ReorderAlbumsRequest {
  albumOrders: Array<{
    id: string;
    displayOrder: number;
  }>;
}

export interface AlbumWithPhotoCount extends Album {
  photoCount: number;
  coverPhotoUrl?: string;
}

export interface AlbumDetail extends AlbumWithPhotoCount {
  photos: PhotoPreview[];
  project: {
    id: string;
    name: string;
  };
}

export interface PhotoPreview {
  id: string;
  url: string;
  prompt: string;
  width: number;
  height: number;
  displayOrder: number;
  createdAt: Date;
}

// Error Types
export interface AlbumError {
  code: 'ALBUM_NOT_FOUND' | 'PROJECT_NOT_FOUND' | 'INVALID_NAME' | 'DUPLICATE_ORDER';
  message: string;
  field?: string;
}
