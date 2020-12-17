import { useApi } from "../api/hooks";
import { LiveMatchDtoFromJSON, LiveMatchSseDtoFromJSON, querystring, RequestOpts } from "../api/back";
import { useEffect, useState } from "react";

export const useEventSource = <T extends {}>(endpoint: RequestOpts, transformer: (raw: any) => T) => {
  if (typeof window === "undefined") return null;
  const bp = useApi().apiParams.basePath;

  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const es = new EventSource(`${bp}${endpoint.path}${endpoint.query && querystring(endpoint.query, "?")}`);
    es.onmessage = ({ data: msg }) => {
      const raw = JSON.parse(msg);
      const formatted = transformer(raw);
      setData(formatted);
    };

    return () => es.close();
  }, [JSON.stringify(endpoint)]);

  return data;
};
