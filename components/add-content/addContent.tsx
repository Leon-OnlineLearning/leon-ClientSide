import axios from "axios";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import { FC, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import apiInstance from "../../controller/utils/api";
import config from "../../utils/config";

interface AddContentProps {
    courseId: string
}

const AddContent: FC<AddContentProps> = ({ courseId }) => {
    return (
        <UploadTrainingFiles
            courseId={courseId}
            related
            submissionUrl="placeholder"
            onSubmit={trainingFileUploader}
        />
    )
}

interface UploadTrainingFilesProps {
    related?: boolean,
    submissionUrl: string,
    onSubmit: (url: string, courseId: string, className: string, files: any[]) => Promise<any>,
    courseId: string
}

const trainingFileUploader = async (url, courseId: string, className: string, files: any[]) => {
    const formData = new FormData()
    formData.append('className', className)
    formData.append('courseId', courseId)
    files.forEach((file) => {
        formData.append(`files`, file);
    })
    // TODO change back to apiInstance
    await axios.post("http://localhost:5000/bruh", formData)
        .then(resp => resp.data)
        .catch(err => console.error(err))

    // await apiInstance.post(url, formData)
    //     .then(resp => resp.data)
    //     .catch(err => console.error(err))
}

export const UploadTrainingFiles: FC<UploadTrainingFilesProps> = ({ courseId, related = false, onSubmit, submissionUrl: url }) => {
    const [files, setFiles] = useState([])
    const [className, setClassName] = useState("")
    const [done, setDone] = useState(false)
    return (
        <>
            <h1>{`Upload ${related ? "related" : "non-related"} content`}</h1>
            <Form
                onSubmit={async (e) => {
                    e.preventDefault();
                    await onSubmit(url, courseId, className, files)
                    setDone(true)
                }}
            >
                <Form.Group>
                    <Form.Label htmlFor="className">Class name</Form.Label>
                    <FormControl
                        onChange={e => {
                            setClassName(e.target.value);
                        }}
                        value={className}
                        id="className"
                        placeholder="E.g. Dynamic programming" />
                </Form.Group>
                <input type="file" name="courseFiles" data-testid="training-upload-file" multiple onChange={(e) => {
                    setFiles(Array.from(e.target.files))
                }} />
                <Button type="submit">Add</Button>
                {done ? <div data-testid="training-upload-files-done">done</div> : ""}
            </Form>
        </>
    )
}

interface SearchForTrainingFilesProps {
    submissionUrl: string,
    related?: boolean,
    onSearch: (courseName: string, fileName: string) => Promise<any[]>,
    onSubmit: (url: string, courseName: string, className: string, files: string[]) => Promise<any>, // url is for related / non related 
    originalCourseId: string
}

// this may look like over engineering and it probably is
// i just wanted my component to look less uglier 😅 
// i'm just trying a new way of managing the state that might work
// this may look like the class state if you remember it 
function useCourseFileState() {
    const [courseSearchTerm, setCourseSearchTerm] = useState<string>("")
    const [fileSearchTerm, setFileSearchTerm] = useState<string>("")
    const [files, setFiles] = useState<any[]>([])
    const [selectedFiles, setSelectedFiles] = useState<any[]>([])
    const [filesSent, setFilesSent] = useState(false)
    const [className, setClassName] = useState("")
    return {
        className,
        setClassName,
        filesSent,
        setFilesSent,
        courseSearchTerm,
        setCourseSearchTerm,
        fileSearchTerm,
        setFileSearchTerm,
        files,
        setFiles,
        selectedFiles,
        setSelectedFiles
    }
}

export const SearchForTrainingFiles: FC<SearchForTrainingFilesProps> = ({ submissionUrl: url, originalCourseId, related = false, onSearch, onSubmit }) => {
    const state = useCourseFileState()

    return (
        <>
            <h1>{`Search For ${related ? "related" : "non-related"} content`}</h1>
            <Form onSubmit={async (e) => {
                e.preventDefault()
                if (state.files.length > 0)
                    await onSubmit(url, originalCourseId, state.className, state.selectedFiles.map(f => f.id))
                state.setFilesSent(true);
            }}>
                <FormControl
                    placeholder="Class name"
                    value={state.className}
                    onChange={(e) => {
                        state.setClassName(e.target.value)
                    }} />
                <FormControl
                    placeholder="Course code"
                    value={state.courseSearchTerm}
                    onChange={(e) => {
                        state.setCourseSearchTerm(e.target.value)
                    }}
                />
                <FormControl
                    placeholder="Topic"
                    value={state.fileSearchTerm}
                    onChange={(e) => {
                        state.setFileSearchTerm(e.target.value)
                    }}
                />
                <Button onClick={async () => {
                    const files = await onSearch(state.courseSearchTerm, state.fileSearchTerm);
                    state.setFiles(files)
                }}>Search</Button>
                {state.files.length > 0 ?
                    <Form.Group data-testid="fileNames" onChange={(e) => {
                        const selectedFilesNames = Array.from(e.target.selectedOptions, (option: any) => option.value)
                        state.setSelectedFiles(state.files.filter(file => {
                            return selectedFilesNames.find(name => name === file.name)
                        }))
                    }}>
                        <Form.Label>Files</Form.Label>
                        <FormControl multiple as="select" data-testid="select-multi-files">
                            {state.files.map(file => {
                                return <option key={file.id}>{file.name}</option>
                            })}
                        </FormControl>
                    </Form.Group>
                    : ""}
                <Button type="submit">Send</Button>
                {state.filesSent ?
                    <div data-testid="send-successfully">Send successfully</div>
                    : ""}
            </Form>
        </>
    );
}

export default AddContent;