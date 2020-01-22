import apisauce, { ApisauceConfig } from "apisauce";

const createApi = (config: Partial<ApisauceConfig> = {}) => {
  const api = apisauce.create({ baseURL: process.env.API_URL, ...config });

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
