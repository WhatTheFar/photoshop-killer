/**
 * Fal.ai Integration Contract
 * Defines interface for AI photo generation service
 */

export interface FalAIService {
  // Get available models
  getModels(): Promise<FalAIModel[]>;
  
  // Generate photo using specific model
  generatePhoto(request: FalAIGenerateRequest): Promise<FalAIGenerateResponse>;
  
  // Check generation status (for async operations)
  getGenerationStatus(jobId: string): Promise<FalAIStatusResponse>;
  
  // Get model details and parameters
  getModelDetails(modelId: string): Promise<FalAIModelDetail>;
}

// Fal.ai Types
export interface FalAIModel {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: {
    perImage: number;
    currency: string;
  };
  capabilities: string[];
  status: 'active' | 'deprecated' | 'maintenance';
}

export interface FalAIGenerateRequest {
  model: string;
  prompt: string;
  negativePrompt?: string;
  imageSize?: {
    width: number;
    height: number;
  };
  numImages?: number;
  seed?: number;
  guidanceScale?: number;
  numInferenceSteps?: number;
  scheduler?: string;
  enableSafetyChecker?: boolean;
  [key: string]: any; // Model-specific parameters
}

export interface FalAIGenerateResponse {
  requestId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  images?: FalAIImage[];
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    processingTimeMs: number;
    cost: number;
    modelVersion: string;
  };
}

export interface FalAIStatusResponse {
  requestId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  progress?: number; // 0-100
  estimatedTimeRemaining?: number; // seconds
  images?: FalAIImage[];
  error?: {
    code: string;
    message: string;
  };
}

export interface FalAIImage {
  url: string;
  width: number;
  height: number;
  fileSize?: number;
  contentType: string;
  seed?: number;
}

export interface FalAIModelDetail extends FalAIModel {
  parameters: FalAIModelParameter[];
  examples: Array<{
    prompt: string;
    parameters: Record<string, any>;
    imageUrl: string;
  }>;
  limits: {
    maxWidth: number;
    maxHeight: number;
    maxPromptLength: number;
    maxImages: number;
  };
}

export interface FalAIModelParameter {
  name: string;
  type: 'string' | 'integer' | 'float' | 'boolean' | 'enum';
  required: boolean;
  default?: any;
  min?: number;
  max?: number;
  options?: string[]; // For enum type
  description: string;
}

// Error Types
export interface FalAIError {
  code: 'INVALID_MODEL' | 'INVALID_PROMPT' | 'QUOTA_EXCEEDED' | 'SERVICE_UNAVAILABLE' | 'GENERATION_FAILED';
  message: string;
  details?: {
    model?: string;
    requestId?: string;
    httpStatus?: number;
  };
}

// Rate Limiting
export interface FalAIRateLimit {
  remaining: number;
  resetTime: Date;
  limit: number;
}

// Webhook Types (for async operations)
export interface FalAIWebhookPayload {
  requestId: string;
  status: 'completed' | 'failed';
  result?: FalAIGenerateResponse;
  error?: FalAIError;
  timestamp: string;
}
