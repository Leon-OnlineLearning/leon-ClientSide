import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import LocalStorageContext from "../contexts/localStorageContext";

type CourseDependantPageState = [string, string];

export default function useCourseDependantPage(): CourseDependantPageState {
  const localStorageContext = useContext(LocalStorageContext);
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [courseParentRoute, setcourseParentRoute] = useState("");
  useEffect(() => {
    if (localStorageContext) {
      setUserId(localStorageContext.userId);
    }
  }, [localStorageContext]);
  useEffect(() => {
    if (router.isReady) {
      setcourseParentRoute(router.pathname);
    }
  }, [router]);
  return [userId, courseParentRoute];
}
