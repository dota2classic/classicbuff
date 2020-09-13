import api from "../service/api";
import { ImageEntity } from "../generated/sdk";

export default (img: ImageEntity) => {
  return `${api.getBaseURL()}/static/${img?.path}`;
};
