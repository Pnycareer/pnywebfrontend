import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Attach token for GET requests only (public token)
axiosInstance.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();

  if (method === 'get') {
    const publicToken = process.env.NEXT_PUBLIC_PUBLIC_ACCESS_TOKEN;
    if (publicToken) {
      config.headers.Authorization = `Bearer ${publicToken}`;
    }
  }

  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
