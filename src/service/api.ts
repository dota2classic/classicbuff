import { ApiResponse, create } from "apisauce";
import Router from "next/router";
import { local } from "../config";

const api = create({
  baseURL: local ? "http://localhost:5002" : "http://80.249.145.22:5002",
  headers: {
    accept: "application/json"
  }
});

export default api;
