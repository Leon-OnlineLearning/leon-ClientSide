import { Button } from "react-bootstrap";
import apiInstance from "../../controller/utils/api";

/**
 * WILL BE REMOVED
 */
export default function TOBEREMOVED() {
  const sendFakeLectureHandler = async () => {
    await apiInstance.post("/lectures/bruh/video");
  };
  return (
    <Button onClick={sendFakeLectureHandler}>
      Click me to send a fake lecture
    </Button>
  );
}
