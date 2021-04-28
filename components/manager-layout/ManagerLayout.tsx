import { Button, Card, FormControl, Modal } from "react-bootstrap";
import { useState, FC, Fragment } from "react";
import useSearch from "../../hooks/useSearch";

//TODO this is the manager layout that you will forget about it later XD
export interface ManagerLayoutProps {
  associationActions?: {
    actionName: string;
    fn: (currentId: string, associatedItemIt: string) => void;
  }[];
  actions?: { actionName: string; fn: (currentId: string) => void }[];
  onSearch?: (searchTerm: string) => Promise<any[]>;
  onAssociatedItemSearch?: (searchTerm: string) => Promise<any[]>;
  title: string;
}

export const ManagerLayout: FC<ManagerLayoutProps> = ({
  actions,
  onSearch,
  associationActions,
  onAssociatedItemSearch,
  title,
}) => {
  const [associatedItemModalShow, setAssociatedItemModalShow] = useState(false);

  const [
    associatedItemSearchTerm,
    associatedItemSearchResults,
    associatedItemTermChangeHandler,
    associatedItemSearchHandler,
  ] = useSearch(onAssociatedItemSearch);

  const [
    searchTerm,
    searchResults,
    searchTermChangeHandler,
    searchHandler,
  ] = useSearch(onSearch);

  return (
    <>
      <h2>{title}</h2>
      <section>
        <FormControl
          value={searchTerm}
          placeholder="Search"
          onChange={searchTermChangeHandler}
        />
        <Button onClick={searchHandler}>Search</Button>
        {searchResults.map((result) => {
          <Card key={result.id}>
            <Card.Body>
              <Card.Title>{result.name}</Card.Title>
              <Card.Text>
                {Object.keys(result).map((key) => {
                  if (key.toLowerCase() !== "id") {
                    return (
                      <div>
                        {key} : {result[key]}
                      </div>
                    );
                  }
                })}
              </Card.Text>
              <div style={{ display: "flex", width: "100%" }}>
                {/* For regular actions like delete */}
                {actions
                  ? actions.map((action) => {
                      return (
                        <Button
                          onClick={() => {
                            action.fn(result.id);
                          }}
                        >
                          {action.actionName}
                        </Button>
                      );
                    })
                  : ""}
                {/* For associated actions like add lecture to course*/}
                {associationActions
                  ? associationActions.map((action) => {
                      return (
                        <Fragment key={action.actionName}>
                          <Button
                            onClick={() => {
                              setAssociatedItemModalShow(true);
                            }}
                          >
                            {action.actionName}
                          </Button>
                          <Modal
                            show={associatedItemModalShow}
                            onHide={() => setAssociatedItemModalShow(false)}
                          >
                            <Modal.Title>{action.actionName}</Modal.Title>
                            <Modal.Body>
                              <FormControl
                                value={associatedItemSearchTerm}
                                placeholder="Search"
                                onChange={associatedItemTermChangeHandler}
                              />
                              <Button onClick={associatedItemSearchHandler}>
                                Search
                              </Button>
                              {associatedItemSearchResults
                                ? associatedItemSearchResults.map((aitem) => {
                                    return (
                                      <Card>
                                        <Card.Title>
                                          {aitem.name || aitem.title}
                                        </Card.Title>
                                        <Card.Footer>
                                          {associationActions.map((aaction) => {
                                            <Button
                                              onClick={() =>
                                                aaction.fn(result.id, aitem.id)
                                              }
                                            >
                                              {aaction.actionName}
                                            </Button>;
                                          })}
                                        </Card.Footer>
                                      </Card>
                                    );
                                  })
                                : ""}
                            </Modal.Body>
                          </Modal>
                        </Fragment>
                      );
                    })
                  : ""}
              </div>
            </Card.Body>
          </Card>;
        })}
      </section>
    </>
  );
};

