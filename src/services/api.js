import axios from "axios";

export const apiBR = axios.create({
  baseURL: process.env.REACT_APP_BR_URL,
  headers: {
    'X-Riot-Token': process.env.REACT_APP_TOKEN,
    'Content-Type': 'application/json'
  }
});

export const apiAmericas = axios.create({
  baseURL: process.env.REACT_APP_AMERICAS_URL,
  timeout: 10000,
  headers: {
    'X-Riot-Token': process.env.REACT_APP_TOKEN,
    'Content-Type': 'application/json'
  }
});

