import { ImageEntity } from "../shared";
import api from "../service/api";

export default (img: ImageEntity) => {
  return `${api.getBaseURL()}/static/${img?.path}`;
};
