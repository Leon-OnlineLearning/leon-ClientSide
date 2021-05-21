import axios from "axios";
import { apiResolver } from "next/dist/next-server/server/api-utils";
import { FC, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import apiInstance from "../../controller/utils/api";
import config from "../../utils/config";

interface AddContentProps {
    courseId: string,
    sessionStorage?: any
}

const AddContent: FC<AddContentProps> = ({ courseId, sessionStorage = window.localStorage }) => {
    return (
        <UploadTrainingFiles
            courseId={courseId}
            related
            submissionUrl="placeholder"
            onSubmit={trainingFileUploader}
            sessionStorage={sessionStorage}
        />
    )
}

interface UploadTrainingFilesProps {
    related?: boolean,
    submissionUrl: string,
    onSubmit: (url: string, courseId: string, files: any[], className?: string, sessionId?: string) => Promise<any>,
    courseId: string,
    sessionStorage: any,
    testing?: boolean
}

const trainingFileUploader = async (url, courseId: string, files: any[], className: string, sessionId?: string) => {
    const formData = new FormData()
    if (className)
        formData.append('className', className)
    formData.append('courseId', courseId)
    files.forEach((file) => {
        formData.append(`files`, file);
    })

    if (sessionId)
        formData.append('sessionId', sessionId)

    return await apiInstance.post(url, formData)
        .then(resp => resp.data)
        .catch(err => console.error(err))
}

export const UploadTrainingFiles: FC<UploadTrainingFilesProps> = (
    {
        testing = false,
        sessionStorage,
        courseId,
        related = false,
        onSubmit,
        submissionUrl: url
    }
) => {
    const [files, setFiles] = useState([])
    const [className, setClassName] = useState("")
    const [done, setDone] = useState(false)
    return (
        <>
            <section data-testid="title-container">
                {testing ?
                    <h1>{`Upload your testing file`}</h1>
                    :
                    <h1>{`Upload ${related ? "related" : "non-related"} content`}</h1>
                }</section>
            <Form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const result = await onSubmit(url, courseId, files, className, sessionStorage.getItem('sessionId'))
                    if (result.sessionId) { sessionStorage.setItem('sessionId', result.sessionId) }
                    setDone(true)
                }}
            >
                {
                    <div data-testid="class-name-place">
                        {!testing ?
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
                            : ""}
                    </div>
                }
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
    onSubmit: (url: string, courseName: string, className: string, files: string[], sessionId?: string) => Promise<any>, // url is for related / non related 
    originalCourseId: string,
    sessionStorage: any,
}

const assignExistingItems = async (url, className, courseId, files, sessionId) => {
    try {
        const resp = await axios.post(url, {
            className,
            courseId,
            files,
            sessionId
        })
            .then(resp => resp.data)

        if (resp.sessionId)
            sessionStorage.setItem('sessionId', resp.sessionId)
    } catch (e) {
        console.error(e)
    }
}


// this may look like over engineering and it probably is
// i just wanted my component to look less uglier 😅 
// i'm just trying a new way of managing the state that might work
// this may look like the class state if you remember it 
// Q1: Why this approach over keeping all the state in a single object?
// A1: Because i don't want the whole tree to get updated whenever a 
//     single state property got changed.
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

export const SearchForTrainingFiles: FC<SearchForTrainingFilesProps> = ({ sessionStorage, submissionUrl: url, originalCourseId, related = false, onSearch, onSubmit }) => {
    const state = useCourseFileState()

    return (
        <>
            <h1>{`Search For ${related ? "related" : "non-related"} content`}</h1>
            <Form onSubmit={async (e) => {
                e.preventDefault()
                if (state.files.length > 0)
                    await onSubmit(url, originalCourseId, state.className, state.selectedFiles.map(f => f.id), sessionStorage.getItem('sessionId'))
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
                    : <br />}
                <Button type="submit">Send</Button>
                {state.filesSent ?
                    <div data-testid="send-successfully">Send successfully</div>
                    : ""}
            </Form>
        </>
    );
}

interface ContentConfigProps {
    courseId: string,
    sessionStorage: any,
    onSubmit: (
        sessionId: string,
        data: { ignoreCase: boolean, ignoreCommonWords: boolean },
        originalCourseId: string
    ) => Promise<any>
}

function useContentConfig() {
    const [ignoreCase, setIgnoreCase] = useState(false);
    const [ignoreCommonWords, setIgnoreCommonWords] = useState(false);
    return {
        ignoreCase,
        setIgnoreCase,
        ignoreCommonWords,
        setIgnoreCommonWords
    }
}

/**
 * NOTE: this was intended to be the last step notice the 
 * the sessionId setter to undefined
 * @param param0 
 * @returns 
 */
export const ContentConfig: FC<ContentConfigProps> = ({ courseId, sessionStorage, onSubmit }) => {
    const state = useContentConfig()
    return (
        <>
            <Form onSubmit={
                async (e) => {
                    e.preventDefault();
                    try {
                        await onSubmit(
                            sessionStorage.getItem('sessionId'),
                            { ignoreCase: state.ignoreCase, ignoreCommonWords: state.ignoreCommonWords },
                            courseId
                        )
                        sessionStorage.setItem('sessionId', undefined)
                    } catch (e) {
                        throw e;
                    }
                }
            }>
                <Form.Check label="ignore case"
                    checked={state.ignoreCase} onChange={(e) => {
                        state.setIgnoreCase(e.target.checked);
                    }} />
                <Form.Check label="ignore common words"
                    checked={state.ignoreCommonWords} onChange={(e) => {
                        state.setIgnoreCommonWords(e.target.checked);
                    }} />
            </Form>
        </>
    )
}

export default AddContent;