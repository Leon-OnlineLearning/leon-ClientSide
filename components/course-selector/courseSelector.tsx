import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { getAllCoursesByProfessor } from "../../controller/user/professor/professor";

interface ProfessorsCourseSelectorProps {
  userId: string;
  courseParentRoute: string;
}

const ProfessorsCourseSelector: FC<ProfessorsCourseSelectorProps> = ({
  userId,
  courseParentRoute,
}) => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const _coursesGetter = async () => {
      const res = await getAllCoursesByProfessor(userId);
      setCourses(res);
    };
    _coursesGetter();
  }, []);
  const moveToWizard = (courseId: string) => {
    router.push(`${courseParentRoute}/${courseId}`);
  };
  return (
    <>
      {courses.length ? (
        courses.map((course) => {
          return (
            <Card onClick={() => moveToWizard(course.id)}>
              <Card.Title>{course.name}</Card.Title>
            </Card>
          );
        })
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </>
  );
};

export default ProfessorsCourseSelector;
