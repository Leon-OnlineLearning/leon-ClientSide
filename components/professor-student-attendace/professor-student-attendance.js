import styles from "./student-attendance.module.css"
export default function ProfessorStudentAttendance(props) {
    return (
        <>
            <div className={styles["dropdown-container"]}>
                <div className="dropdown" style={{ flexGrow: 1 }}>
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownYears" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Years
  </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownYears">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
                <div class="dropdown" style={{ flexGrow: 1 }}>
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Courses
  </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
                <div class="dropdown" style={{ flexGrow: 1 }}>
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Lecture
  </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
        </>
    );
}