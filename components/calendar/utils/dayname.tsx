import styles from "./utils.module.css"
type DayNameProps = {
    dayName: string
}
export default function DayName({dayName}: DayNameProps) {
    return <span className={`${styles["day-name-slot"]} p-3`}>{dayName}</span>
}