import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFileTestResult } from "../../../../controller/testing";

export default function FileResult() {
  const [result, setResult] = useState<any>("");
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const _getFileResult = async () => {
        const sentenceResult = await getFileTestResult(
          router.query["courseId"] as string
        );
        setResult(sentenceResult.content);
      };
      _getFileResult();
    }
  }, [router.isReady]);
  return <>{result ?? "Test results are not ready yet!"}</>;
}
