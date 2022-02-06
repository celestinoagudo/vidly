import http from "./httpService";
import config from "../config.json";
import decode from "jwt-decode";

const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(config.authEndpoint, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return decode(jwt);
  } catch (error) {
    return null;
  }
}

const auth = {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};

export default auth;
