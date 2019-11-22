import axios from "axios";
import {
  UserRegisterRq,
  UserLoginRq,
  UserProfileRs,
  UserRs
} from "@/store/modules/user.d.ts";
import loader from "../store/modules/loader";
import errorsholder from "../store/modules/errorsholder";
import users from '@/store/modules/users';

const apiUrl =
  process.env.BACK_URL ||
  "http://1a818e70-832b-4c7e-b149-bf3cc68fba1a.pub.cloud.scaleway.com:3000/v1/";

export const API = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const plainAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(
  function(config) {
    loader.startThread();
    return config;
  },
  function(error) {
    loader.endThread();
    errorsholder.showError(error)
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    loader.endThread();
    return response;
  },
  function(error) {
    if (error.response && error.response.config && error.response.status === 401) {
      return plainAxios
        .post("users/refresh", {}, { headers: { "X-CSRF-TOKEN": localStorage.getItem("csrf")} })
        .then(response => {
          users.refresh(response.data);
          // And after successful refresh - repeat the original request
          let retryConfig = error.response.config;
          retryConfig.headers["X-CSRF-TOKEN"] = localStorage.getItem("csrf");
          return plainAxios.request(retryConfig);
        })
        .catch(error => {
          users.dropAuth();
          // redirect to signin in case refresh request fails
          location.replace("/login");
          return Promise.reject(error);
        });
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    errorsholder.showError(error)
    loader.endThread();
    return Promise.reject(error);
  }
);

export function setJWT(jwt: string) {
  API.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function setCSRF(CSRF: string) {
  API.defaults.headers.common["X-CSRF-TOKEN"] = CSRF;
}


export function clearJWT() {
  delete API.defaults.headers.common["Authorization"];
}

export function clearCSRF() {
  delete API.defaults.headers.common["X-CSRF-TOKEN"];
}

export async function registerUser(
  user: UserRegisterRq
): Promise<UserRs | null> {
  try {
    const resp = await API.post("users/signup", user);
    return resp.data as UserRs;
  } catch (error) {
    return null;
  }
}

export async function loginUser(user: UserLoginRq): Promise<UserRs | null> {
  try {
    const resp = await API.post("users/signin", user);
    return resp.data as UserRs;
  } catch (error) {
    return null;
  }
}

export async function updateUser(): Promise<UserProfileRs | null> {
  try {
    const resp = await API.get("users/me");
    return resp.data as UserProfileRs;
  } catch (error) {
    return null;
  }
}

