import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStores } from "../stores";

const sniffToken = () => {
  const router = useRouter();
  const { auth } = useStores();

  useEffect(() => {
    const token = router.query.token as string;
    if (token) {
      auth.setToken(token);
      router.replace("/", "/", { shallow: true });
    }
  }, [router.query]);
};
export default sniffToken;

export const TokenSniffer = () => {
  sniffToken();
  return null;
};
