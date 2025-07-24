const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api` || '/api'
  : 'http://localhost:10000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

class ApiClient {
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  }

  private setAuthToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('authToken', token);
  }

  private removeAuthToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('authToken');
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getAuthToken();
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        // If the response contains validation errors, include them in the error
        if (data.errors) {
          const error = new Error(data.message || `Request failed with status ${response.status}`);
          (error as any).errors = data.errors;
          throw error;
        } else {
          throw new Error(data.message || `Request failed with status ${response.status}`);
        }
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async register(userData: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await this.makeRequest<{ user: User; token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (response.success && response.data?.token) {
        this.setAuthToken(response.data.token);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(credentials: LoginData): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await this.makeRequest<{ user: User; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      if (response.success && response.data?.token) {
        this.setAuthToken(response.data.token);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    return this.makeRequest<{ user: User }>('/auth/profile');
  }

  async logout(): Promise<ApiResponse> {
    try {
      const response = await this.makeRequest('/auth/logout', {
        method: 'POST',
      });
      
      this.removeAuthToken();
      return response;
    } catch (error) {
      // Even if the request fails, remove the token locally
      this.removeAuthToken();
      throw error;
    }
  }

  async getUserStats(): Promise<ApiResponse<{
    totalUsers: number;
    newUsersThisMonth: number;
    nativeLanguagesCount: number;
    targetLanguagesCount: number;
  }>> {
    return this.makeRequest('/users/stats');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

export const apiClient = new ApiClient();
export type { User, RegisterData, LoginData, ApiResponse };