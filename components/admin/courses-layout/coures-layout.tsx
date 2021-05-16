import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton, Form, FormControl, FormGroup, Modal, Table } from "react-bootstrap"
import { addNewCourse, editCourse, getAllCourses } from "../../../controller/courses/courses";
import { getDepartments } from "../../../controller/departments";
import janus from "../../../public/janus/janus";

interface EditModalProps {
    departments: any[];
    show: boolean;
    currentCourseState: any;
    currentCourseOnChange: Dispatch<SetStateAction<{ name: string; department: string; year: number; }>>
    onHide: () => void;
    onSubmit: (newCourse) => Promise<void>
}

function EditModal({ departments,
    show,
    onHide,
    currentCourseState,
    currentCourseOnChange,
    onSubmit }: EditModalProps
) {
    const [selectedDepartment, setSelectedDepartment] = useState<any>({});
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{currentCourseState.name !== "" ? `Edit course "${currentCourseState.name}"` : "Add new course"}</Modal.Title>
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
                    <FormGroup controlId="courseName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            onChange={(e) => {
                                currentCourseOnChange({ ...currentCourseState, name: e.target.value })
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
                newCourses = {...newCourses, [course.id] : course}
            });
            setCourses(newCourses)
        }
        getCourses()
    }, [])

    const onCourseUpsertHandlerUi = (courseData) => {
        const newCourses = { ...courses, [courseData.id]: courseData }
        console.log("new courses",newCourses);
        setCourses(newCourses)
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
                                    <td><Button
                                        onClick={() => {
                                            setSelectedCourse(courses[courseId])
                                            setShowEditingModal(true)
                                        }}
                                    >Edit</Button>
                                    </td>
                                    <td><Button>Delete</Button></td>
                                </tr>
                            </Fragment>
                        )
                    })}
                </tbody>
            </Table>
            <EditModal
                departments={departments}
                currentCourseState={selectedCourse}
                currentCourseOnChange={setSelectedCourse}
                onHide={() => setShowEditingModal(false)}
                show={showEditingModal}
                onSubmit={async (courseData) => {
                    await editCourse(selectedCourse, courseData)
                    onCourseUpsertHandlerUi(courseData);
                    setShowEditingModal(false)
                }} />
            <EditModal
                departments={departments}
                currentCourseState={scaffoldForNewState}
                currentCourseOnChange={setScaffoldNewState}
                onHide={() => setNewCourseModalShow(false)}
                show={newCourseModalShow}
                onSubmit={async (courseData) => {
                    await addNewCourse(courseData)
                    onCourseUpsertHandlerUi(courseData);
                    setNewCourseModalShow(false)
                }} />
        </>
    )
}

export default CoursesLayout;