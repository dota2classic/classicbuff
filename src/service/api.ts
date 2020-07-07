import { ApiResponse, create } from "apisauce";
import Router from "next/router";
import { local } from "../config";

const api = create({
  baseURL: local ? "http://localhost:5002" : "https://dota2classic.ru/prod-api",
  headers: {
    accept: "application/json"
  }
});

export default api;
