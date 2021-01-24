import React from "react";
import Button from "react-bootstrap/Button";
import { ButtonVariant } from "react-bootstrap/types"
import styles from "./fab.module.css"

interface FabProps extends React.HTMLAttributes<HTMLElement> {
    variant: ButtonVariant;
}

export default function Fab(props: FabProps): JSX.Element {

    let result = React.createElement(Button,
        {
            className: `${styles["fab"]}`,
            ...props
        },
        props.children
    )
    return result
}