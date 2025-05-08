import axios from 'axios';
import { API_URL } from '../config';

export async function login(username: string, password: string, publicKey: string) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      username,
      password,
      publicKey,
    });
    return { ...response.data, status: response.status };
  } catch (error: any) {
    if (error.response) {
      return {
        error: true,
        status: error.response.status,
        message: error.response.data.error || 'Login failed',
      };
    }

    return {
      error: true,
      message: error.message || 'Network error during login',
    };
  }
}

export async function register(username: string, password: string, publicKey: string) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      username,
      password,
      publicKey,
    });
    return { ...response.data, status: response.status };
  } catch (error: any) {
    if (error.response) {
      return {
        error: true,
        status: error.response.status,
        message: error.response.data.error || 'Registration failed',
      };
    }

    return {
      error: true,
      message: error.message || 'Network error during registration',
    };
  }
}
