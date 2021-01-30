import styles from "./buttons-list-layout.module.css"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import { SyntheticEvent, useState } from "react"

type SettingsProps = {
    pages: object
}

export default function ButtonsListLayout({ pages }: SettingsProps) {

    const [selectedPage, setSelectedPage] = useState(Object.keys(pages)[0])

    const handleOnClick = (value) => {
        setSelectedPage(value)
    }

    return (
        <>
            <div className={`${styles["settings-container"]}`}>
                <div>
                    <ButtonGroup vertical className={`${styles["settings-buttons"]} p-2`}>
                        {
                            Object.keys(pages).map(
                                key => {
                                    if (key === selectedPage)
                                    return <Button variant="primary" key={key} onClick={() => handleOnClick(key)}>{key}</Button>
                                    else 
                                    return <Button variant="outline-primary" key={key} onClick={() => handleOnClick(key)}>{key}</Button>
                                }
                            )
                        }
                    </ButtonGroup>
                </div>
                <div className={`p-2`}>{pages[selectedPage]}</div>
            </div>
        </>
    )
}