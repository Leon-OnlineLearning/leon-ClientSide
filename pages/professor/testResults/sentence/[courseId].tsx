import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Justify } from "react-bootstrap-icons";
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
    <main
      style={{
        backgroundImage: "linear-gradient(45deg, #0275D8 , #5BC0DE)",
        height: "100vh",
      }}
    >
      {result ? (
        <section
          style={{
            display: "grid",
            padding: "24px",
            alignItems: "center",
            gap: "12px",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          <h3
            style={{
              color: "#ededed",
              fontWeight: 700,
              display: "flex",
              justifyContent: "center",
              gridColumn: "1/4",
            }}
          >
            Sentence results are ready!
          </h3>
          <SentenceCard title={"sentence"} value={result.sentence} />
          <SentenceCard
            title={"predicted class"}
            value={result.predicted_class}
          />
          <SentenceCard
            title={"predicted category"}
            value={result.predicted_category}
          />
        </section>
      ) : (
        "Test results are not ready yet!"
      )}
    </main>
  );
}

function SentenceCard({ title, value }: { title: string; value: string }) {
  return (
    <Card
      className="p-3"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80px",
      }}
    >
      <div>
        <strong>{title}</strong>
      </div>
      <div>{value}</div>
    </Card>
  );
}
