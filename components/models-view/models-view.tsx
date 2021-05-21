import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

interface ModelsViewProps {
  modelsFetcher: (courseId: string) => Promise<any>;
  courseId: string;
  onRaiseModel: (modelId: string, courseId: string) => Promise<any>;
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

  useEffect(() => {
    const _modelsFetcher = async () => {
      const models = await modelsFetcher(courseId);
      state.setModels(models);
    };
    _modelsFetcher();
  },[]);

  return (
    <>
      {(state.models && state.models.length) ? (
        state.models.map((model) => {
          return (
            <div key={model.id} data-testid={`model-container-${model.name}`}>
              <strong>
                {model.name} {model.accuracy}
              </strong>
              <div>
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
                    await onRaiseModel(model.id, courseId);
                  }}
                >
                  Raise
                </Button>
                <ul>
                  {model.subModules && model.subModules.map((subModule) => {
                    return (
                      <li key={subModule.id}>
                        {subModule.name} {subModule.accuracy}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </>
  );
};

export default ModelsView;