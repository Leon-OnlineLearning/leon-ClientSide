import styles from './sidebar.module.css'
import Link from "next/link"

/**
 * 
 * @param {Object} props props for sidebar components
 * @param {React.Component} props.children 
 */
export function Sidebar(props) {
    return (
        <nav className={`${styles["sidebar"]} bg-dark text-light`}>
            {props.children}
        </nav>
    );
}


/**
 * 
 * @param {Object} props
 * @param {React.Component} icon
 * @param {string} text
 */
export function SidebarElement({ iconClassName, text, href }) {
    return (<Link href={href}><div style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }} className="py-1">
        <i style={{ fontSize: "24px" }} className={iconClassName}></i>
        <span >{text}</span>
    </div></Link>);
}