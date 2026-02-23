import { api } from './api';

const GetService = async (queryPath: string = '', token?: string) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const r = await api.get(queryPath, { headers });
    return r.data;
  } catch (error) {
    console.error('Failed to fetch GetService:', error);
    throw error;
  }
};

const PostService = async (
  queryPath: string = '',
  payload?: any,
  token?: string
) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const r = await api.post(queryPath, payload, { headers });
    return r;
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Backend error:', error.response.data);
      console.log('📄 Status:', error.response.status);
      console.log('📦 Headers:', error.response.headers);
    } else {
      console.log('Unexpected error:', error.message);
    }
    throw error;
  }
};

const DeleteService = async (queryPath: string = '', token?: string) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const r = await api.delete(queryPath, { headers });
    return r;
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Backend error:', error.response.data);
      console.log('📄 Status:', error.response.status);
    } else {
      console.log('Unexpected error:', error.message);
    }
    throw error;
  }
};

const PutService = async (
  queryPath: string = '',
  payload?: any,
  token?: string
) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const r = await api.put(queryPath, payload, { headers });
    return r;
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Backend error:', error.response.data);
      console.log('📄 Status:', error.response.status);
    } else {
      console.log('Unexpected error:', error.message);
    }
    throw error;
  }
};

const PatchService = async (
  queryPath: string = '',
  payload?: any,
  token?: string
) => {
  try {
    const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    // Don't set Content-Type for FormData - browser will set it with boundary
    const config = payload instanceof FormData 
      ? { headers: authHeader }
      : { headers: { ...authHeader, 'Content-Type': 'application/json' } };
    
    const r = await api.patch(queryPath, payload, config);
    return r;
  } catch (error: any) {
    if (error.response) {
      console.log('❌ Backend error:', error.response.data);
      console.log('📄 Status:', error.response.status);
    } else {
      console.log('Unexpected error:', error.message);
    }
    throw error;
  }
};

export { GetService, PostService, DeleteService, PutService, PatchService };
