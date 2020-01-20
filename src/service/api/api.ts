import apisauce, { ApisauceConfig } from "apisauce";
import { LocalStorage } from "service/localStorage";

const createApi = (config: Partial<ApisauceConfig> = {}) => {
  const api = apisauce.create({
    baseURL: process.env.API_URL,
    ...config
  });

  const token = LocalStorage.getItem("assess_token");

  if (token && token.length) {
    api.setHeader("authorization", `JWT ${token}`);
  }

  const authMonitor = (response: any) => {
    if (response.status === 401) {
      console.log("401", response);
    }
  };

  api.addMonitor(authMonitor);

  return {
    inner: api,
    core: {
      directoryList: (...directories: any[]) => api.post("/core/directory_list/", { directories }),
      item: {
        get: (type: string, id: string) => api.get("/core/item/${type}/${id}/"),
        save: (type: string, data: any) => api.post("/core/item/${type}/", data)
      }
    },
    auth: {
      token: (data: { username: string; password: string }) => api.post("/auth/token/", data)
    }
  };
};

export default createApi();
