import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getSentenceTestResult } from "../../../../controller/testing";
export default function SentenceResult() {
  const [result, setResult] = useState<any>("");
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const _getSentenceResult = async () => {
        const sentenceResult = await getSentenceTestResult(
          router.query["courseId"] as string
        );
        setResult(sentenceResult.content);
      };
      _getSentenceResult();
    }
  }, [router.isReady]);
  return (
    <>
      {result ? (
        <div>
          predicted class : {result.predicted_class} <br />
          predicted category : {result.predicted_category}
        </div>
      ) : (
        "Test results are not ready yet!"
      )}
    </>
  );
}
