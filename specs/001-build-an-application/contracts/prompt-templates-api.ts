/**
 * Prompt Templates API Contract
 * Manages reusable prompt configurations for photo generation
 */

export interface PromptTemplatesAPI {
  // List all templates with usage stats
  getTemplates(): Promise<PromptTemplateWithStats[]>;
  
  // Get single template with parameters
  getTemplate(id: string): Promise<PromptTemplateDetail>;
  
  // Create new template
  createTemplate(data: CreateTemplateRequest): Promise<PromptTemplate>;
  
  // Update template
  updateTemplate(id: string, data: UpdateTemplateRequest): Promise<PromptTemplate>;
  
  // Delete template
  deleteTemplate(id: string): Promise<void>;
  
  // Apply template to generate prompt
  applyTemplate(id: string, values: Record<string, any>): Promise<AppliedTemplate>;
  
  // Search templates by tags or content
  searchTemplates(query: string): Promise<PromptTemplateWithStats[]>;
}

// Request/Response Types
export interface CreateTemplateRequest {
  name: string;
  description?: string;
  basePrompt: string;
  parameters: PromptParameter[];
  model: string;
  tags: string[];
}

export interface UpdateTemplateRequest {
  name?: string;
  description?: string;
  basePrompt?: string;
  parameters?: PromptParameter[];
  model?: string;
  tags?: string[];
}

export interface PromptTemplateWithStats extends PromptTemplate {
  usageCount: number;
  lastUsed?: Date;
  avgRating?: number; // If rating system added
}

export interface PromptTemplateDetail extends PromptTemplateWithStats {
  recentGenerations?: Array<{
    id: string;
    photoUrl: string;
    appliedValues: Record<string, any>;
    createdAt: Date;
  }>;
}

export interface AppliedTemplate {
  finalPrompt: string;
  model: string;
  parameters: Record<string, any>;
  appliedValues: Record<string, any>;
}

// Parameter Types
export interface PromptParameter {
  name: string;
  type: 'text' | 'number' | 'select' | 'multiselect';
  defaultValue: any;
  required: boolean;
  options?: string[]; // For select/multiselect
  min?: number; // For number
  max?: number; // For number
  placeholder?: string;
  description?: string;
  validation?: {
    pattern?: string; // Regex for text
    message?: string;
  };
}

// Error Types
export interface TemplateError {
  code: 'TEMPLATE_NOT_FOUND' | 'INVALID_PARAMETERS' | 'DUPLICATE_NAME' | 'INVALID_PROMPT';
  message: string;
  field?: string;
  validationErrors?: Array<{
    parameter: string;
    message: string;
  }>;
}
