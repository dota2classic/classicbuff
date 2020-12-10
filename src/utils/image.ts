// import { ImageEntity } from "../generated/sdk";
import { appApi } from "../api/hooks";
export default (img: any) => {
  return `${appApi.apiParams.basePath}/static/${img?.path}`;
};
