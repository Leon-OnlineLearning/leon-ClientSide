import LectureCard from "../../lecture-card/lecture-card";
import styles from "./lectures.module.css";
type LectureInfo = {
    lectureTitle: string,
    lectureDate: Date
}

type ProfessorLecturesProps = {
    lectures: [LectureInfo]
}

export default function ProfessorLectures({ lectures }: ProfessorLecturesProps) {
    return (
        <>
            <div className={styles["professor-lecture-layout"]}>
                <div className={styles["professor-current-lectures"]}>
                    {
                        lectures.map(lec => {
                            return <LectureCard key={lec.lectureTitle} lectureDate={lec.lectureDate} lectureTitle={lec.lectureTitle} />
                        })
                    }
                </div>
                <div className={`p-3 m-3`}>
                    asd
                </div>
            </div>
        </>
    );
}