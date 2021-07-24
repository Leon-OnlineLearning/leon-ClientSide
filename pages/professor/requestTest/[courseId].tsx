import { CSSProperties } from "gsap";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { useState } from "react";
import { Button, Card, FormControl, Spinner } from "react-bootstrap";
import { getFileTestResult, sendSentence } from "../../../controller/testing";

export default function TestSentence() {
  const [sentence, setSentence] = useState("");
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<any>("");
  const smallCardsStyle = {
    padding: "4px",
    margin: "4px",
    display: "inline",
  };
  const handleSending = async () => {
    setLoading(true);
    console.log("loading", loading, "sent", sent);
    sendSentence(router.query["courseId"] as string, sentence).then((res) => {
      setRes(res);
    });
    setLoading(false);
    console.log("loading", loading, "sent", sent);
    setSent(true);
    console.log("loading", loading, "sent", sent);
    setTimeout(() => {
      setSent(false);
      console.log("loading", loading, "sent", sent);
    }, 4000);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "linear-gradient(45deg, #0275D8 , #5BC0DE)",
        flexDirection: "column",
      }}
    >
      <Card className="p-4">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5>Send sentence</h5>
        </div>
        <FormControl
          placeholder="Your test sentence"
          value={sentence}
          onChange={(e) => {
            setSentence(e.target.value);
          }}
          style={{
            margin: "12px 0px",
          }}
        />
        <Button
          style={{
            alignSelf: "center",
          }}
          onClick={handleSending}
        >
          Test
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && <Spinner variant="primary" animation="border" />}
          <br />

          <div
            style={{
              opacity: sent ? 1 : 0,
              transition: "0.3s",
            }}
          >
            <span>
              <i className="bi bi-check-circle-fill text-success"></i>
            </span>{" "}
            Sent
          </div>
        </div>
        Note: test takes sometime you can wait for it here or check the test
        results page after few minutes <br />
      </Card>
      <div className="p-4">
        <Card style={smallCardsStyle}>
          {res && `Category: ${res["predicted_category"]}`}
        </Card>
        <Card style={smallCardsStyle}>
          {res && `Class: ${res["predicted_class"]}`}
        </Card>
      </div>
    </div>
  );
}
