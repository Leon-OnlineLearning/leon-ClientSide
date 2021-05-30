import axios from "axios";
import { FC, useContext, useEffect, useState } from "react";
import { Button, Form, FormControl, Spinner } from "react-bootstrap";
import LocalStorageContext from "../../contexts/localStorageContext";
import {
  searchFiles,
  searchForNonRelatedTrainingFilesSubmit,
  searchForRelatedTrainingFilesSubmit,
} from "../../controller/training/searchForTrainngFiles";
import {
  testingFileUploader,
  trainingNonRelatedFileUploader,
  trainingRelatedFileUploader,
} from "../../controller/training/trainingFileUploader";

interface AddContentProps {
  courseId: string;
  sessionStorage: any;
}

const AddContent: FC<AddContentProps> = ({ courseId, sessionStorage }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const localStorageContext = useContext(LocalStorageContext);
  const steps = [
    <UploadFiles
      sessionStorage={sessionStorage}
      related
      courseId={courseId}
      onSubmit={trainingRelatedFileUploader}
      professorId={localStorageContext.userId}
    />,
    <UploadFiles
      sessionStorage={sessionStorage}
      courseId={courseId}
      onSubmit={trainingNonRelatedFileUploader}
      professorId={localStorageContext.userId}
    />,
    <SearchForTrainingFiles
      related
      onSearch={searchFiles}
      onSubmit={searchForRelatedTrainingFilesSubmit}
      originalCourseId="courseId"
      sessionStorage={sessionStorage}
      professorId={localStorageContext.userId}
    />,
    <SearchForTrainingFiles
      onSearch={searchFiles}
      onSubmit={searchForNonRelatedTrainingFilesSubmit}
      originalCourseId="courseId"
      sessionStorage={sessionStorage}
      professorId={localStorageContext.userId}
    />,
    <UploadFiles
      sessionStorage={sessionStorage}
      courseId={courseId}
      onSubmit={testingFileUploader}
      testing
      professorId={localStorageContext.userId}
    />,
  ];

  return (
    <>
      {steps[currentPage]}
      <div>
        step {currentPage + 1} of {steps.length}
      </div>
      <div>
        {currentPage !== 0 ? (
          <Button
            onClick={() => {
              setCurrentPage((prev) => {
                return Math.max(prev - 1, 0);
              });
            }}
          >
            Previous
          </Button>
        ) : (
          ""
        )}
        {currentPage !== steps.length - 1 ? (
          <Button
            onClick={() => {
              setCurrentPage((current) =>
                Math.min(current + 1, steps.length - 1)
              );
            }}
          >
            Next
          </Button>
        ) : (
          <Button>Finish</Button>
        )}
      </div>
    </>
  );
};

interface UploadTrainingFilesProps {
  related?: boolean;
  onSubmit: (
    courseId: string,
    files: any[],
    professorId: string,
    className?: string,
    sessionId?: string
  ) => Promise<any>;
  courseId: string;
  sessionStorage: any;
  professorId: string;
  testing?: boolean;
}

// TODO ROOM FOR IMPROVEMENT
//
// react will detect the similarity between the element in the page and
// only update what changes, as this component is currently used for related and
// non related what actually changes is the onSubmit function and a couple of
// conditionally rendered elements. But the similar items (class name text input
// and the upload files fields will remain unchanged. This isn't very intuitive
// that's why i made the hidden field "hack" trying to solve this issue
// To see the effect i'm referencing run checkout c9b4efe53e333efc23d5018009222960317dbcea

export const UploadFiles: FC<UploadTrainingFilesProps> = ({
  testing = false,
  sessionStorage,
  courseId,
  related = false,
  onSubmit,
  professorId,
}) => {
  // react will detect the similarity between the element in the page and
  // only update what changes, as this
  const [files, setFiles] = useState([]);
  const [unrelatedFiles, setUnrelatedFiles] = useState([]);
  const [className, setClassName] = useState("");
  const [unrelatedClassName, setUnrelatedClassName] = useState("");
  const [done, setDone] = useState(false);
  return (
    <>
      <section data-testid="title-container">
        {testing ? (
          <h1>{`Upload your testing file`}</h1>
        ) : (
          <h1>{`Upload ${related ? "related" : "non-related"} content`}</h1>
        )}
      </section>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await onSubmit(
            courseId,
            related ? files : unrelatedFiles,
            professorId,
            related ? className : unrelatedClassName,
            sessionStorage.getItem("sessionId")
          );
          if (result) {
            if (result.sessionId) {
              sessionStorage.setItem("sessionId", result.sessionId);
              setDone(true);
            }
          } else {
            setDone(false);
          }
          setClassName("");
          setFiles([]);
        }}
      >
        {
          <div data-testid="class-name-place">
            {!testing ? (
              related ? (
                <Form.Group>
                  <Form.Label htmlFor="className">Class name</Form.Label>
                  <FormControl
                    onChange={(e) => {
                      setClassName(e.target.value);
                    }}
                    value={className}
                    id="className"
                    placeholder="E.g. Dynamic programming"
                  />
                </Form.Group>
              ) : (
                <Form.Group>
                  <Form.Label htmlFor="className">Class name</Form.Label>
                  <FormControl
                    onChange={(e) => {
                      setUnrelatedClassName(e.target.value);
                    }}
                    value={unrelatedClassName}
                    id="className"
                    placeholder="E.g. Dynamic programming"
                  />
                </Form.Group>
              )
            ) : (
              ""
            )}
          </div>
        }
        {testing ? (
          <input
            hidden={!testing}
            type="file"
            name="testingFile"
            data-testid="testing-upload-file"
            multiple
            onChange={(e) => {
              setUnrelatedFiles(Array.from(e.target.files));
            }}
          />
        ) : (
          <>
            <input
              type="file"
              name="courseFiles"
              data-testid="training-related-upload-file"
              multiple
              hidden={!related}
              onChange={(e) => {
                setFiles(Array.from(e.target.files));
              }}
            />
            <input
              hidden={related}
              type="file"
              name="courseFiles"
              data-testid="training-non-related-upload-file"
              multiple
              onChange={(e) => {
                setUnrelatedFiles(Array.from(e.target.files));
              }}
            />
          </>
        )}
        <Button type="submit">Add</Button>
        {done ? <div data-testid="training-upload-files-done">done</div> : ""}
      </Form>
    </>
  );
};

