import { ApiResponse, create } from "apisauce";
import Router from "next/router";
import { local } from "../config";

const api = create({
  baseURL: local ? "http://localhost:6001/v1" : "https://dota2classic.ru/prod-api",
  headers: {
    accept: "application/json"
  }
});

const monitor = async (response: ApiResponse<any>) => {
  if ((response.status == 401 || response.status == 403) && response.config?.url?.includes("/admin")) {
    // not-admin requests.
    await Router.push("/");
  }
};

if (typeof window !== "undefined") api.addMonitor(monitor);

export default api;
