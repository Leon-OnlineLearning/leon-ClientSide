import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import UserInputError from "../../controller/utils/UserInputError";
import { useError } from "../../hooks/useError";

interface ModelsViewProps {
  modelsFetcher: (courseId: string) => Promise<any>;
  courseId: string;
  onRaiseModel: (modelId: string) => Promise<any>;
}

function useModelViewState() {
  const [models, setModels] = useState([]);

  return {
    models,
    setModels,
  };
}

const ModelsView: FC<ModelsViewProps> = ({
  onRaiseModel,
  modelsFetcher,
  courseId,
}) => {
  const state = useModelViewState();
  const router = useRouter();
  const [error, errorMsg, errSetter] = useError();
  useEffect(() => {
    const _modelsFetcher = async () => {
      try {
        const models = await modelsFetcher(courseId);
        state.setModels(models);
      } catch (e) {
        if (e instanceof UserInputError)
          errSetter(`${e.message}, Try again later`);
      }
    };
    _modelsFetcher();
  }, []);

  return (
    <>
      {error && <div className="text-danger">{errorMsg}</div>}
      {state.models ? (
        <Table striped bordered hover>
          <thead>
            <th>Model name</th>
            <th>Options</th>
          </thead>
          <tbody>
            {state.models.map((model) => {
              return (
                <tr
                  key={model.id}
                  data-testid={`model-container-${model.name}`}
                >
                  <td>
                    {model.name} {model.accuracy}
                  </td>
                  <td>
                    {model.associatedTest ? (
                      <Button
                        onClick={() => {
                          router.push(`/tests/${model.id}`);
                        }}
                      >
                        Show test
                      </Button>
                    ) : (
                      ""
                    )}
                    <br />
                    <Button
                      onClick={async () => {
                        await onRaiseModel(model.id);
                      }}
                    >
                      Raise
                    </Button>
                    <ul>
                      {model.subModules &&
                        model.subModules.map((subModule) => {
                          return (
                            <li key={subModule.id}>
                              {subModule.name} {subModule.accuracy}
                            </li>
                          );
                        })}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </>
  );
};

export default ModelsView;
