import { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";

interface ButtonProperties {
    onClick: MouseEventHandler<HTMLElement>
}

export const EditButton: React.FC<ButtonProperties> = ({ onClick }) => {
    return (
        <Button
            variant="primary"
            onClick={onClick}
        >
            <i className="bi bi-pencil-square"></i> Edit
        </Button>
    )
}

export const DeleteButton: React.FC<ButtonProperties> = ({ onClick }) => {
    return (
        <Button
            variant="danger"
            onClick={onClick}
        >
            <i className="bi bi-trash-fill"></i> Delete
        </Button>
    )
}