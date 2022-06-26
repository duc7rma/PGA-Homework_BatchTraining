export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? '/api' : 'https://google.com';
export const APIUrl = development ? process.env.REACT_APP_API_URL : 'https://google.com';


export const ACCESS_TOKEN_KEY = 'token';

export const urlLoginAPI = "http://api.training.div3.pgtest.co/api/v1/auth/login";
export const urlSignUpLocationAPI = "http://api.training.div3.pgtest.co/api/v1/location";
export const urlRegisterAPI = "http://api.training.div3.pgtest.co/api/v1/auth/register";
export const urlSignUpLocationPidAPI = "http://api.training.div3.pgtest.co/api/v1/location?pid=";


export const baseURL = "http://api.training.div3.pgtest.co"