import axios from "axios";

export const Fetcher = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
})