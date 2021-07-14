import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { getAllCoursesByProfessor } from "../../controller/user/professor/professor";

interface ProfessorsCourseSelectorProps {
  userId: string;
  parentRoute: string;
}

const ProfessorsCourseSelector: FC<ProfessorsCourseSelectorProps> = ({
  userId,
  parentRoute,
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
    router.push(`${parentRoute}/${courseId}`);
  };
  return (
    <>
      {courses.length ? (
        courses.map((course) => {
          return (
            <Card
              key={course.id}
              onClick={() => moveToWizard(course.id)}
              className="p-2"
            >
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
