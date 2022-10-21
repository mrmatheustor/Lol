import axios from "axios";

export const apiBR = axios.create({
  baseURL: process.env.REACT_APP_BR_URL,
  headers: {
    'X-Riot-Token': "RGAPI-6f72d84a-6ab9-4588-96d6-5f4b61452b90",
    'Content-Type': 'application/json'
  }
});

export const apiAmericas = axios.create({
  baseURL: process.env.REACT_APP_AMERICAS_URL,
  timeout: 10000,
  headers: {
    'X-Riot-Token': "RGAPI-6f72d84a-6ab9-4588-96d6-5f4b61452b90",
    'Content-Type': 'application/json'
  }
});

