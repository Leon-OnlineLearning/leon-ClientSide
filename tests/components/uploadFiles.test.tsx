import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { render, waitFor, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"
import { UploadTrainingFiles } from '../../components/add-content/addContent'
import axios from 'axios'
import LocalStorageMock from "../mocks/LocalstorageMock";

const lsMock = new LocalStorageMock()

describe("upload files test suite", () => {

    let classNameCorrectlySent = false
    let courseIdCorrectlySent = false
    let filesCorrectlySent = false

    const server = setupServer(
        rest.post('/training/related/upload', (req, res, ctx) => {
            const form: any = req.body;
            classNameCorrectlySent = form.get('className') === "ClassName"
            courseIdCorrectlySent = form.get('courseId') === "courseId"
            const files = form.getAll('files')
            filesCorrectlySent = (files[0].name === "important.pdf") && (files[1].name === "chucknorris.pdf")
            return res(ctx.json({ success: true, sessionId: "12345" }))
        }),
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    const trainingFileUploader = async (url, courseId, className, files) => {
        const formData = new FormData()
        formData.append('className', className)
        formData.append('courseId', courseId)
        files.forEach((file) => {
            formData.append(`files`, file);
        })
        return await axios.post(url, formData)
            .then(resp => resp.data)
            .catch(err => console.error(err))
    }

    test("it should render valid related state", () => {
        render(<UploadTrainingFiles
            sessionStorage={lsMock}
            related
            courseId="courseId"
            submissionUrl="/training/related/upload"
            onSubmit={trainingFileUploader}
        />
        )
        expect(screen.getByText("Upload related content")).toBeVisible()
    })

    test("it should render valid related state", () => {
        render(<UploadTrainingFiles
            sessionStorage={lsMock}
            courseId="courseId"
            submissionUrl="/training/related/upload"
            onSubmit={trainingFileUploader}
        />
        )
        expect(screen.getByText("Upload non-related content")).toBeVisible()
    })

    test("it should upload files", async () => {
        render(<UploadTrainingFiles
            sessionStorage={lsMock}
            courseId="courseId"
            related
            submissionUrl="/training/related/upload"
            onSubmit={trainingFileUploader}
        />)
        const importantPdfFiles = [
            new File(['¯\_(ツ)_/¯'], 'important.pdf', {
                type: "application/pdf"
            }),
            new File(['(⌐□_□)'], 'chucknorris.pdf', {
                type: 'application/pdf',
            })
        ]

        userEvent.upload(
            screen.getByTestId("training-upload-file"),
            importantPdfFiles
        )
        userEvent.type(screen.getByPlaceholderText("E.g. Dynamic programming"), "ClassName")
        userEvent.click(screen.getByText("Add"))
        await waitFor(() => screen.getByTestId("training-upload-files-done"))

        expect(classNameCorrectlySent).toBeTruthy()
        expect(filesCorrectlySent).toBeTruthy()
        expect(courseIdCorrectlySent).toBeTruthy()
        expect(lsMock.getItem('sessionId')).toEqual("12345")
    })
})