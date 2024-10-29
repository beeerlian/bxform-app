import { persistCache } from "apollo3-cache-persist";
import { InMemoryCache } from "@apollo/client";

async function initCache(): Promise<InMemoryCache> {
  const cache: InMemoryCache = new InMemoryCache();

  await persistCache({
    cache,
    storage: window.localStorage,
    debug: process.env.NODE_ENV === "development",
  });

  return cache;
}
export default initCache;
