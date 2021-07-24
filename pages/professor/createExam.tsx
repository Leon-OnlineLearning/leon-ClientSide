import React from "react";
import ExamCreateForm from "../../components/examination/create_exam/examform/examForm";
import { ProfessorDashboard, ProfessorDashboardSelectedPage } from "../../components/professor/dashboard/professor-dashboard";





export default function createExamView() {
    return (<>
        <ProfessorDashboard selectedPage={ProfessorDashboardSelectedPage.exams}>
        <ExamCreateForm />
        </ProfessorDashboard>
    </>)
}
function validateTitle(title: string) {
    if (title.length > 0)
        return true

    return false
}