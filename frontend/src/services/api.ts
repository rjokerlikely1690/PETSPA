// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

// Types
export interface Appointment {
  id?: number;
  petName: string;
  ownerName: string;
  service: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // ISO time string (HH:mm)
  notes?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// HTTP Client wrapper
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // For 204 No Content responses
        return {} as T;
      }
    } catch (error) {
      console.error(`API Request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// API Client instance
const apiClient = new ApiClient(API_BASE_URL);

// Appointment API Services
export const appointmentApi = {
  // Create a new appointment
  create: async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> => {
    return apiClient.post<Appointment>('/appointments', appointment);
  },

  // Get appointments by date
  getByDate: async (date: string): Promise<Appointment[]> => {
    return apiClient.get<Appointment[]>(`/appointments/date/${date}`);
  },

  // Get appointment by ID
  getById: async (id: number): Promise<Appointment> => {
    return apiClient.get<Appointment>(`/appointments/${id}`);
  },

  // Update appointment
  update: async (id: number, appointment: Partial<Appointment>): Promise<Appointment> => {
    return apiClient.put<Appointment>(`/appointments/${id}`, appointment);
  },

  // Delete appointment
  delete: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/appointments/${id}`);
  },

  // Search appointments by owner name
  searchByOwner: async (ownerName: string): Promise<Appointment[]> => {
    return apiClient.get<Appointment[]>(`/appointments/search?ownerName=${encodeURIComponent(ownerName)}`);
  },
};

// Utility functions
export const formatDateForApi = (date: Date): string => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

export const formatTimeForApi = (time: Date | string): string => {
  if (typeof time === 'string') {
    return time;
  }
  return time.toTimeString().split(' ')[0].substring(0, 5); // HH:mm format
};

export const parseApiDate = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00');
};

export const parseApiTime = (timeString: string): string => {
  return timeString;
};

// Status mapping between frontend and backend
export const statusMap = {
  frontend: {
    'Pendiente': 'pending',
    'En progreso': 'in_progress', 
    'Completado': 'completed',
    'Cancelado': 'cancelled'
  },
  backend: {
    'pending': 'Pendiente',
    'in_progress': 'En progreso',
    'completed': 'Completado', 
    'cancelled': 'Cancelado'
  }
} as const;

export default apiClient; 