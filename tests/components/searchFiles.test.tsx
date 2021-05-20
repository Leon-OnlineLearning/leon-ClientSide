import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { render, waitFor, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"
import { SearchForTrainingFiles } from '../../components/add-content/addContent'
import axios from 'axios'
import LocalStorageMock from '../mocks/LocalstorageMock'

const lsMock = new LocalStorageMock()

describe("search files test suite", () => {
    // This work around is inspired by 
    // https://github.com/mswjs/msw/issues/378#issuecomment-690901694
    let fileAreCorrect = false
    let courseNameIsCorrect = false
    let classNameIsCorrect = false
    const server = setupServer(
        rest.post('/training/related/existing', (req, res, ctx) => {
            fileAreCorrect = req.body["files"][0] === "1" && req.body["files"][1] === "2"
            courseNameIsCorrect = req.body["courseId"] === "courseId"
            classNameIsCorrect = req.body["className"] === "Any text"
            return res(ctx.json({ success: true, sessionId: "12345" }))
        }),
        rest.get('/searchFile', (req, res, ctx) => {
            return res(ctx.json([
                { name: "file1", id: "1" },
                { name: "file2", id: "2" },
                { name: "file3", id: "3" }
            ]))
        }),
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    const searchForTrainingFilesSubmit = async (url, courseId, className, files, sessionId) => {
        try {
            const resp = await axios.post(url, {
                className,
                courseId,
                files,
                sessionId
            }).then(resp => resp.data)

            if (resp.sessionId)
                lsMock.setItem('sessionId', resp.sessionId)
        } catch (e) {
            console.error(e)
        }
    }

    const searchForTrainingFilesSearch = async (courseName, fileName) => {
        try {
            return await axios.get(`/searchFile?courseName=${courseName}&topic=${fileName}`)
                .then(resp => resp.data)
        } catch (e) {
            console.error(e)
        }
    }

    test("it should render files from backend correctly", async () => {
        render(<SearchForTrainingFiles
            submissionUrl='/training/related/existing'
            related
            onSearch={searchForTrainingFilesSearch}
            onSubmit={searchForTrainingFilesSubmit}
            originalCourseId="courseId"
            sessionStorage={lsMock}
        />
        )
        userEvent.type(screen.getByPlaceholderText("Course code"), "Any text")
        userEvent.type(screen.getByPlaceholderText("Topic"), "Any text")
        userEvent.click(screen.getByText("Search"))
        await waitFor(() => screen.getByTestId("fileNames"))
        expect(screen.getByText("file1")).toBeVisible()
        expect(screen.getByText("file2")).toBeVisible()
        expect(screen.getByText("file3")).toBeVisible()
    })

    test("it should render valid related state", () => {
        render(<SearchForTrainingFiles
            submissionUrl='/training/related/existing'
            related
            onSearch={searchForTrainingFilesSearch}
            onSubmit={searchForTrainingFilesSubmit}
            originalCourseId="courseId"
            sessionStorage={lsMock}
        />)
        expect(screen.getByText("Search For related content")).toBeVisible()
    })

    test("it should render valid non-related state", () => {
        render(<SearchForTrainingFiles
            sessionStorage={lsMock}
            submissionUrl='/training/related/existing'
            onSearch={searchForTrainingFilesSearch}
            onSubmit={searchForTrainingFilesSubmit}
            originalCourseId="courseId"
        />)
        expect(screen.getByText("Search For non-related content")).toBeVisible()
    })

    test("it should send the selected files correctly", async () => {
        render(<SearchForTrainingFiles
            sessionStorage={lsMock}
            submissionUrl='/training/related/existing'
            onSearch={searchForTrainingFilesSearch}
            onSubmit={searchForTrainingFilesSubmit}
            originalCourseId="courseId"
        />)
        userEvent.type(screen.getByPlaceholderText("Class name"), "Any text")
        userEvent.type(screen.getByPlaceholderText("Course code"), "Any text")
        userEvent.type(screen.getByPlaceholderText("Topic"), "Any text")
        userEvent.click(screen.getByText("Search"))
        await waitFor(() => screen.getByTestId("fileNames"))
        userEvent.selectOptions(screen.getByTestId("select-multi-files"), ["file1", "file2"])
        userEvent.click(screen.getByText("Send"))
        await waitFor(() => screen.getByTestId("send-successfully"))
        expect(fileAreCorrect).toBeTruthy()
        expect(courseNameIsCorrect).toBeTruthy()
        expect(classNameIsCorrect).toBeTruthy()
        expect(screen.getByText("Send successfully")).toBeVisible()
        expect(lsMock.getItem('sessionId')).toEqual("12345")
    })

})
