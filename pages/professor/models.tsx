import ModelCard from "../../components/professor/dashboard/models/card";
import CardIcon from "../../components/professor/dashboard/models/card-icon";
import {
  ProfessorDashboard,
  ProfessorDashboardSelectedPage,
} from "../../components/professor/dashboard/professor-dashboard";
import styles from "./professor-pages-styles.module.css";

export default function Model() {
  console.log("styles", styles);
  return (
    <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.models}>
      <div className={`${styles["container"]}`}>
        <h2 style={{
			display: "block",
			marginBottom: "24px",
			fontWeight:  600
		}}>Models Control Panel</h2>
        <section className={styles["professor-models-grid"]}>
          <ModelCard
            icon={<CardIcon iconClass="bi-file-plus-fill" />}
            title="Maintain"
            description="create and modify text classification models"
            href="/professor/textClassificationModels"
          />
          <ModelCard
            icon={<CardIcon iconClass="bi-question-square-fill" />}
            title="Test a sentence"
            description="Send test request to our servers to test your model"
            href="/professor/requestTest"
          />
          <ModelCard
            icon={<CardIcon iconClass="bi-binoculars" />}
            title="Check results for sentence"
            description="Check test results when they are ready"
            href="/professor/testResults/sentence"
          />
          <ModelCard
            icon={<CardIcon iconClass="bi-binoculars-fill" />}
            title="Check results test file"
            description="Check test results for the file you have provided during model creation when they are ready"
            href="/professor/testResults/file"
          />
        </section>
      </div>
    </ProfessorDashboard>
  );
}
