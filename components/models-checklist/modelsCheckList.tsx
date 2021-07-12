import { FC, useEffect, useState } from "react";
import { Button, Form, FormCheck, FormControl, Spinner } from "react-bootstrap";
import ModelClasses from "../../model/ModelClasses";

interface ModelChecklistProps {
  contentFetcher: (modelId) => Promise<ModelClasses[]>;
  onRetrain: (modelId: string, classes: ModelClasses[]) => Promise<any>;
  modelId: string;
}

const ModelChecklist: FC<ModelChecklistProps> = ({
  contentFetcher,
  modelId,
  onRetrain,
}) => {
  const [classes, setClasses] = useState<ModelClasses[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<ModelClasses[]>([]);
  const [retrainedSuccessfully, setRetrainedSuccessfully] = useState(false);
  useEffect(() => {
    const _getClasses = async () => {
      const classes = await contentFetcher(modelId);
      setClasses(classes);
    };
    _getClasses();
  }, [modelId]);
  return (
    <>
      {classes && classes.length !== 0 ? (
        <section data-testid="classes">
          <Form>
            {classes.map((_class) => {
              return (
                <FormCheck
                  key={_class.id}
                  type="checkbox"
                  label={_class.name}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedClasses(selectedClasses.concat(_class));
                    } else {
                      setSelectedClasses(
                        selectedClasses.filter((c) => {
                          return c.id != _class.id;
                        })
                      );
                    }
                  }}
                />
              );
            })}
            <Button
              onClick={async () => {
                try {
                  await onRetrain(modelId, classes);
                  setRetrainedSuccessfully(true);
                } catch (e) {
                  // TODO handle this gracefully
                  console.error(e);
                }
              }}
            >
              Retrain
            </Button>
            <Button onClick={() => {}}>Build a new model</Button>
            {retrainedSuccessfully ? "done" : ""}
          </Form>
        </section>
      ) : (
        <Spinner variant="primary" animation="border" />
      )}
    </>
  );
};

export default ModelChecklist;
