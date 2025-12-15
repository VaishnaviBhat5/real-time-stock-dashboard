// src/api.js

export const SERVER_URL = "http://localhost:4000";

export async function getSupportedStocks() {
  const res = await fetch(`${SERVER_URL}/supported`);
  return res.json();
}

export async function getAllPrices() {
  const res = await fetch(`${SERVER_URL}/prices`);
  return res.json();
}
