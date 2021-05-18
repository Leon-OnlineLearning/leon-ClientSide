import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton, Form, FormControl, FormGroup, Modal, Table } from "react-bootstrap"
import { addNewCourse, deleteCourse, editCourse, getAllCourses } from "../../../controller/courses/courses";
import { getDepartments } from "../../../controller/departments";
import UserInputError from "../../../controller/utils/UserInputError";
import { useError } from "../../../hooks/useError";
import janus from "../../../public/janus/janus";
import { DeleteButton, EditButton } from "../../buttons";

interface EditModalProps {
    departments: any[];
    show: boolean;
    newEntity?: boolean;
    currentCourseState: any;
    currentCourseOnChange: Dispatch<SetStateAction<{ name: string; department: string; year: number; }>>
    onHide: () => void;
    onSubmit: (newCourse) => Promise<void>,
    error?: boolean,
    errorMessage?: string,
    errorMessageSetter?: (errorMessage: string, errorState) => void
}

function EditModal({ departments,
    show,
    onHide,
    currentCourseState,
    currentCourseOnChange,
    newEntity = false,
    onSubmit,
    error = false,
    errorMessage = "",
    errorMessageSetter
}: EditModalProps
) {
    const [selectedDepartment, setSelectedDepartment] = useState<any>({});
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{!newEntity ? `Edit course "${currentCourseState.name}"` : "Add new course"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    // TODO edit the course
                    onSubmit(currentCourseState);
                }}>
                    {
                        //TODO known issue: year should be set to a limit
                    }
                    {error ? <div style={{ color: "red" }}>{errorMessage}</div> : ""}
                    <FormGroup controlId="courseName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            onChange={(e) => {
                                currentCourseOnChange({ ...currentCourseState, name: e.target.value })
                                errorMessageSetter("", false);
                            }}
                            value={currentCourseState.name}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup controlId="courseYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="number"
                            onChange={(e) => {
                                currentCourseOnChange({ ...currentCourseState, year: e.target.value })
                            }}
                            value={currentCourseState.year}
                        />
                    </FormGroup>
                    <br />
                    <DropdownButton
                        title={selectedDepartment.name ?? "Departments"}
                        onSelect={(id: string) => {
                            const department = departments.filter(dep => {
                                console.log("departmetn is", dep);
                                return dep.id === id
                            })[0]
                            setSelectedDepartment(department)
                            currentCourseOnChange({ ...currentCourseState, department: department.id })
                        }}
                    >
                        {departments.map(dep => {
                            return <Dropdown.Item key={dep.id} eventKey={dep.id}>
                                {dep.name}
                            </Dropdown.Item>
                        })}
                    </DropdownButton>
                    <Button type="submit">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

const CoursesLayout: React.FC = () => {
    // Courses will be {id: course} to do fast upserts
    const [courses, setCourses] = useState({})
    const [userError, userErrorMessage, userErrorSetter] = useError()
    const [showEditingModal, setShowEditingModal] = useState(false)
    const [showDeletionModal, setShowDeletionModal] = useState(false)
    const [newCourseModalShow, setNewCourseModalShow] = useState(false)
    const [departments, setDepartments] = useState([])
    const [selectedCourse, setSelectedCourse] = useState({
        name: "def",
        department: "bruh",
        year: 1
    })
    const [scaffoldForNewState, setScaffoldNewState] = useState({
        name: "",
        department: "",
        year: 1
    })

    useEffect(() => {
        const departmentsGetter = async () => {
            console.log("getting departments...");
            const deps = await getDepartments();
            setDepartments(deps);
        }
        departmentsGetter();
    }, [])

    useEffect(() => {
        const getCourses = async () => {
            const c = await getAllCourses()
            let newCourses = {}
            c.forEach(course => {
                newCourses = { ...newCourses, [course.id]: course }
            });
            setCourses(newCourses)
        }
        getCourses()
    }, [])

    const onCourseUpsertHandlerUi = (courseData) => {
        const newCourses = { ...courses, [courseData.id]: courseData }
        console.log("new courses", newCourses);
        setCourses(newCourses)
    }

    const onCourseDeleteHandlerUi = (courseId: string) => {
        let newCoursesState = { ...courses }
        delete newCoursesState[courseId]
        setCourses(newCoursesState)
    }

    return (
        <>
            <h1>Courses</h1>
            <div style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                padding: "16px"
            }}>
                <Button onClick={() => {
                    setNewCourseModalShow(true)
                }}>
                    <i className="bi bi-file-earmark-plus-fill"></i> Add new
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Associated Department</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(courses).map((courseId, idx) => {
                        return (
                            <Fragment key={courseId}>
                                <tr>
                                    <td>{idx + 1}</td>
                                    <td>{courses[courseId].name}</td>
                                    <td>{courses[courseId].year}</td>
                                    <td>{
                                        departments.filter(
                                            dep => dep.id === courses[courseId].department
                                        )[0].name
                                    }</td>
                                    <td>
                                        <EditButton
                                            onClick={() => {
                                                setSelectedCourse(courses[courseId])
                                                setShowEditingModal(true)
                                            }}
                                        />
                                    </td>
                                    <td><DeleteButton onClick={() => {
                                        deleteCourse(courseId)
                                        onCourseDeleteHandlerUi(courseId)
                                    }} /></td>
                                </tr>
                            </Fragment>
                        )
                    })}
                </tbody>
            </Table>
            <EditModal
                error={userError}
                errorMessage={userErrorMessage}
                errorMessageSetter={userErrorSetter}
                departments={departments}
                currentCourseState={selectedCourse}
                currentCourseOnChange={setSelectedCourse}
                onHide={() => setShowEditingModal(false)}
                show={showEditingModal}
                onSubmit={async (courseData) => {
                    try {
                        await editCourse(selectedCourse, courseData)
                        onCourseUpsertHandlerUi(courseData);
                        setShowEditingModal(false)
                    } catch (e) {
                        if (e instanceof UserInputError) {
                            userErrorSetter(e.message, true);
                        } else {
                            throw e;
                        }
                    }
                }} />
            <EditModal
                error={userError}
                errorMessage={userErrorMessage}
                errorMessageSetter={userErrorSetter}
                newEntity
                departments={departments}
                currentCourseState={scaffoldForNewState}
                currentCourseOnChange={setScaffoldNewState}
                onHide={() => setNewCourseModalShow(false)}
                show={newCourseModalShow}
                onSubmit={async (courseData) => {
                    try {
                        let course = await addNewCourse(courseData)
                        course.department = course.department.id
                        onCourseUpsertHandlerUi(course);
                        setNewCourseModalShow(false)
                    } catch (e) {
                        if (e instanceof UserInputError) {
                            userErrorSetter(e.message, true);
                        } else {
                            throw e;
                        }
                    }
                }} />
        </>
    )
}

export default CoursesLayout;