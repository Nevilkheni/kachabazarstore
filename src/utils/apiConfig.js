export const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    if (hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      return `${protocol}//${hostname}:8000`;
    }
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//localhost:8000`;
    }
    
    return `${protocol}//${hostname}:8000`;
  }
  
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
};

export const getGoogleBackendUrl = () => {
  return getApiUrl();
};

export const getGithubBackendUrl = () => {
  return getApiUrl();
};