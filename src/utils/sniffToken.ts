import useWillMount from "./useWillMount";
import { useRouter } from "next/router";
import AuthService from "../service/AuthServiceService";
import { useEffect } from "react";

const sniffToken = () => {
  const router = useRouter();
  useEffect(() => {
    const token = router.query.token as string;
    if (token) {
      AuthService.setToken(token);
      router.replace("/", "/", { shallow: true });
    }
  }, [router.query]);
};
export default sniffToken;

export const TokenSniffer = () => {
  sniffToken();
  return null;
};