interface SearchForTrainingFilesProps {
  related?: boolean;
  onSearch: (courseName: string, fileName: string) => Promise<any[]>;
  onSubmit: (
    courseId: string,
    className: string,
    professorId: string,
    files: string[],
    sessionStorage: any
  ) => Promise<any>; // url is for related / non related
  originalCourseId: string;
  sessionStorage: any;
  professorId: string;
}

// TODO move to controller
const assignExistingItems = async (
  url,
  className,
  courseId,
  files,
  sessionId
) => {
  try {
    const resp = await axios
      .post(url, {
        className,
        courseId,
        files,
        sessionId,
      })
      .then((resp) => resp.data);

    if (resp.sessionId) sessionStorage.setItem("sessionId", resp.sessionId);
  } catch (e) {
    console.error(e);
  }
};

// this may look like over engineering and it probably is
// i just wanted my component to look less uglier 😅
// i'm just trying a new way of managing the state that might work
// this may look like the class state if you remember it
function useCourseFileState() {
  const [courseSearchTerm, setCourseSearchTerm] = useState<string>("");
  const [fileSearchTerm, setFileSearchTerm] = useState<string>("");
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [filesSent, setFilesSent] = useState(false);
  const [className, setClassName] = useState("");
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
    setSelectedFiles,
  };
}

export const SearchForTrainingFiles: FC<SearchForTrainingFilesProps> = ({
  sessionStorage,
  originalCourseId,
  related = false,
  onSearch,
  onSubmit,
  professorId,
}) => {
  const state = useCourseFileState();

  return (
    <>
      <h1>{`Search For ${related ? "related" : "non-related"} content`}</h1>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          if (state.files.length > 0)
            await onSubmit(
              originalCourseId,
              state.className,
              professorId,
              state.selectedFiles.map((f) => f.id),
              sessionStorage
            );
          state.setFilesSent(true);
        }}
      >
        <FormControl
          placeholder="Class name"
          value={state.className}
          onChange={(e) => {
            state.setClassName(e.target.value);
          }}
        />
        <FormControl
          placeholder="Course code"
          value={state.courseSearchTerm}
          onChange={(e) => {
            state.setCourseSearchTerm(e.target.value);
          }}
        />
        <FormControl
          placeholder="Topic"
          value={state.fileSearchTerm}
          onChange={(e) => {
            state.setFileSearchTerm(e.target.value);
          }}
        />
        <Button
          onClick={async () => {
            const files = await onSearch(
              state.courseSearchTerm,
              state.fileSearchTerm
            );
            state.setFiles(files);
          }}
        >
          Search
        </Button>
        {state.files.length > 0 ? (
          <Form.Group
            data-testid="fileNames"
            onChange={(e) => {
              const selectedFilesNames = Array.from(
                e.target.selectedOptions,
                (option: any) => option.value
              );
              state.setSelectedFiles(
                state.files.filter((file) => {
                  return selectedFilesNames.find((name) => name === file.name);
                })
              );
            }}
          >
            <Form.Label>Files</Form.Label>
            <FormControl multiple as="select" data-testid="select-multi-files">
              {state.files.map((file) => {
                return <option key={file.id}>{file.name}</option>;
              })}
            </FormControl>
          </Form.Group>
        ) : (
          <br />
        )}
        <Button type="submit">Send</Button>
        {state.filesSent ? (
          <div data-testid="send-successfully">Send successfully</div>
        ) : (
          ""
        )}
      </Form>
    </>
  );
};

interface ContentConfigProps {
  courseId: string;
  sessionStorage: any;
  onSubmit: (
    sessionId: string,
    data: { ignoreCase: boolean; ignoreCommonWords: boolean },
    originalCourseId: string
  ) => Promise<any>;
}

function useContentConfig() {
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreCommonWords, setIgnoreCommonWords] = useState(false);
  return {
    ignoreCase,
    setIgnoreCase,
    ignoreCommonWords,
    setIgnoreCommonWords,
  };
}

/**
 * NOTE: this was intended to be the last step notice the
 * the sessionId setter to undefined
 * @param param0
 * @returns
 */
export const ContentConfig: FC<ContentConfigProps> = ({
  courseId,
  sessionStorage,
  onSubmit,
}) => {
  const state = useContentConfig();
  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await onSubmit(
              sessionStorage.getItem("sessionId"),
              {
                ignoreCase: state.ignoreCase,
                ignoreCommonWords: state.ignoreCommonWords,
              },
              courseId
            );
            sessionStorage.setItem("sessionId", undefined);
          } catch (e) {
            throw e;
          }
        }}
      >
        <Form.Check
          label="ignore case"
          checked={state.ignoreCase}
          onChange={(e) => {
            state.setIgnoreCase(e.target.checked);
          }}
        />
        <Form.Check
          label="ignore common words"
          checked={state.ignoreCommonWords}
          onChange={(e) => {
            state.setIgnoreCommonWords(e.target.checked);
          }}
        />
      </Form>
    </>
  );
};

export default AddContent;
