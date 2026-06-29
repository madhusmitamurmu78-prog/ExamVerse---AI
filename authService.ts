import { UserProfile } from '../types';

const TOKEN_KEY = 'examverse_jwt_token';
const USER_KEY = 'examverse_user_profile';

export class AuthService {
  private static token: string | null = localStorage.getItem(TOKEN_KEY);
  private static user: UserProfile | null = (() => {
    const stored = localStorage.getItem(USER_KEY);
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  static getToken(): string | null {
    return this.token;
  }

  static getUser(): UserProfile | null {
    return this.user;
  }

  static isAuthenticated(): boolean {
    return !!this.token;
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private static saveSession(token: string, user: UserProfile) {
    this.token = token;
    this.user = user;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static clearSession() {
    this.token = null;
    this.user = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  static async register(data: any): Promise<{ user: UserProfile; verificationToken: string }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Registration failed');
    }
    return res.json();
  }

  static async login(data: any): Promise<UserProfile> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    const result = await res.json();
    this.saveSession(result.token, result.user);
    return result.user;
  }

  static async loginWithGoogle(data: { email: string; fullName: string; profilePicture?: string }): Promise<UserProfile> {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Google Login failed');
    }
    const result = await res.json();
    this.saveSession(result.token, result.user);
    return result.user;
  }

  static async verifyEmail(token: string): Promise<UserProfile> {
    const res = await fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Email verification failed');
    }
    const result = await res.json();
    if (result.user && this.user && result.user.id === this.user.id) {
      this.user = result.user;
      localStorage.setItem(USER_KEY, JSON.stringify(this.user));
    }
    return result.user || this.user;
  }

  static async forgotPassword(email: string): Promise<{ success: boolean; message: string; resetToken?: string }> {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Forgot password request failed');
    }
    return res.json();
  }

  static async resetPassword(data: any): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Password reset failed');
    }
    return res.json();
  }

  static async updateProfile(data: any): Promise<UserProfile> {
    const res = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Profile update failed');
    }
    const updatedUser = await res.json();
    this.user = updatedUser;
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  }

  static async changePassword(data: any): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Password change failed');
    }
    return res.json();
  }

  static async deleteAccount(): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/auth/delete-account', {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Account deletion failed');
    }
    const result = await res.json();
    this.clearSession();
    return result;
  }

  static async exportData(): Promise<any> {
    const res = await fetch('/api/auth/export-data', {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Data export failed');
    }
    return res.json();
  }

  static async getProfile(): Promise<UserProfile> {
    const res = await fetch('/api/auth/me', {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) {
      this.clearSession();
      throw new Error('Session expired');
    }
    const profile = await res.json();
    this.user = profile;
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    return profile;
  }

  static async adminGetUsers(): Promise<UserProfile[]> {
    const res = await fetch('/api/admin/users', {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to fetch users');
    }
    return res.json();
  }

  static async adminUpdateUser(id: string, data: any): Promise<UserProfile> {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update user');
    }
    return res.json();
  }

  static async adminDeleteUser(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete user');
    }
    return res.json();
  }

  static async adminGetAnalytics(): Promise<any> {
    const res = await fetch('/api/admin/analytics', {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to fetch analytics');
    }
    return res.json();
  }
}
