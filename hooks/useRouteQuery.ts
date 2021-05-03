import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * @description
 * A custom hook wraps the logic of getting the query from the router
 * see `router.isReady` here for more info https://nextjs.org/docs/api-reference/next/router#router-object
 * 
 * @param queryParamName
 * 
 * @returns router query and boolean to check if the query value was grabbed successfully
 */
export function useRouterQuery(queryParamName: string): [string, boolean] {
  const router = useRouter();
  const id = router.query[queryParamName] as string;
  const [queryChecked, setQueryChecked] = useState(false);
  useEffect(() => {
    if (router.isReady) {
      setQueryChecked(true);
    }
  }, [router.isReady]);
  return [id, queryChecked];
}
