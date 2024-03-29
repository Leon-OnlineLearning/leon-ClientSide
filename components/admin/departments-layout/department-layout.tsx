import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table"
import UserInputError from "../../../controller/utils/UserInputError";
import { useError } from "../../../hooks/useError";
import { DeleteButton, EditButton } from "../../buttons";
import styles from "./list-layout.module.css"

interface ItemModalTemplateProps {
  show: boolean,
  onHide: () => void,
  title: string,
  itemName: string,
  onSubmit: () => Promise<void>, // button clicks or form submissions
  onItemNameChange?: (e: React.ChangeEvent<any>) => void,
  error?: boolean,
  errorMessage?: string,
  errorMessageSetter?: (message: string, hasError: false) => void
}

function ItemModalTemplate({
  errorMessageSetter,
  show,
  onHide,
  title,
  itemName,
  onSubmit,
  onItemNameChange,
  error = false, errorMessage = "" }: ItemModalTemplateProps) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}>
          {error ? <div style={{ color: "red" }}>{errorMessage}</div> : ""}
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => {
              onItemNameChange(e);
              errorMessageSetter("", false);
            }}
            value={itemName}
          ></Form.Control>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px" }}>
            <Button
              type="submit"
            >
              submit
              </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function singular(input: string) {
  if (input.charAt(input.length - 1) === "s") {
    return input.slice(0, input.length - 1)
  }
  return input
}


/**
 * @description
 * The props interface for list layout
 * 
 * the `fetch` field prints all the resulting data
 */
export interface DepartmentLayoutProps {
  title: string;
  onFetchItems?: (take?: number, skip?: number) => Promise<any[]>;
  onEditItem?: (oldInstance: any, newInstance: any) => Promise<void>;
  onDeleteItem?: (instance: any) => Promise<void>;
  onAddNewItem?: (title: string) => Promise<any>;
}

const DepartmentLayout: React.FC<DepartmentLayoutProps> = ({ title, onAddNewItem, onFetchItems, onDeleteItem, onEditItem }) => {
  const [items, setItems] = useState<any[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [editModalShow, setEditingModalShow] = useState(false)
  const [addNewModalShow, setAddNewModelShow] = useState(false)
  const [selectedItemName, setSelectedItemName] = useState("")
  const [userError, userErrorMessage, userErrorSetter] = useError()
  //TODO implement pagination
  useEffect(() => {
    onFetchItems()
      .then(items => setItems(items))
  }, [])

  const handleOnNewValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemName(e.target.value)
  }

  return (
    <>
      <h1>{title}</h1>
      <div className={`${styles["add-new-container"]}`}>
        <Button
          className={styles["btn"]}
          variant="primary"
          onClick={() => {
            setAddNewModelShow(true);
          }}
        >
          <i className="bi bi-file-earmark-plus-fill"></i> Add new
          </Button>
        <ItemModalTemplate
          error={userError}
          errorMessage={userErrorMessage}
          errorMessageSetter={userErrorSetter}
          onSubmit={async () => {
            console.log("the modal itself is working something is not right in submission logic");
            try {
              const newItem = await onAddNewItem(newItemName);
              console.log(newItem)
              setItems([...items, newItem]);
              setAddNewModelShow(false);
            } catch (err) {
              if (err instanceof UserInputError) {
                userErrorSetter(err.message)
              }
              else {
                throw new UserInputError(err.message);
              }
            }
          }}
          title={`Add New ${singular(title)}`}
          itemName={newItemName}
          onItemNameChange={handleOnNewValueChange}
          show={addNewModalShow}
          onHide={() => setAddNewModelShow(false)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            return (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>
                  <EditButton
                    onClick={() => {
                      // open modal with edit
                      // gets the new data from that model
                      // update it
                      setSelectedItemName(item.name);
                      setEditingModalShow(true);
                    }}
                  />
                </td>
                <td>
                  <DeleteButton
                    onClick={
                      async () => {
                        try {
                          await onDeleteItem(item);
                          setItems(items.filter((i) => i.id !== item.id));
                        } catch (err) {
                          console.log(err);
                        }
                      }
                    }
                  />
                  <ItemModalTemplate
                    error={userError}
                    errorMessage={userErrorMessage}
                    errorMessageSetter={userErrorSetter}
                    title={`Edit ${selectedItemName}`}
                    onHide={() => setEditingModalShow(false)}
                    show={editModalShow}
                    itemName={selectedItemName}
                    onItemNameChange={(e) =>
                      setSelectedItemName(e.target.value)
                    }
                    onSubmit={async () => {
                      try {
                        await onEditItem(item, {
                          id: item.id,
                          name: selectedItemName,
                        });
                        setItems(
                          items.map((i) => {
                            if (i.id !== item.id) {
                              return i;
                            } else {
                              return { item, name: selectedItemName };
                            }
                          })
                        );
                        setEditingModalShow(false);
                      } catch (err) {
                        if (err instanceof UserInputError) {
                          userErrorSetter(err.message)
                        }
                        else {
                          throw new err;
                        }
                      }
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default DepartmentLayout;
